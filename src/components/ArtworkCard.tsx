'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import type { Artwork } from '@/content/works'

interface ArtworkCardProps {
  artwork: Artwork
  priority?: boolean
}

export default function ArtworkCard({ artwork, priority = false }: ArtworkCardProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <Link href={`/works/${artwork.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ position: 'relative', overflow: 'hidden', background: '#161616' }}
      >
        <div
          style={{
            aspectRatio: '4/5',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Image
            src={artwork.image}
            alt={artwork.title}
            fill
            priority={priority || false}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{
              objectFit: 'cover',
              transform: hovered ? 'scale(1.03)' : 'scale(1)',
              transition: 'transform 0.6s ease',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: hovered ? 'rgba(10,10,10,0.65)' : 'rgba(10,10,10,0)',
              transition: 'background 0.3s ease',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: '24px',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-cormorant), Georgia, serif',
                fontSize: '20px',
                fontWeight: 300,
                color: '#F0EDE8',
                opacity: hovered ? 1 : 0,
                transform: hovered ? 'translateY(0)' : 'translateY(10px)',
                transition: 'opacity 0.3s, transform 0.3s',
                marginBottom: '4px',
              }}
            >
              {artwork.title}
            </p>
            <p
              style={{
                fontSize: '10px',
                letterSpacing: '0.14em',
                color: '#C4A882',
                opacity: hovered ? 1 : 0,
                transition: 'opacity 0.3s 0.05s',
              }}
            >
              {artwork.medium} · {artwork.year}
            </p>
          </div>
        </div>
      </div>
      <div style={{ padding: '14px 0 6px' }}>
        <p
          style={{
            fontFamily: 'var(--font-cormorant), Georgia, serif',
            fontSize: '17px',
            fontWeight: 400,
            color: '#F0EDE8',
          }}
        >
          {artwork.title}
        </p>
        <p
          style={{
            fontSize: '11px',
            color: '#8C8580',
            marginTop: '3px',
            letterSpacing: '0.06em',
          }}
        >
          {artwork.medium} — {artwork.dimensions} — {artwork.year}
        </p>
      </div>
    </Link>
  )
}
