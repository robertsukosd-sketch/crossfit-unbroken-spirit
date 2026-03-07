import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, Instagram, Facebook, CheckCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { base44 } from '@/api/base44Client';
import { toast } from "sonner";
import { useLanguage } from '../LanguageProvider';
import ThunderWodBox from '../landing/ThunderWodBox';
import { CONTACT_EMAIL, PHONE_1, PHONE_2, GYM_ADDRESS } from '../config';

const getContactInfo = (t) => [
  {
    icon: MapPin,
    title: t("address"),
    details: [GYM_ADDRESS.split(', ')[0], t("locationCity")]
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
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await base44.entities.ContactSubmission.create(formData);
      const isRo = language === 'ro';
      await base44.integrations.Core.SendEmail({
        to: CONTACT_EMAIL,
        subject: isRo ? `Mesaj nou de la ${formData.name}` : `New message from ${formData.name}`,
        body: `${isRo ? 'Nume' : 'Name'}: ${formData.name}\n${isRo ? 'Email' : 'Email'}: ${formData.email}\n${isRo ? 'Telefon' : 'Phone'}: ${formData.phone || '-'}\n\n${isRo ? 'Mesaj' : 'Message'}:\n${formData.message}`
      });
      
      setIsSubmitted(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
      toast.success(isRo ? 'Mesajul a fost trimis cu succes!' : 'Message sent successfully!');
      setIsSubmitting(false);
    } catch (error) {
      setIsSubmitting(false);
      toast.error(language === 'ro' ? 'Eroare la trimitere. Încercați din nou.' : 'Error sending message. Please try again.');
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
          <p className="text-gray-300 text-lg max-w-2xl mx-auto whitespace-pre-line leading-relaxed">
            {t("contactSubtitle")}
          </p>
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
                        return <a key={i} href={`tel:${detail.replace(/\s/g, '')}`} className="text-gray-400 text-xs truncate hover:text-sky-400 transition-colors block">{detail}</a>;
                      }
                      if (detail.includes('@')) {
                        return <a key={i} href={`mailto:${detail}`} className="text-gray-400 text-xs truncate hover:text-sky-400 transition-colors block">{detail}</a>;
                      }
                      return <p key={i} className="text-gray-400 text-xs truncate">{detail}</p>;
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
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">{t("thank")}</h3>
                  <p className="text-gray-300 mb-6">
                  {t("thankDesc")}
                  </p>
                  <Button
                  variant="outline"
                  onClick={() => setIsSubmitted(false)}
                  className="border-zinc-700 text-blue-500 hover:bg-zinc-800"
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
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder={t("fullNamePlaceholder")}
                      className="bg-zinc-800 border-zinc-600 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500"
                    />
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
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder={t("emailPlaceholder")}
                        className="bg-zinc-800 border-zinc-600 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500"
                      />
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
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      placeholder={t("messagePlaceholder")}
                      rows={5}
                      className="bg-zinc-800 border-zinc-600 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500 resize-none"
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    aria-busy={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white py-6 text-lg font-bold rounded-full"
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
            className="rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800"
            style={{ minHeight: '400px' }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2833.8341894651926!2d26.100449!3d44.394874!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b1ff3e1f1f1f1f%3A0x1f1f1f1f1f1f1f1f!2sSplaiul%20Unirii%20257-259%2C%20Bucuresti!5e0!3m2!1sro!2sro!4v1699999999999!5m2!1sro!2sro"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'grayscale(100%) invert(92%) contrast(83%)', minHeight: '400px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}