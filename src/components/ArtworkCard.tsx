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
    </Link>
  )
}
