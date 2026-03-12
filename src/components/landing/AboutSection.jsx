import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Target, Users, Flame, Trophy } from 'lucide-react';
import { useLanguage } from '../LanguageProvider';

const getFeatures = (t) => [
  {
    icon: Flame,
    title: t("intenseTraining"),
    description: t("intenseTrainingDesc")
  },
  {
    icon: Users,
    title: t("strongCommunity"),
    description: t("strongCommunityDesc")
  },
  {
    icon: Target,
    title: t("professionalCoaching"),
    description: t("professionalCoachingDesc")
  },
  {
    icon: Trophy,
    title: t("visibleResults"),
    description: t("visibleResultsDesc")
  }
];

export default function AboutSection() {
  const { t, language } = useLanguage();
  const features = useMemo(() => getFeatures(t), [language]);

  const handleWODClick = () => {
    sessionStorage.setItem('openFaqId', 'faq-wod-meaning');
    const faqSection = document.getElementById('faq');
    if (faqSection) {
      faqSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(() => {
        const element = document.getElementById('faq-wod-meaning');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 600);
    }
    window.dispatchEvent(new Event('openFaqEvent'));
  };

  return (
    <section id="about" className="py-24 bg-zinc-950 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-16 items-start">
          {/* Left side - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative lg:pt-[11rem]"
          >
            <div className="relative rounded-2xl overflow-hidden aspect-video">
              <iframe
                src="https://www.youtube.com/embed/ot4MjvEGKec"
                title="CrossFit Unbroken Spirit"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full absolute inset-0"
              />
            </div>
            <div className="mt-6 space-y-3">
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                {language === 'ro'
                  ? <>Sala este ușor accesibilă, atât cu transportul în comun, cât și cu mașina.{'\n'}Cea mai apropiată stație de metrou este <span className="font-bold text-sky-300">Mihai Bravu</span>, aflată la aproximativ 7–8 minute de mers pe jos. În același timp, cele mai apropiate stații STB sunt <span className="font-bold text-sky-300">Pod Mihai Bravu</span> pentru linia de autobuz 223 și <span className="font-bold text-sky-300">Pod Mihai Bravu</span> pentru liniile de tramvai 1 și 10.{'\n'}Dacă vii cu mașina, ai un mare avantaj: parcare gratuită inclusă! Nu trebuie să îți faci griji pentru locul de parcare sau costuri suplimentare.</>
                  : <>The box is easily accessible by both public transport and car.{'\n'}The nearest subway station is <span className="font-bold text-sky-300">Mihai Bravu</span>, about a 7–8 minute walk away. The nearest STB stops are <span className="font-bold text-sky-300">Pod Mihai Bravu</span> for bus line 223 and <span className="font-bold text-sky-300">Pod Mihai Bravu</span> for tram lines 1 and 10.{'\n'}If you're coming by car, you have a great advantage: free parking included! No need to worry about finding a spot or extra costs.</>
                }
              </p>
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69948c0d6b8aa61f49f0a23d/4054d6144_image.png"
                alt={language === 'ro' ? 'Hartă traseu spre sală' : 'Map route to the gym'}
                className="w-full rounded-xl border border-zinc-700"
              />
            </div>
          </motion.div>
          
          {/* Right side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:pt-[11rem]"
          >
            <span className="text-sky-400 font-semibold tracking-wider uppercase text-sm">
              {t("aboutUs")}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mt-3 mb-6 leading-tight [text-wrap:balance]">
              {language === 'ro' 
                ? <>Mai mult decât un <span className="text-blue-500">gym</span></>
                : <>More than a <span className="text-blue-500">gym</span></>
              }
            </h2>
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-8 whitespace-pre-line">
              {t("aboutDesc")}
            </p>
            
            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-sky-400" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-white font-bold mb-1">{feature.title}</h3>
                    <p className="text-gray-300 text-sm sm:text-base">
                      {index === 0 ? (
                        <>
                          {language === 'ro' ? (
                            <>
                              <button
                                onClick={handleWODClick}
                                className="text-sky-400 hover:text-sky-300 font-semibold underline transition-colors"
                              >
                                WOD
                              </button>
                              {'-uri care evoluează cu tine.'}
                            </>
                          ) : (
                            <>
                              {'Programming that grows with you.'}
                            </>
                          )}
                        </>
                      ) : (
                        feature.description
                      )}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}