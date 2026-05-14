import { NextResponse } from 'next/server'
import { access, appendFile, mkdir, readFile, writeFile } from 'fs/promises'
import path from 'path'
import { readAdminCourses } from '../../../lib/adminData'
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

type InquiryRecord = {
  id: string
  submittedAt: string
  name: string
  address: string
  course: string
  courseTitle: string
  email: string
  phone: string
  message: string
  notifyEmail: string
}

type StorageResult = {
  saved: boolean
  reason?: string
}

const notifyEmail = 'techcraft1999@gmail.com'
const dataDirectory = path.join(process.cwd(), 'data')
const jsonPath = path.join(dataDirectory, 'inquiries.json')
const csvPath = path.join(dataDirectory, 'inquiries.csv')
const csvHeader = 'id,submittedAt,name,address,course,courseTitle,email,phone,message,notifyEmail\n'

function text(value: unknown) {
  return typeof value === 'string' ? value.trim() : ''
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function csvEscape(value: string) {
  return `"${value.replace(/"/g, '""')}"`
}

async function ensureCsvFile() {
  try {
    await access(csvPath)
  } catch {
    await writeFile(csvPath, csvHeader, 'utf8')
  }
}

async function readInquiries() {
  try {
    const file = await readFile(jsonPath, 'utf8')
    const parsed = JSON.parse(file)
    return Array.isArray(parsed) ? parsed as InquiryRecord[] : []
  } catch {
    return []
  }
}

async function saveInquiryLocally(inquiry: InquiryRecord): Promise<StorageResult> {
  try {
    await mkdir(dataDirectory, { recursive: true })

    const inquiries = await readInquiries()
    inquiries.push(inquiry)

    await writeFile(jsonPath, `${JSON.stringify(inquiries, null, 2)}\n`, 'utf8')
    await ensureCsvFile()
    await appendFile(
      csvPath,
      [
        inquiry.id,
        inquiry.submittedAt,
        inquiry.name,
        inquiry.address,
        inquiry.course,
        inquiry.courseTitle,
        inquiry.email,
        inquiry.phone,
        inquiry.message,
        inquiry.notifyEmail,
      ].map(csvEscape).join(',') + '\n',
      'utf8',
    )

    return {
      saved: true,
    }
  } catch (error) {
    return {
      saved: false,
      reason: error instanceof Error ? error.message : 'Inquiry could not be saved locally.',
    }
  }
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

  const inquiry: InquiryRecord = {
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

  const storageStatus = await saveInquiryLocally(inquiry)
  const emailStatus = await sendInquiryEmail(inquiry)
  const sheetStatus = await appendInquiryToGoogleSheet(inquiry)

  if (!storageStatus.saved && !emailStatus.sent && !sheetStatus.appended) {
    return NextResponse.json(
      {
        error: 'Inquiry could not be submitted right now. Please call or email Tech-Craft directly.',
        storage: storageStatus,
        email: emailStatus,
        sheet: sheetStatus,
      },
      { status: 500 },
    )
  }

  return NextResponse.json({
    ok: true,
    inquiry,
    storage: storageStatus,
    email: emailStatus,
    sheet: sheetStatus,
  })
}
