import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import FeedbackForm from '../../components/FeedbackForm'
import { MessageSquareHeart, Sparkles, ThumbsUp } from 'lucide-react'

export const metadata = {
  title: 'Feedback',
  description: 'Share your feedback with Tech-Craft.',
}

export default function FeedbackPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-white text-zinc-950">
      <Navbar />

      <section className="bg-[#f5f9ff] px-6 pb-24 pt-32 lg:pt-40">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="flex flex-col justify-center">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-600">
              Feedback
            </p>
            <h1 className="mt-4 text-4xl font-black leading-tight sm:text-6xl">
              Help us improve Tech-Craft
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-600">
              Share your learning experience, suggestions, or anything our team
              can do better for students.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                {
                  icon: MessageSquareHeart,
                  title: 'Your experience',
                  text: 'Tell us what worked well for you.',
                },
                {
                  icon: Sparkles,
                  title: 'Suggestions',
                  text: 'Share ideas for classes or workshops.',
                },
                {
                  icon: ThumbsUp,
                  title: 'Improvements',
                  text: 'Help us make learning smoother.',
                },
              ].map((item) => {
                const Icon = item.icon

                return (
                  <div
                    key={item.title}
                    className="rounded-xl border border-zinc-200 bg-white p-5 shadow-lg shadow-blue-100/50"
                  >
                    <Icon className="mb-3 h-6 w-6 text-blue-600" />
                    <h2 className="font-black text-zinc-950">{item.title}</h2>
                    <p className="mt-1 text-sm leading-6 text-zinc-600">{item.text}</p>
                  </div>
                )
              })}
            </div>
          </div>

          <FeedbackForm />
        </div>
      </section>

      <Footer />
    </main>
  )
}
