import { useEffect } from 'react';
import { useLanguage } from '../LanguageProvider';

const OG_IMAGE = 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69948c0d6b8aa61f49f0a23d/b2dc11465_CrossFit_US-058.jpg';
const SITE_URL = 'https://www.unbrokenspirit.ro';

const WEBSITE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "CrossFit Unbroken Spirit",
  "url": "https://www.unbrokenspirit.ro",
  "description": "Sală de CrossFit în București cu antrenamente funcționale de înaltă intensitate, Personal Training și Open Gym.",
  "inLanguage": ["ro", "en"],
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://www.unbrokenspirit.ro/?q={search_term_string}",
    "query-input": "required name=search_term_string"
  },
  "publisher": {
    "@type": "SportsActivityLocation",
    "name": "CrossFit Unbroken Spirit",
    "url": "https://www.unbrokenspirit.ro"
  }
};

const WEBPAGE_SCHEMAS = [
  { id: 'hero', name: 'CrossFit Unbroken Spirit București', url: 'https://www.unbrokenspirit.ro/#hero', description: 'Forță. Comunitate. Rezultate. Descoperă cel mai bun CrossFit din București.' },
  { id: 'about', name: 'Despre CrossFit Unbroken Spirit', url: 'https://www.unbrokenspirit.ro/#about', description: 'Antrenorii și facilități CrossFit Unbroken Spirit - Splaiul Unirii 257-259, București.' },
  { id: 'faq', name: 'Întrebări Frecvente CrossFit', url: 'https://www.unbrokenspirit.ro/#faq', description: 'Răspunsuri la toate întrebările despre CrossFit, abonamente și sala Unbroken Spirit.' },
  { id: 'pricing', name: 'Abonamente CrossFit Unbroken Spirit', url: 'https://www.unbrokenspirit.ro/#pricing', description: 'Abonamente CrossFit de la 320 RON/lună. Prima ședință gratuită.' },
  { id: 'schedule', name: 'Orar Clase CrossFit', url: 'https://www.unbrokenspirit.ro/#schedule', description: 'Orarul complet al claselor CrossFit, Open Gym și CrossFit Kids la Unbroken Spirit.' },
  { id: 'contact', name: 'Contact CrossFit Unbroken Spirit', url: 'https://www.unbrokenspirit.ro/#contact', description: 'Contactează CrossFit Unbroken Spirit - Splaiul Unirii 257-259, București.' },
];

// Recurring CrossFit class events (Mon-Fri times)
const WEEKDAY_CLASS_TIMES = ['07:00', '08:00', '12:30', '17:30', '18:30', '19:30'];
const SATURDAY_TIMES = ['10:00'];

function buildEventSchemas() {
  const events = [];
  const baseDate = new Date('2026-04-21'); // next Monday as anchor
  const days = [0,1,2,3,4]; // Mon-Fri
  days.forEach(dayOffset => {
    WEEKDAY_CLASS_TIMES.forEach(time => {
      const d = new Date(baseDate);
      d.setDate(d.getDate() + dayOffset);
      const [h, m] = time.split(':');
      d.setHours(parseInt(h), parseInt(m), 0, 0);
      const end = new Date(d);
      end.setHours(end.getHours() + 1);
      events.push({
        "@type": "Event",
        "name": "Clasă CrossFit - CrossFit Unbroken Spirit",
        "startDate": d.toISOString(),
        "endDate": end.toISOString(),
        "eventStatus": "https://schema.org/EventScheduled",
        "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
        "location": {
          "@type": "Place",
          "name": "CrossFit Unbroken Spirit",
          "address": { "@type": "PostalAddress", "streetAddress": "Splaiul Unirii 257-259", "addressLocality": "București", "addressCountry": "RO" }
        },
        "organizer": { "@type": "SportsActivityLocation", "name": "CrossFit Unbroken Spirit", "url": "https://www.unbrokenspirit.ro" },
        "description": "Clasă de CrossFit ghidată de antrenor, 60 de minute. Adaptată oricărui nivel. Prima clasă gratuită.",
        "isAccessibleForFree": false,
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "RON", "description": "Prima clasă gratuită pentru începători", "url": "https://www.unbrokenspirit.ro" }
      });
    });
  });
  SATURDAY_TIMES.forEach(time => {
    const sat = new Date('2026-04-25');
    const [h, m] = time.split(':');
    sat.setHours(parseInt(h), parseInt(m), 0, 0);
    const end = new Date(sat);
    end.setHours(end.getHours() + 1, 30);
    events.push({
      "@type": "Event",
      "name": "Clasă CrossFit Sâmbătă - CrossFit Unbroken Spirit",
      "startDate": sat.toISOString(),
      "endDate": end.toISOString(),
      "eventStatus": "https://schema.org/EventScheduled",
      "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
      "location": {
        "@type": "Place",
        "name": "CrossFit Unbroken Spirit",
        "address": { "@type": "PostalAddress", "streetAddress": "Splaiul Unirii 257-259", "addressLocality": "București", "addressCountry": "RO" }
      },
      "organizer": { "@type": "SportsActivityLocation", "name": "CrossFit Unbroken Spirit", "url": "https://www.unbrokenspirit.ro" },
      "description": "Clasă de CrossFit de sâmbătă, ghidată de antrenor. Adaptată oricărui nivel.",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "RON", "description": "Prima clasă gratuită pentru începători", "url": "https://www.unbrokenspirit.ro" }
    });
  });
  return { "@context": "https://schema.org", "@graph": events };
}

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

