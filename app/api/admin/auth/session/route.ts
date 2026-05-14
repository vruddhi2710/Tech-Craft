import { NextResponse } from 'next/server'
import { getAdminSession } from '../../../../../lib/adminAuth'

export const runtime = 'nodejs'

export async function GET() {
  const email = await getAdminSession()
  return NextResponse.json({ authenticated: Boolean(email), email })
}
