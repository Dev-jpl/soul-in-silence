import { initializeDatabase, getArtwork, updateArtwork, deleteArtwork } from '@/lib/jsondb'

initializeDatabase()

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    updateArtwork(parseInt(id), body)
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
    deleteArtwork(parseInt(id))
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
    const artwork = getArtwork(parseInt(id))

    if (!artwork) {
      return Response.json({ error: 'Artwork not found' }, { status: 404 })
    }

    return Response.json(artwork)
  } catch (error) {
    console.error('Error fetching artwork:', error)
    return Response.json({ error: 'Failed to fetch artwork' }, { status: 500 })
  }
}
