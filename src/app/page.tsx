import type { Metadata } from 'next'
import Image from 'next/image'
import PageTransition from '@/components/PageTransition'
import { OutlineButton } from '@/components/OutlineButton'

export const metadata: Metadata = {
  title: 'Soul in Silence — Contemporary Fine Art by John Patrick Lachica',
  description:
    'An art practice rooted in vulnerability, resilience, and the quiet terrain of human emotion. Explore the work of Filipino contemporary visual artist John Patrick Lachica.',
}

export default function Home() {
  return (
    <PageTransition>
      {/* Hero Section */}
      <section
        className="hero-section"
        style={{
          position: 'relative',
          height: '100vh',
          minHeight: '680px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, rgba(10,10,10,1) 0%, rgba(20,18,15,0.95) 100%)',
        }}
      >
        {/* Background Image */}
        <div style={{ position: 'absolute', inset: 0 }}>
          {/* Desktop / landscape artwork */}
          <Image
            src="/images/hero.webp"
            alt="Soul in Silence"
            fill
            priority
            className="hero-img-desktop"
            style={{
              objectFit: 'cover',
              objectPosition: 'center center',
              opacity: 0.92,
            }}
          />
          {/* Mobile / portrait artwork */}
          <Image
            src="/images/hero-mobile.webp"
            alt="Soul in Silence"
            fill
            priority
            className="hero-img-mobile"
            style={{
              objectFit: 'cover',
              objectPosition: 'center center',
              opacity: 0.95,
            }}
          />
          {/* Desktop scrim: dark-left for text legibility, soft bottom,
              letting the luminous center-right of the artwork breathe */}
          <div
            className="hero-scrim-desktop"
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(to right, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.72) 22%, rgba(10,10,10,0.28) 46%, rgba(10,10,10,0) 68%), linear-gradient(to top, rgba(10,10,10,0.8) 0%, rgba(10,10,10,0.12) 34%, rgba(10,10,10,0) 58%)',
            }}
          />
          {/* Mobile scrim: dark top for the title, clearing the figure below */}
          <div
            className="hero-scrim-mobile"
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(to bottom, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.7) 22%, rgba(10,10,10,0.2) 42%, rgba(10,10,10,0) 60%), linear-gradient(to top, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0) 30%)',
            }}
          />
          {/* Overall dim */}
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,10,10,0.45)' }} />
        </div>

        <div className="hero-container" style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: '1320px', margin: '0 auto' }}>
        <div className="hero-content" style={{ padding: '0 48px', maxWidth: '560px' }}>
          {/* Eyebrow with accent rule */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '18px', marginBottom: '30px' }}>
            <span style={{ width: '44px', height: '1px', background: '#C4A882', opacity: 0.7 }} />
            <p
              style={{
                fontSize: '11px',
                letterSpacing: '0.32em',
                textTransform: 'uppercase',
                color: '#C4A882',
                fontWeight: 400,
              }}
            >
              Contemporary Fine Art
            </p>
          </div>

          {/* Main Title */}
          <h1
            className="hero-title"
            style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: 'clamp(44px, 7vw, 92px)',
              fontWeight: 300,
              lineHeight: 1.05,
              letterSpacing: '-0.015em',
              color: '#F0EDE8',
              // marginBottom: '16px',
              whiteSpace: 'nowrap',
              textShadow: '0 2px 40px rgba(0,0,0,0.5)',
            }}
          >
            Soul in Silence
          </h1>

          {/* Byline */}
          <p
            style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: 'clamp(18px, 2vw, 24px)',
              fontWeight: 300,
              fontStyle: 'italic',
              letterSpacing: '0.04em',
              color: '#8C8580',
              marginBottom: '36px',
            }}
          >
            by John Patrick Lachica
          </p>

          {/* Description */}
          <p
            style={{
              fontSize: '15px',
              lineHeight: 1.85,
              color: '#B4ADA6',
              maxWidth: '430px',
              marginBottom: '44px',
            }}
          >
            Turning <span style={{ color: '#C4A882' }}>silence</span> into language, giving form to <span style={{ color: '#C4A882' }}>emotion</span>.
          </p>

          {/* CTA Button */}
          <OutlineButton href="/works">
            View the Works
          </OutlineButton>
        </div>
        </div>

        {/* Top gradient — navbar bleeds into the hero */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '180px',
            zIndex: 3,
            background:
              'linear-gradient(to bottom, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.4) 40%, transparent 100%)',
            pointerEvents: 'none',
          }}
        />
        {/* Bottom gradient — hero melts into the next section */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '200px',
            zIndex: 3,
            background:
              'linear-gradient(to top, rgba(10,10,10,1) 0%, rgba(10,10,10,0.6) 50%, transparent 100%)',
            pointerEvents: 'none',
          }}
        />

      </section>



    </PageTransition>
  )
}
