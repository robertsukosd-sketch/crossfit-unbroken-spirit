import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '../LanguageProvider';
import { cn } from '@/lib/utils';
import { openAppWithFallback } from '../appStoreUtils';

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

  const getFAQs = () => {
    if (language === 'ro') {
      return [
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
          id: 'vs-gym',
          q: 'Prin ce diferă CrossFitul de o sală comercială?',
          a: 'La o sală obișnuită plătești pentru acces la aparate și te antrenezi pe cont propriu.\nLa CrossFit Unbroken Spirit, abonamentul presupune participarea la clase de grup ghidate de antrenor. Fiecare antrenament este deja programat și structurat, iar antrenorul te ghidează pe parcursul sesiunii.\nAsta înseamnă că nu trebuie să te întrebi „ce fac azi?" — noi ne ocupăm de programare și antrenamente, iar comunitatea oferă suport, motivație și energie la fiecare clasă.'
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
          a: '',
          aOpenGym: true
        },
        {
          id: 'parking',
          q: 'Există parcare? Cum pot ajunge la sală?',
          a: 'Sala este ușor accesibilă, atât cu transportul în comun, cât și cu mașina.\nCea mai apropiată stație de metrou este Mihai Bravu, aflată la aproximativ 7–8 minute de mers pe jos. În același timp, cele mai apropiate stații STB sunt Pod Mihai Bravu pentru linia de autobuz 223 și Pod Mihai Bravu pentru linia de tramvai 10.\nDacă vii cu mașina, ai un mare avantaj: parcare gratuită inclusă! Nu trebuie să îți faci griji pentru locul de parcare sau costuri suplimentare.',
          aParking: true
        },
        {
          id: 'thunderwod-app',
          q: 'De ce trebuie să descarc aplicația ThunderWOD?',
          a: ' este folosită pentru organizarea și gestionarea antrenamentelor din sală. Prin aplicație:\n• poți să-ți rezervi locul la clase\n• poți să vezi programul antrenamentelor\n• poți să vezi în avans antrenamentul zilei (WOD)\n• îți poți urmări rezultatele și monitoriza progresul\n• îți poți plăti și gestiona abonamentul\nPractic, ai o singură aplicație pentru tot: programări, antrenamente și plăți. Astfel, procesul este rapid, simplu și ușor de gestionat direct de pe telefon.',
          aThunderWOD: true
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
          a: 'Folosim ',
          aScores: true
        }
      ];
    }
    return [
      {
        id: 'what-is',
        q: 'What is CrossFit?',
        a: 'CrossFit is a training program based on functional movements, performed at high intensity and constantly varied. It combines strength, cardio, and gymnastics exercises to improve overall fitness. The goal is to develop strength, endurance, mobility, and performance for real-life activities.'
      },
      {
        id: 'vs-gym',
        q: 'How is CrossFit different from a regular gym?',
        a: 'At a regular gym, you pay for equipment access and train on your own.\nAt CrossFit Unbroken Spirit, your membership means participating in group classes led by a coach. Every workout is already programmed and structured, and the coach guides you throughout the session.\nThat means you never have to wonder "what do I do today?" — we handle the programming and workouts, while the community provides support, motivation, and energy at every class.'
      },
      {
        id: 'fitness-required',
        q: 'Do I need to be in shape before starting CrossFit?',
        a: 'Absolutely not. This is the biggest myth! CrossFit is the process of getting in shape. CrossFit box members range from elite athletes to regular people who just want to move.'
      },
      {
        id: 'no-weights-before',
        q: 'What if I\'ve never done weightlifting before?',
        a: 'You\'re in the right place. Every new member gets guidance from a coach who will teach you basic movements with barbells, kettlebells, and gymnastics in a completely safe environment.'
      },
      {
        id: 'bulk-up',
        q: 'Will I get bulky doing CrossFit?',
        a: 'Only if that\'s your specific goal and you put in massive effort. Excessive muscle mass comes from a hypercaloric diet and specific lifting training. CrossFit focuses on functional strength and conditioning. You\'ll become stronger and more toned, not accidentally a bodybuilder!'
      },
      {
        id: 'benefits',
        q: 'What are the benefits of CrossFit?',
        a: 'Among the main benefits:\n• Increased strength and endurance\n• Efficient calorie burning\n• Improved mobility\n• Development of discipline and consistency\n• Community and motivation in workouts'
      },
      {
        id: 'weight-loss',
        q: 'Can I lose weight doing CrossFit?',
        a: 'Yes, but with nuance. CrossFit workouts are intense and can burn a large number of calories, contributing to weight loss when combined with balanced nutrition. While any training primarily helps maintain muscle mass, you\'ll still lose weight from consistent caloric deficit over time.'
      },
      {
        id: 'open-gym',
        q: 'What is Open Gym?',
        a: '',
        aOpenGym: true
      },
      {
        id: 'parking',
        q: 'Is there parking? How do I get to the gym?',
        a: 'The gym is easily accessible by both public transport and car.\nThe nearest metro station is Mihai Bravu, about a 7–8 minute walk away. The nearest STB stops are Pod Mihai Bravu for bus line 223 and Pod Mihai Bravu for tram line 10.\nIf you\'re coming by car, you have a great advantage: free parking included! No need to worry about finding a spot or extra costs.',
        aParking: true
      },
      {
        id: 'thunderwod-app',
        q: 'Why do I need to download the ThunderWOD app?',
        a: ' is used to organize and manage your gym workouts. Through the app:\n• you can reserve your spot in classes\n• you can view the workout schedule\n• you can see the Workout of the Day (WOD) in advance\n• you can track your results and monitor your progress\n• you can pay for and manage your membership\nEssentially, it\'s one app for everything: bookings, workouts, and payments — making the whole process fast, simple, and easy to manage right from your phone.',
        aThunderWOD: true
      },
      {
        id: 'what-to-bring',
        q: 'What should I bring to my first class?',
        a: 'Comfortable workout clothes and a pair of athletic shoes (flat-soled shoes are better than running shoes with soft soles). Also bring a water bottle and a positive attitude.'
      },
      {
        id: 'free-trial',
        q: 'Do you offer a free trial class?',
        a: 'Yes! We\'d love for you to experience our community firsthand. You can sign up through ',
        aWithLink: true
      },
      {
        id: 'class-duration',
        q: 'How long are the classes?',
        a: 'All classes last about 60 minutes. They include a walkthrough, a guided warm-up, a strength or technique session, the Workout of the Day (WOD) and cool-down (stretching).'
      },
      {
        id: 'pricing',
        q: 'How much does a membership cost?',
        a: 'Our memberships are structured based on training frequency. While we\'re pricier than a commercial gym, remember that every class is led by a certified coach. Basically, it\'s personal training for a fraction of the price. You can see the plan prices ',
        aPricing: true
      },
      {
        id: 'safety',
        q: 'Is CrossFit dangerous? Will I get injured?',
        a: 'Any physical activity carries risks, but we minimize them through our philosophy: "Mechanics, Consistency, then Intensity". We insist on moving correctly before moving fast or with heavy weights.'
      },
      {
        id: 'old-injury',
        q: 'What if I have an old injury (knees, back, etc.)?',
        a: 'Tell your coach! Every CrossFit movement can be adapted (scaled). If your programming includes running but your knees hurt, you can substitute with meters or calories on a bike or rower. The CrossFit methodology provides modifications for any movement to keep you safe.'
      },
      {
        id: 'competitions',
        q: 'Do I have to compete?',
        a: 'Not at all. While some enjoy competitions, 90% of our community is here for health, physique, and longevity. Your only competition is with yourself.'
      },
      {
        id: 'frequency',
        q: 'How many times a week should I come?',
        a: 'For beginners, we recommend 3 days a week to allow your body to recover. As you progress, many members choose 4-5 days for optimal results.'
      },
      {
        id: 'how-to-start',
        q: 'How do I get started?',
        a: 'The easiest way is to:\n* ',
        aHowToStart: true
      },
      {
        id: 'facilities',
        q: 'Do you have showers and lockers?',
        a: 'Yes! We have fully equipped changing rooms so you can go straight to work or home after training.'
      },
      {
        id: 'drop-in',
        q: 'Can I visit (drop-in) if I\'m from another gym?',
        a: 'We love visitors! If you have at least 3 months of CrossFit experience, you can book a drop-in through our website. ',
        aDropIn: true
      },
      {
        id: 'scores',
        q: 'Why do we track scores?',
        a: 'We use ',
        aScores: true
      }
    ];
  };

  const faqs = getFAQs();

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
                        {faq.aThunderWOD && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              openAppWithFallback();
                            }}
                            className="text-blue-400 hover:text-blue-300 underline transition-colors font-semibold"
                          >
                            {language === 'ro' ? 'Aplicația ThunderWOD' : 'The ThunderWOD app'}
                          </button>
                        )}
                        {faq.a}
                        {faq.aWithLink && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onBookSession?.();
                            }}
                            className="text-blue-400 hover:text-blue-300 underline transition-colors font-semibold"
                          >
                            {language === 'ro' ? 'acest formular' : 'this form'}
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
                            {language === 'ro' ? 'Aici poți vedea prețurile abonamentelor.' : 'here.'}
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
                              {language === 'ro' ? 'Programezi o ședință gratuită' : 'Book a free session'}
                            </button>
                            {language === 'ro' 
                              ? '\n* Cunoști antrenorii și sala\n* Participi la primul antrenament\nDupă aceea vei putea intra în programul normal de clase.'
                              : '\n* Meet the coaches and gym\n* Participate in your first workout\nAfter that you can join the regular class program.'}
                          </>
                        )}
                        {faq.aDropIn && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleScrollToPricing('welcome');
                            }}
                            className="text-blue-400 hover:text-blue-300 underline transition-colors font-semibold"
                          >
                            {language === 'ro' ? 'Taxa este de 60 de lei.' : 'The fee is 60 RON.'}
                          </button>
                        )}
                        {faq.aScores && (
                          <>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                openAppWithFallback();
                              }}
                              className="text-blue-400 hover:text-blue-300 underline transition-colors font-semibold"
                            >
                              {language === 'ro' ? 'aplicația ThunderWod' : 'the ThunderWod app'}
                            </button>
                            {language === 'ro'
                              ? ' pentru a monitoriza rezultatele. Nu facem asta pentru clasamente, ci pentru că datele nu mint. Să vezi la diverse intervale de timp că ai ridicat cu 5kg mai mult sau ai alergat mai repede decât în trecut e cea mai bună motivație pe termen lung!'
                              : ' to track your results. We don\'t do this for rankings, but because the data doesn\'t lie. Seeing over time that you lifted 5kg more or ran faster than before is the best long-term motivation!'}
                          </>
                        )}
                        {faq.aParking && (
                          <img
                            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69948c0d6b8aa61f49f0a23d/4054d6144_image.png"
                            alt={language === 'ro' ? 'Hartă traseu spre sală' : 'Map route to the gym'}
                            className="mt-4 w-full rounded-xl border border-zinc-700"
                          />
                        )}
                        {faq.aOpenGym && (
                          <>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleScrollToPricing('ascent');
                              }}
                              className="text-blue-400 hover:text-blue-300 underline transition-colors font-semibold"
                            >
                              Open Gym
                            </button>
                            {language === 'ro'
                              ? ' este un interval orar în care poți veni la sală pentru a te antrena pe cont propriu, folosind echipamentul disponibil. Spre deosebire de clasele obișnuite de CrossFit, în timpul Open Gym nu există un antrenament ghidat de grup. De obicei, este folosit de membrii care vor să exerseze anumite mișcări, să recupereze un antrenament sau să lucreze suplimentar la anumite skill-uri.'
                              : ' is a time slot when you can come to the gym to train on your own, using available equipment. Unlike regular CrossFit classes, during Open Gym there\'s no group-led training. It\'s typically used by members who want to practice specific movements, make up a missed workout, or work extra on certain skills.'}
                          </>
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