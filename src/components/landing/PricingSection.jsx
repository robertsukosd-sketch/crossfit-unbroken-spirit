import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Dumbbell, Sparkles, User, Globe } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLanguage } from '../LanguageProvider';
import { getAppStoreUrl, isDesktop } from '../appStoreUtils';

function scrollToDownloadApp() {
  const el = document.getElementById('thunderwod-app');
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

const getCategories = (language) => [
  {
    id: 'core',
    label: language === 'ro' ? 'Clase de CrossFit' : 'Clase de CrossFit',
    sublabel: language === 'ro' ? 'Abonamente CrossFit' : 'CrossFit Memberships',
    icon: Dumbbell,
    description: language === 'ro'
      ? 'Fundamentul transformării tale.\nAntrenamente de grup, adaptate nivelului tău.'
      : 'The foundation of your transformation.\nGroup workouts guided by coaches, calibrated to your level.',
    plans: [
      {
        name: language === 'ro' ? '8 Ședințe' : '8 Sessions',
        price: '320',
        period: language === 'ro' ? 'lună' : 'month',
        description: language === 'ro' ? '2 antrenamente pe săptămână' : '2 workouts per week',
        features: language === 'ro'
          ? ['8 ședințe pe lună', 'Flexibilitate program', 'Acces la toate orele', 'Valabil o lună', 'Loc de parcare inclus']
          : ['8 sessions per month', 'Schedule flexibility', 'Access to all class times', 'Valid for one month', 'Free parking spot'],
        popular: false,
        featured: false,
      },
      {
        name: language === 'ro' ? '12 Ședințe' : '12 Sessions',
        price: '400',
        period: language === 'ro' ? 'lună' : 'month',
        description: language === 'ro' ? '3 antrenamente pe săptămână' : '3 workouts per week',
        features: language === 'ro'
          ? ['12 ședințe pe lună', 'Flexibilitate program', 'Acces la toate orele', 'Valabil o lună', 'Loc de parcare inclus']
          : ['12 sessions per month', 'Schedule flexibility', 'Access to all class times', 'Valid for one month', 'Free parking spot'],
        popular: true,
        featured: false,
      },
      {
        name: language === 'ro' ? 'Nelimitat' : 'Unlimited',
        price: '500',
        period: language === 'ro' ? 'lună' : 'month',
        description: language === 'ro' ? 'Acces complet fără restricții' : 'Full access, no restrictions',
        studentPrice: '300',
        studentNote: language === 'ro' ? '🎓 Elevi/Studenți până la 26 ani: 300 RON / lună' : '🎓 Students up to 26 years old: 300 RON / month',
        features: language === 'ro'
          ? ['Ședințe nelimitate', 'Toate clasele incluse', 'Open Gym inclus', 'Prioritate înscriere', 'Loc de parcare inclus']
          : ['Unlimited sessions', 'All classes included', 'Open Gym included', 'Priority booking', 'Free parking spot'],
        popular: true,
        featured: true,
      },
    ],
  },
  {
    id: 'ascent',
    label: language === 'ro' ? 'Open Gym' : 'Open Gym',
    sublabel: language === 'ro' ? 'Servicii Extra' : 'Extra Services',
    icon: Sparkles,
    description: language === 'ro'
      ? 'Optimizează-ți performanța.\nServicii complementare pentru un progress accelerat.'
      : 'Optimize your performance.\nComplementary services for accelerated progress.',
    plans: [
      {
        name: 'Open Gym',
        price: '360',
        period: language === 'ro' ? 'lună' : 'month',
        description: language === 'ro' ? 'Antrenament independent' : 'Independent training',
        features: language === 'ro'
          ? ['Program flexibil', 'Acces la echipamente', 'Fără clase de grup', 'Loc de parcare inclus']
          : ['Flexible schedule', 'Equipment access', 'No group classes', 'Free parking spot'],
        popular: true,
        featured: true,
      },
      {
        name: 'CrossFit Family',
        price: '900',
        period: language === 'ro' ? 'lună' : 'month',
        description: language === 'ro' ? 'Abonament pentru familii/cupluri' : 'For families / couples',
        features: language === 'ro'
          ? ['Ședințe nelimitate (2 persoane)', 'Toate clasele incluse', 'Open Gym inclus', 'Prioritate înscriere', 'Loc de parcare inclus']
          : ['Unlimited sessions (2 people)', 'All classes included', 'Open Gym included', 'Priority booking', 'Free parking spot'],
        popular: false,
        featured: false,
      },
    ],
  },
  {
    id: 'focus',
    label: language === 'ro' ? 'Personal Training' : 'Personal Training',
    sublabel: 'Personal Training',
    icon: User,
    description: language === 'ro'
      ? 'Atenție 1-la-1 dedicată exclusiv ție.\nAntrenamente personalizate pentru obiectivele tale.'
      : 'Undivided 1-on-1 attention dedicated exclusively to you.\nPersonalized training for your goals.',
    plans: [
      {
        name: language === 'ro' ? 'Nutriție' : 'Nutrition',
        price: '350',
        period: language === 'ro' ? 'lună' : 'month',
        description: language === 'ro' ? 'Plan alimentar personalizat' : 'Personalized meal plan',
        features: language === 'ro'
          ? ['Consultație inițială', 'Plan nutrițional', 'Monitorizare progres', 'Suport continuu', 'Loc de parcare inclus']
          : ['Initial consultation', 'Nutrition plan', 'Progress monitoring', 'Ongoing support', 'Free parking spot'],
        popular: false,
        featured: false,
      },
      {
        name: language === 'ro' ? 'PT 12 Ședințe' : 'PT 12 Sessions',
        price: '1600',
        period: language === 'ro' ? '12 ședințe' : '12 sessions',
        description: language === 'ro' ? 'Transformare completă' : 'Complete transformation',
        features: language === 'ro'
          ? ['12 sesiuni 1-la-1', 'Program individualizat', 'Nutriție de bază', 'Suport WhatsApp', 'Monitorizare progres', 'Loc de parcare inclus']
          : ['12 one-on-one sessions', 'Individualized program', 'Basic nutrition', 'WhatsApp support', 'Progress monitoring', 'Free parking spot'],
        popular: true,
        featured: true,
      },
    ],
  },
  {
    id: 'welcome',
    label: language === 'ro' ? 'Drop In / Trial' : 'Drop In / Trial',
    sublabel: language === 'ro' ? 'Vizitatori & Drop-In' : 'Visitors & Drop-In',
    icon: Globe,
    description: language === 'ro'
      ? `În vizită sau ești la început, dar vrei să încerci o săptămână de CrossFit?\nUna dintre cele două variante de mai jos ți s-ar potrivi.`
      : `Visiting or just starting out and want to try a week of CrossFit?\nOne of the two options below might be the right fit for you.`,
    plans: [
      {
        name: 'Drop In',
        price: '60',
        period: language === 'ro' ? 'ședință' : 'session',
        description: language === 'ro' ? 'Pentru CrossFitteri cu experiență' : 'For experienced CrossFitters',
        features: language === 'ro'
          ? ['1 ședință CrossFit sau Open Gym', 'Acces complet la facilități', 'Pentru sportivi CrossFit', '🎁 Prima ședință GRATUITĂ pentru începători', 'Loc de parcare inclus']
          : ['1 CrossFit or Open Gym session', 'Full access to facilities', 'For experienced CrossFit athletes', '🎁 First session FREE for newcomers', 'Free parking spot'],
        popular: false,
        featured: false,
      },
      {
        name: 'Trial/Drop In 1 Week',
        price: '200',
        period: language === 'ro' ? 'săptămână' : 'week',
        description: language === 'ro' ? 'Încearcă o săptămână completă' : 'Try a full week',
        features: language === 'ro'
          ? ['Acces nelimitat 7 zile', 'Toate clasele incluse', 'Ideal pentru călători și vizitatori', 'Loc de parcare inclus']
          : ['Unlimited 7-day access', 'All classes included', 'Ideal for travelers & visitors', 'Free parking spot'],
        popular: true,
        featured: true,
      },
    ],
  },
];

function PlanCard({ plan, index, t }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.08 }}
      className={cn(
        'relative rounded-2xl p-6 flex flex-col h-full transition-colors duration-300 overflow-visible',
        plan.featured
          ? 'bg-gradient-to-br from-blue-600 to-sky-500 shadow-2xl shadow-blue-500/25'
          : 'bg-zinc-900/80 border border-zinc-800 hover:border-blue-500/40'
      )}
    >
      {plan.popular && (
        <div className={cn(
          'absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 text-xs font-bold uppercase tracking-wider rounded-full whitespace-nowrap',
          plan.featured ? 'bg-white text-blue-600' : 'bg-blue-500 text-white'
        )}>
          {t('popular')}
        </div>
      )}

      <div className="text-center mb-6">
        <div className="min-h-[4.5rem] mb-4">
          <h4 className="text-lg font-bold text-white mb-1">{plan.name}</h4>
          <p className={cn('text-sm', plan.featured ? 'text-white/80' : 'text-gray-400')}>
            {plan.description}
          </p>
        </div>
        <div className="flex items-baseline justify-center gap-1">
          <span className="text-4xl font-black text-white">{plan.price}</span>
          <span className={cn('text-lg', plan.featured ? 'text-white/80' : 'text-gray-300')}>
            {t('ron')}
          </span>
        </div>
        <span className={cn('text-sm', plan.featured ? 'text-white/70' : 'text-gray-400')}>
          / {plan.period}
        </span>
        {plan.studentNote && (
          <div className="mt-3 px-3 py-2 rounded-xl bg-white/15 border border-white/25 text-white/90 text-xs font-semibold">
            {plan.studentNote}
          </div>
        )}
      </div>

      <ul className="space-y-3 mb-6 flex-grow">
        {plan.features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3">
            <Check className={cn('w-4 h-4 flex-shrink-0 mt-0.5', plan.featured ? 'text-white' : 'text-sky-400')} />
            <span className={cn('text-sm', plan.featured ? 'text-white/90' : 'text-gray-300')}>{feature}</span>
          </li>
        ))}
      </ul>

      <Button
        asChild
        className={cn(
          'w-full font-bold rounded-full',
          plan.featured
            ? 'bg-white text-blue-600 hover:bg-white/90'
            : plan.popular
            ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/30'
            : 'bg-blue-500/10 text-sky-400 hover:bg-blue-500 hover:text-white border border-blue-500/30'
        )}
      >
        <a
          href={isDesktop() ? 'https://app.thunderwod.com/#/wod' : getAppStoreUrl()}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('startNowBtn')}
        </a>
      </Button>
    </motion.div>
  );
}

