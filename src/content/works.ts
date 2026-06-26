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
    slug: 'undertow',
    title: 'Undertow',
    year: 2018,
    medium: 'Oil on Canvas',
    dimensions: 'Variable',
    category: 'painting',
    featured: true,
    description:
      'There are currents beneath us that no one sees. In our quietest moments, they pull us toward the things we have not yet learned to let go.',
    image: '/artworks/untitled-14.webp',
  },
  {
    slug: 'anxiety',
    title: 'Anxiety',
    year: 2018,
    medium: 'Mixed Media',
    dimensions: 'Variable',
    category: 'painting',
    featured: true,
    description:
      'My thoughts multiplied faster than my certainty, until even my own reflection became unfamiliar.',
    image: '/artworks/33634198_2059775930717871_5487711883404247040_n.jpg',
  },
  {
    slug: 'equilibrium',
    title: 'Equilibrium',
    year: 2017,
    medium: 'Oil on Canvas',
    dimensions: 'Variable',
    category: 'painting',
    featured: true,
    description:
      'Life is learning how to keep your balance while moving toward the unknown.',
    image: '/artworks/33744682_2059820704046727_6728685904115793920_n.jpg',
  },
  {
    slug: 'menor-de-edad',
    title: 'Menor De Edad',
    year: 2017,
    medium: 'Acrylic on Canvas',
    dimensions: 'Variable',
    category: 'painting',
    featured: true,
    description:
      'Only when she carried a life of her own did she begin to understand the weight her parents had carried every day.',
    image: '/artworks/33780784_2060278310667633_7603627152411459584_n.jpg',
  },
  {
    slug: 'detachment',
    title: 'Detachment',
    year: 2017,
    medium: 'Mixed Media',
    dimensions: 'Variable',
    category: 'mixed-media',
    description:
      'The conflict between reason and affection — knowing a relationship is harmful while remaining unable to abandon the bond formed through love, hope, and familiarity. The agony of emotional attachment.',
    image: '/artworks/33937652_2061543083874489_7806085107516702720_n.jpg',
  },
  {
    slug: 'catharsis',
    title: 'Catharsis',
    year: 2017,
    medium: 'Oil on Canvas',
    dimensions: 'Variable',
    category: 'painting',
    description:
      'Some wounds don’t bleed; they scream. Not to hurt anyone, but to save the soul carrying them.',
    image: '/artworks/34863362_2074721609223303_7982788763677884416_n.jpg',
  },
  {
    slug: 'voice',
    title: 'Voice',
    year: 2017,
    medium: 'Acrylic on Canvas',
    dimensions: 'Variable',
    category: 'painting',
    description: 'Some songs need a voice. Some hearts need a',
    image: '/artworks/35062890_2074731672555630_3190852446830198784_n.jpg',
  },
  {
    slug: 'painted-smile',
    title: 'Painted Smile',
    year: 2016,
    medium: 'Mixed Media on Canvas',
    dimensions: 'Variable',
    category: 'mixed-media',
    description:
      'A mask to hide, a heart to sacrifice. When the pain is too much, we paint on smiles with the blood of our own stories.',
    image: '/artworks/35067495_2074716539223810_3145555101796532224_n.jpg',
  },
  {
    slug: 'trust',
    title: 'Trust',
    year: 2016,
    medium: 'Oil on Canvas',
    dimensions: 'Variable',
    category: 'painting',
    description:
      'An apology acknowledges the wound, but trust carries the memory of how it was made.',
    image: '/artworks/36621650_2113332892028841_1825752398090469376_n.jpg',
  },
  {
    slug: 'tempest',
    title: 'Tempest',
    year: 2018,
    medium: 'Acrylic on Canvas',
    dimensions: 'Variable',
    category: 'painting',
    description:
      'We often carry our storms in silence, shielding the world from the rain we hold inside.',
    image: '/artworks/36860416_2116455891716541_3041009662167089152_n.jpg',
  },
  {
    slug: 'rise',
    title: 'Rise',
    year: 2022,
    medium: 'Mixed Media',
    dimensions: 'Variable',
    category: 'mixed-media',
    description:
      'I carried my scars upward, learning that rising is not the absence of pain, but the decision that pain will not have the final word.',
    image: '/artworks/36929292_2123992640962866_2568107907174367232_n.jpg',
  },
  {
    slug: 'instrument',
    title: 'Instrument',
    year: 2018,
    medium: 'Oil on Canvas',
    dimensions: 'Variable',
    category: 'painting',
    description: 'I was both the instrument and the one trying to repair it.',
    image: '/artworks/46829250_2330721466956648_6530189489405427712_n.jpg',
  },
  {
    slug: 'faith',
    title: 'Faith',
    year: 2018,
    medium: 'Acrylic on Canvas',
    dimensions: 'Variable',
    category: 'painting',
    description: 'Faith is creating before seeing.',
    image: '/artworks/52016131_2455502261145234_8939520431400943616_n.jpg',
  },
  {
    slug: 'reverie',
    title: 'Reverie',
    year: 2019,
    medium: 'Mixed Media on Canvas',
    dimensions: 'Variable',
    category: 'mixed-media',
    description: 'Memories — they somehow kill us in a good way.',
    image: '/artworks/71959559_2852338481461608_7816082447057027072_n.jpg',
  },
]

export const featuredWorks = works.filter((w) => w.featured)
