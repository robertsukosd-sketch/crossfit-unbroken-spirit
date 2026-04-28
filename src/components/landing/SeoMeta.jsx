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
  "description": "Cea mai nouă sală de CrossFit din București. Antrenamente de grup, clase de fitness, personal training și open gym. Echipamente Rogue, rower, assault bike, ski erg. Prima clasă gratuită.",
  "url": "https://www.unbrokenspirit.ro",
  "logo": "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69948c0d6b8aa61f49f0a23d/6f20a4dfe_image.png",
  "image": OG_IMAGE,
  "telephone": "+40748838767",
  "amenityFeature": [
    { "@type": "LocationFeatureSpecification", "name": "Echipamente Rogue", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Rowing Machines (Rower)", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Assault Bike (Bike)", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Ski Erg", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Haltere Olimpice", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Gymnastic Rings", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Pull-up Bars", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Vestiare & Dușuri", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Parcare Gratuită", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Antrenamente de Grup", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Personal Training", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Open Gym", "value": true }
  ],
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
  "priceRange": "320-450 RON",
  "currenciesAccepted": "RON",
  "paymentAccepted": "Cash, Card",
  "areaServed": { "@type": "City", "name": "București" },
  "hasMap": "https://www.google.com/maps/search/?api=1&query=CrossFit+Unbroken+Spirit&query_place_id=ChIJmV_f1yr_sUARNEf83Ig3aYM",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5",
    "reviewCount": "22",
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
      "author": { "@type": "Person", "name": "Alexandra Radutu" },
      "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
      "datePublished": "2025-04-01",
      "reviewBody": "CrossFit Unbroken Spirit — hottest CF affiliate box in town! Echipamente noi Rogue, antrenamente cu o structură clară și o progresie vizibilă. Antrenorii sunt implicați și știu exact cum să adapteze exercițiile. Bonus: parcare inclusă și aproape de metroul Mihai Bravu. Una dintre cele mai bune experiențe de CrossFit!"
    },
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Ana Maria Onuta" },
      "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
      "datePublished": "2025-04-01",
      "reviewBody": "Super frumoasă sală și dotată!! Foarte curat și Dumitru pregătește niște antrenamente super bune. Recomand această sală!!"
    },
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Alina C." },
      "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
      "datePublished": "2025-03-28",
      "reviewBody": "Recomand cu drag! Antrenorii știu cum să te ajute să îți atingi obiectivele și să îți depășești limitele, indiferent de nivelul la care ești. Echipamentele sunt în stare impecabilă, sala este curată și muzica bună."
    },
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Cosmin M." },
      "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
      "datePublished": "2025-03-25",
      "reviewBody": "Cea mai nouă sală de CrossFit din București! Echipamente de calitate, antrenori dedicați și o comunitate super primitoare. Recomand cu căldură!"
    },
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Mihai Banica" },
      "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
      "datePublished": "2025-03-20",
      "reviewBody": "Am venit pentru prima dată fără experiență în CrossFit și am fost primit extraordinar. Antrenorii sunt răbdători și profesioniști. Recomand tuturor!"
    },
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Andrei V." },
      "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
      "datePublished": "2025-03-15",
      "reviewBody": "Experiență de 5 stele! Atmosferă fantastică, WOD-uri bine programate și antrenori care chiar îți pasă de progresul tău."
    }
  ]
};

