'use client'

import Link from 'next/link'

interface CTAButtonProps {
  href: string
  children: React.ReactNode
  style?: React.CSSProperties
}

export function CTAButton({ href, children, style }: CTAButtonProps) {
  return (
    <div
      onMouseEnter={(e) => {
        const el = e.currentTarget.querySelector('a') as HTMLElement
        if (el) {
          el.style.borderColor = '#C4A882'
          el.style.color = '#C4A882'
        }
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget.querySelector('a') as HTMLElement
        if (el) {
          el.style.borderColor = 'rgba(240,237,232,0.35)'
          el.style.color = '#F0EDE8'
        }
      }}
    >
      <Link href={href} style={style}>
        {children}
      </Link>
    </div>
  )
}

interface LinkButtonProps {
  href: string
  children: React.ReactNode
  style?: React.CSSProperties
}

export function LinkButton({ href, children, style }: LinkButtonProps) {
  return (
    <div
      onMouseEnter={(e) => {
        const link = e.currentTarget.querySelector('a') as HTMLElement
        if (link) link.style.color = '#C4A882'
      }}
      onMouseLeave={(e) => {
        const link = e.currentTarget.querySelector('a') as HTMLElement
        if (link) link.style.color = '#8C8580'
      }}
    >
      <Link href={href} style={style}>
        {children}
      </Link>
    </div>
  )
}
