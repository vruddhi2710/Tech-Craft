import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/30 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/#home" className="text-3xl font-bold text-cyan-400">
          Tech-Craft
        </Link>

        <div className="hidden md:flex gap-8 text-sm">
          <Link href="/#home">Home</Link>
          <Link href="/#courses">Courses</Link>
          <Link href="/#workshops">Workshops</Link>
          <Link href="/#internship">Internship</Link>
          <Link href="/#contact">Contact</Link>
        </div>

        <Link href="/inquiry" className="bg-cyan-400 text-black px-5 py-2 rounded-full font-semibold">
          Join Now
        </Link>
      </div>
    </nav>
  )
}
