import React from 'react';

const LOGO_URL = "https://media.base44.com/images/public/69948c0d6b8aa61f49f0a23d/f3334ce99_logo-horizontal-white.svg";

export default function Logo({ size = 44, className = '' }) {
  return (
    <img
      src={LOGO_URL}
      alt="CrossFit Unbroken Spirit"
      className={`flex-shrink-0 object-contain ${className}`}
      style={{ height: `${size}px`, width: 'auto' }}
    />
  );
}