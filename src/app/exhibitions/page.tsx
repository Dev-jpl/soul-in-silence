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

      {/* Exhibits — background panel contained to the page width */}
      <div className="pad-x" style={{ maxWidth: '1320px', margin: '0 auto' }}>
        <div
          style={{
            position: 'relative',
            overflow: 'hidden',
            minHeight: 'calc(100vh - 200px)',
          }}
        >
          {/* Background image */}
          <Image
            src="/images/contact-banner.webp"
            alt=""
            aria-hidden
            fill
            sizes="(max-width: 1320px) 100vw, 1320px"
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
          {/* Sides fade dark → transparent toward the center */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(to right, rgba(10,10,10,1) 0%, rgba(10,10,10,0.45) 28%, rgba(10,10,10,0.45) 72%, rgba(10,10,10,1) 100%)',
            }}
          />

          {/* List view */}
          <div
            className="pad-x"
            style={{
              position: 'relative',
              zIndex: 1,
              maxWidth: '1320px',
              margin: '0 auto',
              padding: '56px 48px',
            }}
          >
            {cvData.exhibitions.map(({ year, title, venue }, i) => (
              <div
                key={i}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '72px 1fr',
                  gap: '32px',
                  padding: '24px 28px',
                  background:
                    'linear-gradient(to right, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.7) 45%, rgba(10,10,10,0) 100%)',
                  borderTop: i === 0 ? '1px solid rgba(240,237,232,0.12)' : undefined,
                  borderBottom: '1px solid rgba(240,237,232,0.1)',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-cormorant), Georgia, serif',
                    fontSize: '15px',
                    fontWeight: 300,
                    color: '#C4A882',
                    paddingTop: '2px',
                  }}
                >
                  {year}
                </span>
                <div>
                  <p
                    style={{
                      fontFamily: 'var(--font-cormorant), Georgia, serif',
                      fontSize: '20px',
                      fontWeight: 400,
                      color: '#F0EDE8',
                      lineHeight: 1.3,
                      marginBottom: '4px',
                    }}
                  >
                    {title}
                  </p>
                  <p style={{ fontSize: '12px', color: '#8C8580', lineHeight: 1.6 }}>{venue}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
