'use client'

import { useState } from 'react'
import PageTransition from '@/components/PageTransition'

const inputStyle = {
  background: 'transparent',
  border: 'none',
  borderBottom: '1px solid rgba(240,237,232,0.18)',
  borderRadius: 0,
  color: '#F0EDE8',
  fontFamily: 'var(--font-inter), sans-serif',
  fontSize: '13px',
  fontWeight: 300,
  padding: '10px 0',
  outline: 'none',
  width: '100%',
  transition: 'border-color 0.2s',
}

const contactDetails = [
  { label: 'Email', value: 'soulinsilence@gmail.com', href: 'mailto:soulinsilence@gmail.com' },
  {
    label: 'Instagram',
    value: '@soul.n.silence',
    href: 'https://www.instagram.com/soul.n.silence/',
  },
  { label: 'Based in', value: 'Manila, Philippines' },
]

const bottomStrip = [
  { label: 'Email', value: 'soulinsilence@gmail.com' },
  { label: 'Instagram', value: '@soul.n.silence' },
  { label: 'Location', value: 'Manila, Philippines' },
]

export default function ContactPage() {
  const [focused, setFocused] = useState<string | null>(null)

  return (
    <PageTransition>
      {/* SECTION 1 + 2 — ghost watermark behind the two-column content */}
      <section style={{ position: 'relative', overflow: 'hidden' }}>
        {/* Ghost watermark */}
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

        {/* Two-column grid */}
        <div
          className="pad-x stack-mobile contact-grid"
          style={{
            position: 'relative',
            zIndex: 1,
            maxWidth: '1320px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '72px',
            padding: '120px 48px',
            minHeight: '60vh',
            alignItems: 'start',
          }}
        >
          {/* Left — contact info */}
          <div>
            <p
              style={{
                fontSize: '10px',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: '#C4A882',
                marginBottom: '28px',
              }}
            >
              Get in Touch
            </p>
            <h1
              style={{
                fontFamily: 'var(--font-cormorant), Georgia, serif',
                fontSize: '42px',
                fontWeight: 300,
                lineHeight: 1.15,
                color: '#F0EDE8',
                marginBottom: '48px',
              }}
            >
              Every silence
              <br />
              deserves
              <br />
              a response.
            </h1>

            {contactDetails.map(({ label, value, href }) => {
              const valueStyle = {
                fontFamily: 'var(--font-cormorant), Georgia, serif',
                fontSize: '18px',
                fontWeight: 300,
                color: '#F0EDE8',
                textDecoration: 'none',
                transition: 'color 0.2s',
              } as const
              return (
                <div
                  key={label}
                  style={{
                    borderTop: '1px solid rgba(240,237,232,0.08)',
                    padding: '20px 0',
                  }}
                >
                  <p
                    style={{
                      fontSize: '10px',
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                      color: '#C4A882',
                      marginBottom: '8px',
                    }}
                  >
                    {label}
                  </p>
                  {href ? (
                    <a
                      href={href}
                      {...(href.startsWith('http')
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : {})}
                      style={valueStyle}
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#C4A882')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = '#F0EDE8')}
                    >
                      {value}
                    </a>
                  ) : (
                    <p style={valueStyle}>{value}</p>
                  )}
                </div>
              )
            })}
          </div>

          {/* Right — form */}
          <form
            style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}
            onSubmit={(e) => e.preventDefault()}
          >
            {[
              { id: 'name', label: 'Name', type: 'text', placeholder: 'Your name' },
              { id: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com' },
            ].map(({ id, label, type, placeholder }) => (
              <div key={id} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label
                  htmlFor={id}
                  style={{
                    fontSize: '10px',
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    color: '#8C8580',
                  }}
                >
                  {label}
                </label>
                <input
                  id={id}
                  type={type}
                  placeholder={placeholder}
                  style={{
                    ...inputStyle,
                    borderBottomColor: focused === id ? '#C4A882' : 'rgba(240,237,232,0.18)',
                  }}
                  onFocus={() => setFocused(id)}
                  onBlur={() => setFocused(null)}
                />
              </div>
            ))}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label
                htmlFor="message"
                style={{
                  fontSize: '10px',
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: '#8C8580',
                }}
              >
                Message
              </label>
              <textarea
                id="message"
                rows={6}
                placeholder="Tell me about your interest…"
                style={{
                  ...inputStyle,
                  resize: 'none',
                  borderBottomColor: focused === 'message' ? '#C4A882' : 'rgba(240,237,232,0.18)',
                }}
                onFocus={() => setFocused('message')}
                onBlur={() => setFocused(null)}
              />
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                fontSize: '10px',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#0A0A0A',
                background: '#F0EDE8',
                border: 'none',
                borderRadius: 0,
                padding: '16px 36px',
                marginTop: '8px',
                cursor: 'pointer',
                fontFamily: 'var(--font-inter), sans-serif',
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = '#C4A882')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = '#F0EDE8')}
            >
              Send
            </button>
          </form>
        </div>
      </section>

      {/* SECTION 3 — bottom strip */}
      <div
        className="about-details"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          borderTop: '1px solid rgba(240,237,232,0.08)',
          background: 'rgba(240,237,232,0.03)',
        }}
      >
        {bottomStrip.map(({ label, value }, i) => (
          <div
            key={label}
            style={{
              padding: '40px',
              borderRight: i < 2 ? '1px solid rgba(240,237,232,0.08)' : undefined,
            }}
          >
            <p
              style={{
                fontSize: '10px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#C4A882',
                marginBottom: '12px',
              }}
            >
              {label}
            </p>
            <p
              style={{
                fontFamily: 'var(--font-cormorant), Georgia, serif',
                fontSize: '18px',
                fontWeight: 300,
                color: '#F0EDE8',
              }}
            >
              {value}
            </p>
          </div>
        ))}
      </div>
    </PageTransition>
  )
}
