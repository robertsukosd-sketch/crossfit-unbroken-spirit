import React from 'react';
import { motion } from 'framer-motion';
import { Dumbbell } from 'lucide-react';
import { useLanguage } from '../LanguageProvider';

export default function CoachesSection() {
  const { language } = useLanguage();

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

  const coachTitle = language === 'ro' ? 'Antrenorii' : 'Meet Our Coaches';
  const coachSubtitle = language === 'ro' 
    ? 'Echipa noastră e alcătuită din antrenori pasionați,'
    : 'Our team consists of coaches passionate about helping you reach your goals.';
  const coachSubtitleSecond = language === 'ro' 
    ? 'care te vor ajuta să-ți atingi obiectivele.'
    : '';

  return (
    <section className="py-16 bg-zinc-950 relative overflow-hidden border-t border-zinc-900">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 left-0 w-96 h-96 bg-sky-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">
            {coachTitle}
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
            {coachSubtitle}
            {coachSubtitleSecond && <br className="hidden sm:block" />}
            {coachSubtitleSecond}
          </p>
        </motion.div>

        {/* Coaches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coaches.map((coach, index) => (
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
                {/* Name */}
                <h3 className="text-xl font-bold text-white mb-1">{coach.name}</h3>
                
                {/* Experience */}
                <div className="flex items-center gap-2 mb-4 text-sky-400">
                  <Dumbbell className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm font-semibold">{coach.experience}</span>
                </div>

                {/* Certifications */}
                <div className="space-y-3">
                  <div className="space-y-2">
                    {coach.certifications.map((cert, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 px-3 py-2 bg-blue-600/10 border border-blue-500/20 rounded-lg"
                      >
                        <div className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                        <span className="text-sm text-gray-300 whitespace-pre-line">{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}