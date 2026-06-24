import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0A0A0A',
        surface: '#111111',
        card: '#161616',
        'text-primary': '#F0EDE8',
        'text-muted': '#8C8580',
        accent: '#C4A882',
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
        body: ['var(--font-inter)', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.22em',
        widest3: '0.18em',
      },
    },
  },
  plugins: [],
}

export default config
