'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface SwipeNavProps {
  prevSlug?: string
  nextSlug?: string
}

// Mobile: swipe left → next artwork, swipe right → previous.
export default function SwipeNav({ prevSlug, nextSlug }: SwipeNavProps) {
  const router = useRouter()

  useEffect(() => {
    let startX = 0
    let startY = 0

    const onStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX
      startY = e.touches[0].clientY
    }

    const onEnd = (e: TouchEvent) => {
      const dx = e.changedTouches[0].clientX - startX
      const dy = e.changedTouches[0].clientY - startY
      // Require a clear, mostly-horizontal swipe
      if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) {
        if (dx < 0 && nextSlug) router.push(`/works/${nextSlug}`)
        else if (dx > 0 && prevSlug) router.push(`/works/${prevSlug}`)
      }
    }

    window.addEventListener('touchstart', onStart, { passive: true })
    window.addEventListener('touchend', onEnd, { passive: true })
    return () => {
      window.removeEventListener('touchstart', onStart)
      window.removeEventListener('touchend', onEnd)
    }
  }, [prevSlug, nextSlug, router])

  return null
}
