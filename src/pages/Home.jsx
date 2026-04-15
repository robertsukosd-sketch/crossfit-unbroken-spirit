import React, { useState, useEffect, useRef } from 'react';
import { ChevronUp } from 'lucide-react';
import { motion } from 'framer-motion';
import LanguageProvider from '@/components/LanguageProvider';
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
import GoogleReviewsSection from '@/components/landing/GoogleReviewsSection';
import InstagramFeedSection from '@/components/landing/InstagramFeedSection';
import SeoMeta from '@/components/landing/SeoMeta';

export default function Home() {
  const [visible, setVisible] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [gclid, setGclid] = useState('');

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    // Capture GCLID and persist it in sessionStorage
    const gclidParam = params.get('gclid');
    if (gclidParam) {
      sessionStorage.setItem('gclid', gclidParam);
      setGclid(gclidParam);
    } else {
      const stored = sessionStorage.getItem('gclid');
      if (stored) setGclid(stored);
    }

    if (params.get('book') === '1' || window.location.hash === '#book-free-session' || window.location.hash === '#clasa-gratis') {
      history.replaceState(null, '', window.location.pathname);
      setIsBookingModalOpen(true);
    } else if (window.location.hash) {
      // Deep-link to section via hash (English and Romanian aliases)
      // All deep-links force Romanian language
      const RO_HASH_MAP = {
        'faq-ro': 'faq',
        'despre-noi': 'about',
        'incepatori': 'starthere',
        'programe': 'programs',
        'orar': 'schedule',
      };
      const raw = window.location.hash.replace('#', '');
      const sectionId = RO_HASH_MAP[raw] || raw;
      localStorage.setItem('language', 'ro');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }, 300);
    }
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
        <StartHereSection />
        <ProgramsSection onBookSession={handleBookSession} />
        <FAQSection onBookSession={handleBookSession} />
        <GoogleReviewsSection />

        {/* Instagram Feed */}
        <InstagramFeedSection />

        <PricingSection onOpenFreeClass={handleBookSession} />
        <ScheduleSection />
        <AppPromoSection />
        <ContactSection />
        <Footer />

        <BookFreeSessionModal isOpen={isBookingModalOpen} onClose={() => setIsBookingModalOpen(false)} gclid={gclid} />
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