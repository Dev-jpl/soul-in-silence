import { initializeDatabase, getArtist, updateArtist } from '@/lib/jsondb'

initializeDatabase()

export async function GET() {
  try {
    const artist = getArtist()
    return Response.json(artist)
  } catch (error) {
    console.error('Error fetching artist info:', error)
    return Response.json({ error: 'Failed to fetch artist info' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    updateArtist(body)
    return Response.json({ success: true })
  } catch (error) {
    console.error('Error updating artist info:', error)
    return Response.json({ error: 'Failed to update artist info' }, { status: 500 })
  }
}
