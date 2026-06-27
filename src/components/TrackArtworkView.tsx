'use client'

import { useEffect, useRef } from 'react'
import { track } from '@vercel/analytics'
import { supabase } from '@/lib/supabase'

interface Props {
  slug: string
  title: string
}

// Records an artwork view: a Vercel Analytics event + an increment in Supabase
// (the latter powers the per-artwork counts shown in the admin dashboard).
export default function TrackArtworkView({ slug, title }: Props) {
  // Guard so React StrictMode's double-invoke (dev) counts a view only once per artwork.
  const counted = useRef<string | null>(null)

  useEffect(() => {
    if (counted.current === slug) return
    counted.current = slug

    // Don't count views from a local machine — only deployed (preview/prod).
    const host = window.location.hostname
    const isLocal =
      host === 'localhost' || host === '127.0.0.1' || host.endsWith('.local')
    if (isLocal) return

    track('artwork_view', { slug, title })
    if (supabase) {
      supabase.rpc('record_view', { p_kind: 'artwork', p_ref: slug }).then(({ error }) => {
        if (error) console.error('view count error', error.message)
      })
    }
  }, [slug, title])

  return null
}
