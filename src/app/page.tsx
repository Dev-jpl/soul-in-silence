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
        </div>

        <style>{`
          @keyframes scrollLine {
            0%   { transform: scaleY(0); transform-origin: top; }
            45%  { transform: scaleY(1); transform-origin: top; }
            55%  { transform: scaleY(1); transform-origin: bottom; }
            100% { transform: scaleY(0); transform-origin: bottom; }
          }
        `}</style>

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
              marginBottom: '16px',
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
            An art practice rooted in <span style={{ color: '#C4A882' }}>vulnerability</span>, <span style={{ color: '#C4A882' }}>resilience</span>, and the quiet landscapes of human emotion — where silence becomes a language, and feeling becomes form.
          </p>

          {/* CTA Button */}
          <OutlineButton href="/works">
            View the Works
          </OutlineButton>
        </div>
        </div>

        {/* Scroll indicator — bottom-right, away from the subject */}
        <div
          className="hero-scroll"
          style={{
            position: 'absolute',
            bottom: '48px',
            right: '48px',
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '18px',
          }}
        >
          <span
            style={{
              writingMode: 'vertical-rl',
              fontSize: '10px',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: '#8C8580',
            }}
          >
            Scroll
          </span>
          <span
            style={{
              position: 'relative',
              width: '1px',
              height: '60px',
              background: 'rgba(240,237,232,0.14)',
              overflow: 'hidden',
            }}
          >
            <span
              style={{
                position: 'absolute',
                inset: 0,
                background: '#C4A882',
                animation: 'scrollLine 2.4s ease-in-out infinite',
              }}
            />
          </span>
        </div>
      </section>

      {/* Brand Philosophy */}
      <section
        className="pad-x"
        style={{
          padding: '96px 48px',
          borderBottom: '1px solid rgba(240,237,232,0.08)',
        }}
      >
        <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
          {/* Section eyebrow + heading */}
          <div style={{ textAlign: 'center', marginBottom: '72px' }}>
            <p
              style={{
                fontSize: '10px',
                letterSpacing: '0.32em',
                textTransform: 'uppercase',
                color: '#C4A882',
                marginBottom: '18px',
              }}
            >
              The Practice
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-cormorant), Georgia, serif',
                fontSize: 'clamp(32px, 4vw, 44px)',
                fontWeight: 300,
                fontStyle: 'italic',
                lineHeight: 1.4,
                color: '#F0EDE8',
                maxWidth: '720px',
                margin: '0 auto',
              }}
            >
              Where words fall short, the work speaks — in vulnerability, resilience, memory, and symbol.
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1px',
              background: 'rgba(240,237,232,0.08)',
              border: '1px solid rgba(240,237,232,0.08)',
            }}
          >
            {[
              {
                label: 'Vulnerability',
                description: 'Art as a space where emotional truth is rendered visible, inviting shared human experience.',
              },
              {
                label: 'Resilience',
                description: 'Exploring the quiet strength found in persistence, transformation, and acceptance.',
              },
              {
                label: 'Memory',
                description: 'Visual narratives that honor the spaces between what was felt and what can be articulated.',
              },
              {
                label: 'Symbolism',
                description: 'Using motif and metaphor to speak to the psychological and emotional landscape.',
              },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  background: '#0A0A0A',
                  padding: '40px 32px',
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-cormorant), Georgia, serif',
                    fontSize: '24px',
                    fontWeight: 300,
                    color: 'rgba(196,168,130,0.5)',
                    marginBottom: '24px',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </p>
                <p
                  style={{
                    fontSize: '12px',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: '#F0EDE8',
                    marginBottom: '16px',
                    fontWeight: 500,
                  }}
                >
                  {item.label}
                </p>
                <p
                  style={{
                    fontSize: '13.5px',
                    lineHeight: 1.8,
                    color: '#8C8580',
                  }}
                >
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>


    </PageTransition>
  )
}
