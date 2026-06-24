import { initializeDatabase, getArtworks, createArtwork } from '@/lib/jsondb'

initializeDatabase()

export async function GET() {
  try {
    const artworks = getArtworks()
    return Response.json(artworks)
  } catch (error) {
    console.error('Error fetching artworks:', error)
    return Response.json({ error: 'Failed to fetch artworks' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const artwork = createArtwork(body)
    return Response.json({ id: artwork.id }, { status: 201 })
  } catch (error) {
    console.error('Error creating artwork:', error)
    return Response.json({ error: 'Failed to create artwork' }, { status: 500 })
  }
}
