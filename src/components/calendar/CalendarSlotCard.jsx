import React, { useState } from 'react';
import { ChevronDown, Clock, Mail, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function CalendarSlotCard({ slot, signups }) {
  const [open, setOpen] = useState(false);
  const isOpenGym = slot.type === 'Open Gym';
  const freeClasses = isOpenGym ? [] : signups.filter((signup) => signup.signup_type === 'free_class');
  const dropIns = signups.filter((signup) => signup.signup_type === 'drop_in');
  const visibleSignups = isOpenGym ? dropIns : signups;
  const hasSignups = visibleSignups.length > 0;

  return (
    <div className={cn(
      'rounded-2xl border p-4 transition-colors',
      hasSignups ? 'border-amber-400/50 bg-amber-400/10' : 'border-zinc-800 bg-zinc-900/80'
    )}>
      <button onClick={() => setOpen((value) => !value)} className="w-full text-left">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-white font-black">
              <Clock className="h-4 w-4 text-sky-400" />
              {slot.time}
            </div>
            <p className={cn('mt-1 text-sm font-semibold', slot.type === 'Open Gym' ? 'text-cyan-300' : 'text-blue-300')}>
              {slot.type}
            </p>
          </div>
          <ChevronDown className={cn('h-5 w-5 text-zinc-400 transition-transform', open && 'rotate-180')} />
        </div>
        <div className="mt-3 space-y-2 text-xs font-bold">
          {!isOpenGym && <span className="block rounded-full bg-blue-500/15 px-3 py-1.5 text-blue-200">Free classes: {freeClasses.length}</span>}
          <span className="block rounded-full bg-emerald-500/15 px-3 py-1.5 text-emerald-200">Drop ins: {dropIns.length}</span>
        </div>
      </button>

      {open && (
        <div className="mt-4 space-y-3 border-t border-zinc-800 pt-4">
          {visibleSignups.length === 0 ? (
            <p className="text-sm text-zinc-500">No signups for this slot.</p>
          ) : visibleSignups.map((signup) => (
            <div key={signup.id} className="rounded-xl bg-black/30 p-3">
              <div className="flex items-center justify-between gap-2">
                <p className="font-bold text-white">{signup.name}</p>
                <span className={cn('rounded-full px-2 py-1 text-[11px] font-bold', signup.signup_type === 'free_class' ? 'bg-blue-500/20 text-blue-200' : 'bg-emerald-500/20 text-emerald-200')}>
                  {signup.signup_type === 'free_class' ? 'Free class' : 'Drop-in'}
                </span>
              </div>
              <div className="mt-2 space-y-1 text-xs text-zinc-400">
                {signup.email && <p className="flex items-center gap-2"><Mail className="h-3 w-3" />{signup.email}</p>}
                {signup.phone && <p className="flex items-center gap-2"><Phone className="h-3 w-3" />{signup.phone}</p>}
                {signup.message && <p className="pt-1 text-zinc-300">{signup.message}</p>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}