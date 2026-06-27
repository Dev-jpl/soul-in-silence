'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/works', label: 'Works' },
  { href: '/about', label: 'About' },
  { href: '/statement', label: 'Statement' },
  { href: '/exhibitions', label: 'Exhibitions' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  // Close the mobile menu whenever the route changes
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // Show the Admin link only when authenticated (re-checked on route change)
  useEffect(() => {
    setIsAdmin(!!sessionStorage.getItem('admin_auth'))
  }, [pathname])

  const links = isAdmin ? [...navLinks, { href: '/admin', label: 'Admin' }] : navLinks

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const isActiveHref = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  // No site navbar inside the admin
  if (pathname?.startsWith('/admin')) return null

  return (
    <nav className={pathname === '/' ? 'site-nav site-nav--home' : 'site-nav'}>
      <div className="site-nav__inner">
      <Link href="/" className="site-nav__brand">
        <Image
          src="/images/logos/logo.png"
          alt="Soul in Silence owl mark"
          width={36}
          height={36}
          priority
          style={{ display: 'block' }}
        />
        Soul in Silence
      </Link>

      {/* Desktop links */}
      <ul className="site-nav__links">
        {links.map(({ href, label }) => {
          const isActive = isActiveHref(href)
          return (
            <li key={href} className="site-nav__item">
              <Link
                href={href}
                className={isActive ? 'site-nav__link is-active' : 'site-nav__link'}
              >
                {label}
              </Link>
            </li>
          )
        })}
      </ul>

      {/* Mobile hamburger */}
      <button
        type="button"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        className="site-nav__toggle"
        onClick={() => setOpen((v) => !v)}
      >
        <span className={open ? 'site-nav__bar is-open-top' : 'site-nav__bar'} />
        <span className={open ? 'site-nav__bar is-open-mid' : 'site-nav__bar'} />
        <span className={open ? 'site-nav__bar is-open-bot' : 'site-nav__bar'} />
      </button>
      </div>

      {/* Mobile menu overlay */}
      <div className={open ? 'site-nav__menu is-open' : 'site-nav__menu'}>
        <ul>
          {links.map(({ href, label }) => {
            const isActive = isActiveHref(href)
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={
                    isActive ? 'site-nav__mobile-link is-active' : 'site-nav__mobile-link'
                  }
                >
                  {label}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}
