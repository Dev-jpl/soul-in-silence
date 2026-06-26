import type { Metadata } from 'next'
import Image from 'next/image'
import { artistStatement } from '@/content/statement'
import PageTransition from '@/components/PageTransition'

export const metadata: Metadata = {
  title: 'Artist Statement',
  description:
    'The artist statement of John Patrick Lachica — on silence, vulnerability, and art that speaks where words fall short.',
  alternates: { canonical: '/statement' },
}

export default function StatementPage() {
  const [opening, ...rest] = artistStatement.body

  return (
    <PageTransition>
      <div
        className="pad-x"
        style={{
          maxWidth: '760px',
          margin: '0 auto',
          padding: '80px 48px 120px',
        }}
      >
        {/* Title */}
        <h1
          style={{
            fontFamily: 'var(--font-cormorant), Georgia, serif',
            fontSize: 'clamp(34px, 5vw, 48px)',
            fontWeight: 300,
            letterSpacing: '-0.01em',
            color: '#F0EDE8',
            marginBottom: '40px',
          }}
        >
          Artist Statement
        </h1>

        {/* Portrait (profile-3) */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '3 / 2',
            overflow: 'hidden',
            background: '#111111',
            marginBottom: '48px',
          }}
        >
          <Image
            src="/images/statement-portrait-v2.webp"
            alt="John Patrick Lachica"
            fill
            sizes="(max-width: 760px) 100vw, 760px"
            style={{
              objectFit: 'cover',
              objectPosition: 'center',
              opacity: 0.95,
            }}
          />
        </div>

        {/* Opening line */}
        <p
          style={{
            fontFamily: 'var(--font-cormorant), Georgia, serif',
            fontSize: '28px',
            fontStyle: 'italic',
            fontWeight: 300,
            lineHeight: 1.6,
            color: '#F0EDE8',
            marginBottom: '40px',
          }}
        >
          {opening}
        </p>

        {/* Description */}
        {rest.map((paragraph, i) => (
          <p
            key={i}
            style={{
              fontSize: '15px',
              fontWeight: 300,
              lineHeight: 2.1,
              color: '#8C8580',
              marginBottom: '28px',
            }}
          >
            {paragraph}
          </p>
        ))}

        <p
          style={{
            fontFamily: 'var(--font-cormorant), Georgia, serif',
            fontSize: '16px',
            fontStyle: 'italic',
            fontWeight: 300,
            color: '#C4A882',
            marginTop: '56px',
            paddingTop: '40px',
            borderTop: '1px solid rgba(240,237,232,0.08)',
          }}
        >
          {artistStatement.closing}
        </p>
      </div>
    </PageTransition>
  )
}
