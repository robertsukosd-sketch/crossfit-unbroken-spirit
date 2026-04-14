import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Dumbbell, Users, Building2, CreditCard, Smartphone } from 'lucide-react';
import { useLanguage } from '../LanguageProvider';
import { cn } from '@/lib/utils';
import { openAppWithFallback } from '../appStoreUtils';

const CATEGORIES_RO = [
  { id: 'crossfit', label: 'Ce este CrossFitul?', icon: Dumbbell },
  { id: 'beginners', label: 'Începători', icon: Users },
  { id: 'box', label: 'Sală & Facilități', icon: Building2 },
  { id: 'pricing', label: 'Abonamente & Prețuri', icon: CreditCard },
  { id: 'app', label: 'ThunderWOD App', icon: Smartphone },
];

const CATEGORIES_EN = [
  { id: 'crossfit', label: 'What is CrossFit?', icon: Dumbbell },
  { id: 'beginners', label: 'For Beginners', icon: Users },
  { id: 'box', label: 'Box & Facilities', icon: Building2 },
  { id: 'pricing', label: 'Memberships & Pricing', icon: CreditCard },
  { id: 'app', label: 'ThunderWOD App', icon: Smartphone },
];

const FAQ_CATEGORIES = {
  crossfit: ['what-is', 'vs-gym', 'faq-wod-meaning', 'benefits', 'weight-loss', 'bulk-up'],
  beginners: ['fitness-required', 'no-weights-before', 'safety', 'old-injury', 'what-to-bring', 'free-trial', 'how-to-start'],
  box: ['parking', 'open-gym', 'facilities', 'drop-in'],
  pricing: ['pricing', 'class-duration', 'frequency', 'competitions'],
  app: ['thunderwod-app', 'scores'],
};

