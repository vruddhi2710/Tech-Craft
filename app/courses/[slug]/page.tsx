import Link from 'next/link'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'
import CourseOutline from '../../../components/CourseOutline'
import type { Course } from '../../../data/courses'
import { readAdminCourses } from '../../../lib/adminData'
import { createSeoMetadata } from '../../seo'
import { ArrowLeft, ArrowRight, Award, BriefcaseBusiness, CheckCircle2, Clock, Handshake, Layers3, ListChecks, Wrench } from 'lucide-react'

type CoursePageProps = {
  params: Promise<{
    slug: string
  }>
}

const courseFeatures = [
  {
    title: 'ISO Certified Certificate',
    desc: 'Complete the course with ISO-certified certificate support from Tech-Craft.',
    icon: Award,
  },
  {
    title: 'Placement Training',
    desc: 'Get resume guidance, interview preparation, and job-readiness training.',
    icon: BriefcaseBusiness,
  },
  {
    title: 'Placement Support Assistance',
    desc: 'Receive placement guidance, profile support, and practical career assistance.',
    icon: Handshake,
  },
]

function getCourseOutline(course: Course) {
  if (course.outline?.length) {
    return course.outline
  }

  return course.modules.map((module) => ({
    title: module,
    topics: [
      'Step-by-step lessons with guided practice',
      'Hands-on exercises based on real learning scenarios',
      'Doubt solving and revision before moving ahead',
    ],
  }))
}

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: CoursePageProps) {
  const { slug } = await params
  const courses = await readAdminCourses()
  const course = courses.find((item) => item.slug === slug)

  if (!course) {
    return {
      title: 'Course Not Found | Tech-Craft',
      robots: {
        index: false,
        follow: false,
      },
    }
  }

  return createSeoMetadata({
    title: `${course.title} Course in Ahmedabad | Tech-Craft`,
    description: `${course.desc} Learn ${course.title} with practical training, projects, certification, placement support and career guidance at Tech-Craft Ahmedabad.`,
    path: `/courses/${course.slug}`,
    image: course.image,
    keywords: [
      `${course.title} course`,
      `${course.title} training`,
      `${course.title} Ahmedabad`,
      'Full Stack Development Course',
      'Placement Support',
      'Placement Assistance',
      'Internship with Live Project',
    ],
  })
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { slug } = await params
  const courses = await readAdminCourses()
  const course = courses.find((item) => item.slug === slug)

  if (!course) {
    redirect('/courses')
  }

  const outline = getCourseOutline(course)

  return (
    <main className="min-h-screen overflow-hidden bg-white text-zinc-950">
      <Navbar />

      <section className="relative bg-[#f5f9ff] px-6 pb-24 pt-32 lg:pt-40">
        <div className="absolute inset-x-0 top-0 h-28 bg-[linear-gradient(135deg,rgba(37,99,235,0.1),transparent_55%)]" />
        <div className="absolute -right-20 top-28 h-64 w-64 rounded-full border-[42px] border-blue-100/80" />

        <div className="relative mx-auto max-w-7xl">
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 text-sm font-black text-blue-600 transition hover:text-blue-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Courses
          </Link>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-600">
                Tech-Craft Course
              </p>

              <h1 className="mt-4 text-5xl font-black leading-tight md:text-7xl">
                {course.title}
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600">
                {course.tagline}
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-lg shadow-blue-100/50">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <Clock className="h-5 w-5" />
                  </div>
                  <p className="mt-3 text-sm font-bold text-zinc-500">Duration</p>
                  <p className="mt-1 font-black text-zinc-950">{course.duration}</p>
                </div>

                <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-lg shadow-blue-100/50">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <Layers3 className="h-5 w-5" />
                  </div>
                  <p className="mt-3 text-sm font-bold text-zinc-500">Level</p>
                  <p className="mt-1 font-black text-zinc-950">{course.level}</p>
                </div>
              </div>

              <Link
                href={`/inquiry?course=${course.slug}`}
                className="mt-8 inline-flex items-center gap-2 rounded-md bg-blue-600 px-6 py-3 font-black text-white shadow-xl shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700"
              >
                Join This Course
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="relative">
              <div className="absolute -right-5 -top-5 h-24 w-24 rounded-xl bg-blue-600" />
              <div className="absolute -bottom-5 -left-5 h-28 w-28 rounded-xl bg-zinc-950" />
              <div className="relative overflow-hidden rounded-2xl border-8 border-white bg-white shadow-2xl shadow-zinc-300/70">
              <Image
                src={course.image}
                alt={`${course.title} course`}
                width={900}
                height={675}
                priority
                sizes="(min-width: 1024px) 48vw, 100vw"
                className="aspect-[4/3] w-full object-cover"
              />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-3">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-600">
              Learning Outcomes
            </p>
            <h2 className="mt-4 text-4xl font-black">What You Will Learn</h2>
            <p className="mt-4 text-zinc-600">
              A focused course path with practical lessons, guided builds, and portfolio-ready outcomes.
            </p>
          </div>

          <div className="grid gap-4 lg:col-span-2">
            {course.highlights.map((item) => (
              <div key={item} className="flex gap-4 rounded-xl border border-zinc-200 bg-zinc-50 p-5">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
                <p className="font-bold leading-7 text-zinc-700">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f5f9ff] px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-600">
              Course Benefits
            </p>
            <h2 className="mt-4 text-4xl font-black leading-tight">
              Certification, training, and support included
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {courseFeatures.map((feature) => {
              const Icon = feature.icon

              return (
                <div key={feature.title} className="rounded-xl border border-zinc-200 bg-white p-6 shadow-lg shadow-blue-100/50">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-xl font-black text-zinc-950">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-sm font-bold leading-6 text-zinc-600">
                    {feature.desc}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-zinc-50 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-600">
                Course Outline
              </p>
              <h2 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">
                {outline.length} Modules
              </h2>
              <p className="mt-4 max-w-2xl leading-7 text-zinc-600">
                A structured module-by-module path designed for practical learning, revision, and project work.
              </p>
            </div>

            <Link
              href={`/inquiry?course=${course.slug}`}
              className="inline-flex w-fit items-center gap-2 rounded-md bg-blue-600 px-6 py-3 text-sm font-black text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700"
            >
              Enroll Now
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <CourseOutline outline={outline} />
        </div>
      </section>

      <section className="bg-white px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
          <div className="rounded-xl border border-zinc-200 bg-white p-8 shadow-xl shadow-zinc-200/70">
            <h2 className="flex items-center gap-3 text-3xl font-black">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <Wrench className="h-5 w-5" />
              </span>
              Tools
            </h2>
            <div className="mt-8 flex flex-wrap gap-3">
              {course.tools.map((tool) => (
                <span key={tool} className="rounded-md border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700">
                  {tool}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-zinc-200 bg-white p-8 shadow-xl shadow-zinc-200/70">
            <h2 className="flex items-center gap-3 text-3xl font-black">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <ListChecks className="h-5 w-5" />
              </span>
              Projects
            </h2>
            <div className="mt-8 space-y-4">
              {course.projects.map((project) => (
                <p key={project} className="rounded-lg bg-zinc-50 px-4 py-3 font-bold text-zinc-600">
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
