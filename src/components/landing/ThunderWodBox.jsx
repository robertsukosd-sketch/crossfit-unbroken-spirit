import React from 'react';

const IOS_URL = 'https://apps.apple.com/app/thunderwod/id1607744328';
const ANDROID_URL = 'https://play.google.com/store/apps/details?id=imok.thunderwod.app';

const iosQr = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(IOS_URL)}`;
const androidQr = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(ANDROID_URL)}`;

export default function ThunderWodBox({ className = '' }) {
  return (
    <div className={`bg-zinc-900/50 rounded-xl p-6 border border-zinc-800 flex flex-row items-center justify-center gap-6 h-full ${className}`}>
      {/* Logo */}
      <div className="flex items-center justify-center">
        <img
          src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69948c0d6b8aa61f49f0a23d/fafce54d5_Screenshot2026-02-28at235506.png"
          alt="ThunderWOD"
          className="w-28 h-28 object-contain rounded-lg"
        />
      </div>

      {/* iOS QR */}
      <div className="flex flex-col items-center gap-1">
        <a href={IOS_URL} target="_blank" rel="noopener noreferrer">
          <img src={iosQr} alt="App Store QR" className="w-24 h-24 rounded-lg bg-white p-1" />
        </a>
        <span className="text-gray-400 text-xs">App Store</span>
      </div>

      {/* Android QR */}
      <div className="flex flex-col items-center gap-1">
        <a href={ANDROID_URL} target="_blank" rel="noopener noreferrer">
          <img src={androidQr} alt="Google Play QR" className="w-24 h-24 rounded-lg bg-white p-1" />
        </a>
        <span className="text-gray-400 text-xs">Google Play</span>
      </div>
    </div>
  );
}