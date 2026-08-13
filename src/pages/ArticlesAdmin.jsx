import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Plus, Pencil, X, Save, Upload, Star, Download, Copy, FileText } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { articles as staticArticles } from '@/content/loadArticles';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const CATEGORIES = [
  { value: 'training', label: 'Antrenament' },
  { value: 'nutrition', label: 'Nutriție' },
  { value: 'mindset', label: 'Mindset' },
  { value: 'events', label: 'Evenimente' },
  { value: 'community', label: 'Comunitate' },
  { value: 'other', label: 'Altele' },
];

const slugify = (s) =>
  s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-').replace(/-+/g, '-');

const emptyForm = {
  title: '', slug: '', excerpt: '', content: '', cover_image: '',
  category: 'other', author: '', language: 'ro', status: 'draft',
  published_date: new Date().toISOString().slice(0, 10), faq: [],
};

function buildMarkdown(form) {
  const meta = {
    title: form.title,
    slug: slugify(form.slug),
    excerpt: form.excerpt,
    category: form.category,
    author: form.author,
    language: form.language,
    published_date: form.published_date,
    cover_image: form.cover_image,
    faq: form.faq.filter((f) => f.question && f.answer),
  };
  return `<!--article-meta\n${JSON.stringify(meta, null, 2)}\n-->\n${form.content}`;
}

