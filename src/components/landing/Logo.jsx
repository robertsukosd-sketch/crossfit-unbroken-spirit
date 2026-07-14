import React from 'react';

const LOGO_URL = "https://media.base44.com/images/public/69948c0d6b8aa61f49f0a23d/80aec776e_WhatsAppImage2026-07-06at141753.jpg";

export default function Logo({ size = 40 }) {
  return (
    <img
      src={LOGO_URL}
      alt="CrossFit Unbroken Spirit"
      className="flex-shrink-0 object-cover"
      style={{
        width: `${size * 1.6}px`,
        height: `${size}px`,
        objectPosition: 'center top',
      }}
    />
  );
}