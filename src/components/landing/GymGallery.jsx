import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../LanguageProvider';

const GALLERY_GROUPS = [
  {
    id: 'equipment',
    labelRo: 'Echipamente',
    labelEn: 'Equipment',
    images: [
      { src: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69948c0d6b8aa61f49f0a23d/3f7c1702a_CrossFit_US-003.jpg', alt: 'Sală CrossFit București - CrossFit Unbroken Spirit interior' },
      { src: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69948c0d6b8aa61f49f0a23d/7bf0bb8c4_CrossFit_US-004.jpg', alt: 'Echipamente CrossFit Rogue - CrossFit Unbroken Spirit București' },
      { src: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69948c0d6b8aa61f49f0a23d/d2ebb21a7_CrossFit_US-007.jpg', alt: 'Rig CrossFit profesional - CrossFit Unbroken Spirit Splaiul Unirii' },
      { src: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69948c0d6b8aa61f49f0a23d/e53f3a916_CrossFit_US-013.jpg', alt: 'Interior box CrossFit București - CrossFit Unbroken Spirit' },
      { src: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69948c0d6b8aa61f49f0a23d/24bd3546f_CrossFit_US-206.jpg', alt: 'Wall balls CrossFit - antrenament funcțional București' },
      { src: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69948c0d6b8aa61f49f0a23d/455f79116_CrossFit_US-207.jpg', alt: 'Rig CrossFit Rogue - sala CrossFit Unbroken Spirit București' },
      { src: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69948c0d6b8aa61f49f0a23d/3f48705e1_CrossFit_US-209.jpg', alt: 'Wall ball Rogue CrossFit - CrossFit Unbroken Spirit sector 3 București' },
      { src: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69948c0d6b8aa61f49f0a23d/cdce7ff04_CrossFit_US-210.jpg', alt: 'Gantere CrossFit Rogue - echipamente sală CrossFit București' },
      { src: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69948c0d6b8aa61f49f0a23d/cc65f02d2_CrossFit_US-221.jpg', alt: 'Rowing machines CrossFit - antrenament cardio CrossFit Unbroken Spirit' },
      { src: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69948c0d6b8aa61f49f0a23d/8346a8ac8_CrossFit_US-222.jpg', alt: 'Concept2 rowers - sala CrossFit Mihai Bravu București' },
      { src: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69948c0d6b8aa61f49f0a23d/4ba37c863_CrossFit_US-008.jpg', alt: 'Bare olimpice Rogue CrossFit - CrossFit Unbroken Spirit București' },
      { src: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69948c0d6b8aa61f49f0a23d/e532acb84_CrossFit_US-224.jpg', alt: 'Intrare CrossFit Unbroken Spirit - sală CrossFit Splaiul Unirii 257-259 București' },
      { src: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69948c0d6b8aa61f49f0a23d/0d7ea80a2_CrossFit_US-227.jpg', alt: 'Locație CrossFit Unbroken Spirit - CrossFit lângă metrou Mihai Bravu București' },
    ],
  },
  {
    id: 'locker',
    labelRo: 'Vestiare',
    labelEn: 'Locker Rooms',
    images: [
      { src: 'https://media.base44.com/images/public/69948c0d6b8aa61f49f0a23d/41e836c8c__STX0573.jpg', alt: 'Vestiare CrossFit Unbroken Spirit București - dulapuri și cabine' },
      { src: 'https://media.base44.com/images/public/69948c0d6b8aa61f49f0a23d/38327f35b__STX0577.jpg', alt: 'Dulapuri vestiar CrossFit Unbroken Spirit București' },
      { src: 'https://media.base44.com/images/public/69948c0d6b8aa61f49f0a23d/25de67b3d__STX0579.jpg', alt: 'Bănci vestiar CrossFit Unbroken Spirit București' },
      { src: 'https://media.base44.com/images/public/69948c0d6b8aa61f49f0a23d/ff0ed1cd4__STX0583.jpg', alt: 'Dușuri vestiar CrossFit Unbroken Spirit București' },
      { src: 'https://media.base44.com/images/public/69948c0d6b8aa61f49f0a23d/f7c178167__STX0584.jpg', alt: 'Chiuvetă și oglindă vestiar CrossFit Unbroken Spirit București' },
      { src: 'https://media.base44.com/images/public/69948c0d6b8aa61f49f0a23d/e9614b28f__STX0589.jpg', alt: 'Zonă baie vestiar CrossFit Unbroken Spirit București' },
      { src: 'https://media.base44.com/images/public/69948c0d6b8aa61f49f0a23d/04c8f45a0__STX0590.jpg', alt: 'Cabine vestiar CrossFit Unbroken Spirit București' },
      { src: 'https://media.base44.com/images/public/69948c0d6b8aa61f49f0a23d/a483175f3__STX0595.jpg', alt: 'Vestiar luminos CrossFit Unbroken Spirit București' },
      { src: 'https://media.base44.com/images/public/69948c0d6b8aa61f49f0a23d/1a9145e48__STX0599.jpg', alt: 'Chiuvetă baie vestiar CrossFit Unbroken Spirit București' },
      { src: 'https://media.base44.com/images/public/69948c0d6b8aa61f49f0a23d/cae2c0664__STX0601.jpg', alt: 'Oglindă și uscător vestiar CrossFit Unbroken Spirit București' },
      { src: 'https://media.base44.com/images/public/69948c0d6b8aa61f49f0a23d/2b479a80b__STX0602.jpg', alt: 'Spațiu vestiar CrossFit Unbroken Spirit București' },
      { src: 'https://media.base44.com/images/public/69948c0d6b8aa61f49f0a23d/c57fe914e__STX0603.jpg', alt: 'Dulapuri albastre vestiar CrossFit Unbroken Spirit București' },
      { src: 'https://media.base44.com/images/public/69948c0d6b8aa61f49f0a23d/e2c87a790__STX0605.jpg', alt: 'Bănci și cuiere vestiar CrossFit Unbroken Spirit București' },
    ],
  },
  {
    id: 'exterior',
    labelRo: 'Exterior',
    labelEn: 'Exterior',
    images: [
      { src: 'https://media.base44.com/images/public/69948c0d6b8aa61f49f0a23d/f80150a75__STX0696.jpg', alt: 'Drum de acces CrossFit Unbroken Spirit București' },
      { src: 'https://media.base44.com/images/public/69948c0d6b8aa61f49f0a23d/a715292a7__STX0697.jpg', alt: 'Intrare CrossFit Unbroken Spirit București cu rastel biciclete' },
      { src: 'https://media.base44.com/images/public/69948c0d6b8aa61f49f0a23d/ce6542888__STX0700.jpg', alt: 'Fațadă CrossFit Unbroken Spirit București' },
      { src: 'https://media.base44.com/images/public/69948c0d6b8aa61f49f0a23d/4afc8b5a2__STX0702.jpg', alt: 'Exterior sală CrossFit Unbroken Spirit Splaiul Unirii' },
      { src: 'https://media.base44.com/images/public/69948c0d6b8aa61f49f0a23d/8c76452a3__STX0705.jpg', alt: 'Poartă acces CrossFit Unbroken Spirit București' },
      { src: 'https://media.base44.com/images/public/69948c0d6b8aa61f49f0a23d/6cf107ea9__STX0708.jpg', alt: 'Acces exterior CrossFit Unbroken Spirit București' },
    ],
  },
];

export default function GymGallery() {
  const { language } = useLanguage();
  const [activeGallery, setActiveGallery] = useState('equipment');
  const [index, setIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const activeGroup = GALLERY_GROUPS.find((group) => group.id === activeGallery) || GALLERY_GROUPS[0];
  const activeImages = activeGroup.images;
  const totalSlides = Math.max(activeImages.length - 1, 1);

  const selectGallery = (galleryId) => {
    setActiveGallery(galleryId);
    setIndex(0);
    setLightboxIndex(null);
  };

  const prev = () => setIndex((i) => (i === 0 ? totalSlides - 1 : i - 1));
  const next = () => setIndex((i) => (i >= totalSlides - 1 ? 0 : i + 1));

  const lightboxPrev = () => setLightboxIndex((i) => (i === 0 ? activeImages.length - 1 : i - 1));
  const lightboxNext = () => setLightboxIndex((i) => (i === activeImages.length - 1 ? 0 : i + 1));

  const openLightbox = (imgIndex) => {
    if (window.innerWidth < 768 && activeImages.length > 0) setLightboxIndex(imgIndex);
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowLeft') lightboxPrev();
      if (e.key === 'ArrowRight') lightboxNext();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxIndex]);

  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightboxIndex]);

  const visible = activeImages.length > 0
    ? [activeImages[index], activeImages[(index + 1) % activeImages.length]]
    : [];

  return (
    <div className="relative mt-10">
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {GALLERY_GROUPS.map((group) => {
          const isActive = activeGallery === group.id;
          return (
            <button
              key={group.id}
              onClick={() => selectGallery(group.id)}
              className={`px-4 py-2 rounded-full text-sm font-bold border transition-all ${
                isActive
                  ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/25'
                  : 'bg-zinc-900 border-zinc-700 text-gray-300 hover:border-blue-500/50 hover:text-white'
              }`}
            >
              {language === 'ro' ? group.labelRo : group.labelEn}
            </button>
          );
        })}
      </div>

      {activeImages.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-zinc-700 bg-zinc-900/50 p-10 text-center text-gray-400">
          {language === 'ro' ? 'Fotografiile vor fi adăugate în curând.' : 'Photos will be added soon.'}
        </div>
      ) : (
      <div className="flex gap-4 overflow-hidden">
        <AnimatePresence mode="sync">
          {visible.map((img, i) => (
            <motion.div
              key={img.src}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="flex-1 rounded-2xl overflow-hidden aspect-video cursor-pointer md:cursor-default"
              onClick={() => openLightbox((index + i) % activeImages.length)}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                decoding="async"
                sizes="(max-width: 640px) 100vw, 50vw"
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      )}

      {/* Mobile Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center md:hidden"
            onClick={() => setLightboxIndex(null)}
          >
            <button
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-white z-10"
              onClick={() => setLightboxIndex(null)}
            >
              <X className="w-5 h-5" />
            </button>

            <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
              {lightboxIndex + 1} / {activeImages.length}
            </div>

            <AnimatePresence mode="wait">
              <motion.img
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                src={activeImages[lightboxIndex].src}
                alt={activeImages[lightboxIndex].alt}
                loading="lazy"
                decoding="async"
                className="max-w-full max-h-[80vh] object-contain px-12"
                onClick={(e) => e.stopPropagation()}
              />
            </AnimatePresence>

            <button
              className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-white"
              onClick={(e) => { e.stopPropagation(); lightboxPrev(); }}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-white"
              onClick={(e) => { e.stopPropagation(); lightboxNext(); }}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {activeImages.length > 0 && (
        <>
          {/* Nav buttons */}
          <button
            onClick={prev}
            className="absolute left-0 top-[58%] -translate-y-1/2 -translate-x-4 w-9 h-9 rounded-full bg-zinc-800 border border-zinc-700 text-white flex items-center justify-center hover:bg-zinc-700 transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-[58%] -translate-y-1/2 translate-x-4 w-9 h-9 rounded-full bg-zinc-800 border border-zinc-700 text-white flex items-center justify-center hover:bg-zinc-700 transition-colors"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-4">
            {Array.from({ length: totalSlides }).map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`w-2 h-2 rounded-full transition-colors ${i === index ? 'bg-blue-400' : 'bg-zinc-600'}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}