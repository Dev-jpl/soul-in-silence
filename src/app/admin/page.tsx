'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function AdminDashboard() {
  const [isAuth, setIsAuth] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Check if already authenticated
    if (localStorage.getItem('admin_auth')) {
      setIsAuth(true)
    }
    setMounted(true)
  }, [])

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

  if (!mounted) {
    return null
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
  const [artworks, setArtworks] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editForm, setEditForm] = useState<any>(null)

  useEffect(() => {
    fetchArtworks()
  }, [])

  async function fetchArtworks() {
    try {
      const res = await fetch('/api/artworks')
      const data = await res.json()
      setArtworks(data)
    } catch (err) {
      setError('Failed to load artworks')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  function startEdit(artwork: any) {
    setEditingId(artwork.id)
    setEditForm({ ...artwork })
  }

  async function saveEdit() {
    if (!editForm) return

    try {
      const res = await fetch(`/api/artworks/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm),
      })

      if (res.ok) {
        setArtworks(
          artworks.map((a) => (a.id === editingId ? editForm : a))
        )
        setEditingId(null)
        setEditForm(null)
      }
    } catch (err) {
      setError('Failed to save artwork')
      console.error(err)
    }
  }

  function cancelEdit() {
    setEditingId(null)
    setEditForm(null)
  }

  async function deleteArtwork(id: number) {
    if (!confirm('Are you sure you want to delete this artwork?')) return

    try {
      await fetch(`/api/artworks/${id}`, { method: 'DELETE' })
      setArtworks(artworks.filter((a) => a.id !== id))
    } catch (err) {
      setError('Failed to delete artwork')
      console.error(err)
    }
  }

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '28px', marginBottom: '8px', fontWeight: 400 }}>
          Manage Artworks
        </h2>
        <p style={{ color: '#8C8580', margin: 0 }}>Add, edit, or delete your artwork entries</p>
      </div>

      {error && (
        <div
          style={{
            padding: '12px 16px',
            background: 'rgba(255,107,107,0.1)',
            border: '1px solid rgba(255,107,107,0.3)',
            color: '#ff6b6b',
            marginBottom: '24px',
            fontSize: '13px',
          }}
        >
          {error}
        </div>
      )}

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

      {loading ? (
        <p style={{ color: '#8C8580' }}>Loading artworks...</p>
      ) : (
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
              {artworks.map((artwork) => (
                <tr
                  key={artwork.id}
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
                      onClick={() => startEdit(artwork)}
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
                      onClick={() => deleteArtwork(artwork.id)}
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
      )}

      {editingId && editForm && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
          onClick={cancelEdit}
        >
          <div
            style={{
              background: '#111111',
              border: '1px solid rgba(240,237,232,0.08)',
              padding: '32px',
              maxWidth: '600px',
              maxHeight: '90vh',
              overflowY: 'auto',
              borderRadius: '4px',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ fontSize: '20px', color: '#F0EDE8', marginBottom: '24px', fontWeight: 400 }}>
              Edit Artwork
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#C4A882', marginBottom: '6px', textTransform: 'uppercase', fontWeight: 500 }}>
                  Title
                </label>
                <input
                  type="text"
                  value={editForm.title}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    background: '#0a0a0a',
                    border: '1px solid rgba(240,237,232,0.15)',
                    color: '#F0EDE8',
                    fontSize: '13px',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#C4A882', marginBottom: '6px', textTransform: 'uppercase', fontWeight: 500 }}>
                    Year
                  </label>
                  <input
                    type="number"
                    value={editForm.year}
                    onChange={(e) => setEditForm({ ...editForm, year: parseInt(e.target.value) })}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      background: '#0a0a0a',
                      border: '1px solid rgba(240,237,232,0.15)',
                      color: '#F0EDE8',
                      fontSize: '13px',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#C4A882', marginBottom: '6px', textTransform: 'uppercase', fontWeight: 500 }}>
                    Category
                  </label>
                  <select
                    value={editForm.category}
                    onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      background: '#0a0a0a',
                      border: '1px solid rgba(240,237,232,0.15)',
                      color: '#F0EDE8',
                      fontSize: '13px',
                      boxSizing: 'border-box',
                    }}
                  >
                    <option value="painting">Painting</option>
                    <option value="mixed-media">Mixed Media</option>
                    <option value="drawing">Drawing</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#C4A882', marginBottom: '6px', textTransform: 'uppercase', fontWeight: 500 }}>
                  Medium
                </label>
                <input
                  type="text"
                  value={editForm.medium}
                  onChange={(e) => setEditForm({ ...editForm, medium: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    background: '#0a0a0a',
                    border: '1px solid rgba(240,237,232,0.15)',
                    color: '#F0EDE8',
                    fontSize: '13px',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#C4A882', marginBottom: '6px', textTransform: 'uppercase', fontWeight: 500 }}>
                  Dimensions
                </label>
                <input
                  type="text"
                  value={editForm.dimensions}
                  onChange={(e) => setEditForm({ ...editForm, dimensions: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    background: '#0a0a0a',
                    border: '1px solid rgba(240,237,232,0.15)',
                    color: '#F0EDE8',
                    fontSize: '13px',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#C4A882', marginBottom: '6px', textTransform: 'uppercase', fontWeight: 500 }}>
                  Description
                </label>
                <textarea
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    background: '#0a0a0a',
                    border: '1px solid rgba(240,237,232,0.15)',
                    color: '#F0EDE8',
                    fontSize: '13px',
                    boxSizing: 'border-box',
                    minHeight: '80px',
                    resize: 'vertical',
                  }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <input
                  type="checkbox"
                  checked={editForm.featured}
                  onChange={(e) => setEditForm({ ...editForm, featured: e.target.checked })}
                  style={{ cursor: 'pointer' }}
                />
                <label style={{ fontSize: '12px', color: '#8C8580', cursor: 'pointer' }}>
                  Featured on homepage
                </label>
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                <button
                  onClick={saveEdit}
                  style={{
                    flex: 1,
                    padding: '10px 16px',
                    background: '#C4A882',
                    color: '#0a0a0a',
                    border: 'none',
                    fontSize: '12px',
                    fontWeight: 500,
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                  }}
                >
                  Save Changes
                </button>
                <button
                  onClick={cancelEdit}
                  style={{
                    flex: 1,
                    padding: '10px 16px',
                    background: 'transparent',
                    color: '#8C8580',
                    border: '1px solid rgba(240,237,232,0.15)',
                    fontSize: '12px',
                    fontWeight: 500,
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function ArtistPage() {
  const [artist, setArtist] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetchArtist()
  }, [])

  async function fetchArtist() {
    try {
      const res = await fetch('/api/artist')
      const data = await res.json()
      setArtist(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  async function saveArtist() {
    if (!artist) return

    setSaving(true)
    try {
      const res = await fetch('/api/artist', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(artist),
      })

      if (res.ok) {
        setMessage('Changes saved successfully!')
        setTimeout(() => setMessage(''), 3000)
      } else {
        setMessage('Failed to save changes')
      }
    } catch (err) {
      setMessage('Error saving changes')
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div>
        <h2 style={{ fontSize: '28px', marginBottom: '32px', fontWeight: 400 }}>
          Artist Information
        </h2>
        <p style={{ color: '#8C8580' }}>Loading...</p>
      </div>
    )
  }

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '28px', marginBottom: '8px', fontWeight: 400 }}>
          Artist Information
        </h2>
        <p style={{ color: '#8C8580', margin: 0 }}>Edit your artist bio and details</p>
      </div>

      {message && (
        <div
          style={{
            padding: '12px 16px',
            background: message.includes('successfully')
              ? 'rgba(76,175,80,0.1)'
              : 'rgba(255,107,107,0.1)',
            border: message.includes('successfully')
              ? '1px solid rgba(76,175,80,0.3)'
              : '1px solid rgba(255,107,107,0.3)',
            color: message.includes('successfully') ? '#4caf50' : '#ff6b6b',
            marginBottom: '24px',
            fontSize: '13px',
          }}
        >
          {message}
        </div>
      )}

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
            value={artist?.name || ''}
            onChange={(e) => setArtist({ ...artist, name: e.target.value })}
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
            value={artist?.bio || ''}
            onChange={(e) => setArtist({ ...artist, bio: e.target.value })}
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
            value={artist?.statement || ''}
            onChange={(e) => setArtist({ ...artist, statement: e.target.value })}
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
          onClick={saveArtist}
          disabled={saving}
          style={{
            padding: '12px 24px',
            background: saving ? '#666666' : '#C4A882',
            color: '#0a0a0a',
            border: 'none',
            fontSize: '13px',
            fontWeight: 500,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            cursor: saving ? 'not-allowed' : 'pointer',
            opacity: saving ? 0.6 : 1,
          }}
        >
          {saving ? 'Saving...' : 'Save Changes'}
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
