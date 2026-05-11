'use client'

import { FormEvent, useState } from 'react'
import { Send, Star } from 'lucide-react'

const ratings = [1, 2, 3, 4, 5]

export default function FeedbackForm() {
  const [rating, setRating] = useState(5)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitted(true)
    event.currentTarget.reset()
    setRating(5)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-5 rounded-2xl border border-zinc-200 bg-white p-5 shadow-2xl shadow-blue-100/70 sm:p-6"
    >
      <label className="grid gap-2">
        <span className="text-sm font-black text-zinc-800">Your Name</span>
        <input
          name="name"
          required
          placeholder="Enter your name"
          className="rounded-lg border border-zinc-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
        />
      </label>

      <label className="grid gap-2">
        <span className="text-sm font-black text-zinc-800">Email</span>
        <input
          name="email"
          type="email"
          required
          placeholder="student@example.com"
          className="rounded-lg border border-zinc-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
        />
      </label>

      <div>
        <span className="text-sm font-black text-zinc-800">Rating</span>
        <div className="mt-3 flex gap-2">
          {ratings.map((value) => (
            <button
              key={value}
              type="button"
              aria-label={`${value} star rating`}
              onClick={() => setRating(value)}
              className={`flex h-11 w-11 items-center justify-center rounded-lg border transition ${
                value <= rating
                  ? 'border-blue-600 bg-blue-600 text-white'
                  : 'border-zinc-200 bg-zinc-50 text-zinc-500 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700'
              }`}
            >
              <Star className="h-5 w-5" fill="currentColor" />
            </button>
          ))}
        </div>
        <input type="hidden" name="rating" value={rating} />
      </div>

      <label className="grid gap-2">
        <span className="text-sm font-black text-zinc-800">Feedback</span>
        <textarea
          name="feedback"
          required
          rows={5}
          placeholder="Tell us about your experience"
          className="resize-none rounded-lg border border-zinc-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
        />
      </label>

      {submitted ? (
        <p className="rounded-lg border border-blue-100 bg-blue-50 px-4 py-3 text-sm font-bold text-blue-700">
          Thank you for your feedback. We appreciate your time.
        </p>
      ) : null}

      <button
        type="submit"
        className="inline-flex items-center justify-center gap-2 rounded-md bg-blue-600 px-5 py-3 text-sm font-black text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700"
      >
        Submit Feedback
        <Send className="h-4 w-4" />
      </button>
    </form>
  )
}
