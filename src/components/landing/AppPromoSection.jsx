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
    type === 'desktop'
      ? isRo ? 'Deschide aplicația web' : 'Open the web app'
      : isRo ? 'Descarcă Aplicația' : 'Download the App';

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
    <section id="app-promo-section" className="relative py-12 px-4 bg-black overflow-hidden">
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-blue-700/20 rounded-full blur-3xl" />
        <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-[400px] h-[250px] bg-sky-500/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative max-w-5xl mx-auto"
      >
        {/* Wide horizontal card on desktop, stacked on mobile */}
        <div className="relative bg-gradient-to-br from-[#0f172a] via-zinc-900 to-[#0c1a2e] border border-blue-400/40 rounded-3xl shadow-2xl shadow-blue-900/40 px-8 py-10 flex flex-col lg:flex-row lg:items-center lg:gap-10 overflow-hidden">
          {/* Subtle top highlight line */}
          <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-blue-400/60 to-transparent" />

          {/* Logo + label */}
          <div className="flex lg:flex-col items-center gap-4 lg:gap-3 mb-6 lg:mb-0 lg:flex-shrink-0">
            <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl overflow-hidden border-2 border-blue-400/40 shadow-xl shadow-blue-500/20">
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69948c0d6b8aa61f49f0a23d/892734e42_logothunderwod.jpeg"
                alt="ThunderWOD"
                className="w-full h-full object-contain"
              />
            </div>
            <p className="text-xs font-black uppercase tracking-widest text-blue-400">ThunderWOD</p>
          </div>

          {/* Text block */}
          <div className="flex-1 text-center lg:text-left mb-8 lg:mb-0">
            {isRo ? (
              <>
                <p className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-2">Aplicația oficială</p>
                <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-3">
                  Totul, într-o singură aplicație
                </h2>
                <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                  Gestionează <span className="text-white font-semibold">plata abonamentelor</span>, <span className="text-white font-semibold">înscrierea la clase</span>
                  <br className="hidden sm:block" />
                  și <span className="text-white font-semibold">istoricul rezultatelor tale</span> în aplicația ThunderWOD.
                </p>
              </>
            ) : (
              <>
                <p className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-2">Official app</p>
                <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-3">
                  Everything in one app
                </h2>
                <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                  Manage your subscriptions, class registrations
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
              className="inline-flex items-center gap-2.5 bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 active:scale-95 text-white font-bold px-8 py-4 rounded-xl transition-all duration-150 text-sm sm:text-base shadow-xl shadow-blue-600/40 whitespace-nowrap"
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