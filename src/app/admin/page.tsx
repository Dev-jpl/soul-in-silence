'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { loadWorks, type Artwork } from '@/lib/worksStore'
import { Card, ghostBtn } from './ui'

type Tab = 'overview' | 'artworks' | 'pages'
type Ev = { kind: string; ref: string; created_at: string }

// Friendly names for the site's pages (path → name).
const PAGE_NAMES: Record<string, string> = {
  '/': 'Home',
  '/works': 'Works',
  '/about': 'About',
  '/statement': 'Artist Statement',
  '/exhibitions': 'Exhibitions',
  '/contact': 'Contact',
}

function monthOptions() {
  const opts = [{ value: 'all', label: 'All time' }]
  const now = new Date()
  for (let i = 0; i < 12; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const value = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
    opts.push({ value, label: d.toLocaleString('en-US', { month: 'long', year: 'numeric' }) })
  }
  return opts
}

export default function AnalyticsPage() {
  const [tab, setTab] = useState<Tab>('overview')
  const [period, setPeriod] = useState('all')
  const [artworks, setArtworks] = useState<Artwork[]>([])
  const [events, setEvents] = useState<Ev[]>([])
  const [error, setError] = useState('')

  useEffect(() => {
    setArtworks(loadWorks())
    if (!supabase) {
      setError('Supabase is not configured (set the NEXT_PUBLIC_SUPABASE_* env vars).')
      return
    }
    supabase
      .from('view_events')
      .select('kind, ref, created_at')
      .then(({ data, error }) => {
        if (error) {
          setError(error.message)
          return
        }
        setEvents((data ?? []) as Ev[])
      })
  }, [])

  async function reset(kind: 'artwork' | 'page') {
    if (!supabase) return
    if (!confirm(`Reset all ${kind} views? This cannot be undone.`)) return
    const { error } = await supabase.rpc('reset_views', { p_kind: kind })
    if (error) {
      alert('Reset failed: ' + error.message)
      return
    }
    setEvents((prev) => prev.filter((e) => e.kind !== kind))
  }

  const filtered = events.filter((e) => period === 'all' || e.created_at.slice(0, 7) === period)

  const artworkCounts: Record<string, number> = {}
  const pageCounts: Record<string, number> = {}
  filtered.forEach((e) => {
    if (e.kind === 'artwork') artworkCounts[e.ref] = (artworkCounts[e.ref] ?? 0) + 1
    else if (e.kind === 'page') pageCounts[e.ref] = (pageCounts[e.ref] ?? 0) + 1
  })

  const artworkRows = artworks
    .map((a) => ({ label: a.title, value: artworkCounts[a.slug] ?? 0 }))
    .sort((x, y) => y.value - x.value)
  const pageRows = Object.entries(pageCounts)
    .map(([path, value]) => ({ label: PAGE_NAMES[path] ?? path, sub: path, value }))
    .sort((x, y) => y.value - x.value)

  const totalArtworkViews = artworkRows.reduce((s, r) => s + r.value, 0)
  const totalPageViews = pageRows.reduce((s, r) => s + r.value, 0)
  const featured = artworks.filter((a) => a.featured).length

  const tabs: { id: Tab; label: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'artworks', label: 'Artworks' },
    { id: 'pages', label: 'Pages' },
  ]

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', flexWrap: 'wrap', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '28px', margin: 0, fontWeight: 400 }}>Analytics</h2>
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          style={{
            padding: '8px 14px',
            background: '#111111',
            color: '#F0EDE8',
            border: '1px solid rgba(240,237,232,0.15)',
            fontSize: '13px',
            fontFamily: 'inherit',
            cursor: 'pointer',
          }}
        >
          {monthOptions().map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

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

      {tab === 'overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
          <Card title="Total Artworks" value={String(artworks.length)} />
          <Card title="Featured Works" value={String(featured)} />
          <Card title="Artwork Views" value={totalArtworkViews.toLocaleString()} />
          <Card title="Page Views" value={totalPageViews.toLocaleString()} />
        </div>
      )}

      {tab === 'artworks' && (
        <div>
          <SectionHeader title="Views by artwork" onReset={supabase && !error ? () => reset('artwork') : undefined} />
          <BarList rows={artworkRows} empty="No artwork views in this period." />
        </div>
      )}

      {tab === 'pages' && (
        <div>
          <SectionHeader title="Views by page" onReset={supabase && !error ? () => reset('page') : undefined} />
          <BarList rows={pageRows} empty="No page views in this period." />
        </div>
      )}
    </div>
  )
}

function SectionHeader({ title, onReset }: { title: string; onReset?: () => void }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
      <h3 style={{ fontSize: '16px', fontWeight: 400, margin: 0, color: '#F0EDE8' }}>{title}</h3>
      {onReset && (
        <button onClick={onReset} style={{ ...ghostBtn, padding: '8px 16px' }}>
          Reset Views
        </button>
      )}
    </div>
  )
}

function BarList({
  rows,
  empty,
}: {
  rows: { label: string; sub?: string; value: number }[]
  empty: string
}) {
  if (rows.length === 0) return <p style={{ color: '#8C8580', fontSize: '13px' }}>{empty}</p>
  const max = Math.max(1, ...rows.map((r) => r.value))
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {rows.map((r) => (
        <div key={r.label + (r.sub ?? '')}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '6px' }}>
            <span>
              <span style={{ color: '#F0EDE8', fontSize: '13px' }}>{r.label}</span>
              {r.sub && <span style={{ color: '#8C8580', fontSize: '11px', marginLeft: '8px' }}>{r.sub}</span>}
            </span>
            <span style={{ color: '#C4A882', fontSize: '13px', fontWeight: 500 }}>{r.value.toLocaleString()}</span>
          </div>
          <div style={{ height: '6px', background: 'rgba(240,237,232,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
            <div
              style={{
                height: '100%',
                width: `${(r.value / max) * 100}%`,
                background: '#C4A882',
                borderRadius: '3px',
                transition: 'width 0.3s',
              }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
