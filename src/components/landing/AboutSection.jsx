import React from 'react';
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
  const { t } = useLanguage();
  const features = getFeatures(t);
  return (
    <section id="about" className="py-24 bg-zinc-950 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=800&q=80"
                alt="CrossFit Training"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
          </motion.div>
          
          {/* Right side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sky-400 font-semibold tracking-wider uppercase text-sm">
              {t("aboutUs")}
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white mt-3 mb-6 leading-tight">
              Mai mult decât un <span className="text-blue-500">gym</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
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
                  className="flex gap-4 max-w-[280px]"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-sky-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-1">{feature.title}</h3>
                    <p className="text-gray-500 text-base text-justify tracking-tight">{feature.description}</p>
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