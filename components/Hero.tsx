import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Award, BriefcaseBusiness, CheckCircle2, PlayCircle, Star, Users } from 'lucide-react'

const stats = [
  { value: 'ISO', label: 'Certified Training', icon: Award },
  { value: '4.8', label: 'Student Rating', icon: Star },
  { value: '100%', label: 'Placement Support', icon: BriefcaseBusiness },
]

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden bg-[#071a3d] px-6 pb-20 pt-36 text-white lg:pt-44"
    >
      <div className="absolute inset-x-0 top-0 h-24 bg-[linear-gradient(135deg,rgba(255,255,255,0.12),transparent_55%)]" />
      <div className="absolute -right-20 top-28 h-64 w-64 rounded-full border-[42px] border-white/10" />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.02fr_0.98fr]">
        <div className="relative z-10">
          <div className="mb-6 inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/10 px-4 py-2 text-sm font-black text-blue-100 shadow-sm">
            <Users className="h-4 w-4" />
            Skill-based training for real career growth
          </div>

          <h1 className="hero-title max-w-4xl text-4xl font-black leading-tight text-white sm:text-6xl lg:text-7xl">
            Learn like top tech students &
            <span className="block text-blue-300">
              achieve professional jobs
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-blue-100">
            Industry-focused courses in AI, coding, web development, and internships
            with ISO-certified certification, practical training, and placement support.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/inquiry"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-white px-6 py-3 text-sm font-black text-blue-700 shadow-xl shadow-blue-950/20 transition hover:-translate-y-0.5 hover:bg-blue-50"
            >
              Enroll Now
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/#courses"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-white/20 bg-white/10 px-6 py-3 text-sm font-black text-white transition hover:border-white/40 hover:bg-white/15"
            >
              <PlayCircle className="h-4 w-4" />
              Explore Courses
            </Link>
          </div>

          <div className="mt-10 grid gap-3 text-sm font-bold text-blue-50 sm:grid-cols-3">
            {['ISO-certified certification', 'Training support', 'Placement support'].map((item) => (
              <div key={item} className="flex items-center gap-2 rounded-md bg-white/10 px-3 py-2 shadow-sm">
                <CheckCircle2 className="h-4 w-4 text-blue-300" />
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -right-6 -top-6 h-28 w-28 rounded-xl bg-blue-500" />
          <div className="absolute -bottom-6 -left-6 h-32 w-32 rounded-xl bg-white/10" />
          <Image
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
            alt="Students learning technology together"
            width={900}
            height={675}
            priority
            sizes="(min-width: 1024px) 48vw, 100vw"
            className="relative aspect-[4/3] w-full rounded-2xl border-8 border-white object-cover shadow-2xl shadow-blue-950/50"
          />
          <div className="absolute -bottom-7 left-4 right-4 grid grid-cols-3 gap-3 rounded-xl border border-white/10 bg-white p-4 text-center shadow-2xl shadow-blue-950/40 sm:left-8 sm:right-8">
            {stats.map((stat) => {
              const Icon = stat.icon

              return (
                <div key={stat.label}>
                  <Icon className="mx-auto mb-1 h-5 w-5 text-blue-600" />
                  <p className="text-2xl font-black text-zinc-950">{stat.value}</p>
                  <p className="text-xs font-bold text-zinc-500">{stat.label}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
