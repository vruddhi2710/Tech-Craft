import { readFile } from 'fs/promises'
import path from 'path'

export async function GET() {
  const logoPath = path.join(process.cwd(), 'public', 'techcraft-logo.jpeg')
  const logo = await readFile(logoPath)

  return new Response(logo, {
    headers: {
      'Content-Type': 'image/jpeg',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  })
}
