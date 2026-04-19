import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../LanguageProvider';

export default function InstagramFeedSection() {
  const { language } = useLanguage();
  const sectionRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loaded) {
          setLoaded(true);
          if (!document.querySelector('script[src="https://elfsightcdn.com/platform.js"]')) {
            const script = document.createElement('script');
            script.src = 'https://elfsightcdn.com/platform.js';
            script.async = true;
            document.body.appendChild(script);
          }
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [loaded]);

  return (
    <section ref={sectionRef} className="py-16 bg-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">{language === 'ro' ? 'Urmărește-ne pe Instagram' : 'Follow us on Instagram'}</h2>
          <a
            href="https://www.instagram.com/crossfit.unbroken.spirit"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-400 hover:text-sky-300 text-sm font-semibold transition-colors"
          >
            @crossfit.unbroken.spirit
          </a>
        </div>
        <div className="elfsight-app-b0e50953-eaca-44c2-bdcf-370800c6e9c5" data-elfsight-app-lazy="true"></div>
      </div>
    </section>
  );
}