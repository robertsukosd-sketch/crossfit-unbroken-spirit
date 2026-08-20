// Static article loader.
// Articles live as .md files in ./articles/*.md, each with a JSON metadata
// block in an HTML comment at the top (<!--article-meta ... -->) followed by
// the Markdown body. They are bundled at build time, so no Base44/database
// dependency is needed for articles.

const modules = import.meta.glob('./articles/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

function parseArticle(raw, path) {
  let meta = {};
  let body = raw;
  const match = raw.match(/^<!--article-meta\r?\n([\s\S]*?)\r?\n-->\r?\n?([\s\S]*)$/);
  if (match) {
    try {
      meta = JSON.parse(match[1]);
    } catch (e) {
      meta = {};
    }
    body = match[2];
  }
  const slug = meta.slug || path.split('/').pop().replace(/\.md$/, '');
  return { ...meta, slug, content: body };
}

const _rawEntries = Object.entries(modules).map(([path, raw]) => ({
  path,
  rawType: typeof raw,
  rawLen: typeof raw === 'string' ? raw.length : 0,
  rawHead: typeof raw === 'string' ? raw.slice(0, 40) : String(raw).slice(0, 40),
}));
// eslint-disable-next-line no-console
console.log('[articles] glob modules:', modules && Object.keys(modules).length, JSON.stringify(_rawEntries, null, 2));

export const articles = Object.entries(modules)
  .map(([path, raw]) => parseArticle(raw, path))
  .filter((a) => a.title)
  .sort((a, b) => new Date(b.published_date || 0) - new Date(a.published_date || 0));

// eslint-disable-next-line no-console
console.log('[articles] parsed count:', articles.length, articles.map(a => a.slug));

export function getPublishedArticles(language) {
  if (!language) return articles;
  return articles.filter((a) => a.language === language);
}

export function getArticleBySlug(slug) {
  return articles.find((a) => a.slug === slug) || null;
}