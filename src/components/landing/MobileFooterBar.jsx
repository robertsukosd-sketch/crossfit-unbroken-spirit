import React from 'react';
import { Calendar } from 'lucide-react';
import { useLanguage } from '../LanguageProvider';
import { scrollToSection } from '../config';

export default function MobileFooterBar({ onBookSession, onBookSession: _, isMobileMenuOpen: __, setIsMobileMenuOpen: ___ }) {
  const { t } = useLanguage();

  const handleScheduleClick = () => {
    setIsMobileMenuOpen(false);
    scrollToSection('schedule');
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-black/90 backdrop-blur-lg border-t border-zinc-800 px-4 py-3 flex items-center gap-3">
      {/* Schedule */}
      <button
        type="button"
        onClick={handleScheduleClick}
        className="flex flex-col items-center gap-0.5 text-gray-300 hover:text-white transition-colors min-w-[52px] min-h-[44px] justify-center"
        aria-label={t("schedule")}
      >
        <Calendar className="w-5 h-5" />
        <span className="text-[10px] font-semibold">{t("schedule")}</span>
      </button>

      {/* Book a Free Session - Primary CTA */}
      <button
        type="button"
        onClick={onBookSession}
        className="flex-1 bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white font-bold rounded-full py-3 text-sm transition-all shadow-lg shadow-blue-900/40"
      >
        {t("freeTrial")}
      </button>
    </div>
  );
}