const FAQ_SCHEMA_RO = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "Ce înseamnă CrossFit?", "acceptedAnswer": { "@type": "Answer", "text": "CrossFit este un program de antrenament bazat pe mișcări funcționale, variate constant și realizate la intensitate ridicată. Combină exerciții de forță, cardio și gimnastică pentru a îmbunătăți condiția fizică generală și performanța în activitățile din viața reală." } },
    { "@type": "Question", "name": "Trebuie să fiu în formă înainte de a începe CrossFit?", "acceptedAnswer": { "@type": "Answer", "text": "Nu trebuie să fii în formă înainte de a începe CrossFit. CrossFit este exact procesul prin care ajungi în formă — membrii variază de la sportivi de elită la persoane care fac mișcare pentru prima dată." } },
    { "@type": "Question", "name": "Cât costă un abonament la CrossFit Unbroken Spirit?", "acceptedAnswer": { "@type": "Answer", "text": "Un abonament la CrossFit Unbroken Spirit costă de la 320 RON/lună pentru 8 clase. Abonamentul de 12 clase costă 400 RON/lună, iar cel nelimitat 450 RON/lună. Există și Personal Training și Open Gym." } },
    { "@type": "Question", "name": "Cât durează o clasă de CrossFit?", "acceptedAnswer": { "@type": "Answer", "text": "O clasă de CrossFit durează 60 de minute. Clasa include instructaj, încălzire ghidată, o sesiune de forță sau tehnică, antrenamentul zilei (WOD) și stretching." } },
    { "@type": "Question", "name": "Este CrossFitul periculos?", "acceptedAnswer": { "@type": "Answer", "text": "CrossFit nu este periculos când este predat corect. La CrossFit Unbroken Spirit folosim filozofia 'Mecanică, Consistență, apoi Intensitate' — înveți să te miști corect înainte de a crește viteza sau greutatea." } },
    { "@type": "Question", "name": "Cum pot ajunge la CrossFit Unbroken Spirit? Există parcare?", "acceptedAnswer": { "@type": "Answer", "text": "CrossFit Unbroken Spirit se află la Splaiul Unirii 257-259, București. Există parcare gratuită inclusă. Cea mai apropiată stație de metrou este Mihai Bravu, la 7-8 minute de mers pe jos." } },
    { "@type": "Question", "name": "Oferiți o clasă de probă gratuită?", "acceptedAnswer": { "@type": "Answer", "text": "Da, prima clasă este gratuită la CrossFit Unbroken Spirit pentru toți noii membri. Te poți înscrie direct prin formularul de pe unbrokenspirit.ro — nu ai nevoie de experiență anterioară." } },
    { "@type": "Question", "name": "De câte ori pe săptămână ar trebui să vin la CrossFit?", "acceptedAnswer": { "@type": "Answer", "text": "Începătorii ar trebui să vină la CrossFit de 3 ori pe săptămână pentru a permite corpului să se recupereze. Pe măsură ce progresezi, mulți membri aleg 4-5 zile pe săptămână pentru rezultate optime." } },
    { "@type": "Question", "name": "Pot slăbi făcând CrossFit?", "acceptedAnswer": { "@type": "Answer", "text": "Da, CrossFit te ajută să slăbești. Antrenamentele intense ard un număr mare de calorii, iar combinate cu o alimentație echilibrată și un deficit caloric consistent, CrossFit este eficient pentru pierderea în greutate." } },
    { "@type": "Question", "name": "Este CrossFit potrivit pentru începători?", "acceptedAnswer": { "@type": "Answer", "text": "Da, CrossFit este potrivit pentru începători. Fiecare mișcare poate fi adaptată (scalată) la nivelul tău, iar antrenorii te ghidează pas cu pas. La CrossFit Unbroken Spirit, prima clasă este gratuită tocmai pentru a-ți permite să testezi fără niciun angajament." } },
    { "@type": "Question", "name": "Cum pot începe CrossFit la București?", "acceptedAnswer": { "@type": "Answer", "text": "Ca să începi CrossFit în București, rezervă o clasă gratuită la CrossFit Unbroken Spirit pe unbrokenspirit.ro. Sala se află la Splaiul Unirii 257-259, lângă metroul Mihai Bravu, cu parcare gratuită inclusă." } },
    { "@type": "Question", "name": "Ce echipamente are sala CrossFit Unbroken Spirit?", "acceptedAnswer": { "@type": "Answer", "text": "CrossFit Unbroken Spirit este dotată complet cu echipamente Rogue: haltere olimpice, kettlebells, rowing machines (rower), assault bike, ski erg, inele de gimnastică, bare de tracțiuni și platforme de haltere. Este una dintre cele mai bine dotate săli CrossFit din București." } },
    { "@type": "Question", "name": "Ce este Hyrox și pot să mă pregătesc pentru Hyrox la Unbroken Spirit?", "acceptedAnswer": { "@type": "Answer", "text": "Hyrox este o competiție de fitness funcțional care combină alergarea cu 8 stații de lucru: rowing, ski erg, assault bike, sled push/pull și altele. La CrossFit Unbroken Spirit avem rower, assault bike și ski erg, deci te poți pregăti excelent pentru Hyrox în antrenamentele noastre de condiționare." } },
    { "@type": "Question", "name": "Există antrenamente de grup la CrossFit Unbroken Spirit?", "acceptedAnswer": { "@type": "Answer", "text": "Da, toate clasele CrossFit sunt antrenamente de grup ghidate de antrenor. Fiecare clasă durează 60 de minute și se desfășoară în grupe mici, ceea ce garantează atenție individuală și o atmosferă de echipă motivantă. Există clase dimineața, la prânz și seara, de luni până sâmbătă." } },
    { "@type": "Question", "name": "Este CrossFit Unbroken Spirit o sală de fitness sau o sală CrossFit?", "acceptedAnswer": { "@type": "Answer", "text": "CrossFit Unbroken Spirit este o sală de fitness specializată în CrossFit, cu antrenamente de grup ghidate de antrenori certificați. Spre deosebire de o sală de fitness clasică, oferim programare zilnică, coaching inclus în abonament, echipamente profesionale (Rogue, rower, bike, ski erg) și o comunitate puternică." } },
    { "@type": "Question", "name": "Pot face rower, bike sau ski la CrossFit Unbroken Spirit?", "acceptedAnswer": { "@type": "Answer", "text": "Da. CrossFit Unbroken Spirit este dotată cu rowing machines (rower), assault bike și ski erg, care sunt folosite în antrenamentele de condiționare și WOD-uri. Aceste echipamente sunt disponibile atât în clasele de grup, cât și în sesiunile de Open Gym." } }
  ]
};

