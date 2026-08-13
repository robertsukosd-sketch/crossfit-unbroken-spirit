import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Newspaper } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useLanguage } from '../LanguageProvider';

const CATEGORY_LABELS = {
  ro: { training: 'Antrenament', nutrition: 'Nutriție', mindset: 'Mindset', events: 'Evenimente', community: 'Comunitate', other: 'Altele' },
  en: { training: 'Training', nutrition: 'Nutrition', mindset: 'Mindset', events: 'Events', community: 'Community', other: 'Other' },
};

export default function ArticlesPreview() {
  const { language, t } = useLanguage();
  const [articles, setArticles] = useState(null);

  useEffect(() => {
    setArticles(null);
    base44.entities.Article.filter({ status: 'published', language }, '-published_date', 3)
      .then(setArticles)
      .catch(() => setArticles([]));
  }, [language]);

  const labels = CATEGORY_LABELS[language] || CATEGORY_LABELS.ro;
  const formatDate = (d) => d ? new Date(d).toLocaleDateString(language === 'ro' ? 'ro-RO' : 'en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '';

  return (
    <section id="articles" className="py-24 bg-zinc-950 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/2" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div>
            <span className="text-sky-400 font-semibold tracking-wider uppercase text-sm flex items-center gap-2">
              <Newspaper className="w-4 h-4" />
              {t('articles')}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mt-3 leading-tight">
              {t('articlesTitle')}
            </h2>
            <p className="text-gray-400 text-base sm:text-lg max-w-2xl mt-4">
              {t('articlesSubtitle')}
            </p>
          </div>
          <Link
            to="/articole"
            className="hidden sm:inline-flex items-center gap-2 text-sm font-bold text-sky-400 hover:text-sky-300 transition-colors whitespace-nowrap"
          >
            {t('viewAllArticles')}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {articles === null ? (
          <div className="flex justify-center py-16">
            <div className="w-8 h-8 border-4 border-zinc-700 border-t-sky-400 rounded-full animate-spin" />
          </div>
        ) : articles.length === 0 ? (
          <p className="text-center text-gray-500 py-16">{t('articlesEmpty')}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((a, i) => (
              <motion.article
                key={a.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group rounded-2xl border border-zinc-800 bg-zinc-900/50 overflow-hidden hover:border-sky-400/40 transition-colors flex flex-col"
              >
                <Link to={`/articole/${a.slug}`} className="block overflow-hidden aspect-[16/10] bg-zinc-800">
                  {a.cover_image ? (
                    <img
                      src={a.cover_image}
                      alt={a.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-600">
                      <Newspaper className="w-10 h-10" />
                    </div>
                  )}
                </Link>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-3 text-xs">
                    {a.category && (
                      <span className="px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-sky-300 font-semibold">
                        {labels[a.category] || a.category}
                      </span>
                    )}
                    <span className="text-zinc-500">{formatDate(a.published_date)}</span>
                  </div>
                  <Link to={`/articole/${a.slug}`}>
                    <h3 className="text-lg font-bold text-white group-hover:text-sky-300 transition-colors leading-snug">
                      {a.title}
                    </h3>
                  </Link>
                  {a.excerpt && (
                    <p className="text-gray-400 text-sm mt-3 line-clamp-3 flex-1">{a.excerpt}</p>
                  )}
                  <Link
                    to={`/articole/${a.slug}`}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-sky-400 hover:text-sky-300 transition-colors"
                  >
                    {t('readMore')}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        <div className="sm:hidden mt-8 text-center">
          <Link
            to="/articole"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-sky-400/40 text-sky-400 bg-sky-400/10 hover:bg-sky-400/20 font-bold text-sm transition-colors"
          >
            {t('viewAllArticles')}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}