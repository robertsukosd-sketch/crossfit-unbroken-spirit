import { useEffect } from 'react';
import { useLanguage } from '../LanguageProvider';

const OG_IMAGE = 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69948c0d6b8aa61f49f0a23d/b2dc11465_CrossFit_US-058.jpg';
const SITE_URL = 'https://www.unbrokenspirit.ro';

const LOCAL_BUSINESS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "SportsActivityLocation",
  "name": "CrossFit Unbroken Spirit",
  "description": "Sală de CrossFit în București, oferind antrenamente funcționale de înaltă intensitate, Personal Training și Open Gym.",
  "url": "https://www.unbrokenspirit.ro",
  "logo": "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69948c0d6b8aa61f49f0a23d/6f20a4dfe_image.png",
  "image": OG_IMAGE,
  "telephone": "+40722345678",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Splaiul Unirii 257-259",
    "addressLocality": "București",
    "addressCountry": "RO",
    "postalCode": "030145"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 44.4268,
    "longitude": 26.1025
  },
  "openingHoursSpecification": [
    { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"], "opens": "06:00", "closes": "21:00" },
    { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Saturday"], "opens": "09:00", "closes": "13:00" }
  ],
  "sameAs": [
    "https://www.instagram.com/crossfit.unbroken.spirit",
    "https://www.facebook.com/crossfitunbrokenspirit"
  ],
  "priceRange": "320-450 RON/lună",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5",
    "reviewCount": "21",
    "bestRating": "5"
  }
};

const FAQ_SCHEMA_RO = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "Ce înseamnă CrossFit?", "acceptedAnswer": { "@type": "Answer", "text": "CrossFit este un program de antrenament bazat pe mișcări funcționale, realizate la intensitate ridicată și variate constant. Combină exerciții de forță, cardio și gimnastică pentru a îmbunătăți condiția fizică generală." } },
    { "@type": "Question", "name": "Trebuie să fiu în formă înainte de a începe CrossFit?", "acceptedAnswer": { "@type": "Answer", "text": "Categoric nu. CrossFit este procesul prin care ajungi în formă. Membrii variază de la sportivi de elită la oameni obișnuiți care vor doar să facă mișcare." } },
    { "@type": "Question", "name": "Cât costă un abonament la CrossFit Unbroken Spirit?", "acceptedAnswer": { "@type": "Answer", "text": "Abonamentele încep de la 320 RON/lună pentru 8 clase. Abonamentul de 12 clase costă 400 RON/lună, iar cel nelimitat 450 RON/lună. Există și opțiuni de Personal Training și Open Gym." } },
    { "@type": "Question", "name": "Cât durează o clasă de CrossFit?", "acceptedAnswer": { "@type": "Answer", "text": "Toate clasele durează aproximativ 60 de minute și includ instructaj, încălzire, o sesiune de forță sau tehnică, antrenamentul zilei (WOD) și stretching." } },
    { "@type": "Question", "name": "Este CrossFitul periculos?", "acceptedAnswer": { "@type": "Answer", "text": "Orice activitate fizică implică riscuri, dar le reducem la minimum prin filozofia: 'Mecanică, Consistență, apoi Intensitate'. Insistăm să te miști corect înainte de a te mișca repede sau cu greutăți mari." } },
    { "@type": "Question", "name": "Cum pot ajunge la sală? Există parcare?", "acceptedAnswer": { "@type": "Answer", "text": "Sala este la Splaiul Unirii 257-259, București. Cea mai apropiată stație de metrou este Mihai Bravu (7-8 minute pe jos). Există parcare gratuită inclusă." } },
    { "@type": "Question", "name": "Oferiți o clasă de probă gratuită?", "acceptedAnswer": { "@type": "Answer", "text": "Da! Oferim o primă clasă gratuită pentru începători. Te poți înscrie prin formularul de pe site." } }
  ]
};

