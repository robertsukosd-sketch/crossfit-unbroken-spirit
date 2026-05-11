import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '../LanguageProvider';
import { CONTACT_EMAIL, PHONE_1 } from '../config';
import MiniSchedulePopup from './MiniSchedulePopup';

export default function PackageContactModal({ isOpen, onClose, packageName }) {
  const { language } = useLanguage();
  const isRo = language === 'ro';
  const isDropInPackage = packageName === 'Drop In';
  const isPtPackage = packageName?.startsWith('PT - ');
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [selectedSlot, setSelectedSlot] = useState(null);

  const contactText = useMemo(() => {
    const introText = isPtPackage
      ? `Bună! Sunt interesat(ă) de ${packageName} la CrossFit Unbroken Spirit.`
      : isRo ? `Bună! Sunt interesat(ă) de ${packageName || 'Personal Training / Nutriție'}.` : `Hi! I'm interested in ${packageName || 'Personal Training / Nutrition'}.`;
    const lines = [
      introText,
      form.name ? `${isRo ? 'Nume' : 'Name'}: ${form.name}` : '',
      form.email ? `Email: ${form.email}` : '',
      form.phone ? `${isRo ? 'Telefon' : 'Phone'}: ${form.phone}` : '',
      selectedSlot ? `${isRo ? 'Interval ales' : 'Selected slot'}: ${selectedSlot.day}, ${selectedSlot.time}` : '',
      form.message ? `${isRo ? 'Mesaj' : 'Message'}: ${form.message}` : '',
    ].filter(Boolean);
    return lines.join('\n');
  }, [form, isPtPackage, isRo, packageName, selectedSlot]);

  const emailUrl = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(isRo ? `Interes ${packageName || 'PT / Nutriție'}` : `Interested in ${packageName || 'PT / Nutrition'}`)}&body=${encodeURIComponent(contactText)}`;
  const whatsappNumber = isPtPackage ? '40726622011' : isDropInPackage ? '40744798429' : PHONE_1.replace(/\D/g, '');
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(contactText)}`;

  const resetAndClose = () => {
    setForm({ name: '', email: '', phone: '', message: '' });
    setSelectedSlot(null);
    onClose();
  };

  const handleSlotSelect = (day, time, weekOffset) => {
    if (selectedSlot?.day === day && selectedSlot?.time === time && selectedSlot?.weekOffset === weekOffset) {
      setSelectedSlot(null);
    } else {
      setSelectedSlot({ day, time, weekOffset });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[120] flex items-end justify-center bg-black/80 p-0 backdrop-blur-sm sm:items-center sm:p-4"
          onClick={resetAndClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            className="relative w-full max-w-lg rounded-t-2xl border border-zinc-700 bg-zinc-900 p-5 shadow-2xl sm:rounded-2xl sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={resetAndClose}
              className="absolute right-4 top-4 rounded-full p-2 text-gray-400 transition-colors hover:bg-zinc-800 hover:text-white"
              aria-label={isRo ? 'Închide' : 'Close'}
            >
              <X className="h-4 w-4" />
            </button>

            <div className="mb-5 pr-10">
              <p className="text-sm font-semibold uppercase tracking-wider text-sky-400">
                {isRo ? 'Contactează-ne' : 'Contact us'}
              </p>
              <h3 className="mt-2 text-2xl font-black text-white">{packageName}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-400">
                {isRo
                  ? 'Completează detaliile, apoi alege dacă vrei să ne scrii pe email sau WhatsApp.'
                  : 'Fill in your details, then choose email or WhatsApp.'}
              </p>
            </div>

            <div className="space-y-3">
              {isDropInPackage && (
                <MiniSchedulePopup
                  isOpen={true}
                  onClose={() => {}}
                  selectedSlot={selectedSlot}
                  onSlotSelect={handleSlotSelect}
                />
              )}

              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder={isRo ? 'Nume complet' : 'Full name'}
                className="border-zinc-600 bg-zinc-800 text-white placeholder:text-gray-500"
              />
              <div className="grid gap-3 sm:grid-cols-2">
                <Input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="Email"
                  className="border-zinc-600 bg-zinc-800 text-white placeholder:text-gray-500"
                />
                <Input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder={isRo ? 'Telefon' : 'Phone'}
                  className="border-zinc-600 bg-zinc-800 text-white placeholder:text-gray-500"
                />
              </div>
              <Textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder={isDropInPackage ? 'Scrie-ne dacă ai întrebări suplimentare sau nu ai găsit informații relevante pe site.' : isRo ? 'Spune-ne ce obiectiv ai sau ce program te interesează.' : 'Tell us your goal or what package interests you.'}
                rows={4}
                className="resize-none border-zinc-600 bg-zinc-800 text-white placeholder:text-gray-500"
              />

              <div className="grid gap-3 pt-2 sm:grid-cols-2">
                <Button asChild className="rounded-full bg-blue-600 font-bold text-white hover:bg-blue-500">
                  <a href={emailUrl}>
                    <Mail className="h-4 w-4" />
                    {isRo ? 'Trimite email' : 'Send email'}
                  </a>
                </Button>
                <Button asChild className="rounded-full bg-[#25D366] font-bold text-white hover:bg-[#25D366]/90">
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}