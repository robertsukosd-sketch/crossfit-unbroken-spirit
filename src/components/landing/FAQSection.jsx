import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '../LanguageProvider';
import { cn } from '@/lib/utils';

export default function FAQSection() {
  const { t, language } = useLanguage();
  const [openId, setOpenId] = useState(null);

  const faqs = [
    {
      id: 'beginner',
      q: language === 'ro' ? 'Sunt complet nou în CrossFit. Pot să încep?' : 'I\'m completely new to CrossFit. Can I start?',
      a: language === 'ro' 
        ? 'Absolut! CrossFit este pentru oricine, indiferent de nivelul de fitness. Antrenamentele sunt scalabile - fiecare mișcare poate fi adaptată de către antrenor pentru a se potrivi nivelului tău actual.' 
        : 'Absolutely! CrossFit is for everyone, regardless of fitness level. Workouts are scalable - each movement can be adapted by your coach to fit your current level.'
    },
    {
      id: 'injury',
      q: language === 'ro' ? 'Am o vânătare. Pot participa la antrenamente?' : 'I have an injury. Can I still train?',
      a: language === 'ro'
        ? 'Da, comunicați cu antrenorul dumneavoastră! Aproape orice se poate scala sau modifica. Antrenorul va crea alternative care vor menține intensitatea în timp ce vă protejează zona afectată.'
        : 'Yes, communicate with your coach! Almost anything can be scaled or modified. Your coach will create alternatives that maintain intensity while protecting the affected area.'
    },
    {
      id: 'commitment',
      q: language === 'ro' ? 'Cât de des trebuie să vin?' : 'How often do I need to come?',
      a: language === 'ro'
        ? 'Frecvența depinde de voi și de obiectivele voastre. Oferim abonamente de 8, 12 clase pe lună sau nelimitate. Chiar și 2 antrenamente pe săptămână vor aduce rezultate semnificative.'
        : 'Frequency depends on you and your goals. We offer memberships for 8, 12 classes per month, or unlimited. Even 2 workouts per week will bring significant results.'
    },
    {
      id: 'equipment',
      q: language === 'ro' ? 'Trebuie să am echipament special?' : 'Do I need special equipment?',
      a: language === 'ro'
        ? 'Nu. Avem tot echipamentul necesar la sala de antrenament. Singurul lucru pe care l-ați putea dori sunt niște pantofi de sport buni și o ștergătoare. Totul altceva se furnizează.'
        : 'No. We have all the equipment you need at the gym. The only thing you might want is good sneakers and a towel. Everything else is provided.'
    },
    {
      id: 'cost',
      q: language === 'ro' ? 'De ce e CrossFit mai scump decât o sală de fitness obișnuită?' : 'Why is CrossFit more expensive than a regular gym?',
      a: language === 'ro'
        ? 'Plătiți pentru coaching expert, comunitate, programul structurat și rezultate. Antrenerii noștri sunt certificați și vor să vă vadă reușind. Investiția include planificare, progres monitorizat și suport real.'
        : 'You\'re paying for expert coaching, community, structured programming, and results. Our coaches are certified and want to see you succeed. Your investment includes planning, monitored progress, and real support.'
    },
    {
      id: 'progression',
      q: language === 'ro' ? 'Cum voi progresa?' : 'How will I progress?',
      a: language === 'ro'
        ? 'Progresul apare prin antrenament consistent. Antrenerii vor urări creșterea greutăților, micșorarea timpului de finalizare a WOD-urilor, sau executarea mișcărilor mai avansate. Veți vedea schimbări fizice în 4-6 săptămâni.'
        : 'Progress comes from consistent training. Coaches will track increased weights, faster WOD completion times, or more advanced movement execution. You\'ll see physical changes in 4-6 weeks.'
    }
  ];

  return (
    <section id="faq" className="py-24 bg-zinc-950 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-sky-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">
            {language === 'ro' ? (
              <>Întrebări Frecvente</>
            ) : (
              <>Frequently Asked Questions</>
            )}
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto">
            {language === 'ro'
              ? 'Găsescă răspunsuri la întrebările comune despre CrossFit și sala noastră.'
              : 'Find answers to common questions about CrossFit and our gym.'}
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <button
                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                className={cn(
                  'w-full text-left px-5 sm:px-6 py-4 rounded-xl border transition-all duration-200',
                  openId === faq.id
                    ? 'bg-blue-600/10 border-blue-500/50'
                    : 'bg-zinc-900/50 border-zinc-800 hover:border-blue-500/30'
                )}
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-base sm:text-lg font-semibold text-white pr-2">
                    {faq.q}
                  </h3>
                  <motion.div
                    animate={{ rotate: openId === faq.id ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex-shrink-0 mt-0.5"
                  >
                    <ChevronDown className="w-5 h-5 text-sky-400" />
                  </motion.div>
                </div>
              </button>

              <AnimatePresence>
                {openId === faq.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 sm:px-6 py-4 bg-zinc-900/30 border-l-2 border-blue-500 mt-1 rounded-lg">
                      <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}