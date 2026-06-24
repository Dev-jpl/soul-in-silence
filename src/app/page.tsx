import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { featuredWorks } from '@/content/works'
import PageTransition from '@/components/PageTransition'
import SectionLabel from '@/components/SectionLabel'
import FeaturedWork from '@/components/FeaturedWork'

export const metadata: Metadata = {
  title: 'Soul in Silence · John Patrick Lachica',
  description:
    'The art practice of John Patrick Lachica — a Filipino contemporary visual artist exploring vulnerability, resilience, and the emotional landscapes of human experience.',
}

export default function Home() {
  return (
    <PageTransition>
      {/* Hero */}
      <section
        style={{
          position: 'relative',
          height: '90vh',
          minHeight: '560px',
          display: 'flex',
          alignItems: 'flex-end',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', inset: 0 }}>
          <Image
            src="/images/hero.jpg"
            alt="Soul in Silence — John Patrick Lachica"
            fill
            priority
            style={{ objectFit: 'cover', opacity: 0.6 }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(to top, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.3) 50%, rgba(10,10,10,0.1) 100%)',
            }}
          />
        </div>

        <div
          style={{
            position: 'relative',
            zIndex: 2,
            padding: '0 48px 80px',
            maxWidth: '700px',
          }}
        >
          <p
            style={{
              fontSize: '10px',
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              color: '#C4A882',
              marginBottom: '20px',
            }}
          >
            John Patrick Lachica · Filipino Visual Artist
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: 'clamp(56px, 9vw, 96px)',
              fontWeight: 300,
              lineHeight: 1.0,
              letterSpacing: '-0.01em',
              color: '#F0EDE8',
              marginBottom: '24px',
            }}
          >
            Soul in<br />Silence
          </h1>
          <p
            style={{
              fontSize: '13px',
              lineHeight: 1.9,
              color: '#8C8580',
              maxWidth: '400px',
              marginBottom: '40px',
            }}
          >
            An art practice rooted in vulnerability, memory, and the quiet terrain of human emotion.
          </p>
          <div
            onMouseEnter={(e) => {
              const el = e.currentTarget.querySelector('a') as HTMLElement
              if (el) {
                el.style.borderColor = '#C4A882'
                el.style.color = '#C4A882'
              }
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget.querySelector('a') as HTMLElement
              if (el) {
                el.style.borderColor = 'rgba(240,237,232,0.35)'
                el.style.color = '#F0EDE8'
              }
            }}
          >
            <Link
              href="/works"
              style={{
                display: 'inline-block',
                fontSize: '10px',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#F0EDE8',
                border: '1px solid rgba(240,237,232,0.35)',
                padding: '13px 30px',
                textDecoration: 'none',
                transition: 'border-color 0.2s, color 0.2s',
              }}
            >
              View the Works
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Works */}
      <section style={{ padding: '96px 48px' }}>
        <SectionLabel>Selected Works</SectionLabel>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '2px',
          }}
        >
          {/* Large left piece */}
          {featuredWorks[0] && (
            <div style={{ gridRow: 'span 2' }}>
              <FeaturedWork artwork={featuredWorks[0]} tall />
            </div>
          )}
          {/* Two right pieces stacked */}
          {featuredWorks[1] && <FeaturedWork artwork={featuredWorks[1]} />}
          {featuredWorks[2] && <FeaturedWork artwork={featuredWorks[2]} />}
        </div>
        <div
          style={{ marginTop: '48px', textAlign: 'right' }}
          onMouseEnter={(e) => {
            const link = e.currentTarget.querySelector('a') as HTMLElement
            if (link) link.style.color = '#C4A882'
          }}
          onMouseLeave={(e) => {
            const link = e.currentTarget.querySelector('a') as HTMLElement
            if (link) link.style.color = '#8C8580'
          }}
        >
          <Link
            href="/works"
            style={{
              fontSize: '10px',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#8C8580',
              textDecoration: 'none',
              borderBottom: '1px solid rgba(140,133,128,0.3)',
              paddingBottom: '3px',
              transition: 'color 0.2s',
            }}
          >
            View All Works →
          </Link>
        </div>
      </section>

      {/* Artist Statement pullquote */}
      <section
        style={{
          padding: '80px 48px 96px',
          borderTop: '1px solid rgba(240,237,232,0.08)',
          display: 'flex',
          gap: '80px',
          alignItems: 'flex-start',
        }}
      >
        <p
          style={{
            fontSize: '10px',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#C4A882',
            minWidth: '120px',
            marginTop: '8px',
          }}
        >
          Statement
        </p>
        <blockquote
          style={{
            fontFamily: 'var(--font-cormorant), Georgia, serif',
            fontSize: '28px',
            fontWeight: 300,
            fontStyle: 'italic',
            lineHeight: 1.65,
            color: '#F0EDE8',
            maxWidth: '580px',
          }}
        >
          "I make art that speaks where words fall short — inviting viewers to find meaning within their own stories, their own{' '}
          <em style={{ fontStyle: 'normal', color: '#C4A882' }}>silences.</em>"
        </blockquote>
      </section>
    </PageTransition>
  )
}