const FAQ_SCHEMA_EN = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "What is CrossFit?", "acceptedAnswer": { "@type": "Answer", "text": "CrossFit is a training program based on constantly varied functional movements performed at high intensity. It combines strength, cardio, and gymnastics to improve overall fitness and real-life performance." } },
    { "@type": "Question", "name": "Do I need to be in shape before starting CrossFit?", "acceptedAnswer": { "@type": "Answer", "text": "No, you do not need to be in shape before starting CrossFit. CrossFit is the process of getting in shape — members at CrossFit Unbroken Spirit range from elite athletes to complete beginners." } },
    { "@type": "Question", "name": "How much does a CrossFit Unbroken Spirit membership cost?", "acceptedAnswer": { "@type": "Answer", "text": "A CrossFit Unbroken Spirit membership starts from 320 RON/month for 8 classes. The 12-class plan costs 400 RON/month and the unlimited plan is 450 RON/month. Personal Training and Open Gym are also available." } },
    { "@type": "Question", "name": "How long are CrossFit classes?", "acceptedAnswer": { "@type": "Answer", "text": "CrossFit classes at Unbroken Spirit last 60 minutes. Each class includes a walkthrough, guided warm-up, a strength or technique session, the Workout of the Day (WOD), and a cool-down stretch." } },
    { "@type": "Question", "name": "Is CrossFit dangerous?", "acceptedAnswer": { "@type": "Answer", "text": "CrossFit is not dangerous when taught correctly. At CrossFit Unbroken Spirit we follow the principle of 'Mechanics, Consistency, then Intensity' — you learn to move correctly before increasing speed or weight." } },
    { "@type": "Question", "name": "How can I get to CrossFit Unbroken Spirit? Is there parking?", "acceptedAnswer": { "@type": "Answer", "text": "CrossFit Unbroken Spirit is located at Splaiul Unirii 257-259, Bucharest. Free parking is included. The nearest metro station is Mihai Bravu, a 7-8 minute walk away." } },
    { "@type": "Question", "name": "Do you offer a free trial class?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, the first class is free at CrossFit Unbroken Spirit for all new members. You can sign up through the form on unbrokenspirit.ro — no prior experience required." } },
    { "@type": "Question", "name": "How many times a week should I do CrossFit?", "acceptedAnswer": { "@type": "Answer", "text": "Beginners should do CrossFit 3 times a week to allow the body to recover. As you progress, many members train 4-5 days per week for optimal results." } },
    { "@type": "Question", "name": "Can I lose weight doing CrossFit?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, CrossFit helps with weight loss. The high-intensity workouts burn a large number of calories, and combined with a balanced diet and consistent caloric deficit, CrossFit produces measurable fat loss results." } },
    { "@type": "Question", "name": "Is CrossFit suitable for beginners?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, CrossFit is suitable for beginners. Every movement can be scaled to your level and coaches guide you step by step. At CrossFit Unbroken Spirit, the first class is free so you can try it with no commitment." } },
    { "@type": "Question", "name": "How can I start CrossFit in Bucharest?", "acceptedAnswer": { "@type": "Answer", "text": "To start CrossFit in Bucharest, book a free class at CrossFit Unbroken Spirit at unbrokenspirit.ro. The gym is at Splaiul Unirii 257-259, near Mihai Bravu metro station, with free parking included." } }
  ]
};

