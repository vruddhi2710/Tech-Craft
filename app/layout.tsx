import './globals.css'
import type { Metadata } from 'next'
import FreeConsultationWidget from '../components/FreeConsultationWidget'
import TechCraftAssistant from '../components/TechCraftAssistant'
import {
  defaultSeoImage,
  homeSeoDescription,
  homeSeoTitle,
  seoKeywords,
  siteName,
  siteUrl,
} from './seo'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  title: {
    default: homeSeoTitle,
    template: '%s | Tech-Craft',
  },
  description: homeSeoDescription,
  keywords: seoKeywords,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: homeSeoTitle,
    description: homeSeoDescription,
    url: '/',
    siteName,
    images: [
      {
        url: defaultSeoImage,
        alt: 'Tech-Craft technical training and internship institute in Ahmedabad',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: homeSeoTitle,
    description: homeSeoDescription,
    images: [defaultSeoImage],
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
        <TechCraftAssistant />
        <FreeConsultationWidget />
      </body>
    </html>
  )
}
