'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/works', label: 'Works' },
  { href: '/about', label: 'About' },
  { href: '/statement', label: 'Statement' },
  { href: '/cv', label: 'CV' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'rgba(10,10,10,0.92)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(240,237,232,0.08)',
        padding: '0 48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '64px',
      }}
    >
      <Link
        href="/"
        style={{
          fontFamily: 'var(--font-cormorant), Georgia, serif',
          fontWeight: 300,
          fontSize: '15px',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: '#F0EDE8',
          textDecoration: 'none',
        }}
      >
        Soul in Silence
      </Link>

      <ul style={{ display: 'flex', gap: '36px', listStyle: 'none' }}>
        {navLinks.map(({ href, label }) => {
          const isActive =
            href === '/' ? pathname === '/' : pathname.startsWith(href)
          return (
            <li
              key={href}
              style={{
                fontSize: '11px',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
              }}
              onMouseEnter={(e) => {
                const link = e.currentTarget.querySelector('a') as HTMLElement
                if (link) link.style.color = '#F0EDE8'
              }}
              onMouseLeave={(e) => {
                const link = e.currentTarget.querySelector('a') as HTMLElement
                if (link)
                  link.style.color = isActive ? '#F0EDE8' : '#8C8580'
              }}
            >
              <Link
                href={href}
                style={{
                  color: isActive ? '#F0EDE8' : '#8C8580',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                  display: 'block',
                }}
              >
                {label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
