import './globals.css'
import type { Metadata } from 'next'
import FreeConsultationWidget from '../components/FreeConsultationWidget'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Tech-Craft | Learn AI, ReactJS, Python & Web Development',
    template: '%s | Tech-Craft',
  },
  description: 'Learn AI, ReactJS, Python & Future Skills with ISO-certified certification, training support, and placement support.',
  keywords: [
    'Tech-Craft',
    'AI course',
    'ReactJS course',
    'Python course',
    'Web Development course',
    'GenAI workshop',
    'tech internship',
    'ISO certified certification',
    'placement support',
    'training support',
  ],
  openGraph: {
    title: 'Tech-Craft',
    description: 'Learn AI, ReactJS, Python & Future Skills with real projects, ISO-certified certification, and placement support.',
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
      <body>
        {children}
        <FreeConsultationWidget />
      </body>
    </html>
  )
}
