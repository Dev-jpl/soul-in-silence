interface PageHeaderProps {
  title: string
  description?: string
  eyebrow?: string
}

export default function PageHeader({ title, description, eyebrow }: PageHeaderProps) {
  return (
    <div
      className="pad-x"
      style={{
        padding: '80px 48px 48px',
        borderBottom: '1px solid rgba(240,237,232,0.08)',
      }}
    >
      <div style={{ maxWidth: '1320px', margin: '0 auto', width: '100%' }}>
      {eyebrow && (
        <p
          style={{
            fontSize: '10px',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#C4A882',
            marginBottom: '20px',
          }}
        >
          {eyebrow}
        </p>
      )}
      <h1
        style={{
          fontFamily: 'var(--font-cormorant), Georgia, serif',
          fontSize: '48px',
          fontWeight: 300,
          letterSpacing: '-0.01em',
          color: '#F0EDE8',
          marginBottom: description ? '12px' : 0,
        }}
      >
        {title}
      </h1>
      {description && (
        <p
          style={{
            fontSize: '13px',
            color: '#8C8580',
            lineHeight: 1.8,
            maxWidth: '440px',
          }}
        >
          {description}
        </p>
      )}
      </div>
    </div>
  )
}
