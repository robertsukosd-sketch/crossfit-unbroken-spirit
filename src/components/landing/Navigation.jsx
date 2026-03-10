import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Menu, X, Smartphone } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Logo from './Logo';
import { useLanguage } from '../LanguageProvider';
import { openAppWithFallback } from '../appStoreUtils';
import { scrollToSection } from '../config';

const getNavLinks = (t) => [
  { name: t("home"), href: "#hero" },
  { name: t("startHere"), href: "#starthere" },
  { name: t("programs"), href: "#programs" },
  { name: t("pricing"), href: "#pricing" },
  { name: t("schedule"), href: "#schedule" },
  { name: t("contact"), href: "#contact" },
  { name: "ThunderWOD App", href: "#app-promo-section" },
];

export default function Navigation({ onBookSession, isMobileMenuOpen, setIsMobileMenuOpen }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const { language, changeLanguage, t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const navLinks = useMemo(() => getNavLinks(t), [language]);

  const sectionIds = ['hero', 'starthere', 'programs', 'pricing', 'app-promo-section', 'schedule', 'contact'];

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 50);

    const scrollMid = window.scrollY + window.innerHeight / 2;
    let closest = sectionIds[0];
    let closestDist = Infinity;
    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const mid = el.offsetTop + el.offsetHeight / 2;
      const dist = Math.abs(scrollMid - mid);
      if (dist < closestDist) {
        closestDist = dist;
        closest = id;
      }
    });
    setActiveSection(closest);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const scrollNavToSection = useCallback((href) => {
    const id = href.replace('#', '');
    setActiveSection(id);
    scrollToSection(id);
    setIsMobileMenuOpen(false);
  }, []);

  const handleBookClick = () => {
    onBookSession();
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-[color,background-color,border-color,box-shadow] duration-300",
          isScrolled 
            ? "bg-black/90 backdrop-blur-lg border-b border-zinc-800" 
            : "bg-black/70 backdrop-blur-sm lg:bg-transparent lg:backdrop-blur-none"
        )}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a 
             href="#hero"
             onClick={(e) => { e.preventDefault(); scrollToSection('hero'); }}
             className="flex items-center gap-3 flex-shrink-0"
            >
              <Logo size={68} />
              <div className="hidden sm:block text-center leading-tight">
                <div className="text-xl font-black text-white tracking-wide">CrossFit</div>
                <div className="text-sm font-black text-blue-400 uppercase tracking-wide">UNBROKEN SPIRIT</div>
              </div>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-4">
              {navLinks.map((link) => {
                const sectionId = link.href.replace('#', '');
                const isActive = activeSection === sectionId;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); scrollNavToSection(link.href); }}
                    className={cn(
                      "font-medium transition-colors relative group text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1",
                      isActive ? "text-blue-400" : "text-gray-200 hover:text-white"
                    )}
                  >
                    {link.name}
                    <span className={cn(
                      "absolute -bottom-1 left-0 h-0.5 bg-blue-500 transition-[width]",
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    )} />
                  </a>
                );
              })}
            </div>

            {/* Language & CTA Button */}
            <div className="hidden lg:flex items-center gap-4">
              <div className="flex gap-1 bg-zinc-900 rounded-full p-1">
                 <button
                    type="button"
                    onClick={() => changeLanguage('ro')}
                    aria-label="Switch to Romanian"
                    className={cn(
                      "px-3 py-1 rounded-full text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500",
                      language === 'ro' 
                        ? "bg-blue-500 text-white" 
                        : "text-gray-300 hover:text-white"
                    )}
                  >
                    RO
                  </button>
                  <button
                    type="button"
                    onClick={() => changeLanguage('en')}
                    aria-label="Switch to English"
                    className={cn(
                      "px-3 py-1 rounded-full text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500",
                      language === 'en' 
                        ? "bg-blue-500 text-white" 
                        : "text-gray-300 hover:text-white"
                    )}
                  >
                    EN
                  </button>
              </div>
              <motion.button
                type="button"
                onClick={handleBookClick}
                animate={shouldReduceMotion ? {} : { boxShadow: ['0 0 0px #38bdf8', '0 0 18px #38bdf8', '0 0 0px #38bdf8'] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="relative flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-white overflow-hidden whitespace-nowrap flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #0369a1 0%, #0ea5e9 50%, #0369a1 100%)' }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.span
                  className="absolute inset-0 rounded-full"
                  animate={shouldReduceMotion ? { opacity: 0 } : { opacity: [0, 0.4, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{ background: 'radial-gradient(circle, #7dd3fc 0%, transparent 70%)' }}
                />
                <span className="relative z-10">{t("freeTrial")}</span>
              </motion.button>
            </div>



            {/* Language Toggle Mobile + Menu Button */}
            <div className="lg:hidden flex items-center gap-2 flex-shrink-0">
              <div className="flex flex-row gap-0.5 bg-zinc-900 rounded-full p-1">
                <button
                    type="button"
                    onClick={() => changeLanguage('ro')}
                    aria-label="Switch to Romanian"
                    className={cn(
                      "min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full text-xs font-semibold transition-colors",
                      language === 'ro' 
                        ? "bg-blue-500 text-white" 
                        : "text-gray-300 hover:text-white"
                    )}
                  >
                    RO
                  </button>
                  <button
                    type="button"
                    onClick={() => changeLanguage('en')}
                    aria-label="Switch to English"
                    className={cn(
                      "min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full text-xs font-semibold transition-colors",
                      language === 'en' 
                        ? "bg-blue-500 text-white" 
                        : "text-gray-300 hover:text-white"
                    )}
                  >
                    EN
                  </button>
              </div>

            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-lg pt-24 lg:hidden"
          >
            <div className="px-6 py-8 space-y-6">
              {navLinks.map((link, index) => (
                <motion.button
                   key={link.name}
                   type="button"
                   onClick={() => scrollNavToSection(link.href)}
                   initial={{ opacity: 0, x: -20 }}
                   animate={{ opacity: 1, x: 0 }}
                   transition={{ delay: index * 0.1 }}
                   className="block w-full text-left text-2xl font-bold text-white hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-3 py-2"
                 >
                   {link.name}
                 </motion.button>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="pt-6 flex flex-col gap-3"
              >
                <motion.button
                  type="button"
                  onClick={handleBookClick}
                  animate={shouldReduceMotion ? {} : { boxShadow: ['0 0 0px #38bdf8', '0 0 12px #38bdf8', '0 0 0px #38bdf8'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative w-full flex items-center justify-center gap-2 px-6 py-4 rounded-full text-base font-bold text-white overflow-hidden"
                  style={{ background: 'linear-gradient(135deg, #0369a1 0%, #0ea5e9 50%, #0369a1 100%)' }}
                >
                  <motion.span
                    className="absolute inset-0 rounded-full"
                    animate={shouldReduceMotion ? { opacity: 0 } : { opacity: [0, 0.3, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{ background: 'radial-gradient(circle, #7dd3fc 0%, transparent 70%)' }}
                  />
                  <span className="relative z-10">{t("freeTrial")}</span>
                </motion.button>


              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </>
      );
      }