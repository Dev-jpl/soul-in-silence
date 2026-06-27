import type { Artwork } from '@/lib/worksStore'

export const ADMIN_PASSWORD = 'SnS2025'
export const AUTH_KEY = 'admin_auth'

export const emptyForm: Artwork = {
  slug: '',
  title: '',
  year: new Date().getFullYear(),
  medium: '',
  dimensions: '',
  category: 'painting',
  description: '',
  image: '',
  featured: false,
}

export const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 16px',
  background: '#0a0a0a',
  border: '1px solid rgba(240,237,232,0.15)',
  color: '#F0EDE8',
  fontSize: '14px',
  fontFamily: 'inherit',
  boxSizing: 'border-box',
}

export const modalInput: React.CSSProperties = {
  width: '100%',
  padding: '8px 12px',
  background: '#0a0a0a',
  border: '1px solid rgba(240,237,232,0.15)',
  color: '#F0EDE8',
  fontSize: '13px',
  fontFamily: 'inherit',
  boxSizing: 'border-box',
}

export const primaryBtn: React.CSSProperties = {
  padding: '12px 24px',
  background: '#C4A882',
  color: '#0a0a0a',
  border: 'none',
  fontSize: '13px',
  fontWeight: 500,
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  cursor: 'pointer',
}

export const ghostBtn: React.CSSProperties = {
  padding: '12px 24px',
  background: 'transparent',
  color: '#8C8580',
  border: '1px solid rgba(240,237,232,0.15)',
  fontSize: '13px',
  fontWeight: 500,
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  cursor: 'pointer',
}

export const editBtn: React.CSSProperties = {
  padding: '4px 12px',
  background: 'transparent',
  border: '1px solid rgba(196,168,130,0.3)',
  color: '#C4A882',
  fontSize: '11px',
  cursor: 'pointer',
}

export const deleteBtn: React.CSSProperties = {
  padding: '4px 12px',
  background: 'transparent',
  border: '1px solid rgba(255,107,107,0.3)',
  color: '#ff6b6b',
  fontSize: '11px',
  cursor: 'pointer',
}

export function Card({ title, value }: { title: string; value: string }) {
  return (
    <div style={{ padding: '24px', background: '#111111', border: '1px solid rgba(240,237,232,0.08)' }}>
      <p style={{ margin: '0 0 12px 0', fontSize: '12px', color: '#8C8580', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 500 }}>
        {title}
      </p>
      <p style={{ margin: 0, fontSize: '32px', color: '#C4A882', fontWeight: 400 }}>{value}</p>
    </div>
  )
}

export function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label
        style={{
          display: 'block',
          fontSize: '12px',
          color: '#C4A882',
          marginBottom: '6px',
          textTransform: 'uppercase',
          fontWeight: 500,
        }}
      >
        {label}
      </label>
      {children}
    </div>
  )
}
