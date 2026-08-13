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

export const articles = Object.entries(modules)
  .map(([path, raw]) => parseArticle(raw, path))
  .filter((a) => a.title)
  .sort((a, b) => new Date(b.published_date || 0) - new Date(a.published_date || 0));

export function getPublishedArticles(language) {
  if (!language) return articles;
  return articles.filter((a) => a.language === language);
}

export function getArticleBySlug(slug) {
  return articles.find((a) => a.slug === slug) || null;
}