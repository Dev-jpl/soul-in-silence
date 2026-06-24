'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function AdminDashboard() {
  const [isAuth, setIsAuth] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Simple password check - in production, use proper auth
    if (password === 'silencearts') {
      setIsAuth(true)
      localStorage.setItem('admin_auth', 'true')
      setError('')
    } else {
      setError('Incorrect password')
      setPassword('')
    }
  }

  // Check if already authenticated
  if (typeof window !== 'undefined' && !isAuth && localStorage.getItem('admin_auth')) {
    return <AdminNav />
  }

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
          <h1
            style={{
              fontSize: '24px',
              color: '#F0EDE8',
              marginBottom: '8px',
              fontWeight: 400,
              letterSpacing: '0.02em',
            }}
          >
            Admin Access
          </h1>
          <p
            style={{
              fontSize: '13px',
              color: '#8C8580',
              marginBottom: '32px',
            }}
          >
            Soul in Silence • Artworks Management
          </p>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  background: '#0a0a0a',
                  border: '1px solid rgba(240,237,232,0.15)',
                  color: '#F0EDE8',
                  fontSize: '14px',
                  fontFamily: 'inherit',
                  boxSizing: 'border-box',
                }}
              />
              {error && (
                <p style={{ color: '#ff6b6b', fontSize: '12px', marginTop: '8px' }}>
                  {error}
                </p>
              )}
            </div>
            <button
              type="submit"
              style={{
                padding: '12px 16px',
                background: '#C4A882',
                color: '#0a0a0a',
                border: 'none',
                fontSize: '13px',
                fontWeight: 500,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.opacity = '0.85')}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.opacity = '1')}
            >
              Access Admin
            </button>
          </form>
        </div>
      </div>
    )
  }

  return <AdminNav />
}

