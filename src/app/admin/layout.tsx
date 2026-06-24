import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin • Soul in Silence',
  robots: {
    index: false,
    follow: false,
  },
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <style>{`
        body {
          margin: 0;
          padding: 0;
        }
      `}</style>
      {children}
    </div>
  )
}
