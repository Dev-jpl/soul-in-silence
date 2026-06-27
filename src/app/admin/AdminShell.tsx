'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ADMIN_PASSWORD, AUTH_KEY, inputStyle, primaryBtn } from './ui'

const navItems = [
  { href: '/admin', label: 'Analytics' },
  { href: '/admin/artworks', label: 'Artworks' },
]

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isAuth, setIsAuth] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem(AUTH_KEY)) setIsAuth(true)
    setMounted(true)
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setIsAuth(true)
      sessionStorage.setItem(AUTH_KEY, 'true')
      setError('')
    } else {
      setError('Incorrect password')
      setPassword('')
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem(AUTH_KEY)
    window.location.reload()
  }

  if (!mounted) return null

  if (!isAuth) {
    return (
      <div
        style={{
          minHeight: '100vh',
          background: '#0a0a0a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: '400px',
            padding: '48px 32px',
            background: '#111111',
            border: '1px solid rgba(240,237,232,0.08)',
          }}
        >
          <h1 style={{ fontSize: '24px', color: '#F0EDE8', marginBottom: '8px', fontWeight: 400, letterSpacing: '0.02em' }}>
            Admin Access
          </h1>
          <p style={{ fontSize: '13px', color: '#8C8580', marginBottom: '32px' }}>
            Soul in Silence • Management
          </p>
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={inputStyle}
              />
              {error && <p style={{ color: '#ff6b6b', fontSize: '12px', marginTop: '8px' }}>{error}</p>}
            </div>
            <button type="submit" style={primaryBtn}>
              Access Admin
            </button>
          </form>
        </div>
      </div>
    )
  }

  const isActive = (href: string) => (href === '/admin' ? pathname === '/admin' : pathname.startsWith(href))

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', fontFamily: 'Inter, sans-serif', color: '#F0EDE8' }}>
      <div
        className="admin-header"
        style={{
          borderBottom: '1px solid rgba(240,237,232,0.08)',
          padding: '24px 48px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h1 style={{ margin: 0, fontSize: '18px', fontWeight: 400 }}>Soul in Silence • Admin</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link
            href="/"
            style={{
              padding: '8px 16px',
              background: 'transparent',
              border: '1px solid rgba(240,237,232,0.2)',
              color: '#F0EDE8',
              fontSize: '12px',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              textDecoration: 'none',
            }}
          >
            View Site
          </Link>
          <button
            onClick={handleLogout}
            style={{
              padding: '8px 16px',
              background: 'transparent',
              border: '1px solid rgba(240,237,232,0.2)',
              color: '#F0EDE8',
              fontSize: '12px',
              cursor: 'pointer',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}
          >
            Logout
          </button>
        </div>
      </div>

      <div className="admin-body" style={{ display: 'flex' }}>
        <div className="admin-sidebar" style={{ width: '200px', borderRight: '1px solid rgba(240,237,232,0.08)', padding: '32px 0' }}>
          <nav className="admin-nav" style={{ display: 'flex', flexDirection: 'column' }}>
            {navItems.map((item) => {
              const active = isActive(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    padding: '12px 24px',
                    background: active ? 'rgba(196,168,130,0.1)' : 'transparent',
                    color: active ? '#C4A882' : '#8C8580',
                    fontSize: '13px',
                    textDecoration: 'none',
                    transition: 'all 0.2s',
                    borderLeft: active ? '2px solid #C4A882' : '2px solid transparent',
                  }}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </div>

        <div className="admin-content" style={{ flex: 1, padding: '48px', minWidth: 0 }}>
          {children}
        </div>
      </div>
    </div>
  )
}
