import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import './globals.css'
import { Analytics } from '@vercel/analytics/next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PageViewTracker from '@/components/PageViewTracker'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400'],
  variable: '--font-inter',
  display: 'swap',
})

// Set NEXT_PUBLIC_SITE_URL to your final domain (e.g. https://soulinsilence.art).
// Falls back to the Vercel deployment URL, then a sensible default.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://soul-in-silence.vercel.app')

const description =
  'The art practice of John Patrick Lachica — a Filipino contemporary visual artist exploring vulnerability, resilience, and the emotional landscapes of human experience. Original works and commissions.'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Soul in Silence · John Patrick Lachica',
    template: '%s · Soul in Silence',
  },
  description,
  keywords: [
    'John Patrick Lachica',
    'Soul in Silence',
    'Filipino artist',
    'contemporary fine art',
    'Philippine contemporary art',
    'visual artist',
    'art commissions',
    'painting',
    'mixed media',
    'Manila artist',
  ],
  authors: [{ name: 'John Patrick Lachica' }],
  creator: 'John Patrick Lachica',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Soul in Silence · John Patrick Lachica',
    description,
    type: 'website',
    siteName: 'Soul in Silence',
    locale: 'en_US',
    url: siteUrl,
    images: [{ url: '/images/hero.webp', width: 1672, height: 941, alt: 'Soul in Silence' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Soul in Silence · John Patrick Lachica',
    description,
    images: ['/images/hero.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'John Patrick Lachica',
  url: siteUrl,
  jobTitle: 'Visual Artist',
  description,
  nationality: 'Filipino',
  address: { '@type': 'PostalAddress', addressLocality: 'Manila', addressCountry: 'PH' },
  sameAs: ['https://www.instagram.com/soul.n.silence/'],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Analytics />
        <PageViewTracker />
      </body>
    </html>
  )
}
