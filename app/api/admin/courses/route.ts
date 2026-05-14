import { NextResponse } from 'next/server'
import { listFromText, outlineFromText, readAdminCourses, slugify, writeAdminCourses } from '../../../../lib/adminData'
import { requireAdmin } from '../../../../lib/adminAuth'
import type { Course } from '../../../../data/courses'

export const runtime = 'nodejs'

function text(value: unknown) {
  return typeof value === 'string' ? value.trim() : ''
}

async function unauthorized() {
  return NextResponse.json({ error: 'Unauthorized admin request.' }, { status: 401 })
}

function normalizeCourse(body: Record<string, unknown>, existingSlug?: string): Course {
  const title = text(body.title)
  const slug = existingSlug || slugify(text(body.slug) || title)
  const modules = Array.isArray(body.modules) ? body.modules.map(String) : listFromText(text(body.modules))
  const outline = Array.isArray(body.outline) ? body.outline as Course['outline'] : outlineFromText(text(body.outline))

  return {
    slug,
    title,
    desc: text(body.desc),
    tagline: text(body.tagline) || text(body.desc),
    duration: text(body.duration),
    level: text(body.level) || 'Beginner Friendly',
    image: text(body.image),
    highlights: Array.isArray(body.highlights) ? body.highlights.map(String) : listFromText(text(body.highlights)),
    tools: Array.isArray(body.tools) ? body.tools.map(String) : listFromText(text(body.tools)),
    modules,
    outline,
    projects: Array.isArray(body.projects) ? body.projects.map(String) : listFromText(text(body.projects)),
  }
}

export async function GET() {
  if (!await requireAdmin()) return unauthorized()
  return NextResponse.json({ courses: await readAdminCourses() })
}

export async function POST(request: Request) {
  if (!await requireAdmin()) return unauthorized()

  const body = await request.json().catch(() => null) as Record<string, unknown> | null
  if (!body) return NextResponse.json({ error: 'Invalid course data.' }, { status: 400 })

  const course = normalizeCourse(body)
  if (!course.title || !course.duration || !course.desc || !course.image) {
    return NextResponse.json({ error: 'Course name, duration, description, and image are required.' }, { status: 400 })
  }

  const courses = await readAdminCourses()
  if (courses.some((item) => item.slug === course.slug)) {
    return NextResponse.json({ error: 'A course with this slug already exists.' }, { status: 409 })
  }

  const updatedCourses = [course, ...courses]
  await writeAdminCourses(updatedCourses)
  return NextResponse.json({ ok: true, courses: updatedCourses })
}

export async function PUT(request: Request) {
  if (!await requireAdmin()) return unauthorized()

  const body = await request.json().catch(() => null) as Record<string, unknown> | null
  const slug = text(body?.slug)
  if (!body || !slug) return NextResponse.json({ error: 'Course slug is required.' }, { status: 400 })

  const courses = await readAdminCourses()
  const index = courses.findIndex((course) => course.slug === slug)
  if (index === -1) return NextResponse.json({ error: 'Course not found.' }, { status: 404 })

  courses[index] = normalizeCourse(body, slug)
  await writeAdminCourses(courses)
  return NextResponse.json({ ok: true, courses })
}

export async function DELETE(request: Request) {
  if (!await requireAdmin()) return unauthorized()

  const { searchParams } = new URL(request.url)
  const slug = searchParams.get('slug') || ''
  if (!slug) return NextResponse.json({ error: 'Course slug is required.' }, { status: 400 })

  const courses = await readAdminCourses()
  const updatedCourses = courses.filter((course) => course.slug !== slug)
  if (updatedCourses.length === courses.length) {
    return NextResponse.json({ error: 'Course not found.' }, { status: 404 })
  }

  await writeAdminCourses(updatedCourses)
  return NextResponse.json({ ok: true, courses: updatedCourses })
}
