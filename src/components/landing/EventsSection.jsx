import React, { useState, useEffect } from 'react';

// Mock events — same data as EventsAdmin, filtered to published only
const EVENTS = [
  {
    id: '1',
    name: 'CrossFit Open 25.1 — In-house Competition',
    date: '2026-07-12',
    time: '10:00',
    price: 80,
    capacity: 30,
    spotsUsed: 27,
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80',
    stripeLink: '#',
  },
  {
    id: '2',
    name: 'Mobility & Recovery Workshop',
    date: '2026-07-19',
    time: '11:00',
    price: 120,
    capacity: 15,
    spotsUsed: 14,
    image: null,
    stripeLink: '#',
  },
];

function formatEventDate(dateStr, time) {
  const d = new Date(`${dateStr}T${time}:00`);
  const month = d.toLocaleString('en-US', { month: 'long' });
  return `${month} ${d.getDate()} · ${time}`;
}

function useCountdown(targetDateStr, targetTime) {
  const [diff, setDiff] = useState(0);

  useEffect(() => {
    const target = new Date(`${targetDateStr}T${targetTime}:00`).getTime();
    const update = () => setDiff(Math.max(0, target - Date.now()));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [targetDateStr, targetTime]);

  const totalSec = Math.floor(diff / 1000);
  const days = Math.floor(totalSec / 86400);
  const hrs = Math.floor((totalSec % 86400) / 3600);
  const mins = Math.floor((totalSec % 3600) / 60);
  const secs = totalSec % 60;

  return { days, hrs, mins, secs };
}

function CountdownUnit({ value, label }) {
  return (
    <div className="flex flex-col items-center min-w-[2.5rem]">
      <span className="text-white font-black text-2xl leading-none tabular-nums">
        {String(value).padStart(2, '0')}
      </span>
      <span className="text-zinc-400 text-[10px] mt-0.5">{label}</span>
    </div>
  );
}

function FeaturedEvent({ event }) {
  const { days, hrs, mins, secs } = useCountdown(event.date, event.time);
  const spotsLeft = event.capacity - event.spotsUsed;

  return (
    <div className="relative rounded-2xl overflow-hidden" style={{ minHeight: 260 }}>
      {/* Background image with dark overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${event.image})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/60 to-black/90" />

      {/* Content */}
      <div className="relative z-10 p-6 flex flex-col justify-end h-full" style={{ minHeight: 260 }}>
        <h3 className="text-white font-black text-2xl leading-tight mb-2">{event.name}</h3>
        <p className="text-zinc-300 text-sm mb-3">{formatEventDate(event.date, event.time)}</p>

        {/* Badges */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-600 text-white">
            {event.price} RON
          </span>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-700 text-white">
            {event.spotsUsed}/{event.capacity} spots
          </span>
        </div>

        {/* Countdown + CTA row */}
        <div className="flex items-end justify-between gap-4">
          <div className="flex items-end gap-2">
            <CountdownUnit value={days} label="start" />
            <span className="text-white font-black text-2xl leading-none mb-4">:</span>
            <CountdownUnit value={hrs} label="day" />
            <span className="text-white font-black text-2xl leading-none mb-4">:</span>
            <CountdownUnit value={mins} label="min" />
            <span className="text-white font-black text-2xl leading-none mb-4">:</span>
            <CountdownUnit value={secs} label="dov" />
          </div>
          <a
            href={event.stripeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 px-5 py-2.5 rounded-xl bg-white text-black font-bold text-sm hover:bg-zinc-100 transition-colors"
          >
            Register Now
          </a>
        </div>
      </div>
    </div>
  );
}

function SideEvent({ event }) {
  const spotsLeft = event.capacity - event.spotsUsed;

  return (
    <div className="py-4 flex items-center gap-4">
      {/* Left accent bar */}
      <div className="w-1 self-stretch rounded-full bg-zinc-600 flex-shrink-0" />

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h4 className="text-white font-black text-base leading-snug mb-1">{event.name}</h4>
        <p className="text-zinc-400 text-sm mb-2">{formatEventDate(event.date, event.time)}</p>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-600 text-white">
            {event.price} RON
          </span>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-700 text-white">
            {event.spotsUsed}/{event.capacity} spots
          </span>
        </div>
      </div>

      {/* CTA */}
      <a
        href={event.stripeLink}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-shrink-0 px-4 py-2 rounded-xl bg-white text-black font-bold text-sm hover:bg-zinc-100 transition-colors"
      >
        Register Now
      </a>
    </div>
  );
}

export default function EventsSection() {
  if (EVENTS.length === 0) return null;

  const [featured, ...rest] = EVENTS;

  return (
    <section id="events" className="bg-zinc-950 py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Title */}
        <h2 className="text-white font-black text-3xl mb-8">Events</h2>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left: featured event */}
          <div>
            <p className="text-zinc-400 text-sm mb-3">Next upcoming event</p>
            <FeaturedEvent event={featured} />
          </div>

          {/* Right: remaining events */}
          {rest.length > 0 && (
            <div>
              <p className="text-zinc-400 text-sm mb-1">Remaining events</p>
              <div className="border-t border-zinc-800">
                {rest.map((event, i) => (
                  <React.Fragment key={event.id}>
                    <SideEvent event={event} />
                    {i < rest.length - 1 && <div className="border-t border-zinc-800" />}
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}