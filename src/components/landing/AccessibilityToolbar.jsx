import React, { useState, useEffect } from 'react';
import { useLanguage } from '../LanguageProvider';
import { Accessibility, Type, Sun, Eye, Underline, RotateCcw, X } from 'lucide-react';

const labels = {
  ro: {
    title: 'Accesibilitate',
    increaseText: 'Mărește textul',
    decreaseText: 'Micșorează textul',
    highContrast: 'Contrast ridicat',
    grayscale: 'Tonuri de gri',
    underlineLinks: 'Subliniază linkurile',
    reset: 'Resetează',
  },
  en: {
    title: 'Accessibility',
    increaseText: 'Increase text',
    decreaseText: 'Decrease text',
    highContrast: 'High contrast',
    grayscale: 'Grayscale',
    underlineLinks: 'Underline links',
    reset: 'Reset',
  },
};

export default function AccessibilityToolbar() {
  const { language } = useLanguage();
  const t = labels[language] || labels.en;
  const [open, setOpen] = useState(false);
  const [fontSize, setFontSize] = useState(100);
  const [highContrast, setHighContrast] = useState(false);
  const [grayscale, setGrayscale] = useState(false);
  const [underlineLinks, setUnderlineLinks] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    root.style.fontSize = `${fontSize}%`;
  }, [fontSize]);

  useEffect(() => {
    const body = document.body;
    if (highContrast) {
      body.classList.add('a11y-high-contrast');
    } else {
      body.classList.remove('a11y-high-contrast');
    }
  }, [highContrast]);

  useEffect(() => {
    const body = document.body;
    if (grayscale) {
      body.classList.add('a11y-grayscale');
    } else {
      body.classList.remove('a11y-grayscale');
    }
  }, [grayscale]);

  useEffect(() => {
    const body = document.body;
    if (underlineLinks) {
      body.classList.add('a11y-underline-links');
    } else {
      body.classList.remove('a11y-underline-links');
    }
  }, [underlineLinks]);

  const reset = () => {
    setFontSize(100);
    setHighContrast(false);
    setGrayscale(false);
    setUnderlineLinks(false);
  };

  return (
    <>
      <style>{`
        .a11y-high-contrast { filter: contrast(150%); }
        .a11y-grayscale { filter: grayscale(100%); }
        .a11y-grayscale.a11y-high-contrast { filter: grayscale(100%) contrast(150%); }
        .a11y-underline-links a { text-decoration: underline !important; }
      `}</style>

      {/* Toggle button */}
      <button
        onClick={() => setOpen(o => !o)}
        className="fixed right-0 top-28 sm:left-0 sm:right-auto sm:top-1/2 sm:-translate-y-1/2 z-40 bg-blue-600 hover:bg-blue-500 text-white w-11 h-11 rounded-l-xl sm:rounded-l-none sm:rounded-r-xl flex items-center justify-center shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
        aria-label={t.title}
      >
        <Accessibility className="w-5 h-5" />
      </button>

      {/* Panel */}
      {open && (
        <div className="fixed right-10 top-28 sm:left-10 sm:right-auto sm:top-1/2 sm:-translate-y-1/2 z-50 bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl p-4 w-52 max-h-[80vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-3">
            <span className="text-white font-semibold text-sm">{t.title}</span>
            <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2">
            {/* Font size */}
            <div className="flex items-center justify-between">
              <span className="text-gray-300 text-xs flex items-center gap-1"><Type className="w-3 h-3" />{fontSize}%</span>
              <div className="flex gap-1">
                <button
                  onClick={() => setFontSize(s => Math.max(80, s - 10))}
                  className="w-7 h-7 rounded bg-zinc-700 hover:bg-zinc-600 text-white text-sm font-bold"
                  aria-label={t.decreaseText}
                >−</button>
                <button
                  onClick={() => setFontSize(s => Math.min(150, s + 10))}
                  className="w-7 h-7 rounded bg-zinc-700 hover:bg-zinc-600 text-white text-sm font-bold"
                  aria-label={t.increaseText}
                >+</button>
              </div>
            </div>

            {/* High contrast */}
            <button
              onClick={() => setHighContrast(v => !v)}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs transition-colors ${highContrast ? 'bg-blue-600 text-white' : 'bg-zinc-700 text-gray-300 hover:bg-zinc-600'}`}
            >
              <Sun className="w-3 h-3" /> {t.highContrast}
            </button>

            {/* Grayscale */}
            <button
              onClick={() => setGrayscale(v => !v)}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs transition-colors ${grayscale ? 'bg-blue-600 text-white' : 'bg-zinc-700 text-gray-300 hover:bg-zinc-600'}`}
            >
              <Eye className="w-3 h-3" /> {t.grayscale}
            </button>

            {/* Underline links */}
            <button
              onClick={() => setUnderlineLinks(v => !v)}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs transition-colors ${underlineLinks ? 'bg-blue-600 text-white' : 'bg-zinc-700 text-gray-300 hover:bg-zinc-600'}`}
            >
              <Underline className="w-3 h-3" /> {t.underlineLinks}
            </button>

            {/* Reset */}
            <button
              onClick={reset}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs bg-red-900 hover:bg-red-800 text-gray-200 transition-colors"
            >
              <RotateCcw className="w-3 h-3" /> {t.reset}
            </button>
          </div>
        </div>
      )}
    </>
  );
}