import { initializeDatabase, getDatabase } from '@/lib/db'

// Initialize database on first request
initializeDatabase()

export async function GET() {
  try {
    const db = getDatabase()
    const artworks = db.prepare('SELECT * FROM artworks ORDER BY created_at DESC').all()
    return Response.json(artworks)
  } catch (error) {
    console.error('Error fetching artworks:', error)
    return Response.json({ error: 'Failed to fetch artworks' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const db = getDatabase()

    const result = db
      .prepare(
        `INSERT INTO artworks (slug, title, year, medium, dimensions, category, description, image, featured)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
      )
      .run(
        body.slug,
        body.title,
        body.year,
        body.medium,
        body.dimensions,
        body.category,
        body.description,
        body.image,
        body.featured ? 1 : 0
      )

    return Response.json({ id: result.lastInsertRowid }, { status: 201 })
  } catch (error) {
    console.error('Error creating artwork:', error)
    return Response.json({ error: 'Failed to create artwork' }, { status: 500 })
  }
}
