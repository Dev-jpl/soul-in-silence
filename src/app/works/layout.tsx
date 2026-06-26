import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Works',
  description:
    'A body of work by John Patrick Lachica exploring vulnerability, resilience, and the emotional landscapes of human experience. Paintings, mixed media, and drawings — available for acquisition and commission.',
  alternates: { canonical: '/works' },
  openGraph: {
    title: 'Works · Soul in Silence',
    description:
      'Paintings, mixed media, and drawings by John Patrick Lachica — available for acquisition and commission.',
    type: 'website',
  },
}

export default function WorksLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
