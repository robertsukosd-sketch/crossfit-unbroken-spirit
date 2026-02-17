import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, Instagram, Facebook, CheckCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { base44 } from '@/api/base44Client';
import { toast } from "sonner";

const contactInfo = [
  {
    icon: MapPin,
    title: "Adresă",
    details: ["Splaiul Unirii 257-259", "Sector 3, București"]
  },
  {
    icon: Phone,
    title: "Telefon",
    details: ["+40 748 838 767", "+40 740 269 769"]
  },
  {
    icon: Mail,
    title: "Email",
    details: ["contact@crossfit.ro"]
  },
  {
    icon: Clock,
    title: "Program",
    details: ["L-V: 07:00 - 20:30", "S: 09:00 - 11:30", "D: Închis"]
  }
];

export default function ContactSection() {
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
    
    await base44.entities.ContactSubmission.create(formData);
    
    setIsSubmitted(true);
    setFormData({ name: '', email: '', phone: '', message: '' });
    toast.success('Mesajul a fost trimis cu succes!');
    setIsSubmitting(false);
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
            Contact
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mt-3 mb-6">
            Hai să <span className="text-blue-500">Vorbim</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Ai întrebări? Vrei să încerci o clasă gratuită?<br />
            Scrie-ne și te contactăm în cel mai scurt timp.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="grid sm:grid-cols-2 gap-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4">
                    <info.icon className="w-6 h-6 text-sky-400" />
                  </div>
                  <h4 className="text-white font-bold mb-2">{info.title}</h4>
                  {info.details.map((detail, i) => (
                    <p key={i} className="text-gray-400 text-sm">{detail}</p>
                  ))}
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <div className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800">
              <h4 className="text-white font-bold mb-4">Urmărește-ne</h4>
              <div className="flex gap-4">
                <a 
                  href="https://www.instagram.com/crossfit.unbroken.spirit" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center hover:scale-110 transition-transform"
                >
                  <Instagram className="w-6 h-6 text-white" />
                </a>
                <a 
                  href="https://www.facebook.com/profile.php?id=61588232038424" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center hover:scale-110 transition-transform"
                >
                  <Facebook className="w-6 h-6 text-white" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
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
                  <h3 className="text-2xl font-bold text-white mb-3">Mulțumim!</h3>
                  <p className="text-gray-400 mb-6">
                    Am primit mesajul tău. Te vom contacta în curând.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setIsSubmitted(false)}
                    className="border-zinc-700 text-white hover:bg-zinc-800"
                  >
                    Trimite Alt Mesaj
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Nume Complet *
                    </label>
                    <Input
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Ion Popescu"
                      className="bg-zinc-800 border-zinc-700 text-white placeholder:text-gray-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Email *
                      </label>
                      <Input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="ion@email.com"
                        className="bg-zinc-800 border-zinc-700 text-white placeholder:text-gray-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Telefon
                      </label>
                      <Input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        placeholder="+40 722 123 456"
                        className="bg-zinc-800 border-zinc-700 text-white placeholder:text-gray-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Mesaj *
                    </label>
                    <Textarea
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      placeholder="Cu ce te putem ajuta?"
                      rows={5}
                      className="bg-zinc-800 border-zinc-700 text-white placeholder:text-gray-500 focus:border-red-500 resize-none"
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white py-6 text-lg font-bold rounded-full"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Se trimite...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="w-5 h-5" />
                        Trimite Mesajul
                      </span>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}