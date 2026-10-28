import { mkdir, writeFile } from 'fs/promises'
import path from 'path'
import { randomUUID } from 'crypto'
import { NextResponse } from 'next/server'
import { requireAdmin } from '../../../../lib/adminAuth'

export const runtime = 'nodejs'

const imageTypes: Record<string, string> = {
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp',
  'image/gif': '.gif',
  'image/avif': '.avif',
}

export async function POST(request: Request) {
  if (!await requireAdmin()) {
    return NextResponse.json({ error: 'Unauthorized admin request.' }, { status: 401 })
  }

  const formData = await request.formData().catch(() => null)
  const image = formData?.get('image')
  if (!(image instanceof File) || !image.size || !imageTypes[image.type]) {
    return NextResponse.json({ error: 'Choose a supported image file.' }, { status: 400 })
  }
  if (image.size > 5 * 1024 * 1024) {
    return NextResponse.json({ error: 'Images must be 5 MB or smaller.' }, { status: 413 })
  }

  const filename = `${randomUUID()}${imageTypes[image.type]}`
  const uploadDirectory = path.join(process.cwd(), 'public', 'uploads')
  await mkdir(uploadDirectory, { recursive: true })
  await writeFile(path.join(uploadDirectory, filename), Buffer.from(await image.arrayBuffer()))

  return NextResponse.json({ image: `/uploads/${filename}` })
}
