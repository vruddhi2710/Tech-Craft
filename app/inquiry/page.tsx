import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import InquiryForm from '../../components/InquiryForm'
import { courses } from '../../data/courses'

type InquiryPageProps = {
  searchParams: Promise<{
    course?: string
  }>
}

export const metadata = {
  title: 'Course Inquiry',
  description: 'Submit a course inquiry for Tech-Craft.',
}

export default async function InquiryPage({ searchParams }: InquiryPageProps) {
  const { course } = await searchParams

  return (
    <main className="min-h-screen bg-slate-950 text-white overflow-hidden">
      <Navbar />

      <section className="px-6 pb-20 pt-32">
        <div className="max-w-5xl mx-auto">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
            Student Inquiry
          </p>

          <h1 className="mt-4 text-5xl font-bold leading-tight md:text-6xl">
            Join Tech-Craft
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            Fill in the student details and course interest. Submissions are saved for Tech-Craft in JSON and Excel-ready CSV files.
          </p>

          <div className="mt-10">
            <InquiryForm courses={courses} defaultCourse={course} />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
