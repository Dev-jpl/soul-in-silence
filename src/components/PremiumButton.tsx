'use client'

import Link from 'next/link'

interface PremiumButtonProps {
  href: string
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
}

export function PremiumButton({
  href,
  children,
  variant = 'primary',
}: PremiumButtonProps) {
  const isPrimary = variant === 'primary'

  return (
    <Link
      href={href}
      style={{
        display: 'inline-block',
        padding: '16px 40px',
        background: isPrimary ? '#C4A882' : 'transparent',
        color: isPrimary ? '#0a0a0a' : '#F0EDE8',
        border: isPrimary ? 'none' : '2px solid rgba(240,237,232,0.3)',
        textDecoration: 'none',
        fontSize: '12px',
        fontWeight: 600,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        transition: 'all 0.3s',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement
        if (isPrimary) {
          el.style.background = '#D4B892'
          el.style.transform = 'scale(1.05)'
        } else {
          el.style.borderColor = '#C4A882'
          el.style.color = '#C4A882'
        }
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement
        if (isPrimary) {
          el.style.background = '#C4A882'
          el.style.transform = 'scale(1)'
        } else {
          el.style.borderColor = 'rgba(240,237,232,0.3)'
          el.style.color = '#F0EDE8'
        }
      }}
    >
      {children}
    </Link>
  )
}