export default function PricingSection() {
  const { t, language } = useLanguage();
  const categories = getCategories(language);
  const [activeId, setActiveId] = useState('core');
  const activeCategory = categories.find((c) => c.id === activeId);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 640);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const gridClass = (count) => {
    if (count === 2) return 'grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto';
    if (count === 3) return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto';
    return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4';
  };

  return (
    <section id="pricing" className="py-24 bg-zinc-950 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-sky-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
            {language === 'ro' ? (
              <>Investește în Tine.<br />Construiește-ți{' '}
                <span className="bg-gradient-to-r from-blue-500 to-sky-400 bg-clip-text text-transparent">
                  Reziliența.
                </span>
              </>
            ) : (
              <>Invest in Yourself.<br />Build an{' '}
                <span className="bg-gradient-to-r from-blue-500 to-sky-400 bg-clip-text text-transparent">
                  Unbroken Spirit.
                </span>
              </>
            )}
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
            {language === 'ro'
              ? (<>Alege-ți calea. Fiecare opțiune poate fi un pas mai aproape<br className="hidden sm:block" /> spre cea mai bună versiune a ta.</>)
              : 'Choose your path. Every option is a step toward the best version of yourself.'}
          </p>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeId === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveId(cat.id)}
                className={cn(
                  'flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold transition-all duration-200 border',
                  isActive
                    ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/25'
                    : 'bg-zinc-900 border-zinc-700 text-gray-300 hover:border-blue-500/50 hover:text-white'
                )}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span className="hidden sm:inline">{cat.label}</span>
                <span className="sm:hidden">{cat.id.charAt(0).toUpperCase() + cat.id.slice(1)}</span>
              </button>
            );
          })}
        </div>

        {/* Active Category Description */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeId + '-desc'}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 mb-2">
              {(() => { const Icon = activeCategory.icon; return <Icon className="w-5 h-5 text-sky-400" />; })()}
              <span className="text-white font-black text-xl sm:text-2xl">{activeCategory.label}</span>
              <span className="text-zinc-500 text-sm font-medium hidden sm:inline">— {activeCategory.sublabel}</span>
            </div>
            <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto whitespace-pre-line">
              {activeCategory.description}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Plans Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeId + '-plans'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={cn('grid gap-6', gridClass(activeCategory.plans.length))}
          >
            {[...activeCategory.plans]
              .sort((a, b) => {
                if (!isMobile) return 0;
                const aScore = (a.featured ? 2 : 0) + (a.popular ? 1 : 0);
                const bScore = (b.featured ? 2 : 0) + (b.popular ? 1 : 0);
                return bScore - aScore;
              })
              .map((plan, index) => (
              <PlanCard key={plan.name} plan={plan} index={index} t={t} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}