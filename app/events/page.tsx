import Link from 'next/link'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { events } from '../../data/events'
import { ArrowRight, CalendarDays, Clock, GraduationCap, MapPin, Ticket, Users } from 'lucide-react'

export const metadata = {
  title: 'Events',
  description: 'Upcoming Tech-Craft course events, workshops, demo classes, and career sessions.',
}

function formatEventDate(date: string) {
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date))
}

export default function EventsPage() {
  const nextEvent = events[0]

  return (
    <main className="min-h-screen overflow-hidden bg-white text-zinc-950">
      <Navbar />

      <section className="relative bg-[#f5f9ff] px-6 pb-20 pt-32 lg:pt-40">
        <div className="absolute inset-x-0 top-0 h-28 bg-[linear-gradient(135deg,rgba(37,99,235,0.1),transparent_55%)]" />
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="relative">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-600">
              Upcoming Events
            </p>
            <h1 className="mt-4 text-4xl font-black leading-tight sm:text-6xl">
              Learn, meet mentors, and plan your next course
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-600">
              Join Tech-Craft events for demo classes, course workshops, project sessions,
              and placement-focused career guidance.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/inquiry"
                className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-6 py-3 text-sm font-black text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700"
              >
                Register Interest
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/#courses"
                className="inline-flex items-center gap-2 rounded-md border border-zinc-300 bg-white px-6 py-3 text-sm font-black text-zinc-950 transition hover:border-blue-200 hover:text-blue-700"
              >
                <GraduationCap className="h-4 w-4" />
                View Courses
              </Link>
            </div>
          </div>

          <div className="relative rounded-2xl border border-zinc-200 bg-white p-6 shadow-2xl shadow-blue-100/80">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <CalendarDays className="h-6 w-6" />
              </span>
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-600">
                  Next Event
                </p>
                <h2 className="mt-1 text-2xl font-black">{nextEvent.title}</h2>
              </div>
            </div>
            <div className="mt-6 grid gap-3 text-sm font-bold text-zinc-700 sm:grid-cols-2">
              <div className="rounded-lg bg-zinc-50 p-4">
                <Clock className="mb-2 h-5 w-5 text-blue-600" />
                {formatEventDate(nextEvent.date)}
                <br />
                {nextEvent.time}
              </div>
              <div className="rounded-lg bg-zinc-50 p-4">
                <MapPin className="mb-2 h-5 w-5 text-blue-600" />
                {nextEvent.venue}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-600">
                Event Schedule
              </p>
              <h2 className="mt-3 text-4xl font-black">Course-related events</h2>
            </div>
            <p className="max-w-xl text-zinc-600">
              Dates may be updated based on batch schedule and seat availability. Register interest to confirm your spot.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {events.map((event) => (
              <article
                key={event.slug}
                className="rounded-xl border border-zinc-200 bg-white p-6 shadow-xl shadow-zinc-200/70 transition hover:-translate-y-1 hover:border-blue-200"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-600">
                      {event.course}
                    </p>
                    <h3 className="mt-2 text-2xl font-black text-zinc-950">{event.title}</h3>
                  </div>
                  <span className="w-fit rounded-md bg-blue-50 px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-blue-700">
                    {event.mode}
                  </span>
                </div>

                <p className="mt-4 leading-7 text-zinc-600">{event.description}</p>

                <div className="mt-6 grid gap-3 text-sm font-bold text-zinc-700 sm:grid-cols-3">
                  <div className="rounded-lg bg-zinc-50 p-4">
                    <CalendarDays className="mb-2 h-5 w-5 text-blue-600" />
                    {formatEventDate(event.date)}
                  </div>
                  <div className="rounded-lg bg-zinc-50 p-4">
                    <Clock className="mb-2 h-5 w-5 text-blue-600" />
                    {event.time}
                  </div>
                  <div className="rounded-lg bg-zinc-50 p-4">
                    <Ticket className="mb-2 h-5 w-5 text-blue-600" />
                    {event.seats}
                  </div>
                </div>

                <div className="mt-4 flex items-start gap-3 rounded-lg bg-zinc-50 p-4 text-sm font-bold text-zinc-700">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
                  {event.venue}
                </div>

                <div className="mt-5 grid gap-2">
                  {event.highlights.map((highlight) => (
                    <div key={highlight} className="flex items-center gap-2 text-sm font-bold text-zinc-600">
                      <Users className="h-4 w-4 text-blue-600" />
                      {highlight}
                    </div>
                  ))}
                </div>

                <Link
                  href={`/inquiry?event=${event.slug}`}
                  className="mt-6 inline-flex items-center gap-2 rounded-md bg-blue-600 px-5 py-3 text-sm font-black text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700"
                >
                  Register for Event
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
