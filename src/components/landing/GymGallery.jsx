import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const GYM_IMAGES = [
  {
    src: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80',
    alt: 'CrossFit gym interior with barbells and equipment'
  },
  {
    src: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&q=80',
    alt: 'Athletes training in CrossFit box'
  },
  {
    src: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&q=80',
    alt: 'CrossFit workout with kettlebells'
  },
  {
    src: 'https://images.unsplash.com/photo-1546483875-ad9014c88eba?w=800&q=80',
    alt: 'Group fitness class at CrossFit gym'
  }
];

export default function GymGallery() {
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((i) => (i === 0 ? GYM_IMAGES.length - 2 : i - 1));
  const next = () => setIndex((i) => (i >= GYM_IMAGES.length - 2 ? 0 : i + 1));

  const visible = [GYM_IMAGES[index], GYM_IMAGES[(index + 1) % GYM_IMAGES.length]];

  return (
    <div className="relative mt-10">
      <div className="flex gap-4 overflow-hidden">
        {visible.map((img, i) => (
          <motion.div
            key={index + i}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35 }}
            className="flex-1 rounded-2xl overflow-hidden aspect-video"
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}
      </div>

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