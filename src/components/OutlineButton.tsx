'use client'

import Link from 'next/link'

interface OutlineButtonProps {
  href: string
  children: React.ReactNode
}

export function OutlineButton({ href, children }: OutlineButtonProps) {
  return (
    <Link
      href={href}
      style={{
        display: 'inline-block',
        fontSize: '10px',
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: '#F0EDE8',
        border: '1px solid rgba(240,237,232,0.35)',
        padding: '16px 40px',
        textDecoration: 'none',
        transition: 'all 0.3s',
      }}
      onMouseEnter={(e) => {
        ;(e.target as HTMLElement).style.borderColor = '#C4A882'
        ;(e.target as HTMLElement).style.color = '#C4A882'
      }}
      onMouseLeave={(e) => {
        ;(e.target as HTMLElement).style.borderColor = 'rgba(240,237,232,0.35)'
        ;(e.target as HTMLElement).style.color = '#F0EDE8'
      }}
    >
      {children}
    </Link>
  )
}
