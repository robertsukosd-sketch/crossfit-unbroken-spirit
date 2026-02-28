import React, { useState, useEffect } from 'react';
import { X, Settings } from 'lucide-react';
import { useLanguage } from '../LanguageProvider';
import { Button } from '@/components/ui/button';

const translations = {
  ro: {
    title: 'Preferințe Cookie-uri',
    description: 'Utilizăm cookie-uri pentru a îmbunătăți experiența dumneavoastră. Vă rugăm să selectați preferințele dumneavoastră.',
    essential: 'Cookie-uri Esențiale',
    essentialDesc: 'Necesare pentru funcționarea site-ului. Nu pot fi dezactivate.',
    analytics: 'Cookie-uri de Analiză',
    analyticsDesc: 'Ajută-ne să înțelegem cum utilizați site-ul.',
    marketing: 'Cookie-uri de Marketing',
    marketingDesc: 'Utilizate pentru publicități și conținut personalizat.',
    acceptAll: 'Accept Toate',
    rejectAll: 'Respinge Non-Esențiale',
    savePreferences: 'Salvează Preferințe',
    manage: 'Gestionează Preferințe',
    learnMore: 'Află mai multe',
    close: 'Închide',
    essentialDetails: 'Cookie-urile esențiale sunt critice pentru funcționarea de bază a site-ului. Ele permit autentificarea, securitatea sesiunilor și memorarea setărilor dvs. Fără acestea, anumite funcții ale site-ului nu vor funcționa corect.',
    analyticsDetails: 'Cookie-urile de analiză ne ajută să colectăm informații anonime despre modul în care utilizatorii interacționează cu site-ul nostru. Acestea ne permit să analizăm traficul, paginile populare și erorile pentru a îmbunătăți constant performanța și experiența utilizatorului.',
    marketingDetails: 'Cookie-urile de marketing sunt utilizate pentru a urmări comportamentul de navigare și pentru a afișa publicități relevante. Acestea pot fi partajate cu parteneri de advertising pentru a optimiza campaniile și pentru a vă arăta conținut personalizat pe alte site-uri.',
  },
  en: {
    title: 'Cookie Preferences',
    description: 'We use cookies to enhance your experience. Please select your preferences.',
    essential: 'Essential Cookies',
    essentialDesc: 'Required for website functionality. Cannot be disabled.',
    analytics: 'Analytics Cookies',
    analyticsDesc: 'Help us understand how you use the site.',
    marketing: 'Marketing Cookies',
    marketingDesc: 'Used for advertisements and personalized content.',
    acceptAll: 'Accept All',
    rejectAll: 'Reject Non-Essential',
    savePreferences: 'Save Preferences',
    manage: 'Manage Preferences',
    learnMore: 'Learn more',
    close: 'Close',
    essentialDetails: 'Essential cookies are critical for basic website functionality. They enable authentication, session security, and remember your settings. Without them, certain website features will not work properly.',
    analyticsDetails: 'Analytics cookies help us collect anonymous information about how users interact with our website. They allow us to analyze traffic, popular pages, and errors to continuously improve performance and user experience.',
    marketingDetails: 'Marketing cookies are used to track browsing behavior and display relevant advertisements. They may be shared with advertising partners to optimize campaigns and show you personalized content on other websites.',
  },
};

export default function CookieConsent() {
  const { language } = useLanguage();
  const t = translations[language] || translations.en;
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const savedPreferences = localStorage.getItem('cookiePreferences');
    const consentGiven = localStorage.getItem('cookieConsentGiven');

    if (savedPreferences) {
      setPreferences(JSON.parse(savedPreferences));
    }

    if (!consentGiven) {
      setShowBanner(true);
    }
  }, []);

  const handleAcceptAll = () => {
    const allPreferences = {
      essential: true,
      analytics: true,
      marketing: true,
    };
    savePreferences(allPreferences);
  };

  const handleRejectAll = () => {
    const minimalPreferences = {
      essential: true,
      analytics: false,
      marketing: false,
    };
    savePreferences(minimalPreferences);
  };

  const handleSavePreferences = () => {
    savePreferences(preferences);
  };

  const savePreferences = (prefs) => {
    localStorage.setItem('cookiePreferences', JSON.stringify(prefs));
    localStorage.setItem('cookieConsentGiven', 'true');
    localStorage.setItem('cookieConsentDate', new Date().toISOString());
    setShowBanner(false);
    setShowSettings(false);

    // Load analytics if consented
    if (prefs.analytics) {
      loadGoogleAnalytics();
    }
  };

  const loadGoogleAnalytics = () => {
    if (window.gtag) return;
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`;
    document.head.appendChild(script);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function() {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', 'G-XXXXXXXXXX');
  };

  const togglePreference = (key) => {
    if (key === 'essential') return; // Essential can't be disabled
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Cookie Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-zinc-900 border-t border-zinc-800 p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          {!showSettings ? (
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-white font-bold mb-2">{t.title}</h3>
                <p className="text-gray-400 text-sm">{t.description}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowSettings(true)}
                  className="text-blue-400 border-blue-400 hover:bg-blue-400/10"
                >
                  {t.manage}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRejectAll}
                  className="text-gray-400 border-gray-600 hover:bg-gray-800"
                >
                  {t.rejectAll}
                </Button>
                <Button
                  size="sm"
                  onClick={handleAcceptAll}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {t.acceptAll}
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <h3 className="text-white font-bold">{t.title}</h3>

              {/* Cookie Options */}
              <div className="space-y-3">
                {/* Essential */}
                <div className="flex items-start gap-3 p-3 bg-zinc-800/50 rounded-lg">
                  <input
                    type="checkbox"
                    checked={preferences.essential}
                    disabled
                    className="w-4 h-4 mt-1 cursor-not-allowed"
                  />
                  <div className="flex-1">
                    <p className="text-white font-semibold text-sm">{t.essential}</p>
                    <p className="text-gray-400 text-xs">{t.essentialDesc}</p>
                  </div>
                </div>

                {/* Analytics */}
                <div className="flex items-start gap-3 p-3 bg-zinc-800/50 rounded-lg">
                  <input
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={() => togglePreference('analytics')}
                    className="w-4 h-4 mt-1 cursor-pointer"
                  />
                  <div className="flex-1">
                    <p className="text-white font-semibold text-sm">{t.analytics}</p>
                    <p className="text-gray-400 text-xs">{t.analyticsDesc}</p>
                  </div>
                </div>

                {/* Marketing */}
                <div className="flex items-start gap-3 p-3 bg-zinc-800/50 rounded-lg">
                  <input
                    type="checkbox"
                    checked={preferences.marketing}
                    onChange={() => togglePreference('marketing')}
                    className="w-4 h-4 mt-1 cursor-pointer"
                  />
                  <div className="flex-1">
                    <p className="text-white font-semibold text-sm">{t.marketing}</p>
                    <p className="text-gray-400 text-xs">{t.marketingDesc}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowSettings(false)}
                  className="text-gray-400 border-gray-600 hover:bg-gray-800"
                >
                  {t.rejectAll}
                </Button>
                <Button
                  size="sm"
                  onClick={handleSavePreferences}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {t.savePreferences}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Overlay */}
      <div className="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/50 to-transparent pointer-events-none z-35" />
    </>
  );
}