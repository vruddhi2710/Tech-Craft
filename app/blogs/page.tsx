import Image from 'next/image'
import Link from 'next/link'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { getPublishedBlogs, readAdminBlogs } from '../../lib/adminData'
import { ArrowRight, CalendarDays, FileText } from 'lucide-react'

export const metadata = {
  title: 'Blogs | Tech-Craft',
  description: 'Daily Tech-Craft blogs on coding, AI, internships, project building, and career guidance.',
}

export const dynamic = 'force-dynamic'

export default async function BlogsPage() {
  const blogs = getPublishedBlogs(await readAdminBlogs())
  const featuredBlog = blogs[0]

  return (
    <main className="min-h-screen bg-white text-zinc-950">
      <Navbar />

      <section className="relative overflow-hidden bg-[#f5f9ff] px-6 pb-20 pt-32 lg:pt-40">
        <div className="absolute inset-x-0 top-0 h-28 bg-[linear-gradient(135deg,rgba(37,99,235,0.12),transparent_55%)]" />
        <div className="absolute -right-20 top-32 h-64 w-64 rounded-full border-[42px] border-blue-100/80" />

        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-600">
              Tech-Craft Blogs
            </p>
            <h1 className="mt-4 text-5xl font-black leading-tight sm:text-6xl lg:text-7xl">
              Daily learning tips for future tech careers
            </h1>
            <p className="mt-6 text-lg leading-8 text-zinc-600">
              A new blog is scheduled every day with practical guidance for courses, projects,
              internships, and job readiness.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          {featuredBlog ? (
            <Link
              href={`/blogs/${featuredBlog.id}`}
              className="group mb-12 grid overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-xl shadow-zinc-200/70 transition hover:-translate-y-1 hover:border-blue-200 lg:grid-cols-[1fr_0.9fr]"
            >
              {featuredBlog.image ? (
                <div className="relative min-h-80 overflow-hidden">
                  <Image
                    src={featuredBlog.image}
                    alt={featuredBlog.title}
                    fill
                    priority
                    sizes="(min-width: 1024px) 52vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
              ) : null}
              <div className="p-8">
                <p className="flex items-center gap-2 text-sm font-black text-blue-600">
                  <CalendarDays className="h-4 w-4" />
                  Today&apos;s blog · {featuredBlog.publishDate}
                </p>
                <h2 className="mt-4 text-4xl font-black leading-tight">
                  {featuredBlog.title}
                </h2>
                <p className="mt-4 leading-8 text-zinc-600">
                  {featuredBlog.description}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 rounded-md bg-blue-600 px-5 py-3 text-sm font-black text-white">
                  Read Blog
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ) : (
            <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-8 text-center">
              <FileText className="mx-auto h-8 w-8 text-blue-600" />
              <h2 className="mt-4 text-2xl font-black">Blogs are being prepared</h2>
              <p className="mt-3 text-zinc-600">Please check back soon for daily Tech-Craft guidance.</p>
            </div>
          )}

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogs.slice(1).map((blog) => (
              <Link
                key={blog.id}
                href={`/blogs/${blog.id}`}
                className="group overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-xl shadow-zinc-200/70 transition hover:-translate-y-1 hover:border-blue-200"
              >
                {blog.image ? (
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                ) : null}
                <div className="p-6">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-600">
                    {blog.publishDate}
                  </p>
                  <h3 className="mt-3 text-2xl font-black leading-tight">
                    {blog.title}
                  </h3>
                  <p className="mt-3 leading-7 text-zinc-600">
                    {blog.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