export default function FAQSection({ onBookSession }) {
  const { t, language } = useLanguage();
  const [openId, setOpenId] = useState(null);
  const [activeCategory, setActiveCategory] = useState('crossfit');

  const categories = language === 'ro' ? CATEGORIES_RO : CATEGORIES_EN;

  useEffect(() => {
    const handleOpenFaq = () => {
      const openFaqId = sessionStorage.getItem('openFaqId');
      if (openFaqId) {
        const cat = Object.entries(FAQ_CATEGORIES).find(([, ids]) => ids.includes(openFaqId));
        if (cat) setActiveCategory(cat[0]);
        setOpenId(openFaqId);
        sessionStorage.removeItem('openFaqId');

        setTimeout(() => {
          const faqSection = document.getElementById('faq');
          if (faqSection) {
            faqSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setTimeout(() => {
              const element = document.getElementById(openFaqId);
              if (element) element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 600);
          }
        }, 200);
      }
    };

    handleOpenFaq();
    window.addEventListener('openFaqEvent', handleOpenFaq);
    return () => window.removeEventListener('openFaqEvent', handleOpenFaq);
  }, []);

  const handleCategoryChange = (catId) => {
    setActiveCategory(catId);
    setOpenId(null);
  };

  const handleScrollToPricing = (category = null) => {
    if (category) {
      sessionStorage.setItem('selectedPricingCategory', category);
      window.dispatchEvent(new Event('selectPricingCategory'));
    }
    setTimeout(() => {
      const el = document.getElementById('pricing');
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }, 50);
  };

  const getFAQs = () => {
    if (language === 'ro') {
      return [
        { id: 'what-is', q: 'Ce înseamnă CrossFit?', a: 'CrossFit este un program de antrenament bazat pe mișcări funcționale, realizate la intensitate ridicată și variate constant. Acesta combină exerciții de forță, cardio și gimnastică pentru a îmbunătăți condiția fizică generală. Scopul este să dezvolți forță, rezistență, mobilitate și performanță pentru activitățile din viața reală.', aImage: true },
        { id: 'vs-gym', q: 'Prin ce diferă CrossFitul de o sală comercială?', a: 'La o sală obișnuită plătești pentru acces la aparate și te antrenezi pe cont propriu. La CrossFit Unbroken Spirit, abonamentul presupune participarea la clase de grup ghidate de antrenor. Fiecare antrenament este deja programat și structurat, iar antrenorul te ghidează pe parcursul sesiunii. Asta înseamnă că nu trebuie să te întrebi „ce fac azi?" — noi ne ocupăm de programare și antrenamente, iar comunitatea oferă suport, motivație și energie la fiecare clasă.', aHighlightGym: true },
        { id: 'faq-wod-meaning', q: 'Ce înseamnă WOD?', a: 'În lumea CrossFit, WOD (pronunțat ca un cuvânt, „uod") este cel mai des întâlnit acronim pe care îl vei auzi în sală.\nAcesta înseamnă Workout of the Day (Antrenamentul Zilei).\n\nDe ce se numește WOD?\nFilosofia CrossFit se bazează pe „mișcări funcționale, variate constant". În loc să ai o „zi de picioare" sau o „zi de cardio", antrenamentul se schimbă în fiecare zi.\n• Universalitate: Toți din sală—de la sportivii de performanță până la începători—fac același WOD în aceeași zi (scalat la nivelul individual de fitness).\n• Elementul surpriză: O parte din distracția (și emoția!) de a face CrossFit este să verifici aplicația sălii sau tabla pentru a vedea care e WOD-ul zilei.\n• Urmărirea progresului: Deoarece este un antrenament specific și măsurabil, îți poți nota scorul și-l poți compara cu performanța ta când același WOD apare din nou peste câteva luni.\n\nCum arată un WOD?\nWOD-ul este, de obicei, partea de intensitate ridicată a clasei. Durează, în medie, între 5 și 20 de minute și poate urma diferite formate, cum ar fi:\n• AMRAP: As Many Rounds As Possible (cât mai multe runde într-un timp stabilit).\n• EMOM: Every Minute on the Minute.\n• For Time: Termină munca cât mai rapid posibil.\n• Chipper: O listă lungă de mișcări pe care trebuie să le „dai jos" până termini tot volumul.' },
        { id: 'benefits', q: 'Ce beneficii are CrossFitul?', a: 'Printre principalele beneficii:\n• creșterea forței și rezistenței\n• arderea eficientă a caloriilor\n• îmbunătățirea mobilității\n• dezvoltarea disciplinei și consistenței\n• comunitate și motivație în antrenamente' },
        { id: 'weight-loss', q: 'Pot slăbi făcând CrossFit?', a: 'Da, dar cu nuanțe. Antrenamentele CrossFit sunt intense și pot arde un număr mare de calorii, contribuind la scăderea în greutate atunci când sunt combinate cu o alimentație echilibrată. Deși antrenamentele de orice fel ajuta în principal la menținerea masei musculare, vei slăbi tot în urma unui deficit caloric constant de-a lungul timpului.' },
        { id: 'bulk-up', q: 'O să iau proporții de la CrossFit?', a: 'Doar dacă e scopul tău specific și depui un efort uriaș în acest sens. Masa musculară excesivă vine dintr-o dietă hipercalorică și antrenamente de lifting specifice. CrossFitul se concentrează pe forță funcțională și condiționare. Vei deveni mai puternic/ă și mai tonifiat/ă, nu vei arăta ca un culturist.' },
        { id: 'fitness-required', q: 'Trebuie să fiu în formă înainte de a începe CrossFit?', a: 'Categoric nu. Acesta e cel mai mare mit! CrossFit este procesul prin care ajungi în formă. Membrii unei săli de CrossFit variază de la sportivi de elită la oameni obișnuiți care vor doar să facă mișcare.' },
        { id: 'no-weights-before', q: 'Ce se întâmplă dacă nu am mai făcut antrenamente cu greutăți până acum?', a: 'Ești în locul potrivit. Fiecare membru nou are parte de îndrumare din partea unui antrenor, de la care va învăța mișcările de bază cu haltera, kettlebell-ul și gimnastica, în siguranță deplină.' },
        { id: 'safety', q: 'Este CrossFitul periculos? Există riscuri să mă accidentez?', a: 'Orice activitate fizică implică riscuri, dar noi le reducem la minimum prin filozofia noastră: "Mecanică, Consistență, apoi Intensitate". Insistăm să te miști corect înainte de a te mișca repede sau cu greutăți mari.' },
        { id: 'old-injury', q: 'Ce fac dacă am o accidentare mai veche (genunchi, spate etc.)?', a: 'Spune-i antrenorului tău! Fiecare mișcare din CrossFit poate fi adaptată (scalată). Dacă ai alergare în program, dar te dor genunchii, poți înlocui cu metri sau calorii pe bicicletă sau rower. Metodologia CrossFit prevede adaptarea oricăror mișcări pentru a te menține în siguranță.' },
        { id: 'what-to-bring', q: 'Ce ar trebui să aduc la prima clasă?', a: 'Haine de sport confortabile și o pereche de încălțăminte sport (pantofii cu talpă plată sunt mai buni decât cei de alergat, cu talpă moale). Adu și o sticlă cu apă și o atitudine pozitivă.' },
        { id: 'free-trial', q: 'Oferiți o clasă de probă gratuită?', a: 'Da! Ne-ar plăcea să experimentezi comunitatea noastră direct. Poți să te înscrii prin ', aWithLink: true },
        { id: 'how-to-start', q: 'Cum pot începe?', a: '', aHowToStart: true },
        { id: 'parking', q: 'Cum pot ajunge la sală? Există parcare?', a: 'Sala este ușor accesibilă atât cu transportul în comun, cât și cu mașina.\nCea mai apropiată stație de metrou este Mihai Bravu, la 7–8 minute de mers pe jos, iar stațiile STB din apropiere sunt Pod Mihai Bravu (autobuz 223 și tramvaie 1 și 10).\nPentru cei care vin cu mașina, există parcare gratuită inclusă!', aParking: true, aHighlightParking: true },
        { id: 'open-gym', q: 'Ce este Open Gym?', a: 'Open Gym este un interval orar în care poți veni la sală pentru a te antrena pe cont propriu, folosind echipamentul disponibil. Spre deosebire de clasele obișnuite de CrossFit, în timpul acestui interval nu există un antrenament ghidat de grup. De obicei, este folosit de membrii care vor să exerseze anumite mișcări, să recupereze un antrenament sau să lucreze suplimentar la anumite skill-uri.', aOpenGym: true },
        { id: 'facilities', q: 'Aveți dușuri și vestiare?', a: 'Da! Avem vestiare complet echipate, astfel încât să poți merge direct la serviciu sau acasă după antrenament.' },
        { id: 'drop-in', q: 'Pot veni în vizită (drop-in) dacă sunt de la altă sală?', a: 'Ne plac vizitatorii! Dacă ai cel puțin 3 luni de experiență în CrossFit, poți rezerva un drop-in prin site-ul nostru. ', aDropIn: true },
        { id: 'pricing', q: 'Cât costă un abonament?', a: 'Abonamentele noastre sunt structurate în funcție de frecvența antrenamentelor. Deși suntem mai scumpi decât o sală comercială, reține că fiecare clasă este gestionată de un antrenor. Practic, e un antrenament personal la ', aPricing: true },
        { id: 'class-duration', q: 'Cât durează clasele?', a: 'Toate clasele durează în jur de 60 de minute. Acestea includ instructajul, încălzirea ghidată, o sesiune de forță sau tehnică, ', aClassDuration: true, aClassDurationExtra: true },
        { id: 'frequency', q: 'De câte ori pe săptămână ar trebui să vin?', a: 'Pentru începători, recomandăm ', aFrequency: true },
        { id: 'competitions', q: 'Trebuie să particip la competiții?', a: 'Deloc. Deși unora le plac competițiile, 90% din comunitatea noastră este aici pentru sănătate, aspect fizic și longevitate. Singura ta competiție este cu tine însuți.' },
        { id: 'thunderwod-app', q: 'De ce trebuie să descarc aplicația ThunderWOD?', a: ' este folosită pentru organizarea și gestionarea antrenamentelor din sală. Prin aplicație:\n• poți să-ți rezervi locul la clase\n• poți să vezi programul antrenamentelor\n• poți să vezi în avans antrenamentul zilei (WOD)\n• îți poți urmări rezultatele și monitoriza progresul\n• îți poți plăți și gestiona abonamentul\nPractic, ai o singură aplicație pentru tot: programări, antrenamente și plăți. Astfel, procesul este rapid, simplu și ușor de gestionat direct de pe telefon.', aThunderWODLink: true, aThunderWODStart: true },
        { id: 'scores', q: 'De ce notăm scorurile?', a: '', aScores: true },
      ];
    }
    return [
      { id: 'what-is', q: 'What is CrossFit?', a: 'CrossFit is a training program based on functional movements, performed at high intensity and constantly varied. It combines strength, cardio, and gymnastics exercises to improve overall fitness. The goal is to develop strength, endurance, mobility, and performance for real-life activities.', aImage: true },
      { id: 'vs-gym', q: 'How is CrossFit different from a regular gym?', a: 'At a regular gym, you pay for equipment access and train on your own. At CrossFit Unbroken Spirit, your membership means participating in group classes led by a coach. Every workout is already programmed and structured, and the coach guides you throughout the session. That means you never have to wonder "what do I do today?" — we handle the programming and workouts, while the community provides support, motivation, and energy at every class.', aHighlightGym: true },
      { id: 'faq-wod-meaning', q: 'What does WOD mean?', a: 'In the world of CrossFit, WOD (pronounced as a word, like "wad") is the most common acronym you\'ll hear.\nIt stands for Workout of the Day.\n\nWhy is it called a WOD?\nThe philosophy behind CrossFit is "constantly varied functional movement." Instead of having a "Leg Day" or "Cardio Day," the workout changes every single day.\n• Universality: Everyone in the gym—from the coached athlete to the beginner—does the same WOD on the same day (scaled to their individual fitness level).\n• The "Unknown": Part of the fun (and the nerves!) is checking the gym\'s app or whiteboard to see what the WOD is for that day.\n• Tracking: Because it\'s a specific "prescribed" workout, you can record your score and compare it to how you do when that same WOD comes up again months later.\n\nWhat does a WOD look like?\nA WOD is usually the high-intensity portion of the class. It typically lasts anywhere from 5 to 20 minutes and can follow different formats, such as:\n• AMRAP: As Many Rounds As Possible (in a set time).\n• EMOM: Every Minute on the Minute.\n• For Time: Complete the work as fast as possible.\n• Chipper: A long list of movements you "chip away" at until finished.' },
      { id: 'benefits', q: 'What are the benefits of CrossFit?', a: 'Among the main benefits:\n• Increased strength and endurance\n• Efficient calorie burning\n• Improved mobility\n• Development of discipline and consistency\n• Community and motivation in workouts' },
      { id: 'weight-loss', q: 'Can I lose weight doing CrossFit?', a: 'Yes, but with nuance. CrossFit workouts are intense and can burn a large number of calories, contributing to weight loss when combined with balanced nutrition. While any training primarily helps maintain muscle mass, you\'ll still lose weight from consistent caloric deficit over time.' },
      { id: 'bulk-up', q: 'Will I get bulky doing CrossFit?', a: 'Only if that\'s your specific goal and you put in massive effort. Excessive muscle mass comes from a hypercaloric diet and specific lifting training. CrossFit focuses on functional strength and conditioning. You\'ll become stronger and more toned, not accidentally a bodybuilder!' },
      { id: 'fitness-required', q: 'Do I need to be in shape before starting CrossFit?', a: 'Absolutely not. This is the biggest myth! CrossFit is the process of getting in shape. CrossFit box members range from elite athletes to regular people who just want to move.' },
      { id: 'no-weights-before', q: 'What if I\'ve never done weightlifting before?', a: 'You\'re in the right place. Every new member gets guidance from a coach who will teach you basic movements with barbells, kettlebells, and gymnastics in a completely safe environment.' },
      { id: 'safety', q: 'Is CrossFit dangerous? Will I get injured?', a: 'Any physical activity carries risks, but we minimize them through our philosophy: "Mechanics, Consistency, then Intensity". We insist on moving correctly before moving fast or with heavy weights.' },
      { id: 'old-injury', q: 'What if I have an old injury (knees, back, etc.)?', a: 'Tell your coach! Every CrossFit movement can be adapted (scaled). If your programming includes running but your knees hurt, you can substitute with meters or calories on a bike or rower. The CrossFit methodology provides modifications for any movement to keep you safe.' },
      { id: 'what-to-bring', q: 'What should I bring to my first class?', a: 'Comfortable workout clothes and a pair of athletic shoes (flat-soled shoes are better than running shoes with soft soles). Also bring a water bottle and a positive attitude.' },
      { id: 'free-trial', q: 'Do you offer a free trial class?', a: 'Yes! We\'d love for you to experience our community firsthand. You can sign up through ', aWithLink: true },
      { id: 'how-to-start', q: 'How do I get started?', a: '', aHowToStart: true },
      { id: 'parking', q: 'How can I get to the box? Do you have a parking lot?', a: 'The box is easily accessible by both public transport and car.\nThe nearest subway station is Mihai Bravu, a 7–8 minute walk away, and the nearby STB stops are Pod Mihai Bravu (bus 223 and trams 1 and 10).\nFor those coming by car, free parking is included!', aParking: true, aHighlightParking: true },
      { id: 'open-gym', q: 'What is Open Gym?', a: 'Open Gym is a time slot when you can come to the gym to train on your own, using available equipment. Unlike regular CrossFit classes, during this time there\'s no group-led training. It\'s typically used by members who want to practice specific movements, make up a missed workout, or work extra on certain skills.', aOpenGym: true },
      { id: 'facilities', q: 'Do you have showers and lockers?', a: 'Yes! We have fully equipped changing rooms so you can go straight to work or home after training.' },
      { id: 'drop-in', q: 'Can I visit (drop-in) if I\'m from another gym?', a: 'We love visitors! If you have at least 3 months of CrossFit experience, you can book a drop-in through our website. ', aDropIn: true },
      { id: 'pricing', q: 'How much does a membership cost?', a: 'Our memberships are structured based on training frequency. While we\'re pricier than a commercial gym, remember that every class is led by a coach. Basically, it\'s personal training for ', aPricing: true },
      { id: 'class-duration', q: 'How long are the classes?', a: 'All classes last about 60 minutes. They include a walkthrough, a guided warm-up, a strength or technique session, ', aClassDuration: true },
      { id: 'frequency', q: 'How many times a week should I come?', a: 'For beginners, we recommend ', aFrequency: true },
      { id: 'competitions', q: 'Do I have to compete?', a: 'Not at all. While some enjoy competitions, 90% of our community is here for health, physique, and longevity. Your only competition is with yourself.' },
      { id: 'thunderwod-app', q: 'Why do I need to download the ThunderWOD app?', a: ' is used to organize and manage your gym workouts. Through the app:\n• you can reserve your spot in classes\n• you can view the workout schedule\n• you can see the Workout of the Day (WOD) in advance\n• you can track your results and monitor your progress\n• you can pay for and manage your membership\nEssentially, it\'s one app for everything: bookings, workouts, and payments — making the whole process fast, simple, and easy to manage right from your phone.', aThunderWODLink: true, aThunderWODStart: true },
      { id: 'scores', q: 'Why do we track scores?', a: '', aScores: true },
    ];
  };

  const allFaqs = getFAQs();
  const activeFaqIds = FAQ_CATEGORIES[activeCategory] || [];
  const visibleFaqs = allFaqs.filter(f => activeFaqIds.includes(f.id));

  const renderAnswer = (faq) => {
    if (faq.aThunderWODStart) {
      return (
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed whitespace-pre-line">
          <button onClick={(e) => { e.stopPropagation(); openAppWithFallback(); }} className="text-blue-400 hover:text-blue-300 underline transition-colors font-semibold inline">
            {language === 'ro' ? 'Aplicația ThunderWOD' : 'The ThunderWOD app'}
          </button>
          {faq.a}
        </p>
      );
    }
    if (faq.aHighlightGym) {
      return (
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
          {faq.a.split('CrossFit Unbroken Spirit').map((part, i, arr) =>
            i < arr.length - 1
              ? [part, <span key={i} className="font-bold text-sky-300">CrossFit Unbroken Spirit</span>]
              : part
          )}
        </p>
      );
    }
    if (faq.aHighlightParking) {
      return (
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed whitespace-pre-line">
          {faq.a.split(/(Pod Mihai Bravu|Mihai Bravu)/g).map((part, i) =>
            (part === 'Mihai Bravu' || part === 'Pod Mihai Bravu')
              ? <span key={i} className="font-bold text-sky-300">{part}</span>
              : part
          )}
        </p>
      );
    }
    if (faq.aOpenGym) {
      const text = faq.a;
      const idx = text.indexOf('Open Gym');
      return (
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed whitespace-pre-line">
          {idx === -1 ? text : (
            <>
              {text.slice(0, idx)}
              <button onClick={(e) => { e.stopPropagation(); handleScrollToPricing('ascent'); }} className="text-blue-400 hover:text-blue-300 underline transition-colors font-semibold">Open Gym</button>
              {text.slice(idx + 'Open Gym'.length)}
            </>
          )}
        </p>
      );
    }
    if (faq.aHowToStart) {
      return (
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
          {language === 'ro' ? 'Cel mai simplu mod este să:' : 'The easiest way is to:'}<br />
          {'• '}
          <button onClick={(e) => { e.stopPropagation(); onBookSession?.(); }} className="text-blue-400 hover:text-blue-300 underline transition-colors font-semibold">
            {language === 'ro' ? 'Programezi o ședință gratuită' : 'Book a free session'}
          </button>
          <br />
          {'• '}
          <button onClick={(e) => { e.stopPropagation(); document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-blue-400 hover:text-blue-300 underline transition-colors font-semibold">
            {language === 'ro' ? 'Cunoști antrenorii și sala' : 'Meet the coaches and gym'}
          </button>
          <br />
          {language === 'ro' ? '• Participi la primul antrenament\nDupă aceea vei putea intra în programul normal de clase.' : '• Participate in your first workout\nAfter that you can join the regular class program.'}
        </p>
      );
    }
    if (faq.aScores) {
      return (
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
          {language === 'ro' ? 'Folosim ' : 'We use '}
          <button onClick={(e) => { e.stopPropagation(); openAppWithFallback(); }} className="text-blue-400 hover:text-blue-300 underline transition-colors font-semibold">
            {language === 'ro' ? 'aplicația ThunderWod' : 'the ThunderWod app'}
          </button>
          {language === 'ro'
            ? ' pentru a monitoriza rezultatele. Nu facem asta pentru clasamente, ci pentru că datele nu mint. Să vezi la diverse intervale de timp că ai ridicat cu 5kg mai mult sau ai alergat mai repede decât în trecut e cea mai bună motivație pe termen lung!'
            : ' to track your results. We don\'t do this for rankings, but because the data doesn\'t lie. Seeing over time that you lifted 5kg more or ran faster than before is the best long-term motivation!'}
        </p>
      );
    }

    return (
      <p className="text-gray-300 text-sm sm:text-base leading-relaxed whitespace-pre-line">
        {faq.a}
        {faq.aWithLink && (
          <button onClick={(e) => { e.stopPropagation(); onBookSession?.(); }} className="text-blue-400 hover:text-blue-300 underline transition-colors font-semibold">
            {language === 'ro' ? 'acest formular' : 'this form'}
          </button>
        )}
        {faq.aClassDuration && (
          <>
            <button onClick={(e) => { e.stopPropagation(); setActiveCategory('crossfit'); setOpenId('faq-wod-meaning'); setTimeout(() => { document.getElementById('faq-wod-meaning')?.scrollIntoView({ behavior: 'smooth', block: 'center' }); }, 100); }} className="text-blue-400 hover:text-blue-300 underline transition-colors font-semibold">
              {language === 'ro' ? 'antrenamentul zilei (WOD)' : 'Workout of the Day (WOD)'}
            </button>
            {language === 'ro' ? ' și revenirea (stretching). Asta nu înseamnă că, dacă vrei să stai mai mult de o oră în sală, nu poți s-o faci. Ești binevenit să stai cât vrei în limita programului.' : ' and cool-down (stretching).'}
          </>
        )}
        {faq.aPricing && (
          <>
            <button onClick={(e) => { e.stopPropagation(); handleScrollToPricing('core'); }} className="text-blue-400 hover:text-blue-300 underline transition-colors font-semibold">
              {language === 'ro' ? 'o fracțiune din preț' : 'a fraction of the price'}
            </button>
            {'.'}
          </>
        )}
        {faq.aFrequency && (
          <>
            <button onClick={(e) => { e.stopPropagation(); handleScrollToPricing('core'); }} className="text-blue-400 hover:text-blue-300 underline transition-colors font-semibold">
              {language === 'ro' ? '3 zile pe săptămână' : '3 days a week'}
            </button>
            {language === 'ro' ? ' pentru a permite corpului să se recupereze. Pe măsură ce avansează, mulți membri aleg 4-5 zile pentru rezultate optime.' : ' to allow your body to recover. As you progress, many members choose 4-5 days for optimal results.'}
          </>
        )}
        {faq.aDropIn && (
          <button onClick={(e) => { e.stopPropagation(); handleScrollToPricing('welcome'); }} className="text-blue-400 hover:text-blue-300 underline transition-colors font-semibold">
            {language === 'ro' ? 'Taxa este de 60 de lei' : 'The fee is 60 RON'}
          </button>
        )}
      </p>
    );
  };

  return (
    <section id="faq" className="py-24 bg-zinc-950 relative overflow-hidden">
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-sky-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">
            {language === 'ro' ? 'Întrebări Frecvente' : 'Frequently Asked Questions'}
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto">
            {language === 'ro' ? 'Răspunsuri la întrebări comune despre CrossFit și sala noastră.' : 'Find answers to common questions about CrossFit and our gym.'}
          </p>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex justify-center gap-2 mb-8 overflow-x-auto pb-1 no-scrollbar">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-bold transition-all duration-200 border whitespace-nowrap flex-shrink-0',
                  isActive
                    ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/25'
                    : 'bg-zinc-900 border-zinc-700 text-gray-300 hover:border-blue-500/50 hover:text-white'
                )}
              >
                <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* FAQ Items */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="space-y-3"
          >
            {visibleFaqs.map((faq, index) => (
              <motion.div
                key={faq.id}
                id={faq.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04 }}
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
                    <h3 className="text-base sm:text-lg font-semibold text-white pr-2">{faq.q}</h3>
                    <motion.div animate={{ rotate: openId === faq.id ? 180 : 0 }} transition={{ duration: 0.2 }} className="flex-shrink-0 mt-0.5">
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
                      <div className="px-5 sm:px-6 py-4 bg-zinc-900/30 border-l-2 border-blue-500 mt-1 rounded-lg space-y-3">
                        {renderAnswer(faq)}
                        {faq.aParking && (
                          <img
                            src="https://media.base44.com/images/public/69948c0d6b8aa61f49f0a23d/c3e5ef236_new_map_how_to.png"
                            alt={language === 'ro' ? 'Hartă traseu spre sală' : 'Map route to the gym'}
                            className="w-full rounded-xl border border-zinc-700 mt-3"
                          />
                        )}
                        {faq.aImage && (
                          <img
                            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69948c0d6b8aa61f49f0a23d/c02900e79_image.png"
                            alt={language === 'ro' ? 'CrossFit - Fitness în 100 de cuvinte' : 'CrossFit - Fitness in 100 words'}
                            className="w-full rounded-xl border border-zinc-700 mt-3"
                          />
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}