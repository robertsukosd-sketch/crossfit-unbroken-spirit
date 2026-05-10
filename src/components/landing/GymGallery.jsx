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
      { src: 'https://media.base44.com/images/public/69948c0d6b8aa61f49f0a23d/74846832a__STX0680.jpg', alt: 'Echipamente CrossFit Unbroken Spirit București - ski erg Rogue' },
      { src: 'https://media.base44.com/images/public/69948c0d6b8aa61f49f0a23d/107bc8b5e__STX0693.jpg', alt: 'Rig CrossFit și bare olimpice Rogue București' },
      { src: 'https://media.base44.com/images/public/69948c0d6b8aa61f49f0a23d/b4c10b148__STX0690.jpg', alt: 'Rowere Concept2 și benzi elastice CrossFit București' },
      { src: 'https://media.base44.com/images/public/69948c0d6b8aa61f49f0a23d/00cbf4801__STX0682.jpg', alt: 'Bike erg Rogue și box-uri CrossFit Unbroken Spirit' },
      { src: 'https://media.base44.com/images/public/69948c0d6b8aa61f49f0a23d/817e9eed8__STX0679.jpg', alt: 'Interior sală CrossFit Unbroken Spirit București' },
      { src: 'https://media.base44.com/images/public/69948c0d6b8aa61f49f0a23d/9d3e4fe75__STX0678.jpg', alt: 'Inele gimnastică CrossFit Unbroken Spirit' },
      { src: 'https://media.base44.com/images/public/69948c0d6b8aa61f49f0a23d/8cbe3ba28__STX0676.jpg', alt: 'Rig albastru CrossFit Unbroken Spirit București' },
      { src: 'https://media.base44.com/images/public/69948c0d6b8aa61f49f0a23d/909efe9d3__STX0673.jpg', alt: 'Discuri bumper CrossFit Unbroken Spirit București' },
      { src: 'https://media.base44.com/images/public/69948c0d6b8aa61f49f0a23d/00310abb7__STX0670.jpg', alt: 'Bară olimpică încărcată CrossFit București' },
      { src: 'https://media.base44.com/images/public/69948c0d6b8aa61f49f0a23d/a52f9db8d__STX0667.jpg', alt: 'Magnesium bucket CrossFit Unbroken Spirit București' },
      { src: 'https://media.base44.com/images/public/69948c0d6b8aa61f49f0a23d/60f225d34__STX0653.jpg', alt: 'Wall balls și gantere Rogue CrossFit București' },
      { src: 'https://media.base44.com/images/public/69948c0d6b8aa61f49f0a23d/d8b0b6b23__STX0650.jpg', alt: 'Gantere și kettlebells CrossFit Unbroken Spirit' },
      { src: 'https://media.base44.com/images/public/69948c0d6b8aa61f49f0a23d/c52927545__STX0642.jpg', alt: 'Echipamente Rogue CrossFit București' },
      { src: 'https://media.base44.com/images/public/69948c0d6b8aa61f49f0a23d/ab7ce4733__STX0639.jpg', alt: 'Ski erg și bike erg CrossFit Unbroken Spirit' },
      { src: 'https://media.base44.com/images/public/69948c0d6b8aa61f49f0a23d/a5ced495c__STX0637.jpg', alt: 'Suport bară CrossFit Rogue București' },
      { src: 'https://media.base44.com/images/public/69948c0d6b8aa61f49f0a23d/8158af1da__STX0635.jpg', alt: 'Inele și rig CrossFit Unbroken Spirit București' },
      { src: 'https://media.base44.com/images/public/69948c0d6b8aa61f49f0a23d/b3b23748b__STX0634.jpg', alt: 'Rig CrossFit și echipamente cardio Rogue' },
      { src: 'https://media.base44.com/images/public/69948c0d6b8aa61f49f0a23d/e4d6453a2__STX0633.jpg', alt: 'Bike erg Rogue CrossFit Unbroken Spirit București' },
      { src: 'https://media.base44.com/images/public/69948c0d6b8aa61f49f0a23d/a6adf1f77__STX0626.jpg', alt: 'Bancă CrossFit Unbroken Spirit București' },
      { src: 'https://media.base44.com/images/public/69948c0d6b8aa61f49f0a23d/b63a5fa9d__STX0625.jpg', alt: 'Echo bike Rogue CrossFit Unbroken Spirit' },
      { src: 'https://media.base44.com/images/public/69948c0d6b8aa61f49f0a23d/5baf29a21__STX0623.jpg', alt: 'Echo bike Rogue în sala CrossFit București' },
      { src: 'https://media.base44.com/images/public/69948c0d6b8aa61f49f0a23d/b5ca66296__STX0619.jpg', alt: 'Ski erg Rogue CrossFit Unbroken Spirit' },
      { src: 'https://media.base44.com/images/public/69948c0d6b8aa61f49f0a23d/e9ae44f08__STX0618.jpg', alt: 'Monitor ski erg Rogue CrossFit București' },
      { src: 'https://media.base44.com/images/public/69948c0d6b8aa61f49f0a23d/e9236ba2c__STX0703.jpg', alt: 'Discuri Rogue CrossFit Unbroken Spirit București' },
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
      { src: 'https://media.base44.com/images/public/69948c0d6b8aa61f49f0a23d/c57fe914e__STX0603.jpg', alt: 'Dulapuri albastre vestiar CrossFit Unbroken Spirit București' },
      { src: 'https://media.base44.com/images/public/69948c0d6b8aa61f49f0a23d/2b479a80b__STX0602.jpg', alt: 'Spațiu vestiar CrossFit Unbroken Spirit București' },
      { src: 'https://media.base44.com/images/public/69948c0d6b8aa61f49f0a23d/a483175f3__STX0595.jpg', alt: 'Vestiar luminos CrossFit Unbroken Spirit București' },
      { src: 'https://media.base44.com/images/public/69948c0d6b8aa61f49f0a23d/1a9145e48__STX0599.jpg', alt: 'Chiuvetă baie vestiar CrossFit Unbroken Spirit București' },
      { src: 'https://media.base44.com/images/public/69948c0d6b8aa61f49f0a23d/cae2c0664__STX0601.jpg', alt: 'Oglindă și uscător vestiar CrossFit Unbroken Spirit București' },
      { src: 'https://media.base44.com/images/public/69948c0d6b8aa61f49f0a23d/e2c87a790__STX0605.jpg', alt: 'Bănci și cuiere vestiar CrossFit Unbroken Spirit București' },
    ],
  },
  {
    id: 'exterior',
    labelRo: 'Exterior',
    labelEn: 'Exterior',
    images: [
      { src: 'https://media.base44.com/images/public/69948c0d6b8aa61f49f0a23d/8c76452a3__STX0705.jpg', alt: 'Poartă acces CrossFit Unbroken Spirit București' },
      { src: 'https://media.base44.com/images/public/69948c0d6b8aa61f49f0a23d/6cf107ea9__STX0708.jpg', alt: 'Acces exterior CrossFit Unbroken Spirit București' },
      { src: 'https://media.base44.com/images/public/69948c0d6b8aa61f49f0a23d/f80150a75__STX0696.jpg', alt: 'Drum de acces CrossFit Unbroken Spirit București' },
      { src: 'https://media.base44.com/images/public/69948c0d6b8aa61f49f0a23d/1fdbf19eb__STX0702.jpg', alt: 'Exterior sală CrossFit Unbroken Spirit Splaiul Unirii' },
      { src: 'https://media.base44.com/images/public/69948c0d6b8aa61f49f0a23d/ce6542888__STX0700.jpg', alt: 'Fațadă CrossFit Unbroken Spirit București' },
      { src: 'https://media.base44.com/images/public/69948c0d6b8aa61f49f0a23d/a715292a7__STX0697.jpg', alt: 'Intrare CrossFit Unbroken Spirit București cu rastel biciclete' },
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
    if (activeImages.length > 0) setLightboxIndex(imgIndex);
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
    <div className="relative mt-10" aria-labelledby="gallery-title">
      <div className="text-center max-w-5xl mx-auto mb-8">
        <span className="text-sky-400 font-semibold tracking-wider uppercase text-sm">
          {language === 'ro' ? 'Galerie foto' : 'Photo Gallery'}
        </span>
        <h2 id="gallery-title" className="text-3xl sm:text-4xl md:text-5xl font-black text-white mt-3 mb-4 leading-tight">
          {language === 'ro' ? <>Vezi sala CrossFit Unbroken Spirit<br />din București</> : 'Explore CrossFit Unbroken Spirit Bucharest'}
        </h2>
        <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
          {language === 'ro'
            ? <>Descoperă echipamentele Rogue și ThunderWOD, zona de antrenament, vestiarele<br />și drumul de acces la sala noastră de CrossFit din București, Splaiul Unirii 257-259.</>
            : 'See our Rogue equipment, training space, locker rooms and exterior access at our CrossFit gym in Bucharest.'}
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-6" role="tablist" aria-label={language === 'ro' ? 'Categorii galerie foto' : 'Photo gallery categories'}>
        {GALLERY_GROUPS.map((group) => {
          const isActive = activeGallery === group.id;
          return (
            <button
              key={group.id}
              onClick={() => selectGallery(group.id)}
              role="tab"
              aria-selected={isActive}
              aria-controls={`gallery-panel-${group.id}`}
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
        <div id={`gallery-panel-${activeGroup.id}`} role="tabpanel" className="rounded-2xl border border-dashed border-zinc-700 bg-zinc-900/50 p-10 text-center text-gray-400">
          {language === 'ro' ? 'Fotografiile vor fi adăugate în curând.' : 'Photos will be added soon.'}
        </div>
      ) : (
      <div id={`gallery-panel-${activeGroup.id}`} role="tabpanel" className="flex gap-4 overflow-hidden">
        <AnimatePresence mode="sync">
          {visible.map((img, i) => (
            <motion.figure
              key={img.src}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="flex-1 rounded-2xl overflow-hidden aspect-video cursor-pointer"
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
              <figcaption className="sr-only">{img.alt}</figcaption>
            </motion.figure>
          ))}
        </AnimatePresence>
      </div>
      )}

      {/* Image Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center"
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
                className="max-w-[96vw] max-h-[88vh] object-contain px-4 sm:px-12"
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