'use client'

import { useState } from 'react'
import PageHeader from '@/components/PageHeader'
import PageTransition from '@/components/PageTransition'

const inputStyle = {
  background: 'transparent',
  border: 'none',
  borderBottom: '1px solid rgba(240,237,232,0.18)',
  color: '#F0EDE8',
  fontFamily: 'var(--font-inter), sans-serif',
  fontSize: '13px',
  fontWeight: 300,
  padding: '10px 0',
  outline: 'none',
  width: '100%',
  transition: 'border-color 0.2s',
}

export default function ContactPage() {
  const [focused, setFocused] = useState<string | null>(null)

  return (
    <PageTransition>
      <PageHeader
        title="Contact"
        eyebrow="Get in Touch"
        description="Inquiries, commissions, collaborations, and press."
      />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '96px',
          padding: '80px 48px 120px',
          minHeight: '60vh',
        }}
      >
        {/* Left: contact info */}
        <div>
          <h2
            style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: '36px',
              fontWeight: 300,
              lineHeight: 1.3,
              color: '#F0EDE8',
              marginBottom: '28px',
            }}
          >
            Inquiries,<br />Commissions &<br />Collaborations
          </h2>
          <p
            style={{
              fontSize: '13px',
              color: '#8C8580',
              lineHeight: 2.0,
              marginBottom: '48px',
              maxWidth: '360px',
            }}
          >
            Whether you are a collector, curator, gallery, or simply someone moved by the work — I welcome your correspondence.
          </p>

          {[
            { label: 'Email', value: 'hello@soulinsilence.art' },
            { label: 'Based in', value: 'Manila, Philippines' },
            { label: 'Instagram', value: '@soulinsilence' },
          ].map(({ label, value }) => (
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
              <p
                style={{
                  fontFamily: 'var(--font-cormorant), Georgia, serif',
                  fontSize: '20px',
                  fontWeight: 300,
                  color: '#F0EDE8',
                }}
              >
                {value}
              </p>
            </div>
          ))}
          <div style={{ borderTop: '1px solid rgba(240,237,232,0.08)' }} />
        </div>

        {/* Right: form */}
        <form
          style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}
          onSubmit={(e) => e.preventDefault()}
        >
          {[
            { id: 'name', label: 'Name', type: 'text', placeholder: 'Your name' },
            { id: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com' },
            { id: 'subject', label: 'Subject', type: 'text', placeholder: 'Commission · Acquisition · Press · Other' },
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
                  borderBottomColor:
                    focused === id ? '#C4A882' : 'rgba(240,237,232,0.18)',
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
              rows={5}
              placeholder="Tell me about your interest…"
              style={{
                ...inputStyle,
                resize: 'none',
                borderBottomColor:
                  focused === 'message' ? '#C4A882' : 'rgba(240,237,232,0.18)',
              }}
              onFocus={() => setFocused('message')}
              onBlur={() => setFocused(null)}
            />
          </div>

          <div style={{ marginTop: '8px' }}>
            <button
              type="submit"
              style={{
                fontSize: '10px',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#0A0A0A',
                background: '#F0EDE8',
                border: 'none',
                padding: '14px 36px',
                cursor: 'pointer',
                fontFamily: 'var(--font-inter), sans-serif',
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.background = '#C4A882')
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.background = '#F0EDE8')
              }
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </PageTransition>
  )
}
