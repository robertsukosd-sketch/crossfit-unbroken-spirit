import React from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles, Dumbbell, Apple, User } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useLanguage } from '../LanguageProvider';
import { openMobileOrDesktop } from '../appStoreUtils';

function scrollToDownloadApp() {
  const el = document.getElementById('thunderwod-app');
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

const getPricingCategories = (t, language) => [
{
  title: language === 'ro' ? "Abonamente CrossFit" : "CrossFit Memberships",
  icon: Dumbbell,
  plans: [
  {
    name: "Drop In",
    price: "60",
    period: language === 'ro' ? "ședință" : "session",
    description: language === 'ro' ? "Încearcă un antrenament" : "Try a workout",
    features: language === 'ro' 
      ? ["Perfect pentru vizitatori", "1 ședință CrossFit / Open Gym"]
      : ["Perfect for visitors", "1 CrossFit / Open Gym session"],
    popular: false
  },
  {
    name: "Drop In 1 Week",
    price: "200",
    period: language === 'ro' ? "săptămână" : "week",
    description: language === 'ro' ? "Încearcă o săptămână completă" : "Try a full week",
    features: language === 'ro' 
      ? ["Acces nelimitat 7 zile", "Toate clasele incluse"]
      : ["Unlimited 7-day access", "All classes included"],
    popular: false
  },
  {
    name: language === 'ro' ? "8 Ședințe" : "8 Sessions",
    price: "320",
    period: language === 'ro' ? "lună" : "month",
    description: language === 'ro' ? "2 antrenamente pe săptămână" : "2 workouts per week",
    features: language === 'ro' 
      ? ["8 ședințe pe lună", "Flexibilitate program"]
      : ["8 sessions per month", "Schedule flexibility"],
    popular: false
  },
  {
    name: language === 'ro' ? "12 Ședințe" : "12 Sessions",
    price: "400",
    period: language === 'ro' ? "lună" : "month",
    description: language === 'ro' ? "3 antrenamente pe săptămână" : "3 workouts per week",
    features: language === 'ro' 
      ? ["12 ședințe pe lună", "Flexibilitate program"]
      : ["12 sessions per month", "Schedule flexibility"],
    popular: true
  },
  {
    name: language === 'ro' ? "Nelimitat" : "Unlimited",
    price: "500",
    period: language === 'ro' ? "lună" : "month",
    description: language === 'ro' ? "Acces complet fără restricții" : "Full access with no restrictions",
    features: language === 'ro' 
      ? ["Ședințe nelimitate", "Toate clasele incluse", "Open Gym inclus", "Prioritate înscriere"]
      : ["Unlimited sessions", "All classes included", "Open Gym included", "Priority booking"],
    popular: true,
    featured: true
  }]

},
{
  title: language === 'ro' ? "Servicii Extra" : "Extra Services",
  icon: Sparkles,
  plans: [
  {
    name: "Open Gym",
    price: "360",
    period: language === 'ro' ? "lună" : "month",
    description: language === 'ro' ? "Antrenament independent" : "Independent training",
    features: language === 'ro' 
      ? ["Program flexibil", "Fără clase de grup"]
      : ["Flexible schedule", "No group classes"],
    popular: false
  },
  {
    name: "CrossFit Family",
    price: "900",
    period: language === 'ro' ? "lună" : "month",
    description: language === 'ro' ? "Abonament pentru familii/cupluri" : "For families/couples",
    features: language === 'ro' 
      ? ["Ședințe nelimitate", "Toate clasele incluse", "Open Gym inclus", "Prioritate înscriere"]
      : ["Unlimited sessions", "All classes included", "Open Gym included", "Priority booking"],
    popular: false
  },
  {
    name: language === 'ro' ? "Nutriție" : "Nutrition",
    price: "350",
    period: language === 'ro' ? "lună" : "month",
    description: language === 'ro' ? "Plan alimentar personalizat" : "Personalized meal plan",
    features: language === 'ro' 
      ? ["Consultație inițială", "Plan nutrițional", "Monitorizare progres", "Suport continuu"]
      : ["Initial consultation", "Nutrition plan", "Progress monitoring", "Ongoing support"],
    popular: false
  }]

},
{
  title: "Personal Training",
  icon: User,
  plans: [
  {
    name: language === 'ro' ? "PT 8 Ședințe" : "PT 8 Sessions",
    price: "1300",
    period: language === 'ro' ? "8 ședințe" : "8 sessions",
    description: language === 'ro' ? "Antrenament personalizat" : "Personalized training",
    features: language === 'ro' 
      ? ["8 sesiuni 1-la-1", "Program individualizat", "Tehnici avansate", "Feedback constant"]
      : ["8 one-on-one sessions", "Individualized program", "Advanced techniques", "Constant feedback"],
    popular: false
  },
  {
    name: language === 'ro' ? "PT 12 Ședințe" : "PT 12 Sessions",
    price: "1600",
    period: language === 'ro' ? "12 ședințe" : "12 sessions",
    description: language === 'ro' ? "Transformare completă" : "Complete transformation",
    features: language === 'ro' 
      ? ["12 sesiuni 1-la-1", "Program individualizat", "Nutriție de bază", "Suport WhatsApp", "Monitorizare progres"]
      : ["12 one-on-one sessions", "Individualized program", "Basic nutrition", "WhatsApp support", "Progress monitoring"],
    popular: true
  }]

}];


export default function PricingSection() {
  const { t, language } = useLanguage();
  const pricingCategories = getPricingCategories(t, language);
  
  // no-op, using openAppStore below

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
          className="text-center mb-16">

          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            <span className="bg-gradient-to-r from-blue-500 to-sky-400 bg-clip-text text-transparent">
              {t("pricingTitle")}
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {t("pricingSubtitle")}
          </p>
          



        </motion.div>
        
        {pricingCategories.map((category, catIndex) =>
        <div key={category.title} className="mb-16 last:mb-0">
            <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-8">

              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <category.icon className="w-5 h-5 text-sky-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">{category.title}</h3>
            </motion.div>
            
            <div className={`grid gap-6 ${
          category.plans.length === 2 ?
          'md:grid-cols-2 max-w-3xl' :
          category.plans.length === 5 ?
          'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5' :
          'md:grid-cols-2 lg:grid-cols-3'}`
          }>
              {category.plans.map((plan, index) => {
                const totalPlans = category.plans.length;
                // On mobile, reverse order for CrossFit Memberships (5 plans)
                const mobileOrder = category.plans.length === 5 ? totalPlans - index : undefined;
                return <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              style={mobileOrder !== undefined ? { order: mobileOrder } : {}}
              className={`relative rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] flex flex-col h-full md:![order:0] ${
              plan.featured ?
              'bg-gradient-to-br from-blue-600 to-sky-500 shadow-2xl shadow-blue-500/20' :
              'bg-zinc-900/80 border border-zinc-800 hover:border-blue-500/30'}`
              }>

                  {plan.popular &&
              <div className={`absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 text-xs font-bold uppercase tracking-wider rounded-full ${
              plan.featured ?
              'bg-white text-blue-600' :
              'bg-blue-500 text-white'}`
              }>
                      {t("popular")}
                    </div>
              }
                  
                  <div className="text-center mb-6">
                    <div className="h-20 mb-4">
                      <h4 className={`text-lg font-bold mb-2 ${plan.featured ? 'text-white' : 'text-white'}`}>
                        {plan.name}
                      </h4>
                      <p className={`text-sm ${plan.featured ? 'text-white/80' : 'text-gray-400'}`}>
                        {plan.description}
                      </p>
                    </div>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className={`text-4xl font-black ${plan.featured ? 'text-white' : 'text-white'}`}>
                        {plan.price}
                      </span>
                      <span className={`text-lg ${plan.featured ? 'text-white/80' : 'text-gray-400'}`}>
                        {t("ron")}
                      </span>
                    </div>
                    <span className={`text-sm ${plan.featured ? 'text-white/60' : 'text-gray-500'}`}>
                      / {plan.period}
                    </span>
                  </div>
                  
                  <ul className="space-y-3 mb-6 flex-grow">
                    {plan.features.map((feature, fIndex) =>
                <li key={fIndex} className="flex items-start gap-3">
                        <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                  plan.featured ? 'text-white' : 'text-sky-400'}`
                  } />
                        <span className={`text-sm ${plan.featured ? 'text-white/90' : 'text-gray-300'}`}>
                          {feature}
                        </span>
                      </li>
                )}
                  </ul>
                  
                  <Button
                className={`w-full font-bold rounded-full ${
                plan.featured ?
                'bg-white text-blue-600 hover:bg-white/90' :
                'bg-blue-500/10 text-sky-400 hover:bg-blue-500 hover:text-white border border-blue-500/30'}`
                }
                onClick={() => scrollToDownloadApp()}>
                    {t("startNowBtn")}
                  </Button>
                </motion.div>
            })}
            </div>
          </div>
        )}
      </div>
    </section>);

}