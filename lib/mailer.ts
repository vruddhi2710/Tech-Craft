import tls from 'tls'

type InquiryEmail = {
  id: string
  submittedAt: string
  name: string
  address: string
  courseTitle: string
  email: string
  phone: string
  message: string
}

type MailResult = {
  sent: boolean
  reason?: string
}

const smtpHost = 'smtp.gmail.com'
const smtpPort = 465

function encodeBase64(value: string) {
  return Buffer.from(value, 'utf8').toString('base64')
}

function sanitizeHeader(value: string) {
  return value.replace(/[\r\n]+/g, ' ').trim()
}

function buildMessage(from: string, to: string, inquiry: InquiryEmail) {
  const subject = `New Tech-Craft Inquiry - ${inquiry.courseTitle}`
  const lines = [
    'New student inquiry received.',
    '',
    `Inquiry ID: ${inquiry.id}`,
    `Submitted At: ${inquiry.submittedAt}`,
    `Name: ${inquiry.name}`,
    `Email: ${inquiry.email}`,
    `Phone: ${inquiry.phone}`,
    `Course: ${inquiry.courseTitle}`,
    `Address: ${inquiry.address}`,
    `Message: ${inquiry.message || 'No message provided'}`,
  ]

  return [
    `From: Tech-Craft <${sanitizeHeader(from)}>`,
    `To: ${sanitizeHeader(to)}`,
    `Reply-To: ${sanitizeHeader(inquiry.email)}`,
    `Subject: ${sanitizeHeader(subject)}`,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=utf-8',
    '',
    lines.join('\n'),
  ].join('\r\n')
}

function waitForResponse(socket: tls.TLSSocket, expectedCodes: string[]) {
  return new Promise<string>((resolve, reject) => {
    let buffer = ''

    function cleanup() {
      socket.off('data', onData)
      socket.off('error', onError)
    }

    function onError(error: Error) {
      cleanup()
      reject(error)
    }

    function onData(chunk: Buffer) {
      buffer += chunk.toString('utf8')
      const lines = buffer.split(/\r?\n/).filter(Boolean)
      const lastLine = lines[lines.length - 1]

      if (!lastLine || /^\d{3}-/.test(lastLine)) {
        return
      }

      const code = lastLine.slice(0, 3)
      cleanup()

      if (expectedCodes.includes(code)) {
        resolve(buffer)
      } else {
        reject(new Error(buffer.trim()))
      }
    }

    socket.on('data', onData)
    socket.on('error', onError)
  })
}

async function sendCommand(socket: tls.TLSSocket, command: string, expectedCodes: string[]) {
  socket.write(`${command}\r\n`)
  return waitForResponse(socket, expectedCodes)
}

export async function sendInquiryEmail(inquiry: InquiryEmail): Promise<MailResult> {
  const user = process.env.GMAIL_USER
  const password = process.env.GMAIL_APP_PASSWORD?.replace(/\s+/g, '')
  const recipient = 'techcraft1999@gmail.com'

  if (!user || !password) {
    return {
      sent: false,
      reason: 'GMAIL_USER and GMAIL_APP_PASSWORD are required to send email.',
    }
  }

  const socket = tls.connect({
    host: smtpHost,
    port: smtpPort,
    servername: smtpHost,
  })
  socket.on('error', () => {})
  socket.setTimeout(15000, () => {
    socket.destroy(new Error('SMTP connection timed out.'))
  })

  try {
    await waitForResponse(socket, ['220'])
    await sendCommand(socket, `EHLO ${smtpHost}`, ['250'])
    await sendCommand(socket, 'AUTH LOGIN', ['334'])
    await sendCommand(socket, encodeBase64(user), ['334'])
    await sendCommand(socket, encodeBase64(password), ['235'])
    await sendCommand(socket, `MAIL FROM:<${user}>`, ['250'])
    await sendCommand(socket, `RCPT TO:<${recipient}>`, ['250', '251'])
    await sendCommand(socket, 'DATA', ['354'])

    const message = buildMessage(user, recipient, inquiry)
    socket.write(`${message}\r\n.\r\n`)
    await waitForResponse(socket, ['250'])
    await sendCommand(socket, 'QUIT', ['221'])

    return {
      sent: true,
    }
  } catch (error) {
    return {
      sent: false,
      reason: error instanceof Error ? error.message : 'Email could not be sent.',
    }
  } finally {
    socket.end()
  }
}
