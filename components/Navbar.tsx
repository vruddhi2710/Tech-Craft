'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowRight, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'

const navLinks = [
  { href: '/#courses', label: 'For Students', sectionId: 'courses' },
  { href: '/#internship', label: 'Internship', sectionId: 'internship' },
  { href: '/#workshops', label: 'Workshops', sectionId: 'workshops' },
  { href: '/contact', label: 'Contact', pathname: '/contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const pathname = usePathname()

  useEffect(() => {
    if (pathname !== '/') {
      setActiveSection('')
      return
    }

    const updateFromHash = () => {
      setActiveSection(window.location.hash.replace('#', ''))
    }

    updateFromHash()
    window.addEventListener('hashchange', updateFromHash)

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0]

        if (visibleEntry) {
          setActiveSection(visibleEntry.target.id)
        }
      },
      {
        rootMargin: '-35% 0px -45% 0px',
        threshold: [0.2, 0.4, 0.6],
      },
    )

    navLinks.forEach((link) => {
      if (!link.sectionId) return

      const section = document.getElementById(link.sectionId)
      if (section) observer.observe(section)
    })

    return () => {
      window.removeEventListener('hashchange', updateFromHash)
      observer.disconnect()
    }
  }, [pathname])

  const isActiveLink = (link: (typeof navLinks)[number]) => {
    if (link.pathname) {
      return pathname === link.pathname
    }

    return pathname === '/' && activeSection === link.sectionId
  }

  return (
    <nav className="fixed left-0 top-0 z-50 w-full border-b border-zinc-200 bg-white/95 shadow-lg shadow-zinc-200/60 backdrop-blur-xl">


      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/#home"
          className="group flex min-w-0 items-center gap-2.5 sm:gap-3"
          onClick={() => setIsOpen(false)}
        >
          <img
            src="/techcraft-logo.jpeg"
            alt="Tech-Craft logo"
            className="h-12 w-12 shrink-0 rounded-lg border border-zinc-200 object-contain shadow-sm transition duration-300 group-hover:-rotate-2 group-hover:scale-105 sm:h-14 sm:w-14"
          />
          <div className="min-w-0 leading-tight">
            <span className="block truncate text-lg font-black text-zinc-950 sm:text-2xl">
              Tech-<span className="text-blue-600">Craft</span>
            </span>
            <span className="text-[10px] font-medium tracking-[0.14em]
 text-zinc-500 sm:block">
              Crafting Skills. Creating Futures
            </span>
          </div>
        </Link>

        <div className="hidden items-center text-sm font-bold text-zinc-700 lg:flex">
          {navLinks.map((link) => {
            const isActive = isActiveLink(link)

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? 'page' : undefined}
                className={`group relative px-4 py-2 transition duration-200 hover:text-blue-600 ${
                  isActive ? 'text-blue-600' : ''
                }`}
              >
                <span>{link.label}</span>
                <span
                  className={`absolute inset-x-4 -bottom-1 h-0.5 origin-left bg-blue-600 transition duration-200 ${
                    isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                />
              </Link>
            )
          })}
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/inquiry"
            className="group hidden items-center gap-2 rounded-md bg-blue-600 px-5 py-2.5 text-sm font-black text-white shadow-lg shadow-blue-600/25 transition duration-200 hover:-translate-y-0.5 hover:bg-blue-700 sm:flex"
          >
            Enroll Now
            <ArrowRight className="h-4 w-4 transition duration-200 group-hover:translate-x-0.5" />
          </Link>

          <button
            type="button"
            aria-controls="mobile-menu"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((open) => !open)}
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-zinc-200 bg-zinc-50 text-zinc-950 transition hover:bg-zinc-100 lg:hidden"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`max-h-[calc(100vh-68px)] overflow-y-auto border-t border-zinc-200 bg-white px-4 py-4 shadow-xl shadow-zinc-200/70 transition lg:hidden sm:px-6 ${isOpen ? 'block' : 'hidden'
          }`}
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-2">
          {navLinks.map((link) => {
            const isActive = isActiveLink(link)

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? 'page' : undefined}
                onClick={() => setIsOpen(false)}
                className={`rounded-lg border px-4 py-3 text-sm font-bold transition hover:border-blue-100 hover:bg-blue-50 hover:text-blue-700 ${
                  isActive
                    ? 'border-blue-100 bg-blue-50 text-blue-700'
                    : 'border-transparent text-zinc-700'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
          <Link
            href="/inquiry"
            onClick={() => setIsOpen(false)}
            className="mt-2 flex items-center justify-center gap-2 rounded-md bg-blue-600 px-5 py-3 text-sm font-black text-white shadow-lg shadow-blue-600/20"
          >
            Enroll Now
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </nav>
  )
}
