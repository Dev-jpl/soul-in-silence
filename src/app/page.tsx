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
        <div style={{ position: 'absolute', inset: 0, background: '#000', overflow: 'hidden' }}>
          {/* Desktop artwork — contained on solid black, 20px border */}
          <div className="hero-img-desktop" style={{ position: 'absolute', inset: '20px' }}>
            <Image
              src="/images/hero-art.webp"
              alt="Soul in Silence — original painting by John Patrick Lachica"
              fill
              priority
              style={{ objectFit: 'contain', objectPosition: 'center center' }}
            />
          </div>
          {/* Mobile artwork */}
          <div className="hero-img-mobile" style={{ position: 'absolute', inset: '20px' }}>
            <Image
              src="/images/hero-art.webp"
              alt="Soul in Silence — original painting by John Patrick Lachica"
              fill
              priority
              style={{ objectFit: 'contain', objectPosition: 'center center' }}
            />
          </div>
          {/* Subtle dark-left scrim so the title stays legible (desktop) */}
          <div
            className="hero-scrim-desktop"
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 28%, rgba(0,0,0,0) 55%)',
            }}
          />
          {/* Subtle dark-top scrim (mobile) */}
          <div
            className="hero-scrim-mobile"
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 35%, rgba(0,0,0,0) 60%)',
            }}
          />
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
            <span className="tagline-web">
              Not everything we carry can be spoken. Turning{' '}
              <span style={{ color: '#C4A882' }}>silence</span> into language. Giving form to{' '}
              <span style={{ color: '#C4A882' }}>emotion</span>.
            </span>
            <span className="tagline-mobile">
              Not everything we carry can be spoken.
              <br />
              Turning <span style={{ color: '#C4A882' }}>silence</span> into language. 
               <br />
              Giving form to <span style={{ color: '#C4A882' }}>emotion</span>.
            </span>
          </p>

          {/* CTA Button */}
          <OutlineButton href="/works">
            View the Works
          </OutlineButton>
        </div>
        </div>

        {/* Top gradient — solid black fading down, blends with the navbar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '240px',
            zIndex: 3,
            background:
              'linear-gradient(to bottom, rgba(10,10,10,1) 0%, rgba(10,10,10,0.7) 32%, rgba(10,10,10,0) 100%)',
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
