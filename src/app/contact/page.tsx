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
  location: (
    <svg {...iconProps}>
      <path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
}

type ContactItemData = {
  icon: string
  title: string
  value: string
  href?: string
}

const information: ContactItemData[] = [
  {
    icon: 'email',
    title: 'Email me in',
    value: 'soulinsilence@gmail.com',
    href: 'mailto:soulinsilence@gmail.com',
  },
  {
    icon: 'location',
    title: 'Based in',
    value: 'Manila, Philippines',
  },
  {
    icon: 'phone',
    title: 'Call me at',
    value: '0912 345 6789',
    href: 'tel:+639123456789',
  },
]

const socialLinks: ContactItemData[] = [
  {
    icon: 'instagram',
    title: 'Instagram',
    value: '@soul.n.silence',
    href: 'https://www.instagram.com/soul.n.silence/',
  },
  {
    icon: 'facebook',
    title: 'Facebook',
    value: 'Soul in Silence',
    href: 'https://web.facebook.com/profile.php?id=61575343887300',
  },
]

function ContactItem({ icon, title, value, href }: ContactItemData) {
  return (
    <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
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
          marginTop: '2px',
        }}
      >
        {icons[icon]}
      </span>
      <div>
        <p
          style={{
            fontFamily: 'var(--font-cormorant), Georgia, serif',
            fontSize: '20px',
            fontWeight: 400,
            color: '#F0EDE8',
            marginBottom: '8px',
          }}
        >
          {title}
        </p>
        {href ? (
          <a
            href={href}
            {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="contact-channel"
            style={{ fontSize: '15px', color: '#C4A882', textDecoration: 'none' }}
          >
            {value}
          </a>
        ) : (
          <p style={{ fontSize: '15px', color: '#F0EDE8' }}>{value}</p>
        )}
      </div>
    </div>
  )
}

const groupLabelStyle: React.CSSProperties = {
  fontSize: '10px',
  letterSpacing: '0.22em',
  textTransform: 'uppercase',
  color: '#C4A882',
  marginBottom: '28px',
}

export default function ContactPage() {
  return (
    <PageTransition>
      {/* BANNER — contained to the page width */}
      <div className="pad-x" style={{ maxWidth: '1320px', margin: '0 auto', padding: '48px 48px 0' }}>
        <div className="contact-banner" style={{ position: 'relative', width: '100%', height: '260px', overflow: 'hidden' }}>
          <Image
            src="/images/contact-banner.webp"
            alt="Soul in Silence"
            fill
            priority
            sizes="(max-width: 1320px) 100vw, 1320px"
            style={{ objectFit: 'cover', objectPosition: 'center bottom' }}
          />
          {/* Edge fades — strong dark on all sides easing to a clearer center */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(to right, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0) 35%, rgba(10,10,10,0) 65%, rgba(10,10,10,0.95) 100%), linear-gradient(to bottom, rgba(10,10,10,0.9) 0%, rgba(10,10,10,0) 45%, rgba(10,10,10,0) 55%, rgba(10,10,10,0.9) 100%)',
            }}
          />
          {/* Bottom-left text */}
          <div style={{ position: 'absolute', left: '40px', bottom: '40px', zIndex: 1 }}>
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
                fontSize: 'clamp(28px, 3.5vw, 40px)',
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

      {/* CONTACT CHANNELS + FORM */}
      <section style={{ position: 'relative' }}>
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
          {/* Left — Information + Socials */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
            <div>
              <p style={groupLabelStyle}>Contact Information</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                {information.map((item) => (
                  <ContactItem key={item.title} {...item} />
                ))}
              </div>
            </div>

            <div style={{ borderTop: '1px solid rgba(240,237,232,0.08)', paddingTop: '48px' }}>
              <p style={groupLabelStyle}>Socials</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                {socialLinks.map((item) => (
                  <ContactItem key={item.title} {...item} />
                ))}
              </div>
            </div>
          </div>

          {/* Right — carded form, floating over the banner */}
          <div className="contact-form-float">
            <ContactForm />
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
