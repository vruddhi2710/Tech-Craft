'use client'

import { CheckCircle2, ChevronDown } from 'lucide-react'
import { useState } from 'react'

type CourseOutlineModule = {
  title: string
  topics: string[]
}

type CourseOutlineProps = {
  outline: CourseOutlineModule[]
}

export default function CourseOutline({ outline }: CourseOutlineProps) {
  const [openModule, setOpenModule] = useState<number | null>(null)

  return (
    <div className="grid items-start gap-4 lg:grid-cols-2">
      {outline.map((module, index) => {
        const isOpen = openModule === index
        const panelId = `course-module-${index + 1}`

        return (
          <div
            key={`${module.title}-${index}`}
            className="self-start overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-xl shadow-zinc-200/70"
          >
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpenModule(isOpen ? null : index)}
              className="flex w-full items-start gap-4 p-6 text-left transition hover:bg-blue-50/60"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-lg font-black text-white">
                {index + 1}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-xs font-black uppercase tracking-[0.18em] text-blue-600">
                  Module {index + 1}
                </span>
                <span className="mt-2 block text-2xl font-black text-zinc-950">
                  {module.title}
                </span>
              </span>
              <ChevronDown
                className={`mt-2 h-5 w-5 shrink-0 text-blue-600 transition ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {isOpen ? (
              <ul id={panelId} className="grid gap-3 border-t border-zinc-100 px-6 pb-6 pt-5">
                {module.topics.map((topic) => (
                  <li key={topic} className="flex gap-3 text-sm font-bold leading-6 text-zinc-600">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
                    {topic}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        )
      })}
    </div>
  )
}
