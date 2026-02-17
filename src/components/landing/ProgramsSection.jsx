import React from 'react';
import { motion } from 'framer-motion';
import { Dumbbell, Heart, Zap, Users, Timer, TrendingUp } from 'lucide-react';
import { Button } from "@/components/ui/button";

const programs = [
  {
    icon: Dumbbell,
    title: "CrossFit",
    description: "Antrenamente funcționale de înaltă intensitate, care combină gimnastică, haltere și condiționare.",
    color: "from-blue-600 to-sky-500",
    image: "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=600&q=80"
  },
  {
    icon: TrendingUp,
    title: "Haltere",
    description: "Tehnici de halterofilie olimpică, pentru dezvoltare forței și puterii explozive.",
    color: "from-blue-700 to-blue-500",
    image: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=600&q=80"
  },
  {
    icon: Heart,
    title: "Gimnastică",
    description: "Dezvoltă forța relativă, stabilitatea, mobilitatea și flexibilitatea pentru performanță.",
    color: "from-indigo-500 to-blue-500",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&q=80"
  },
  {
    icon: Users,
    title: "Personal Training",
    description: "Antrenament 1-la-1 personalizat pentru a-ți atinge obiectivele in ritmul tău.",
    color: "from-violet-500 to-blue-500",
    image: "https://images.unsplash.com/photo-1571388208497-71bedc66e932?w=600&q=80"
  },
  {
    icon: Timer,
    title: "Open Gym",
    description: "Acces liber la echipamente pentru antrenamente independente.",
    color: "from-cyan-500 to-sky-400",
    image: "https://images.unsplash.com/photo-1534367507873-d2d7e24c797f?w=600&q=80"
  }
];

export default function ProgramsSection() {
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

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
              Fiecare persoană este unică
            </span>, iar programele noastre variate sunt adaptabile oricărui nivel de fitness.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
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
                <p className="text-gray-400 text-sm leading-relaxed">
                  {program.description}
                </p>
              </div>
              
              {/* Hover gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${program.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button 
            size="lg"
            onClick={() => scrollToSection('contact')}
            className="bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white px-10 py-6 text-lg font-bold rounded-full"
          >
            Începe O Ședință Gratuită
          </Button>
        </motion.div>
      </div>
    </section>
  );
}