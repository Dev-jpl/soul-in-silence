import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { works } from '@/content/works'
import PageTransition from '@/components/PageTransition'
import SwipeNav from '@/components/SwipeNav'
import TrackArtworkView from '@/components/TrackArtworkView'

interface Props {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return works.map((w) => ({ slug: w.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const artwork = works.find((w) => w.slug === slug)
  if (!artwork) return {}
  return {
    title: artwork.title,
    description: artwork.description,
    alternates: { canonical: `/works/${artwork.slug}` },
    openGraph: {
      title: `${artwork.title} · Soul in Silence`,
      description: artwork.description,
      type: 'article',
      images: [{ url: artwork.image, alt: artwork.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${artwork.title} · Soul in Silence`,
      description: artwork.description,
      images: [artwork.image],
    },
  }
}

export default async function WorkPage({ params }: Props) {
  const { slug } = await params
  const index = works.findIndex((w) => w.slug === slug)
  if (index === -1) notFound()

  const artwork = works[index]
  const prev = index > 0 ? works[index - 1] : null
  const next = index < works.length - 1 ? works[index + 1] : null

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'VisualArtwork',
    name: artwork.title,
    image: artwork.image,
    artform: artwork.medium,
    artMedium: artwork.medium,
    dateCreated: String(artwork.year),
    description: artwork.description,
    creator: { '@type': 'Person', name: 'John Patrick Lachica' },
  }

  return (
    <PageTransition>
      <SwipeNav prevSlug={prev?.slug} nextSlug={next?.slug} />
      <TrackArtworkView slug={artwork.slug} title={artwork.title} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="pad-x" style={{ maxWidth: '1200px', margin: '0 auto', padding: '64px 48px' }}>
        {/* Back */}
        <Link
          href="/works"
          style={{
            display: 'inline-block',
            fontSize: '10px',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: '#8C8580',
            textDecoration: 'none',
            marginBottom: '48px',
            transition: 'color 0.2s',
          }}
        >
          ← All Works
        </Link>

        <div
          className="stack-mobile detail-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 380px',
            gap: '80px',
            alignItems: 'flex-start',
          }}
        >
          {/* Artwork image */}
          <div
            style={{
              position: 'relative',
              background: '#161616',
              aspectRatio: '4/5',
            }}
          >
            <Image src={artwork.image} alt={artwork.title} fill priority style={{ objectFit: 'contain' }} />
          </div>

          {/* Info panel */}
          <div style={{ paddingTop: '8px' }}>
            <p
              style={{
                fontSize: '10px',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: '#C4A882',
                marginBottom: '16px',
              }}
            >
              {artwork.year}
            </p>
            <h1
              style={{
                fontFamily: 'var(--font-cormorant), Georgia, serif',
                fontSize: '40px',
                fontWeight: 300,
                lineHeight: 1.1,
                color: '#F0EDE8',
                marginBottom: '32px',
              }}
            >
              {artwork.title}
            </h1>

            <div style={{ borderTop: '1px solid rgba(240,237,232,0.08)', paddingTop: '28px', marginBottom: '28px' }}>
              {[
                ['Medium', artwork.medium],
                ['Year', String(artwork.year)],
              ].map(([label, value]) => (
                <div
                  key={label}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '12px 0',
                    borderBottom: '1px solid rgba(240,237,232,0.06)',
                  }}
                >
                  <span
                    style={{
                      fontSize: '10px',
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: '#8C8580',
                    }}
                  >
                    {label}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-cormorant), Georgia, serif',
                      fontSize: '15px',
                      fontWeight: 300,
                      color: '#F0EDE8',
                    }}
                  >
                    {value}
                  </span>
                </div>
              ))}
            </div>

            <p style={{ fontSize: '13px', lineHeight: 2.0, color: '#8C8580' }}>
              {artwork.description}
            </p>
          </div>
        </div>

        {/* Prev / Next navigation */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '96px',
            paddingTop: '40px',
            borderTop: '1px solid rgba(240,237,232,0.08)',
          }}
        >
          {prev ? (
            <Link href={`/works/${prev.slug}`} style={{ textDecoration: 'none' }}>
              <p style={{ fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#8C8580', marginBottom: '8px' }}>
                ← Previous
              </p>
              <p style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: '20px', fontWeight: 300, color: '#F0EDE8' }}>
                {prev.title}
              </p>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link href={`/works/${next.slug}`} style={{ textDecoration: 'none', textAlign: 'right' }}>
              <p style={{ fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#8C8580', marginBottom: '8px' }}>
                Next →
              </p>
              <p style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: '20px', fontWeight: 300, color: '#F0EDE8' }}>
                {next.title}
              </p>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </PageTransition>
  )
}
