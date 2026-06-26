'use client'

import { useState } from 'react'

const inputStyle: React.CSSProperties = {
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

const labelStyle: React.CSSProperties = {
  fontSize: '10px',
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  color: '#8C8580',
}

export default function ContactForm() {
  const [focused, setFocused] = useState<string | null>(null)

  return (
    <div
      style={{
        background: '#111111',
        border: '1px solid rgba(240,237,232,0.08)',
        padding: '40px',
      }}
    >
      <p
        style={{
          fontSize: '10px',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: '#C4A882',
          marginBottom: '32px',
        }}
      >
        Send a Message
      </p>

      <form
        style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}
        onSubmit={(e) => e.preventDefault()}
      >
        {[
          { id: 'name', label: 'Name', type: 'text', placeholder: 'Your name' },
          { id: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com' },
        ].map(({ id, label, type, placeholder }) => (
          <div key={id} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label htmlFor={id} style={labelStyle}>
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
          <label htmlFor="message" style={labelStyle}>
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
  )
}
