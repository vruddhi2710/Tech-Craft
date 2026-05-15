import { NextResponse } from 'next/server'
import { appendAdminInquiry, readAdminCourses, type AdminInquiry } from '../../../lib/adminData'
import { sendInquiryEmail } from '../../../lib/mailer'
import { appendInquiryToGoogleSheet } from '../../../lib/googleSheet'

export const runtime = 'nodejs'

type InquiryRequest = {
  name?: unknown
  address?: unknown
  course?: unknown
  email?: unknown
  phone?: unknown
  message?: unknown
}

const notifyEmail = 'techcraft1999@gmail.com'

function text(value: unknown) {
  return typeof value === 'string' ? value.trim() : ''
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export async function POST(request: Request) {
  let body: InquiryRequest

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid form data.' }, { status: 400 })
  }

  const name = text(body.name)
  const address = text(body.address)
  const course = text(body.course)
  const email = text(body.email)
  const phone = text(body.phone)
  const message = text(body.message)
  const courses = await readAdminCourses()
  const selectedCourse = courses.find((item) => item.slug === course)

  if (!name || !address || !course || !email || !phone) {
    return NextResponse.json({ error: 'Please fill in all required fields.' }, { status: 400 })
  }

  if (!selectedCourse) {
    return NextResponse.json({ error: 'Please select a valid course.' }, { status: 400 })
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
  }

  const inquiry: AdminInquiry = {
    id: crypto.randomUUID(),
    submittedAt: new Date().toISOString(),
    name,
    address,
    course,
    courseTitle: selectedCourse.title,
    email,
    phone,
    message,
    notifyEmail,
  }

  let storageStatus: { saved: boolean; reason?: string } = { saved: true }

  try {
    await appendAdminInquiry(inquiry)
  } catch (error) {
    storageStatus = {
      saved: false,
      reason: error instanceof Error ? error.message : 'Inquiry could not be saved locally.',
    }
  }

  const [emailStatus, sheetStatus] = await Promise.all([
    sendInquiryEmail(inquiry),
    appendInquiryToGoogleSheet(inquiry),
  ])

  if (!storageStatus.saved && !emailStatus.sent && !sheetStatus.appended) {
    return NextResponse.json(
      {
        error: 'Inquiry could not be submitted right now. Please call or email Tech-Craft directly.',
        email: emailStatus,
        sheet: sheetStatus,
        storage: storageStatus,
      },
      { status: 500 },
    )
  }

  return NextResponse.json({
    ok: true,
    inquiry,
    email: emailStatus,
    sheet: sheetStatus,
    storage: storageStatus,
  })
}
