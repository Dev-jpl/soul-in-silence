'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { supabase } from '@/lib/supabase'

// Increments a per-page view count in Supabase on each route change.
// Skips localhost, the admin, and artwork detail pages (those are counted separately).
export default function PageViewTracker() {
  const pathname = usePathname()
  const last = useRef<string | null>(null)

  useEffect(() => {
    if (!pathname || last.current === pathname) return

    const host = window.location.hostname
    if (host === 'localhost' || host === '127.0.0.1' || host.endsWith('.local')) return
    if (pathname.startsWith('/admin')) return
    if (/^\/works\/.+/.test(pathname)) return // artwork detail → tracked as artwork views

    last.current = pathname
    if (supabase) {
      supabase.rpc('record_view', { p_kind: 'page', p_ref: pathname }).then(({ error }) => {
        if (error) console.error('page view error', error.message)
      })
    }
  }, [pathname])

  return null
}
