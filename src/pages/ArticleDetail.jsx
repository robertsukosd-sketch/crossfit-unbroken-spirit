import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, User, X } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getArticleBySlug } from '@/content/loadArticles';
import LanguageProvider, { useLanguage } from '@/components/LanguageProvider';

const CATEGORY_LABELS = {
  ro: { training: 'Antrenament', nutrition: 'Nutriție', mindset: 'Mindset', events: 'Evenimente', community: 'Comunitate', other: 'Altele' },
  en: { training: 'Training', nutrition: 'Nutrition', mindset: 'Mindset', events: 'Events', community: 'Community', other: 'Other' },
};

function ArticleDetailContent() {
  const { slug } = useParams();
  const { language, t } = useLanguage();
  const article = useMemo(() => getArticleBySlug(slug), [slug]);
  const [zoomImg, setZoomImg] = useState(null);

  useEffect(() => {
    if (!article) return;
    document.title = `${article.title} | CrossFit Unbroken Spirit`;

    const scripts = [];
    const articleLd = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: article.title,
      description: article.excerpt || undefined,
      image: article.cover_image ? [article.cover_image] : undefined,
      author: { '@type': 'Person', name: article.author || 'CrossFit Unbroken Spirit' },
      publisher: { '@type': 'Organization', name: 'CrossFit Unbroken Spirit' },
      datePublished: article.published_date || undefined,
      mainEntityOfPage: { '@type': 'WebPage', '@id': window.location.href },
    };
    const s1 = document.createElement('script');
    s1.type = 'application/ld+json';
    s1.text = JSON.stringify(articleLd);
    document.head.appendChild(s1);
    scripts.push(s1);

    if (article.faq && article.faq.length > 0) {
      const faqLd = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: article.faq.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: { '@type': 'Answer', text: f.answer },
        })),
      };
      const s2 = document.createElement('script');
      s2.type = 'application/ld+json';
      s2.text = JSON.stringify(faqLd);
      document.head.appendChild(s2);
      scripts.push(s2);
    }

    return () => { scripts.forEach((s) => s.remove()); };
  }, [article]);

  useEffect(() => {
    const lock = zoomImg !== null;
    document.body.style.overflow = lock ? 'hidden' : '';
    document.documentElement.style.overflow = lock ? 'hidden' : '';
    if (!lock) return;
    const onKey = (e) => { if (e.key === 'Escape') setZoomImg(null); };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [zoomImg]);

  if (!article) {
    return (
      <main className="min-h-screen bg-black text-white">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <Link to="/articole" className="inline-flex items-center gap-2 text-sm font-semibold text-sky-400 hover:text-sky-300">
            <ArrowLeft className="h-4 w-4" />
            {t('backToArticles')}
          </Link>
          <p className="mt-10 text-gray-400 text-lg">{t('articleNotFound')}</p>
        </div>
      </main>
    );
  }

  const labels = CATEGORY_LABELS[language] || CATEGORY_LABELS.ro;
  const formatDate = (d) => d ? new Date(d).toLocaleDateString(language === 'ro' ? 'ro-RO' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : '';

  return (
    <main className="min-h-screen bg-black text-white">
      <article className="relative overflow-hidden">
        <div className="absolute left-0 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-600/20 blur-3xl" />

        {/* Hero / cover */}
        <header className="relative z-10 mx-auto max-w-3xl px-6 pt-16 pb-10">
          <Link to="/articole" className="inline-flex items-center gap-2 text-sm font-semibold text-sky-400 hover:text-sky-300">
            <ArrowLeft className="h-4 w-4" />
            {t('backToArticles')}
          </Link>

          <div className="flex flex-wrap items-center gap-3 mt-8 text-xs">
            {article.category && (
              <span className="px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-sky-300 font-semibold">
                {labels[article.category] || article.category}
              </span>
            )}
            <span className="flex items-center gap-1.5 text-zinc-400">
              <Calendar className="w-3.5 h-3.5" />
              {formatDate(article.published_date)}
            </span>
            {article.author && (
              <span className="flex items-center gap-1.5 text-zinc-400">
                <User className="w-3.5 h-3.5" />
                {article.author}
              </span>
            )}
          </div>

          <h1 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-black leading-tight">{article.title}</h1>
          {article.excerpt && <p className="mt-5 text-lg text-gray-300 leading-relaxed">{article.excerpt}</p>}
        </header>

        {article.cover_image && (
          <div className="relative z-10 mx-auto max-w-4xl px-6">
            <div className="rounded-2xl overflow-hidden border border-zinc-800 aspect-[16/9] bg-zinc-900">
              <img src={article.cover_image} alt={article.title} className="w-full h-full object-cover" />
            </div>
          </div>
        )}

        {/* Body */}
        <div className="relative z-10 mx-auto max-w-3xl px-6 py-12">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ node, ...p }) => <h1 className="text-2xl sm:text-3xl font-black text-white mt-10 mb-4" {...p} />,
              h2: ({ node, ...p }) => <h2 className="text-xl sm:text-2xl font-black text-white mt-10 mb-4" {...p} />,
              h3: ({ node, ...p }) => <h3 className="text-lg sm:text-xl font-bold text-white mt-8 mb-3" {...p} />,
              p: ({ node, ...p }) => <p className="text-gray-300 leading-relaxed mb-5" {...p} />,
              ul: ({ node, ...p }) => <ul className="list-disc list-outside pl-5 mb-5 space-y-2 text-gray-300" {...p} />,
              ol: ({ node, ...p }) => <ol className="list-decimal list-outside pl-5 mb-5 space-y-2 text-gray-300" {...p} />,
              li: ({ node, ...p }) => <li className="leading-relaxed" {...p} />,
              strong: ({ node, ...p }) => <strong className="font-bold text-white" {...p} />,
              a: ({ node, ...p }) => <a className="text-sky-400 hover:text-sky-300 underline underline-offset-2" target="_blank" rel="noopener noreferrer" {...p} />,
              img: ({ node, ...p }) => (
                <img
                  className="rounded-xl my-6 w-full cursor-zoom-in transition-transform hover:opacity-90"
                  loading="lazy"
                  onClick={(e) => setZoomImg(e.currentTarget.src)}
                  {...p}
                />
              ),
              blockquote: ({ node, ...p }) => <blockquote className="border-l-4 border-sky-500/50 pl-4 italic text-gray-400 my-6" {...p} />,
              code: ({ node, ...p }) => <code className="bg-zinc-800 rounded px-1.5 py-0.5 text-sm text-sky-300" {...p} />,
              table: ({ node, ...p }) => <table className="w-full my-6 border-collapse text-sm" {...p} />,
              thead: ({ node, ...p }) => <thead className="border-b border-zinc-700" {...p} />,
              th: ({ node, ...p }) => <th className="px-3 py-2 text-left font-bold text-white border border-zinc-700" {...p} />,
              td: ({ node, ...p }) => <td className="px-3 py-2 text-gray-300 border border-zinc-800" {...p} />,
            }}
          >
            {article.content || ''}
          </ReactMarkdown>

          <div className="mt-12 pt-8 border-t border-zinc-800">
            <Link to="/articole" className="inline-flex items-center gap-2 text-sm font-semibold text-sky-400 hover:text-sky-300">
              <ArrowLeft className="h-4 w-4" />
              {t('backToArticles')}
            </Link>
          </div>
        </div>
      </article>

      {zoomImg && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 sm:p-8 cursor-zoom-out"
          onClick={() => setZoomImg(null)}
        >
          <button
            className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-sm flex items-center justify-center text-white z-20 transition-colors"
            onClick={(e) => { e.stopPropagation(); setZoomImg(null); }}
            aria-label={language === 'ro' ? 'Închide imaginea' : 'Close image'}
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={zoomImg}
            alt=""
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            onClick={(e) => { e.stopPropagation(); setZoomImg(null); }}
          />
        </div>
      )}
    </main>
  );
}

export default function ArticleDetail() {
  return (
    <LanguageProvider>
      <ArticleDetailContent />
    </LanguageProvider>
  );
}