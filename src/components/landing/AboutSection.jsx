import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Target, Users, Flame, Trophy, Dumbbell, Play, MapPin } from 'lucide-react';
import { useLanguage } from '../LanguageProvider';
import GymGallery from './GymGallery';

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

// Static map thumbnail (Google Maps Static API - no JS, lightweight)
const MAP_STATIC_PREVIEW = 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69948c0d6b8aa61f49f0a23d/4054d6144_image.png';
// Interactive embed — only loaded on click
const MAP_EMBED_URL = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1026m!2d26.126472!3d44.408234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b1ff2ad7df5f99%3A0x83693788dcfc4734!2sCrossFit%20Unbroken%20Spirit!5e0!3m2!1sro!2sro!4v1713523200000';

export default function AboutSection() {
  const { t, language } = useLanguage();
  const features = useMemo(() => getFeatures(t), [language]);
  const [videoActive, setVideoActive] = useState(false);
  const [mapActive, setMapActive] = useState(false);

  const handleWODClick = () => {
    sessionStorage.setItem('openFaqId', 'faq-wod-meaning');
    const faqSection = document.getElementById('faq');
    if (faqSection) {
      faqSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(() => {
        window.dispatchEvent(new Event('openFaqEvent'));
      }, 100);
    }
  };

  return (
    <section id="about" className="py-24 bg-zinc-950 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Top row: video (left) + text/heading (right) */}
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-16 items-start">
          {/* Left: Video */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative rounded-2xl overflow-hidden aspect-video bg-zinc-900">
              {videoActive ? (
                <iframe
                  src="https://www.youtube.com/embed/ot4MjvEGKec?autoplay=1"
                  title="CrossFit Unbroken Spirit"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full absolute inset-0"
                />
              ) : (
                <button
                  onClick={() => setVideoActive(true)}
                  className="w-full h-full absolute inset-0 group"
                  aria-label="Redă videoclipul CrossFit Unbroken Spirit"
                >
                  <img
                    src="https://i.ytimg.com/vi/ot4MjvEGKec/maxresdefault.jpg"
                    alt="CrossFit Unbroken Spirit - video preview"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-200 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-red-600 group-hover:bg-red-500 transition-colors duration-200 flex items-center justify-center shadow-2xl">
                      <Play className="w-7 h-7 text-white ml-1" fill="white" />
                    </div>
                  </div>
                </button>
              )}
            </div>
          </motion.div>

          {/* Right: Heading + description only */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
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
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed whitespace-pre-line">
              {t("aboutDesc")}
            </p>
          </motion.div>
        </div>

        {/* Bottom row: transport text above, then map + features side by side */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-6"
        >
          {/* Text sits only above the map (left half) */}
          <div className="grid lg:grid-cols-2 gap-12 xl:gap-16">
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed whitespace-pre-line lg:col-start-1">
              {language === 'ro'
                ? <>Sala este ușor accesibilă atât cu transportul în comun, cât și cu mașina.{'\n'}Cea mai apropiată stație de metrou este <span className="font-bold text-sky-300">Mihai Bravu</span>, la 7–8 minute de mers pe jos, iar stațiile STB din apropiere sunt <span className="font-bold text-sky-300">Pod Mihai Bravu</span> (autobuz 223 și tramvaie 1 și 10).{'\n'}Pentru cei care vin cu mașina, există parcare gratuită inclusă!</>
                : <>The box is easily accessible by both public transport and car.{'\n'}The nearest subway station is <span className="font-bold text-sky-300">Mihai Bravu</span>, a 7–8 minute walk away, and the nearby STB stops are <span className="font-bold text-sky-300">Pod Mihai Bravu</span> (bus 223 and trams 1 and 10).{'\n'}For those coming by car, free parking is included!</>
              }
            </p>
            {/* Empty right cell so text stays left only */}
            <div className="hidden lg:block" />
          </div>

          <div className="grid lg:grid-cols-2 gap-12 xl:gap-16 items-start mt-3">
            {/* Interactive map — loads iframe only on click */}
            <div className="relative w-full rounded-xl overflow-hidden border border-zinc-700 aspect-[8/3] bg-zinc-900">
              {mapActive ? (
                <iframe
                  src={MAP_EMBED_URL}
                  title={language === 'ro' ? 'Hartă CrossFit Unbroken Spirit' : 'CrossFit Unbroken Spirit Map'}
                  className="w-full h-full absolute inset-0 border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              ) : (
                <button
                  onClick={() => setMapActive(true)}
                  className="w-full h-full absolute inset-0 group"
                  aria-label={language === 'ro' ? 'Deschide harta interactivă' : 'Open interactive map'}
                >
                  <img
                    src={MAP_STATIC_PREVIEW}
                    alt={language === 'ro' ? 'Hartă traseu spre sală' : 'Map route to the gym'}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-200 flex items-center justify-center">
                    <div className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white text-zinc-900 font-bold text-sm shadow-xl group-hover:scale-105 transition-transform duration-200">
                      <MapPin className="w-4 h-4 text-red-500" />
                      {language === 'ro' ? 'Deschide harta' : 'Open map'}
                    </div>
                  </div>
                </button>
              )}
            </div>

            {/* Features grid — top aligned with map */}
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
                            <>{'Programming that grows with you.'}</>
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
          </div>
        </motion.div>

        {/* Gallery */}
        <GymGallery />

        {/* Coaches Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 pt-24 border-t border-zinc-900"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">
              {language === 'ro' ? 'Antrenorii' : 'Meet Our Coaches'}
            </h2>
            <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
              {language === 'ro' 
                ? <>Echipa noastră e alcătuită din antrenori pasionați,<br />care te vor ajuta să-ți atingi obiectivele.</>
                : 'Our team consists of coaches passionate about helping you reach your goals.'}
            </p>
          </div>

          {/* Coaches Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(() => {
              const images = [
                { id: 1, src: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69948c0d6b8aa61f49f0a23d/18d3ab544_CrossFit_US-148A.jpg', objectPosition: '50% 5%' },
                { id: 2, src: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69948c0d6b8aa61f49f0a23d/9884b0a50_CrossFit_US-138M.jpg', objectPosition: '50% 5%' },
                { id: 3, src: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69948c0d6b8aa61f49f0a23d/02fa5e0e6_CrossFit_US-140R.jpg', objectPosition: '50% 5%' },
              ];

              const coaches = [
                {
                  id: 3,
                  name: 'Andrei Vârnav',
                  certifications: language === 'ro'
                    ? ['8 ani înot de performanță\n& medaliat național', '7 ani handbal de performanță\n& campion național', '4 ani Head Judge la OMBC Throwdown', 'Strength & Conditioning']
                    : ['8 years competitive swimming\n& national medalist', '7 years competitive handball\n& national champion', '4 years Head Judge at OMBC Throwdown', 'Strength & Conditioning'],
                  experience: language === 'ro' ? '8 ani în CrossFit' : '8 years in CrossFit',
                },
                {
                  id: 2,
                  name: 'Dumitru Mîndrescu',
                  certifications: language === 'ro'
                    ? ['Atlet competitiv CrossFit de 7 ani', 'Weightlifting & Gymnastics', 'Competition training']
                    : ['7 years competitive CrossFit athlete', 'Weightlifting & Gymnastics', 'Competition training'],
                  experience: language === 'ro' ? '7 ani în CrossFit' : '7 years in CrossFit',
                },
                {
                  id: 1,
                  name: 'Robert Sukosd',
                  certifications: language === 'ro'
                    ? ['CrossFit Level 2 Trainer', 'The Gymnastics Course Level 1', 'Movement Specialist']
                    : ['CrossFit Level 2 Trainer', 'The Gymnastics Course Level 1', 'Movement Specialist'],
                  experience: language === 'ro' ? '13 ani în CrossFit' : '13 years in CrossFit',
                }
              ];

              return coaches.map((coach, index) => (
                <motion.div
                  key={coach.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all duration-300 group"
                >
                  {/* Coach Image */}
                  <div className="relative h-96 overflow-hidden">
                    <img
                      src={images[index].src}
                      alt={`${coach.name} - CrossFit Unbroken Spirit coach`}
                      width={400}
                      height={256}
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      style={{ objectPosition: images[index].objectPosition }}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />
                  </div>

                  {/* Coach Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-1">{coach.name}</h3>
                    
                    <div className="flex items-center gap-2 mb-4 text-sky-400">
                      <Dumbbell className="w-4 h-4 flex-shrink-0" />
                      <span className="text-sm font-semibold">{coach.experience}</span>
                    </div>

                    <div className="space-y-2">
                      {coach.certifications.map((cert, idx) => (
                        <div key={idx} className="flex items-center gap-2 px-3 py-2 bg-blue-600/10 border border-blue-500/20 rounded-lg">
                          <div className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                          <span className="text-sm text-gray-300 whitespace-pre-line">{cert}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ));
            })()}
          </div>
        </motion.div>
      </div>
    </section>
  );
}