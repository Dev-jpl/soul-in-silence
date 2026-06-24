# Soul in Silence — Portfolio Website
**John Patrick Lachica · Contemporary Filipino Visual Artist**

---

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Add Your Artwork Images

The site is ready — you just need to add your images.

### Required images

Place all images in `/public/images/`:

| File path | Used for |
|-----------|----------|
| `/public/images/hero.jpg` | Home page full-bleed hero |
| `/public/images/artist-portrait.jpg` | About page portrait |
| `/public/images/works/where-words-fall-short.jpg` | Work #1 |
| `/public/images/works/remnants.jpg` | Work #2 |
| `/public/images/works/threshold.jpg` | Work #3 |
| `/public/images/works/still-i-rise.jpg` | Work #4 |
| `/public/images/works/interior.jpg` | Work #5 |
| `/public/images/works/shoreline-memory.jpg` | Work #6 |

### Image tips
- **Artwork photos**: shoot against a neutral wall, square or portrait orientation works best
- **Hero image**: landscape or large portrait crop, at least 1800px wide
- **Artist portrait**: any format, cropped to show face and upper body
- Use `.jpg` for photos, `.png` if you need transparency

---

## Add or Edit Works

Open `/content/works.ts` and edit the `works` array.

Each artwork has:
```ts
{
  slug: 'your-work-slug',         // URL: /works/your-work-slug
  title: 'Work Title',
  year: 2024,
  medium: 'Oil on Canvas',
  dimensions: '90 × 70 cm',
  category: 'painting',           // 'painting' | 'mixed-media' | 'drawing'
  description: 'About this work...',
  image: '/images/works/filename.jpg',
  featured: true,                 // shows on home page (max 3)
}
```

---

## Edit Written Content

- **Artist Statement**: `/content/statement.ts` → `artistStatement`
- **CV**: `/content/statement.ts` → `cvData`
- **Contact details**: `/app/contact/page.tsx` — find the array of `{ label, value }` items

---

## Pages

| Route | File |
|-------|------|
| `/` | `app/page.tsx` |
| `/works` | `app/works/page.tsx` |
| `/works/[slug]` | `app/works/[slug]/page.tsx` |
| `/about` | `app/about/page.tsx` |
| `/statement` | `app/statement/page.tsx` |
| `/cv` | `app/cv/page.tsx` |
| `/contact` | `app/contact/page.tsx` |

---

## Tech Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** (page fade-in only)
- **Google Fonts**: Cormorant Garamond + Inter

---

## Deploy

The easiest way is [Vercel](https://vercel.com):

```bash
npm install -g vercel
vercel
```

Or push to GitHub and connect to Vercel — it deploys automatically on every push.
