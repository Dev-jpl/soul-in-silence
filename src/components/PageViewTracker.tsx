'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { recordView } from '@/lib/views'

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
    recordView('page', pathname)
  }, [pathname])

  return null
}
