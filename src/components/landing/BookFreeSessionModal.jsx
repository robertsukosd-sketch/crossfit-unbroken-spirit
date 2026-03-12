import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle } from 'lucide-react';
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

  const whatsappPhone = '40748838767'; // PHONE_1 without + and spaces
  const whatsappText = encodeURIComponent(
    isRo
      ? 'Bună! Aș dori să rezerv o ședință gratuită la CrossFit Unbroken Spirit.'
      : 'Hi! I would like to book a free session at CrossFit Unbroken Spirit.'
  );
  const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${whatsappText}`;

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email);
  const canSend = form.name.trim() && isValidEmail && selectedSlot;

  // Build the auto-prefix for the message box
  const messagePrefix = selectedSlot && form.name.trim()
    ? isRo
      ? `Bună! Mă numesc ${form.name.trim()} și aș dori să rezerv o ședință gratuită ${selectedSlot.day} la ${selectedSlot.time}. `
      : `Hi! My name is ${form.name.trim()} and I would like to book a free session on ${selectedSlot.day} at ${selectedSlot.time}. `
    : '';

  // Show message box only after email field is blurred with a valid email
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
    setEmailBlurred(false);
    setShowSchedule(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-4 bg-black/70 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 24 }}
            transition={{ type: 'spring', damping: 22, stiffness: 280 }}
            className="relative w-full sm:max-w-md bg-zinc-900 border border-zinc-700 rounded-t-2xl sm:rounded-2xl shadow-2xl max-h-[92vh] overflow-y-auto overflow-x-hidden min-w-0"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-3 sm:p-5">
             <button
               onClick={handleClose}
               className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors duration-150 p-1 rounded-full hover:bg-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 cursor-pointer"
               aria-label="Close"
             >
               <X className="w-4 h-4" />
             </button>

             {!submitted ? (
               <>
                 <div className="mb-2">
                   <h2 className="text-lg font-black text-white mb-0.5">
                     {isRo ? 'Rezervă o Clasă Gratuită' : 'Book a Free Class'}
                   </h2>
                   <p className="text-gray-400 text-xs leading-relaxed">
                      {isRo ? (
                        <>
                          <button
                            type="button"
                            onClick={() => {
                              handleClose();
                              setTimeout(() => {
                                sessionStorage.setItem('openFaqId', 'parking');
                                window.dispatchEvent(new Event('openFaqEvent'));
                              }, 50);
                            }}
                            className="text-blue-400 font-semibold underline underline-offset-2 hover:text-blue-300 transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded"
                          >
                            Vezi cum ajungi la sală
                          </button>
                          {', verifică '}
                          <button
                            type="button"
                            onClick={() => setShowSchedule((v) => !v)}
                            className="text-blue-400 font-semibold underline underline-offset-2 hover:text-blue-300 transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded"
                          >
                            Orarul
                          </button>
                          {' '}și alege un interval orar.
                        </>
                      ) : (
                        <>
                          <button
                            type="button"
                            onClick={() => {
                              handleClose();
                              setTimeout(() => {
                                sessionStorage.setItem('openFaqId', 'parking');
                                window.dispatchEvent(new Event('openFaqEvent'));
                              }, 50);
                            }}
                            className="text-blue-400 font-semibold underline underline-offset-2 hover:text-blue-300 transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded"
                          >
                            See how you can get to the box
                          </button>
                          {', check the '}
                          <button
                            type="button"
                            onClick={() => setShowSchedule((v) => !v)}
                            className="text-blue-400 font-semibold underline underline-offset-2 hover:text-blue-300 transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded"
                          >
                            Schedule
                          </button>
                          {' '}and pick a time slot.
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

                  {/* Motivational nudge — shown after slot selected */}
                  <AnimatePresence>
                    {selectedSlot && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ type: 'spring', damping: 26, stiffness: 300 }}
                        className="overflow-hidden"
                      >
                        <div className="mb-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded-xl">
                          <p className="text-sm text-sky-300 leading-relaxed">
                            {isRo ? (
                              <><span className="italic">"Cel mai greu lucru din CrossFit nu e antrenamentul, ci să intri pe ușă pentru prima dată."</span> Nu mai sta pe gânduri! <strong>Prima ta ședință e gratuită.</strong></>
                            ) : (
                              <><span className="italic">"The hardest part of CrossFit isn't the workout, it's walking through the front door for the first time."</span> Stop overthinking it. <strong>Your first workout is on us.</strong></>
                            )}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <form onSubmit={handleSubmit} className="space-y-3">
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
                        className="w-full bg-zinc-800 border border-zinc-600 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition-[border-color] duration-150 text-sm"
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
                        onChange={(e) => { setForm({ ...form, email: e.target.value }); setEmailBlurred(false); }}
                        onBlur={() => setEmailBlurred(true)}
                        className="w-full bg-zinc-800 border border-zinc-600 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition-[border-color] duration-150 text-sm"
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
                        className="w-full bg-zinc-800 border border-zinc-600 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition-[border-color] duration-150 text-sm"
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

                    {/* WhatsApp deeplink — enabled only when canSend */}
                    <a
                      href={canSend ? whatsappUrl : undefined}
                      target={canSend ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      aria-disabled={!canSend}
                      onClick={canSend ? undefined : (e) => e.preventDefault()}
                      className={`flex items-center justify-center gap-2.5 w-full border font-bold rounded-xl py-3 text-sm transition-all duration-150 mt-2 ${
                        canSend
                          ? 'bg-[#25D366]/10 hover:bg-[#25D366]/20 border-[#25D366]/40 hover:border-[#25D366]/70 text-[#25D366] cursor-pointer'
                          : 'bg-zinc-800 border-zinc-700 text-zinc-600 cursor-not-allowed'
                      }`}
                    >
                      <MessageCircle className="w-5 h-5 flex-shrink-0" />
                      {isRo ? 'Rezervă pe WhatsApp' : 'Book via WhatsApp'}
                    </a>

                    <Button
                      type="submit"
                      disabled={sending || !canSend}
                      className="w-full bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white font-bold rounded-xl py-3 text-base mt-2 disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none"
                    >
                      {sending
                        ? t('sending')
                        : isRo ? 'Rezervă pe E-Mail' : 'Send My Request by E-Mail'}
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