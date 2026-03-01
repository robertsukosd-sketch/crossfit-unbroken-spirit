import React from 'react';
import { useLanguage } from '../LanguageProvider';
import { IOS_URL, ANDROID_URL } from '../appStoreUtils';


export default function ThunderWodBox({ className = '' }) {
  const { language } = useLanguage();
  const title = language === 'ro' ? 'Descarcă aplicația' : 'Download the app';

  return (
    <div className={`bg-zinc-900/50 rounded-xl p-6 border border-zinc-800 flex flex-col gap-4 h-full ${className}`}>
      <h4 className="text-white font-bold text-center">{title}</h4>
      <div className="flex flex-row items-center justify-center gap-6 flex-1">
        {/* Logo */}
        <div className="flex flex-col items-center justify-center">
          <img
            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69948c0d6b8aa61f49f0a23d/892734e42_logothunderwod.jpeg"
            alt="ThunderWOD"
            className="w-28 h-28 object-contain"
          />
        </div>

        {/* iOS */}
        <a href={IOS_URL} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center gap-2">
          <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple" className="w-16 h-16 object-contain" style={{filter: 'invert(1)'}} />
          <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="Download on the App Store" className="h-8 object-contain" />
        </a>

        {/* Android */}
        <a href={ANDROID_URL} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center gap-2">
          <img src="https://upload.wikimedia.org/wikipedia/commons/d/d0/Google_Play_Arrow_logo.svg" alt="Google Play" className="w-16 h-16 object-contain" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Get it on Google Play" className="h-8 object-contain" />
        </a>
      </div>
    </div>
  );
}