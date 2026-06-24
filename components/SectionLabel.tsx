interface SectionLabelProps {
  children: React.ReactNode
}

export default function SectionLabel({ children }: SectionLabelProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        marginBottom: '48px',
      }}
    >
      <span
        style={{
          fontSize: '10px',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: '#C4A882',
          whiteSpace: 'nowrap',
        }}
      >
        {children}
      </span>
      <div
        style={{
          flex: 1,
          height: '1px',
          background: 'rgba(240,237,232,0.08)',
        }}
      />
    </div>
  )
}
