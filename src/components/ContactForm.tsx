'use client'

import { useState } from 'react'

const inputStyle: React.CSSProperties = {
  background: 'transparent',
  border: 'none',
  borderBottom: '1px solid rgba(240,237,232,0.18)',
  borderRadius: 0,
  color: '#F0EDE8',
  fontFamily: 'var(--font-inter), sans-serif',
  fontSize: '14px',
  fontWeight: 300,
  padding: '12px 0',
  outline: 'none',
  width: '100%',
  transition: 'border-color 0.2s',
}

const inquiryOptions = [
  'Acquisition',
  'Commission',
  'Exhibition',
  'Press',
  'Collaboration',
  'Other',
]

export default function ContactForm() {
  const [focused, setFocused] = useState<string | null>(null)
  const [selected, setSelected] = useState<string[]>([])

  const toggle = (option: string) =>
    setSelected((prev) =>
      prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]
    )

  return (
    <div
      className="contact-card"
      style={{
        background:
          'linear-gradient(135deg, rgba(28,25,21,0.92) 0%, rgba(17,17,17,0.92) 100%)',
        border: '1px solid rgba(196,168,130,0.18)',
        padding: '48px',
      }}
    >
      <h2
        style={{
          fontFamily: 'var(--font-cormorant), Georgia, serif',
          fontSize: 'clamp(28px, 3vw, 38px)',
          fontWeight: 300,
          lineHeight: 1.15,
          color: '#F0EDE8',
          marginBottom: '14px',
        }}
      >
        Have something in mind?
      </h2>
      <p
        style={{
          fontSize: '14px',
          lineHeight: 1.7,
          color: '#8C8580',
          marginBottom: '40px',
          maxWidth: '420px',
        }}
      >
        Tell me a little about yourself and what you&rsquo;re imagining — a piece, a
        commission, or simply a conversation.
      </p>

      <form
        style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}
        onSubmit={(e) => e.preventDefault()}
      >
        {[
          { id: 'name', label: 'Your name', type: 'text', placeholder: 'Your name' },
          { id: 'email', label: 'Email', type: 'email', placeholder: 'you@email.com' },
          { id: 'message', label: 'Tell me a little about it', type: 'text', placeholder: 'A few words…' },
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

        {/* Inquiry type */}
        <div>
          <p
            style={{
              fontSize: '10px',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: '#8C8580',
              marginBottom: '18px',
            }}
          >
            How can I help?
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '14px 24px',
            }}
          >
            {inquiryOptions.map((option) => {
              const checked = selected.includes(option)
              return (
                <label
                  key={option}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    cursor: 'pointer',
                    fontSize: '13px',
                    color: checked ? '#F0EDE8' : '#8C8580',
                    transition: 'color 0.2s',
                  }}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggle(option)}
                    style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
                  />
                  <span
                    aria-hidden
                    style={{
                      flex: '0 0 18px',
                      width: '18px',
                      height: '18px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: `1px solid ${checked ? '#C4A882' : 'rgba(240,237,232,0.25)'}`,
                      background: checked ? '#C4A882' : 'transparent',
                      transition: 'all 0.2s',
                    }}
                  >
                    {checked && (
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#0A0A0A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    )}
                  </span>
                  {option}
                </label>
              )
            })}
          </div>
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
            padding: '18px 36px',
            marginTop: '12px',
            cursor: 'pointer',
            fontFamily: 'var(--font-inter), sans-serif',
            transition: 'background 0.2s',
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = '#C4A882')}
          onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = '#F0EDE8')}
        >
          Send Inquiry
        </button>
      </form>
    </div>
  )
}
