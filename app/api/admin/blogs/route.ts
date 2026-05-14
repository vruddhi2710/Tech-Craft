import { NextResponse } from 'next/server'
import { readAdminBlogs, slugify, writeAdminBlogs, type AdminBlog } from '../../../../lib/adminData'
import { requireAdmin } from '../../../../lib/adminAuth'

export const runtime = 'nodejs'

function text(value: unknown) {
  return typeof value === 'string' ? value.trim() : ''
}

async function unauthorized() {
  return NextResponse.json({ error: 'Unauthorized admin request.' }, { status: 401 })
}

function normalizeBlog(body: Record<string, unknown>, existingId?: string): AdminBlog {
  const title = text(body.title)

  return {
    id: existingId || `${slugify(title)}-${Date.now()}`,
    title,
    description: text(body.description),
    content: text(body.content),
    author: text(body.author),
    publishDate: text(body.publishDate),
    image: text(body.image),
  }
}

export async function GET() {
  if (!await requireAdmin()) return unauthorized()
  return NextResponse.json({ blogs: await readAdminBlogs() })
}

export async function POST(request: Request) {
  if (!await requireAdmin()) return unauthorized()

  const body = await request.json().catch(() => null) as { blogs?: Record<string, unknown>[] } & Record<string, unknown> | null
  if (!body) return NextResponse.json({ error: 'Invalid blog data.' }, { status: 400 })

  const incomingBlogs = Array.isArray(body.blogs) ? body.blogs : [body]
  const blogsToAdd = incomingBlogs.map((item) => normalizeBlog(item))

  if (blogsToAdd.some((blog) => !blog.title || !blog.description || !blog.content || !blog.author || !blog.publishDate)) {
    return NextResponse.json({ error: 'Blog title, description, content, author, and publish date are required.' }, { status: 400 })
  }

  const blogs = await readAdminBlogs()
  const updatedBlogs = [...blogsToAdd, ...blogs]
  await writeAdminBlogs(updatedBlogs)
  return NextResponse.json({ ok: true, blogs: updatedBlogs })
}

export async function PUT(request: Request) {
  if (!await requireAdmin()) return unauthorized()

  const body = await request.json().catch(() => null) as Record<string, unknown> | null
  const id = text(body?.id)
  if (!body || !id) return NextResponse.json({ error: 'Blog ID is required.' }, { status: 400 })

  const blogs = await readAdminBlogs()
  const index = blogs.findIndex((blog) => blog.id === id)
  if (index === -1) return NextResponse.json({ error: 'Blog not found.' }, { status: 404 })

  blogs[index] = normalizeBlog(body, id)
  await writeAdminBlogs(blogs)
  return NextResponse.json({ ok: true, blogs })
}

export async function DELETE(request: Request) {
  if (!await requireAdmin()) return unauthorized()

  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id') || ''
  if (!id) return NextResponse.json({ error: 'Blog ID is required.' }, { status: 400 })

  const blogs = await readAdminBlogs()
  const updatedBlogs = blogs.filter((blog) => blog.id !== id)
  if (updatedBlogs.length === blogs.length) return NextResponse.json({ error: 'Blog not found.' }, { status: 404 })

  await writeAdminBlogs(updatedBlogs)
  return NextResponse.json({ ok: true, blogs: updatedBlogs })
}
