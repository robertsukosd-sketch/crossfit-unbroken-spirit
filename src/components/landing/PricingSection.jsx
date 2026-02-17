import React from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles, Dumbbell, Apple, User } from 'lucide-react';
import { Button } from "@/components/ui/button";

const pricingCategories = [
  {
    title: "Abonamente CrossFit",
    icon: Dumbbell,
    plans: [
      {
        name: "Drop In",
        price: "60",
        period: "ședință",
        description: "Perfect pentru vizitatori",
        features: ["1 ședință CrossFit", "Acces echipamente", "Coaching inclus"],
        popular: false
      },
      {
        name: "Drop In 1 Week",
        price: "200",
        period: "săptămână",
        description: "Încearcă o săptămână completă",
        features: ["Acces nelimitat 7 zile", "Toate clasele incluse", "Coaching inclus"],
        popular: false
      },
      {
        name: "8 Ședințe",
        price: "320",
        period: "lună",
        description: "2 antrenamente pe săptămână",
        features: ["8 ședințe pe lună", "Flexibilitate program", "Coaching inclus"],
        popular: false
      },
      {
        name: "12 Ședințe",
        price: "400",
        period: "lună",
        description: "3 antrenamente pe săptămână",
        features: ["12 ședințe pe lună", "Flexibilitate program", "Coaching inclus"],
        popular: true
      },
      {
        name: "Nelimitat",
        price: "500",
        period: "lună",
        description: "Acces complet fără restricții",
        features: ["Ședințe nelimitate", "Toate clasele incluse", "Open Gym inclus", "Prioritate înscriere"],
        popular: true,
        featured: true
      }
    ]
  },
  {
    title: "Servicii Extra",
    icon: Sparkles,
    plans: [
      {
        name: "Open Gym",
        price: "360",
        period: "lună",
        description: "Antrenament independent",
        features: ["Acces nelimitat echipamente", "Program flexibil", "Fără clase de grup"],
        popular: false
      },
      {
        name: "Nutriție",
        price: "350",
        period: "lună",
        description: "Plan alimentar personalizat",
        features: ["Consultație inițială", "Plan nutrițional", "Monitorizare progres", "Suport continuu"],
        popular: false
      }
    ]
  },
  {
    title: "Personal Training",
    icon: User,
    plans: [
      {
        name: "PT 8 Ședințe",
        price: "1300",
        period: "8 ședințe",
        description: "Antrenament personalizat",
        features: ["8 sesiuni 1-la-1", "Program individualizat", "Tehnici avansate", "Feedback constant"],
        popular: false
      },
      {
        name: "PT 12 Ședințe",
        price: "1600",
        period: "12 ședințe",
        description: "Transformare completă",
        features: ["12 sesiuni 1-la-1", "Program individualizat", "Nutriție de bază", "Suport WhatsApp", "Monitorizare progres"],
        popular: true
      }
    ]
  }
];

export default function PricingSection() {
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="pricing" className="py-24 bg-zinc-950 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-sky-600/5 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sky-400 font-semibold tracking-wider uppercase text-sm">
            Prețuri Transparente
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mt-3 mb-6">
            Alege Planul <span className="text-blue-500">Potrivit</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Investește în sănătatea ta. Fiecare plan include coaching profesionist 
            și acces la comunitatea noastră.
          </p>
        </motion.div>
        
        {pricingCategories.map((category, catIndex) => (
          <div key={category.title} className="mb-16 last:mb-0">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <category.icon className="w-5 h-5 text-sky-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">{category.title}</h3>
            </motion.div>
            
            <div className={`grid gap-6 ${
              category.plans.length === 2 
                ? 'md:grid-cols-2 max-w-3xl' 
                : category.plans.length === 5 
                  ? 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5'
                  : 'md:grid-cols-2 lg:grid-cols-3'
            }`}>
              {category.plans.map((plan, index) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className={`relative rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] ${
                    plan.featured 
                      ? 'bg-gradient-to-br from-blue-600 to-sky-500 shadow-2xl shadow-blue-500/20' 
                      : 'bg-zinc-900/80 border border-zinc-800 hover:border-blue-500/30'
                  }`}
                >
                  {plan.popular && (
                    <div className={`absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 text-xs font-bold uppercase tracking-wider rounded-full ${
                      plan.featured 
                        ? 'bg-white text-blue-600' 
                        : 'bg-blue-500 text-white'
                    }`}>
                      Popular
                    </div>
                  )}
                  
                  <div className="text-center mb-6">
                    <h4 className={`text-lg font-bold mb-2 ${plan.featured ? 'text-white' : 'text-white'}`}>
                      {plan.name}
                    </h4>
                    <p className={`text-sm mb-4 ${plan.featured ? 'text-white/80' : 'text-gray-400'}`}>
                      {plan.description}
                    </p>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className={`text-4xl font-black ${plan.featured ? 'text-white' : 'text-white'}`}>
                        {plan.price}
                      </span>
                      <span className={`text-lg ${plan.featured ? 'text-white/80' : 'text-gray-400'}`}>
                        RON
                      </span>
                    </div>
                    <span className={`text-sm ${plan.featured ? 'text-white/60' : 'text-gray-500'}`}>
                      / {plan.period}
                    </span>
                  </div>
                  
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-start gap-3">
                        <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                          plan.featured ? 'text-white' : 'text-sky-400'
                        }`} />
                        <span className={`text-sm ${plan.featured ? 'text-white/90' : 'text-gray-300'}`}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full font-bold rounded-full ${
                      plan.featured 
                        ? 'bg-white text-blue-600 hover:bg-white/90' 
                        : 'bg-blue-500/10 text-sky-400 hover:bg-blue-500 hover:text-white border border-blue-500/30'
                    }`}
                    onClick={() => scrollToSection('contact')}
                  >
                    Începe Acum
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}