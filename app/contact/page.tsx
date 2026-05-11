import Link from 'next/link'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { ArrowRight, Clock, GraduationCap, Mail, MapPin, Phone } from 'lucide-react'

export const metadata = {
  title: 'Contact',
  description: 'Contact Tech-Craft for course counseling, workshops, and internship inquiries.',
}

export default function ContactPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-white text-zinc-950">
      <Navbar />

      <section className="bg-[#f5f9ff] px-6 pb-20 pt-32 lg:pt-40">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="flex flex-col justify-center">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-600">
              Contact Tech-Craft
            </p>
            <h1 className="mt-4 text-4xl font-black leading-tight sm:text-6xl">
              Talk to us about your next skill
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-600">
              Get guidance for courses, workshops, internship training, and the
              right learning path for your goals.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/inquiry"
                className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-6 py-3 text-sm font-black text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700"
              >
                Send Inquiry
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="mailto:techcraft1999@gmail.com"
                className="inline-flex items-center gap-2 rounded-md border border-zinc-300 bg-white px-6 py-3 text-sm font-black text-zinc-950 transition hover:border-blue-200 hover:text-blue-700"
              >
                <Mail className="h-4 w-4" />
                Email Us
              </a>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                icon: Phone,
                title: 'Phone',
                text: 'Course inquiry available',
              },
              {
                icon: Mail,
                title: 'Email',
                text: 'Share your questions anytime',
              },
              {
                icon: Clock,
                title: 'Response',
                text: 'Our team will contact you soon',
              },
              {
                icon: GraduationCap,
                title: 'Guidance',
                text: 'Courses, workshops and internships',
              },
            ].map((item) => {
              const Icon = item.icon

              return (
                <div
                  key={item.title}
                  className="rounded-xl border border-zinc-200 bg-white p-6 shadow-lg shadow-blue-100/50"
                >
                  <Icon className="mb-4 h-6 w-6 text-blue-600" />
                  <h2 className="font-black text-zinc-950">{item.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-zinc-600">{item.text}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[0.9fr_1.1fr]">
          <div>
            <MapPin className="h-7 w-7 text-blue-600" />
            <h2 className="mt-4 text-3xl font-black">Visit Tech-Craft</h2>
            <p className="mt-3 text-zinc-600">
              Meet us for admissions, career counseling, workshop batches, and
              internship inquiries.
            </p>
          </div>

          <div className="grid gap-3 text-sm font-bold text-zinc-700 sm:grid-cols-2">
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-5">
              Tech-Craft, Ahmedabad
            </div>
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-5">
              Practical tech learning and guidance
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
