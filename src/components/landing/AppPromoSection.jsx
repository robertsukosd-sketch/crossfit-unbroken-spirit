import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Monitor } from 'lucide-react';
import { useLanguage } from '../LanguageProvider';
import {
  IOS_APP_STORE,
  ANDROID_PLAY_STORE,
  DESKTOP_URL,
} from '../appStoreUtils';

function getLink() {
  const ua = navigator.userAgent || '';
  if (/android/i.test(ua)) return { url: ANDROID_PLAY_STORE, type: 'android' };
  if (/iphone|ipad|ipod/i.test(ua)) return { url: IOS_APP_STORE, type: 'ios' };
  return { url: DESKTOP_URL, type: 'desktop' };
}

export default function AppPromoSection() {
  const { language } = useLanguage();
  const isRo = language === 'ro';
  const { url, type } = getLink();

  const cta =
    type === 'ios'
      ? isRo ? 'Descarcă pe App Store' : 'Download on the App Store'
      : type === 'android'
      ? isRo ? 'Descarcă pe Google Play' : 'Get it on Google Play'
      : isRo ? 'Deschide aplicația web' : 'Open the web app';

  const Icon = type === 'desktop' ? Monitor : Smartphone;

  const badge =
    type === 'ios' ? (
      <img
        src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
        alt="Download on the App Store"
        className="h-10 object-contain"
      />
    ) : type === 'android' ? (
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
        alt="Get it on Google Play"
        className="h-10 object-contain"
      />
    ) : null;

  return (
    <section className="relative py-8 px-4 bg-black overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[200px] bg-blue-600/15 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative max-w-5xl mx-auto"
      >
        {/* Wide horizontal card on desktop, stacked on mobile */}
        <div className="bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-800 border border-blue-500/30 rounded-2xl shadow-2xl shadow-blue-900/20 px-8 py-8 flex flex-col lg:flex-row lg:items-center lg:gap-8">

          {/* Logo + label */}
          <div className="flex lg:flex-col items-center gap-4 lg:gap-2 mb-6 lg:mb-0 lg:flex-shrink-0">
            <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-2xl overflow-hidden border border-blue-500/30 shadow-lg shadow-blue-500/10">
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69948c0d6b8aa61f49f0a23d/892734e42_logothunderwod.jpeg"
                alt="ThunderWOD"
                className="w-full h-full object-contain"
              />
            </div>
            <p className="text-xs font-bold uppercase tracking-widest text-blue-400">ThunderWOD</p>
          </div>

          {/* Text block — grows to fill space */}
          <div className="flex-1 text-center lg:text-left mb-6 lg:mb-0">
            {isRo ? (
              <>
                <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight mb-2">
                  Totul, într-o singură aplicație
                </h2>
                <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                  Gestionează plata abonamentelor, înscrierea la clase
                  <br className="hidden sm:block" />
                  și istoricul rezultatelor tale în aplicația ThunderWOD.
                </p>
              </>
            ) : (
              <>
                <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight mb-2">
                  Everything in one app
                </h2>
                <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                  Manage your subscriptions, class sign-ups
                  <br className="hidden sm:block" />
                  and workout history in the ThunderWOD app.
                </p>
              </>
            )}
          </div>

          {/* CTA block */}
          <div className="flex flex-col items-center lg:items-end gap-3 lg:flex-shrink-0">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-bold px-7 py-3.5 rounded-xl transition-all duration-150 text-sm sm:text-base shadow-lg shadow-blue-600/30 whitespace-nowrap"
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {cta}
            </a>
            {badge && (
              <a href={url} target="_blank" rel="noopener noreferrer">
                {badge}
              </a>
            )}
          </div>

        </div>
      </motion.div>
    </section>
  );
}