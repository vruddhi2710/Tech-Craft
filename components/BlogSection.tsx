import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CalendarDays } from 'lucide-react'
import type { AdminBlog } from '../lib/adminData'

type BlogSectionProps = {
  blogs: AdminBlog[]
}

export default function BlogSection({ blogs }: BlogSectionProps) {
  const featuredBlog = blogs[0]
  const nextBlogs = blogs.slice(1, 3)

  if (!featuredBlog) return null

  return (
    <section id="blogs" className="bg-white px-6 py-20 text-zinc-950">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-600">
              Daily Blog
            </p>
            <h2 className="mt-3 text-3xl font-black leading-tight sm:text-4xl">
              Fresh career guidance every day
            </h2>
          </div>

          <Link
            href="/blogs"
            className="inline-flex w-fit items-center gap-2 rounded-md bg-blue-600 px-6 py-3 text-sm font-black text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700"
          >
            View Blogs
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid items-start gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          <Link
            href={`/blogs/${featuredBlog.id}`}
            className="group grid overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-lg shadow-zinc-200/60 transition hover:-translate-y-1 hover:border-blue-200 md:grid-cols-[0.9fr_1.1fr]"
          >
            {featuredBlog.image ? (
              <div className="relative min-h-52 overflow-hidden md:min-h-full">
                <Image
                  src={featuredBlog.image}
                  alt={featuredBlog.title}
                  fill
                  sizes="(min-width: 1024px) 28vw, (min-width: 768px) 40vw, 100vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
            ) : null}
            <div className="p-5 sm:p-6">
              <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.14em] text-blue-600">
                <CalendarDays className="h-4 w-4" />
                {featuredBlog.publishDate}
              </p>
              <h3 className="mt-3 text-2xl font-black leading-tight sm:text-3xl">
                {featuredBlog.title}
              </h3>
              <p className="mt-3 line-clamp-3 text-sm font-bold leading-6 text-zinc-600">
                {featuredBlog.description}
              </p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-blue-600">
                Read Today&apos;s Blog
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </span>
            </div>
          </Link>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
            {nextBlogs.map((blog) => (
              <Link
                key={blog.id}
                href={`/blogs/${blog.id}`}
                className="rounded-xl border border-zinc-200 bg-zinc-50 p-5 transition hover:-translate-y-1 hover:border-blue-200 hover:bg-white hover:shadow-lg hover:shadow-zinc-200/60"
              >
                <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-600">
                  {blog.publishDate}
                </p>
                <h3 className="mt-3 text-xl font-black leading-tight">
                  {blog.title}
                </h3>
                <p className="mt-3 line-clamp-3 text-sm font-bold leading-6 text-zinc-600">
                  {blog.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
