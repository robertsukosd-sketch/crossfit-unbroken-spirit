import React from 'react';

export default function Logo({ size = 40 }) {
  return (
    <img 
      src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69948c0d6b8aa61f49f0a23d/6f20a4dfe_image.png"
      alt="CrossFit Unbroken Spirit"
      width={size}
      height={size}
      className="flex-shrink-0 object-contain"
      style={{ filter: 'drop-shadow(0 0 0 transparent)' }}
    />
  );
}