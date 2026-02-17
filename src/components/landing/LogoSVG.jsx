export default function LogoSVG({ size = 40 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex-shrink-0"
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#0ea5e9', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#2563eb', stopOpacity: 1 }} />
        </linearGradient>
      </defs>

      {/* Background circle */}
      <circle cx="20" cy="20" r="19" fill="none" stroke="url(#logoGradient)" strokeWidth="1.5" opacity="0.5" />

      {/* Main shape - stylized "U" for Unbroken */}
      <path
        d="M 10 8 L 10 22 C 10 28 14 32 20 32 C 26 32 30 28 30 22 L 30 8"
        fill="none"
        stroke="url(#logoGradient)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Top accent bars */}
      <line x1="12" y1="8" x2="16" y2="8" stroke="#0ea5e9" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="24" y1="8" x2="28" y2="8" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" />

      {/* Center accent */}
      <circle cx="20" cy="20" r="3" fill="url(#logoGradient)" />
    </svg>
  );
}