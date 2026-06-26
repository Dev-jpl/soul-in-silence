import Link from 'next/link'
import Image from 'next/image'
import type { Artwork } from '@/content/works'

interface ArtworkCardProps {
  artwork: Artwork
  priority?: boolean
}

export default function ArtworkCard({ artwork, priority = false }: ArtworkCardProps) {
  return (
    <Link href={`/works/${artwork.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
      <div style={{ position: 'relative', overflow: 'hidden', background: '#161616' }}>
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
            style={{ objectFit: 'cover' }}
          />
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
