import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Dumbbell, Heart, Zap, Users, Timer, TrendingUp, Flame } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useLanguage } from '../LanguageProvider';

const getPrograms = (t, language) => [
  {
    icon: Dumbbell,
    title: t("crossfitTitle"),
    description: t("crossfitDesc"),
    color: "from-blue-600 to-sky-500",
    image: "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=600&q=80"
  },
  {
    icon: TrendingUp,
    title: t("weightlifting"),
    description: t("weightliftingDesc"),
    color: "from-blue-700 to-blue-500",
    image: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=600&q=80"
  },
  {
    icon: Heart,
    title: t("gymnastics"),
    description: t("gymnasticsDesc"),
    color: "from-indigo-500 to-blue-500",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=600&q=80"
  },
  {
    icon: Flame,
    title: language === 'ro' ? "Condiționare" : "Conditioning",
    description: language === 'ro'
      ? "Dacă obosești prea repede, nu e vorba de voință — e vorba de motor. Sesiunile noastre de condiționare îți construiesc capacitatea cardiovasculară care alimentează totul: mai multă putere, mai mult timp, mai puțin efort resimțit. Fii cel care dă ritmul, nu cel care se luptă să țină pasul."
      : "If you're gassing out before the workout ends, willpower isn't the problem — your engine is. Our conditioning sessions build the cardiovascular capacity that powers everything else. More output. Longer. Easier. Stop surviving workouts. Start owning them.",
    color: "from-orange-600 to-red-500",
    image: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=600&q=80"
  },
  {
    icon: Users,
    title: t("personalTraining"),
    description: t("personalTrainingDesc"),
    color: "from-violet-500 to-blue-500",
    image: "https://images.unsplash.com/photo-1571388208497-71bedc66e932?w=600&q=80"
  },
  {
    icon: Timer,
    title: t("openGym"),
    description: t("openGymDesc"),
    color: "from-cyan-500 to-sky-400",
    image: "https://images.unsplash.com/photo-1534367507873-d2d7e24c797f?w=600&q=80"
  }
];

export default function ProgramsSection({ onBookSession }) {
  const { t, language } = useLanguage();
  const programs = useMemo(() => getPrograms(t, language), [language]);

  return (
    <section id="programs" className="py-24 bg-black relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900 via-black to-black" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-2xl md:text-3xl font-bold text-white max-w-3xl mx-auto leading-relaxed">
            <span className="bg-gradient-to-r from-blue-500 to-sky-400 bg-clip-text text-transparent">
              {t("everyoneUnique")},
            </span> {t("everyoneUniqueDesc")}
          </p>
        </motion.div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((program, index) => (
            <motion.div
              key={program.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-zinc-900/50 rounded-2xl overflow-hidden border border-zinc-800 hover:border-blue-500/50 transition-all duration-500"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                    src={program.image}
                    alt={program.title}
                    width={600}
                    height={192}
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 will-change-transform"
                  />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-transparent" />
                <div className={`absolute top-4 left-4 w-12 h-12 rounded-xl bg-gradient-to-br ${program.color} flex items-center justify-center shadow-lg`}>
                  <program.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              
              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-sky-400 transition-colors">
                  {program.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {program.description}
                </p>
              </div>
              
              {/* Hover gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${program.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
            </motion.div>
          ))}
        </div>

        {/* Mobile-only CTA button */}
         <div className="md:hidden mt-10 flex justify-center">
           <motion.button
             type="button"
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             onClick={() => {
               if (onBookSession) {
                 onBookSession();
               } else {
                 console.warn('onBookSession callback not provided to ProgramsSection');
               }
             }}
             className="relative px-8 py-4 rounded-full text-white font-black lg:text-lg overflow-hidden whitespace-nowrap"
             style={{ background: 'linear-gradient(135deg, #1e40af 0%, #0ea5e9 100%)' }}
             whileTap={{ scale: 0.97 }}
           >
            <motion.span
              className="absolute inset-0 rounded-full"
              animate={{ opacity: [0, 0.3, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ background: 'radial-gradient(circle, #7dd3fc 0%, transparent 70%)' }}
            />
            <span className="relative z-10 flex flex-col items-center leading-tight">
              {language === 'ro' ? (
                <>
                  <span>⚡ Încearcă</span>
                  <span>o Ședință Gratuită</span>
                </>
              ) : (
                <>
                  <span>⚡ Book</span>
                  <span>a Free Session</span>
                </>
              )}
            </span>
          </motion.button>
        </div>
      </div>
    </section>
  );
}