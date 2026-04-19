import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, Instagram, Facebook, CheckCircle, MessageCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { base44 } from '@/api/base44Client';
import { toast } from "sonner";
import { useLanguage } from '../LanguageProvider';
import ThunderWodBox from '../landing/ThunderWodBox';
import { CONTACT_EMAIL, PHONE_1, PHONE_2, GYM_ADDRESS } from '../config';

const GOOGLE_MAPS_URL = "https://www.google.com/maps/search/Splaiul+Unirii+257-259+Bucuresti";

const getContactInfo = (t) => [
  {
    icon: MapPin,
    title: t("address"),
    details: [GYM_ADDRESS.split(', ')[0], t("locationCity")],
    isAddress: true
  },
  {
    icon: Phone,
    title: t("phone"),
    details: [PHONE_1, PHONE_2]
  },
  {
    icon: Mail,
    title: t("email"),
    details: [CONTACT_EMAIL]
  },
  {
    icon: Clock,
    title: t("schedule_label"),
    details: [t("hours"), t("hoursSaturday"), t("hoursSunday")]
  }
];

const QUICK_LINKS = [
  { labelKey: 'home', href: '#hero' },
  { labelKey: 'programs', href: '#programs' },
  { labelKey: 'pricing', href: '#pricing' },
  { labelKey: 'schedule', href: '#schedule' },
  { labelKey: 'contact', href: '#contact' }
];

