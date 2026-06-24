export default function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid rgba(240,237,232,0.08)',
        padding: '32px 48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-cormorant), Georgia, serif',
          fontSize: '13px',
          letterSpacing: '0.12em',
          color: '#8C8580',
        }}
      >
        Soul in Silence · John Patrick Lachica
      </span>
      <span
        style={{
          fontSize: '10px',
          letterSpacing: '0.1em',
          color: 'rgba(140,133,128,0.5)',
        }}
      >
        © {new Date().getFullYear()} — Manila, Philippines
      </span>
    </footer>
  )
}
