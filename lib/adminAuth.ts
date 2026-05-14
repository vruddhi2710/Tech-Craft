import { cookies } from 'next/headers'
import crypto from 'crypto'
import { mkdir, readFile, writeFile } from 'fs/promises'
import path from 'path'

const sessionCookieName = 'techcraft_admin_session'
const sessionMaxAge = 60 * 60 * 8
const authDirectory = path.join(process.cwd(), 'data', 'admin')
const authPath = path.join(authDirectory, 'auth.json')

type AdminCredentials = {
  email: string
  password: string
}

function getSecret() {
  return process.env.ADMIN_SESSION_SECRET || 'techcraft-local-admin-secret-change-me'
}

export function getAdminEmail() {
  return process.env.ADMIN_EMAIL || 'techcraft1999@gmail.com'
}

export function getAdminPassword() {
  return process.env.ADMIN_PASSWORD || 'Admin@12345'
}

export function getAdminResetCode() {
  return process.env.ADMIN_RESET_CODE || 'TECHCRAFT-RESET-2026'
}

export async function readAdminCredentials(): Promise<AdminCredentials> {
  const fallback = {
    email: getAdminEmail(),
    password: getAdminPassword(),
  }

  try {
    const file = await readFile(authPath, 'utf8')
    const parsed = JSON.parse(file) as Partial<AdminCredentials>

    return {
      email: parsed.email || fallback.email,
      password: parsed.password || fallback.password,
    }
  } catch {
    await mkdir(authDirectory, { recursive: true })
    await writeFile(authPath, `${JSON.stringify(fallback, null, 2)}\n`, 'utf8')
    return fallback
  }
}

export async function updateAdminPassword(newPassword: string) {
  const current = await readAdminCredentials()
  const updated = {
    ...current,
    password: newPassword,
  }

  await mkdir(authDirectory, { recursive: true })
  await writeFile(authPath, `${JSON.stringify(updated, null, 2)}\n`, 'utf8')
}

function sign(value: string) {
  return crypto.createHmac('sha256', getSecret()).update(value).digest('hex')
}

export function createSessionToken(email: string) {
  const payload = Buffer.from(JSON.stringify({ email, createdAt: Date.now() })).toString('base64url')
  return `${payload}.${sign(payload)}`
}

export function verifySessionToken(token?: string) {
  if (!token) return null

  const [payload, signature] = token.split('.')
  if (!payload || !signature || sign(payload) !== signature) return null

  try {
    const parsed = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as {
      email?: string
      createdAt?: number
    }

    if (parsed.email !== getAdminEmail() || !parsed.createdAt) return null
    if (Date.now() - parsed.createdAt > sessionMaxAge * 1000) return null

    return parsed.email
  } catch {
    return null
  }
}

export async function getAdminSession() {
  const cookieStore = await cookies()
  return verifySessionToken(cookieStore.get(sessionCookieName)?.value)
}

export async function setAdminSession(email: string) {
  const cookieStore = await cookies()
  cookieStore.set(sessionCookieName, createSessionToken(email), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: sessionMaxAge,
    path: '/',
  })
}

export async function clearAdminSession() {
  const cookieStore = await cookies()
  cookieStore.delete(sessionCookieName)
}

export async function requireAdmin() {
  const email = await getAdminSession()
  if (!email) {
    return null
  }

  return email
}
