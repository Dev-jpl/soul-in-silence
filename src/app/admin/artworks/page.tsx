'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { loadWorks, saveWorks, resetWorks, uniqueSlug, type Artwork } from '@/lib/worksStore'
import { emptyForm, modalInput, primaryBtn, ghostBtn, editBtn, deleteBtn, FormField } from '../ui'

export default function ArtworksPage() {
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
      const slug = uniqueSlug(form.title, artworks)
      persist([{ ...form, slug }, ...artworks])
      setNotice('Artwork added.')
    } else {
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
              {['Image', 'Title', 'Year', 'Category', 'Actions'].map((h, i) => (
                <th
                  key={h}
                  style={{
                    padding: '16px',
                    textAlign: i === 4 ? 'center' : 'left',
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
                <td style={{ padding: '12px 16px' }}>
                  <div
                    style={{
                      position: 'relative',
                      width: '44px',
                      height: '55px',
                      background: '#161616',
                      overflow: 'hidden',
                      flexShrink: 0,
                    }}
                  >
                    {artwork.image && (
                      <Image src={artwork.image} alt={artwork.title} fill sizes="44px" style={{ objectFit: 'cover' }} />
                    )}
                  </div>
                </td>
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
                <td colSpan={5} style={{ padding: '24px', color: '#8C8580', textAlign: 'center' }}>
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
