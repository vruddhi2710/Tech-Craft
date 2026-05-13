import Link from 'next/link'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { ArrowRight, Award, BriefcaseBusiness, CheckCircle2, Clock, Trophy, Users } from 'lucide-react'

export const metadata = {
  title: 'About Us | Tech-Craft',
  description: 'Learn about Tech-Craft Academy - your partner in mastering future-ready tech skills with practical training, internships, and career support.',
}

export default function AboutPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-white text-zinc-950">
      <Navbar />

      <section className="bg-[#f5f9ff] px-6 pb-20 pt-32 lg:pt-40">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-600">
              About Tech-Craft
            </p>
            <h1 className="mt-4 text-5xl font-black leading-tight sm:text-6xl lg:text-7xl">
              Crafting Skills. Creating Futures.
            </h1>
            <p className="mt-6 text-lg leading-8 text-zinc-600">
              At Tech-Craft Academy, we bridge the gap between education and industry demands.
              Our mission is to empower individuals with practical tech skills, real-world projects,
              and career guidance to thrive in the digital economy.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-lg shadow-blue-100/50">
              <Users className="h-6 w-6 text-blue-600" />
              <p className="mt-3 text-2xl font-black">500+</p>
              <p className="text-sm font-bold text-zinc-500">Students Trained</p>
            </div>
            <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-lg shadow-blue-100/50">
              <Award className="h-6 w-6 text-blue-600" />
              <p className="mt-3 text-2xl font-black">ISO</p>
              <p className="text-sm font-bold text-zinc-500">Certified</p>
            </div>
            <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-lg shadow-blue-100/50">
              <BriefcaseBusiness className="h-6 w-6 text-blue-600" />
              <p className="mt-3 text-2xl font-black">95%</p>
              <p className="text-sm font-bold text-zinc-500">Placement Rate</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-600">
              Why Choose Us?
            </p>
            <h2 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">
              What Sets Tech-Craft Apart
            </h2>
            <p className="mt-6 max-w-2xl mx-auto text-lg leading-8 text-zinc-600">
              We combine industry expertise, practical learning, and personalized support
              to ensure your success in the tech industry.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-lg shadow-blue-100/50">
              <CheckCircle2 className="mb-4 h-8 w-8 text-blue-600" />
              <h3 className="text-xl font-black text-zinc-950">Practical Learning</h3>
              <p className="mt-3 text-zinc-600">
                Hands-on projects and real-world applications ensure you learn skills that employers value.
              </p>
            </div>
            <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-lg shadow-blue-100/50">
              <Trophy className="mb-4 h-8 w-8 text-blue-600" />
              <h3 className="text-xl font-black text-zinc-950">Industry Experts</h3>
              <p className="mt-3 text-zinc-600">
                Learn from experienced professionals with years of industry experience and current best practices.
              </p>
            </div>
            <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-lg shadow-blue-100/50">
              <BriefcaseBusiness className="mb-4 h-8 w-8 text-blue-600" />
              <h3 className="text-xl font-black text-zinc-950">Career Support</h3>
              <p className="mt-3 text-zinc-600">
                Comprehensive placement assistance, interview preparation, and career guidance throughout your journey.
              </p>
            </div>
            <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-lg shadow-blue-100/50">
              <Award className="mb-4 h-8 w-8 text-blue-600" />
              <h3 className="text-xl font-black text-zinc-950">Certified Training</h3>
              <p className="mt-3 text-zinc-600">
                ISO-certified programs with recognized certifications that validate your skills to employers.
              </p>
            </div>
            <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-lg shadow-blue-100/50">
              <Clock className="mb-4 h-8 w-8 text-blue-600" />
              <h3 className="text-xl font-black text-zinc-950">Flexible Learning</h3>
              <p className="mt-3 text-zinc-600">
                Multiple program durations and learning paths to fit your schedule and career goals.
              </p>
            </div>
            <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-lg shadow-blue-100/50">
              <Users className="mb-4 h-8 w-8 text-blue-600" />
              <h3 className="text-xl font-black text-zinc-950">Community Support</h3>
              <p className="mt-3 text-zinc-600">
                Join a supportive learning community with peer collaboration and mentorship opportunities.
              </p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <Link
              href="/inquiry"
              className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-8 py-4 text-lg font-black text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700"
            >
              Start Your Journey
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}