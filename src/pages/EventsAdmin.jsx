import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, CreditCard, CheckCircle, ChevronDown, ChevronUp, Plus, Eye, Ticket } from 'lucide-react';
import { cn } from '@/lib/utils';

// ─── MOCK DATA (sketch / prototype) ──────────────────────────────────────────
const MOCK_EVENTS = [
  {
    id: '1',
    name: 'CrossFit Open 25.1 — In-house Competition',
    date: '2026-07-12',
    time: '10:00',
    price: 80,
    capacity: 30,
    status: 'published',
    description: 'Annual in-house CrossFit Open workout. Scaled & Rx divisions.',
    registrations: [
      { id: 'r1', name: 'Andrei Popescu', email: 'andrei@example.com', phone: '0740123456', payment: 'paid', registered_at: '2026-06-18T10:23:00Z' },
      { id: 'r2', name: 'Maria Ionescu', email: 'maria@example.com', phone: '0751234567', payment: 'paid', registered_at: '2026-06-19T14:05:00Z' },
      { id: 'r3', name: 'Alex Dumitrescu', email: 'alex@example.com', phone: '', payment: 'pending', registered_at: '2026-06-20T09:00:00Z' },
    ],
  },
  {
    id: '2',
    name: 'Mobility & Recovery Workshop',
    date: '2026-07-19',
    time: '11:00',
    price: 120,
    capacity: 15,
    status: 'published',
    description: '2-hour workshop with Coach Bogdan on mobility, recovery protocols and injury prevention.',
    registrations: [
      { id: 'r4', name: 'Elena Radu', email: 'elena@example.com', phone: '0760987654', payment: 'paid', registered_at: '2026-06-21T08:11:00Z' },
    ],
  },
  {
    id: '3',
    name: 'Weightlifting Seminar — Clean & Jerk',
    date: '2026-08-02',
    time: '09:00',
    price: 150,
    capacity: 12,
    status: 'draft',
    description: 'Full-day seminar focused on the Clean & Jerk. Limited spots.',
    registrations: [],
  },
];

