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

      {/* Exhibits — full-height background panel with the list on top */}
      <div className="pad-x" style={{ maxWidth: '1320px', margin: '0 auto', padding: '48px 48px 80px' }}>
        <div
          style={{
            position: 'relative',
            overflow: 'hidden',
            minHeight: 'calc(100vh - 260px)',
            border: '1px solid rgba(240,237,232,0.08)',
          }}
        >
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

          {/* List view */}
          <div style={{ position: 'relative', zIndex: 1, padding: '56px' }}>
            {cvData.exhibitions.map(({ year, title, venue }, i) => (
              <div
                key={i}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '72px 1fr',
                  gap: '32px',
                  padding: '24px 0',
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
