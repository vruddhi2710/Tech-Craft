import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import InquiryForm from '../../components/InquiryForm'
import { readAdminCourses } from '../../lib/adminData'
import { CheckCircle2, Clock, GraduationCap, Phone } from 'lucide-react'

type InquiryPageProps = {
  searchParams: Promise<{
    course?: string
  }>
}

export const metadata = {
  title: 'Course Inquiry',
  description: 'Submit a course inquiry for Tech-Craft.',
}

export const dynamic = 'force-dynamic'

export default async function InquiryPage({ searchParams }: InquiryPageProps) {
  const { course } = await searchParams
  const courses = await readAdminCourses()

  return (
    <main className="min-h-screen overflow-hidden bg-white text-zinc-950">
      <Navbar />

      <section className="relative bg-[#f5f9ff] px-6 pb-24 pt-32 lg:pt-40">
        <div className="absolute inset-x-0 top-0 h-28 bg-[linear-gradient(135deg,rgba(37,99,235,0.1),transparent_55%)]" />
        <div className="absolute -right-20 top-28 h-64 w-64 rounded-full border-[42px] border-blue-100/80" />

        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.88fr_1.12fr]">
          <div className="flex flex-col justify-center">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-600">
              Student Inquiry
            </p>

            <h1 className="mt-4 text-4xl font-black leading-tight sm:text-6xl">
              Start your Tech-Craft learning journey
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-600">
              Share your details and course interest. Our team will help you choose
              the right path for coding, AI, web development, or internship training.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                { icon: GraduationCap, title: 'Career-focused courses', desc: 'ReactJS, Python, GenAI and Web Development' },
                { icon: CheckCircle2, title: 'Practical learning', desc: 'Projects, mentor support and portfolio work' },
                { icon: Clock, title: 'Quick response', desc: 'We will contact you after your inquiry' },
                { icon: Phone, title: 'Personal guidance', desc: 'Course counseling for students and parents' },
              ].map((item) => {
                const Icon = item.icon

                return (
                  <div key={item.title} className="rounded-xl border border-zinc-200 bg-white p-5 shadow-lg shadow-blue-100/50">
                    <Icon className="mb-3 h-6 w-6 text-blue-600" />
                    <h2 className="font-black text-zinc-950">{item.title}</h2>
                    <p className="mt-1 text-sm leading-6 text-zinc-600">{item.desc}</p>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-2xl shadow-blue-100/80 sm:p-6">
            <InquiryForm courses={courses} defaultCourse={course} />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
