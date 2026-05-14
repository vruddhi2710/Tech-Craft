import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Courses from '../components/Courses'
import Testimonials from '../components/Testimonials'
import LocationSection from '../components/LocationSection'
import Footer from '../components/Footer'
import { readAdminCourses } from '../lib/adminData'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const courses = await readAdminCourses()

  return (
    <main className="overflow-hidden bg-white text-zinc-950">
      <Navbar />
      <Hero />
      <Courses courses={courses} />
      <Testimonials />
      <LocationSection />
      <Footer />
    </main>
  )
}
