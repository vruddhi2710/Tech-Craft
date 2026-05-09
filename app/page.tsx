import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Courses from '../components/Courses'
import WorkshopSection from '../components/WorkshopSection'
import InternshipSection from '../components/InternshipSection'
import Testimonials from '../components/Testimonials'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <main className="bg-slate-950 text-white overflow-hidden">
      <Navbar />
      <Hero />
      <Courses />
      <WorkshopSection />
      <InternshipSection />
      <Testimonials />
      <Footer />
    </main>
  )
}