const HOWTO_SCHEMA_RO = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Cum să începi CrossFit la CrossFit Unbroken Spirit București",
  "description": "Ghid pas cu pas pentru a începe CrossFit la CrossFit Unbroken Spirit. Prima clasă este gratuită și nu ai nevoie de experiență anterioară.",
  "totalTime": "PT30M",
  "estimatedCost": { "@type": "MonetaryAmount", "currency": "RON", "value": "0" },
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Rezervă prima ta clasă gratuită",
      "text": "Completează formularul de pe unbrokenspirit.ro pentru a-ți rezerva prima clasă CrossFit gratuită. Nu ai nevoie de experiență anterioară — clasa este adaptată oricărui nivel.",
      "url": "https://www.unbrokenspirit.ro"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Ajungi la sală",
      "text": "Sala se află la Splaiul Unirii 257-259, București, la 7-8 minute de mers pe jos de metroul Mihai Bravu. Există parcare gratuită. Îmbracă-te confortabil și adu o sticlă cu apă.",
      "url": "https://www.unbrokenspirit.ro/#about"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Participă la clasă cu antrenorul",
      "text": "Antrenorul te va ghida prin toate mișcările, adaptate la nivelul tău. Clasa durează 60 de minute și include încălzire, forță și WOD (antrenamentul zilei).",
      "url": "https://www.unbrokenspirit.ro/#schedule"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Alege un abonament și descarcă ThunderWOD",
      "text": "Dacă ți-a plăcut experiența, alege un abonament de la 320 RON/lună și descarcă aplicația ThunderWOD pentru rezervări și urmărirea progresului.",
      "url": "https://www.unbrokenspirit.ro/#pricing"
    }
  ]
};

const HOWTO_SCHEMA_EN = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Start CrossFit at CrossFit Unbroken Spirit Bucharest",
  "description": "Step-by-step guide to starting CrossFit at CrossFit Unbroken Spirit. Your first class is free and no prior experience is needed.",
  "totalTime": "PT30M",
  "estimatedCost": { "@type": "MonetaryAmount", "currency": "RON", "value": "0" },
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Book your free first class",
      "text": "Fill in the form on unbrokenspirit.ro to reserve your free CrossFit class. No prior experience is required — the class is adapted to any level.",
      "url": "https://www.unbrokenspirit.ro"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Get to the gym",
      "text": "The gym is at Splaiul Unirii 257-259, Bucharest, a 7-8 minute walk from Mihai Bravu metro station. Free parking available. Wear comfortable workout clothes and bring a water bottle.",
      "url": "https://www.unbrokenspirit.ro/#about"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Train with a coach",
      "text": "Your coach will guide you through all movements, scaled to your level. The class lasts 60 minutes and includes a warm-up, strength work, and the WOD (Workout of the Day).",
      "url": "https://www.unbrokenspirit.ro/#schedule"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Choose a membership and download ThunderWOD",
      "text": "If you loved the experience, choose a membership starting from 320 RON/month and download the ThunderWOD app to book classes and track your progress.",
      "url": "https://www.unbrokenspirit.ro/#pricing"
    }
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

const SERVICES_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Servicii CrossFit Unbroken Spirit București",
  "description": "Servicii și programe disponibile la CrossFit Unbroken Spirit, sală de fitness și CrossFit în București.",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "item": { "@type": "Service", "name": "Clase CrossFit de Grup", "description": "Antrenamente de grup ghidate de antrenor certificat, 60 de minute, pentru toate nivelurile. WOD zilnic variat, incluzând gimnastică, haltere și condiționare.", "provider": { "@type": "SportsActivityLocation", "name": "CrossFit Unbroken Spirit" } } },
    { "@type": "ListItem", "position": 2, "item": { "@type": "Service", "name": "Antrenamente de Condiționare (Rower, Bike, Ski)", "description": "Sesiuni de condiționare cardiovasculară folosind rowing machines, assault bike și ski erg. Ideale pentru pregătire Hyrox și ardere de calorii.", "provider": { "@type": "SportsActivityLocation", "name": "CrossFit Unbroken Spirit" } } },
    { "@type": "ListItem", "position": 3, "item": { "@type": "Service", "name": "Personal Training", "description": "Antrenament 1-la-1 personalizat cu antrenor certificat. Adaptat obiectivelor tale: slăbit, forță, condiționare sau pregătire competițională.", "provider": { "@type": "SportsActivityLocation", "name": "CrossFit Unbroken Spirit" } } },
    { "@type": "ListItem", "position": 4, "item": { "@type": "Service", "name": "Open Gym", "description": "Acces liber la toate echipamentele sălii: haltere Rogue, rower, assault bike, ski erg, inele, bare de tracțiuni. Ideal pentru antrenamente independente.", "provider": { "@type": "SportsActivityLocation", "name": "CrossFit Unbroken Spirit" } } },
    { "@type": "ListItem", "position": 5, "item": { "@type": "Service", "name": "Haltere Olimpice (Weightlifting)", "description": "Antrenamente de halterofilie olimpică pentru dezvoltarea forței și puterii explozive. Tehnici de smuls și aruncat cu haltera.", "provider": { "@type": "SportsActivityLocation", "name": "CrossFit Unbroken Spirit" } } }
  ]
};

