import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { base44 } from "@/api/base44Client";
import { toast } from "sonner";
import { useLanguage } from '../LanguageProvider';
import { CONTACT_EMAIL } from '../config';
import MiniSchedulePopup from './MiniSchedulePopup';

export default function BookFreeSessionModal({ isOpen, onClose }) {
  const { t, language } = useLanguage();
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [userMessage, setUserMessage] = useState('');
  const [emailBlurred, setEmailBlurred] = useState(false);
  const nameRef = useRef(null);
  const messageRef = useRef(null);

  const isRo = language === 'ro';
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email);
  const canSend = form.name.trim() && isValidEmail;

  // Build the auto-prefix for the message box
  const messagePrefix = selectedSlot && form.name.trim()
    ? isRo
      ? `Bună! Mă numesc ${form.name.trim()} și aș dori să rezerv o ședință gratuită ${selectedSlot.day} la ${selectedSlot.time}. `
      : `Hi! My name is ${form.name.trim()} and I would like to book a free session on ${selectedSlot.day} at ${selectedSlot.time}. `
    : '';

  // Only show message box after email field is blurred AND valid
  const showMessageBox = selectedSlot && form.name.trim() && isValidEmail && emailBlurred;
  const prevShowMessageBox = useRef(false);

  // Only focus the textarea when the message box first appears
  useEffect(() => {
    if (showMessageBox && !prevShowMessageBox.current && messageRef.current) {
      const ta = messageRef.current;
      ta.focus();
      const pos = messagePrefix.length + userMessage.length;
      ta.setSelectionRange(pos, pos);
    }
    prevShowMessageBox.current = showMessageBox;
  }, [showMessageBox]);

  const handleSlotSelect = (day, time) => {
    if (selectedSlot && selectedSlot.day === day && selectedSlot.time === time) {
      setSelectedSlot(null);
    } else {
      setSelectedSlot({ day, time });
      setTimeout(() => {
        if (nameRef.current) nameRef.current.focus();
      }, 50);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSend) return;
    setSending(true);
    const fullMessage = messagePrefix + userMessage;
    try {
      await base44.entities.ContactSubmission.create({
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: fullMessage,
        status: 'new',
      });
      await base44.integrations.Core.SendEmail({
        to: CONTACT_EMAIL,
        subject: isRo ? `Rezervare Ședință Gratuită - ${form.name}` : `Free Session Booking - ${form.name}`,
        body: `${isRo ? 'Nume' : 'Name'}: ${form.name}
${isRo ? 'Email' : 'Email'}: ${form.email}
${isRo ? 'Telefon' : 'Phone'}: ${form.phone || (isRo ? 'Necompletat' : 'Not provided')}

${isRo ? 'Mesaj' : 'Message'}:
${fullMessage}`,
      });
      setSending(false);
      setSubmitted(true);
    } catch (error) {
      setSending(false);
      toast.error(isRo ? 'Eroare la trimitere. Încercați din nou.' : 'Error sending request. Please try again.');
    }
  };

  const handleClose = () => {
    setSubmitted(false);
    setForm({ name: '', email: '', phone: '' });
    setSelectedSlot(null);
    setUserMessage('');
    setShowSchedule(false);
    setEmailBlurred(false);
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
            className="relative w-full max-w-md bg-zinc-900 border border-zinc-700 rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 sm:p-8">
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
                      {isRo ? 'Rezervă o Ședință Gratuită' : 'Book a Free Session'}
                    </h2>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {isRo ? (
                        <>
                          Verifică{' '}
                          <button
                            type="button"
                            onClick={() => setShowSchedule((v) => !v)}
                            className="text-blue-400 font-semibold underline underline-offset-2 hover:text-blue-300 transition-colors"
                          >
                            Orarul
                          </button>
                          {' '}și alege o oră. Completează-ți datele și te așteptăm la sală!
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
                  <MiniSchedulePopup
                    isOpen={showSchedule}
                    onClose={() => setShowSchedule(false)}
                    selectedSlot={selectedSlot}
                    onSlotSelect={handleSlotSelect}
                  />

                  {/* Motivational message box */}
                  <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
                    <p className="text-sm text-sky-300 leading-relaxed">
                      {isRo ? (
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
                        ref={nameRef}
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
                        onBlur={() => setEmailBlurred(true)}
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

                    {/* Dynamic message box — only shown when slot + name + email filled and email blurred */}
                    <AnimatePresence>
                      {showMessageBox && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ type: 'spring', damping: 26, stiffness: 300 }}
                          className="overflow-hidden"
                        >
                          <label className="block text-sm font-semibold text-gray-300 mb-1.5">
                            {isRo ? 'Mesaj' : 'Message'}
                          </label>
                          <div className="relative w-full bg-zinc-800 border border-zinc-600 rounded-xl px-4 py-3 focus-within:border-blue-500 transition-colors">
                            <p className="text-sm text-white mb-1 leading-relaxed">{messagePrefix}</p>
                            <textarea
                              ref={messageRef}
                              value={userMessage}
                              onChange={(e) => setUserMessage(e.target.value)}
                              rows={2}
                              placeholder={
                                isRo
                                  ? 'Continuă să scrii dacă ai ceva de adăugat sau trimite cererea.'
                                  : 'Continue writing if you have anything else to add, or send your request.'
                              }
                              className="w-full bg-transparent text-white placeholder-zinc-500 placeholder:italic outline-none resize-none text-sm"
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <Button
                      type="submit"
                      disabled={sending || !canSend}
                      className="w-full bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white font-bold rounded-xl py-3 text-base mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {sending
                        ? t('sending')
                        : isRo ? 'Trimite Cererea' : 'Send My Request'}
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
                    {isRo ? 'Închide' : 'Close'}
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}