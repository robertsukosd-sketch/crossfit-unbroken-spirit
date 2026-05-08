import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import html2canvas from 'html2canvas';

const SLIDES = [
  {
    id: 1,
    type: 'intro',
    partner: null,
    logo: null,
    tag: null,
    headline: ['ABONAMENTE', 'ANGAJATOR?'],
    subheadline: 'Antrenează-te la noi prin beneficiile companiei tale.',
    body: null,
    steps: null,
    cta: 'Ai SanoPass, 7Card sau Edenred Benefit?',
    ctaSub: 'Continuă ›',
    accent: 'from-blue-600 to-sky-400',
    bgPattern: 'dots',
  },
  {
    id: 2,
    type: 'partner',
    partner: 'SanoPass FIT',
    logo: 'https://media.base44.com/images/public/69948c0d6b8aa61f49f0a23d/f9c38259e_image.png',
    tag: 'ABONAMENT GOLD',
    headline: ['SANOPASS', 'FIT'],
    subheadline: 'Acces cu coplată',
    body: 'Ai abonament SanoPass FIT Gold? Ne găsești în aplicație la abonamentele Gold.',
    steps: ['Descarcă aplicația SanoPass FIT', 'Deschide ThunderWOD și efectuează coplata', 'Înscrie-te la ora dorită', 'Vino la antrenament!'],
    cta: null,
    ctaSub: null,
    accent: 'from-orange-500 to-amber-400',
    bgPattern: 'grid',
  },
  {
    id: 3,
    type: 'partner',
    partner: '7Card by Wellhub',
    logo: 'https://media.base44.com/images/public/69948c0d6b8aa61f49f0a23d/ba1690e6f_image.png',
    tag: 'FĂRĂ TAXĂ EXTRA',
    headline: ['7CARD BY', 'WELLHUB'],
    subheadline: 'Acces inclus în abonament',
    body: 'Ai abonament 7Card by Wellhub? Ne găsești în rețea. Vino fără nicio taxă suplimentară.',
    steps: ['Autentifică-te în aplicația 7Card/Wellhub', 'Deschide ThunderWOD și înscrie-te', 'Vino la antrenament — fără taxă!'],
    cta: null,
    ctaSub: null,
    accent: 'from-pink-500 to-rose-400',
    bgPattern: 'circles',
  },
  {
    id: 4,
    type: 'partner',
    partner: 'Edenred Benefit',
    logo: 'https://media.base44.com/images/public/69948c0d6b8aa61f49f0a23d/ffda322b0_image.png',
    tag: 'DIN BUGETUL DE BENEFICII',
    headline: ['EDENRED', 'BENEFIT'],
    subheadline: 'Plătit direct din cardul tău',
    body: 'Ai card Edenred Benefit? Cumpără abonamentul nostru direct din platforma Edenred.',
    steps: ['Accesează platforma sau aplicația Edenred', 'Caută CrossFit Unbroken Spirit', 'Abonamentul se activează în 24h în ThunderWOD', 'Înscrie-te la ore din ThunderWOD'],
    cta: null,
    ctaSub: null,
    accent: 'from-red-500 to-rose-500',
    bgPattern: 'lines',
  },
];

function BgPattern({ type }) {
  if (type === 'dots') {
    return (
      <svg className="absolute inset-0 w-full h-full opacity-[0.07]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="3" cy="3" r="1.5" fill="white" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>
    );
  }
  if (type === 'grid') {
    return (
      <svg className="absolute inset-0 w-full h-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M40 0H0V40" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    );
  }
  if (type === 'circles') {
    return (
      <svg className="absolute inset-0 w-full h-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="circles" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
            <circle cx="30" cy="30" r="20" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#circles)" />
      </svg>
    );
  }
  if (type === 'lines') {
    return (
      <svg className="absolute inset-0 w-full h-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="lines" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M0 30L30 0" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#lines)" />
      </svg>
    );
  }
  return null;
}

