export type Artwork = {
  slug: string
  title: string
  year: number
  medium: string
  dimensions: string
  category: 'painting' | 'mixed-media' | 'drawing'
  description: string
  image: string
  featured?: boolean
}

export const works: Artwork[] = [
  {
    slug: 'where-words-fall-short',
    title: 'Where Words Fall Short',
    year: 2024,
    medium: 'Oil on Canvas',
    dimensions: '120 × 90 cm',
    category: 'painting',
    featured: true,
    description:
      'A meditation on the limits of language — the vast emotional terrain that exists beyond articulation. Figures emerge and dissolve in a field of warm ochre and deep shadow, reaching toward something unnamed.',
    image: '/images/works/where-words-fall-short.jpg',
  },
  {
    slug: 'remnants',
    title: 'Remnants',
    year: 2024,
    medium: 'Mixed Media on Board',
    dimensions: '80 × 60 cm',
    category: 'mixed-media',
    featured: true,
    description:
      'Fragments of memory — torn, layered, and pressed into surface. What remains after grief is not emptiness, but texture. This work explores the physical residue of emotional experience.',
    image: '/images/works/remnants.jpg',
  },
  {
    slug: 'threshold',
    title: 'Threshold',
    year: 2023,
    medium: 'Acrylic on Canvas',
    dimensions: '100 × 75 cm',
    category: 'painting',
    featured: true,
    description:
      'Standing at the edge of transformation — neither here nor there. The threshold is not a place of arrival but of becoming. Warm amber light bleeds into a field of deep shadow.',
    image: '/images/works/threshold.jpg',
  },
  {
    slug: 'still-i-rise',
    title: 'Still, I Rise',
    year: 2023,
    medium: 'Charcoal on Paper',
    dimensions: '90 × 70 cm',
    category: 'drawing',
    description:
      'Resilience rendered in charcoal — the quiet, persistent act of returning to oneself. A single vertical form ascends through layers of grey, reaching toward an unseen light.',
    image: '/images/works/still-i-rise.jpg',
  },
  {
    slug: 'interior',
    title: 'Interior',
    year: 2022,
    medium: 'Oil on Canvas',
    dimensions: '140 × 100 cm',
    category: 'painting',
    description:
      'An exploration of the inner world — the private rooms of the self that no one else enters. Deep reds and near-blacks construct an intimate, psychologically charged space.',
    image: '/images/works/interior.jpg',
  },
  {
    slug: 'shoreline-memory',
    title: 'Shoreline Memory',
    year: 2022,
    medium: 'Mixed Media on Canvas',
    dimensions: '80 × 60 cm',
    category: 'mixed-media',
    description:
      'Memory as shoreline — where the known and the vast unknown meet. Sand, pigment, and encaustic wax hold impressions of what was felt but never fully understood.',
    image: '/images/works/shoreline-memory.jpg',
  },
]

export const featuredWorks = works.filter((w) => w.featured)
