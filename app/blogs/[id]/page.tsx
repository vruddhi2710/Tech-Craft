import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'
import { getBlogById, readAdminBlogs } from '../../../lib/adminData'
import { ArrowLeft, CalendarDays, UserCircle } from 'lucide-react'

type BlogPageProps = {
  params: Promise<{
    id: string
  }>
}

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: BlogPageProps) {
  const { id } = await params
  const blog = getBlogById(await readAdminBlogs(), id)

  if (!blog) {
    return {
      title: 'Blog Not Found',
    }
  }

  return {
    title: blog.title,
    description: blog.description,
    openGraph: {
      title: blog.title,
      description: blog.description,
      images: blog.image ? [{ url: blog.image, alt: blog.title }] : [],
    },
  }
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { id } = await params
  const blog = getBlogById(await readAdminBlogs(), id)

  if (!blog) {
    redirect('/blogs')
  }

  return (
    <main className="min-h-screen bg-white text-zinc-950">
      <Navbar />

      <article>
        <section className="bg-[#f5f9ff] px-6 pb-16 pt-32 lg:pt-40">
          <div className="mx-auto max-w-4xl">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 text-sm font-black text-blue-600 transition hover:text-blue-700"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blogs
            </Link>

            <div className="mt-10 flex flex-wrap gap-3 text-sm font-black text-blue-600">
              <span className="inline-flex items-center gap-2 rounded-md bg-white px-3 py-2">
                <CalendarDays className="h-4 w-4" />
                {blog.publishDate}
              </span>
              <span className="inline-flex items-center gap-2 rounded-md bg-white px-3 py-2">
                <UserCircle className="h-4 w-4" />
                {blog.author}
              </span>
            </div>

            <h1 className="mt-6 text-4xl font-black leading-tight sm:text-6xl">
              {blog.title}
            </h1>
            <p className="mt-6 text-lg leading-8 text-zinc-600">
              {blog.description}
            </p>
          </div>
        </section>

        {blog.image ? (
          <section className="px-6">
            <div className="relative mx-auto -mt-10 aspect-[16/9] max-w-5xl overflow-hidden rounded-xl border-8 border-white bg-white shadow-2xl shadow-zinc-300/70">
              <Image
                src={blog.image}
                alt={blog.title}
                fill
                priority
                sizes="(min-width: 1024px) 80vw, 100vw"
                className="object-cover"
              />
            </div>
          </section>
        ) : null}

        <section className="px-6 py-16">
          <div className="mx-auto max-w-3xl">
            <div className="whitespace-pre-line text-lg leading-9 text-zinc-700">
              {blog.content}
            </div>
          </div>
        </section>
      </article>

      <Footer />
    </main>
  )
}
