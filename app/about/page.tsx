import Link from 'next/link'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { ArrowRight, Award, BriefcaseBusiness, CheckCircle2, Clock, Sparkles, Trophy, Users } from 'lucide-react'

export const metadata = {
  title: 'About Us | Tech-Craft',
  description: 'Learn about Tech-Craft Academy - your partner in mastering future-ready tech skills with practical training, internships, and career support.',
}

const teamMembers = [
  {
    name: 'Vruddhi Shah',
    role: 'Founder of Tech-Craft',
    description:
      'Currently working in the technical industry with 4 years of experience, leading Tech-Craft with a focus on practical training, student confidence, and career-ready technology skills.',
  },
  {
    name: 'Kenvi Thakkar',
    role: 'Technical Trainer',
    description:
      'A technical trainer and college professor with 2 years of experience, helping students understand programming concepts with clarity and practical classroom guidance.',
  },
  {
    name: 'Meet Dasalaniya',
    role: 'Full Stack Developer',
    description:
      'Working as a Full Stack Developer with 1+ year of experience, contributing to real-world projects and bringing current development practices into student learning.',
  },
]

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
              Tech-Craft provides a bridge between college learning and industry expectations.
              We help students move beyond theory by building practical skills, gaining real-world
              exposure, and developing industry-ready knowledge through guided training, projects,
              internships, and career-focused mentorship.
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
              <p className="mt-3 text-2xl font-black">85% +</p>
              <p className="text-sm font-bold text-zinc-500">Placement Rate</p>
            </div>
          </div>

        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-600">
              Team / Founder Details
            </p>
            <h2 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">
              Meet the people behind Tech-Craft
            </h2>
            <p className="mt-6 text-lg leading-8 text-zinc-600">
              Our team brings together industry experience, classroom teaching, and real project
              exposure so students receive practical guidance from people actively connected to
              the technical field.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="rounded-xl border border-zinc-200 bg-white p-6 shadow-lg shadow-blue-100/50"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-blue-600 text-lg font-black text-white">
                  {member.name
                    .split(' ')
                    .map((part) => part[0])
                    .join('')}
                </div>
                <h3 className="mt-5 text-2xl font-black text-zinc-950">{member.name}</h3>
                <p className="mt-2 font-bold text-blue-600">{member.role}</p>
                <p className="mt-4 leading-7 text-zinc-600">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-600">
              Why Choose Tech-Craft?
            </p>
            <h2 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">
              Training built for real career progress
            </h2>
            <p className="mt-6 max-w-2xl mx-auto text-lg leading-8 text-zinc-600">
              Tech-Craft focuses on practical learning, guided mentorship, and clear outcomes
              so students can move from concepts to confident project work.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-lg shadow-blue-100/50">
              <CheckCircle2 className="mb-4 h-8 w-8 text-blue-600" />
              <h3 className="text-xl font-black text-zinc-950">Project-Based Learning</h3>
              <p className="mt-3 text-zinc-600">
                Students learn by building real interfaces, APIs, databases, automation tasks,
                and portfolio-ready projects.
              </p>
            </div>
            <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-lg shadow-blue-100/50">
              <Trophy className="mb-4 h-8 w-8 text-blue-600" />
              <h3 className="text-xl font-black text-zinc-950">Professional Mentorship</h3>
              <p className="mt-3 text-zinc-600">
                Mentors explain concepts clearly, review practical work, and help students build
                strong technical foundations.
              </p>
            </div>
            <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-lg shadow-blue-100/50">
              <BriefcaseBusiness className="mb-4 h-8 w-8 text-blue-600" />
              <h3 className="text-xl font-black text-zinc-950">Career Support</h3>
              <p className="mt-3 text-zinc-600">
                Get support with resumes, interview preparation, profile building, and choosing
                the right learning path.
              </p>
            </div>
            <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-lg shadow-blue-100/50">
              <Award className="mb-4 h-8 w-8 text-blue-600" />
              <h3 className="text-xl font-black text-zinc-950">Certified Training</h3>
              <p className="mt-3 text-zinc-600">
                Complete your learning with certificate support that helps validate your skills
                for academic and professional opportunities.
              </p>
            </div>
            <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-lg shadow-blue-100/50">
              <Clock className="mb-4 h-8 w-8 text-blue-600" />
              <h3 className="text-xl font-black text-zinc-950">Flexible Programs</h3>
              <p className="mt-3 text-zinc-600">
                Choose short-term courses, longer career tracks, or internship options based on
                your goals and availability.
              </p>
            </div>
            <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-lg shadow-blue-100/50">
              <Sparkles className="mb-4 h-8 w-8 text-blue-600" />
              <h3 className="text-xl font-black text-zinc-950">Future-Ready Skills</h3>
              <p className="mt-3 text-zinc-600">
                The curriculum covers modern tools and workflows across web development,
                programming, databases, and AI.
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
