'use client'

import { FormEvent, useEffect, useState } from 'react'
import { MessageCircle, Send, X } from 'lucide-react'
import { usePathname } from 'next/navigation'

type FormState = {
  name: string
  email: string
  phone: string
  course: string
  address: string
  message: string
}

type InquiryResponse = {
  ok?: boolean
  error?: string
}

type CourseOption = {
  slug: string
  title: string
}

const emptyForm: FormState = {
  name: '',
  email: '',
  phone: '',
  course: '',
  address: '',
  message: '',
}

export default function FreeConsultationWidget() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [form, setForm] = useState<FormState>(emptyForm)
  const [courses, setCourses] = useState<CourseOption[]>([])
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [statusMessage, setStatusMessage] = useState('')

  useEffect(() => {
    async function loadCourses() {
      try {
        const response = await fetch('/api/public/courses')
        const data = await response.json() as { courses?: CourseOption[] }
        setCourses(data.courses || [])
      } catch {
        setCourses([])
      }
    }

    if (isOpen && courses.length === 0) {
      loadCourses()
    }
  }, [courses.length, isOpen])

  if (pathname?.startsWith('/admin')) {
    return null
  }

  function updateField(field: keyof FormState, value: string) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }))
  }

  function closeModal() {
    setIsOpen(false)
    setStatus('idle')
    setStatusMessage('')
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
      setStatusMessage('Thank you. Tech-Craft will contact you soon.')
      setForm(emptyForm)
    } catch (error) {
      setStatus('error')
      setStatusMessage(error instanceof Error ? error.message : 'Something went wrong. Please try again.')
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed right-0 top-1/2 z-[60] hidden -translate-y-1/2 items-center gap-2 rounded-l-md bg-blue-600 px-3 py-4 text-sm font-black uppercase tracking-[0.12em] text-white shadow-2xl shadow-blue-950/30 transition hover:bg-blue-700 lg:flex [writing-mode:vertical-rl]"
        aria-label="Open free consultation form"
      >
        <MessageCircle className="h-5 w-5" />
        Free Consultation
      </button>

      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-5 right-5 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-2xl shadow-blue-950/30 transition hover:bg-blue-700 lg:hidden"
        aria-label="Open free consultation form"
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {isOpen ? (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-zinc-950/60 px-4 py-6 backdrop-blur-sm">
          <div className="max-h-[calc(100vh-3rem)] w-full max-w-2xl overflow-y-auto rounded-xl bg-white p-6 shadow-2xl shadow-zinc-950/30 sm:p-8">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-600">
                  Free Consultation
                </p>
                <h2 className="mt-2 text-3xl font-black text-zinc-950">
                  Get Course Guidance
                </h2>
                <p className="mt-2 text-sm leading-6 text-zinc-600">
                  Share your details and our team will help you choose the right course or internship path.
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-zinc-200 bg-zinc-50 text-zinc-950 transition hover:bg-zinc-100"
                aria-label="Close free consultation form"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={submitInquiry} className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-black text-zinc-800">Name</span>
                <input
                  required
                  value={form.name}
                  onChange={(event) => updateField('name', event.target.value)}
                  className="mt-2 w-full rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-zinc-950 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
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
                  className="mt-2 w-full rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-zinc-950 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  placeholder="student@example.com"
                />
              </label>

              <label className="block">
                <span className="text-sm font-black text-zinc-800">Phone Number</span>
                <input
                  required
                  value={form.phone}
                  onChange={(event) => updateField('phone', event.target.value)}
                  className="mt-2 w-full rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-zinc-950 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
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

              <label className="block sm:col-span-2">
                <span className="text-sm font-black text-zinc-800">Address</span>
                <textarea
                  required
                  value={form.address}
                  onChange={(event) => updateField('address', event.target.value)}
                  className="mt-2 min-h-20 w-full resize-y rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-zinc-950 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  placeholder="Student address"
                />
              </label>

              <label className="block sm:col-span-2">
                <span className="text-sm font-black text-zinc-800">Message</span>
                <textarea
                  value={form.message}
                  onChange={(event) => updateField('message', event.target.value)}
                  className="mt-2 min-h-20 w-full resize-y rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-zinc-950 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  placeholder="Course, internship, batch timing, or other questions"
                />
              </label>

              <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-blue-600 px-6 py-3 font-black text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === 'loading' ? 'Submitting...' : 'Submit'}
                  <Send className="h-4 w-4" />
                </button>

                {statusMessage ? (
                  <p className={status === 'success' ? 'rounded-md bg-blue-50 px-4 py-3 text-sm font-bold text-blue-700' : 'rounded-md bg-rose-50 px-4 py-3 text-sm font-bold text-rose-700'}>
                    {statusMessage}
                  </p>
                ) : null}
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  )
}
