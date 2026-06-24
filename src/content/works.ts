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
    slug: 'untitled-1',
    title: 'Untitled Series I',
    year: 2024,
    medium: 'Mixed Media',
    dimensions: 'Variable',
    category: 'painting',
    featured: true,
    description:
      'A meditation on vulnerability and resilience. Layered forms emerge from shadow, exploring the spaces between memory and presence.',
    image: '/artworks/33634198_2059775930717871_5487711883404247040_n.jpg',
  },
  {
    slug: 'untitled-2',
    title: 'Untitled Series II',
    year: 2024,
    medium: 'Oil on Canvas',
    dimensions: 'Variable',
    category: 'painting',
    featured: true,
    description:
      'An exploration of emotional landscapes where figures dissolve into light and shadow. The work invites viewers into a space of quiet introspection.',
    image: '/artworks/33744682_2059820704046727_6728685904115793920_n.jpg',
  },
  {
    slug: 'untitled-3',
    title: 'Untitled Series III',
    year: 2024,
    medium: 'Acrylic on Canvas',
    dimensions: 'Variable',
    category: 'painting',
    featured: true,
    description:
      'A meditation on resilience rendered through expressive brushwork. The composition speaks to the quiet strength found in vulnerability.',
    image: '/artworks/33780784_2060278310667633_7603627152411459584_n.jpg',
  },
  {
    slug: 'untitled-4',
    title: 'Untitled Series IV',
    year: 2023,
    medium: 'Mixed Media',
    dimensions: 'Variable',
    category: 'mixed-media',
    description:
      'Fragments of memory and presence layer into a psychological landscape. This work explores the space between loss and becoming.',
    image: '/artworks/33937652_2061543083874489_7806085107516702720_n.jpg',
  },
  {
    slug: 'untitled-5',
    title: 'Untitled Series V',
    year: 2023,
    medium: 'Oil on Canvas',
    dimensions: 'Variable',
    category: 'painting',
    description:
      'An intimate exploration of the inner world. Warm tones meet deep shadows in a composition that speaks to transformation and healing.',
    image: '/artworks/34863362_2074721609223303_7982788763677884416_n.jpg',
  },
  {
    slug: 'untitled-6',
    title: 'Untitled Series VI',
    year: 2023,
    medium: 'Acrylic on Canvas',
    dimensions: 'Variable',
    category: 'painting',
    description:
      'Emotional narratives rendered through expressive form. The composition invites viewers to find their own reflection within the work.',
    image: '/artworks/35062890_2074731672555630_3190852446830198784_n.jpg',
  },
  {
    slug: 'untitled-7',
    title: 'Untitled Series VII',
    year: 2023,
    medium: 'Mixed Media on Canvas',
    dimensions: 'Variable',
    category: 'mixed-media',
    description:
      'A layered exploration of presence and absence. This work speaks to the resilience found in vulnerability and the beauty in impermanence.',
    image: '/artworks/35067495_2074716539223810_3145555101796532224_n.jpg',
  },
  {
    slug: 'untitled-8',
    title: 'Untitled Series VIII',
    year: 2023,
    medium: 'Oil on Canvas',
    dimensions: 'Variable',
    category: 'painting',
    description:
      'An emotional landscape where memory and presence converge. The composition explores the quiet terrain of transformation.',
    image: '/artworks/36621650_2113332892028841_1825752398090469376_n.jpg',
  },
  {
    slug: 'untitled-9',
    title: 'Untitled Series IX',
    year: 2023,
    medium: 'Acrylic on Canvas',
    dimensions: 'Variable',
    category: 'painting',
    description:
      'An exploration of vulnerability through expressive form. This work invites intimate engagement with the spaces between loss and healing.',
    image: '/artworks/36860416_2116455891716541_3041009662167089152_n.jpg',
  },
  {
    slug: 'untitled-10',
    title: 'Untitled Series X',
    year: 2022,
    medium: 'Mixed Media',
    dimensions: 'Variable',
    category: 'mixed-media',
    description:
      'A meditation on memory and time. Layered elements create a psychological landscape that speaks to the persistence of emotion.',
    image: '/artworks/36929292_2123992640962866_2568107907174367232_n.jpg',
  },
  {
    slug: 'untitled-11',
    title: 'Untitled Series XI',
    year: 2022,
    medium: 'Oil on Canvas',
    dimensions: 'Variable',
    category: 'painting',
    description:
      'An intimate work exploring the inner world. The composition speaks to the courage required to remain present with difficult emotion.',
    image: '/artworks/46829250_2330721466956648_6530189489405427712_n.jpg',
  },
  {
    slug: 'untitled-12',
    title: 'Untitled Series XII',
    year: 2022,
    medium: 'Acrylic on Canvas',
    dimensions: 'Variable',
    category: 'painting',
    description:
      'A narrative rendered through expressive brushwork. This work explores the space between self and other, presence and memory.',
    image: '/artworks/52016131_2455502261145234_8939520431400943616_n.jpg',
  },
  {
    slug: 'untitled-13',
    title: 'Untitled Series XIII',
    year: 2022,
    medium: 'Mixed Media on Canvas',
    dimensions: 'Variable',
    category: 'mixed-media',
    description:
      'An exploration of resilience and transformation. The layered composition speaks to the quiet strength found in vulnerability and acceptance.',
    image: '/artworks/71959559_2852338481461608_7816082447057027072_n.jpg',
  },
]

export const featuredWorks = works.filter((w) => w.featured)
