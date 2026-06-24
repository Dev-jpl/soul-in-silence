import { initializeDatabase, getDatabase } from '@/lib/db'

initializeDatabase()

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const db = getDatabase()

    db.prepare(
      `UPDATE artworks
       SET title = ?, year = ?, medium = ?, dimensions = ?, category = ?, description = ?, image = ?, featured = ?, updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`
    ).run(
      body.title,
      body.year,
      body.medium,
      body.dimensions,
      body.category,
      body.description,
      body.image,
      body.featured ? 1 : 0,
      id
    )

    return Response.json({ success: true })
  } catch (error) {
    console.error('Error updating artwork:', error)
    return Response.json({ error: 'Failed to update artwork' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const db = getDatabase()

    db.prepare('DELETE FROM artworks WHERE id = ?').run(id)

    return Response.json({ success: true })
  } catch (error) {
    console.error('Error deleting artwork:', error)
    return Response.json({ error: 'Failed to delete artwork' }, { status: 500 })
  }
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const db = getDatabase()

    const artwork = db.prepare('SELECT * FROM artworks WHERE id = ?').get(id)

    if (!artwork) {
      return Response.json({ error: 'Artwork not found' }, { status: 404 })
    }

    return Response.json(artwork)
  } catch (error) {
    console.error('Error fetching artwork:', error)
    return Response.json({ error: 'Failed to fetch artwork' }, { status: 500 })
  }
}
