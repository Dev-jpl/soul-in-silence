import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import PageTransition from '@/components/PageTransition'

export const metadata: Metadata = {
  title: 'About — Soul in Silence · John Patrick Lachica',
  description:
    'John Patrick Lachica is a contemporary Filipino visual artist whose work explores themes of vulnerability, resilience, and the emotional landscapes of human experience.',
}

export default function AboutPage() {
  return (
    <PageTransition>
      {/* Two-column: portrait + bio */}
      <div className="stack-mobile" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '80vh' }}>
        <div
          style={{
            position: 'relative',
            background: '#111111',
            overflow: 'hidden',
            minHeight: '560px',
          }}
        >
          <Image
            src="/images/artist-portrait.jpg"
            alt="John Patrick Lachica"
            fill
            priority
            style={{ objectFit: 'cover', opacity: 0.85 }}
          />
        </div>

        <div
          className="pad-x"
          style={{
            padding: '96px 64px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <p
            style={{
              fontSize: '10px',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#C4A882',
              marginBottom: '24px',
            }}
          >
            The Artist
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: '44px',
              fontWeight: 300,
              lineHeight: 1.12,
              color: '#F0EDE8',
              marginBottom: '32px',
            }}
          >
            John Patrick<br />Lachica
          </h1>
          <div
            style={{
              fontSize: '13px',
              lineHeight: 2.1,
              color: '#8C8580',
              maxWidth: '420px',
            }}
          >
            <p>
              John Patrick Lachica is a contemporary Filipino visual artist whose work
              explores the emotional landscapes of human experience — vulnerability,
              resilience, memory, and the quiet courage it takes to feel.
            </p>
            <p style={{ marginTop: '18px' }}>
              Through expressive painting and symbolic storytelling, he creates
              emotionally charged works that blur the boundaries between personal
              memory and collective reflection.
            </p>
            <p style={{ marginTop: '18px' }}>
              He is the founder of Soul in Silence, an art practice rooted in
              introspection and the belief that art can speak where words fall short.
            </p>
          </div>

          <div style={{ marginTop: '48px', display: 'flex', gap: '20px' }}>
            <Link
              href="/statement"
              style={{
                fontSize: '10px',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#F0EDE8',
                border: '1px solid rgba(240,237,232,0.25)',
                padding: '12px 24px',
                textDecoration: 'none',
              }}
            >
              Read Statement
            </Link>
            <Link
              href="/cv"
              style={{
                fontSize: '10px',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#8C8580',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                borderBottom: '1px solid rgba(140,133,128,0.3)',
              }}
            >
              View CV
            </Link>
          </div>
        </div>
      </div>

      {/* Detail blocks */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          background: 'rgba(240,237,232,0.06)',
          borderTop: '1px solid rgba(240,237,232,0.08)',
        }}
      >
        {[
          { label: 'Based in', value: 'Manila\nPhilippines' },
          { label: 'Practice', value: 'Oil Painting\nMixed Media\nDrawing' },
          { label: 'Art Practice', value: 'Soul in Silence\nFounded 2020' },
        ].map(({ label, value }, i) => (
          <div
            key={label}
            style={{
              padding: '48px 40px',
              borderRight: i < 2 ? '1px solid rgba(240,237,232,0.08)' : undefined,
            }}
          >
            <p
              style={{
                fontSize: '10px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#C4A882',
                marginBottom: '16px',
              }}
            >
              {label}
            </p>
            {value.split('\n').map((line) => (
              <p
                key={line}
                style={{
                  fontFamily: 'var(--font-cormorant), Georgia, serif',
                  fontSize: '17px',
                  fontWeight: 300,
                  lineHeight: 1.8,
                  color: '#F0EDE8',
                }}
              >
                {line}
              </p>
            ))}
          </div>
        ))}
      </div>
    </PageTransition>
  )
}
