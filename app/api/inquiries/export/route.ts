import { NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import path from 'path'

export const runtime = 'nodejs'

const csvPath = path.join(process.cwd(), 'data', 'inquiries.csv')
const csvHeader = 'id,submittedAt,name,address,course,courseTitle,email,phone,message,notifyEmail\n'

export async function GET() {
  let csv = csvHeader

  try {
    csv = await readFile(csvPath, 'utf8')
  } catch {
    csv = csvHeader
  }

  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'attachment; filename="tech-craft-inquiries.csv"',
    },
  })
}
