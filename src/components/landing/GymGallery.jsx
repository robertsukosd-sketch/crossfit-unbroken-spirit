import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const GYM_IMAGES = [
  { src: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69948c0d6b8aa61f49f0a23d/3f7c1702a_CrossFit_US-003.jpg', alt: 'CrossFit Unbroken Spirit gym' },
  { src: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69948c0d6b8aa61f49f0a23d/7bf0bb8c4_CrossFit_US-004.jpg', alt: 'CrossFit Unbroken Spirit equipment' },
  { src: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69948c0d6b8aa61f49f0a23d/d2ebb21a7_CrossFit_US-007.jpg', alt: 'CrossFit Unbroken Spirit rig' },
  { src: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69948c0d6b8aa61f49f0a23d/e53f3a916_CrossFit_US-013.jpg', alt: 'CrossFit Unbroken Spirit box interior' },
  { src: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69948c0d6b8aa61f49f0a23d/24bd3546f_CrossFit_US-206.jpg', alt: 'CrossFit Unbroken Spirit wall balls' },
  { src: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69948c0d6b8aa61f49f0a23d/455f79116_CrossFit_US-207.jpg', alt: 'CrossFit Unbroken Spirit rig detail' },
  { src: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69948c0d6b8aa61f49f0a23d/3f48705e1_CrossFit_US-209.jpg', alt: 'CrossFit Unbroken Spirit Rogue wall ball' },
  { src: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69948c0d6b8aa61f49f0a23d/cdce7ff04_CrossFit_US-210.jpg', alt: 'CrossFit Unbroken Spirit dumbbells' },
  { src: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69948c0d6b8aa61f49f0a23d/cc65f02d2_CrossFit_US-221.jpg', alt: 'CrossFit Unbroken Spirit rowers' },
  { src: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69948c0d6b8aa61f49f0a23d/8346a8ac8_CrossFit_US-222.jpg', alt: 'CrossFit Unbroken Spirit rowers side view' },
  { src: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69948c0d6b8aa61f49f0a23d/4ba37c863_CrossFit_US-008.jpg', alt: 'CrossFit Unbroken Spirit Rogue barbells' },
  { src: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69948c0d6b8aa61f49f0a23d/e532acb84_CrossFit_US-224.jpg', alt: 'CrossFit Unbroken Spirit entrance' },
  { src: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69948c0d6b8aa61f49f0a23d/0d7ea80a2_CrossFit_US-227.jpg', alt: 'CrossFit Unbroken Spirit location' },
];

export default function GymGallery() {
  const [index, setIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const prev = () => setIndex((i) => (i === 0 ? GYM_IMAGES.length - 2 : i - 1));
  const next = () => setIndex((i) => (i >= GYM_IMAGES.length - 2 ? 0 : i + 1));

  const lightboxPrev = () => setLightboxIndex((i) => (i === 0 ? GYM_IMAGES.length - 1 : i - 1));
  const lightboxNext = () => setLightboxIndex((i) => (i === GYM_IMAGES.length - 1 ? 0 : i + 1));

  const openLightbox = (imgIndex) => {
    if (window.innerWidth < 768) setLightboxIndex(imgIndex);
  };

  // Close on escape key
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

  // Prevent body scroll when lightbox open
  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightboxIndex]);

  const visible = [GYM_IMAGES[index], GYM_IMAGES[(index + 1) % GYM_IMAGES.length]];

  return (
    <div className="relative mt-10">
      <div className="flex gap-4 overflow-hidden">
        {visible.map((img, i) => (
          <motion.div
            key={img.src}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="flex-1 rounded-2xl overflow-hidden aspect-video cursor-pointer md:cursor-default"
            onClick={() => openLightbox((index + i) % GYM_IMAGES.length)}
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}
      </div>

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
            {/* Close button */}
            <button
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-white z-10"
              onClick={() => setLightboxIndex(null)}
            >
              <X className="w-5 h-5" />
            </button>

            {/* Counter */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
              {lightboxIndex + 1} / {GYM_IMAGES.length}
            </div>

            {/* Image */}
            <motion.img
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              src={GYM_IMAGES[lightboxIndex].src}
              alt={GYM_IMAGES[lightboxIndex].alt}
              className="max-w-full max-h-[80vh] object-contain px-12"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Prev / Next */}
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

      {/* Nav buttons */}
      <button
        onClick={prev}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-9 h-9 rounded-full bg-zinc-800 border border-zinc-700 text-white flex items-center justify-center hover:bg-zinc-700 transition-colors"
        aria-label="Previous"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-9 h-9 rounded-full bg-zinc-800 border border-zinc-700 text-white flex items-center justify-center hover:bg-zinc-700 transition-colors"
        aria-label="Next"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: GYM_IMAGES.length - 1 }).map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-2 h-2 rounded-full transition-colors ${i === index ? 'bg-blue-400' : 'bg-zinc-600'}`}
          />
        ))}
      </div>
    </div>
  );
}