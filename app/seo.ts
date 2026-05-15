import type { Metadata } from 'next'

export const siteName = 'Tech-Craft'
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001').replace(/\/$/, '')
export const defaultSeoImage = '/techcraft-logo.jpeg'

export const homeSeoTitle = 'Best IT Training Institute in Ahmedabad | Tech-Craft'
export const homeSeoDescription =
  'Join Tech-Craft, an IT training institute in Ahmedabad for ReactJS, NodeJS, Python Full Stack, MERN Stack, AI/ML, GenAI, SQL, internships and placement support.'

export const seoKeywords = [
  'Best Institute in Ahmedabad',
  'ReactJS',
  'NodeJS',
  'AI',
  'ML',
  'GenAI',
  'Generative AI',
  'SQL',
  'Python',
  'IT Training Institute',
  'MERN Stack',
  'Full Stack',
  'Python Full Stack',
  'Coding in Ahmedabad',
  'Full Stack Development Course',
  'Best Placement Institute',
  'Placement Support',
  'Placement Assistance',
  'AI Course in Ahmedabad',
  'Internship',
  'Internship with Live Project',
  'Web Development',
  'Training',
  'Frontend Development',
  'Backend Development',
  'MERN Stack Training',
  'MongoDB',
  'Database Training',
]

type SeoMetadataOptions = {
  title: string
  description: string
  path?: string
  keywords?: string[]
  image?: string
}

function normalizePath(path = '/') {
  if (path === '/') return '/'

  return path.startsWith('/') ? path : `/${path}`
}

export function getAbsoluteUrl(path = '/') {
  const normalizedPath = normalizePath(path)

  return normalizedPath === '/' ? siteUrl : `${siteUrl}${normalizedPath}`
}

export function createSeoMetadata({
  title,
  description,
  path = '/',
  keywords = [],
  image = defaultSeoImage,
}: SeoMetadataOptions): Metadata {
  const canonicalPath = normalizePath(path)
  const canonicalUrl = getAbsoluteUrl(canonicalPath)
  const mergedKeywords = Array.from(new Set([...seoKeywords, ...keywords]))

  return {
    title: {
      absolute: title,
    },
    description,
    keywords: mergedKeywords,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName,
      images: [
        {
          url: image,
          alt: `${siteName} technical training and internship institute in Ahmedabad`,
        },
      ],
      locale: 'en_IN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}
