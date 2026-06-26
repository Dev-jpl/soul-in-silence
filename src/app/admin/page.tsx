'use client'

import { useState, useEffect } from 'react'
import {
  loadWorks,
  saveWorks,
  resetWorks,
  uniqueSlug,
  type Artwork,
} from '@/lib/worksStore'

const ADMIN_PASSWORD = 'SnS2025'
const AUTH_KEY = 'admin_auth'

export default function AdminDashboard() {
  const [isAuth, setIsAuth] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Auth state is kept in sessionStorage (cleared when the tab closes)
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
            Soul in Silence • Artworks Management
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

  return <AdminNav />
}

function AdminNav() {
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'artworks'>('dashboard')

  const handleLogout = () => {
    sessionStorage.removeItem(AUTH_KEY)
    window.location.reload()
  }

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

      <div className="admin-body" style={{ display: 'flex' }}>
        <div className="admin-sidebar" style={{ width: '200px', borderRight: '1px solid rgba(240,237,232,0.08)', padding: '32px 0' }}>
          <nav className="admin-nav" style={{ display: 'flex', flexDirection: 'column' }}>
            {[
              { id: 'dashboard' as const, label: 'Dashboard' },
              { id: 'artworks' as const, label: 'Artworks' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                style={{
                  padding: '12px 24px',
                  background: currentPage === item.id ? 'rgba(196,168,130,0.1)' : 'transparent',
                  border: 'none',
                  color: currentPage === item.id ? '#C4A882' : '#8C8580',
                  fontSize: '13px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  borderLeft: currentPage === item.id ? '2px solid #C4A882' : '2px solid transparent',
                }}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="admin-content" style={{ flex: 1, padding: '48px', minWidth: 0 }}>
          {currentPage === 'dashboard' && <DashboardPage />}
          {currentPage === 'artworks' && <ArtworksPage />}
        </div>
      </div>
    </div>
  )
}

function DashboardPage() {
  const [artworks, setArtworks] = useState<Artwork[]>([])
  useEffect(() => setArtworks(loadWorks()), [])
  const featured = artworks.filter((a) => a.featured).length

  return (
    <div>
      <h2 style={{ fontSize: '28px', marginBottom: '32px', fontWeight: 400 }}>Dashboard</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
        <Card title="Total Artworks" value={String(artworks.length)} />
        <Card title="Featured Works" value={String(featured)} />
      </div>
    </div>
  )
}

const emptyForm: Artwork = {
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

function ArtworksPage() {
  const [artworks, setArtworks] = useState<Artwork[]>([])
  const [editingSlug, setEditingSlug] = useState<string | null>(null) // null = closed, '' = adding new
  const [form, setForm] = useState<Artwork | null>(null)
  const [notice, setNotice] = useState('')

  useEffect(() => setArtworks(loadWorks()), [])

  function persist(next: Artwork[]) {
    setArtworks(next)
    saveWorks(next)
  }

  function startAdd() {
    setEditingSlug('')
    setForm({ ...emptyForm })
  }

  function startEdit(artwork: Artwork) {
    setEditingSlug(artwork.slug)
    setForm({ ...artwork })
  }

  function closeModal() {
    setEditingSlug(null)
    setForm(null)
  }

  function save() {
    if (!form) return
    if (!form.title.trim()) {
      setNotice('Title is required.')
      return
    }
    if (editingSlug === '') {
      // Adding
      const slug = uniqueSlug(form.title, artworks)
      persist([{ ...form, slug }, ...artworks])
      setNotice('Artwork added.')
    } else {
      // Editing — keep slug stable
      persist(artworks.map((a) => (a.slug === editingSlug ? { ...form, slug: editingSlug } : a)))
      setNotice('Artwork updated.')
    }
    closeModal()
    setTimeout(() => setNotice(''), 3000)
  }

  function remove(slug: string) {
    if (!confirm('Delete this artwork? This affects only your browser until you export and commit.')) return
    persist(artworks.filter((a) => a.slug !== slug))
  }

  function exportJson() {
    const json = JSON.stringify(artworks, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'works.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  function reset() {
    if (!confirm('Reset to the published defaults? Your local changes will be cleared.')) return
    resetWorks()
    setArtworks(loadWorks())
    setNotice('Reset to defaults.')
    setTimeout(() => setNotice(''), 3000)
  }

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '28px', marginBottom: '8px', fontWeight: 400 }}>Manage Artworks</h2>
        <p style={{ color: '#8C8580', margin: 0 }}>Add, edit, or delete your artwork entries</p>
      </div>

      <div
        style={{
          padding: '14px 18px',
          background: 'rgba(196,168,130,0.08)',
          border: '1px solid rgba(196,168,130,0.25)',
          color: '#C4A882',
          marginBottom: '24px',
          fontSize: '12.5px',
          lineHeight: 1.6,
        }}
      >
        Changes are saved in this browser only. To publish them to everyone, click{' '}
        <strong>Export JSON</strong>, then replace the array in <code>src/content/works.ts</code> and deploy.
      </div>

      {notice && (
        <div
          style={{
            padding: '12px 16px',
            background: 'rgba(76,175,80,0.1)',
            border: '1px solid rgba(76,175,80,0.3)',
            color: '#4caf50',
            marginBottom: '24px',
            fontSize: '13px',
          }}
        >
          {notice}
        </div>
      )}

      <div style={{ display: 'flex', gap: '12px', marginBottom: '32px', flexWrap: 'wrap' }}>
        <button style={primaryBtn} onClick={startAdd}>
          + Add New Artwork
        </button>
        <button style={ghostBtn} onClick={exportJson}>
          Export JSON
        </button>
        <button style={ghostBtn} onClick={reset}>
          Reset to Defaults
        </button>
      </div>

      <div style={{ border: '1px solid rgba(240,237,232,0.08)', borderRadius: '4px', overflowX: 'auto' }}>
        <table style={{ width: '100%', minWidth: '480px', borderCollapse: 'collapse', fontSize: '13px' }}>
          <thead>
            <tr style={{ background: 'rgba(240,237,232,0.02)', borderBottom: '1px solid rgba(240,237,232,0.08)' }}>
              {['Title', 'Year', 'Category', 'Actions'].map((h, i) => (
                <th
                  key={h}
                  style={{
                    padding: '16px',
                    textAlign: i === 3 ? 'center' : 'left',
                    fontWeight: 500,
                    color: '#C4A882',
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {artworks.map((artwork) => (
              <tr key={artwork.slug} style={{ borderBottom: '1px solid rgba(240,237,232,0.08)' }}>
                <td style={{ padding: '16px', color: '#F0EDE8' }}>
                  {artwork.title}
                  {artwork.featured && (
                    <span style={{ color: '#C4A882', marginLeft: '8px', fontSize: '11px' }}>★</span>
                  )}
                </td>
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
                <td style={{ padding: '16px', textAlign: 'center', display: 'flex', gap: '8px', justifyContent: 'center' }}>
                  <button onClick={() => startEdit(artwork)} style={editBtn}>
                    Edit
                  </button>
                  <button onClick={() => remove(artwork.slug)} style={deleteBtn}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {artworks.length === 0 && (
              <tr>
                <td colSpan={4} style={{ padding: '24px', color: '#8C8580', textAlign: 'center' }}>
                  No artworks yet. Click “Add New Artwork”.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {form && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '24px',
          }}
          onClick={closeModal}
        >
          <div
            style={{
              background: '#111111',
              border: '1px solid rgba(240,237,232,0.08)',
              padding: '32px',
              maxWidth: '600px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              borderRadius: '4px',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ fontSize: '20px', color: '#F0EDE8', marginBottom: '24px', fontWeight: 400 }}>
              {editingSlug === '' ? 'Add Artwork' : 'Edit Artwork'}
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <FormField label="Title">
                <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} style={modalInput} />
              </FormField>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <FormField label="Year">
                  <input
                    type="number"
                    value={form.year}
                    onChange={(e) => setForm({ ...form, year: parseInt(e.target.value) || 0 })}
                    style={modalInput}
                  />
                </FormField>
                <FormField label="Category">
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value as Artwork['category'] })}
                    style={modalInput}
                  >
                    <option value="painting">Painting</option>
                    <option value="mixed-media">Mixed Media</option>
                    <option value="drawing">Drawing</option>
                  </select>
                </FormField>
              </div>

              <FormField label="Medium">
                <input type="text" value={form.medium} onChange={(e) => setForm({ ...form, medium: e.target.value })} style={modalInput} />
              </FormField>

              <FormField label="Dimensions">
                <input
                  type="text"
                  value={form.dimensions}
                  placeholder="e.g. 100 × 80 cm"
                  onChange={(e) => setForm({ ...form, dimensions: e.target.value })}
                  style={modalInput}
                />
              </FormField>

              <FormField label="Image path (in /public)">
                <input
                  type="text"
                  value={form.image}
                  placeholder="/artworks/your-image.jpg"
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  style={modalInput}
                />
              </FormField>

              <FormField label="Description">
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  style={{ ...modalInput, minHeight: '80px', resize: 'vertical' }}
                />
              </FormField>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <input
                  type="checkbox"
                  checked={!!form.featured}
                  onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                  style={{ cursor: 'pointer' }}
                />
                <label style={{ fontSize: '12px', color: '#8C8580', cursor: 'pointer' }}>Featured on homepage</label>
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                <button onClick={save} style={{ ...primaryBtn, flex: 1 }}>
                  Save
                </button>
                <button onClick={closeModal} style={{ ...ghostBtn, flex: 1 }}>
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

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
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

function Card({ title, value }: { title: string; value: string }) {
  return (
    <div style={{ padding: '24px', background: '#111111', border: '1px solid rgba(240,237,232,0.08)' }}>
      <p style={{ margin: '0 0 12px 0', fontSize: '12px', color: '#8C8580', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 500 }}>
        {title}
      </p>
      <p style={{ margin: 0, fontSize: '32px', color: '#C4A882', fontWeight: 400 }}>{value}</p>
    </div>
  )
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 16px',
  background: '#0a0a0a',
  border: '1px solid rgba(240,237,232,0.15)',
  color: '#F0EDE8',
  fontSize: '14px',
  fontFamily: 'inherit',
  boxSizing: 'border-box',
}

const modalInput: React.CSSProperties = {
  width: '100%',
  padding: '8px 12px',
  background: '#0a0a0a',
  border: '1px solid rgba(240,237,232,0.15)',
  color: '#F0EDE8',
  fontSize: '13px',
  fontFamily: 'inherit',
  boxSizing: 'border-box',
}

const primaryBtn: React.CSSProperties = {
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

const ghostBtn: React.CSSProperties = {
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

const editBtn: React.CSSProperties = {
  padding: '4px 12px',
  background: 'transparent',
  border: '1px solid rgba(196,168,130,0.3)',
  color: '#C4A882',
  fontSize: '11px',
  cursor: 'pointer',
}

const deleteBtn: React.CSSProperties = {
  padding: '4px 12px',
  background: 'transparent',
  border: '1px solid rgba(255,107,107,0.3)',
  color: '#ff6b6b',
  fontSize: '11px',
  cursor: 'pointer',
}