const PAYMENT_BADGE = {
  paid:    { label: 'Paid',    color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
  pending: { label: 'Pending', color: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
  failed:  { label: 'Failed',  color: 'bg-red-500/20 text-red-300 border-red-500/30' },
};

const STATUS_BADGE = {
  published: { label: 'Published', color: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
  draft:     { label: 'Draft',     color: 'bg-zinc-700 text-zinc-400 border-zinc-600' },
  cancelled: { label: 'Cancelled', color: 'bg-red-500/20 text-red-300 border-red-500/30' },
};

function FlowStep({ number, title, description, icon: Icon, accent }) {
  return (
    <div className={cn('flex gap-4 p-4 rounded-2xl border', accent)}>
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-sm font-black text-white">
        {number}
      </div>
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Icon className="w-4 h-4 text-sky-400" />
          <span className="text-white font-bold text-sm">{title}</span>
        </div>
        <p className="text-zinc-400 text-xs leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

function EventRow({ event }) {
  const [expanded, setExpanded] = useState(false);
  const paidCount = event.registrations.filter(r => r.payment === 'paid').length;
  const revenue = paidCount * event.price;
  const spotsLeft = event.capacity - event.registrations.length;
  const status = STATUS_BADGE[event.status];

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950 overflow-hidden">
      {/* Event header row */}
      <div className="p-4 flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className={cn('text-xs font-bold px-2 py-0.5 rounded-full border', status.color)}>{status.label}</span>
            <span className="text-zinc-500 text-xs">{event.date} · {event.time}</span>
          </div>
          <h3 className="text-white font-black text-base leading-tight">{event.name}</h3>
          <p className="text-zinc-500 text-xs mt-0.5 line-clamp-1">{event.description}</p>
        </div>

        <div className="flex items-center gap-4 flex-shrink-0">
          <div className="text-center">
            <p className="text-xs text-zinc-500">Price</p>
            <p className="text-white font-black">{event.price} RON</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-zinc-500">Signups</p>
            <p className="text-white font-black">{event.registrations.length}/{event.capacity}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-zinc-500">Revenue</p>
            <p className="text-emerald-400 font-black">{revenue} RON</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-zinc-500">Spots left</p>
            <p className={cn('font-black', spotsLeft <= 3 ? 'text-amber-400' : 'text-zinc-300')}>{spotsLeft}</p>
          </div>
          <button
            onClick={() => setExpanded(!expanded)}
            className="ml-2 p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 transition-colors text-zinc-400 hover:text-white"
          >
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Registrations list */}
      {expanded && (
        <div className="border-t border-zinc-800 bg-zinc-900/50">
          {event.registrations.length === 0 ? (
            <p className="text-zinc-500 text-sm text-center py-6 italic">No registrations yet.</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="text-left text-xs text-zinc-500 font-semibold px-4 py-2">Name</th>
                  <th className="text-left text-xs text-zinc-500 font-semibold px-4 py-2 hidden sm:table-cell">Email</th>
                  <th className="text-left text-xs text-zinc-500 font-semibold px-4 py-2 hidden md:table-cell">Phone</th>
                  <th className="text-left text-xs text-zinc-500 font-semibold px-4 py-2">Payment</th>
                  <th className="text-left text-xs text-zinc-500 font-semibold px-4 py-2 hidden lg:table-cell">Registered</th>
                </tr>
              </thead>
              <tbody>
                {event.registrations.map((r, i) => {
                  const badge = PAYMENT_BADGE[r.payment];
                  return (
                    <tr key={r.id} className={cn('border-b border-zinc-800/50', i % 2 === 0 ? 'bg-zinc-900/30' : '')}>
                      <td className="px-4 py-2.5 text-white font-semibold">{r.name}</td>
                      <td className="px-4 py-2.5 text-zinc-400 hidden sm:table-cell">{r.email}</td>
                      <td className="px-4 py-2.5 text-zinc-400 hidden md:table-cell">{r.phone || '—'}</td>
                      <td className="px-4 py-2.5">
                        <span className={cn('text-xs font-bold px-2 py-0.5 rounded-full border', badge.color)}>{badge.label}</span>
                      </td>
                      <td className="px-4 py-2.5 text-zinc-500 text-xs hidden lg:table-cell">
                        {new Date(r.registered_at).toLocaleDateString('ro-RO')}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}

export default function EventsAdminPage() {
  const totalRegistrations = MOCK_EVENTS.flatMap(e => e.registrations).length;

  return (
    <div className="min-h-screen bg-black px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-8">
          <Link to="/" className="text-sm font-semibold text-sky-400 hover:text-sky-300">← Back to site</Link>
          <div className="mt-3 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            <div>
              <h1 className="text-3xl font-black sm:text-5xl">Events Admin</h1>
              <p className="mt-1 text-zinc-400 text-sm">Paid event management — sketch / prototype view</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition-colors self-start sm:self-auto opacity-50 cursor-not-allowed" disabled>
              <Plus className="w-4 h-4" />
              New Event <span className="text-blue-300 text-xs">(coming soon)</span>
            </button>
          </div>
        </div>

        {/* ── SECTION 1: FLOW SKETCH ─────────────────────────────────────────── */}
        <div className="mb-10 rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
          <div className="flex items-center gap-2 mb-5">
            <Eye className="w-5 h-5 text-sky-400" />
            <h2 className="text-white font-black text-lg">Registration Flow — Sketch</h2>
            <span className="ml-2 text-xs bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-full px-2 py-0.5 font-bold">PROTOTYPE</span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <FlowStep number="1" icon={Calendar} accent="border-zinc-800 bg-zinc-900/40"
              title="Admin creates event"
              description="Name, date, time, price (RON), capacity, description, image. Status: Draft or Published." />
            <FlowStep number="2" icon={Eye} accent="border-zinc-800 bg-zinc-900/40"
              title="Event appears on site"
              description="A new Events section on the landing page lists published events with price, date, and available spots." />
            <FlowStep number="3" icon={Ticket} accent="border-zinc-800 bg-zinc-900/40"
              title="User clicks Register"
              description="Modal opens: user fills name, email, phone. Sees price summary and privacy consent." />
            <FlowStep number="4" icon={CreditCard} accent="border-blue-900/40 border-blue-800/50"
              title="Stripe Checkout"
              description="User is redirected to Stripe-hosted checkout page. Payment in RON via card. Secure, no card data touches our server." />
            <FlowStep number="5" icon={CheckCircle} accent="border-emerald-900/40 border-emerald-800/50"
              title="Webhook confirms payment"
              description="Stripe fires a webhook → backend function creates EventRegistration record (status: paid) → confirmation email sent to user." />
            <FlowStep number="6" icon={Users} accent="border-zinc-800 bg-zinc-900/40"
              title="Admin sees it here"
              description="This page shows all events, registrations per event, payment status, revenue total, and spots remaining." />
          </div>

          {/* Arrow flow diagram */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-1 text-xs text-zinc-500 font-semibold">
            {['Admin creates', '→', 'Published on site', '→', 'User registers', '→', 'Stripe payment', '→', 'Webhook confirms', '→', 'Admin list updated'].map((s, i) => (
              <span key={i} className={s === '→' ? 'text-zinc-700' : 'bg-zinc-900 border border-zinc-800 rounded-full px-2 py-1 text-zinc-400'}>{s}</span>
            ))}
          </div>
        </div>

        {/* ── SECTION 2: SUMMARY STATS ──────────────────────────────────────── */}
        <div className="mb-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="rounded-2xl border border-blue-500/30 bg-blue-500/10 p-4 text-center">
            <p className="text-xs font-semibold text-blue-200">Total Events</p>
            <p className="mt-1 text-3xl font-black">{MOCK_EVENTS.length}</p>
          </div>
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-center">
            <p className="text-xs font-semibold text-emerald-200">Total Registrations</p>
            <p className="mt-1 text-3xl font-black">{totalRegistrations}</p>
          </div>
          <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-center">
            <p className="text-xs font-semibold text-amber-200">Confirmed Revenue</p>
            <p className="mt-1 text-3xl font-black">{MOCK_EVENTS.flatMap(e => e.registrations.filter(r => r.payment === 'paid').map(() => e.price)).reduce((a, b) => a + b, 0)} RON</p>
          </div>
          <div className="rounded-2xl border border-zinc-700 bg-zinc-900/50 p-4 text-center">
            <p className="text-xs font-semibold text-zinc-300">Published</p>
            <p className="mt-1 text-3xl font-black">{MOCK_EVENTS.filter(e => e.status === 'published').length}</p>
          </div>
        </div>

        {/* ── SECTION 3: EVENTS LIST ────────────────────────────────────────── */}
        <div className="mb-4 flex items-center gap-2">
          <Ticket className="w-5 h-5 text-sky-400" />
          <h2 className="text-white font-black text-lg">Events</h2>
          <span className="text-zinc-600 text-xs ml-1">(click the arrow to expand registrations)</span>
        </div>

        <div className="space-y-3">
          {MOCK_EVENTS.map(event => (
            <EventRow key={event.id} event={event} />
          ))}
        </div>

        <p className="mt-8 text-center text-zinc-600 text-xs">
          ⚠️ This is a prototype with mock data. No real events or payments exist yet.
        </p>
      </div>
    </div>
  );
}