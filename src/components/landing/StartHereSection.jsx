import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ExternalLink } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useLanguage } from '../LanguageProvider';

export default function StartHereSection() {
  const { t, language } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);

  const links = [
    {
      title: language === 'ro' ? 'CrossFit.com' : 'CrossFit.com',
      description: language === 'ro' ? 'Site-ul oficial al CrossFit' : 'Official CrossFit website',
      url: 'https://www.crossfit.com',
      image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69948c0d6b8aa61f49f0a23d/d43e8e0de_image.png'
    },
    {
      title: language === 'ro' ? 'CrossFit Games' : 'CrossFit Games',
      description: language === 'ro' ? 'Campionatul mundial CrossFit' : 'CrossFit World Championship',
      url: 'https://games.crossfit.com',
      image: 'https://images.unsplash.com/photo-1517836357463-d25ddfcbf042?w=400&h=400&fit=crop'
    },
    {
      title: language === 'ro' ? 'Jurnale și Publicații' : 'Journals & Publications',
      description: language === 'ro' ? 'Cercetări și articole științifice' : 'Scientific research and articles',
      url: 'https://www.crossfit.com/health/journals-and-publications',
      image: 'https://images.unsplash.com/photo-1507238691854-564c5ac63af3?w=400&h=400&fit=crop'
    }
  ];

  return (
    <section id="starthere" className="py-24 bg-zinc-950 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-sky-600/5 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16">
          
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            <span className="bg-gradient-to-r from-blue-500 to-sky-400 bg-clip-text text-transparent">
              {t("startHereTitle")}
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
            {t("startHereSubtitle")}
          </p>
        </motion.div>

        {/* Preview Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-zinc-900/50 rounded-2xl p-8 border border-zinc-800 mb-8 max-w-4xl mx-auto">
          
          <div className="space-y-6 text-gray-300 leading-relaxed">
            <p>
              {t("startHerePreview")}
            </p>
            
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-6">
                
                <div className="bg-zinc-800/50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-white mb-3">{language === 'ro' ? 'De ce CrossFit?' : 'Why CrossFit?'}</h3>
                  <p>{t("startHereFullText1")}</p>
                </div>

                {/* Video Placeholder */}
                <div className="relative w-full aspect-video bg-zinc-800 rounded-xl overflow-hidden border border-zinc-700">
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-3">
                        <div className="w-0 h-0 border-l-8 border-l-transparent border-r-0 border-t-5 border-t-transparent border-b-5 border-b-transparent" style={{borderLeft: '12px solid transparent', borderRight: '0px', borderTop: '8px solid #0ea5e9', borderBottom: '8px solid #0ea5e9'}} />
                      </div>
                      <p className="text-gray-400">{language === 'ro' ? '[Video placeholder]' : '[Video placeholder]'}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-zinc-800/50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-white mb-3">{language === 'ro' ? 'CrossFit vs Sala Tradițională' : 'CrossFit vs Traditional Gym'}</h3>
                  <p>{t("startHereFullText2")}</p>
                </div>

                {/* Images Grid */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="aspect-video bg-zinc-800 rounded-xl overflow-hidden border border-zinc-700">
                    <img 
                      src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop" 
                      alt="CrossFit" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="aspect-video bg-zinc-800 rounded-xl overflow-hidden border border-zinc-700">
                    <img 
                      src="https://images.unsplash.com/photo-1517836357463-d25ddfcbf042?w=600&h=400&fit=crop" 
                      alt="Training" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="bg-zinc-800/50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-white mb-3">{language === 'ro' ? 'Rezultate Reale' : 'Real Results'}</h3>
                  <p>{t("startHereFullText3")}</p>
                </div>
              </motion.div>
            )}
          </div>

          <motion.button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-6 flex items-center gap-2 text-sky-400 hover:text-sky-300 font-semibold transition-colors"
            whileHover={{ x: 5 }}>
            
            <span>{isExpanded ? (language === 'ro' ? 'Arată Mai Puțin' : 'Show Less') : (language === 'ro' ? 'Citește Mai Departe' : 'Continue Reading')}</span>
            <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
              <ChevronDown className="w-5 h-5" />
            </motion.div>
          </motion.button>
        </motion.div>

        {/* Resources Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16">
          
          <h3 className="text-2xl font-bold text-white mb-8 text-center">
            {language === 'ro' ? 'Resurse Oficiale CrossFit' : 'Official CrossFit Resources'}
          </h3>

          <div className="grid md:grid-cols-3 gap-6">
            {links.map((link, index) => (
              <motion.a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-blue-500/50 transition-all duration-300">
                
                {/* Image */}
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={link.image} 
                    alt={link.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h4 className="text-xl font-bold text-white mb-2 group-hover:text-sky-400 transition-colors">
                    {link.title}
                  </h4>
                  <p className="text-gray-300 text-sm mb-4">{link.description}</p>
                  <div className="flex items-center gap-2 text-sky-400 font-semibold text-sm">
                    <span>{language === 'ro' ? 'Vizitează' : 'Visit'}</span>
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}