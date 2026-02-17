import React from 'react';
import LanguageProvider from '@/components/LanguageProvider';
import Navigation from '@/components/landing/Navigation';
import HeroSection from '@/components/landing/HeroSection';
import AboutSection from '@/components/landing/AboutSection';
import ProgramsSection from '@/components/landing/ProgramsSection';
import PricingSection from '@/components/landing/PricingSection';
import ScheduleSection from '@/components/landing/ScheduleSection';
import ContactSection from '@/components/landing/ContactSection';
import Footer from '@/components/landing/Footer';

export default function Home() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-black">
        <Navigation />
        <div id="hero">
          <HeroSection />
        </div>
        <AboutSection />
        <ProgramsSection />
        <PricingSection />
        <ScheduleSection />
        <ContactSection />
        <Footer />
      </div>
    </LanguageProvider>
  );
}