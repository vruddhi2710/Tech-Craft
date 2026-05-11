import Link from 'next/link'
import { ArrowRight, MapPin, Navigation, Phone } from 'lucide-react'

const mapSrc =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4720.896589878785!2d72.53907194603804!3d23.027999954460817!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e856807b8379f%3A0x686aba35a6f58ee0!2sTech-Craft!5e0!3m2!1sen!2sin!4v1778489317995!5m2!1sen!2sin'

export default function LocationSection() {
  return (
    <section id="location" className="bg-white px-6 py-24 text-zinc-950">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="flex flex-col justify-center">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-600">
            Our Location
          </p>
          <h2 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">
            Visit Tech-Craft for career guidance
          </h2>
          <p className="mt-5 text-lg leading-8 text-zinc-600">
            Find us on Google Maps and reach the institute easily for course counseling,
            admissions, workshops, and internship inquiries.
          </p>

          <div className="mt-8 grid gap-4 text-sm font-bold text-zinc-700 sm:grid-cols-2">
            <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-5">
              <MapPin className="mb-3 h-6 w-6 text-blue-600" />
              Tech-Craft, Ahmedabad
            </div>
            <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-5">
              <Phone className="mb-3 h-6 w-6 text-blue-600" />
              Course inquiry available
            </div>
          </div>

          <Link
            href="/inquiry"
            className="mt-8 inline-flex w-fit items-center gap-2 rounded-md bg-blue-600 px-6 py-3 text-sm font-black text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700"
          >
            Contact Now
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="relative min-h-[360px] overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100 shadow-2xl shadow-zinc-200/80">
          <iframe
            src={mapSrc}
            title="Tech-Craft location on Google Maps"
            className="h-full min-h-[360px] w-full"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <a
            href="https://www.google.com/maps/search/?api=1&query=Tech-Craft"
            target="_blank"
            rel="noreferrer"
            className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-black text-zinc-950 shadow-lg transition hover:text-blue-600"
          >
            <Navigation className="h-4 w-4" />
            Open in Maps
          </a>
        </div>
      </div>
    </section>
  )
}
