import Link from 'next/link'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { courses } from '../../data/courses'
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  BriefcaseBusiness,
  CheckCircle2,
  Clock,
  Layers3,
} from 'lucide-react'

export const metadata = {
  title: 'Courses | Tech-Craft',
  description:
    'Explore all Tech-Craft courses including ReactJS, Python, SQL, NodeJs, MERN Stack, Full Stack, GenAI, and basic coding.',
}

export default function CoursesPage() {
  return (
    <main className="min-h-screen bg-white text-zinc-950">
      <Navbar />

      <section className="relative overflow-hidden bg-[#f5f9ff] px-6 pb-20 pt-32 lg:pt-40">
        <div className="absolute inset-x-0 top-0 h-28 bg-[linear-gradient(135deg,rgba(37,99,235,0.12),transparent_55%)]" />
        <div className="absolute -right-20 top-32 h-64 w-64 rounded-full border-[42px] border-blue-100/80" />

        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-600">
              Tech-Craft Courses
            </p>
            <h1 className="mt-4 text-5xl font-black leading-tight sm:text-6xl lg:text-7xl">
              Learn practical skills for real tech careers
            </h1>
            <p className="mt-6 text-lg leading-8 text-zinc-600">
              Browse every available course and open any course page to view duration, level,
              learning outcomes, modules, tools, projects, certification, and placement support.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-lg shadow-blue-100/50">
              <CheckCircle2 className="h-6 w-6 text-blue-600" />
              <p className="mt-3 text-2xl font-black">{courses.length}+</p>
              <p className="text-sm font-bold text-zinc-500">Available courses</p>
            </div>
            <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-lg shadow-blue-100/50">
              <Award className="h-6 w-6 text-blue-600" />
              <p className="mt-3 text-2xl font-black">ISO</p>
              <p className="text-sm font-bold text-zinc-500">Certified certificate</p>
            </div>
            <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-lg shadow-blue-100/50">
              <BriefcaseBusiness className="h-6 w-6 text-blue-600" />
              <p className="mt-3 text-2xl font-black">Career</p>
              <p className="text-sm font-bold text-zinc-500">Training and support</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-600">
                All Courses
              </p>
              <h2 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">
                Choose your learning path
              </h2>
            </div>

            <Link
              href="/inquiry"
              className="inline-flex w-fit items-center gap-2 rounded-md bg-blue-600 px-6 py-3 text-sm font-black text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700"
            >
              Ask For Guidance
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <Link
                key={course.slug}
                href={`/courses/${course.slug}`}
                className="group overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-xl shadow-zinc-200/70 transition duration-300 hover:-translate-y-2 hover:border-blue-200"
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={course.image}
                    alt={`${course.title} course`}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/10 to-transparent" />
                  <span className="absolute left-4 top-4 rounded-md bg-white px-3 py-1 text-xs font-black text-blue-600">
                    {course.duration}
                  </span>
                  <span className="absolute bottom-4 left-4 rounded-md bg-blue-600 px-3 py-1 text-xs font-black text-white">
                    {course.level}
                  </span>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-2xl font-black text-zinc-950">
                        {course.title}
                      </h3>
                      <p className="mt-2 font-bold text-blue-600">{course.desc}</p>
                    </div>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-blue-50 text-blue-600 transition group-hover:rotate-6 group-hover:bg-blue-600 group-hover:text-white">
                      <ArrowUpRight className="h-5 w-5" />
                    </span>
                  </div>

                  <p className="mt-4 min-h-20 leading-7 text-zinc-600">
                    {course.tagline}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2 text-xs font-bold text-zinc-600">
                    <span className="inline-flex items-center gap-1.5 rounded-md bg-zinc-100 px-3 py-1.5">
                      <Clock className="h-3.5 w-3.5 text-blue-600" />
                      {course.duration}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-md bg-zinc-100 px-3 py-1.5">
                      <Layers3 className="h-3.5 w-3.5 text-blue-600" />
                      {course.modules.length} modules
                    </span>
                  </div>
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