const FAQ_SCHEMA_EN = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "What is CrossFit?", "acceptedAnswer": { "@type": "Answer", "text": "CrossFit is a training program based on functional movements performed at high intensity and constantly varied. It combines strength, cardio, and gymnastics exercises to improve overall fitness." } },
    { "@type": "Question", "name": "Do I need to be in shape before starting CrossFit?", "acceptedAnswer": { "@type": "Answer", "text": "Absolutely not. CrossFit is the process of getting in shape. Members range from elite athletes to regular people who just want to move." } },
    { "@type": "Question", "name": "How much does a CrossFit Unbroken Spirit membership cost?", "acceptedAnswer": { "@type": "Answer", "text": "Memberships start from 320 RON/month for 8 classes. The 12-class plan costs 400 RON/month, and the unlimited plan is 450 RON/month. Personal Training and Open Gym options are also available." } },
    { "@type": "Question", "name": "How long are CrossFit classes?", "acceptedAnswer": { "@type": "Answer", "text": "All classes last about 60 minutes and include a walkthrough, warm-up, a strength or technique session, the Workout of the Day (WOD), and a cool-down." } },
    { "@type": "Question", "name": "Is CrossFit dangerous?", "acceptedAnswer": { "@type": "Answer", "text": "Any physical activity carries risks, but we minimize them through our philosophy: 'Mechanics, Consistency, then Intensity'. We insist on moving correctly before moving fast or with heavy weights." } },
    { "@type": "Question", "name": "How can I get to the gym? Is there parking?", "acceptedAnswer": { "@type": "Answer", "text": "The gym is at Splaiul Unirii 257-259, Bucharest. The nearest subway station is Mihai Bravu (7-8 min walk). Free parking is included." } },
    { "@type": "Question", "name": "Do you offer a free trial class?", "acceptedAnswer": { "@type": "Answer", "text": "Yes! We offer a first free class for newcomers. You can sign up through the form on our website." } }
  ]
};