const COACHES_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "CrossFit Unbroken Spirit Coaches",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "item": {
        "@type": "Person",
        "name": "Andrei Vârnav",
        "jobTitle": "CrossFit Coach",
        "worksFor": { "@type": "SportsActivityLocation", "name": "CrossFit Unbroken Spirit" },
        "description": "8 ani în CrossFit. Medaliat național la înot, campion național la handbal, 4 ani Head Judge la OMBC Throwdown, Strength & Conditioning specialist.",
        "knowsAbout": ["CrossFit", "Strength & Conditioning", "Swimming", "Handball"],
        "image": "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69948c0d6b8aa61f49f0a23d/18d3ab544_CrossFit_US-148A.jpg"
      }
    },
    {
      "@type": "ListItem",
      "position": 2,
      "item": {
        "@type": "Person",
        "name": "Dumitru Mîndrescu",
        "jobTitle": "CrossFit Coach",
        "worksFor": { "@type": "SportsActivityLocation", "name": "CrossFit Unbroken Spirit" },
        "description": "7 ani în CrossFit competitiv. Specialist în Weightlifting, Gymnastics și Competition training.",
        "knowsAbout": ["CrossFit", "Weightlifting", "Gymnastics", "Competition Training"],
        "image": "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69948c0d6b8aa61f49f0a23d/9884b0a50_CrossFit_US-138M.jpg"
      }
    },
    {
      "@type": "ListItem",
      "position": 3,
      "item": {
        "@type": "Person",
        "name": "Robert Sukosd",
        "jobTitle": "CrossFit Level 2 Trainer",
        "worksFor": { "@type": "SportsActivityLocation", "name": "CrossFit Unbroken Spirit" },
        "description": "13 ani în CrossFit. CrossFit Level 2 Trainer, The Gymnastics Course Level 1, Movement Specialist.",
        "hasCredential": ["CrossFit Level 2 Trainer", "The Gymnastics Course Level 1"],
        "knowsAbout": ["CrossFit", "Gymnastics", "Movement", "Mobility"],
        "image": "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69948c0d6b8aa61f49f0a23d/02fa5e0e6_CrossFit_US-140R.jpg"
      }
    }
  ]
};

