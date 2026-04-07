import { useEffect } from 'react';
import { useLanguage } from '../LanguageProvider';

const OG_IMAGE = 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69948c0d6b8aa61f49f0a23d/b2dc11465_CrossFit_US-058.jpg';
const SITE_URL = 'https://www.unbrokenspirit.ro';

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
}

export default function SeoMeta() {
  const { language } = useLanguage();

  useEffect(() => {
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

    return () => observers.forEach((o) => o.disconnect());
  }, [language]);

  return null;
}