function SlideIntro({ slide }) {
  return (
    <div className="relative w-full h-full bg-zinc-950 flex flex-col items-center justify-center overflow-hidden">
      <BgPattern type={slide.bgPattern} />

      {/* Top accent bar */}
      <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${slide.accent}`} />

      {/* Logo */}
      <div className="mb-8">
        <img
          src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69948c0d6b8aa61f49f0a23d/6f20a4dfe_image.png"
          alt="CrossFit Unbroken Spirit"
          className="h-16 object-contain"
        />
      </div>

      {/* Headline */}
      <div className="text-center mb-6 px-10">
        {slide.headline.map((line, i) => (
          <div key={i} className={`font-black leading-none text-6xl tracking-tight ${i === 1 ? `bg-gradient-to-r ${slide.accent} bg-clip-text text-transparent` : 'text-white'}`}>
            {line}
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className={`w-16 h-1 rounded-full bg-gradient-to-r ${slide.accent} mb-6`} />

      {/* Subheadline */}
      <p className="text-gray-300 text-lg text-center px-10 mb-10 leading-snug">
        {slide.subheadline}
      </p>

      {/* Partner logos strip */}
      <div className="flex items-center justify-center gap-5 mb-10">
        {[
          'https://media.base44.com/images/public/69948c0d6b8aa61f49f0a23d/f9c38259e_image.png',
          'https://media.base44.com/images/public/69948c0d6b8aa61f49f0a23d/ba1690e6f_image.png',
          'https://media.base44.com/images/public/69948c0d6b8aa61f49f0a23d/ffda322b0_image.png',
        ].map((src, i) => (
          <div key={i} className="w-14 h-14 rounded-xl bg-white flex items-center justify-center overflow-hidden shadow-lg">
            <img src={src} alt="" className="w-full h-full object-contain p-1" />
          </div>
        ))}
      </div>

      {/* CTA pill */}
      <div className="px-6 py-3 rounded-full border border-white/20 bg-white/5">
        <p className="text-gray-400 text-sm text-center">{slide.cta}</p>
      </div>

      {/* Bottom branding */}
      <div className="absolute bottom-5 left-0 right-0 flex items-center justify-center">
        <span className="text-zinc-600 text-xs tracking-widest uppercase">unbrokenspirit.ro</span>
      </div>
    </div>
  );
}

function SlidePartner({ slide }) {
  return (
    <div className="relative w-full h-full bg-zinc-950 flex flex-col overflow-hidden">
      <BgPattern type={slide.bgPattern} />

      {/* Top accent */}
      <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${slide.accent}`} />

      {/* Gradient blob */}
      <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl ${slide.accent} opacity-10 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3 pointer-events-none`} />

      {/* Header area */}
      <div className="flex items-start justify-between px-8 pt-9 pb-0">
        {/* Partner logo */}
        <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-xl overflow-hidden flex-shrink-0">
          <img src={slide.logo} alt={slide.partner} className="w-full h-full object-contain p-1" />
        </div>
        {/* Tag */}
        <div className={`px-3 py-1 rounded-full text-xs font-black tracking-wider bg-gradient-to-r ${slide.accent} text-white shadow-lg`}>
          {slide.tag}
        </div>
      </div>

      {/* Headline */}
      <div className="px-8 mt-5 mb-1">
        {slide.headline.map((line, i) => (
          <div key={i} className={`font-black leading-none tracking-tight ${i === 0 ? 'text-4xl text-white' : `text-4xl bg-gradient-to-r ${slide.accent} bg-clip-text text-transparent`}`}>
            {line}
          </div>
        ))}
      </div>

      {/* Subheadline */}
      <p className="px-8 text-gray-400 text-sm mb-5">{slide.subheadline}</p>

      {/* Divider */}
      <div className={`mx-8 h-px bg-gradient-to-r ${slide.accent} opacity-30 mb-5`} />

      {/* Body */}
      <p className="px-8 text-gray-300 text-sm leading-relaxed mb-5">{slide.body}</p>

      {/* Steps */}
      <div className="px-8 flex flex-col gap-2.5 flex-grow">
        {slide.steps.map((step, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className={`flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br ${slide.accent} text-white text-xs font-black flex items-center justify-center shadow`}>
              {i + 1}
            </div>
            <span className="text-gray-300 text-sm leading-snug">{step}</span>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="px-8 py-5 flex items-center justify-between border-t border-zinc-800 mt-4">
        <img
          src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69948c0d6b8aa61f49f0a23d/6f20a4dfe_image.png"
          alt="CrossFit Unbroken Spirit"
          className="h-6 object-contain"
        />
        <span className="text-zinc-500 text-xs tracking-widest uppercase">unbrokenspirit.ro</span>
      </div>
    </div>
  );
}

function Slide({ slide }) {
  if (slide.type === 'intro') return <SlideIntro slide={slide} />;
  return <SlidePartner slide={slide} />;
}

export default function InstagramCarousel() {
  const [current, setCurrent] = useState(0);
  const slideRef = useRef(null);

  const prev = () => setCurrent((c) => Math.max(0, c - 1));
  const next = () => setCurrent((c) => Math.min(SLIDES.length - 1, c + 1));

  const handleDownload = async () => {
    if (!slideRef.current) return;
    const canvas = await html2canvas(slideRef.current, {
      scale: 3,
      backgroundColor: null,
      useCORS: true,
      allowTaint: true,
    });
    const link = document.createElement('a');
    link.download = `slide-${current + 1}-${SLIDES[current].partner?.toLowerCase().replace(/\s+/g, '-') || 'intro'}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const slide = SLIDES[current];

  return (
    <div className="min-h-screen bg-zinc-900 flex flex-col items-center justify-center p-6 gap-6">
      <div className="text-center">
        <h1 className="text-white font-black text-2xl">Instagram Carousel</h1>
        <p className="text-zinc-400 text-sm mt-1">Parteneri beneficii angajați — 4 slide-uri</p>
      </div>

      {/* Slide preview — 1:1 square */}
      <div className="relative">
        <div
          ref={slideRef}
          className="w-[400px] h-[400px] rounded-2xl overflow-hidden shadow-2xl shadow-black/60"
          style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              className="w-full h-full"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.25 }}
            >
              <Slide slide={slide} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Nav arrows */}
        <button
          onClick={prev}
          disabled={current === 0}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 w-9 h-9 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-white disabled:opacity-20 hover:bg-zinc-700 transition-colors duration-150 cursor-pointer"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={next}
          disabled={current === SLIDES.length - 1}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 w-9 h-9 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-white disabled:opacity-20 hover:bg-zinc-700 transition-colors duration-150 cursor-pointer"
          aria-label="Next slide"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Dots */}
      <div className="flex items-center gap-2">
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all duration-200 cursor-pointer ${i === current ? 'w-6 bg-white' : 'w-2 bg-zinc-600'}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Slide label */}
      <p className="text-zinc-400 text-sm">
        Slide {current + 1} / {SLIDES.length} — {slide.partner ?? 'Intro'}
      </p>

      {/* Download */}
      <Button
        onClick={handleDownload}
        className="gap-2 bg-white text-zinc-900 hover:bg-zinc-100 font-bold rounded-full px-6"
      >
        <Download className="w-4 h-4" />
        Descarcă slide-ul curent (PNG)
      </Button>

      <p className="text-zinc-600 text-xs text-center max-w-xs">
        Descarcă fiecare slide separat pentru a le posta individual în carrousel-ul de Instagram (format 1:1).
      </p>
    </div>
  );
}