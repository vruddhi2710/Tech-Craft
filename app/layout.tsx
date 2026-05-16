import './globals.css'
import type { Metadata } from 'next'
import Script from 'next/script'
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
      <head>
        <Script id="google-tag-manager" strategy="beforeInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MWTRKRHN');`}
        </Script>
      </head>
      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MWTRKRHN"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {children}
        <TechCraftAssistant />
        <FreeConsultationWidget />
      </body>
    </html>
  )
}
