import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import { motion } from 'framer-motion';
import LanguageProvider from '@/components/LanguageProvider';
import Navigation from '@/components/landing/Navigation';
import HeroSection from '@/components/landing/HeroSection';
import AboutSection from '@/components/landing/AboutSection';
import ProgramsSection from '@/components/landing/ProgramsSection';
import PricingSection from '@/components/landing/PricingSection';
import ScheduleSection from '@/components/landing/ScheduleSection';
import ContactSection from '@/components/landing/ContactSection';
import Footer from '@/components/landing/Footer';
import AccessibilityToolbar from '@/components/landing/AccessibilityToolbar';
import CookieConsent from '@/components/landing/CookieConsent';

export default function Home() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-black">
        <Navigation />
        <div id="hero">
          <HeroSection />
        </div>
        <motion.div className="py-20" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <AboutSection />
        </motion.div>
        <motion.div className="py-20" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <ProgramsSection />
        </motion.div>
        <motion.div className="py-20" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <PricingSection />
        </motion.div>
        <motion.div className="py-20" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <ScheduleSection />
        </motion.div>
        <motion.div className="py-20" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <ContactSection />
        </motion.div>
        <Footer />

        <AccessibilityToolbar />
        <CookieConsent />

        {visible && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-6 z-50 w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center shadow-lg transition-all"
            aria-label="Back to top"
          >
            <ChevronUp className="w-6 h-6" />
          </button>
        )}
      </div>
    </LanguageProvider>
  );
}