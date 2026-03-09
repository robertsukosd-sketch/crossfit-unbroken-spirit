import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { base44 } from "@/api/base44Client";
import { toast } from "sonner";
import { useLanguage } from '../LanguageProvider';
import { CONTACT_EMAIL } from '../config';
import MiniSchedulePopup from './MiniSchedulePopup';

const PREFILLED_MESSAGE = {
  ro: "Bună! Sunt curios/curioasă să descopăr ce oferă CrossFit Unbroken Spirit și aș vrea să rezerv ședința mea gratuită. Aștept cu interes să mă contactați.",
  en: "Hi! I'm curious to discover what CrossFit Unbroken Spirit offers and would like to book my free session. I look forward to hearing from you.",
};

export default function BookFreeSessionModal({ isOpen, onClose }) {
  const { t, language } = useLanguage();
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await base44.entities.ContactSubmission.create({
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: PREFILLED_MESSAGE[language],
        status: 'new',
      });
      const isRo = language === 'ro';
      await base44.integrations.Core.SendEmail({
        to: CONTACT_EMAIL,
        subject: isRo ? `Rezervare Ședință Gratuită - ${form.name}` : `Free Session Booking - ${form.name}`,
        body: `${isRo ? 'Nume' : 'Name'}: ${form.name}
${isRo ? 'Email' : 'Email'}: ${form.email}
${isRo ? 'Telefon' : 'Phone'}: ${form.phone || (isRo ? 'Necompletat' : 'Not provided')}

${isRo ? 'Mesaj' : 'Message'}:
${PREFILLED_MESSAGE[language]}`,
      });
      setSending(false);
      setSubmitted(true);
    } catch (error) {
      setSending(false);
      toast.error(language === 'ro' ? 'Eroare la trimitere. Încercați din nou.' : 'Error sending request. Please try again.');
    }
  };

  const handleClose = () => {
    setSubmitted(false);
    setForm({ name: '', email: '', phone: '' });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 24 }}
            transition={{ type: 'spring', damping: 22, stiffness: 280 }}
            className="relative w-full max-w-md bg-zinc-900 border border-zinc-700 rounded-2xl p-6 sm:p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors p-1"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {!submitted ? (
              <>
                <div className="mb-4">
                  <h2 className="text-2xl font-black text-white mb-1">
                    {language === 'ro' ? 'Rezervă o Ședință Gratuită' : 'Book a Free Session'}
                  </h2>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {language === 'ro' ? (
                      <>
                        Verifică{' '}
                        <button
                          type="button"
                          onClick={() => setShowSchedule((v) => !v)}
                          className="text-blue-400 font-semibold underline underline-offset-2 hover:text-blue-300 transition-colors"
                        >
                          Orarul
                        </button>
                        {' '}și alege o oră. Completează datele tale și te contactăm noi pentru a stabili ziua și ora.
                      </>
                    ) : (
                      <>
                        Check our{' '}
                        <button
                          type="button"
                          onClick={() => setShowSchedule((v) => !v)}
                          className="text-blue-400 font-semibold underline underline-offset-2 hover:text-blue-300 transition-colors"
                        >
                          Schedule
                        </button>
                        {' '}and pick a time. Fill in your details and we'll reach out to schedule your session.
                      </>
                    )}
                  </p>
                </div>

                {/* Inline schedule panel */}
                <MiniSchedulePopup isOpen={showSchedule} onClose={() => setShowSchedule(false)} />

                {/* Motivational message box */}
                <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
                  <p className="text-sm text-sky-300 leading-relaxed">
                    {language === 'ro' ? (
                      <><span className="italic">"Cel mai greu lucru din CrossFit nu e antrenamentul, ci să intri pe ușă pentru prima dată."</span> Nu mai sta pe gânduri! <strong>Prima ta ședință e gratuită.</strong></>
                    ) : (
                      <><span className="italic">"The hardest part of CrossFit isn't the workout, it's walking through the front door for the first time."</span> Stop overthinking it. Your future self will thank you for taking the first step today. <strong>Your first workout is on us.</strong></>
                    )}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-1.5">
                      {t('fullName')} <span className="text-blue-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={t('fullNamePlaceholder')}
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-zinc-800 border border-zinc-600 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition-colors text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-1.5">
                      {t('email')} <span className="text-blue-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder={t('emailPlaceholder')}
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-zinc-800 border border-zinc-600 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition-colors text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-1.5">
                      {t('phone')}
                    </label>
                    <input
                      type="tel"
                      placeholder={t('phonePlaceholder')}
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full bg-zinc-800 border border-zinc-600 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition-colors text-sm"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={sending}
                    className="w-full bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white font-bold rounded-xl py-3 text-base mt-2"
                  >
                    {sending
                      ? t('sending')
                      : language === 'ro' ? 'Trimite Cererea' : 'Send My Request'}
                  </Button>
                </form>
              </>
            ) : (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🎉</span>
                </div>
                <h3 className="text-2xl font-black text-white mb-2">{t('thank')}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">{t('thankDesc')}</p>
                <Button
                  onClick={handleClose}
                  className="bg-zinc-700 hover:bg-zinc-600 text-white font-semibold rounded-xl px-6"
                >
                  {language === 'ro' ? 'Închide' : 'Close'}
                </Button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}