const REVIEWS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "CrossFit Unbroken Spirit",
  "review": [
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Ana Maria Onuta" },
      "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
      "reviewBody": "Super frumoasă sală și dotată!! Foarte curat și Dumitru pregătește niște antrenamente super bune. Recomand această sală!!"
    },
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Alina C." },
      "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
      "reviewBody": "Recomand cu drag! Antrenorii știu cum să te ajute să îți atingi obiectivele și să îți depășești limitele, indiferent de nivelul la care ești. Echipamentele sunt în stare impecabilă, sala este curată și muzica bună."
    },
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Cosmin M." },
      "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
      "reviewBody": "Cea mai nouă sală de CrossFit din București! Echipamente de calitate, antrenori dedicați și o comunitate super primitoare. Recomand cu căldură!"
    },
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Mihai D." },
      "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
      "reviewBody": "Am venit pentru prima dată fără experiență în CrossFit și am fost primit extraordinar. Antrenorii sunt răbdători și profesioniști. Recomand tuturor!"
    },
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Elena P." },
      "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
      "reviewBody": "Sală de top! Comunitate extraordinară, antrenori profesioniști și echipamente de calitate. Cel mai bun loc pentru CrossFit din București!"
    },
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Andrei V." },
      "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
      "reviewBody": "Experiență de 5 stele! Atmosferă fantastică, WOD-uri bine programate și antrenori care chiar îți pasă de progresul tău."
    }
  ]
};

const FAQ_SCHEMA_RO = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "Ce înseamnă CrossFit?", "acceptedAnswer": { "@type": "Answer", "text": "CrossFit este un program de antrenament bazat pe mișcări funcționale, variate constant și realizate la intensitate ridicată. Combină exerciții de forță, cardio și gimnastică pentru a îmbunătăți condiția fizică generală și performanța în activitățile din viața reală." } },
    { "@type": "Question", "name": "Trebuie să fiu în formă înainte de a începe CrossFit?", "acceptedAnswer": { "@type": "Answer", "text": "Nu trebuie să fii în formă înainte de a începe CrossFit — CrossFit este exact procesul prin care ajungi în formă. Membrii CrossFit Unbroken Spirit variază de la sportivi de elită la persoane care fac mișcare pentru prima dată." } },
    { "@type": "Question", "name": "Cât costă un abonament la CrossFit Unbroken Spirit?", "acceptedAnswer": { "@type": "Answer", "text": "Abonamentele la CrossFit Unbroken Spirit încep de la 320 RON/lună pentru 8 clase. Abonamentul de 12 clase costă 400 RON/lună, iar abonamentul nelimitat 450 RON/lună. Există și opțiuni de Personal Training și Open Gym." } },
    { "@type": "Question", "name": "Cât durează o clasă de CrossFit?", "acceptedAnswer": { "@type": "Answer", "text": "O clasă de CrossFit la Unbroken Spirit durează 60 de minute și include instructaj, încălzire ghidată, o sesiune de forță sau tehnică, antrenamentul zilei (WOD) și stretching." } },
    { "@type": "Question", "name": "Este CrossFitul periculos?", "acceptedAnswer": { "@type": "Answer", "text": "CrossFit nu este periculos când este predat corect. La Unbroken Spirit folosim filozofia 'Mecanică, Consistență, apoi Intensitate' — te înveți să te miști corect înainte de a crește viteza sau greutatea." } },
    { "@type": "Question", "name": "Cum pot ajunge la sală? Există parcare?", "acceptedAnswer": { "@type": "Answer", "text": "CrossFit Unbroken Spirit se află la Splaiul Unirii 257-259, București, la 7-8 minute de mers pe jos de stația de metrou Mihai Bravu. Există parcare gratuită inclusă pentru toți membrii." } },
    { "@type": "Question", "name": "Oferiți o clasă de probă gratuită?", "acceptedAnswer": { "@type": "Answer", "text": "Da, CrossFit Unbroken Spirit oferă prima clasă gratuită pentru toți noii membri. Te poți înscrie direct prin formularul de pe site-ul unbrokenspirit.ro." } },
    { "@type": "Question", "name": "De câte ori pe săptămână ar trebui să vin la CrossFit?", "acceptedAnswer": { "@type": "Answer", "text": "Pentru începători, recomandăm 3 antrenamente pe săptămână pentru a permite corpului să se recupereze. Pe măsură ce progresezi, mulți membri aleg 4-5 zile pe săptămână pentru rezultate optime." } },
    { "@type": "Question", "name": "Pot slăbi făcând CrossFit?", "acceptedAnswer": { "@type": "Answer", "text": "Da, CrossFit ajută la slăbire prin antrenamente intense care ard un număr mare de calorii. Combinat cu o alimentație echilibrată și un deficit caloric consistent, CrossFit este eficient pentru pierderea în greutate." } }
  ]
};

