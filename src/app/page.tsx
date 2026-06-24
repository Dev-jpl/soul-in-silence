import type { Metadata } from 'next'
import Link from 'next/link'
import PageTransition from '@/components/PageTransition'
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
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, rgba(10,10,10,1) 0%, rgba(20,18,15,0.95) 100%)',
        }}
      >
        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(30px); }
          }
          @keyframes bounce {
            0%, 100% { transform: translateX(-50%) translateY(0); }
            50% { transform: translateX(-50%) translateY(10px); }
          }
        `}</style>

        {/* Subtle animated background elements */}
        <div
          style={{
            position: 'absolute',
            top: '10%',
            right: '5%',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(196,168,130,0.05) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(80px)',
            animation: 'float 6s ease-in-out infinite',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '5%',
            left: '5%',
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle, rgba(196,168,130,0.04) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(80px)',
            animation: 'float 8s ease-in-out infinite reverse',
          }}
        />

        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: '900px', padding: '0 48px' }}>
          {/* Subtitle */}
          <p
            style={{
              fontSize: '11px',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#C4A882',
              marginBottom: '24px',
              fontWeight: 400,
            }}
          >
            Contemporary Fine Art
          </p>

          {/* Main Title */}
          <h1
            style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: 'clamp(64px, 10vw, 120px)',
              fontWeight: 300,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: '#F0EDE8',
              marginBottom: '12px',
            }}
          >
            Soul in Silence
          </h1>

          {/* Byline */}
          <p
            style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: '24px',
              fontWeight: 300,
              letterSpacing: '0.05em',
              color: '#8C8580',
              marginBottom: '48px',
            }}
          >
            by John Patrick Lachica
          </p>

          {/* Description */}
          <p
            style={{
              fontSize: '15px',
              lineHeight: 2,
              color: '#A8A8A8',
              maxWidth: '600px',
              margin: '0 auto 64px',
            }}
          >
            An art practice rooted in <span style={{ color: '#C4A882' }}>vulnerability</span>, <span style={{ color: '#C4A882' }}>resilience</span>, and the quiet terrain of human emotion. Exploring memory, symbolism, and the spaces where art speaks louder than words.
          </p>

          {/* CTA Buttons */}
          <div
            style={{
              display: 'flex',
              gap: '24px',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <PremiumButton href="/works" variant="primary">
              Explore Portfolio
            </PremiumButton>
            <PremiumButton href="#modules" variant="secondary">
              Explore More
            </PremiumButton>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            left: '50%',
            transform: 'translateX(-50%)',
            textAlign: 'center',
            animation: 'bounce 2s infinite',
          }}
        >
          <p style={{ fontSize: '11px', color: '#8C8580', letterSpacing: '0.1em', marginBottom: '12px' }}>
            SCROLL
          </p>
          <div style={{ fontSize: '20px', color: '#C4A882' }}>↓</div>
        </div>
      </section>

      {/* Brand Philosophy */}
      <section
        style={{
          padding: '96px 48px',
          borderBottom: '1px solid rgba(240,237,232,0.08)',
        }}
      >
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2
            style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: '48px',
              fontWeight: 300,
              color: '#F0EDE8',
              marginBottom: '60px',
              textAlign: 'center',
            }}
          >
            The Practice
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '48px',
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
              <div key={i}>
                <p
                  style={{
                    fontSize: '12px',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: '#C4A882',
                    marginBottom: '16px',
                    fontWeight: 500,
                  }}
                >
                  {item.label}
                </p>
                <p
                  style={{
                    fontSize: '14px',
                    lineHeight: 1.8,
                    color: '#A8A8A8',
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
          <h2
            style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: '48px',
              fontWeight: 300,
              color: '#F0EDE8',
              marginBottom: '60px',
              textAlign: 'center',
            }}
          >
            Explore Soul in Silence
          </h2>

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
                    <div style={{ fontSize: '36px', marginBottom: '16px' }}>{module.icon}</div>
                    <h3
                      style={{
                        fontSize: '18px',
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
                        marginBottom: '16px',
                      }}
                    >
                      {module.description}
                    </p>
                  </Link>
                )}
                {module.coming && (
                  <>
                    <div style={{ fontSize: '36px', marginBottom: '16px' }}>{module.icon}</div>
                    <h3
                      style={{
                        fontSize: '18px',
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
                        marginBottom: '16px',
                      }}
                    >
                      {module.description}
                    </p>
                    <p
                      style={{
                        fontSize: '11px',
                        letterSpacing: '0.08em',
                        color: '#666',
                        textTransform: 'uppercase',
                        fontWeight: 500,
                      }}
                    >
                      Coming Soon
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
