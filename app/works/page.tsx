'use client'

import { useState } from 'react'
import { works } from '@/content/works'
import type { Artwork } from '@/content/works'
import ArtworkCard from '@/components/ArtworkCard'
import PageHeader from '@/components/PageHeader'
import PageTransition from '@/components/PageTransition'

const filters = ['All', 'Painting', 'Mixed Media', 'Drawing'] as const
type Filter = (typeof filters)[number]

function categoryMatch(artwork: Artwork, filter: Filter) {
  if (filter === 'All') return true
  if (filter === 'Painting') return artwork.category === 'painting'
  if (filter === 'Mixed Media') return artwork.category === 'mixed-media'
  if (filter === 'Drawing') return artwork.category === 'drawing'
  return true
}

export default function WorksPage() {
  const [active, setActive] = useState<Filter>('All')
  const filtered = works.filter((w) => categoryMatch(w, active))

  return (
    <PageTransition>
      <PageHeader
        title="Works"
        description="A body of work exploring vulnerability, resilience, and the emotional landscapes of human experience."
      />

      {/* Filter bar */}
      <div
        style={{
          display: 'flex',
          gap: '28px',
          padding: '24px 48px',
          borderBottom: '1px solid rgba(240,237,232,0.08)',
        }}
      >
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

      {/* Gallery grid */}
      <div
        style={{
          padding: '48px',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '32px 24px',
        }}
      >
        {filtered.map((artwork, i) => (
          <ArtworkCard key={artwork.slug} artwork={artwork} priority={i < 3} />
        ))}
      </div>
    </PageTransition>
  )
}
