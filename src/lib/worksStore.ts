'use client'

import { useEffect, useState } from 'react'
import { works as seed, type Artwork } from '@/content/works'

export type { Artwork }

// Front-end-only store: artworks live in localStorage as a writable JSON array,
// seeded from src/content/works.ts. No backend. Changes persist per-browser;
// use the admin "Export JSON" to publish them into works.ts for all visitors.
const KEY = 'sns_works'
const CHANGE_EVENT = 'sns_works_changed'

export function loadWorks(): Artwork[] {
  if (typeof window === 'undefined') return seed
  try {
    const raw = window.localStorage.getItem(KEY)
    if (!raw) return seed
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? (parsed as Artwork[]) : seed
  } catch {
    return seed
  }
}

export function saveWorks(list: Artwork[]) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(KEY, JSON.stringify(list))
  window.dispatchEvent(new Event(CHANGE_EVENT))
}

export function resetWorks() {
  if (typeof window === 'undefined') return
  window.localStorage.removeItem(KEY)
  window.dispatchEvent(new Event(CHANGE_EVENT))
}

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function uniqueSlug(title: string, list: Artwork[], ignoreSlug?: string): string {
  const base = slugify(title) || 'untitled'
  let slug = base
  let n = 2
  while (list.some((w) => w.slug === slug && w.slug !== ignoreSlug)) {
    slug = `${base}-${n++}`
  }
  return slug
}

/** React hook returning the current works list, kept in sync across tabs/edits. */
export function useWorks(): { works: Artwork[]; ready: boolean } {
  const [list, setList] = useState<Artwork[]>(seed)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setList(loadWorks())
    setReady(true)
    const handler = () => setList(loadWorks())
    window.addEventListener(CHANGE_EVENT, handler)
    window.addEventListener('storage', handler)
    return () => {
      window.removeEventListener(CHANGE_EVENT, handler)
      window.removeEventListener('storage', handler)
    }
  }, [])

  return { works: list, ready }
}
