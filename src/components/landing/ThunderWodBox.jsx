import React, { useEffect, useState } from 'react';

const IOS_URL = 'https://apps.apple.com/ro/app/thunderwod/id1607744328';
const ANDROID_URL = 'https://play.google.com/store/apps/details?id=imok.thunderwod.app';

// QR codes generated via api.qrserver.com pointing to each store
const IOS_QR = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(IOS_URL)}`;
const ANDROID_QR = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(ANDROID_URL)}`;

function detectPlatform() {
  const ua = navigator.userAgent || '';
  if (/iPad|iPhone|iPod/.test(ua) && !window.MSStream) return 'ios';
  if (/android/i.test(ua)) return 'android';
  return 'other';
}

export default function ThunderWodBox() {
  const [platform, setPlatform] = useState('other');

  useEffect(() => {
    setPlatform(detectPlatform());
  }, []);

  const qrSrc = platform === 'ios' ? IOS_QR : ANDROID_QR;
  const storeUrl = platform === 'ios' ? IOS_URL : ANDROID_URL;
  const storeLabel = platform === 'ios' ? 'App Store' : platform === 'android' ? 'Google Play' : 'App Store / Google Play';

  return (
    <div className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800 flex flex-col items-center justify-center text-center gap-4">
      {/* ThunderWOD Logo */}
      <div className="flex flex-col items-center gap-1">
        <img
          src="https://thunderwod.com/wp-content/uploads/2022/01/logo-thunderwod.png"
          alt="ThunderWOD"
          className="h-10 object-contain"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'block';
          }}
        />
        <span className="text-white font-bold text-lg hidden">ThunderWOD</span>
      </div>

      {/* QR Code */}
      <a href={storeUrl} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2">
        <img
          src={qrSrc}
          alt="QR Code"
          className="w-28 h-28 rounded-lg bg-white p-1"
        />
        <span className="text-gray-400 text-xs">Scanează pentru {storeLabel}</span>
      </a>
    </div>
  );
}