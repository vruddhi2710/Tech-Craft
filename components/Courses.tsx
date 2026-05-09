import Link from 'next/link'
import { courses } from '../data/courses'

export default function Courses() {
  return (
    <section id="courses" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-16">
          Trending Courses
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {courses.map((course) => (
            <Link
              key={course.slug}
              href={`/courses/${course.slug}`}
              className="group bg-slate-900 border border-white/10 p-6 rounded-3xl transition hover:-translate-y-2 hover:border-cyan-400/60 hover:bg-slate-900/80"
            >
              <h3 className="text-2xl font-bold text-cyan-400">
                {course.title}
              </h3>

              <p className="mt-4 text-slate-300">
                {course.desc}
              </p>

              <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white">
                View Course
                <span className="transition group-hover:translate-x-1" aria-hidden="true">
                  -&gt;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
