import { NextResponse } from 'next/server'
import { listFromText, readAdminEvents, slugify, writeAdminEvents, type AdminEvent } from '../../../../lib/adminData'
import { requireAdmin } from '../../../../lib/adminAuth'

export const runtime = 'nodejs'

function text(value: unknown) {
  return typeof value === 'string' ? value.trim() : ''
}

async function unauthorized() {
  return NextResponse.json({ error: 'Unauthorized admin request.' }, { status: 401 })
}

function normalizeEvent(body: Record<string, unknown>, existingSlug?: string): AdminEvent {
  const title = text(body.title)

  return {
    slug: existingSlug || slugify(text(body.slug) || title),
    title,
    course: text(body.course) || 'General',
    date: text(body.date),
    time: text(body.time),
    venue: text(body.venue),
    mode: ['Offline', 'Online', 'Hybrid'].includes(text(body.mode)) ? text(body.mode) as AdminEvent['mode'] : 'Offline',
    seats: text(body.seats) || 'Registration required',
    description: text(body.description),
    highlights: Array.isArray(body.highlights) ? body.highlights.map(String) : listFromText(text(body.highlights)),
    image: text(body.image),
  }
}

export async function GET() {
  if (!await requireAdmin()) return unauthorized()
  return NextResponse.json({ events: await readAdminEvents() })
}

export async function POST(request: Request) {
  if (!await requireAdmin()) return unauthorized()

  const body = await request.json().catch(() => null) as Record<string, unknown> | null
  if (!body) return NextResponse.json({ error: 'Invalid event data.' }, { status: 400 })

  const event = normalizeEvent(body)
  if (!event.title || !event.description || !event.date || !event.time || !event.venue || !event.image) {
    return NextResponse.json({ error: 'Event name, description, date, time, location, and image are required.' }, { status: 400 })
  }

  const events = await readAdminEvents()
  if (events.some((item) => item.slug === event.slug)) {
    return NextResponse.json({ error: 'An event with this slug already exists.' }, { status: 409 })
  }

  const updatedEvents = [event, ...events]
  await writeAdminEvents(updatedEvents)
  return NextResponse.json({ ok: true, events: updatedEvents })
}

export async function PUT(request: Request) {
  if (!await requireAdmin()) return unauthorized()

  const body = await request.json().catch(() => null) as Record<string, unknown> | null
  const slug = text(body?.slug)
  if (!body || !slug) return NextResponse.json({ error: 'Event slug is required.' }, { status: 400 })

  const events = await readAdminEvents()
  const index = events.findIndex((event) => event.slug === slug)
  if (index === -1) return NextResponse.json({ error: 'Event not found.' }, { status: 404 })

  events[index] = normalizeEvent(body, slug)
  await writeAdminEvents(events)
  return NextResponse.json({ ok: true, events })
}

export async function DELETE(request: Request) {
  if (!await requireAdmin()) return unauthorized()

  const { searchParams } = new URL(request.url)
  const slug = searchParams.get('slug') || ''
  if (!slug) return NextResponse.json({ error: 'Event slug is required.' }, { status: 400 })

  const events = await readAdminEvents()
  const updatedEvents = events.filter((event) => event.slug !== slug)
  if (updatedEvents.length === events.length) return NextResponse.json({ error: 'Event not found.' }, { status: 404 })

  await writeAdminEvents(updatedEvents)
  return NextResponse.json({ ok: true, events: updatedEvents })
}
