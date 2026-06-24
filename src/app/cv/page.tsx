import type { Metadata } from 'next'
import { cvData } from '@/content/statement'
import PageHeader from '@/components/PageHeader'
import PageTransition from '@/components/PageTransition'

export const metadata: Metadata = {
  title: 'CV — Soul in Silence · John Patrick Lachica',
  description:
    'Curriculum vitae of John Patrick Lachica — exhibitions, education, press, and collections.',
}

function CVSection({
  title,
  items,
}: {
  title: string
  items: { year: string; title: string; venue: string }[]
}) {
  return (
    <div
      style={{
        paddingBottom: '64px',
        borderBottom: '1px solid rgba(240,237,232,0.08)',
        marginBottom: '64px',
      }}
    >
      <p
        style={{
          fontSize: '10px',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: '#C4A882',
          marginBottom: '36px',
        }}
      >
        {title}
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
        {items.map(({ year, title: itemTitle, venue }, i) => (
          <div
            key={i}
            style={{
              display: 'grid',
              gridTemplateColumns: '72px 1fr',
              gap: '32px',
              padding: '20px 0',
              borderTop: i === 0 ? '1px solid rgba(240,237,232,0.08)' : undefined,
              borderBottom: '1px solid rgba(240,237,232,0.06)',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-cormorant), Georgia, serif',
                fontSize: '15px',
                fontWeight: 300,
                color: '#8C8580',
                paddingTop: '2px',
              }}
            >
              {year}
            </span>
            <div>
              <p
                style={{
                  fontFamily: 'var(--font-cormorant), Georgia, serif',
                  fontSize: '18px',
                  fontWeight: 400,
                  color: '#F0EDE8',
                  lineHeight: 1.3,
                  marginBottom: '4px',
                }}
              >
                {itemTitle}
              </p>
              <p style={{ fontSize: '12px', color: '#8C8580', lineHeight: 1.6 }}>
                {venue}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function CVPage() {
  return (
    <PageTransition>
      <PageHeader title="Curriculum Vitae" eyebrow="John Patrick Lachica" />
      <div
        style={{
          maxWidth: '840px',
          margin: '0 auto',
          padding: '80px 48px 120px',
        }}
      >
        <CVSection title="Exhibitions" items={cvData.exhibitions} />
        <CVSection title="Education & Residencies" items={cvData.education} />
        <CVSection title="Press" items={cvData.press} />
        <CVSection title="Collections" items={cvData.collections} />
      </div>
    </PageTransition>
  )
}
