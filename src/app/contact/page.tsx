import type { Metadata } from 'next'
import Image from 'next/image'
import PageTransition from '@/components/PageTransition'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with John Patrick Lachica — inquiries, acquisitions, and commissions for Soul in Silence.',
  alternates: { canonical: '/contact' },
}

const iconProps = {
  width: 22,
  height: 22,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.3,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

const icons: Record<string, React.ReactNode> = {
  email: (
    <svg {...iconProps}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  ),
  instagram: (
    <svg {...iconProps}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  ),
  facebook: (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.85c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.45 2.89h-2.33v6.99A10 10 0 0 0 22 12z" />
    </svg>
  ),
  phone: (
    <svg {...iconProps}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
}

const channels = [
  {
    icon: 'email',
    label: 'Email',
    value: 'soulinsilence@gmail.com',
    href: 'mailto:soulinsilence@gmail.com',
    external: false,
  },
  {
    icon: 'instagram',
    label: 'Instagram',
    value: '@soul.n.silence',
    href: 'https://www.instagram.com/soul.n.silence/',
    external: true,
  },
  {
    icon: 'facebook',
    label: 'Facebook',
    value: 'Soul in Silence',
    href: 'https://web.facebook.com/profile.php?id=61575343887300',
    external: true,
  },
  {
    icon: 'phone',
    label: 'Phone',
    value: '0912 345 6789',
    href: 'tel:+639123456789',
    external: false,
  },
]

export default function ContactPage() {
  return (
    <PageTransition>
      {/* BANNER */}
      <div className="contact-banner" style={{ position: 'relative', width: '100%', height: '380px', overflow: 'hidden' }}>
        <Image
          src="/images/contact-banner.webp"
          alt="Soul in Silence"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center center' }}
        />
        {/* Gradient overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to right, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.4) 50%, rgba(10,10,10,0.7) 100%)',
          }}
        />
        {/* Bottom-left text, aligned to the page container */}
        <div className="pad-x" style={{ position: 'absolute', left: 0, right: 0, bottom: '48px', zIndex: 1, padding: '0 48px' }}>
          <div style={{ maxWidth: '1320px', margin: '0 auto' }}>
            <p
              style={{
                fontSize: '10px',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: '#C4A882',
                marginBottom: '12px',
              }}
            >
              Get in Touch
            </p>
            <h1
              style={{
                fontFamily: 'var(--font-cormorant), Georgia, serif',
                fontSize: 'clamp(32px, 4vw, 48px)',
                fontWeight: 300,
                fontStyle: 'italic',
                color: '#F0EDE8',
                margin: 0,
              }}
            >
              Every silence deserves a response.
            </h1>
          </div>
        </div>
      </div>

      {/* CONTACT CHANNELS — ghost watermark behind */}
      <section style={{ position: 'relative', overflow: 'hidden' }}>
        <span
          aria-hidden
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 0,
            fontFamily: 'var(--font-cormorant), Georgia, serif',
            fontWeight: 300,
            fontSize: 'clamp(120px, 20vw, 240px)',
            lineHeight: 1,
            color: 'rgba(240,237,232,0.04)',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          Silence
        </span>

        <div
          className="pad-x stack-mobile contact-grid"
          style={{
            position: 'relative',
            zIndex: 1,
            maxWidth: '1320px',
            margin: '0 auto',
            padding: '64px 48px 120px',
            minHeight: '50vh',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '72px',
            alignItems: 'start',
          }}
        >
          {/* Left — contact channels */}
          <div>
            {channels.map(({ icon, label, value, href, external }) => (
              <a
                key={label}
                href={href}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="contact-channel"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '24px',
                  padding: '24px 0',
                  borderTop: '1px solid rgba(240,237,232,0.08)',
                  textDecoration: 'none',
                  color: '#F0EDE8',
                  transition: 'color 0.2s',
                }}
              >
                <span
                  aria-hidden
                  style={{
                    flex: '0 0 44px',
                    height: '44px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid rgba(240,237,232,0.15)',
                    borderRadius: '50%',
                    color: '#C4A882',
                  }}
                >
                  {icons[icon]}
                </span>
                <span>
                  <span
                    style={{
                      display: 'block',
                      fontSize: '10px',
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                      color: '#C4A882',
                      marginBottom: '6px',
                    }}
                  >
                    {label}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-cormorant), Georgia, serif',
                      fontSize: '20px',
                      fontWeight: 300,
                    }}
                  >
                    {value}
                  </span>
                </span>
              </a>
            ))}
          </div>

          {/* Right — carded form */}
          <ContactForm />
        </div>
      </section>
    </PageTransition>
  )
}
