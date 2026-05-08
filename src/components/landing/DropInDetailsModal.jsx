import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useLanguage } from '../LanguageProvider';
import { CONTACT_EMAIL } from '../config';
import MiniSchedulePopup from './MiniSchedulePopup';

export default function DropInDetailsModal({ isOpen, onClose, onSubmitted }) {
  const { t, language } = useLanguage();
  const isRo = language === 'ro';
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [sending, setSending] = useState(false);
  const nameRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    setTimeout(() => nameRef.current?.focus(), 100);
  }, [isOpen]);

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email);
  const canSend = form.name.trim() && isValidEmail && form.phone.trim() && selectedSlot;

  const getSlotDate = (slot) => {
    if (!slot) return '';
    const now = new Date();
    const jsDay = now.getDay();
    const diffToMon = jsDay === 0 ? -6 : 1 - jsDay;
    const monday = new Date(now);
    monday.setDate(now.getDate() + diffToMon + (slot.weekOffset || 0) * 7);
    monday.setHours(0, 0, 0, 0);
    const dayNames = isRo
      ? ['Luni', 'Marți', 'Miercuri', 'Joi', 'Vineri', 'Sâmbătă']
      : ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayIndex = dayNames.findIndex((day) => day.toLowerCase() === slot.day.toLowerCase());
    const slotDate = new Date(monday);
    slotDate.setDate(monday.getDate() + (dayIndex >= 0 ? dayIndex : 0));
    return `${slotDate.getDate().toString().padStart(2, '0')}.${(slotDate.getMonth() + 1).toString().padStart(2, '0')}`;
  };

  const handleSlotSelect = (day, time, weekOffset) => {
    if (selectedSlot?.day === day && selectedSlot?.time === time && selectedSlot?.weekOffset === weekOffset) {
      setSelectedSlot(null);
    } else {
      setSelectedSlot({ day, time, weekOffset });
    }
  };

  const resetAndClose = () => {
    setForm({ name: '', email: '', phone: '' });
    setSelectedSlot(null);
    setSending(false);
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSend) return;
    setSending(true);

    const slotDate = getSlotDate(selectedSlot);
    const isSaturdayCrossFit = selectedSlot.day === t("saturday") && selectedSlot.time === "10:00-11:30";
    const sessionType = selectedSlot.time.includes('-') && !isSaturdayCrossFit ? 'Open Gym' : 'CrossFit';
    const interval = `${selectedSlot.day}${slotDate ? ` (${slotDate})` : ''} la ${selectedSlot.time} - ${sessionType}`;

    try {
      await fetch('https://api.unbrokenspirit.ro/email/send/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: CONTACT_EMAIL,
          subject: `Drop-In înainte de plată - ${form.name}`,
          body: `Nume: ${form.name}\nEmail: ${form.email}\nTelefon: ${form.phone}\nInterval ales: ${interval}\n\nAceastă persoană intenționează să accepte termenii și să plătească Drop-In.`
        })
      });
      setSending(false);
      onSubmitted();
    } catch (error) {
      setSending(false);
      toast.error(isRo ? 'Eroare la trimitere. Încearcă din nou.' : 'Error sending request. Please try again.');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[110] flex items-end justify-center bg-black/80 p-0 backdrop-blur-sm sm:items-center sm:p-4"
          onClick={resetAndClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative flex max-h-[82dvh] w-full flex-col overflow-y-auto rounded-t-2xl border border-zinc-700 bg-zinc-900 p-4 pb-32 shadow-2xl sm:max-h-[92vh] sm:max-w-md sm:rounded-2xl sm:p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={resetAndClose}
              className="absolute right-3 top-3 rounded-full p-1 text-gray-400 transition-colors hover:bg-zinc-800 hover:text-white"
              aria-label={isRo ? 'Închide' : 'Close'}
            >
              <X className="h-4 w-4" />
            </button>

            <div className="mb-3 pr-8">
              <h2 className="text-lg font-black text-white">
                {isRo ? 'Detalii pentru Drop-In' : 'Drop-In Details'}
              </h2>
              <p className="mt-1 text-xs leading-relaxed text-gray-400">
                {isRo
                  ? 'Alege intervalul în care vrei să vii și completează datele înainte de termeni și plată.'
                  : 'Choose when you plan to come and fill in your details before terms and payment.'}
              </p>
            </div>

            <MiniSchedulePopup
              isOpen={true}
              onClose={() => {}}
              selectedSlot={selectedSlot}
              onSlotSelect={handleSlotSelect}
            />

            <form onSubmit={handleSubmit} className="mt-3 space-y-2 pb-10 sm:pb-0">
              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-300">
                  {t('fullName')} <span className="text-blue-400">*</span>
                </label>
                <input
                  ref={nameRef}
                  type="text"
                  required
                  placeholder={t('fullNamePlaceholder')}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-lg border border-zinc-600 bg-zinc-800 px-3 py-2 text-sm text-white placeholder-zinc-500 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-300">
                  {t('email')} <span className="text-blue-400">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder={t('emailPlaceholder')}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-lg border border-zinc-600 bg-zinc-800 px-3 py-2 text-sm text-white placeholder-zinc-500 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-300">
                  {t('phone')} <span className="text-blue-400">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder={t('phonePlaceholder')}
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full rounded-lg border border-zinc-600 bg-zinc-800 px-3 py-2 text-sm text-white placeholder-zinc-500 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <Button
                type="submit"
                disabled={sending || !canSend}
                className="w-full rounded-lg bg-blue-600 font-bold text-white hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {sending ? t('sending') : isRo ? 'Continuă către termeni' : 'Continue to Terms'}
              </Button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}