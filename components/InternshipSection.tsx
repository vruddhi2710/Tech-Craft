import Link from 'next/link'
import { ArrowRight, Award, BriefcaseBusiness, Code2, Trophy } from 'lucide-react'

export default function InternshipSection() {
  return (
    <section id="internship" className="bg-[#071a3d] px-6 py-24 text-white">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-2xl border border-white/10 bg-[#0b2250] p-8 text-white shadow-2xl shadow-blue-950/50 sm:p-12">
        <div className="absolute right-0 top-0 h-full w-1/2 bg-[linear-gradient(135deg,rgba(37,99,235,0.35),transparent_60%)]" />
        <div className="absolute -right-10 -top-10 h-36 w-36 rounded-xl bg-blue-600" />

        <div className="relative grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-md bg-white/10 px-4 py-2 text-sm font-black text-blue-100">
              <BriefcaseBusiness className="h-4 w-4" />
              Project-based internship
            </div>
            <h2 className="text-4xl font-black leading-tight sm:text-5xl">
              Tech-Craft Internship Program
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300">
              Work on real projects, build your portfolio, earn ISO-certified certification,
              and get training plus placement support for your next opportunity.
            </p>

            <Link
              href="/inquiry"
              className="mt-8 inline-flex items-center gap-2 rounded-md bg-blue-600 px-6 py-3 text-sm font-black text-white shadow-xl shadow-blue-950/20 transition hover:-translate-y-0.5 hover:bg-blue-700"
            >
              Apply Now
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <div className="rounded-xl border border-white/10 bg-white/10 p-5 backdrop-blur">
              <Code2 className="mb-4 h-7 w-7 text-blue-300" />
              <h3 className="font-black">Real Client-Style Tasks</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-300">
                Build practical features and portfolio-ready project work.
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/10 p-5 backdrop-blur">
              <Award className="mb-4 h-7 w-7 text-blue-300" />
              <h3 className="font-black">ISO-Certified Certification</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-300">
                Complete your training with recognized certification support.
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/10 p-5 backdrop-blur">
              <Trophy className="mb-4 h-7 w-7 text-blue-300" />
              <h3 className="font-black">Placement Support</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-300">
                Get profile building, interview guidance, and career support.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
