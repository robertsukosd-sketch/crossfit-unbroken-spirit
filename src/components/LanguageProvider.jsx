import React, { createContext, useState, useEffect } from 'react';

const LanguageContext = createContext(null);

export const useLanguage = () => {
  const context = React.useContext(LanguageContext);
  if (!context) {
    // Return default context if not wrapped
    return {
      language: 'ro',
      changeLanguage: () => {},
      t: (key) => translations['ro'][key] || key
    };
  }
  return context;
};

export const translations = {
  ro: {
    home: "Acasă",
    programs: "Programe",
    pricing: "Prețuri",
    schedule: "Orar",
    contact: "Contact",
    freeTrial: "O Ședință Gratuită",
    heroTitle: "Antrenamente de Înaltă Intensitate",
    heroSubtitle: "Construiește putere, rezistență și încredere",
    heroCTA: "Alătură-te Comunității",
    programsTitle: "Programele Noastre",
    programsSubtitle: "Alegem cel mai potrivit program pentru tine",
    crossfitTitle: "CrossFit",
    crossfitDesc: "Antrenamente funcționale de înaltă intensitate pentru forță și rezistență",
    kidsTitle: "CrossFit Kids",
    kidsDesc: "Programe divertisante și sigure pentru copii de la 6 ani",
    openGymTitle: "Open Gym",
    openGymDesc: "Acces la echipamente pentru antrenament individual",
    pricingTitle: "Prețuri",
    pricingSubtitle: "Alege abonamentul potrivit pentru tine",
    monthlyPass: "Abonament Lunar",
    monthlyClasses: "Clase pe lună",
    unlimitedClasses: "Clase nelimitate",
    scheduleTitle: "Orarul Claselor",
    scheduleSubtitle: "Găsește ora potrivită pentru antrenamentul tău. Clase disponibile de dimineața până seara.",
    closed: "Închis",
    noClasses: "Nu avem clase programate în această zi",
    spots: "locuri",
    contactTitle: "Hai să Vorbim",
    contactSubtitle: "Ai întrebări? Vrei să încerci o clasă gratuită? Scrie-ne și te contactăm în cel mai scurt timp.",
    address: "Adresă",
    phone: "Telefon",
    email: "Email",
    schedule_label: "Program",
    fullName: "Nume Complet",
    fullNamePlaceholder: "Ion Popescu",
    emailPlaceholder: "ion@email.com",
    phonePlaceholder: "+40 722 123 456",
    message: "Mesaj",
    messagePlaceholder: "Cu ce te putem ajuta?",
    sendMessage: "Trimite Mesajul",
    sending: "Se trimite..",
    thank: "Mulțumim!",
    thankDesc: "Am primit mesajul tău. Te vom contacta în curând.",
    sendAnother: "Trimite Alt Mesaj",
    follow: "Urmărește-ne",
    location: "Splaiul Unirii 257-259, Sector 3, București",
    phone1: "+40 748 838 767",
    phone2: "+40 740 269 769",
    email_contact: "contact@crossfit.ro",
    hours: "L-V: 07:00 - 20:30",
    hoursSaturday: "S: 09:00 - 11:30",
    hoursSunday: "D: Închis",
    quickLinks: "Link-uri Rapide",
    footerContact: "Contact",
    terms: "Termeni și Condiții",
    privacy: "Politica de Confidențialitate",
    copyright: "Toate drepturile rezervate.",
    tagline: "Comunitatea ta de fitness. Antrenamente funcționale de înaltă intensitate pentru rezultate reale.",
    aboutTitle: "De Cine Suntem",
    aboutSubtitle: "Pasionați de fitness și comunitate",
  },
  en: {
    home: "Home",
    programs: "Programs",
    pricing: "Pricing",
    schedule: "Schedule",
    contact: "Contact",
    freeTrial: "Free Session",
    heroTitle: "High-Intensity Workouts",
    heroSubtitle: "Build strength, endurance and confidence",
    heroCTA: "Join Our Community",
    programsTitle: "Our Programs",
    programsSubtitle: "We choose the program that suits you best",
    crossfitTitle: "CrossFit",
    crossfitDesc: "High-intensity functional workouts for strength and endurance",
    kidsTitle: "CrossFit Kids",
    kidsDesc: "Fun and safe programs for kids from 6 years old",
    openGymTitle: "Open Gym",
    openGymDesc: "Access to equipment for individual training",
    pricingTitle: "Pricing",
    pricingSubtitle: "Choose the plan that suits you",
    monthlyPass: "Monthly Pass",
    monthlyClasses: "Classes per month",
    unlimitedClasses: "Unlimited classes",
    scheduleTitle: "Class Schedule",
    scheduleSubtitle: "Find the right time for your workout. Classes available from morning to evening.",
    closed: "Closed",
    noClasses: "We have no classes scheduled for this day",
    spots: "spots",
    contactTitle: "Let's Talk",
    contactSubtitle: "Have questions? Want to try a free class? Write to us and we'll contact you as soon as possible.",
    address: "Address",
    phone: "Phone",
    email: "Email",
    schedule_label: "Schedule",
    fullName: "Full Name",
    fullNamePlaceholder: "John Doe",
    emailPlaceholder: "john@email.com",
    phonePlaceholder: "+40 722 123 456",
    message: "Message",
    messagePlaceholder: "How can we help?",
    sendMessage: "Send Message",
    sending: "Sending...",
    thank: "Thank You!",
    thankDesc: "We received your message. We will contact you soon.",
    sendAnother: "Send Another Message",
    follow: "Follow Us",
    location: "Splaiul Unirii 257-259, Sector 3, București",
    phone1: "+40 748 838 767",
    phone2: "+40 740 269 769",
    email_contact: "contact@crossfit.ro",
    hours: "Mon-Fri: 07:00 - 20:30",
    hoursSaturday: "Sat: 09:00 - 11:30",
    hoursSunday: "Sun: Closed",
    quickLinks: "Quick Links",
    footerContact: "Contact",
    terms: "Terms & Conditions",
    privacy: "Privacy Policy",
    copyright: "All rights reserved.",
    tagline: "Your fitness community. High-intensity functional training for real results.",
    aboutTitle: "Who We Are",
    aboutSubtitle: "Passionate about fitness and community",
  }
};

export default function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('ro');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('appLanguage') || 'ro';
    setLanguage(savedLanguage);
    setIsLoaded(true);
  }, []);

  const changeLanguage = (lang) => {
    localStorage.setItem('appLanguage', lang);
    setLanguage(lang);
  };

  const t = (key) => {
    return translations[language][key] || translations['ro'][key] || key;
  };

  if (!isLoaded) {
    return (
      <LanguageContext.Provider value={{ language: 'ro', changeLanguage, t }}>
        {children}
      </LanguageContext.Provider>
    );
  }

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}