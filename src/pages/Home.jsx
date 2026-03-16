import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import { motion } from 'framer-motion';
import LanguageProvider, { useLanguage } from '@/components/LanguageProvider';
import Navigation from '@/components/landing/Navigation';
import HeroSection from '@/components/landing/HeroSection';
import AboutSection from '@/components/landing/AboutSection';
import StartHereSection from '@/components/landing/StartHereSection';
import ProgramsSection from '@/components/landing/ProgramsSection';
import PricingSection from '@/components/landing/PricingSection';
import ScheduleSection from '@/components/landing/ScheduleSection';
import ContactSection from '@/components/landing/ContactSection';
import Footer from '@/components/landing/Footer';
import AccessibilityToolbar from '@/components/landing/AccessibilityToolbar';
import CookieConsent from '@/components/landing/CookieConsent';
import BookFreeSessionModal from '@/components/landing/BookFreeSessionModal';
import MobileFooterBar from '@/components/landing/MobileFooterBar';
import AppPromoSection from '@/components/landing/AppPromoSection';
import FAQSection from '@/components/landing/FAQSection';
import CoachesSection from '@/components/landing/CoachesSection';

function SeoMeta() {
  const { language } = useLanguage();
  useEffect(() => {
    if (language === 'ro') {
      document.title = 'CrossFit Unbroken Spirit - Forță. Comunitate. Rezultate.';
      document.querySelector('meta[name="description"]')?.setAttribute('content', 'Descoperă potențialul tău maxim la CrossFit Unbroken Spirit. Antrenamente funcționale de înaltă intensitate, coaching dedicat și o comunitate puternică. CrossFit pentru toate nivelurile de fitness.');
      document.documentElement.lang = 'ro';
    } else {
      document.title = 'CrossFit Unbroken Spirit - Strength. Community. Results.';
      document.querySelector('meta[name="description"]')?.setAttribute('content', 'Discover your maximum potential at CrossFit Unbroken Spirit. High-intensity functional training, dedicated coaching, and a strong community for real results. CrossFit for all fitness levels.');
      document.documentElement.lang = 'en';
    }
  }, [language]);
  return null;
}

export default function Home() {
  const [visible, setVisible] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Add meta description tag if it doesn't exist
    if (!document.querySelector('meta[name="description"]')) {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'CrossFit Unbroken Spirit - Forță. Comunitate. Rezultate.';
      document.head.appendChild(meta);
    }
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleBookSession = () => {
    setIsBookingModalOpen(true);
  };

  return (
    <LanguageProvider>
      <SeoMeta />
      <div className="min-h-screen bg-black pb-20 lg:pb-0">
        <Navigation onBookSession={handleBookSession} isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
        <HeroSection onOpenFreeClass={handleBookSession} />
        <AboutSection />
        <CoachesSection />
        <StartHereSection />
        <ProgramsSection onBookSession={handleBookSession} />
        <PricingSection onOpenFreeClass={handleBookSession} />
        <ScheduleSection />
        <AppPromoSection />
        <FAQSection onBookSession={handleBookSession} />
        <ContactSection />
        <Footer />

        <BookFreeSessionModal isOpen={isBookingModalOpen} onClose={() => setIsBookingModalOpen(false)} />
        <AccessibilityToolbar />
        <CookieConsent />

        <MobileFooterBar
          onBookSession={handleBookSession}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />

        {visible && (
          <>
            {/* Desktop: bottom-right */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="hidden lg:flex fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-500 text-white items-center justify-center shadow-lg transition-[background-color] duration-200 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:ring-offset-2 focus:ring-offset-black"
              aria-label="Back to top"
            >
              <ChevronUp className="w-6 h-6" />
            </button>
            {/* Mobile: right side above footer */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="lg:hidden fixed bottom-[72px] right-4 z-50 w-11 h-11 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center shadow-lg transition-[background-color] duration-200 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:ring-offset-2 focus:ring-offset-black"
              aria-label="Back to top"
            >
              <ChevronUp className="w-5 h-5" />
            </button>
          </>
        )}
      </div>
    </LanguageProvider>
  );
}