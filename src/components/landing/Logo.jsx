import React from 'react';

export default function Logo({ size = 40 }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="flex-shrink-0"
    >
      {/* Background square */}
      <rect width="100" height="100" rx="16" fill="url(#bgGradient)" />
      
      {/* Kettlebell left part */}
      <path
        d="M30 45 L30 65 Q30 70 35 70 L42 70 L42 45 Q42 40 37 40 L35 40 Q30 40 30 45 Z"
        fill="#3B82F6"
        opacity="0.9"
      />
      
      {/* Kettlebell right part */}
      <path
        d="M58 45 L58 70 L65 70 Q70 70 70 65 L70 45 Q70 40 65 40 L63 40 Q58 40 58 45 Z"
        fill="#3B82F6"
        opacity="0.9"
      />
      
      {/* Kettlebell handle */}
      <path
        d="M42 35 Q42 28 50 28 Q58 28 58 35 L58 45 L42 45 Z"
        fill="#60A5FA"
      />
      
      {/* Flame breaking through */}
      <g transform="translate(50, 50)">
        {/* Main flame */}
        <path
          d="M0 -15 Q-5 -8 -3 0 Q-2 8 0 12 Q2 8 3 0 Q5 -8 0 -15 Z"
          fill="url(#flameGradient)"
        />
        {/* Left flame */}
        <path
          d="M-6 -8 Q-8 -3 -7 2 Q-6 6 -4 8 Q-3 5 -2 2 Q-1 -3 -6 -8 Z"
          fill="url(#flameGradient)"
          opacity="0.8"
        />
        {/* Right flame */}
        <path
          d="M6 -8 Q8 -3 7 2 Q6 6 4 8 Q3 5 2 2 Q1 -3 6 -8 Z"
          fill="url(#flameGradient)"
          opacity="0.8"
        />
        {/* Inner glow */}
        <ellipse cx="0" cy="0" rx="4" ry="6" fill="#FCD34D" opacity="0.6" />
      </g>
      
      {/* Crack effect on left kettlebell */}
      <path
        d="M42 50 L30 50 M40 55 L32 55 M41 60 L33 60"
        stroke="#1E293B"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.3"
      />
      
      {/* Crack effect on right kettlebell */}
      <path
        d="M58 50 L70 50 M60 55 L68 55 M59 60 L67 60"
        stroke="#1E293B"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.3"
      />
      
      {/* Gradients */}
      <defs>
        <linearGradient id="bgGradient" x1="0" y1="0" x2="100" y2="100">
          <stop offset="0%" stopColor="#1E293B" />
          <stop offset="100%" stopColor="#0F172A" />
        </linearGradient>
        <linearGradient id="flameGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FB923C" />
          <stop offset="50%" stopColor="#F97316" />
          <stop offset="100%" stopColor="#EA580C" />
        </linearGradient>
      </defs>
    </svg>
  );
}