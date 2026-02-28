import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Smartphone } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import LogoSVG from './LogoSVG';
import { useLanguage } from '../LanguageProvider';

const getNavLinks = (t) => [
  { name: t("home"), href: "#hero" },
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
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled 
            ? "bg-black/90 backdrop-blur-lg border-b border-zinc-800" 
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a 
              href="#hero"
              onClick={(e) => { e.preventDefault(); scrollToSection('#hero'); }}
              className="flex items-center gap-3"
            >
              <LogoSVG size={60} />
              <div className="hidden sm:block text-center leading-tight">
                <div className="text-lg font-black text-white uppercase tracking-wide">CROSSFIT</div>
                <div className="text-sm font-black text-blue-400 uppercase tracking-wide">UNBROKEN SPIRIT</div>
              </div>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                  className="text-gray-300 hover:text-white font-medium transition-colors relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full" />
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
                      "px-3 py-1 rounded-full text-sm font-semibold transition-all",
                      language === 'ro' 
                        ? "bg-blue-500 text-white" 
                        : "text-gray-400 hover:text-white"
                    )}
                  >
                    RO
                  </button>
                  <button
                    type="button"
                    onClick={() => changeLanguage('en')}
                    className={cn(
                      "px-3 py-1 rounded-full text-sm font-semibold transition-all",
                      language === 'en' 
                        ? "bg-blue-500 text-white" 
                        : "text-gray-400 hover:text-white"
                    )}
                  >
                    EN
                  </button>
              </div>
              <button
                type="button"
                onClick={() => scrollToSection('#contact')}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-600 text-gray-300 hover:text-white hover:border-zinc-400 text-sm font-medium transition-all"
              >
                <Smartphone className="w-4 h-4 text-sky-400" />
                ThunderWOD App
              </button>
              <Button
                onClick={() => scrollToSection('#contact')}
                className="bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white font-bold rounded-full px-6"
              >
                {t("freeTrial")}
              </Button>
            </div>

            {/* Language Toggle Mobile */}
            <div className="lg:hidden flex items-center gap-2">
              <div className="flex gap-1 bg-zinc-900 rounded-full p-1">
                <button
                    type="button"
                    onClick={() => changeLanguage('ro')}
                    className={cn(
                      "px-2 py-1 rounded-full text-xs font-semibold transition-all",
                      language === 'ro' 
                        ? "bg-blue-500 text-white" 
                        : "text-gray-400"
                    )}
                  >
                    RO
                  </button>
                  <button
                    type="button"
                    onClick={() => changeLanguage('en')}
                    className={cn(
                      "px-2 py-1 rounded-full text-xs font-semibold transition-all",
                      language === 'en' 
                        ? "bg-blue-500 text-white" 
                        : "text-gray-400"
                    )}
                  >
                    EN
                  </button>
              </div>
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-white"
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
                <a
                  href="https://apps.apple.com/app/thunderwod/id1607744328"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full border border-zinc-600 text-gray-300 rounded-full py-3 text-base font-medium"
                >
                  <Smartphone className="w-5 h-5 text-sky-400" />
                  ThunderWOD App
                </a>
                <Button
                  onClick={() => scrollToSection('#contact')}
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