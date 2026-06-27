'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { loadWorks, type Artwork } from '@/lib/worksStore'
import { Card, ghostBtn } from './ui'

type Tab = 'overview' | 'artworks' | 'pages' | 'visitors'
type Ev = {
  kind: string
  ref: string
  created_at: string
  os: string | null
  device: string | null
  browser: string | null
  country: string | null
  visitor: string | null
}

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
  const [days, setDays] = useState(30)
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
      .select('kind, ref, created_at, os, device, browser, country, visitor')
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

  async function resetAll() {
    if (!supabase) return
    if (!confirm('Reset ALL analytics (every view event)? This cannot be undone.')) return
    const a = await supabase.rpc('reset_views', { p_kind: 'artwork' })
    const p = await supabase.rpc('reset_views', { p_kind: 'page' })
    const err = a.error || p.error
    if (err) {
      alert('Reset failed: ' + err.message)
      return
    }
    setEvents([])
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
  const uniqueVisitors = new Set(filtered.map((e) => e.visitor).filter(Boolean)).size
  const featured = artworks.filter((a) => a.featured).length

  // Daily visit series for the last `days` days (counts all view events).
  const dayCounts: Record<string, number> = {}
  events.forEach((e) => {
    const d = e.created_at.slice(0, 10)
    dayCounts[d] = (dayCounts[d] ?? 0) + 1
  })
  const series: { date: string; value: number }[] = []
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
    series.push({ date: key, value: dayCounts[key] ?? 0 })
  }

  const breakdown = (field: 'os' | 'device' | 'browser' | 'country') => {
    const counts: Record<string, number> = {}
    filtered.forEach((e) => {
      const v = e[field] || 'Unknown'
      counts[v] = (counts[v] ?? 0) + 1
    })
    return Object.entries(counts)
      .map(([label, value]) => ({ label, value }))
      .sort((x, y) => y.value - x.value)
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'artworks', label: 'Artworks' },
    { id: 'pages', label: 'Pages' },
    { id: 'visitors', label: 'Visitors' },
  ]

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', flexWrap: 'wrap', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '28px', margin: 0, fontWeight: 400 }}>Analytics</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
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
          {supabase && !error && (
            <button onClick={resetAll} style={{ ...ghostBtn, padding: '8px 16px', borderColor: 'rgba(255,107,107,0.4)', color: '#ff6b6b' }}>
              Reset All
            </button>
          )}
        </div>
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '24px' }}>
            <Card title="Total Visits" value={(totalArtworkViews + totalPageViews).toLocaleString()} />
            <Card title="Unique Visitors" value={uniqueVisitors.toLocaleString()} />
            <Card title="Page Views" value={totalPageViews.toLocaleString()} />
            <Card title="Artwork Views" value={totalArtworkViews.toLocaleString()} />
            <Card title="Total Artworks" value={String(artworks.length)} />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 400, margin: 0, color: '#F0EDE8' }}>Visits — last {days} days</h3>
              <div style={{ display: 'flex', gap: '6px' }}>
                {[7, 14, 30, 90].map((d) => (
                  <button
                    key={d}
                    onClick={() => setDays(d)}
                    style={{
                      padding: '6px 12px',
                      background: days === d ? 'rgba(196,168,130,0.15)' : 'transparent',
                      border: `1px solid ${days === d ? '#C4A882' : 'rgba(240,237,232,0.15)'}`,
                      color: days === d ? '#C4A882' : '#8C8580',
                      fontSize: '12px',
                      cursor: 'pointer',
                    }}
                  >
                    {d}d
                  </button>
                ))}
              </div>
            </div>
            <VisitsLineChart series={series} />
          </div>
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

      {tab === 'visitors' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          <div>
            <SectionHeader title="Device" />
            <PieChart rows={breakdown('device')} empty="No data in this period." />
          </div>
          <div>
            <SectionHeader title="Operating System" />
            <PieChart rows={breakdown('os')} empty="No data in this period." />
          </div>
          <div>
            <SectionHeader title="Browser" />
            <BarList rows={breakdown('browser')} empty="No data in this period." />
          </div>
          <div>
            <SectionHeader title="Country" />
            <BarList rows={breakdown('country')} empty="No data in this period." />
          </div>
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

const PIE_COLORS = ['#C4A882', '#8C8580', '#A9885F', '#5E5853', '#D8C9A8', '#736B62', '#3A3A3A']

function PieChart({ rows, empty }: { rows: { label: string; value: number }[]; empty: string }) {
  const total = rows.reduce((s, r) => s + r.value, 0)
  if (total === 0) return <p style={{ color: '#8C8580', fontSize: '13px' }}>{empty}</p>

  const cx = 80
  const cy = 80
  const r = 78
  const slices = rows.map((row, i) => {
    const before = rows.slice(0, i).reduce((s, x) => s + x.value, 0)
    const frac = row.value / total
    const start = -Math.PI / 2 + (before / total) * 2 * Math.PI
    const end = -Math.PI / 2 + ((before + row.value) / total) * 2 * Math.PI
    const x1 = cx + r * Math.cos(start)
    const y1 = cy + r * Math.sin(start)
    const x2 = cx + r * Math.cos(end)
    const y2 = cy + r * Math.sin(end)
    const large = end - start > Math.PI ? 1 : 0
    const d = `M${cx},${cy} L${x1.toFixed(2)},${y1.toFixed(2)} A${r},${r} 0 ${large} 1 ${x2.toFixed(2)},${y2.toFixed(2)} Z`
    return { d, color: PIE_COLORS[i % PIE_COLORS.length], label: row.label, value: row.value, pct: Math.round(frac * 100) }
  })

  return (
    <div style={{ display: 'flex', gap: '32px', alignItems: 'center', flexWrap: 'wrap' }}>
      <svg width="160" height="160" viewBox="0 0 160 160" style={{ flexShrink: 0 }}>
        {rows.length === 1 ? (
          <circle cx={cx} cy={cy} r={r} fill={PIE_COLORS[0]} />
        ) : (
          slices.map((s, i) => <path key={i} d={s.d} fill={s.color} />)
        )}
      </svg>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {slices.map((s, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px' }}>
            <span style={{ width: '10px', height: '10px', background: s.color, borderRadius: '2px', flexShrink: 0 }} />
            <span style={{ color: '#F0EDE8' }}>{s.label}</span>
            <span style={{ color: '#8C8580' }}>
              {s.value.toLocaleString()} ({s.pct}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function VisitsLineChart({ series }: { series: { date: string; value: number }[] }) {
  const W = 700
  const H = 180
  const n = series.length
  const max = Math.max(1, ...series.map((s) => s.value))
  const total = series.reduce((s, d) => s + d.value, 0)
  const points = series.map((s, i) => {
    const x = n <= 1 ? 0 : (i / (n - 1)) * W
    const y = H - (s.value / max) * (H - 8) - 4
    return [x, y] as const
  })
  const line = points.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ')
  const area = points.length ? `${line} L${W},${H} L0,${H} Z` : ''
  const fmt = (d: string) => {
    const [y, m, day] = d.split('-')
    return new Date(Number(y), Number(m) - 1, Number(day)).toLocaleString('en-US', { month: 'short', day: 'numeric' })
  }

  return (
    <div>
      <p style={{ margin: '0 0 12px 0', fontSize: '13px', color: '#8C8580' }}>
        <span style={{ color: '#C4A882', fontWeight: 500 }}>{total.toLocaleString()}</span> visits · peak {max.toLocaleString()}/day
      </p>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        width="100%"
        height="180"
        style={{ display: 'block', border: '1px solid rgba(240,237,232,0.08)', borderRadius: '4px', background: 'rgba(240,237,232,0.02)' }}
      >
        {area && <path d={area} fill="rgba(196,168,130,0.12)" />}
        {line && <path d={line} fill="none" stroke="#C4A882" strokeWidth={2} vectorEffect="non-scaling-stroke" />}
      </svg>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontSize: '11px', color: '#8C8580' }}>
        <span>{n ? fmt(series[0].date) : ''}</span>
        <span>{n ? fmt(series[n - 1].date) : ''}</span>
      </div>
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
