import type { Metadata } from 'next'
import Image from 'next/image'
import { artistStatement } from '@/content/statement'
import PageHeader from '@/components/PageHeader'
import PageTransition from '@/components/PageTransition'

export const metadata: Metadata = {
  title: 'Artist Statement — Soul in Silence · John Patrick Lachica',
  description:
    'The artist statement of John Patrick Lachica — on silence, vulnerability, and art that speaks where words fall short.',
}

export default function StatementPage() {
  return (
    <PageTransition>
      <PageHeader title="Artist Statement" eyebrow="Soul in Silence" />
      <div
        className="pad-x"
        style={{
          maxWidth: '680px',
          margin: '0 auto',
          padding: '80px 48px 120px',
        }}
      >
        <div
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '3 / 4',
            marginBottom: '64px',
            overflow: 'hidden',
            background: '#111111',
          }}
        >
          <Image
            src="/images/about-portrait-2.webp"
            alt="John Patrick Lachica"
            fill
            sizes="(max-width: 680px) 100vw, 680px"
            style={{ objectFit: 'cover', objectPosition: 'center top', opacity: 0.9 }}
          />
        </div>
        {artistStatement.body.map((paragraph, i) => (
          <p
            key={i}
            style={{
              fontFamily:
                i === 0
                  ? 'var(--font-cormorant), Georgia, serif'
                  : undefined,
              fontSize: i === 0 ? '28px' : '15px',
              fontStyle: i === 0 ? 'italic' : 'normal',
              fontWeight: 300,
              lineHeight: i === 0 ? 1.6 : 2.1,
              color: i === 0 ? '#F0EDE8' : '#8C8580',
              marginBottom: i === 0 ? '56px' : '28px',
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