function downloadFile(filename, content) {
  const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export default function ArticlesAdmin() {
  const { toast } = useToast();
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const articles = useMemo(() => staticArticles, []);

  const startNew = () => { setForm({ ...emptyForm, published_date: new Date().toISOString().slice(0, 10) }); setEditing('new'); };
  const startEdit = (a) => {
    setForm({
      ...emptyForm,
      title: a.title || '', slug: a.slug || '', excerpt: a.excerpt || '',
      content: a.content || '', cover_image: a.cover_image || '',
      category: a.category || 'other', author: a.author || '',
      language: a.language || 'ro', status: a.status || 'draft',
      published_date: a.published_date || new Date().toISOString().slice(0, 10),
      faq: Array.isArray(a.faq) ? a.faq : [],
    });
    setEditing(a);
  };
  const cancel = () => { setEditing(null); };

  const set = (field, val) => setForm((f) => ({ ...f, [field]: val }));

  const generate = () => {
    if (!form.title || !form.slug) {
      toast({ title: 'Titlul și slug-ul sunt obligatorii', variant: 'destructive' });
      return;
    }
    const slug = slugify(form.slug);
    const md = buildMarkdown(form);
    downloadFile(`${slug}.md`, md);
    toast({ title: 'Fișier generat', description: `${slug}.md — plasează-l în src/content/articles/` });
  };

  const copyToClipboard = async () => {
    if (!form.title || !form.slug) {
      toast({ title: 'Titlul și slug-ul sunt obligatorii', variant: 'destructive' });
      return;
    }
    const slug = slugify(form.slug);
    const md = buildMarkdown(form);
    try {
      await navigator.clipboard.writeText(md);
      toast({ title: 'Copiat', description: `${slug}.md — lipește într-un fișier în src/content/articles/` });
    } catch {
      toast({ title: 'Nu s-a putut copia', variant: 'destructive' });
    }
  };

  const uploadCover = async (file) => {
    if (!file) return;
    try {
      const res = await base44.integrations.Core.UploadFile({ file });
      if (res?.file_url) set('cover_image', res.file_url);
      toast({ title: 'Imagine încărcată' });
    } catch (e) {
      toast({ title: 'Eroare upload', description: e.message, variant: 'destructive' });
    }
  };

  const setFaq = (i, field, val) =>
    setForm((f) => ({ ...f, faq: f.faq.map((item, idx) => (idx === i ? { ...item, [field]: val } : item)) }));
  const addFaq = () => setForm((f) => ({ ...f, faq: [...f.faq, { question: '', answer: '' }] }));
  const removeFaq = (i) => setForm((f) => ({ ...f, faq: f.faq.filter((_, idx) => idx !== i) }));

  return (
    <div className="min-h-screen bg-black px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <Link to="/" className="text-sm font-semibold text-sky-400 hover:text-sky-300">← Înapoi la site</Link>
          <div className="mt-3 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            <div>
              <h1 className="text-3xl font-black sm:text-5xl">Articole — Generator</h1>
              <p className="mt-1 text-zinc-400 text-sm">Creează articole ca fișiere Markdown statice.</p>
            </div>
            {!editing && (
              <Button onClick={startNew} className="self-start sm:self-auto">
                <Plus className="w-4 h-4" /> Articol nou
              </Button>
            )}
          </div>
        </div>

        {!editing && (
          <div className="mb-6 rounded-2xl border border-sky-500/30 bg-sky-500/5 p-4 text-sm text-sky-200">
            <p className="font-bold mb-1">Cum funcționează</p>
            <p>Completează formularul → apasă „Generează .md" → se descarcă un fișier. Plasează-l în <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-sky-300">src/content/articles/</code> și publică — articolul apare automat pe site la următorul build.</p>
          </div>
        )}

        {editing ? (
          <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-white font-black text-lg">
                {editing === 'new' ? 'Articol nou' : 'Editează articol'}
              </h2>
              <button onClick={cancel} className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Titlu</Label>
                <Input
                  value={form.title}
                  onChange={(e) => {
                    const v = e.target.value;
                    set('title', v);
                    if (editing === 'new' || !form.slug) set('slug', slugify(v));
                  }}
                  placeholder="Ce este un WOD?"
                />
              </div>
              <div className="space-y-1.5">
                <Label>Slug (URL)</Label>
                <Input value={form.slug} onChange={(e) => set('slug', e.target.value)} placeholder="ce-este-un-wod" />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label>Excerpt (rezumat scurt)</Label>
              <Textarea value={form.excerpt} onChange={(e) => set('excerpt', e.target.value)} rows={2} placeholder="Rezumat de 1-2 propoziții pentru card și SEO." />
            </div>

            <div className="space-y-1.5">
              <Label>Conținut (Markdown)</Label>
              <Textarea value={form.content} onChange={(e) => set('content', e.target.value)} rows={12} className="font-mono text-sm" placeholder={"## Subtitlu\n\nParagraf...\n\n- listă\n- listă"} />
            </div>

            <div className="space-y-1.5">
              <Label>Imagine copertă</Label>
              <div className="flex flex-col sm:flex-row gap-3">
                <Input value={form.cover_image} onChange={(e) => set('cover_image', e.target.value)} placeholder="URL imagine (sau încarcă mai jos)" className="flex-1" />
                <label className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md text-sm cursor-pointer whitespace-nowrap">
                  <Upload className="w-4 h-4" /> Încarcă
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => uploadCover(e.target.files?.[0])} />
                </label>
              </div>
              {form.cover_image && (
                <img src={form.cover_image} alt="preview" className="mt-2 h-32 w-auto rounded-lg border border-zinc-800 object-cover" />
              )}
            </div>

            <div className="grid sm:grid-cols-4 gap-4">
              <div className="space-y-1.5">
                <Label>Categorie</Label>
                <select value={form.category} onChange={(e) => set('category', e.target.value)} className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm text-white">
                  {CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
              </div>
              <div className="space-y-1.5">
                <Label>Autor</Label>
                <Input value={form.author} onChange={(e) => set('author', e.target.value)} placeholder="Coach Robert" />
              </div>
              <div className="space-y-1.5">
                <Label>Limbă</Label>
                <select value={form.language} onChange={(e) => set('language', e.target.value)} className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm text-white">
                  <option value="ro">Română</option>
                  <option value="en">Engleză</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <Label>Status</Label>
                <select value={form.status} onChange={(e) => set('status', e.target.value)} className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm text-white">
                  <option value="draft">Draft</option>
                  <option value="published">Publicat</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label>Data publicării</Label>
              <Input type="date" value={form.published_date} onChange={(e) => set('published_date', e.target.value)} />
            </div>

            {/* FAQ for AEO */}
            <div className="space-y-3 pt-4 border-t border-zinc-800">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="flex items-center gap-2"><Star className="w-4 h-4 text-amber-400" /> Întrebări frecvente (FAQ) — pentru AEO</Label>
                  <p className="text-xs text-zinc-500 mt-1">Generază FAQPage JSON-LD pentru răspunsuri AI.</p>
                </div>
                <Button type="button" variant="outline" size="sm" onClick={addFaq}><Plus className="w-3.5 h-3.5" /> Adaugă</Button>
              </div>
              {form.faq.length === 0 && <p className="text-zinc-600 text-sm italic">Nicio întrebare adăugată.</p>}
              {form.faq.map((f, i) => (
                <div key={i} className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-zinc-400">Întrebarea {i + 1}</span>
                    <button onClick={() => removeFaq(i)} className="p-1 rounded text-zinc-500 hover:text-red-400"><X className="w-4 h-4" /></button>
                  </div>
                  <Input value={f.question} onChange={(e) => setFaq(i, 'question', e.target.value)} placeholder="Ce este un WOD?" />
                  <Textarea value={f.answer} onChange={(e) => setFaq(i, 'answer', e.target.value)} rows={2} placeholder="Răspuns concis..." />
                </div>
              ))}
            </div>

            {/* Preview */}
            <div className="space-y-1.5 pt-4 border-t border-zinc-800">
              <Label className="flex items-center gap-2"><FileText className="w-4 h-4" /> Preview fișier</Label>
              <pre className="max-h-48 overflow-auto rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-xs text-zinc-300 font-mono whitespace-pre-wrap">{buildMarkdown(form)}</pre>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-4">
              <Button onClick={generate}>
                <Download className="w-4 h-4" /> Generează .md
              </Button>
              <Button variant="outline" onClick={copyToClipboard}>
                <Copy className="w-4 h-4" /> Copiază
              </Button>
              <Button variant="ghost" onClick={cancel}>Anulează</Button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {articles.length === 0 ? (
              <p className="text-center text-zinc-500 py-16">Niciun articol încă. Apasă „Articol nou".</p>
            ) : (
              articles.map((a) => (
                <div key={a.slug} className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4 flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="h-16 w-24 flex-shrink-0 rounded-lg overflow-hidden bg-zinc-800">
                    {a.cover_image && <img src={a.cover_image} alt="" className="h-full w-full object-cover" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full border bg-blue-500/20 text-blue-300 border-blue-500/30">
                        {a.status === 'published' ? 'Publicat' : 'Draft'}
                      </span>
                      <span className="text-zinc-500 text-xs uppercase">{a.language}</span>
                      {a.published_date && <span className="text-zinc-500 text-xs">{a.published_date}</span>}
                    </div>
                    <h3 className="text-white font-bold truncate">{a.title}</h3>
                    <p className="text-zinc-500 text-xs truncate">/articole/{a.slug}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button onClick={() => startEdit(a)} className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white"><Pencil className="w-4 h-4" /></button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}