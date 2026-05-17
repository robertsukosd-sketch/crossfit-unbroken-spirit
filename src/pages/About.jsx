import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Dumbbell, MapPin, Users } from 'lucide-react';
import { GYM_ADDRESS } from '@/components/config';

export default function About() {
  useEffect(() => {
    document.title = 'About CrossFit Unbroken Spirit | București';
  }, []);

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div className="absolute left-0 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 translate-x-1/3 rounded-full bg-sky-500/10 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-4xl px-6">
          <Link to="/" className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-sky-400 hover:text-sky-300">
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>

          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-bold text-sky-300">
            <Dumbbell className="h-4 w-4" />
            CrossFit box in Bucharest
          </div>

          <h1 className="text-4xl font-black leading-tight sm:text-5xl md:text-6xl">
            About CrossFit Unbroken Spirit
          </h1>

          <div className="mt-8 space-y-6 text-base leading-8 text-gray-300 sm:text-lg">
            <p>
              CrossFit Unbroken Spirit is a CrossFit box in Bucharest created for people who want structured training,
              professional coaching, and a supportive community instead of a generic gym experience. The app and website
              help visitors understand what CrossFit is, explore the available programs, check the weekly schedule, compare
              memberships, book a free class, learn how drop-ins work, and contact the team directly. It is designed for
              beginners who are taking their first step into functional training, experienced athletes who want challenging
              programming, people returning to fitness after a break, and anyone looking for a place where technique,
              consistency, and encouragement matter.
            </p>
            <p>
              The experience is built around the CrossFit Unbroken Spirit team: coaches who combine practical athletic
              experience, movement knowledge, and a strong focus on safety. The team works with members at different fitness
              levels, adapts workouts when needed, and guides each person toward visible progress. The box is located at
              {` ${GYM_ADDRESS}`}, with access by car and public transport, free parking, class information, Google reviews,
              social links, and practical details available online. The site is built to make choosing, visiting, and joining
              CrossFit Unbroken Spirit simple for future members and returning athletes alike.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
              <Users className="mb-3 h-6 w-6 text-sky-400" />
              <h2 className="text-lg font-bold">For all levels</h2>
              <p className="mt-2 text-sm text-gray-400">Beginner-friendly coaching and scalable workouts.</p>
            </div>
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
              <Dumbbell className="mb-3 h-6 w-6 text-sky-400" />
              <h2 className="text-lg font-bold">Professional coaching</h2>
              <p className="mt-2 text-sm text-gray-400">Technique, consistency, and progress with every class.</p>
            </div>
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
              <MapPin className="mb-3 h-6 w-6 text-sky-400" />
              <h2 className="text-lg font-bold">Bucharest location</h2>
              <p className="mt-2 text-sm text-gray-400">Easy access near Mihai Bravu, with free parking included.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}