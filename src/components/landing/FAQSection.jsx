import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '../LanguageProvider';
import { cn } from '@/lib/utils';

export default function FAQSection({ onBookSession }) {
  const { t, language } = useLanguage();
  const [openId, setOpenId] = useState(null);

  const handleScrollToPricing = (category = null) => {
    if (category) {
      sessionStorage.setItem('selectedPricingCategory', category);
    }
    const pricingElement = document.getElementById('pricing');
    if (pricingElement) {
      pricingElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const faqs = [
    {
      id: 'what-is',
      q: 'Ce este CrossFit?',
      a: 'CrossFit este un program de antrenament bazat pe mișcări funcționale, realizate la intensitate ridicată și variate constant. Acesta combină exerciții de forță, cardio și gimnastică pentru a îmbunătăți condiția fizică generală. Scopul este să dezvolți forță, rezistență, mobilitate și performanță pentru activitățile din viața reală.'
    },
    {
      id: 'fitness-required',
      q: 'Trebuie să fiu în formă înainte de a începe CrossFit?',
      a: 'Categoric nu. Acesta e cel mai mare mit! CrossFit este procesul prin care ajungi în formă. Membrii unei săli de CrossFit variază de la sportivi de elită la oameni obișnuiți care vor doar să facă mișcare.'
    },
    {
      id: 'no-weights-before',
      q: 'Ce se întâmplă dacă nu am mai făcut antrenamente cu greutăți până acum?',
      a: 'Ești în locul potrivit. Fiecare membru nou are parte de îndrumare din partea unui antrenor, de la care va învăța mișcările de bază cu haltera, kettlebell-ul și gimnastica, în siguranță deplină.'
    },
    {
      id: 'bulk-up',
      q: 'O să iau proporții de la CrossFit?',
      a: 'Doar dacă e scopul tău specific și depui un efort uriaș în acest sens. Masa musculară excesivă vine dintr-o dietă hipercalorică și antrenamente de lifting specifice. CrossFitul se concentrează pe forță funcțională și condiționare. Vei deveni mai puternic/ă și mai tonifiat/ă, nu un culturist din greșeală!'
    },
    {
      id: 'benefits',
      q: 'Ce beneficii are CrossFitul?',
      a: 'Printre principalele beneficii:\n• creșterea forței și rezistenței\n• arderea eficientă a caloriilor\n• îmbunătățirea mobilității\n• dezvoltarea disciplinei și consistenței\n• comunitate și motivație în antrenamente'
    },
    {
      id: 'weight-loss',
      q: 'Pot slăbi făcând CrossFit?',
      a: 'Da, dar cu nuanțe. Antrenamentele CrossFit sunt intense și pot arde un număr mare de calorii, contribuind la scăderea în greutate atunci când sunt combinate cu o alimentație echilibrată. Deși antrenamentele de orice fel ajuta în principal la menținerea masei musculare, vei slăbi tot în urma unui deficit caloric constant de-a lungul timpului.'
    },
    {
      id: 'open-gym',
      q: 'Ce este Open Gym?',
      a: 'Open Gym este un interval orar în care poți veni la sală pentru a te antrena pe cont propriu, folosind echipamentul disponibil. Spre deosebire de clasele obișnuite de CrossFit, în timpul Open Gym nu există un antrenament ghidat de grup. De obicei, este folosit de membrii care vor să exerseze anumite mișcări, să recupereze un antrenament sau să lucreze suplimentar la anumite skill-uri.'
    },
    {
      id: 'vs-gym',
      q: 'Prin ce diferă CrossFitul de o sală comercială?',
      a: 'La o sală obișnuită, plătești pentru acces la aparate și ești pe cont propriu. La CrossFit Unbroken Spirit plătești pentru antrenorat profesional și un program structurat. Nu trebuie să te întrebi "ce fac azi?" – noi ne ocupăm de programare, și antrenamente, iar comunitatea, de sprijin și distracție.'
    },
    {
      id: 'what-to-bring',
      q: 'Ce ar trebui să aduc la prima clasă?',
      a: 'Haine de sport confortabile și o pereche de încălțăminte sport (pantofii cu talpă plată sunt mai buni decât cei de alergat, cu talpă moale). Adu și o sticlă cu apă și o atitudine pozitivă.'
    },
    {
      id: 'free-trial',
      q: 'Oferiți o clasă de probă gratuită?',
      a: 'Da! Ne-ar plăcea să experimentezi comunitatea noastră direct. Poți să te înscrii prin ',
      aWithLink: true
    },
    {
      id: 'class-duration',
      q: 'Cât durează clasele?',
      a: 'Toate clasele durează în jur de 60 de minute. Acestea includ instructajul, încălzirea ghidată, o sesiune de forță sau tehnică, antrenamentul zilei (WOD) și revenirea (stretching).'
    },
    {
      id: 'pricing',
      q: 'Cât costă un abonament?',
      a: 'Abonamentele noastre sunt structurate în funcție de frecvența antrenamentelor. Deși suntem mai scumpi decât o sală comercială, reține că fiecare clasă este gestionată de un antrenor certificat. Practic, e un antrenament personal la o fracțiune din preț. ',
      aPricing: true
    },
    {
      id: 'safety',
      q: 'Este CrossFit-ul periculos? Mă voi accidenta?',
      a: 'Orice activitate fizică implică riscuri, dar noi le reducem la minimum prin filozofia noastră: "Mecanică, Consistență, apoi Intensitate". Insistăm să te miști corect înainte de a te mișca repede sau cu greutăți mari.'
    },
    {
      id: 'old-injury',
      q: 'Ce fac dacă am o accidentare mai veche (genunchi, spate etc.)?',
      a: 'Spune-i antrenorului tău! Fiecare mișcare din CrossFit poate fi adaptată (scalată). Dacă ai alergare în program, dar te dor genunchii, poți înlocui cu metri sau calorii pe bicicletă sau rower. Metodologia CrossFit prevede adaptarea oricăror mișcări pentru a te menține în siguranță.'
    },
    {
      id: 'competitions',
      q: 'Trebuie să particip la competiții?',
      a: 'Deloc. Deși unora le plac competițiile, 90% din comunitatea noastră este aici pentru sănătate, aspect fizic și longevitate. Singura ta competiție este cu tine însuți.'
    },
    {
      id: 'frequency',
      q: 'De câte ori pe săptămână ar trebui să vin?',
      a: 'Pentru începători, recomandăm 3 zile pe săptămână pentru a permite corpului să se recupereze. Pe măsură ce avansează, mulți membri aleg 4-5 zile pentru rezultate optime.'
    },
    {
      id: 'how-to-start',
      q: 'Cum pot începe?',
      a: 'Cel mai simplu mod este să:\n* ',
      aHowToStart: true
    },
    {
      id: 'facilities',
      q: 'Aveți dușuri și vestiare?',
      a: 'Da! Avem vestiare complet echipate, astfel încât să poți merge direct la serviciu sau acasă după antrenament.'
    },
    {
      id: 'drop-in',
      q: 'Pot veni în vizită (drop-in) dacă sunt de la altă sală?',
      a: 'Ne plac vizitatorii! Dacă ai cel puțin 3 luni de experiență în CrossFit, poți rezerva un drop-in prin site-ul nostru. ',
      aDropIn: true
    },
    {
      id: 'scores',
      q: 'De ce notăm scorurile?',
      a: 'Folosim aplicația ThunderWod pentru a monitoriza rezultatele. Nu facem asta pentru clasamente, ci pentru că datele nu mint. Să vezi la diverse intervale de timp că ai ridicat cu 5kg mai mult sau ai alergat mai repede decât în trecut e cea mai bună motivație pe termen lung!'
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
             ? 'Găsește răspunsurile la întrebări comune despre CrossFit și sala noastră.'
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
                      <p className="text-gray-300 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                        {faq.a}
                        {faq.aWithLink && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onBookSession?.();
                            }}
                            className="text-blue-400 hover:text-blue-300 underline transition-colors font-semibold"
                          >
                            acest formular
                          </button>
                        )}
                        {faq.aWithLink && '.'}
                        {faq.aPricing && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleScrollToPricing();
                            }}
                            className="text-blue-400 hover:text-blue-300 underline transition-colors font-semibold"
                          >
                            Aici poți vedea prețurile abonamentelor.
                          </button>
                        )}
                        {faq.aHowToStart && (
                          <>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onBookSession?.();
                              }}
                              className="text-blue-400 hover:text-blue-300 underline transition-colors font-semibold"
                            >
                              Programezi o ședință gratuită
                            </button>
                            {'\n* Cunoști antrenorii și sala\n* Participi la primul antrenament\nDupă aceea vei putea intra în programul normal de clase.'}
                          </>
                        )}
                        {faq.aDropIn && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleScrollToPricing('drop-in');
                            }}
                            className="text-blue-400 hover:text-blue-300 underline transition-colors font-semibold"
                          >
                            Taxa este de 60 de lei.
                          </button>
                        )}
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