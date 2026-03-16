import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useLanguage } from '../LanguageProvider';
import { CONTACT_EMAIL } from '../config';
import MiniSchedulePopup from './MiniSchedulePopup';

export default function BookFreeSessionModal({ isOpen, onClose }) {
  const { t, language } = useLanguage();
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [showSchedule, setShowSchedule] = useState(true);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [userMessage, setUserMessage] = useState('');
  const [emailBlurred, setEmailBlurred] = useState(false);

  const nameRef = useRef(null);
  const messageRef = useRef(null);

  const isRo = language === 'ro';

  // Check if current time is within unavailable window (22:30 - 6:00)
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentTimeInMinutes = currentHour * 60 + currentMinute;
  const unavailableStart = 22 * 60 + 30; // 22:30
  const unavailableEnd = 6 * 60; // 6:00
  const isUnavailable = currentTimeInMinutes >= unavailableStart || currentTimeInMinutes < unavailableEnd;

  const whatsappPhone = '40744798429';
  const whatsappText = encodeURIComponent(
    isRo
      ? `Bună! Mă numesc ${form.name.trim() || '...'} și aș dori să rezerv o ședință gratuită${selectedSlot ? ` ${selectedSlot.day} la ${selectedSlot.time}` : ''}. Email: ${form.email}${form.phone ? `. Telefon: ${form.phone}` : ''}.${userMessage.trim() ? ` ${userMessage.trim()}` : ''}`
      : `Hi! My name is ${form.name.trim() || '...'} and I would like to book a free session${selectedSlot ? ` on ${selectedSlot.day} at ${selectedSlot.time}` : ''}. Email: ${form.email}${form.phone ? `. Phone: ${form.phone}` : ''}.${userMessage.trim() ? ` ${userMessage.trim()}` : ''}`
  );
  const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${whatsappText}`;

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email);
  const canSend = form.name.trim() && isValidEmail && selectedSlot;

  // Compute the actual date for the selected slot
  const getSlotDate = (slot) => {
    if (!slot) return null;
    const now = new Date();
    const jsDay = now.getDay();
    const diffToMon = jsDay === 0 ? -6 : 1 - jsDay;
    const mon = new Date(now);
    mon.setDate(now.getDate() + diffToMon + (slot.weekOffset || 0) * 7);
    mon.setHours(0, 0, 0, 0);
    const dayNames = isRo
      ? ['Luni', 'Marți', 'Miercuri', 'Joi', 'Vineri', 'Sâmbătă']
      : ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayIndex = dayNames.findIndex(d => d.toLowerCase() === slot.day.toLowerCase());
    const slotDate = new Date(mon);
    slotDate.setDate(mon.getDate() + (dayIndex >= 0 ? dayIndex : 0));
    return slotDate;
  };

  const slotDate = getSlotDate(selectedSlot);
  const slotDateStr = slotDate
    ? `${slotDate.getDate().toString().padStart(2, '0')}.${(slotDate.getMonth() + 1).toString().padStart(2, '0')}`
    : '';

  // Build the auto-prefix for the message box
  const messagePrefix = selectedSlot && form.name.trim()
    ? isRo
      ? `Bună! Mă numesc ${form.name.trim()} și aș dori să rezerv o ședință gratuită ${selectedSlot.day}${slotDateStr ? ` (${slotDateStr})` : ''} la ${selectedSlot.time}. `
      : `Hi! My name is ${form.name.trim()} and I would like to book a free session on ${selectedSlot.day}${slotDateStr ? ` (${slotDateStr})` : ''} at ${selectedSlot.time}. `
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

  const handleSlotSelect = (day, time, weekOffset) => {
    if (selectedSlot && selectedSlot.day === day && selectedSlot.time === time && selectedSlot.weekOffset === weekOffset) {
      setSelectedSlot(null);
    } else {
      setSelectedSlot({ day, time, weekOffset });
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
      await fetch('https://api.unbrokenspirit.ro/email/send/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: CONTACT_EMAIL,
          subject: isRo ? `Rezervare Ședință Gratuită - ${form.name}` : `Free Session Booking - ${form.name}`,
          body: `${isRo ? 'Nume' : 'Name'}: ${form.name}\n${isRo ? 'Email' : 'Email'}: ${form.email}\n${isRo ? 'Telefon' : 'Phone'}: ${form.phone || (isRo ? 'Necompletat' : 'Not provided')}\n\n${isRo ? 'Mesaj' : 'Message'}:\n${fullMessage}`
        })
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
    setShowSchedule(true);
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
                   <h2 className="text-lg font-black text-white mb-0.5 leading-snug">
                     {isRo ? (
                       <>
                         <span className="text-amber-400">Dacă NU ai mai făcut CrossFit până acum,</span>
                         {' rezervă o '}
                         <span className="font-black">Clasă Gratuită</span>
                       </>
                     ) : (
                       <>
                         <span className="text-amber-400">If you have NEVER done CrossFit before,</span>
                         <br />
                         {'book a '}
                         <span className="font-black">Free Class</span>
                       </>
                     )}
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
                          <span className="text-white font-bold"> *</span>
                          {' '}și alege o clasă.
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
                          <span className="text-white font-bold"> *</span>
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
                        <div className="mb-2 p-2 bg-blue-500/10 border border-blue-500/30 rounded-xl">
                          <p className="text-xs text-sky-300 leading-relaxed">
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

                  <form onSubmit={handleSubmit} className="space-y-2">
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1">
                        {t('fullName')} <span className="text-blue-400">*</span>
                      </label>
                      <input
                        ref={nameRef}
                        type="text"
                        required
                        placeholder={t('fullNamePlaceholder')}
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full bg-zinc-800 border border-zinc-600 rounded-lg px-3 py-2 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition-[border-color] duration-150 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1">
                        {t('email')} <span className="text-blue-400">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder={t('emailPlaceholder')}
                        value={form.email}
                        onChange={(e) => { setForm({ ...form, email: e.target.value }); setEmailBlurred(false); }}
                        onBlur={() => setEmailBlurred(true)}
                        className="w-full bg-zinc-800 border border-zinc-600 rounded-lg px-3 py-2 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition-[border-color] duration-150 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1">
                        {t('phone')}
                      </label>
                      <input
                        type="tel"
                        placeholder={t('phonePlaceholder')}
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full bg-zinc-800 border border-zinc-600 rounded-lg px-3 py-2 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition-[border-color] duration-150 text-sm"
                      />
                    </div>

                    {/* Dynamic message box */}
                    <AnimatePresence>
                      {showMessageBox && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ type: 'spring', damping: 26, stiffness: 300 }}
                          className="overflow-hidden"
                        >
                          <label className="block text-xs font-semibold text-gray-300 mb-1">
                            {isRo ? 'Mesaj' : 'Message'}
                          </label>
                          <div className="relative w-full bg-zinc-800 border border-zinc-600 rounded-lg px-3 py-2 focus-within:border-blue-500 transition-colors">
                            <p className="text-xs text-white mb-1 leading-relaxed">{messagePrefix}</p>
                            <textarea
                              ref={messageRef}
                              value={userMessage}
                              onChange={(e) => setUserMessage(e.target.value)}
                              rows={1}
                              placeholder={
                                isRo
                                  ? 'Adaugă detalii suplimentare...'
                                  : 'Add any extra details...'
                              }
                              className="w-full bg-transparent text-white placeholder-zinc-500 placeholder:italic outline-none resize-none text-xs"
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* WhatsApp deeplink — enabled only when canSend and not during unavailable hours */}
                    {isUnavailable ? (
                      <TooltipProvider delayDuration={100}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="w-full">
                              <button
                                disabled
                                className="w-full flex items-center justify-center gap-2 border font-bold rounded-lg py-2 text-sm transition-all duration-150 mt-1 bg-zinc-800 border-zinc-700 text-zinc-600 cursor-not-allowed"
                              >
                                <MessageCircle className="w-4 h-4 flex-shrink-0" />
                                {isRo ? 'Rezervă mai rapid pe WhatsApp' : 'Book faster via WhatsApp'}
                              </button>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent side="top" sideOffset={4} className="z-[200] bg-zinc-800 border border-zinc-700 text-zinc-300 text-xs">
                            {isRo ? 'Indisponibil între 22:30-6:00' : 'Unavailable between 22:30-6:00'}
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ) : (
                      <a
                        href={canSend ? whatsappUrl : undefined}
                        target={canSend ? '_blank' : undefined}
                        rel="noopener noreferrer"
                        aria-disabled={!canSend}
                        onClick={canSend ? undefined : (e) => e.preventDefault()}
                        className={`flex items-center justify-center gap-2 w-full border font-bold rounded-lg py-2 text-sm transition-all duration-150 mt-1 ${
                          canSend
                            ? 'bg-[#25D366]/10 hover:bg-[#25D366]/20 border-[#25D366]/40 hover:border-[#25D366]/70 text-[#25D366] cursor-pointer'
                            : 'bg-zinc-800 border-zinc-700 text-zinc-600 cursor-not-allowed'
                        }`}
                      >
                        <MessageCircle className="w-4 h-4 flex-shrink-0" />
                        {isRo ? 'Rezervă mai rapid pe WhatsApp' : 'Book faster via WhatsApp'}
                      </a>
                    )}

                    <Button
                      type="submit"
                      disabled={sending || !canSend}
                      className="w-full bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white font-bold rounded-lg py-2 text-sm mt-1 disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none"
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