function AdminNav() {
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'artworks' | 'artist' | 'exhibits'>(
    'dashboard'
  )

  const handleLogout = () => {
    localStorage.removeItem('admin_auth')
    window.location.reload()
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0a0a0a',
        fontFamily: 'Inter, sans-serif',
        color: '#F0EDE8',
      }}
    >
      {/* Header */}
      <div
        style={{
          borderBottom: '1px solid rgba(240,237,232,0.08)',
          padding: '24px 48px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h1 style={{ margin: 0, fontSize: '18px', fontWeight: 400 }}>
          Soul in Silence • Admin
        </h1>
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

      <div style={{ display: 'flex' }}>
        {/* Sidebar */}
        <div
          style={{
            width: '200px',
            borderRight: '1px solid rgba(240,237,232,0.08)',
            padding: '32px 0',
          }}
        >
          <nav style={{ display: 'flex', flexDirection: 'column' }}>
            {[
              { id: 'dashboard' as const, label: 'Dashboard' },
              { id: 'artworks' as const, label: 'Artworks' },
              { id: 'artist' as const, label: 'Artist Info' },
              { id: 'exhibits' as const, label: 'Exhibits' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                style={{
                  padding: '12px 24px',
                  background: currentPage === item.id ? 'rgba(196,168,130,0.1)' : 'transparent',
                  border: 'none',
                  color:
                    currentPage === item.id
                      ? '#C4A882'
                      : currentPage === item.id
                        ? '#C4A882'
                        : '#8C8580',
                  fontSize: '13px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  borderLeft:
                    currentPage === item.id ? '2px solid #C4A882' : '2px solid transparent',
                }}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div style={{ flex: 1, padding: '48px' }}>
          {currentPage === 'dashboard' && <DashboardPage />}
          {currentPage === 'artworks' && <ArtworksPage />}
          {currentPage === 'artist' && <ArtistPage />}
          {currentPage === 'exhibits' && <ExhibitsPage />}
        </div>
      </div>
    </div>
  )
}

function DashboardPage() {
  return (
    <div>
      <h2 style={{ fontSize: '28px', marginBottom: '32px', fontWeight: 400 }}>Dashboard</h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '24px',
        }}
      >
        <Card title="Total Artworks" value="13" />
        <Card title="Featured Works" value="3" />
        <Card title="Last Updated" value="Today" />
      </div>
    </div>
  )
}

function ArtworksPage() {
  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '28px', marginBottom: '8px', fontWeight: 400 }}>
          Manage Artworks
        </h2>
        <p style={{ color: '#8C8580', margin: 0 }}>Add, edit, or delete your artwork entries</p>
      </div>

      <button
        style={{
          padding: '12px 24px',
          background: '#C4A882',
          color: '#0a0a0a',
          border: 'none',
          fontSize: '13px',
          fontWeight: 500,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          cursor: 'pointer',
          marginBottom: '32px',
        }}
      >
        + Add New Artwork
      </button>

      <div
        style={{
          border: '1px solid rgba(240,237,232,0.08)',
          borderRadius: '4px',
          overflow: 'hidden',
        }}
      >
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '13px',
          }}
        >
          <thead>
            <tr
              style={{
                background: 'rgba(240,237,232,0.02)',
                borderBottom: '1px solid rgba(240,237,232,0.08)',
              }}
            >
              <th
                style={{
                  padding: '16px',
                  textAlign: 'left',
                  fontWeight: 500,
                  color: '#C4A882',
                }}
              >
                Title
              </th>
              <th
                style={{
                  padding: '16px',
                  textAlign: 'left',
                  fontWeight: 500,
                  color: '#C4A882',
                }}
              >
                Year
              </th>
              <th
                style={{
                  padding: '16px',
                  textAlign: 'left',
                  fontWeight: 500,
                  color: '#C4A882',
                }}
              >
                Category
              </th>
              <th
                style={{
                  padding: '16px',
                  textAlign: 'center',
                  fontWeight: 500,
                  color: '#C4A882',
                }}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              { title: 'Untitled Series I', year: 2024, category: 'painting' },
              { title: 'Untitled Series II', year: 2024, category: 'painting' },
              { title: 'Untitled Series III', year: 2024, category: 'painting' },
            ].map((artwork, idx) => (
              <tr
                key={idx}
                style={{
                  borderBottom: '1px solid rgba(240,237,232,0.08)',
                }}
              >
                <td style={{ padding: '16px', color: '#F0EDE8' }}>{artwork.title}</td>
                <td style={{ padding: '16px', color: '#8C8580' }}>{artwork.year}</td>
                <td style={{ padding: '16px', color: '#8C8580' }}>
                  <span
                    style={{
                      padding: '4px 12px',
                      background: 'rgba(196,168,130,0.1)',
                      borderRadius: '2px',
                      fontSize: '11px',
                      textTransform: 'capitalize',
                    }}
                  >
                    {artwork.category}
                  </span>
                </td>
                <td
                  style={{
                    padding: '16px',
                    textAlign: 'center',
                    display: 'flex',
                    gap: '8px',
                    justifyContent: 'center',
                  }}
                >
                  <button
                    style={{
                      padding: '4px 12px',
                      background: 'transparent',
                      border: '1px solid rgba(196,168,130,0.3)',
                      color: '#C4A882',
                      fontSize: '11px',
                      cursor: 'pointer',
                    }}
                  >
                    Edit
                  </button>
                  <button
                    style={{
                      padding: '4px 12px',
                      background: 'transparent',
                      border: '1px solid rgba(255,107,107,0.3)',
                      color: '#ff6b6b',
                      fontSize: '11px',
                      cursor: 'pointer',
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function ArtistPage() {
  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '28px', marginBottom: '8px', fontWeight: 400 }}>
          Artist Information
        </h2>
        <p style={{ color: '#8C8580', margin: 0 }}>Edit your artist bio and details</p>
      </div>

      <div style={{ maxWidth: '600px' }}>
        <div style={{ marginBottom: '24px' }}>
          <label
            style={{
              display: 'block',
              fontSize: '12px',
              color: '#C4A882',
              marginBottom: '8px',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              fontWeight: 500,
            }}
          >
            Artist Name
          </label>
          <input
            type="text"
            defaultValue="John Patrick Lachica"
            style={{
              width: '100%',
              padding: '12px 16px',
              background: '#111111',
              border: '1px solid rgba(240,237,232,0.15)',
              color: '#F0EDE8',
              fontSize: '14px',
              fontFamily: 'inherit',
              boxSizing: 'border-box',
            }}
          />
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label
            style={{
              display: 'block',
              fontSize: '12px',
              color: '#C4A882',
              marginBottom: '8px',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              fontWeight: 500,
            }}
          >
            Bio
          </label>
          <textarea
            defaultValue="Contemporary Filipino visual artist exploring vulnerability, resilience, and the emotional landscapes of human experience."
            style={{
              width: '100%',
              padding: '12px 16px',
              background: '#111111',
              border: '1px solid rgba(240,237,232,0.15)',
              color: '#F0EDE8',
              fontSize: '14px',
              fontFamily: 'inherit',
              boxSizing: 'border-box',
              minHeight: '120px',
              resize: 'vertical',
            }}
          />
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label
            style={{
              display: 'block',
              fontSize: '12px',
              color: '#C4A882',
              marginBottom: '8px',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              fontWeight: 500,
            }}
          >
            Artist Statement
          </label>
          <textarea
            defaultValue="Soul in Silence is a creative practice rooted in the belief that some truths are best understood through feeling rather than explanation."
            style={{
              width: '100%',
              padding: '12px 16px',
              background: '#111111',
              border: '1px solid rgba(240,237,232,0.15)',
              color: '#F0EDE8',
              fontSize: '14px',
              fontFamily: 'inherit',
              boxSizing: 'border-box',
              minHeight: '120px',
              resize: 'vertical',
            }}
          />
        </div>

        <button
          style={{
            padding: '12px 24px',
            background: '#C4A882',
            color: '#0a0a0a',
            border: 'none',
            fontSize: '13px',
            fontWeight: 500,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            cursor: 'pointer',
          }}
        >
          Save Changes
        </button>
      </div>
    </div>
  )
}

function ExhibitsPage() {
  return (
    <div>
      <h2 style={{ fontSize: '28px', marginBottom: '32px', fontWeight: 400 }}>Exhibits</h2>
      <div
        style={{
          padding: '48px',
          background: '#111111',
          border: '1px solid rgba(240,237,232,0.08)',
          textAlign: 'center',
        }}
      >
        <p style={{ fontSize: '16px', color: '#8C8580', margin: 0 }}>
          Coming Soon — Exhibit management module
        </p>
      </div>
    </div>
  )
}

function Card({ title, value }: { title: string; value: string }) {
  return (
    <div
      style={{
        padding: '24px',
        background: '#111111',
        border: '1px solid rgba(240,237,232,0.08)',
      }}
    >
      <p style={{ margin: '0 0 12px 0', fontSize: '12px', color: '#8C8580', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 500 }}>
        {title}
      </p>
      <p style={{ margin: 0, fontSize: '32px', color: '#C4A882', fontWeight: 400 }}>
        {value}
      </p>
    </div>
  )
}
