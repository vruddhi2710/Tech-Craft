import { randomInt } from 'crypto'
import { NextResponse } from 'next/server'
import { giftOffers } from '../../../data/giftOffers'
import { sendGiftEmails, type GiftEmailData } from '../../../lib/giftMailer'

export const runtime = 'nodejs'

const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
const attempts = new Map<string, number[]>()

function clean(value: unknown, maxLength: number) {
  return typeof value === 'string'
    ? value.replace(/[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, maxLength)
    : ''
}

function couponCode() {
  const part = () => Array.from({ length: 4 }, () => alphabet[randomInt(alphabet.length)]).join('')
  return `GIFT-${part()}-${part()}`
}

function validEmail(value: string) {
  return value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function limit(request: Request) {
  const now = Date.now()
  const key = request.headers.get('x-real-ip') || request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  const recent = (attempts.get(key) || []).filter((time) => now - time < 60_000)
  if (recent.length >= 3) return false
  recent.push(now)
  attempts.set(key, recent)
  if (attempts.size > 1000) {
    for (const [ip, values] of attempts) if (values.every((time) => now - time >= 60_000)) attempts.delete(ip)
  }
  return true
}

export async function POST(request: Request) {
  if (!limit(request)) return NextResponse.json({ error: 'Too many gift requests. Please try again in a minute.' }, { status: 429 })

  let raw: Record<string, unknown>
  try {
    raw = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid form data.' }, { status: 400 })
  }

  const data = {
    giverName: clean(raw.giverName, 100),
    giverEmail: clean(raw.giverEmail, 254),
    giverPhone: clean(raw.giverPhone, 40),
    recipientName: clean(raw.recipientName, 100),
    recipientEmail: clean(raw.recipientEmail, 254),
    recipientPhone: clean(raw.recipientPhone, 40),
    course: clean(raw.course, 100),
    message: clean(raw.message, 1000),
  }

  if (!data.giverName || !data.giverEmail || !data.giverPhone || !data.recipientName || !data.recipientEmail || !data.recipientPhone || !data.course) {
    return NextResponse.json({ error: 'Please complete all required fields.' }, { status: 400 })
  }
  if (!validEmail(data.giverEmail) || !validEmail(data.recipientEmail)) {
    return NextResponse.json({ error: 'Please enter valid email addresses.' }, { status: 400 })
  }
  if (!giftOffers.includes(data.course as (typeof giftOffers)[number])) {
    return NextResponse.json({ error: 'Please select a valid course.' }, { status: 400 })
  }
  if (!/^[+\d][\d\s().-]{5,38}$/.test(data.giverPhone) || !/^[+\d][\d\s().-]{5,38}$/.test(data.recipientPhone)) {
    return NextResponse.json({ error: 'Please enter valid mobile numbers.' }, { status: 400 })
  }

  const gift: GiftEmailData = {
    ...data,
    course: data.course,
    coupon: couponCode(),
    submittedAt: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'long' }),
  }

  const emails = await sendGiftEmails(gift)
  const ok = emails.notification.sent && emails.recipient.sent && emails.giver.sent
  if (!ok) {
    const configuredError = [emails.notification.reason, emails.recipient.reason, emails.giver.reason].some((reason) => reason?.startsWith('Email is not configured') || reason?.startsWith('Set GIFT_'))
    const anyGiftEmailSent = emails.recipient.sent || emails.giver.sent
    return NextResponse.json({
      error: configuredError
        ? [...new Set([emails.notification.reason, emails.recipient.reason])].join(' ')
        : 'We could not deliver both emails. Check the delivery status below before trying again.',
      partial: anyGiftEmailSent,
      emailStatus: { notificationSent: emails.notification.sent, recipientSent: emails.recipient.sent, giverSent: emails.giver.sent },
      gift: anyGiftEmailSent ? { recipientName: gift.recipientName, giverName: gift.giverName, course: gift.course, message: gift.message, coupon: gift.coupon } : undefined,
      details: configuredError ? [...new Set([emails.notification.reason, emails.recipient.reason, emails.giver.reason])].join(' ') : undefined,
    }, { status: 502 })
  }

  return NextResponse.json({
    ok: true,
    gift: { recipientName: gift.recipientName, giverName: gift.giverName, course: gift.course, message: gift.message, coupon: gift.coupon },
  })
}
