'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import type { Artwork } from '@/content/works'

export default function FeaturedWork({
  artwork,
  tall = false,
}: {
  artwork: Artwork
  tall?: boolean
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <Link
      href={`/works/${artwork.slug}`}
      style={{ display: 'block', textDecoration: 'none' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          position: 'relative',
          overflow: 'hidden',
          background: '#161616',
          aspectRatio: tall ? 'unset' : '4/5',
          height: tall ? '100%' : undefined,
          minHeight: tall ? '560px' : undefined,
        }}
      >
        <Image
          src={artwork.image}
          alt={artwork.title}
          fill
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
            padding: '28px',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: tall ? '24px' : '20px',
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
              transition: 'opacity 0.3s 0.06s',
            }}
          >
            {artwork.medium} · {artwork.year}
          </p>
        </div>
      </div>
    </Link>
  )
}
