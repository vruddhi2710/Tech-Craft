'use client'

import { FormEvent, useEffect, useMemo, useState } from 'react'
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

  useEffect(() => {
    if (!selectedCourse) return

    setForm((current) => ({
      ...current,
      course: selectedCourse,
    }))
  }, [selectedCourse])

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
    <form onSubmit={submitInquiry} className="rounded-xl bg-white p-2">
      <div className="mb-8">
        <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-600">
          Admission Form
        </p>
        <h2 className="mt-3 text-3xl font-black text-zinc-950">
          Course Inquiry
        </h2>
        <p className="mt-2 text-sm leading-6 text-zinc-600">
          Fill the form and our team will guide you with course details, batches, and next steps.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="block">
          <span className="text-sm font-black text-zinc-800">Name</span>
          <input
            required
            value={form.name}
            onChange={(event) => updateField('name', event.target.value)}
            className="mt-2 w-full rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
            placeholder="Student name"
          />
        </label>

        <label className="block">
          <span className="text-sm font-black text-zinc-800">Email</span>
          <input
            required
            type="email"
            value={form.email}
            onChange={(event) => updateField('email', event.target.value)}
            className="mt-2 w-full rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
            placeholder="student@example.com"
          />
        </label>

        <label className="block">
          <span className="text-sm font-black text-zinc-800">Phone Number</span>
          <input
            required
            value={form.phone}
            onChange={(event) => updateField('phone', event.target.value)}
            className="mt-2 w-full rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
            placeholder="Phone number"
          />
        </label>

        <label className="block">
          <span className="text-sm font-black text-zinc-800">Course</span>
          <select
            required
            value={form.course}
            onChange={(event) => updateField('course', event.target.value)}
            className="mt-2 w-full rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-zinc-950 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
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
          <span className="text-sm font-black text-zinc-800">Address</span>
          <textarea
            required
            value={form.address}
            onChange={(event) => updateField('address', event.target.value)}
            className="mt-2 min-h-24 w-full resize-y rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
            placeholder="Student address"
          />
        </label>

        <label className="block md:col-span-2">
          <span className="text-sm font-black text-zinc-800">Message</span>
          <textarea
            value={form.message}
            onChange={(event) => updateField('message', event.target.value)}
            className="mt-2 min-h-24 w-full resize-y rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
            placeholder="Anything else the student wants to share"
          />
        </label>
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === 'loading'}
          className="rounded-md bg-blue-600 px-7 py-3 font-black text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === 'loading' ? 'Submitting...' : 'Submit Inquiry'}
        </button>

        {statusMessage ? (
          <p className={status === 'success' ? 'rounded-md bg-blue-50 px-4 py-3 text-sm font-bold text-blue-700' : 'rounded-md bg-rose-50 px-4 py-3 text-sm font-bold text-rose-700'}>
            {statusMessage}
          </p>
        ) : null}
      </div>
    </form>
  )
}
