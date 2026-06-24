export default function Logo() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'inline-block', verticalAlign: 'middle' }}
    >
      {/* Outer circle - represents wholeness */}
      <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="1.5" />

      {/* Inner dot - represents the soul */}
      <circle cx="12" cy="12" r="3" fill="currentColor" />

      {/* Two subtle lines - represents silence/quietness */}
      <line
        x1="6"
        y1="12"
        x2="9"
        y2="12"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.6"
      />
      <line
        x1="15"
        y1="12"
        x2="18"
        y2="12"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.6"
      />
    </svg>
  )
}
