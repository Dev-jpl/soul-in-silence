import { initializeDatabase, getDatabase } from '@/lib/db'

initializeDatabase()

export async function GET() {
  try {
    const db = getDatabase()
    const artist = db.prepare('SELECT * FROM artist_info WHERE id = 1').get()
    return Response.json(artist)
  } catch (error) {
    console.error('Error fetching artist info:', error)
    return Response.json({ error: 'Failed to fetch artist info' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const db = getDatabase()

    db.prepare(
      `UPDATE artist_info
       SET name = ?, bio = ?, statement = ?, updated_at = CURRENT_TIMESTAMP
       WHERE id = 1`
    ).run(body.name, body.bio, body.statement)

    return Response.json({ success: true })
  } catch (error) {
    console.error('Error updating artist info:', error)
    return Response.json({ error: 'Failed to update artist info' }, { status: 500 })
  }
}
