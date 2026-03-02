import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Smartphone } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import LogoSVG from './LogoSVG';
import { useLanguage } from '../LanguageProvider';
import { openAppWithFallback } from '../appStoreUtils';

const getNavLinks = (t) => [
  { name: t("home"), href: "#hero" },
  { name: t("startHere"), href: "#starthere" },
  { name: t("programs"), href: "#programs" },
  { name: t("pricing"), href: "#pricing" },
  { name: t("schedule"), href: "#schedule" },
  { name: t("contact"), href: "#contact" },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, changeLanguage, t } = useLanguage();
  const navLinks = getNavLinks(t);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href) => {
    const id = href.replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-colors transition-shadow duration-300",
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
              onClick={(e) => { e.preventDefault(); scrollToSection('#hero'); }}
              className="flex items-center gap-3 flex-shrink-0"
            >
              <LogoSVG size={60} />
              <div className="hidden sm:block text-center leading-tight">
                <div className="text-lg font-black text-white tracking-wide">CrossFit</div>
                <div className="text-sm font-black text-blue-400 uppercase tracking-wide">UNBROKEN SPIRIT</div>
              </div>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                  className="text-gray-200 hover:text-white font-medium transition-colors relative group text-sm"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-[width] group-hover:w-full" />
                </a>
              ))}
            </div>

            {/* Language & CTA Button */}
            <div className="hidden lg:flex items-center gap-4">
              <div className="flex gap-1 bg-zinc-900 rounded-full p-1">
                <button
                    type="button"
                    onClick={() => changeLanguage('ro')}
                    className={cn(
                      "px-3 py-1 rounded-full text-sm font-semibold transition-colors",
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
                    className={cn(
                      "px-3 py-1 rounded-full text-sm font-semibold transition-colors",
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
                onClick={() => openAppWithFallback()}
                animate={{ boxShadow: ['0 0 0px #38bdf8', '0 0 12px #38bdf8', '0 0 0px #38bdf8'] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold text-white transition-all overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #1e3a5f 0%, #0ea5e9 50%, #1e3a5f 100%)', backgroundSize: '200% 100%' }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.span
                  className="absolute inset-0 rounded-full"
                  animate={{ opacity: [0, 0.3, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{ background: 'radial-gradient(circle, #7dd3fc 0%, transparent 70%)' }}
                />
                <Smartphone className="w-4 h-4 text-sky-300 relative z-10" />
                <span className="relative z-10">ThunderWOD App</span>
                <motion.span
                  className="relative z-10 text-[10px] bg-sky-400 text-black font-black px-1.5 py-0.5 rounded-full leading-none"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  NEW
                </motion.span>
              </motion.button>
              <Button
                onClick={() => {
                  document.getElementById('thunderwod-app')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  setIsMobileMenuOpen(false);
                }}
                className="bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white font-bold rounded-full px-6"
              >
                {t("freeTrial")}
              </Button>
            </div>

            {/* ThunderWOD App - Mobile Header */}
            <div className="lg:hidden flex-1 flex justify-center px-1 min-w-0 overflow-hidden">
              <motion.button
                type="button"
                onClick={() => openAppWithFallback()}
                animate={{ boxShadow: ['0 0 0px #38bdf8', '0 0 10px #38bdf8', '0 0 0px #38bdf8'] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="relative flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-white overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #1e3a5f 0%, #0ea5e9 50%, #1e3a5f 100%)' }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.span
                  className="absolute inset-0 rounded-full"
                  animate={{ opacity: [0, 0.3, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{ background: 'radial-gradient(circle, #7dd3fc 0%, transparent 70%)' }}
                />
                <Smartphone className="w-3.5 h-3.5 text-sky-300 relative z-10" />
                <span className="relative z-10">ThunderWOD</span>
                <motion.span
                  className="relative z-10 text-[9px] bg-sky-400 text-black font-black px-1 py-0.5 rounded-full leading-none"
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  NEW
                </motion.span>
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
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-white"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
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
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="block text-2xl font-bold text-white hover:text-blue-400 transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="pt-6"
              >

                <Button
                  onClick={() => {
                    document.getElementById('thunderwod-app')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full bg-gradient-to-r from-blue-600 to-sky-500 text-white font-bold rounded-full py-6 text-lg"
                >
                  {t("freeTrial")}
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}