function injectSchema(id, schema) {
  let el = document.getElementById(id);
  if (!el) {
    el = document.createElement('script');
    el.type = 'application/ld+json';
    el.id = id;
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(schema);
}

function removeSchema(id) {
  const el = document.getElementById(id);
  if (el) el.remove();
}

const SECTION_META = {
  ro: {
    hero: {
      title: 'CrossFit Unbroken Spirit București - Forță. Comunitate. Rezultate.',
      description: 'Descoperă potențialul tău maxim la CrossFit Unbroken Spirit. Antrenamente funcționale de înaltă intensitate, coaching dedicat și o comunitate puternică în București.',
    },
    about: {
      title: 'Despre Noi - CrossFit Unbroken Spirit București',
      description: 'Cunoaște antrenorii și sala CrossFit Unbroken Spirit. Facilități moderne, parcare gratuită, vestiare complete. Metrou Mihai Bravu, Splaiul Unirii 257-259.',
    },
    starthere: {
      title: 'Ce este CrossFit? Ghid pentru Începători - Unbroken Spirit',
      description: 'Vrei să începi CrossFit dar nu știi de unde? Citește ghidul nostru complet despre ce este CrossFit, cum funcționează și de ce e perfect pentru tine.',
    },
    programs: {
      title: 'Programe CrossFit București - Unbroken Spirit',
      description: 'Explorează programele noastre CrossFit: clase de grup, Open Gym, Personal Training și Nutriție. Antrenamente adaptate oricărui nivel de fitness.',
    },
    faq: {
      title: 'Întrebări Frecvente CrossFit - Unbroken Spirit București',
      description: 'Răspunsuri la toate întrebările tale despre CrossFit, sala noastră, abonamente și prețuri. Află tot ce trebuie să știi înainte de prima clasă.',
    },
    pricing: {
      title: 'Abonamente și Prețuri CrossFit - Unbroken Spirit București',
      description: 'Abonamente CrossFit de la 320 RON/lună. Clase de grup, Open Gym, Personal Training. Prima ședință gratuită pentru începători. Parcare inclusă.',
    },
    schedule: {
      title: 'Orar CrossFit București - Unbroken Spirit',
      description: 'Orarul complet al claselor CrossFit la Unbroken Spirit. Clase în fiecare zi, dimineața și seara. Rezervă locul tău prin aplicația ThunderWOD.',
    },
    contact: {
      title: 'Contact CrossFit Unbroken Spirit - Splaiul Unirii 257-259 București',
      description: 'Contactează CrossFit Unbroken Spirit: Splaiul Unirii 257-259, București. Luni-Vineri 6:00-21:00, Sâmbătă 9:00-13:00. Metrou Mihai Bravu, parcare gratuită.',
    },
  },
  en: {
    hero: {
      title: 'CrossFit Unbroken Spirit Bucharest - Strength. Community. Results.',
      description: 'Discover your maximum potential at CrossFit Unbroken Spirit. High-intensity functional training, dedicated coaching and a strong community in Bucharest.',
    },
    about: {
      title: 'About Us - CrossFit Unbroken Spirit Bucharest',
      description: 'Meet the coaches and gym at CrossFit Unbroken Spirit. Modern facilities, free parking, fully equipped changing rooms. Near Mihai Bravu metro station.',
    },
    starthere: {
      title: 'What is CrossFit? Beginner\'s Guide - Unbroken Spirit',
      description: 'Want to start CrossFit but don\'t know where to begin? Read our complete guide on what CrossFit is, how it works and why it\'s perfect for you.',
    },
    programs: {
      title: 'CrossFit Programs Bucharest - Unbroken Spirit',
      description: 'Explore our CrossFit programs: group classes, Open Gym, Personal Training and Nutrition. Workouts adapted for every fitness level.',
    },
    faq: {
      title: 'CrossFit FAQ - Unbroken Spirit Bucharest',
      description: 'Answers to all your questions about CrossFit, our gym, memberships and pricing. Find out everything you need to know before your first class.',
    },
    pricing: {
      title: 'CrossFit Memberships & Pricing - Unbroken Spirit Bucharest',
      description: 'CrossFit memberships from 320 RON/month. Group classes, Open Gym, Personal Training. First session FREE for beginners. Parking included.',
    },
    schedule: {
      title: 'CrossFit Schedule Bucharest - Unbroken Spirit',
      description: 'Full CrossFit class schedule at Unbroken Spirit. Classes every day, morning and evening. Reserve your spot via the ThunderWOD app.',
    },
    contact: {
      title: 'Contact CrossFit Unbroken Spirit - Splaiul Unirii 257-259 Bucharest',
      description: 'Contact CrossFit Unbroken Spirit: Splaiul Unirii 257-259, Bucharest. Mon–Fri 6:00–21:00, Saturday 9:00–13:00. Mihai Bravu metro, free parking.',
    },
  },
};

// Ordered list of section IDs as they appear on the page
const SECTION_ORDER = ['hero', 'about', 'starthere', 'programs', 'faq', 'pricing', 'schedule', 'contact'];

function setMeta(name, content) {
  let el = document.querySelector(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('name', name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setOgMeta(property, content) {
  let el = document.querySelector(`meta[property="${property}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('property', property);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function applyMeta(lang, sectionId) {
  const langMeta = SECTION_META[lang] || SECTION_META.ro;
  const meta = langMeta[sectionId] || langMeta.hero;

  document.title = meta.title;
  document.documentElement.lang = lang;

  setMeta('description', meta.description);

  // Open Graph
  setOgMeta('og:title', meta.title);
  setOgMeta('og:description', meta.description);
  setOgMeta('og:image', OG_IMAGE);
  setOgMeta('og:type', 'website');
  setOgMeta('og:url', SITE_URL);

  // Twitter Card
  setMeta('twitter:card', 'summary_large_image');
  setMeta('twitter:title', meta.title);
  setMeta('twitter:description', meta.description);
  setMeta('twitter:image', OG_IMAGE);

  // FAQ Schema — only on FAQ section, language-aware
  if (sectionId === 'faq') {
    injectSchema('schema-faq', lang === 'en' ? FAQ_SCHEMA_EN : FAQ_SCHEMA_RO);
  } else {
    removeSchema('schema-faq');
  }
}

export default function SeoMeta() {
  const { language } = useLanguage();

  useEffect(() => {
    // Inject LocalBusiness schema once (always present)
    injectSchema('schema-local-business', LOCAL_BUSINESS_SCHEMA);

    // Apply default (hero) meta on mount
    applyMeta(language, 'hero');

    const observers = [];

    SECTION_ORDER.forEach((sectionId) => {
      const el = document.getElementById(sectionId);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            applyMeta(language, sectionId);
          }
        },
        { threshold: 0.2, rootMargin: '-80px 0px -40% 0px' }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((o) => o.disconnect());
      removeSchema('schema-faq');
    };
  }, [language]);

  return null;
}