const FAQ_SCHEMA_EN = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "What is CrossFit?", "acceptedAnswer": { "@type": "Answer", "text": "CrossFit is a training program based on constantly varied functional movements performed at high intensity. It combines strength, cardio, and gymnastics to improve overall fitness and real-life performance." } },
    { "@type": "Question", "name": "Do I need to be in shape before starting CrossFit?", "acceptedAnswer": { "@type": "Answer", "text": "You do not need to be in shape before starting CrossFit — CrossFit is the process of getting in shape. CrossFit Unbroken Spirit members range from elite athletes to complete beginners." } },
    { "@type": "Question", "name": "How much does a CrossFit Unbroken Spirit membership cost?", "acceptedAnswer": { "@type": "Answer", "text": "CrossFit Unbroken Spirit memberships start from 320 RON/month for 8 classes. The 12-class plan costs 400 RON/month, and the unlimited plan is 450 RON/month. Personal Training and Open Gym options are also available." } },
    { "@type": "Question", "name": "How long are CrossFit classes?", "acceptedAnswer": { "@type": "Answer", "text": "CrossFit classes at Unbroken Spirit last 60 minutes and include a walkthrough, guided warm-up, a strength or technique session, the Workout of the Day (WOD), and a cool-down stretch." } },
    { "@type": "Question", "name": "Is CrossFit dangerous?", "acceptedAnswer": { "@type": "Answer", "text": "CrossFit is not dangerous when taught correctly. At Unbroken Spirit we follow the principle of 'Mechanics, Consistency, then Intensity' — you learn to move correctly before increasing speed or weight." } },
    { "@type": "Question", "name": "How can I get to the gym? Is there parking?", "acceptedAnswer": { "@type": "Answer", "text": "CrossFit Unbroken Spirit is located at Splaiul Unirii 257-259, Bucharest, a 7-8 minute walk from Mihai Bravu metro station. Free parking is included for all members." } },
    { "@type": "Question", "name": "Do you offer a free trial class?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, CrossFit Unbroken Spirit offers a free first class for all new members. You can sign up through the form on unbrokenspirit.ro." } },
    { "@type": "Question", "name": "How many times a week should I do CrossFit?", "acceptedAnswer": { "@type": "Answer", "text": "For beginners, we recommend 3 CrossFit sessions per week to allow recovery. As you progress, many members train 4-5 days per week for optimal results." } },
    { "@type": "Question", "name": "Can I lose weight doing CrossFit?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, CrossFit is effective for weight loss. The high-intensity workouts burn a large number of calories, and combined with a balanced diet and consistent caloric deficit, CrossFit produces measurable fat loss results." } }
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

  // og:locale — language aware
  setOgMeta('og:locale', lang === 'en' ? 'en_US' : 'ro_RO');

  // WebPage schema for current section
  const wpData = WEBPAGE_SCHEMAS.find(w => w.id === sectionId) || WEBPAGE_SCHEMAS[0];
  injectSchema('schema-webpage', {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": wpData.name,
    "url": wpData.url,
    "description": wpData.description,
    "inLanguage": lang === 'en' ? 'en' : 'ro',
    "isPartOf": { "@type": "WebSite", "name": "CrossFit Unbroken Spirit", "url": "https://www.unbrokenspirit.ro" }
  });

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
    // Inject always-present schemas
    injectSchema('schema-local-business', LOCAL_BUSINESS_SCHEMA);
    injectSchema('schema-coaches', COACHES_SCHEMA);
    injectSchema('schema-reviews', REVIEWS_SCHEMA);
    injectSchema('schema-website', WEBSITE_SCHEMA);
    injectSchema('schema-events', buildEventSchemas());

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
      removeSchema('schema-coaches');
      removeSchema('schema-reviews');
      removeSchema('schema-website');
      removeSchema('schema-events');
      removeSchema('schema-webpage');
    };
  }, [language]);

  return null;
}