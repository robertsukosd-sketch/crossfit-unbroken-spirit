import React from 'react';
import { MapPin, Search, MessageCircle } from 'lucide-react';
import { useLanguage } from '../LanguageProvider';

const localFaq = {
  ro: [
    {
      q: 'Există CrossFit aproape de Sector 4 București?',
      a: 'Da. CrossFit Unbroken Spirit este pe Splaiul Unirii 257-259, foarte accesibil din Sector 4, zona Timpuri Noi, Tineretului, Văcărești și Berceni. Ai parcare gratuită și acces rapid de la metrou Mihai Bravu.',
    },
    {
      q: 'Unde pot face antrenament funcțional în București?',
      a: 'La CrossFit Unbroken Spirit faci antrenament funcțional ghidat de antrenori, cu exerciții de forță, cardio, gimnastică, haltere, rower, bike și ski erg, adaptate nivelului tău.',
    },
    {
      q: 'Este sala potrivită dacă locuiesc în Sector 3 sau Sector 4?',
      a: 'Da. Sala este poziționată între Sector 3 și Sector 4, pe Splaiul Unirii, aproape de Mihai Bravu, Timpuri Noi, Vitan, Tineretului și zona Văcărești.',
    },
    {
      q: 'Pot începe CrossFit dacă sunt începător?',
      a: 'Da. Prima clasă este gratuită, iar antrenorii adaptează fiecare exercițiu la nivelul tău, indiferent dacă ești începător sau ai experiență în fitness.',
    },
    {
      q: 'Oferiți Personal Training în București?',
      a: 'Da. Oferim Personal Training în grup privat de maximum 3 persoane, pentru slăbit, forță, mobilitate, tehnică și condiție fizică generală.',
    },
    {
      q: 'Acceptați carduri de beneficii precum 7Card, SanoPass sau Edenred?',
      a: 'Da. Acceptăm 7Card by Wellhub, SanoPass FIT și Edenred Benefit, în funcție de planul tău de beneficii oferit de angajator.',
    },
  ],
  en: [
    {
      q: 'Is there CrossFit near Bucharest Sector 4?',
      a: 'Yes. CrossFit Unbroken Spirit is located on Splaiul Unirii 257-259, easily accessible from Sector 4, Timpuri Noi, Tineretului, Văcărești and Berceni, with free parking and quick access from Mihai Bravu metro.',
    },
    {
      q: 'Where can I do functional training in Bucharest?',
      a: 'At CrossFit Unbroken Spirit you can do coach-led functional training with strength, cardio, gymnastics, weightlifting, rower, bike and ski erg, scaled to your level.',
    },
    {
      q: 'Is the gym suitable if I live in Sector 3 or Sector 4?',
      a: 'Yes. The gym is positioned between Sector 3 and Sector 4, on Splaiul Unirii, close to Mihai Bravu, Timpuri Noi, Vitan, Tineretului and Văcărești.',
    },
    {
      q: 'Can I start CrossFit as a beginner?',
      a: 'Yes. Your first class is free and coaches scale every movement to your level, whether you are a complete beginner or already have fitness experience.',
    },
    {
      q: 'Do you offer Personal Training in Bucharest?',
      a: 'Yes. We offer Personal Training in private groups of up to 3 people, for weight loss, strength, mobility, technique and general conditioning.',
    },
    {
      q: 'Do you accept benefit cards like 7Card, SanoPass or Edenred?',
      a: 'Yes. We accept 7Card by Wellhub, SanoPass FIT and Edenred Benefit, depending on your employer benefits plan.',
    },
  ],
};

export default function LocalSeoFAQSection() {
  const { language } = useLanguage();
  const items = localFaq[language] || localFaq.ro;

  return (
    <section id="local-faq" className="py-20 bg-zinc-950 border-t border-zinc-900">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-sky-500/30 bg-sky-500/10 text-sky-400 text-sm font-bold uppercase tracking-widest mb-4">
            <Search className="w-4 h-4" />
            {language === 'ro' ? 'Căutări locale' : 'Local searches'}
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">
            {language === 'ro' ? 'CrossFit, antrenament funcțional și Personal Training în București' : 'CrossFit, functional training and Personal Training in Bucharest'}
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-3xl mx-auto">
            {language === 'ro'
              ? 'Răspunsuri rapide pentru cei care caută o sală CrossFit aproape de Sector 3, Sector 4, Mihai Bravu, Timpuri Noi, Tineretului sau Văcărești.'
              : 'Quick answers for people looking for a CrossFit gym near Sector 3, Sector 4, Mihai Bravu, Timpuri Noi, Tineretului or Văcărești.'}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {items.map((item) => (
            <details key={item.q} className="group rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5 hover:border-blue-500/40 transition-colors">
              <summary className="flex cursor-pointer list-none items-start gap-3 text-left text-white font-bold">
                <MapPin className="w-5 h-5 text-sky-400 mt-0.5 flex-shrink-0" />
                <span>{item.q}</span>
              </summary>
              <p className="mt-4 pl-8 text-gray-300 text-sm sm:text-base leading-relaxed">
                {item.a}
              </p>
            </details>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-5 py-3 text-amber-200 text-sm font-semibold">
            <MessageCircle className="w-4 h-4" />
            {language === 'ro' ? 'Prima clasă este gratuită pentru începători.' : 'The first class is free for beginners.'}
          </div>
        </div>
      </div>
    </section>
  );
}