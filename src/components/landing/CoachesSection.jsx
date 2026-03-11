import React from 'react';
import { motion } from 'framer-motion';
import { Dumbbell } from 'lucide-react';
import { useLanguage } from '../LanguageProvider';
import { cn } from '@/lib/utils';

export default function CoachesSection() {
  const { language } = useLanguage();

  const coaches = [
    {
      id: 1,
      name: 'Robert Sukosd',
      image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69948c0d6b8aa61f49f0a23d/dd4f38370_WhatsAppImage2026-03-11at100703.jpg',
      certifications: ['CrossFit Level 2', 'The Gymnastics Course Level 1', 'Movement Specialist'],
      experience: language === 'ro' ? '13 ani în CrossFit' : '13 years in CrossFit',
      bioRo: 'Robert este co-fondatorul Unbroken Spirit și are o pasiune pentru dezvoltarea atletică. Cu peste 13 ani de experiență, se specializează în optimizarea performanței și construirea unei comunități puternice.',
      bioEn: 'Robert is the co-founder of Unbroken Spirit with a passion for athletic development. With over 13 years of experience, he specializes in performance optimization and building a strong community.'
    },
    {
      id: 2,
      name: 'Dumitru Mîndrescu',
      image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69948c0d6b8aa61f49f0a23d/1cc21e186_IMG_1206.jpg',
      certifications: language === 'ro'
        ? ['Antrenor de 7 ani', 'Atlet competitiv de 7 ani', 'Haltere & Gimnastică', 'Pregătire pentru competiții']
        : ['7 years as a coach', '7 years as a competitive athlete', 'Weightlifting & Gymnastics', 'Competition preparation'],
      experience: language === 'ro' ? '7 ani în CrossFit' : '7 years in CrossFit',
      bioRo: 'Dumitru se concentrează pe mecanica corectă a mișcării și este cunoscut pentru abordarea sa pacientă cu noii membri. Specialitatea lui este gymnastica și mobilitate avansată.',
      bioEn: 'Dumitru focuses on proper movement mechanics and is known for his patient approach with new members. His specialty is gymnastics and advanced mobility.'
    },
    {
      id: 3,
      name: 'Andrei Vârnav',
      image: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=400&h=400&fit=crop',
      certifications: language === 'ro'
        ? ['8 ani înot de performanță\n& medaliat național', '7 ani handbal de performanță\n& campion național', '4 ani Head Judge at OMBC Throwdown', 'Strength & Conditioning']
        : ['8 years competitive swimming\n& national medalist', '7 years competitive handball\n& national champion', '4 years Head Judge at OMBC Throwdown', 'Strength & Conditioning'],
      experience: language === 'ro' ? '8 ani în CrossFit' : '8 years in CrossFit',
      bioRo: 'Andrei este specialistul în antrenamente cu greutăți și putere. Pasiunea lui pentru educație fitness face ca sesiunile sale să fie întotdeauna informative și motivante.',
      bioEn: 'Andrei is a specialist in weightlifting and strength training. His passion for fitness education makes his sessions always informative and motivating.'
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
              <div className="relative h-64 overflow-hidden">
                <img
                  src={coach.image}
                  alt={`${coach.name} - CrossFit Unbroken Spirit coach`}
                  width={400}
                  height={256}
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
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