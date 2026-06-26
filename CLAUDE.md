# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Soul in Silence** is a contemporary fine-art portfolio website for John Patrick Lachica, a Filipino visual artist. The site showcases his artwork, artist statement, and brand identity with a refined dark gallery aesthetic featuring Cormorant Garamond and Inter typography, generous whitespace, and intentional interactions.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 3.4.1
- **Animation**: Framer Motion
- **Deployment**: Vercel (recommended)

## Project Structure

```
app/                              # Pages and layouts
├── layout.tsx                    # Root layout with metadata
├── page.tsx                      # Home page (hero + featured works)
├── globals.css                   # Global styles (dark theme)
├── about/page.tsx               # Artist bio and brand info
├── contact/page.tsx             # Inquiry and contact details
├── statement/page.tsx           # Full artist statement
├── cv/page.tsx                  # CV and exhibitions
└── works/
    ├── page.tsx                 # Gallery grid with filters
    └── [slug]/page.tsx          # Individual artwork detail page

components/                       # Reusable UI components
├── Navbar.tsx                   # Sticky header navigation
├── Footer.tsx                   # Global footer
├── PageTransition.tsx           # Framer Motion page transitions
├── PageHeader.tsx               # Section headers
├── FeaturedWork.tsx             # Featured artwork card
├── ArtworkCard.tsx              # Gallery grid card
└── SectionLabel.tsx             # Section labels

content/                          # Data files
├── works.ts                      # Artwork data and metadata
└── statement.ts                  # Artist statement text

public/                           # Static assets
└── artworks/                     # Artwork images (add here)
```

## Design System

### Colors (Tailwind Theme)
- `bg`: #0A0A0A (almost black background)
- `surface`: #111111 (slightly lighter surface)
- `card`: #161616 (card backgrounds)
- `text-primary`: #F0EDE8 (warm off-white text)
- `text-muted`: #8C8580 (muted secondary text)
- `accent`: #C4A882 (warm golden accent)

### Typography
- **Display**: Cormorant Garamond (serif, for headings)
  - Weights: 300 (light), 400 (regular), 500 (semibold)
  - Use for: h1, h2, h3, display text
- **Body**: Inter (sans-serif, for body text)
  - Weights: 300 (light), 400 (regular)
  - Use for: paragraphs, labels, navigation

### Spacing & Layout
- Generous whitespace (40px+ sections)
- Intentional 300-500ms transitions
- Museum-quality typography
- Responsive grid (single column mobile, 2-3 columns desktop)

## Key Files & Responsibilities

### Pages
- **Home** (`page.tsx`): Hero with tagline, featured works, artist statement teaser
- **Works** (`works/page.tsx`): Gallery grid with filter bar (All / Painting / Mixed Media / Drawing)
- **Work Detail** (`works/[slug]/page.tsx`): Full artwork view with prev/next navigation
- **About** (`about/page.tsx`): Artist bio, portrait section, brand info
- **Statement** (`statement/page.tsx`): Full artist statement (typographic focus)
- **CV** (`cv/page.tsx`): Exhibitions, education, press, collections
- **Contact** (`contact/page.tsx`): Inquiry form and contact details

### Components
- **Navbar**: Sticky header with navigation links, smooth transitions
- **Footer**: Contact info, location, copyright
- **PageTransition**: Framer Motion wrapper for page transitions
- **FeaturedWork**: Featured artwork card with hover states
- **ArtworkCard**: Gallery grid card (image + title + medium + year)
- **PageHeader**: Consistent section header styling

### Data
- **`content/works.ts`**: Array of artwork objects with metadata (slug, title, year, medium, dimensions, category, image, description)
- **`content/statement.ts`**: Artist statement text and brand copy

## Running the Project

```bash
# Install dependencies
pnpm install

# Start dev server (http://localhost:3000)
pnpm dev

# Build for production
pnpm build

# Start production build
pnpm start

# Lint code
pnpm lint
```

## Adding Artwork

1. **Add image**: Place JPG/PNG in `public/artworks/filename.jpg`
2. **Add data**: Update `content/works.ts` with new artwork object:
   ```typescript
   {
     slug: "unique-slug",
     title: "Artwork Title",
     year: 2024,
     medium: "Oil on canvas",
     dimensions: "100 × 80 cm",
     category: "painting", // 'painting' | 'mixed-media' | 'drawing'
     image: "/artworks/filename.jpg",
     description: "Short description for grid",
     // Optional
     narrative?: "Longer narrative for detail page",
   }
   ```
3. **Filter auto-generates** based on category

## Deployment

The site is optimized for **Vercel**:
1. Push to GitHub
2. Connect repo to Vercel
3. Deploys are automatic on push

No environment variables required.

## Brand Language & Tone

Avoid:
- Decorative language ("beautiful," "stunning")
- Generic inspiration ("follow your dreams")
- Diminutive words ("cute," "adorable")

Use:
- **vulnerability**, **resilience**, **transformation**
- **memory**, **symbolism**, **emotional landscape**
- **introspection**, **human condition**, **narrative**
- Contemporary fine art positioning
- Emotional storytelling and psychological depth

## Component Patterns

### Framer Motion Transitions
All pages wrap children in `PageTransition` for smooth fade/slide effects:
```tsx
import PageTransition from '@/components/PageTransition'

export default function Page() {
  return (
    <PageTransition>
      {/* Page content */}
    </PageTransition>
  )
}
```

### Gallery Filter
The Works page filters artworks by category:
- **All**: Show all artworks
- **Painting**: category: "painting"
- **Mixed Media**: category: "mixed-media"
- **Drawing**: category: "drawing"

Filtering is client-side with smooth transitions.

## Future Enhancements

- Image gallery lightbox
- Social media links
- Blog posts (creative process)
- Email/contact form handler (Formspree, etc.)
- Analytics (Vercel Analytics)

## Notes

- Artwork data is the single source of truth — keep `content/works.ts` up-to-date
- All links use `next/link` for client-side navigation
- Images should use Next.js `Image` component for optimization
- CSS uses Tailwind utilities with custom color palette
- Transitions are 300-500ms for intentional, gallery-like feel

# CLAUDE.md

## Project
Soul in Silence — fine-art portfolio for Filipino visual artist 
John Patrick Lachica. This is a gallery, not a web app.

## Stack
Next.js 16, TypeScript, Tailwind CSS, Framer Motion

## Single Source of Truth
- Artworks: src/content/works.ts
- Bio + Statement + CV: src/content/statement.ts
- Never duplicate content across files

## Design Rules
- Background: #0A0A0A always
- Accent #C4A882 for labels only — never as fill
- Fonts: Cormorant Garamond (headings) + Inter 300 (body)
- No gradients, shadows, glassmorphism, or emojis in UI
- Section padding minimum 80px vertical
- Artwork is always the primary focus

## Behavior
- Flag anything that looks like SaaS, startup, or template
- Ask before assuming on ambiguous requests
- Delete dead code, don't leave it
- No placeholder data visible on public pages