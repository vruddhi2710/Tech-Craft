import './globals.css'
import type { Metadata } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Tech-Craft | Learn AI, ReactJS, Python & Web Design',
    template: '%s | Tech-Craft',
  },
  description: 'Learn AI, ReactJS, Python & Future Skills',
  keywords: [
    'Tech-Craft',
    'AI course',
    'ReactJS course',
    'Python course',
    'Web Design course',
    'GenAI workshop',
    'tech internship',
  ],
  openGraph: {
    title: 'Tech-Craft',
    description: 'Learn AI, ReactJS, Python & Future Skills with real projects.',
    url: siteUrl,
    siteName: 'Tech-Craft',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
