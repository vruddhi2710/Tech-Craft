import Link from 'next/link'

export default function Footer() {
  return (
    <footer
      id="contact"
      className="border-t border-zinc-800 bg-zinc-950 px-6 py-14 text-white"
    >
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <h2 className="text-3xl font-black">
            Tech<span className="text-blue-500">Craft</span>
          </h2>

          <p className="mt-4 max-w-xl text-zinc-400">
            Learn future-ready tech skills with practical courses, workshops, and internship guidance.
          </p>
        </div>

        <div>
          <h3 className="font-black">Courses</h3>
          <div className="mt-4 grid gap-2 text-sm text-zinc-400">
            <span>ReactJS</span>
            <span>Python</span>
            <span>GenAI</span>
            <span>Web Design</span>
          </div>
        </div>

        <div>
          <h3 className="font-black">Contact</h3>
          <div className="mt-4 grid gap-2 text-sm text-zinc-400">
            <span>Career counseling</span>
            <span>Workshop batches</span>
            <span>Internship inquiry</span>
            <Link href="/feedback" className="transition hover:text-blue-400">
              Feedback
            </Link>
          </div>
        </div>

        <div className="border-t border-zinc-800 pt-8 text-sm text-zinc-500 md:col-span-3">
          © 2026 Tech-Craft. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
