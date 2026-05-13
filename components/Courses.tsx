'use client'

import Link from 'next/link'
import { ArrowUpRight, Clock, Layers3 } from 'lucide-react'
import { useState } from 'react'
import { courses } from '../data/courses'

const categoryFilters = {
  'Popular Courses': ['reactjs', 'python', 'genai', 'web-design'],
  Coding: ['basic-coding', 'python', 'reactjs', 'nodejs'],
  Frontend: ['reactjs', 'web-design', 'basic-coding'],
  Backend: ['nodejs', 'python', 'sql'],
  'Full Stack': ['mern-stack', 'full-stack', 'reactjs', 'nodejs'],
  Database: ['sql', 'nodejs', 'mern-stack'],
  'AI/ML': ['genai', 'python'],
}

type Category = keyof typeof categoryFilters

const categories = Object.keys(categoryFilters) as Category[]

export default function Courses() {
  const [activeCategory, setActiveCategory] = useState<Category>('Popular Courses')
  const visibleCourses = courses.filter((course) => categoryFilters[activeCategory].includes(course.slug))

  return (
    <section id="courses" className="relative bg-[#071a3d] px-6 py-24 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-300">
            Explore Courses
          </p>
          <h2 className="mt-4 text-4xl font-black sm:text-5xl">
            Our Most In-Demand Courses
          </h2>
          <p className="mt-5 text-lg leading-8 text-blue-100">
            Choose a practical career track and build work you can proudly show.
          </p>
        </div>

        <div className="mb-10 flex flex-wrap justify-center gap-3">
          {categories.map((category) => {
            const isActive = activeCategory === category

            return (
              <button
                key={category}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveCategory(category)}
                className={`rounded-md border px-4 py-2 text-sm font-black transition ${
                  isActive
                    ? 'border-blue-400 bg-blue-500 text-white shadow-lg shadow-blue-950/20'
                    : 'border-white/15 bg-white/10 text-blue-50 hover:border-blue-300 hover:bg-white hover:text-blue-700'
                }`}
              >
                {category}
              </button>
            )
          })}
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {visibleCourses.map((course) => (
            <Link
              key={course.slug}
              href={`/courses/${course.slug}`}
              className="group overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-xl shadow-zinc-200/70 transition duration-300 hover:-translate-y-2 hover:border-blue-200"
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={course.image}
                  alt={`${course.title} course`}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/75 via-transparent to-transparent" />
                <span className="absolute left-4 top-4 rounded-md bg-white px-3 py-1 text-xs font-black text-blue-600">
                  {course.duration}
                </span>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-2xl font-black text-zinc-950">
                    {course.title}
                  </h3>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-blue-50 text-blue-600 transition group-hover:rotate-6 group-hover:bg-blue-600 group-hover:text-white">
                    <ArrowUpRight className="h-5 w-5" />
                  </span>
                </div>
                <p className="mt-4 min-h-12 text-zinc-600">
                  {course.desc}
                </p>

                <div className="mt-6 flex flex-wrap gap-2 text-xs font-bold text-zinc-600">
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-zinc-100 px-3 py-1.5">
                    <Clock className="h-3.5 w-3.5 text-blue-600" />
                    {course.duration}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-zinc-100 px-3 py-1.5">
                    <Layers3 className="h-3.5 w-3.5 text-blue-600" />
                    {course.level}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