export default function ContactSection() {
  const { t, language } = useLanguage();
  const contactInfo = getContactInfo(t);
  const gclid = sessionStorage.getItem('gclid') || '';
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = language === 'ro' ? 'Numele este obligatoriu' : 'Name is required';
    if (!formData.email.trim()) newErrors.email = language === 'ro' ? 'Email-ul este obligatoriu' : 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = language === 'ro' ? 'Email invalid' : 'Invalid email';
    if (!formData.message.trim()) newErrors.message = language === 'ro' ? 'Mesajul este obligatoriu' : 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    const isRo = language === 'ro';
    
    try {
      const response = await fetch('https://api.unbrokenspirit.ro/email/send/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: CONTACT_EMAIL,
          subject: isRo ? `Mesaj nou de la ${formData.name}` : `New message from ${formData.name}`,
          body: `${isRo ? 'Nume' : 'Name'}: ${formData.name}\n${isRo ? 'Email' : 'Email'}: ${formData.email}\n${isRo ? 'Telefon' : 'Phone'}: ${formData.phone || '-'}${gclid ? `\nGCLID: ${gclid}` : ''}\n\n${isRo ? 'Mesaj' : 'Message'}:\n${formData.message}`
        })
      });
      
      if (!response.ok) throw new Error(`API error: ${response.status}`);
      
      setIsSubmitted(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
      setErrors({});
      toast.success(isRo ? 'Mesajul a fost trimis cu succes!' : 'Message sent successfully!');
    } catch (error) {
      toast.error(isRo ? 'Eroare la trimiterea mesajului. Încercați din nou.' : 'Error sending message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-zinc-950 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tl from-blue-600/10 to-transparent rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sky-400 font-semibold tracking-wider uppercase text-sm">
            {t("contact")}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mt-3 mb-6 leading-tight">
            {t("contactTitlePrefix")} <span className="text-blue-500">{t("contactTitleHighlight")}</span>
          </h2>

        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 h-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="h-full"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-zinc-900/50 rounded-xl p-3 sm:p-4 border border-zinc-800 flex flex-row items-start gap-3"
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <info.icon className="w-4 h-4 text-sky-400" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-white font-bold text-xs sm:text-sm mb-1">{info.title}</h4>
                    {info.details.map((detail, i) => {
                      if (detail.startsWith('+')) {
                        return <a key={i} href={`tel:${detail.replace(/\s/g, '')}`} className="text-gray-400 text-xs hover:text-sky-400 transition-colors block break-words">{detail}</a>;
                      }
                      if (detail.includes('@')) {
                        return <a key={i} href={`mailto:${detail}`} className="text-gray-400 text-xs hover:text-sky-400 transition-colors block break-words">{detail}</a>;
                      }
                      if (info.isAddress) {
                        return <a key={i} href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer" className="text-gray-400 text-xs hover:text-sky-400 transition-colors block break-words">{detail}</a>;
                      }
                      return <p key={i} className="text-gray-400 text-xs break-words">{detail}</p>;
                    })}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="bg-zinc-900/50 rounded-2xl p-8 border border-zinc-800">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8 sm:py-12"
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-green-500" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">{t("thank")}</h3>
                  <p className="text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base hidden sm:block">
                  {t("thankDesc")}
                  </p>
                  <p className="text-gray-300 mb-4 sm:mb-6 text-sm sm:hidden">
                  {t("thankDescMobile")}
                  </p>
                  <Button
                  variant="outline"
                  onClick={() => setIsSubmitted(false)}
                  className="border-zinc-700 text-blue-500 hover:bg-zinc-800 text-sm sm:text-base"
                  >
                  {t("sendAnother")}
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="contact-name" className="block text-sm font-medium text-gray-300 mb-2 focus-within:text-blue-400">
                      {t("fullName")} *
                    </label>
                    <Input
                      id="contact-name"
                      required
                      minLength={2}
                      maxLength={100}
                      value={formData.name}
                      onChange={(e) => { setFormData({...formData, name: e.target.value}); if(errors.name) setErrors({...errors, name: ''})}}
                      placeholder={t("fullNamePlaceholder")}
                      className={`bg-zinc-800 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500 ${errors.name ? 'border-red-500 focus:border-red-500' : 'border-zinc-600'}`}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                    />
                    {errors.name && <p id="name-error" className="text-red-400 text-xs mt-1">{errors.name}</p>}
                  </div>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-email" className="block text-sm font-medium text-gray-300 mb-2 focus-within:text-blue-400">
                        {t("email")} *
                      </label>
                      <Input
                        id="contact-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => { setFormData({...formData, email: e.target.value}); if(errors.email) setErrors({...errors, email: ''})}}
                        placeholder={t("emailPlaceholder")}
                        className={`bg-zinc-800 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500 ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-zinc-600'}`}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                      />
                      {errors.email && <p id="email-error" className="text-red-400 text-xs mt-1">{errors.email}</p>}
                    </div>
                    <div>
                      <label htmlFor="contact-phone" className="block text-sm font-medium text-gray-300 mb-2 focus-within:text-blue-400">
                        {t("phone")}
                      </label>
                      <Input
                        id="contact-phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        placeholder={t("phonePlaceholder")}
                        className="bg-zinc-800 border-zinc-600 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="contact-message" className="block text-sm font-medium text-gray-300 mb-2 focus-within:text-blue-400">
                      {t("message")} *
                    </label>
                    <Textarea
                      id="contact-message"
                      required
                      minLength={10}
                      maxLength={1000}
                      value={formData.message}
                      onChange={(e) => { setFormData({...formData, message: e.target.value}); if(errors.message) setErrors({...errors, message: ''})}}
                      placeholder={t("messagePlaceholder")}
                      rows={5}
                      className={`resize-none focus:border-blue-500 focus:ring-blue-500 placeholder:text-gray-400 text-white bg-zinc-800 ${errors.message ? 'border-red-500 focus:border-red-500' : 'border-zinc-600'}`}
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? 'message-error' : undefined}
                    />
                    {errors.message && <p id="message-error" className="text-red-400 text-xs mt-1">{errors.message}</p>}
                  </div>
                  
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    aria-busy={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white py-6 text-lg font-bold rounded-full focus:outline-none focus:ring-2 focus:ring-sky-300 focus:ring-offset-2 focus:ring-offset-zinc-900 disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        {t("sending")}
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="w-5 h-5" />
                        {t("sendMessage")}
                      </span>
                    )}
                  </Button>

                  {/* WhatsApp quick contact */}
                  {(() => {
                    const now = new Date();
                    const mins = now.getHours() * 60 + now.getMinutes();
                    const isUnavailable = mins >= 22 * 60 + 30 || mins < 6 * 60;
                    const isRo = language === 'ro';
                    const whatsappText = encodeURIComponent(
                      isRo
                        ? `Bună! Mă numesc ${formData.name.trim() || '...'} și aș dori să vă contactez. Email: ${formData.email}${formData.phone ? `. Telefon: ${formData.phone}` : ''}.${formData.message.trim() ? ` ${formData.message.trim()}` : ''}`
                        : `Hi! My name is ${formData.name.trim() || '...'} and I'd like to get in touch. Email: ${formData.email}${formData.phone ? `. Phone: ${formData.phone}` : ''}.${formData.message.trim() ? ` ${formData.message.trim()}` : ''}`
                    );
                    const whatsappUrl = `https://wa.me/40744798429?text=${whatsappText}`;
                    const canSend = formData.name.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);

                    if (isUnavailable) {
                      return (
                        <TooltipProvider delayDuration={100}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="w-full">
                                <button disabled className="w-full flex items-center justify-center gap-2 border font-bold rounded-full py-3 text-sm bg-zinc-800 border-zinc-700 text-zinc-600 cursor-not-allowed">
                                  <MessageCircle className="w-4 h-4 flex-shrink-0" />
                                  {isRo ? 'Contactează-ne pe WhatsApp' : 'Contact us on WhatsApp'}
                                </button>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent side="top" sideOffset={4} className="z-[200] bg-zinc-800 border border-zinc-700 text-zinc-300 text-xs">
                              {isRo ? 'Indisponibil între 22:30-6:00' : 'Unavailable between 22:30-6:00'}
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      );
                    }

                    return (
                      <a
                        href={canSend ? whatsappUrl : undefined}
                        target={canSend ? '_blank' : undefined}
                        rel="noopener noreferrer"
                        aria-disabled={!canSend}
                        onClick={canSend ? undefined : (e) => e.preventDefault()}
                        className={`flex items-center justify-center gap-2 w-full border font-bold rounded-full py-3 text-sm transition-all duration-150 ${
                          canSend
                            ? 'bg-[#25D366]/10 hover:bg-[#25D366]/20 border-[#25D366]/40 hover:border-[#25D366]/70 text-[#25D366] cursor-pointer'
                            : 'bg-zinc-800 border-zinc-700 text-zinc-600 cursor-not-allowed'
                        }`}
                      >
                        <MessageCircle className="w-4 h-4 flex-shrink-0" />
                        {isRo ? 'Contactează-ne pe WhatsApp' : 'Contact us on WhatsApp'}
                      </a>
                    );
                  })()}
                </form>
              )}
            </div>
          </motion.div>
        </div>

        {/* Bottom row: Social Links + ThunderWOD | Map */}
        <div className="grid lg:grid-cols-2 gap-8 mt-10">
          {/* Left column: Social Links + ThunderWOD stacked */}
          <div className="flex flex-col gap-6">
            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="h-40"
            >
              <div className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800 h-full flex flex-col justify-center items-center text-center">
                <h4 className="text-white font-bold mb-4">{t("follow")}</h4>
                <div className="flex gap-4 justify-center">
                  <a 
                   href="https://www.instagram.com/crossfit.unbroken.spirit" 
                   target="_blank"
                   rel="noopener noreferrer"
                   aria-label="Instagram"
                   className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center hover:opacity-90 transition-opacity"
                  >
                   <Instagram aria-hidden="true" className="w-6 sm:w-8 h-6 sm:h-8 text-white" />
                  </a>
                  <a 
                   href="https://www.facebook.com/profile.php?id=61588232038424" 
                   target="_blank"
                   rel="noopener noreferrer"
                   aria-label="Facebook"
                   className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-blue-600 flex items-center justify-center hover:opacity-90 transition-opacity"
                  >
                   <Facebook aria-hidden="true" className="w-6 sm:w-8 h-6 sm:h-8 text-white" />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* ThunderWOD App */}
            <motion.div
              id="thunderwod-app"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <ThunderWodBox />
            </motion.div>
          </div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800 h-[400px] lg:h-auto lg:min-h-[400px]"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1026m!2d26.126472!3d44.408234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b1ff2ad7df5f99%3A0x83693788dcfc4734!2sCrossFit%20Unbroken%20Spirit!5e0!3m2!1sro!2sro!4v1713523200000"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'grayscale(100%) invert(92%) contrast(83%)', minHeight: '400px' }}
              allowFullScreen=""
              loading="lazy"
              title="CrossFit Unbroken Spirit location"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}