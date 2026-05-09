import Link from 'next/link'
import { notFound } from 'next/navigation'
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'
import { courses, getCourse } from '../../../data/courses'

type CoursePageProps = {
  params: Promise<{
    slug: string
  }>
}

export function generateStaticParams() {
  return courses.map((course) => ({
    slug: course.slug,
  }))
}

export async function generateMetadata({ params }: CoursePageProps) {
  const { slug } = await params
  const course = getCourse(slug)

  if (!course) {
    return {
      title: 'Course Not Found',
    }
  }

  return {
    title: `${course.title} Course`,
    description: course.desc,
    openGraph: {
      title: `${course.title} Course`,
      description: course.desc,
      images: [
        {
          url: course.image,
          alt: `${course.title} course`,
        },
      ],
    },
  }
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { slug } = await params
  const course = getCourse(slug)

  if (!course) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white overflow-hidden">
      <Navbar />

      <section className="px-6 pb-20 pt-32">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/#courses"
            className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 transition hover:text-cyan-200"
          >
            <span aria-hidden="true">-</span>
            Back to Courses
          </Link>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
                Tech-Craft Course
              </p>

              <h1 className="mt-4 text-5xl font-bold leading-tight md:text-7xl">
                {course.title}
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                {course.tagline}
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-slate-900 p-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-300/10 text-sm font-bold text-cyan-200">
                    D
                  </div>
                  <p className="mt-3 text-sm text-slate-400">Duration</p>
                  <p className="mt-1 font-semibold">{course.duration}</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-900 p-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-300/10 text-sm font-bold text-cyan-200">
                    L
                  </div>
                  <p className="mt-3 text-sm text-slate-400">Level</p>
                  <p className="mt-1 font-semibold">{course.level}</p>
                </div>
              </div>

              <Link
                href={`/inquiry?course=${course.slug}`}
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-cyan-400 px-6 py-3 font-semibold text-black transition hover:bg-cyan-300"
              >
                Join This Course
                <span aria-hidden="true">-&gt;</span>
              </Link>
            </div>

            <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900">
              <img
                src={course.image}
                alt={`${course.title} course`}
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-900/50 px-6 py-20">
        <div className="max-w-7xl mx-auto grid gap-8 lg:grid-cols-3">
          <div>
            <h2 className="text-4xl font-bold">What You Will Learn</h2>
            <p className="mt-4 text-slate-300">
              A focused course path with practical lessons, guided builds, and portfolio-ready outcomes.
            </p>
          </div>

          <div className="grid gap-4 lg:col-span-2">
            {course.highlights.map((item) => (
              <div key={item} className="flex gap-4 rounded-2xl border border-white/10 bg-slate-950 p-5">
                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-300 text-xs font-bold text-black">
                  C
                </span>
                <p className="text-slate-200">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto grid gap-8 lg:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-slate-900 p-8">
            <h2 className="text-3xl font-bold">Course Modules</h2>
            <div className="mt-8 space-y-5">
              {course.modules.map((module, index) => (
                <div key={module} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-400 font-bold text-black">
                    {index + 1}
                  </span>
                  <p className="pt-1 text-slate-300">{module}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900 p-8">
            <h2 className="flex items-center gap-3 text-3xl font-bold">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-300/10 text-base font-bold text-cyan-200">
                T
              </span>
              Tools
            </h2>
            <div className="mt-8 flex flex-wrap gap-3">
              {course.tools.map((tool) => (
                <span key={tool} className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-sm text-cyan-100">
                  {tool}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900 p-8">
            <h2 className="text-3xl font-bold">Projects</h2>
            <div className="mt-8 space-y-4">
              {course.projects.map((project) => (
                <p key={project} className="rounded-2xl bg-slate-950 px-4 py-3 text-slate-300">
                  {project}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
