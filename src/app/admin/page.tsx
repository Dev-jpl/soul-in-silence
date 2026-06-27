'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { loadWorks, type Artwork } from '@/lib/worksStore'
import { Card, ghostBtn } from './ui'

type Tab = 'overview' | 'artworks' | 'pages'

export default function AnalyticsPage() {
  const [tab, setTab] = useState<Tab>('overview')
  const [artworks, setArtworks] = useState<Artwork[]>([])
  const [views, setViews] = useState<Record<string, number>>({})
  const [pageViews, setPageViews] = useState<{ path: string; count: number }[]>([])
  const [error, setError] = useState('')

  useEffect(() => {
    setArtworks(loadWorks())
    if (!supabase) {
      setError('Supabase is not configured (set the NEXT_PUBLIC_SUPABASE_* env vars).')
      return
    }
    supabase
      .from('artwork_views')
      .select('slug, count')
      .then(({ data, error }) => {
        if (error) {
          setError(error.message)
          return
        }
        const map: Record<string, number> = {}
        ;(data ?? []).forEach((r: { slug: string; count: number }) => {
          map[r.slug] = r.count
        })
        setViews(map)
      })
    supabase
      .from('page_views')
      .select('path, count')
      .then(({ data }) => {
        if (data) setPageViews([...data].sort((a, b) => b.count - a.count))
      })
  }, [])

  async function resetArtworkViews() {
    if (!supabase) return
    if (!confirm('Reset all artwork view counts to zero? This cannot be undone.')) return
    const { error } = await supabase.rpc('reset_artwork_views')
    if (error) {
      alert('Reset failed: ' + error.message)
      return
    }
    setViews({})
  }

  async function resetPageViews() {
    if (!supabase) return
    if (!confirm('Reset all page view counts to zero? This cannot be undone.')) return
    const { error } = await supabase.rpc('reset_page_views')
    if (error) {
      alert('Reset failed: ' + error.message)
      return
    }
    setPageViews([])
  }

  const featured = artworks.filter((a) => a.featured).length
  const rankedArtworks = [...artworks]
    .map((a) => ({ slug: a.slug, title: a.title, views: views[a.slug] ?? 0 }))
    .sort((x, y) => y.views - x.views)
  const totalArtworkViews = rankedArtworks.reduce((sum, r) => sum + r.views, 0)
  const totalPageViews = pageViews.reduce((sum, r) => sum + r.count, 0)

  const tabs: { id: Tab; label: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'artworks', label: 'Artworks' },
    { id: 'pages', label: 'Pages' },
  ]

  return (
    <div>
      <h2 style={{ fontSize: '28px', marginBottom: '24px', fontWeight: 400 }}>Analytics</h2>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '4px', borderBottom: '1px solid rgba(240,237,232,0.08)', marginBottom: '32px' }}>
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              padding: '12px 18px',
              background: 'transparent',
              border: 'none',
              borderBottom: tab === t.id ? '2px solid #C4A882' : '2px solid transparent',
              color: tab === t.id ? '#F0EDE8' : '#8C8580',
              fontSize: '13px',
              letterSpacing: '0.04em',
              cursor: 'pointer',
              marginBottom: '-1px',
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {error && <p style={{ color: '#8C8580', fontSize: '13px', lineHeight: 1.7, marginBottom: '24px' }}>{error}</p>}

      {/* Overview */}
      {tab === 'overview' && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '24px',
          }}
        >
          <Card title="Total Artworks" value={String(artworks.length)} />
          <Card title="Featured Works" value={String(featured)} />
          <Card title="Artwork Views" value={String(totalArtworkViews)} />
          <Card title="Page Views" value={String(totalPageViews)} />
        </div>
      )}

      {/* Artworks */}
      {tab === 'artworks' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 400, margin: 0, color: '#F0EDE8' }}>Views by artwork</h3>
            {supabase && !error && (
              <button onClick={resetArtworkViews} style={{ ...ghostBtn, padding: '8px 16px' }}>
                Reset Views
              </button>
            )}
          </div>
          <ViewList rows={rankedArtworks.map((r) => ({ label: r.title, value: r.views }))} empty="No artwork views yet." />
        </div>
      )}

      {/* Pages */}
      {tab === 'pages' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 400, margin: 0, color: '#F0EDE8' }}>Views by page</h3>
            {supabase && !error && (
              <button onClick={resetPageViews} style={{ ...ghostBtn, padding: '8px 16px' }}>
                Reset Views
              </button>
            )}
          </div>
          <ViewList rows={pageViews.map((r) => ({ label: r.path, value: r.count }))} empty="No page views recorded yet." />
        </div>
      )}
    </div>
  )
}

function ViewList({ rows, empty }: { rows: { label: string; value: number }[]; empty: string }) {
  if (rows.length === 0) return <p style={{ color: '#8C8580', fontSize: '13px' }}>{empty}</p>
  return (
    <div style={{ border: '1px solid rgba(240,237,232,0.08)', borderRadius: '4px', overflow: 'hidden' }}>
      {rows.map(({ label, value }) => (
        <div
          key={label}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '14px 18px',
            borderBottom: '1px solid rgba(240,237,232,0.06)',
            fontSize: '13px',
          }}
        >
          <span style={{ color: '#F0EDE8' }}>{label}</span>
          <span style={{ color: '#C4A882', fontWeight: 500 }}>{value.toLocaleString()}</span>
        </div>
      ))}
    </div>
  )
}
