import type { Metadata } from 'next'
import Image from 'next/image'
import { cvData } from '@/content/statement'
import PageHeader from '@/components/PageHeader'
import PageTransition from '@/components/PageTransition'

export const metadata: Metadata = {
  title: 'Exhibitions',
  description: 'Selected exhibitions of John Patrick Lachica.',
  alternates: { canonical: '/exhibitions' },
}

export default function CVPage() {
  return (
    <PageTransition>
      {/* Header — normal dark background, no image */}
      <PageHeader title="Exhibitions" eyebrow="John Patrick Lachica" />

      {/* Exhibits — background image contained to this panel only */}
      <div className="pad-x" style={{ maxWidth: '1080px', margin: '0 auto', padding: '64px 48px 120px' }}>
        <div style={{ position: 'relative', overflow: 'hidden', border: '1px solid rgba(240,237,232,0.08)' }}>
          {/* Background image */}
          <Image
            src="/images/contact-banner.webp"
            alt=""
            aria-hidden
            fill
            sizes="(max-width: 1080px) 100vw, 1080px"
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
          {/* Dim overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(to bottom, rgba(10,10,10,0.8) 0%, rgba(10,10,10,0.88) 100%)',
            }}
          />

          {/* Carded list */}
          <div
            style={{
              position: 'relative',
              zIndex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              padding: '48px',
            }}
          >
            {cvData.exhibitions.map(({ year, title, venue }, i) => (
              <div
                key={i}
                style={{
                  background: 'rgba(17,17,17,0.62)',
                  backdropFilter: 'blur(6px)',
                  WebkitBackdropFilter: 'blur(6px)',
                  border: '1px solid rgba(240,237,232,0.1)',
                  padding: '28px 32px',
                }}
              >
                <p
                  style={{
                    fontSize: '10px',
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    color: '#C4A882',
                    marginBottom: '12px',
                  }}
                >
                  {year}
                </p>
                <h3
                  style={{
                    fontFamily: 'var(--font-cormorant), Georgia, serif',
                    fontSize: '22px',
                    fontWeight: 400,
                    color: '#F0EDE8',
                    lineHeight: 1.25,
                    marginBottom: '6px',
                  }}
                >
                  {title}
                </h3>
                <p style={{ fontSize: '13px', color: '#8C8580', lineHeight: 1.6 }}>{venue}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
