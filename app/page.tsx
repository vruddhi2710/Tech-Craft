import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Courses from '../components/Courses'
import Testimonials from '../components/Testimonials'
import LocationSection from '../components/LocationSection'
import Footer from '../components/Footer'
import { readAdminCourses } from '../lib/adminData'
import { createSeoMetadata, homeSeoDescription, homeSeoTitle } from './seo'

export const dynamic = 'force-dynamic'

export const metadata = createSeoMetadata({
  title: homeSeoTitle,
  description: homeSeoDescription,
  path: '/',
  keywords: [
    'ReactJS course in Ahmedabad',
    'NodeJS course in Ahmedabad',
    'Python Full Stack course',
    'MERN Stack training Ahmedabad',
    'GenAI course Ahmedabad',
    'internship with live project Ahmedabad',
  ],
})

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
