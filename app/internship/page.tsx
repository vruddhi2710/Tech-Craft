import Link from 'next/link'
import Image from 'next/image'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { readAdminCourses } from '../../lib/adminData'
import { ArrowRight, Award, BriefcaseBusiness, CalendarDays } from 'lucide-react'

export const metadata = {
  title: 'Internship | Tech-Craft',
  description:
    'Explore Tech-Craft internships from 15 days to 3 months with certificate support across practical technology tracks.',
}

export const dynamic = 'force-dynamic'

export default async function InternshipPage() {
  const courses = await readAdminCourses()

  return (
    <main className="min-h-screen bg-white text-zinc-950">
      <Navbar />

      <section className="relative overflow-hidden bg-[#f5f9ff] px-6 pb-20 pt-32 lg:pt-40">
        <div className="absolute inset-x-0 top-0 h-28 bg-[linear-gradient(135deg,rgba(37,99,235,0.12),transparent_55%)]" />
        <div className="absolute -right-20 top-32 h-64 w-64 rounded-full border-[42px] border-blue-100/80" />

        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-600">
              Tech-Craft Internship
            </p>
            <h1 className="mt-4 text-5xl font-black leading-tight sm:text-6xl lg:text-7xl">
              Practical internships for real project experience
            </h1>
            <p className="mt-6 text-lg leading-8 text-zinc-600">
              We provide internships from 15 days to 3 months with guided project work,
              mentor support, and certificates after successful completion.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-lg shadow-blue-100/50">
              <CalendarDays className="h-6 w-6 text-blue-600" />
              <p className="mt-3 text-2xl font-black">15 Days</p>
              <p className="text-sm font-bold text-zinc-500">Minimum duration</p>
            </div>
            <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-lg shadow-blue-100/50">
              <BriefcaseBusiness className="h-6 w-6 text-blue-600" />
              <p className="mt-3 text-2xl font-black">3 Months</p>
              <p className="text-sm font-bold text-zinc-500">Extended internship</p>
            </div>
            <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-lg shadow-blue-100/50">
              <Award className="h-6 w-6 text-blue-600" />
              <p className="mt-3 text-2xl font-black">Certificate</p>
              <p className="text-sm font-bold text-zinc-500">After completion</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-600">
                Internship Tracks
              </p>
              <h2 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">
                Choose your internship area
              </h2>
            </div>

            <Link
              href="/inquiry"
              className="inline-flex w-fit items-center gap-2 rounded-md bg-blue-600 px-6 py-3 text-sm font-black text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700"
            >
              Apply Now
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <Link
                key={course.slug}
                href={`/inquiry?course=${course.slug}`}
                className="group overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-xl shadow-zinc-200/70 transition duration-300 hover:-translate-y-2 hover:border-blue-200"
              >
                <div className="relative h-60 overflow-hidden">
                  <Image
                    src={course.image}
                    alt={`${course.title} internship`}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/10 to-transparent" />
                  <h3 className="absolute bottom-5 left-5 right-5 text-2xl font-black text-white">
                    {course.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
