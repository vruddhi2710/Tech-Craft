'use client'

import { FormEvent, useMemo, useState } from 'react'
import type { Course } from '../data/courses'

type InquiryFormProps = {
  courses: Pick<Course, 'slug' | 'title'>[]
  defaultCourse?: string
}

type FormState = {
  name: string
  address: string
  course: string
  email: string
  phone: string
  message: string
}

type InquiryResponse = {
  ok?: boolean
  error?: string
  email?: {
    sent: boolean
    reason?: string
  }
}

const emptyForm: FormState = {
  name: '',
  address: '',
  course: '',
  email: '',
  phone: '',
  message: '',
}

export default function InquiryForm({ courses, defaultCourse }: InquiryFormProps) {
  const selectedCourse = useMemo(() => {
    return courses.some((course) => course.slug === defaultCourse) ? defaultCourse || '' : ''
  }, [courses, defaultCourse])

  const [form, setForm] = useState<FormState>({
    ...emptyForm,
    course: selectedCourse,
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [statusMessage, setStatusMessage] = useState('')

  function updateField(field: keyof FormState, value: string) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }))
  }

  async function submitInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('loading')
    setStatusMessage('')

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })

      const result = await response.json() as InquiryResponse

      if (!response.ok) {
        throw new Error(result.error || 'Something went wrong. Please try again.')
      }

      setStatus('success')
      setStatusMessage('Inquiry submitted successfully. Tech-Craft will contact you soon.')
      setForm({
        ...emptyForm,
        course: selectedCourse,
      })
    } catch (error) {
      setStatus('error')
      setStatusMessage(error instanceof Error ? error.message : 'Something went wrong. Please try again.')
    }
  }

  return (
    <form onSubmit={submitInquiry} className="rounded-3xl border border-white/10 bg-slate-900 p-6 md:p-8">
      <div className="grid gap-5 md:grid-cols-2">
        <label className="block">
          <span className="text-sm font-semibold text-slate-200">Name</span>
          <input
            required
            value={form.name}
            onChange={(event) => updateField('name', event.target.value)}
            className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-300"
            placeholder="Student name"
          />
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-slate-200">Email</span>
          <input
            required
            type="email"
            value={form.email}
            onChange={(event) => updateField('email', event.target.value)}
            className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-300"
            placeholder="student@example.com"
          />
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-slate-200">Phone Number</span>
          <input
            required
            value={form.phone}
            onChange={(event) => updateField('phone', event.target.value)}
            className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-300"
            placeholder="Phone number"
          />
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-slate-200">Course</span>
          <select
            required
            value={form.course}
            onChange={(event) => updateField('course', event.target.value)}
            className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-300"
          >
            <option value="">Select a course</option>
            {courses.map((course) => (
              <option key={course.slug} value={course.slug}>
                {course.title}
              </option>
            ))}
          </select>
        </label>

        <label className="block md:col-span-2">
          <span className="text-sm font-semibold text-slate-200">Address</span>
          <textarea
            required
            value={form.address}
            onChange={(event) => updateField('address', event.target.value)}
            className="mt-2 min-h-24 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-300"
            placeholder="Student address"
          />
        </label>

        <label className="block md:col-span-2">
          <span className="text-sm font-semibold text-slate-200">Message</span>
          <textarea
            value={form.message}
            onChange={(event) => updateField('message', event.target.value)}
            className="mt-2 min-h-24 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-300"
            placeholder="Anything else the student wants to share"
          />
        </label>
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === 'loading'}
          className="rounded-full bg-cyan-400 px-7 py-3 font-semibold text-black transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === 'loading' ? 'Submitting...' : 'Submit Inquiry'}
        </button>

        {statusMessage ? (
          <p className={status === 'success' ? 'text-sm text-cyan-200' : 'text-sm text-red-300'}>
            {statusMessage}
          </p>
        ) : null}
      </div>
    </form>
  )
}