const SPEAKABLE_SCHEMA_RO = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "CrossFit Unbroken Spirit București",
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": ["h1", "h2", ".speakable"]
  },
  "url": "https://www.unbrokenspirit.ro"
};

const SECTION_META = {
  ro: {
    hero: {
      title: 'CrossFit București | Sală de Fitness Dotată - CrossFit Unbroken Spirit',
      description: 'CrossFit Unbroken Spirit — cea mai nouă sală CrossFit din București. Antrenamente de grup, clase de fitness, rower, bike, ski erg, echipamente Rogue. Prima clasă gratuită!',
    },
    about: {
      title: 'Sală CrossFit & Fitness București | Antrenori Certificați - Unbroken Spirit',
      description: 'Sală de fitness CrossFit în București dotată cu echipamente Rogue, rower, assault bike, ski erg. Antrenori certificați, vestiare, parcare gratuită. Splaiul Unirii 257-259.',
    },
    starthere: {
      title: 'Ce este CrossFit? Ghid pentru Începători | Sală Fitness București - Unbroken Spirit',
      description: 'Vrei să începi CrossFit în București? Ghidul nostru complet explică antrenamentele de grup, clasele de fitness, echipamentele și de ce prima clasă la Unbroken Spirit este gratuită.',
    },
    programs: {
      title: 'Antrenamente de Grup & Clase de Fitness București | Unbroken Spirit',
      description: 'Clase de fitness și antrenamente de grup la CrossFit Unbroken Spirit: CrossFit, haltere, condiționare (rower, bike, ski), Open Gym și Personal Training. Toate nivelurile binevenite.',
    },
    faq: {
      title: 'Întrebări CrossFit București: Echipamente, Clase, Prețuri | Unbroken Spirit',
      description: 'Ce echipamente are sala? Ce este Hyrox? Cât costă? Răspunsuri la toate întrebările despre sală de CrossFit București, antrenamente de grup și prima clasă gratuită.',
    },
    pricing: {
      title: 'Prețuri Sală Fitness & CrossFit București | Unbroken Spirit - de la 320 RON/lună',
      description: 'Abonamente CrossFit și clase de fitness în București de la 320 RON/lună. Open Gym, Personal Training și prima ședință gratuită. Cea mai nouă sală CrossFit dotată din București.',
    },
    schedule: {
      title: 'Orar Clase CrossFit & Antrenamente de Grup București | Unbroken Spirit',
      description: 'Orarul claselor de fitness și antrenamentelor de grup la CrossFit Unbroken Spirit București. Luni-Vineri 07:00-19:30, Sâmbătă 10:00. Rezervă prin ThunderWOD.',
    },
    contact: {
      title: 'Contact Sală CrossFit & Fitness București | Unbroken Spirit - Splaiul Unirii 257-259',
      description: 'Contactează CrossFit Unbroken Spirit, sală de fitness în București: Splaiul Unirii 257-259, lângă metroul Mihai Bravu. Luni-Vineri 6:00-21:00, Sâmbătă 9:00-13:00.',
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

  // FAQ Schema — always present for RO (primary language); for EN only when FAQ section visible
  if (lang === 'en') {
    if (sectionId === 'faq') {
      injectSchema('schema-faq', FAQ_SCHEMA_EN);
    } else {
      removeSchema('schema-faq');
    }
  }
  // RO FAQ is already injected always in useEffect — no need to remove/re-inject per section
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
    injectSchema('schema-howto', language === 'en' ? HOWTO_SCHEMA_EN : HOWTO_SCHEMA_RO);
    injectSchema('schema-services', SERVICES_SCHEMA);
    // FAQ always present for Romanian (primary language) — helps AI Overviews
    if (language !== 'en') {
      injectSchema('schema-faq', FAQ_SCHEMA_RO);
    }
    // Speakable for Romanian — helps Google Assistant / AI read key content
    if (language !== 'en') {
      injectSchema('schema-speakable', SPEAKABLE_SCHEMA_RO);
    }

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
      removeSchema('schema-howto');
      removeSchema('schema-services');
      removeSchema('schema-speakable');
    };
  }, [language]);

  return null;
}