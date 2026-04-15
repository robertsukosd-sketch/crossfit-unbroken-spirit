import { useEffect } from 'react';

export default function InstagramFeedSection() {
  useEffect(() => {
    if (document.querySelector('script[src="https://elfsightcdn.com/platform.js"]')) return;
    const script = document.createElement('script');
    script.src = 'https://elfsightcdn.com/platform.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <section className="py-16 bg-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">Urmărește-ne pe Instagram</h2>
          <a
            href="https://www.instagram.com/crossfitunbrokenspirit"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-400 hover:text-sky-300 text-sm font-semibold transition-colors"
          >
            @crossfitunbrokenspirit
          </a>
        </div>
        <div className="elfsight-app-b0e50953-eaca-44c2-bdcf-370800c6e9c5" data-elfsight-app-lazy="true"></div>
      </div>
    </section>
  );
}