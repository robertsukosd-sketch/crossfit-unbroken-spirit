import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react';
import { CONTACT_EMAIL, GYM_ADDRESS, PHONE_1, PHONE_2 } from '@/components/config';

const GOOGLE_MAPS_URL = 'https://www.google.com/maps/search/Splaiul+Unirii+257-259+Bucuresti';

export default function Contact() {
  useEffect(() => {
    document.title = 'Contact CrossFit Unbroken Spirit | București';
  }, []);

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div className="absolute right-0 top-0 h-96 w-96 translate-x-1/3 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-96 w-96 -translate-x-1/3 rounded-full bg-sky-500/10 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-4xl px-6">
          <Link to="/" className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-sky-400 hover:text-sky-300">
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>

          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-sky-400">Get in touch</p>
          <h1 className="text-4xl font-black leading-tight sm:text-5xl md:text-6xl">
            Contact CrossFit Unbroken Spirit
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-gray-300 sm:text-lg">
            Have a question about classes, memberships, drop-ins, personal training, or your first CrossFit session?
            Contact the CrossFit Unbroken Spirit team and we will help you choose the right next step.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <a href={`mailto:${CONTACT_EMAIL}`} className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 transition-colors hover:border-sky-400/50">
              <Mail className="mb-4 h-7 w-7 text-sky-400" />
              <h2 className="text-xl font-bold">Email</h2>
              <p className="mt-2 text-gray-300">{CONTACT_EMAIL}</p>
            </a>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
              <Phone className="mb-4 h-7 w-7 text-sky-400" />
              <h2 className="text-xl font-bold">Phone</h2>
              <a href={`tel:${PHONE_1.replace(/\s/g, '')}`} className="mt-2 block text-gray-300 hover:text-sky-300">{PHONE_1}</a>
              <a href={`tel:${PHONE_2.replace(/\s/g, '')}`} className="mt-1 block text-gray-300 hover:text-sky-300">{PHONE_2}</a>
            </div>

            <a href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer" className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 transition-colors hover:border-sky-400/50 sm:col-span-2">
              <MapPin className="mb-4 h-7 w-7 text-sky-400" />
              <h2 className="text-xl font-bold">Location</h2>
              <p className="mt-2 text-gray-300">{GYM_ADDRESS}</p>
            </a>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="https://www.instagram.com/crossfit.unbroken.spirit" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-zinc-700 px-5 py-3 text-sm font-bold text-gray-200 hover:border-pink-400 hover:text-pink-300">
              <Instagram className="h-4 w-4" />
              Instagram
            </a>
            <a href="https://www.facebook.com/profile.php?id=61588232038424" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-zinc-700 px-5 py-3 text-sm font-bold text-gray-200 hover:border-blue-400 hover:text-blue-300">
              <Facebook className="h-4 w-4" />
              Facebook
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}