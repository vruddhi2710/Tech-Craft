import type { MetadataRoute } from 'next'
import { getPublishedBlogs, readAdminBlogs, readAdminCourses } from '../lib/adminData'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'
  const now = new Date()
  const [courses, blogs] = await Promise.all([
    readAdminCourses(),
    readAdminBlogs(),
  ])
  const publishedBlogs = getPublishedBlogs(blogs)

  return [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${siteUrl}/inquiry`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/events`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/blogs`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/courses`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/internship`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...courses.map((course) => ({
      url: `${siteUrl}/courses/${course.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    })),
    ...publishedBlogs.map((blog) => ({
      url: `${siteUrl}/blogs/${blog.id}`,
      lastModified: new Date(blog.publishDate),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ]
}
