import Link from 'next/link'
import { ArrowRight, Clock, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react'

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/courses', label: 'Courses' },
  { href: '/internship', label: 'Internship' },
  { href: '/it-services', label: 'IT Services' },
  { href: '/events', label: 'Events' },
  { href: '/blogs', label: 'Blogs' },
  { href: '/contact', label: 'Contact' },
]

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-white/10 bg-[#071a3d] px-6 py-10 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.7fr_1.2fr]">
          <div>
            <h2 className="text-3xl font-black">
              Tech-<span className="text-blue-300">Craft</span>
            </h2>
            <p className="mt-4 max-w-md leading-7 text-blue-100">
              Learn future-ready tech skills with practical courses, workshops, and internship guidance.
            </p>
            <Link
              href="/inquiry"
              className="mt-6 inline-flex items-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-black text-blue-700 shadow-lg shadow-blue-950/20 transition hover:-translate-y-0.5 hover:bg-blue-50"
            >
              Enroll Now
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div>
            <h3 className="text-lg font-black">Quick Links</h3>
            <div className="mt-4 grid gap-3 text-sm font-bold text-blue-100">
              {quickLinks.map((link) => (
                <Link key={link.href} href={link.href} className="transition hover:text-white">
                  {link.label}
                </Link>
              ))}
              <Link href="/feedback" className="transition hover:text-white">
                Feedback
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-black">Contact Info</h3>
            <div className="mt-4 grid gap-4 text-sm text-blue-100">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-blue-300" />
                <span>
                  Ajramar House, 7 Shivalik Plaza, IIM Road,
                  <br />
                  Polytechnic,
                  <br />
                  Opp. Ahmedabad Management Association (AMA),
                  <br />
                  Ahmedabad, Gujarat - 380015
                </span>
              </div>

              <a href="tel:+918849870596" className="flex items-center gap-3 transition hover:text-white">
                <Phone className="h-5 w-5 shrink-0 text-blue-300" />
                +91 88498 70596
              </a>

              <a
                href="mailto:techcraft1999@gmail.com"
                className="flex items-center gap-3 transition hover:text-white"
              >
                <Mail className="h-5 w-5 shrink-0 text-blue-300" />
                techcraft1999@gmail.com
              </a>

              <a
                href="https://www.instagram.com/tech_craft.academy?igsh=czVsbWpsYzZqODFp&utm_source=qr"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 transition hover:text-white"
              >
                <Instagram className="h-5 w-5 shrink-0 text-blue-300" />
                tech_craft.academy
              </a>

              <a
                href="https://www.linkedin.com/in/tech-craft-academy-340b14405/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 transition hover:text-white"
              >
                <Linkedin className="h-5 w-5 shrink-0 text-blue-300" />
                Tech-Craft Academy
              </a>

              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-blue-300" />
                <span>
                  10.30 AM - 06.30 PM
                  <br />
                  Monday - Saturday
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-8 text-sm text-blue-100">
          &copy; 2026 Tech-Craft. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
