import React, { useEffect, useState } from 'react';

const IOS_URL = 'https://apps.apple.com/app/thunderwod/id1607744328';
const ANDROID_URL = 'https://play.google.com/store/apps/details?id=imok.thunderwod.app';

function detectPlatform() {
  const ua = navigator.userAgent || '';
  if (/iPad|iPhone|iPod/.test(ua) && !window.MSStream) return 'ios';
  if (/android/i.test(ua)) return 'android';
  return 'other';
}

export default function ThunderWodBox({ className = '' }) {
  const [platform, setPlatform] = useState('other');

  useEffect(() => {
    setPlatform(detectPlatform());
  }, []);

  const storeUrl = platform === 'ios' ? IOS_URL : ANDROID_URL;
  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(storeUrl)}`;

  return (
    <div className={`bg-zinc-900/50 rounded-xl p-6 border border-zinc-800 flex flex-row items-center justify-center gap-8 h-full ${className}`}>
      {/* Logo centered left */}
      <div className="flex items-center justify-center">
        <img
          src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69948c0d6b8aa61f49f0a23d/fafce54d5_Screenshot2026-02-28at235506.png"
          alt="ThunderWOD"
          className="h-16 w-16 object-contain rounded-lg"
        />
      </div>

      {/* QR Code centered right */}
      <div className="flex items-center justify-center">
        <a href={storeUrl} target="_blank" rel="noopener noreferrer">
          <img
            src={qrSrc}
            alt="QR Code"
            className="w-24 h-24 rounded-lg bg-white p-1"
          />
        </a>
      </div>
    </div>
  );
}