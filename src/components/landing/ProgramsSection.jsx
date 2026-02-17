import React from 'react';
import { motion } from 'framer-motion';
import { Dumbbell, Heart, Zap, Users, Timer, TrendingUp } from 'lucide-react';
import { Button } from "@/components/ui/button";

const programs = [
  {
    icon: Dumbbell,
    title: "CrossFit",
    description: "Antrenamente funcționale de înaltă intensitate care combină gimnastică, halterofilie și condiționare metabolică.",
    color: "from-blue-600 to-sky-500",
    image: "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=600&q=80"
  },
  {
    icon: Zap,
    title: "HIIT",
    description: "Sesiuni intense de cardio și forță pentru arderea maximă de calorii și îmbunătățirea condiției fizice.",
    color: "from-sky-500 to-cyan-400",
    image: "https://images.unsplash.com/photo-1549576490-b0b4831ef60a?w=600&q=80"
  },
  {
    icon: TrendingUp,
    title: "Weightlifting",
    description: "Tehnici de halterofilie olimpică pentru dezvoltarea forței și puterii explosive.",
    color: "from-blue-700 to-blue-500",
    image: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=600&q=80"
  },
  {
    icon: Heart,
    title: "Gymnastics",
    description: "Dezvoltă controlul corporal, flexibilitatea și skill-uri de gimnastică pentru performanță.",
    color: "from-indigo-500 to-blue-500",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&q=80"
  },
  {
    icon: Users,
    title: "Personal Training",
    description: "Antrenament 1-la-1 personalizat pentru a-ți atinge obiectivele mai rapid.",
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
          <span className="text-sky-400 font-semibold tracking-wider uppercase text-sm">
            Ce Oferim
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mt-3 mb-6">
            Programele <span className="text-blue-500">Noastre</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Alegem varietatea pentru că fiecare persoană este unică.<br />
            Găsește programul potrivit pentru tine.
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
            Începe O Probă Gratuită
          </Button>
        </motion.div>
      </div>
    </section>
  );
}