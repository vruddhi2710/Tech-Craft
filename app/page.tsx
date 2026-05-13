import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Courses from '../components/Courses'
import InternshipSection from '../components/InternshipSection'
import Testimonials from '../components/Testimonials'
import LocationSection from '../components/LocationSection'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <main className="overflow-hidden bg-white text-zinc-950">
      <Navbar />
      <Hero />
      <Courses />
      <InternshipSection />
      <Testimonials />
      <LocationSection />
      <Footer />
    </main>
  )
}
