import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Chrome } from 'lucide-react';
import { useLanguage } from '../LanguageProvider';
import { getAppStoreUrl } from '../appStoreUtils';

export default function ScheduleCtaSection() {
  const { language } = useLanguage();
  const isRo = language === 'ro';

  const iosUrl = getAppStoreUrl('ios');
  const androidUrl = getAppStoreUrl('android');
  const webUrl = 'https://app.thunderwod.com/#/wod';

  return (
    <section className="py-12 bg-gradient-to-b from-zinc-950 to-black relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-transparent to-sky-600/5 pointer-events-none" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="bg-zinc-900/60 border border-blue-500/30 backdrop-blur-sm rounded-2xl p-6 sm:p-8 text-center"
        >
          <div className="mb-4">
            <Smartphone className="w-8 h-8 text-sky-400 mx-auto" />
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-white mb-2">
            {isRo ? 'Gata să te Înscrii?' : 'Ready to Book?'}
          </h3>

          <p className="text-gray-300 text-sm sm:text-base mb-6 leading-relaxed">
            {isRo
              ? 'Înregistrarea la clase se face în aplicația ThunderWOD. Disponibilă pe telefonul tău, browser, sau desktop.'
              : 'Class registration happens in the ThunderWOD app. Available on your phone, browser, or desktop.'}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center flex-wrap">
            <a
              href={iosUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-black border border-blue-500/50 hover:border-blue-500 rounded-full text-sm font-semibold text-white transition-colors duration-150 min-h-[44px]"
            >
              <Smartphone className="w-4 h-4" />
              {isRo ? 'iOS' : 'iOS'}
            </a>

            <a
              href={androidUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-black border border-blue-500/50 hover:border-blue-500 rounded-full text-sm font-semibold text-white transition-colors duration-150 min-h-[44px]"
            >
              <Smartphone className="w-4 h-4 rotate-90" />
              {isRo ? 'Android' : 'Android'}
            </a>

            <a
              href={webUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-black border border-blue-500/50 hover:border-blue-500 rounded-full text-sm font-semibold text-white transition-colors duration-150 min-h-[44px]"
            >
              <Chrome className="w-4 h-4" />
              {isRo ? 'Web' : 'Web'}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}