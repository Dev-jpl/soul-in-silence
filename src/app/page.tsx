import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import PageTransition from '@/components/PageTransition'
import { OutlineButton } from '@/components/OutlineButton'
import { PremiumButton } from '@/components/PremiumButton'

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
        style={{
          position: 'relative',
          height: '100vh',
          minHeight: '680px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, rgba(10,10,10,1) 0%, rgba(20,18,15,0.95) 100%)',
        }}
      >
        {/* Background Image */}
        <div style={{ position: 'absolute', inset: 0 }}>
          <Image
            src="/images/hero.webp"
            alt="Soul in Silence"
            fill
            priority
            style={{
              objectFit: 'cover',
              objectPosition: 'center 60%',
              opacity: 0.92,
              transform: 'translateX(9%)',
            }}
          />
          {/* Directional scrims: dark-left for text legibility, soft bottom,
              letting the luminous center-right of the artwork breathe */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(to right, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.72) 22%, rgba(10,10,10,0.28) 46%, rgba(10,10,10,0) 68%), linear-gradient(to top, rgba(10,10,10,0.8) 0%, rgba(10,10,10,0.12) 34%, rgba(10,10,10,0) 58%)',
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

        <div style={{ position: 'relative', zIndex: 2, padding: '0 48px 160px', maxWidth: '560px' }}>
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
            style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: 'clamp(60px, 9vw, 108px)',
              fontWeight: 300,
              lineHeight: 1.05,
              letterSpacing: '-0.015em',
              color: '#F0EDE8',
              marginBottom: '32px',
              textShadow: '0 2px 40px rgba(0,0,0,0.5)',
            }}
          >
            Soul in Silence
          </h1>

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
            An art practice rooted in <span style={{ color: '#C4A882' }}>vulnerability</span>, <span style={{ color: '#C4A882' }}>resilience</span>, and the quiet terrain of human emotion.
          </p>

          {/* CTA Button */}
          <OutlineButton href="/works">
            View the Works
          </OutlineButton>
        </div>

        {/* Scroll indicator — bottom-right, away from the subject */}
        <div
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

      {/* Modules Section */}
      <section
        id="modules"
        style={{
          padding: '96px 48px',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <p
              style={{
                fontSize: '10px',
                letterSpacing: '0.32em',
                textTransform: 'uppercase',
                color: '#C4A882',
                marginBottom: '18px',
              }}
            >
              The Platform
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-cormorant), Georgia, serif',
                fontSize: 'clamp(34px, 4.5vw, 52px)',
                fontWeight: 300,
                color: '#F0EDE8',
              }}
            >
              Explore Soul in Silence
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '32px',
            }}
          >
            {[
              {
                title: 'Portfolio',
                icon: '🎨',
                description: 'Explore the complete artistic practice',
                link: '/works',
                coming: false,
              },
              {
                title: 'Marketplace',
                icon: '✨',
                description: 'Collectible artworks and editions',
                link: '#',
                coming: true,
              },
              {
                title: 'Shop',
                icon: '🛍️',
                description: 'Merchandise and limited editions',
                link: '#',
                coming: true,
              },
              {
                title: 'Exhibitions',
                icon: '🏛️',
                description: 'Online gallery and exhibition showcase',
                link: '#',
                coming: true,
              },
              {
                title: 'Events',
                icon: '📅',
                description: 'Upcoming shows and events',
                link: '#',
                coming: true,
              },
              {
                title: 'Commissions',
                icon: '🎭',
                description: 'Custom artwork and collaboration',
                link: '#',
                coming: true,
              },
            ].map((module, i) => (
              <div
                key={i}
                style={{
                  padding: '40px 32px',
                  background: module.coming ? 'rgba(20,18,15,0.6)' : 'rgba(25,23,20,0.8)',
                  border: '1px solid rgba(240,237,232,0.08)',
                  transition: 'all 0.3s',
                  opacity: module.coming ? 0.7 : 1,
                  pointerEvents: module.coming ? 'none' : 'auto',
                  cursor: module.coming ? 'default' : 'pointer',
                  textDecoration: 'none',
                }}
              >
                {!module.coming && (
                  <Link
                    href={module.link}
                    style={{
                      textDecoration: 'none',
                      color: 'inherit',
                      display: 'block',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'baseline',
                        justifyContent: 'space-between',
                        marginBottom: '28px',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-cormorant), Georgia, serif',
                          fontSize: '22px',
                          fontWeight: 300,
                          color: 'rgba(196,168,130,0.6)',
                        }}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span style={{ fontSize: '16px', color: '#C4A882' }}>→</span>
                    </div>
                    <h3
                      style={{
                        fontSize: '20px',
                        fontFamily: 'var(--font-cormorant), Georgia, serif',
                        fontWeight: 400,
                        color: '#F0EDE8',
                        marginBottom: '12px',
                      }}
                    >
                      {module.title}
                    </h3>
                    <p
                      style={{
                        fontSize: '13px',
                        color: '#8C8580',
                        lineHeight: 1.6,
                      }}
                    >
                      {module.description}
                    </p>
                  </Link>
                )}
                {module.coming && (
                  <>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'baseline',
                        justifyContent: 'space-between',
                        marginBottom: '28px',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-cormorant), Georgia, serif',
                          fontSize: '22px',
                          fontWeight: 300,
                          color: 'rgba(196,168,130,0.35)',
                        }}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span
                        style={{
                          fontSize: '9px',
                          letterSpacing: '0.14em',
                          color: '#666',
                          textTransform: 'uppercase',
                          fontWeight: 500,
                          border: '1px solid rgba(240,237,232,0.12)',
                          padding: '4px 8px',
                        }}
                      >
                        Soon
                      </span>
                    </div>
                    <h3
                      style={{
                        fontSize: '20px',
                        fontFamily: 'var(--font-cormorant), Georgia, serif',
                        fontWeight: 400,
                        color: '#F0EDE8',
                        marginBottom: '12px',
                      }}
                    >
                      {module.title}
                    </h3>
                    <p
                      style={{
                        fontSize: '13px',
                        color: '#8C8580',
                        lineHeight: 1.6,
                      }}
                    >
                      {module.description}
                    </p>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        style={{
          padding: '80px 48px',
          borderTop: '1px solid rgba(240,237,232,0.08)',
          textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(20,18,15,0.5) 0%, rgba(25,23,20,0.3) 100%)',
        }}
      >
        <h2
          style={{
            fontFamily: 'var(--font-cormorant), Georgia, serif',
            fontSize: '40px',
            fontWeight: 300,
            color: '#F0EDE8',
            marginBottom: '24px',
          }}
        >
          Begin the Journey
        </h2>
        <p
          style={{
            fontSize: '14px',
            color: '#8C8580',
            maxWidth: '500px',
            margin: '0 auto 40px',
            lineHeight: 1.8,
          }}
        >
          Step into a space where art speaks where words fall short. Discover work rooted in vulnerability, resilience, and the profound beauty of human emotion.
        </p>
        <PremiumButton href="/works" variant="primary">
          View Portfolio
        </PremiumButton>
      </section>
    </PageTransition>
  )
}
