import { NextResponse } from 'next/server'
import { readAdminCredentials, setAdminSession } from '../../../../../lib/adminAuth'

export const runtime = 'nodejs'

function text(value: unknown) {
  return typeof value === 'string' ? value.trim() : ''
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as { email?: unknown; password?: unknown } | null
  const email = text(body?.email).toLowerCase()
  const password = text(body?.password)

  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 })
  }

  const credentials = await readAdminCredentials()

  if (email !== credentials.email.toLowerCase() || password !== credentials.password) {
    return NextResponse.json({ error: 'Invalid admin email or password.' }, { status: 401 })
  }

  await setAdminSession(credentials.email)

  return NextResponse.json({ ok: true, email: credentials.email })
}
