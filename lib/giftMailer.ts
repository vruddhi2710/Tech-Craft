import tls from 'tls'

export type GiftEmailData = {
  giverName: string
  giverEmail: string
  giverPhone: string
  recipientName: string
  recipientEmail: string
  recipientPhone: string
  course: string
  message: string
  coupon: string
  submittedAt: string
}

export type GiftMailStatus = { sent: boolean; reason?: string }

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[char] as string)
}

function safeHeader(value: string) {
  return value.replace(/[\r\n]+/g, ' ').trim()
}

function configured() {
  const user = process.env.GMAIL_USER || 'techcraft1999@gmail.com'
  const password = process.env.GMAIL_APP_PASSWORD?.replace(/\s+/g, '') || 'ngnw vebe ljnd rftm'
  const from = process.env.GIFT_EMAIL_FROM || user || 'techcraft1999@gmail.com'
  const to = process.env.GIFT_NOTIFICATION_EMAIL || 'techcraft1999@gmail.com'
  if (!user || !password || password.toLowerCase().startsWith('your_')) {
    return { error: 'Email is not configured. Set GMAIL_USER and GMAIL_APP_PASSWORD in the server environment.' }
  }
  if (!from || !to) return { error: 'Set GIFT_EMAIL_FROM and GIFT_NOTIFICATION_EMAIL in the server environment.' }
  return { user, password, from, to }
}

function waitForResponse(socket: tls.TLSSocket, expected: string[]) {
  return new Promise<string>((resolve, reject) => {
    let buffer = ''
    const cleanup = () => { socket.off('data', onData); socket.off('error', onError) }
    const onError = (error: Error) => { cleanup(); reject(error) }
    const onData = (chunk: Buffer) => {
      buffer += chunk.toString('utf8')
      const last = buffer.split(/\r?\n/).filter(Boolean).at(-1)
      if (!last || /^\d{3}-/.test(last)) return
      cleanup()
      if (expected.includes(last.slice(0, 3))) resolve(buffer)
      else reject(new Error(buffer.trim()))
    }
    socket.on('data', onData)
    socket.on('error', onError)
  })
}

async function command(socket: tls.TLSSocket, value: string, expected: string[]) {
  socket.write(`${value}\r\n`)
  return waitForResponse(socket, expected)
}

function htmlGiftCard(data: GiftEmailData, greetingName: string, greeting: string) {
  const recipientName = escapeHtml(data.recipientName)
  const giverName = escapeHtml(data.giverName)
  const course = escapeHtml(data.course)
  const coupon = escapeHtml(data.coupon)
  const message = escapeHtml(data.message || 'No personal message provided.').replace(/\n/g, '<br>')
  return `<div style="margin:0;background:#fff8ed;padding:28px 12px;font-family:Arial,Helvetica,sans-serif;color:#172033"><table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;max-width:620px;margin:0 auto;border-radius:24px;overflow:hidden;background:#111b33;border:1px solid #f2a65a"><tr><td style="padding:30px 32px 8px;text-align:center;color:#7dd3fc;font-size:14px;font-weight:bold;letter-spacing:3px">🪔 TECH-CRAFT DIWALI GIFT 🪔</td></tr><tr><td style="padding:8px 32px 28px;text-align:center;color:#fff"><div style="font-size:34px;line-height:1.4">✨ &nbsp;🪔 &nbsp;✨</div><h1 style="margin:4px 0 18px;font-size:30px;line-height:1.2;color:#fff">Celebrate Diwali.<br><span style="color:#7dd3fc">Share the Joy of Learning.</span></h1><p style="margin:0;color:#e7eaf0;font-size:17px">${greeting} ${escapeHtml(greetingName)}!</p><p style="margin:12px auto 0;max-width:470px;color:#d6dceb;line-height:1.6">${giverName} is sharing a little festive joy and a bright new learning opportunity with ${recipientName}.</p><table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;margin:24px 0 0;border-radius:16px;background:#202c48"><tr><td style="padding:22px;text-align:center"><div style="color:#7dd3fc;font-size:12px;font-weight:bold;letter-spacing:2px;text-transform:uppercase">Your gift</div><div style="margin-top:9px;color:#fff;font-size:22px;font-weight:bold;line-height:1.35">${course}</div>${data.message ? `<div style="margin-top:16px;padding-top:14px;border-top:1px solid #44506a;color:#e7eaf0;font-size:15px;line-height:1.6">“${message}”</div>` : ''}</td></tr></table><table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;margin:18px 0 0;border:1px dashed #7dd3fc;border-radius:14px;background:#302a3b"><tr><td style="padding:18px;text-align:center"><div style="color:#7dd3fc;font-size:12px;font-weight:bold;letter-spacing:2px;text-transform:uppercase">Gift coupon code</div><div style="margin-top:8px;color:#fff;font-family:monospace;font-size:25px;font-weight:bold;letter-spacing:3px">${coupon}</div></td></tr></table><p style="margin:22px 0 0;color:#d6dceb;font-size:14px">Wishing you a joyful Diwali and a wonderful learning journey!</p><p style="margin:16px 0 0;color:#7dd3fc;font-size:13px">With warm wishes,<br>Team Tech-Craft</p></td></tr></table><p style="max-width:620px;margin:14px auto 0;text-align:center;color:#697386;font-size:12px;line-height:1.5">This coupon identifies your gift request. Please contact Tech-Craft to arrange course access.</p></div>`
}

