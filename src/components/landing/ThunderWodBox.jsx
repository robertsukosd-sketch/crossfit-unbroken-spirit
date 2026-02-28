import React from 'react';
import { useLanguage } from '../LanguageProvider';

const IOS_URL = 'https://apps.apple.com/app/thunderwod/id1607744328';
const ANDROID_URL = 'https://play.google.com/store/apps/details?id=imok.thunderwod.app';

const iosQr = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(IOS_URL)}`;
const androidQr = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(ANDROID_URL)}`;

export default function ThunderWodBox({ className = '' }) {
  const { language } = useLanguage();
  const title = language === 'ro' ? 'Descarcă aplicația' : 'Download the app';

  return (
    <div className={`bg-zinc-900/50 rounded-xl p-6 border border-zinc-800 flex flex-col gap-4 h-full ${className}`}>
      <h4 className="text-white font-bold text-center">{title}</h4>
      <div className="flex flex-row items-center justify-center gap-6 flex-1">
        {/* Logo */}
        <div className="flex items-center justify-center">
          <img
            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69948c0d6b8aa61f49f0a23d/c1355e37d_Mobile-Mockup.png"
            alt="ThunderWOD"
            className="w-44 h-full object-contain"
          />
        </div>

        {/* iOS QR */}
        <div className="flex flex-col items-center gap-2">
          <a href={IOS_URL} target="_blank" rel="noopener noreferrer">
            <img src={iosQr} alt="App Store QR" className="w-24 h-24 rounded-lg bg-white p-1" />
          </a>
          <a href={IOS_URL} target="_blank" rel="noopener noreferrer">
            <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="Download on the App Store" className="h-7 object-contain" />
          </a>
        </div>

        {/* Android QR */}
        <div className="flex flex-col items-center gap-2">
          <a href={ANDROID_URL} target="_blank" rel="noopener noreferrer">
            <img src={androidQr} alt="Google Play QR" className="w-24 h-24 rounded-lg bg-white p-1" />
          </a>
          <a href={ANDROID_URL} target="_blank" rel="noopener noreferrer">
            <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Get it on Google Play" className="h-7 object-contain" />
          </a>
        </div>
      </div>
    </div>
  );
}