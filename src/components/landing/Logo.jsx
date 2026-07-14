import React from 'react';

export default function Logo({ size = 40 }) {
  return (
    <img 
      src="https://media.base44.com/images/public/69948c0d6b8aa61f49f0a23d/80aec776e_WhatsAppImage2026-07-06at141753.jpg"
      alt="CrossFit Unbroken Spirit"
      height={size}
      className="flex-shrink-0 object-contain"
      style={{ width: 'auto', height: `${size}px` }}
    />
  );
}