import React from 'react';

const LOGO_URL = "https://media.base44.com/images/public/69948c0d6b8aa61f49f0a23d/6d93c9490_image.png";

export default function Logo({ size = 40 }) {
  return (
    <img
      src={LOGO_URL}
      alt="CrossFit Unbroken Spirit"
      className="flex-shrink-0 object-contain"
      style={{ width: `${size}px`, height: `${size}px` }}
    />
  );
}