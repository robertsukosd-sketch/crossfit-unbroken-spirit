import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import LanguageProvider from '@/components/LanguageProvider';
import CalendarSlotCard from '@/components/calendar/CalendarSlotCard';
import { getWeeklySchedule, formatDateKey, getWeekMonday } from '@/services/calendarSignups';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const getInitialReservationWeekOffset = () => {
  const now = new Date();
  const day = now.getDay();
  const minutes = now.getHours() * 60 + now.getMinutes();
  return day === 0 || (day === 6 && minutes >= 12 * 60) ? 1 : 0;
};

function CalendarContent() {
  const [weekOffset, setWeekOffset] = useState(getInitialReservationWeekOffset);
  const [mobileView, setMobileView] = useState('daily');
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const days = useMemo(() => getWeeklySchedule(weekOffset), [weekOffset]);
  const weekStart = formatDateKey(getWeekMonday(weekOffset));
  const weekEndDate = new Date(getWeekMonday(weekOffset));
  weekEndDate.setDate(weekEndDate.getDate() + 5);
  const weekEnd = formatDateKey(weekEndDate);

  const { data: signups = [] } = useQuery({
    queryKey: ['calendar-signups'],
    queryFn: () => base44.entities.CalendarSignup.list('-created_date', 500),
    initialData: [],
  });

  const weeklySignups = signups.filter((signup) => signup.slot_date >= weekStart && signup.slot_date <= weekEnd && signup.status !== 'cancelled');
  const freeTotal = weeklySignups.filter((signup) => signup.signup_type === 'free_class').length;
  const dropInTotal = weeklySignups.filter((signup) => signup.signup_type === 'drop_in').length;

  const getSignupsForSlot = (dateKey, time) => weeklySignups.filter((signup) => signup.slot_date === dateKey && signup.time === time);
  const isSlotPast = (dateKey, time) => {
    const endTime = time.split('-').pop().trim();
    const [hours, minutes] = endTime.split(':').map(Number);
    const slotEnd = new Date(`${dateKey}T00:00:00`);
    slotEnd.setHours(hours, minutes || 0, 0, 0);
    return slotEnd < new Date();
  };
  const visibleDays = mobileView === 'daily' ? [days[selectedDayIndex]] : days;

  return (
    <div className="min-h-screen bg-black px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link to="/" className="text-sm font-semibold text-sky-400 hover:text-sky-300">← Back to site</Link>
            <h1 className="mt-3 text-3xl font-black sm:text-5xl">Weekly Calendar</h1>
            <p className="mt-2 text-zinc-400">CrossFit classes and Open Gym signup overview. Past reservations are available for the last year.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" disabled={weekOffset <= -52} onClick={() => setWeekOffset((value) => value - 1)} className="border-zinc-700 bg-zinc-900 text-white hover:bg-zinc-800 disabled:opacity-40">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2 text-center text-sm font-bold text-zinc-300">
              {weekStart} – {weekEnd}
            </div>
            <Button variant="outline" onClick={() => setWeekOffset((value) => value + 1)} className="border-zinc-700 bg-zinc-900 text-white hover:bg-zinc-800">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="mb-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-blue-500/30 bg-blue-500/10 p-5">
            <p className="text-sm font-semibold text-blue-200">Free classes this week</p>
            <p className="mt-2 text-4xl font-black">{freeTotal}</p>
          </div>
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5">
            <p className="text-sm font-semibold text-emerald-200">Drop-ins this week</p>
            <p className="mt-2 text-4xl font-black">{dropInTotal}</p>
          </div>
        </div>

        <div className="mb-5 flex gap-2 lg:hidden">
          {['daily', 'weekly'].map((view) => (
            <button
              key={view}
              onClick={() => setMobileView(view)}
              className={cn('flex-1 rounded-full px-4 py-2 text-sm font-bold capitalize', mobileView === view ? 'bg-blue-600 text-white' : 'bg-zinc-900 text-zinc-400')}
            >
              {view} view
            </button>
          ))}
        </div>

        {mobileView === 'daily' && (
          <div className="mb-5 grid grid-cols-6 gap-1 lg:hidden">
            {days.map((day, index) => (
              <button
                key={day.dateKey}
                onClick={() => setSelectedDayIndex(index)}
                className={cn('rounded-xl px-1 py-2 text-xs font-bold', selectedDayIndex === index ? 'bg-blue-600 text-white' : 'bg-zinc-900 text-zinc-400')}
              >
                {day.day.slice(0, 3)}
              </button>
            ))}
          </div>
        )}

        <div className="grid gap-4 lg:hidden">
          {visibleDays.map((day) => (
            <div key={day.dateKey} className="rounded-3xl border border-zinc-800 bg-zinc-950 p-3">
              <div className="mb-3 rounded-2xl bg-zinc-900 p-3 text-center">
                <h2 className="font-black">{day.day}</h2>
                <p className="text-xs text-zinc-500">{day.dateKey}</p>
              </div>
              <div className="space-y-3">
                {day.slots.length === 0 ? (
                  <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 text-center text-sm text-zinc-500">Closed</div>
                ) : day.slots.map((slot) => (
                  <CalendarSlotCard key={`${day.dateKey}-${slot.time}`} slot={slot} signups={getSignupsForSlot(day.dateKey, slot.time)} isPast={isSlotPast(day.dateKey, slot.time)} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="hidden gap-4 lg:grid lg:grid-cols-3 2xl:grid-cols-6">
          {days.map((day) => (
            <div key={day.dateKey} className="rounded-3xl border border-zinc-800 bg-zinc-950 p-3">
              <div className="mb-3 rounded-2xl bg-zinc-900 p-3 text-center">
                <h2 className="font-black">{day.day}</h2>
                <p className="text-xs text-zinc-500">{day.dateKey}</p>
              </div>
              <div className="space-y-3">
                {day.slots.length === 0 ? (
                  <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 text-center text-sm text-zinc-500">Closed</div>
                ) : day.slots.map((slot) => (
                  <CalendarSlotCard key={`${day.dateKey}-${slot.time}`} slot={slot} signups={getSignupsForSlot(day.dateKey, slot.time)} isPast={isSlotPast(day.dateKey, slot.time)} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CalendarPage() {
  return (
    <LanguageProvider>
      <CalendarContent />
    </LanguageProvider>
  );
}