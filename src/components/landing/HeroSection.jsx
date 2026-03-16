import React from 'react';
import { Button } from "@/components/ui/button";
import { ChevronDown } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../LanguageProvider';
import { scrollToSection } from '../config';

export default function HeroSection() {
  const { t, language } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with overlay */}
      <img
        src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69948c0d6b8aa61f49f0a23d/b2dc11465_CrossFit_US-058.jpg"
        alt=""
        aria-hidden="true"
        fetchpriority="high"
        className="absolute inset-0 w-full h-full object-cover object-center blur-sm scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
      
      {/* Logo overlay */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20 hidden">
        <img 
          src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69948c0d6b8aa61f49f0a23d/6f20a4dfe_image.png"
          alt="CrossFit Unbroken Spirit"
          width={500}
          height={500}
          className="w-1/2 max-w-2xl object-contain"
        />
      </div>
      
      {/* Geometric accent */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-600/20 to-transparent transform skew-x-12 origin-top-right" />
      
      {/* Content */}
      <div className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center py-24 px-6">
        <motion.div
          className="text-center max-w-5xl mx-auto flex flex-col items-center gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-2 text-sm font-semibold tracking-widest text-sky-400 uppercase bg-sky-500/10 rounded-full border border-sky-500/30">
            {language === 'ro' ? (
              <>PENTRU TINE. PENTRU COMUNITATE. PENTRU PROGRES.</>
            ) : (
              <>BUILD STRENGTH. FIND COMMUNITY. SET PRs.</>
            )}
          </span>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-tight [text-wrap:balance]">
            {language === 'ro'
              ? <>FORȚĂ. <span className="text-blue-500">COMUNITATE</span>. TRANSFORMĂRI REALE.</>
              : <>STRONG. <span className="text-blue-500">SUPPORTED</span>. STRONGER.</>
            }
          </h1>

          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            {t("heroSubtitle")}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              size="lg"
              onClick={() => {/* TODO: trigger free class modal */}}
              className="bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white px-4 sm:px-8 py-3 sm:py-6 text-xs sm:text-base md:text-lg font-bold rounded-full shadow-lg shadow-blue-500/30 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-300 focus:ring-offset-2 focus:ring-offset-black"
            >
              {language === 'ro' ? 'Rezervă o Clasă Gratuită' : 'Book a Free Class'}
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection('programs')}
              className="bg-transparent text-white hover:bg-white/35 border-2 border-white/50 hover:border-white px-4 sm:px-8 py-3 sm:py-6 text-xs sm:text-base md:text-lg font-bold rounded-full focus:outline-none focus:ring-2 focus:ring-sky-300 focus:ring-offset-2 focus:ring-offset-black"
            >
              {t("discoverThePrograms")}
            </Button>
          </div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.button
        type="button"
        aria-label="Scroll down"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer bg-transparent border-0 p-2"
        animate={shouldReduceMotion ? {} : { y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        onClick={() => scrollToSection('about')}
      >
        <ChevronDown aria-hidden="true" className="w-8 h-8 text-white/60" />
      </motion.button>
    </section>
  );
}