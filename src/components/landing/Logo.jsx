import React from 'react';

const BLUE = '#67C8ED';
const PINK = '#F2A0B1';

function WingBlades() {
  return (
    <>
      {/* top blade — light blue */}
      <path d="M146 44 L197 30 L201 38 L150 56 Z" fill={BLUE} />
      {/* middle blade — pink */}
      <path d="M150 60 L199 57 L201 65 L152 71 Z" fill={PINK} />
      {/* bottom blade — light blue */}
      <path d="M150 82 L194 95 L187 103 L148 91 Z" fill={BLUE} />
    </>
  );
}

export default function Logo({ size = 40, className = '' }) {
  return (
    <svg
      viewBox="0 0 240 160"
      width={size}
      height={size * (160 / 240)}
      className={`flex-shrink-0 ${className}`}
      role="img"
      aria-label="CrossFit Unbroken Spirit"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* sword — behind skull, diagonal bottom-left → top-right */}
      <line x1="60" y1="150" x2="180" y2="22" stroke={BLUE} strokeWidth="3.2" strokeLinecap="round" />
      <line x1="60" y1="150" x2="180" y2="22" stroke="#ffffff" strokeWidth="0.8" strokeLinecap="round" opacity="0.25" />

      {/* RIGHT wing */}
      <WingBlades />

      {/* LEFT wing (mirrored) */}
      <g transform="scale(-1,1) translate(-240,0)">
        <WingBlades />
      </g>

      {/* SKULL — single path with cutouts (eyes, nose, teeth) via evenodd */}
      <path
        fill={BLUE}
        fillRule="evenodd"
        d="
          M92 52
          C92 33 109 33 120 33
          C131 33 148 33 148 52
          L148 79 L141 87 L137 107 L103 107 L99 87 L92 79 Z
          M101 57 L117 55 L115 70 L103 70 Z
          M139 57 L123 55 L125 70 L137 70 Z
          M117 75 L123 75 L120 85 Z
          M104 99 L109 99 L109 106 L104 106 Z
          M111 99 L116 99 L116 106 L111 106 Z
          M118 99 L122 99 L122 106 L118 106 Z
          M124 99 L129 99 L129 106 L124 106 Z
          M131 99 L136 99 L136 106 L131 106 Z
        "
      />
    </svg>
  );
}