function htmlNotification(data: GiftEmailData) {
  return `<div style="font-family:Arial,sans-serif;color:#172033;max-width:640px;margin:auto;padding:28px"><h1>New Diwali Gift Request</h1><p><strong>Submitted:</strong> ${escapeHtml(data.submittedAt)}</p><p><strong>Giver:</strong> ${escapeHtml(data.giverName)} · ${escapeHtml(data.giverEmail)} · ${escapeHtml(data.giverPhone)}</p><p><strong>Recipient:</strong> ${escapeHtml(data.recipientName)} · ${escapeHtml(data.recipientEmail)} · ${escapeHtml(data.recipientPhone)}</p><p><strong>Offer:</strong> ${escapeHtml(data.course)}</p><p><strong>Coupon:</strong> ${escapeHtml(data.coupon)}</p><p><strong>Message:</strong><br>${escapeHtml(data.message || 'No personal message provided.').replace(/\n/g, '<br>')}</p></div>`
}

function textBody(data: GiftEmailData, kind: 'notification' | 'recipient' | 'giver') {
  if (kind === 'recipient' || kind === 'giver') return `Celebrate Diwali. Share the Joy of Learning.\n\nHi ${kind === 'recipient' ? data.recipientName : data.giverName},\n\n${data.giverName} is sharing a Diwali gift with ${data.recipientName}: ${data.course}.\n\nGift Coupon Code: ${data.coupon}\n\nPersonal Message:\n${data.message || 'No personal message provided.'}\n\nWishing you a joyful Diwali and a wonderful learning journey!\n\nTeam Tech-Craft`
  return `New Gift a Course Request\nSubmitted: ${data.submittedAt}\nGiver: ${data.giverName} | ${data.giverEmail} | ${data.giverPhone}\nRecipient: ${data.recipientName} | ${data.recipientEmail} | ${data.recipientPhone}\nCourse: ${data.course}\nCoupon: ${data.coupon}\nMessage: ${data.message || 'No message provided.'}`
}

async function send(to: string, subject: string, data: GiftEmailData, kind: 'notification' | 'recipient' | 'giver'): Promise<GiftMailStatus> {
  const config = configured()
  if ('error' in config) return { sent: false, reason: config.error }
  const { user, password, from } = config
  const host = 'smtp.gmail.com'
  const socket = tls.connect({ host, port: 465, servername: host })
  socket.on('error', () => {})
  socket.setTimeout(10000, () => socket.destroy(new Error('Email connection timed out.')))
  try {
    await waitForResponse(socket, ['220'])
    await command(socket, `EHLO ${host}`, ['250'])
    await command(socket, 'AUTH LOGIN', ['334'])
    await command(socket, Buffer.from(user).toString('base64'), ['334'])
    await command(socket, Buffer.from(password).toString('base64'), ['235'])
    await command(socket, `MAIL FROM:<${safeHeader(from)}>`, ['250'])
    await command(socket, `RCPT TO:<${safeHeader(to)}>`, ['250', '251'])
    await command(socket, 'DATA', ['354'])
    const boundary = `gift_${crypto.randomUUID().replaceAll('-', '')}`
    const fromName = kind === 'recipient' ? `${safeHeader(data.giverName)} via Tech-Craft` : 'Tech-Craft'
    const raw = [
      `From: ${fromName} <${safeHeader(from)}>`,
      ...(kind === 'recipient' ? [`Reply-To: ${safeHeader(data.giverName)} <${safeHeader(data.giverEmail)}>`] : []),
      `To: ${safeHeader(to)}`,
      `Subject: ${safeHeader(subject)}`, 'MIME-Version: 1.0',
      `Content-Type: multipart/alternative; boundary="${boundary}"`, '',
      `--${boundary}`, 'Content-Type: text/plain; charset=utf-8',
      'Content-Transfer-Encoding: base64', '', Buffer.from(textBody(data, kind), 'utf8').toString('base64'),
      `--${boundary}`, 'Content-Type: text/html; charset=utf-8',
      'Content-Transfer-Encoding: base64', '', Buffer.from(kind === 'notification' ? htmlNotification(data) : htmlGiftCard(data, kind === 'recipient' ? data.recipientName : data.giverName, kind === 'recipient' ? 'Hi' : 'Hello again,'), 'utf8').toString('base64'),
      `--${boundary}--`, '',
    ].join('\r\n').replace(/\r?\n/g, '\r\n').replace(/\n\./g, '\n..')
    socket.write(`${raw}\r\n.\r\n`)
    await waitForResponse(socket, ['250'])
    await command(socket, 'QUIT', ['221'])
    return { sent: true }
  } catch (error) {
    return { sent: false, reason: error instanceof Error ? error.message : 'Email could not be sent.' }
  } finally { socket.end() }
}

export async function sendGiftEmails(data: GiftEmailData) {
  const config = configured()
  if ('error' in config) return { notification: { sent: false, reason: config.error }, recipient: { sent: false, reason: config.error }, giver: { sent: false, reason: config.error } }
  const [notification, recipient, giver] = await Promise.all([
    send(config.to, `New Diwali Gift Request - ${data.course}`, data, 'notification'),
    send(data.recipientEmail, "You've Received a Special Course Gift!", data, 'recipient'),
    send(data.giverEmail, 'Your Tech-Craft Diwali Gift Card', data, 'giver'),
  ])
  return { notification, recipient, giver }
}
