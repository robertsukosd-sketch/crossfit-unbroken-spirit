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
        <linearGradient id="spiralGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#2563eb" />
        </linearGradient>
      </defs>

      {/* Infinite spiral/circle representing unbroken */}
      <g strokeLinecap="round" strokeLinejoin="round">
        {/* Outer spiral arc - left side */}
        <path
          d="M 8 20 Q 8 10 18 10 Q 28 10 28 20"
          fill="none"
          stroke="url(#spiralGrad)"
          strokeWidth="2.2"
        />
        
        {/* Inner connecting arc - right side */}
        <path
          d="M 28 20 Q 28 30 18 30 Q 8 30 8 20"
          fill="none"
          stroke="url(#spiralGrad)"
          strokeWidth="2.2"
          opacity="0.7"
        />

        {/* Center geometric accent - barbell inspired */}
        <circle cx="20" cy="20" r="3.5" fill="#0ea5e9" />
        <rect x="14" y="19" width="12" height="2" fill="#2563eb" opacity="0.8" />
        
        {/* Small circles on sides - weight plates */}
        <circle cx="12" cy="20" r="2" fill="#0ea5e9" opacity="0.6" />
        <circle cx="28" cy="20" r="2" fill="#2563eb" opacity="0.6" />
      </g>
    </svg>
  );
}