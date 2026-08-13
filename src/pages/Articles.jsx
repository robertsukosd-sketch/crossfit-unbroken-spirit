import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Newspaper, Search, X } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import LanguageProvider, { useLanguage } from '@/components/LanguageProvider';

const CATEGORY_LABELS = {
  ro: { training: 'Antrenament', nutrition: 'Nutriție', mindset: 'Mindset', events: 'Evenimente', community: 'Comunitate', other: 'Altele' },
  en: { training: 'Training', nutrition: 'Nutrition', mindset: 'Mindset', events: 'Events', community: 'Community', other: 'Other' },
};

function ArticlesContent() {
  const { language, t } = useLanguage();
  const [articles, setArticles] = useState(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    document.title = language === 'ro' ? 'Articole | CrossFit Unbroken Spirit' : 'Articles | CrossFit Unbroken Spirit';
  }, [language]);

  useEffect(() => {
    setArticles(null);
    base44.entities.Article.filter({ status: 'published', language }, '-published_date', 50)
      .then(setArticles)
      .catch(() => setArticles([]));
  }, [language]);

  const labels = CATEGORY_LABELS[language] || CATEGORY_LABELS.ro;
  const formatDate = (d) => d ? new Date(d).toLocaleDateString(language === 'ro' ? 'ro-RO' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : '';

  const q = query.trim().toLowerCase();
  const filtered = q && articles
    ? articles.filter((a) => {
        const haystack = [a.title, a.excerpt, a.category ? labels[a.category] : '', a.author].filter(Boolean).join(' ').toLowerCase();
        return haystack.includes(q);
      })
    : articles;

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div className="absolute left-0 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 translate-x-1/3 rounded-full bg-sky-500/10 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <Link to="/" className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-sky-400 hover:text-sky-300">
            <ArrowLeft className="h-4 w-4" />
            {t('backToHome')}
          </Link>

          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-sky-400 flex items-center gap-2">
            <Newspaper className="h-4 w-4" />
            {t('articles')}
          </p>
          <h1 className="text-4xl font-black leading-tight sm:text-5xl md:text-6xl">{t('articlesTitle')}</h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-gray-300 sm:text-lg">{t('articlesSubtitle')}</p>

          {articles !== null && articles.length > 0 && (
            <div className="mt-8 relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 pointer-events-none" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={language === 'ro' ? 'Caută în articole...' : 'Search articles...'}
                className="w-full rounded-full border border-zinc-700 bg-zinc-900/60 pl-10 pr-9 py-2 text-sm text-white placeholder-zinc-500 outline-none focus:border-sky-400/50 focus:bg-zinc-900 transition-colors"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  aria-label={language === 'ro' ? 'Golește' : 'Clear'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          )}

          {articles === null ? (
            <div className="mt-16 flex justify-center">
              <div className="w-8 h-8 border-4 border-zinc-700 border-t-sky-400 rounded-full animate-spin" />
            </div>
          ) : filtered.length === 0 ? (
            <p className="mt-16 text-center text-gray-500">
              {query ? (language === 'ro' ? 'Niciun articol găsit pentru căutarea ta.' : 'No articles match your search.') : t('articlesEmpty')}
            </p>
          ) : (
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((a, i) => (
                <motion.article
                  key={a.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="group rounded-2xl border border-zinc-800 bg-zinc-900/50 overflow-hidden hover:border-sky-400/40 transition-colors flex flex-col"
                >
                  <Link to={`/articole/${a.slug}`} className="block overflow-hidden aspect-[16/10] bg-zinc-800">
                    {a.cover_image ? (
                      <img src={a.cover_image} alt={a.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
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
                      <h3 className="text-lg font-bold text-white group-hover:text-sky-300 transition-colors leading-snug">{a.title}</h3>
                    </Link>
                    {a.excerpt && <p className="text-gray-400 text-sm mt-3 line-clamp-3 flex-1">{a.excerpt}</p>}
                    <Link to={`/articole/${a.slug}`} className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-sky-400 hover:text-sky-300 transition-colors">
                      {t('readMore')}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default function Articles() {
  return (
    <LanguageProvider>
      <ArticlesContent />
    </LanguageProvider>
  );
}