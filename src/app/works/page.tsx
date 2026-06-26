'use client'

import { useState } from 'react'
import { works } from '@/content/works'
import type { Artwork } from '@/content/works'
import ArtworkCard from '@/components/ArtworkCard'
import PageTransition from '@/components/PageTransition'

const filters = ['All', 'Painting', 'Mixed Media', 'Drawing'] as const
type Filter = (typeof filters)[number]
type ViewMode = 'grid' | 'list'

function categoryMatch(artwork: Artwork, filter: Filter) {
  if (filter === 'All') return true
  if (filter === 'Painting') return artwork.category === 'painting'
  if (filter === 'Mixed Media') return artwork.category === 'mixed-media'
  if (filter === 'Drawing') return artwork.category === 'drawing'
  return true
}

export default function WorksPage() {
  const [active, setActive] = useState<Filter>('All')
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const filtered = works.filter((w) => categoryMatch(w, active))

  return (
    <PageTransition>
      {/* Filter and view toggle bar */}
      <div
        className="pad-x"
        style={{
          padding: '24px 48px',
          borderBottom: '1px solid rgba(240,237,232,0.08)',
        }}
      >
        <div
          className="works-bar"
          style={{
            maxWidth: '1320px',
            margin: '0 auto',
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
        <div style={{ display: 'flex', gap: '28px' }}>
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              style={{
                fontSize: '10px',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: active === f ? '#F0EDE8' : '#8C8580',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '4px 0',
                borderBottom: `1px solid ${active === f ? '#C4A882' : 'transparent'}`,
                transition: 'color 0.2s, border-color 0.2s',
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* View toggle */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setViewMode('grid')}
            title="Grid view"
            style={{
              padding: '6px 10px',
              background: viewMode === 'grid' ? 'rgba(196,168,130,0.15)' : 'transparent',
              border: `1px solid ${viewMode === 'grid' ? '#C4A882' : 'rgba(240,237,232,0.15)'}`,
              color: viewMode === 'grid' ? '#C4A882' : '#8C8580',
              cursor: 'pointer',
              fontSize: '14px',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            ⊞
          </button>
          <button
            onClick={() => setViewMode('list')}
            title="List view"
            style={{
              padding: '6px 10px',
              background: viewMode === 'list' ? 'rgba(196,168,130,0.15)' : 'transparent',
              border: `1px solid ${viewMode === 'list' ? '#C4A882' : 'rgba(240,237,232,0.15)'}`,
              color: viewMode === 'list' ? '#C4A882' : '#8C8580',
              cursor: 'pointer',
              fontSize: '14px',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            ≡
          </button>
        </div>
        </div>
      </div>

      {/* Gallery - Grid or List view */}
      <div
        className={`pad-x works-grid ${viewMode === 'grid' ? 'works-grid--grid' : 'works-grid--list'}`}
        style={{
          padding: '48px',
          maxWidth: '1320px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns:
            viewMode === 'grid'
              ? 'repeat(auto-fill, minmax(280px, 1fr))'
              : '1fr',
          gap: viewMode === 'grid' ? '32px 24px' : '24px',
        }}
      >
        {filtered.map((artwork, i) => (
          <div
            key={artwork.slug}
            style={{
              display: viewMode === 'list' ? 'flex' : 'block',
              gap: viewMode === 'list' ? '24px' : undefined,
            }}
          >
            <div style={{ flex: viewMode === 'list' ? '0 0 200px' : undefined }}>
              <ArtworkCard artwork={artwork} priority={i < 3} />
            </div>
            {viewMode === 'list' && (
              <div style={{ flex: 1, paddingTop: '8px' }}>
                <h3
                  style={{
                    fontFamily: 'var(--font-cormorant), Georgia, serif',
                    fontSize: '18px',
                    fontWeight: 400,
                    color: '#F0EDE8',
                    margin: '0 0 8px 0',
                  }}
                >
                  {artwork.title}
                </h3>
                <p
                  style={{
                    fontSize: '12px',
                    color: '#8C8580',
                    margin: '0 0 12px 0',
                    lineHeight: 1.6,
                  }}
                >
                  {artwork.medium} • {artwork.year}
                </p>
                <p
                  style={{
                    fontSize: '13px',
                    color: '#A8A8A8',
                    margin: 0,
                    lineHeight: 1.6,
                  }}
                >
                  {artwork.description}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </PageTransition>
  )
}
