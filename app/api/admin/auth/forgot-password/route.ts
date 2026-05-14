import { NextResponse } from 'next/server'
import { getAdminResetCode, readAdminCredentials, updateAdminPassword } from '../../../../../lib/adminAuth'

export const runtime = 'nodejs'

function text(value: unknown) {
  return typeof value === 'string' ? value.trim() : ''
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as { email?: unknown; resetCode?: unknown; newPassword?: unknown } | null
  const email = text(body?.email).toLowerCase()
  const resetCode = text(body?.resetCode)
  const newPassword = text(body?.newPassword)

  if (!email || !resetCode || !newPassword) {
    return NextResponse.json({ error: 'Email, reset code, and new password are required.' }, { status: 400 })
  }

  const credentials = await readAdminCredentials()

  if (email !== credentials.email.toLowerCase()) {
    return NextResponse.json({ error: 'Password reset is allowed only for the admin login email.' }, { status: 403 })
  }

  if (resetCode !== getAdminResetCode()) {
    return NextResponse.json({ error: 'Invalid reset code.' }, { status: 401 })
  }

  if (newPassword.length < 8) {
    return NextResponse.json({ error: 'Password must be at least 8 characters.' }, { status: 400 })
  }

  await updateAdminPassword(newPassword)

  return NextResponse.json({
    ok: true,
    message: 'Password updated successfully. You can now login with the new password.',
  })
}
