import Link from 'next/link'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { createSeoMetadata } from '../seo'
import {
  ArrowRight,
  Award,
  BriefcaseBusiness,
  CheckCircle2,
  Clock,
  Code2,
  Database,
  GraduationCap,
  Handshake,
  Sparkles,
  Trophy,
  Users,
} from 'lucide-react'

export const metadata = createSeoMetadata({
  title: 'About Tech-Craft IT Training Institute Ahmedabad',
  description:
    'Learn about Tech-Craft, an Ahmedabad IT training institute for ReactJS, NodeJS, Python Full Stack, MERN Stack, AI/ML, GenAI, SQL and internships.',
  path: '/about',
  keywords: [
    'Best Institute in Ahmedabad',
    'IT Training Institute Ahmedabad',
    'technical training Ahmedabad',
    'placement support institute',
    'coding in Ahmedabad',
  ],
})

const technicalTrainers = [
  {
    name: 'Kenvi Thakkar',
    role: 'Technical Trainer & Professor',
    initials: 'KT',
    description:
      'With 2+ years of teaching experience as a technical trainer, she trains students in multiple programming languages with a focus on clarity, confidence, and practical understanding.',
    highlights: [
      {
        value: '2+',
        label: 'Years of teaching experience',
        icon: GraduationCap,
      },
      {
        value: 'Tech',
        label: 'Technical trainer expertise',
        icon: Award,
      },
      {
        value: 'Multi',
        label: 'Programming language training',
        icon: Code2,
      },
    ],
  },
  {
    name: 'Meet Dasalaniya',
    role: 'Python Full Stack Technical Trainer',
    initials: 'MD',
    description:
      'With 1+ year of technical training experience, he trains students in Python, ReactJS, and database concepts through hands-on full stack learning.',
    highlights: [
      {
        value: '1+',
        label: 'Years of technical training experience',
        icon: GraduationCap,
      },
      {
        value: 'Python',
        label: 'Full stack backend training',
        icon: Code2,
      },
      {
        value: 'ReactJS',
        label: 'Frontend and database training',
        icon: Database,
      },
    ],
  },
]

const leadershipMembers = [
  {
    name: 'Vruddhi Shah',
    role: 'Founder',
    initials: 'VS',
    description:
      'Founder of Tech-Craft, leading the academy with a focus on practical training, student confidence, and career-ready technology skills.',
    noteTitle: 'Practical leadership',
    note:
      'She shapes Tech-Craft around structured learning, hands-on practice, and clear growth paths for students.',
    highlights: [
      {
        label: '4 years of technical industry experience',
        icon: BriefcaseBusiness,
      },
      {
        label: 'Builds practical, career-focused learning paths',
        icon: Award,
      },
      {
        label: 'Guides students with clear technical direction',
        icon: Sparkles,
      },
    ],
  },
  {
    name: 'Ekta Shah',
    role: 'Co-Founder',
    initials: 'ES',
    description:
      'A true mentor and guide who brings together practical industry exposure, thoughtful teaching, and patient mentoring for aspiring developers.',
    noteTitle: 'A true mentor and guide',
    note:
      'Known for patient mentoring and practical direction, she helps students turn technical learning into career-ready skill.',
    highlights: [
      {
        label: '6+ years of industry experience',
        icon: BriefcaseBusiness,
      },
      {
        label: '4+ years of teaching experience',
        icon: GraduationCap,
      },
      {
        label: 'Trained 250+ developers',
        icon: Users,
      },
    ],
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

      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-600">
              About Us
            </p>
            <h2 className="mt-4 text-4xl font-black leading-tight text-zinc-950 sm:text-5xl">
              Leadership that guides every learner forward
            </h2>
            <p className="mt-6 text-lg leading-8 text-zinc-600">
              Meet the Founder and Co-Founder behind Tech-Craft's practical training,
              mentorship, and career-focused learning experience.
            </p>
          </div>

          <div className="grid items-stretch gap-8 lg:grid-cols-2">
            {leadershipMembers.map((member) => (
              <div
                key={member.name}
                className="flex h-full flex-col rounded-xl border border-zinc-200 bg-[#f5f9ff] p-6 shadow-xl shadow-blue-100/60 sm:p-8"
              >
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-2xl font-black text-white shadow-lg shadow-blue-600/20">
                    {member.initials}
                  </div>
                  <div>
                    <p className="inline-flex items-center gap-2 rounded-md bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-blue-600 shadow-sm">
                      {member.role === 'Co-Founder' && <Handshake className="h-3.5 w-3.5" />}
                      {member.role}
                    </p>
                    <h3 className="mt-3 text-3xl font-black text-zinc-950">{member.name}</h3>
                    <p className="mt-3 leading-7 text-zinc-600">{member.description}</p>
                  </div>
                </div>

                <div className="mt-8 grid gap-3">
                  {member.highlights.map((highlight) => {
                    const Icon = highlight.icon

                    return (
                      <div
                        key={highlight.label}
                        className="flex items-center gap-3 rounded-lg border border-zinc-200 bg-white p-4"
                      >
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-blue-50 text-blue-600">
                          <Icon className="h-5 w-5" />
                        </span>
                        <p className="text-sm font-bold leading-6 text-zinc-700">{highlight.label}</p>
                      </div>
                    )
                  })}
                </div>

                <div className="mt-6 rounded-lg border border-blue-100 bg-white p-5">
                  <h4 className="text-lg font-black text-zinc-950">{member.noteTitle}</h4>
                  <p className="mt-2 leading-7 text-zinc-600">{member.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f5f9ff] px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-600">
              Technical Training
            </p>
            <h2 className="mt-4 text-4xl font-black leading-tight text-zinc-950 sm:text-5xl">
              Learn programming with practical trainer guidance
            </h2>
            <p className="mt-6 text-lg leading-8 text-zinc-600">
              Our technical trainers help students understand concepts step by step, practice
              with real examples, and build confidence across modern programming skills.
            </p>
          </div>

          <div className="grid items-stretch gap-8 lg:grid-cols-2">
            {technicalTrainers.map((trainer) => (
              <div
                key={trainer.name}
                className="flex h-full flex-col rounded-xl border border-zinc-200 bg-white p-6 shadow-xl shadow-blue-100/60 sm:p-8"
              >
                <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-2xl font-black text-white shadow-lg shadow-blue-600/20">
                    {trainer.initials}
                  </div>
                  <div>
                    <p className="inline-flex items-center gap-2 rounded-md bg-[#f5f9ff] px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-blue-600">
                      <GraduationCap className="h-3.5 w-3.5" />
                      {trainer.role}
                    </p>
                    <h3 className="mt-3 text-3xl font-black text-zinc-950">{trainer.name}</h3>
                    <p className="mt-3 leading-7 text-zinc-600">{trainer.description}</p>
                  </div>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  {trainer.highlights.map((highlight) => {
                    const Icon = highlight.icon

                    return (
                      <div key={highlight.label} className="rounded-lg border border-zinc-200 bg-[#f5f9ff] p-5">
                        <Icon className="h-6 w-6 text-blue-600" />
                        <p className="mt-4 text-2xl font-black text-zinc-950">{highlight.value}</p>
                        <p className="mt-1 text-sm font-bold leading-5 text-zinc-500">{highlight.label}</p>
                      </div>
                    )
                  })}
                </div>
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
