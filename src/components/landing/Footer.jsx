import React from 'react';
import { Dumbbell, Instagram, Facebook, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-black border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-sky-500 flex items-center justify-center">
                <Dumbbell className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-black text-white">CROSSFIT</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Comunitatea ta de fitness. Antrenamente funcționale de înaltă intensitate 
              pentru rezultate reale.
            </p>
            <div className="flex gap-4">
              <a 
                href="#" 
                className="w-10 h-10 rounded-lg bg-zinc-900 flex items-center justify-center hover:bg-blue-500 transition-colors group"
              >
                <Instagram className="w-5 h-5 text-gray-400 group-hover:text-white" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-lg bg-zinc-900 flex items-center justify-center hover:bg-blue-500 transition-colors group"
              >
                <Facebook className="w-5 h-5 text-gray-400 group-hover:text-white" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-4">Link-uri Rapide</h4>
            <ul className="space-y-3">
              {['Acasă', 'Programe', 'Prețuri', 'Orar', 'Contact'].map((link) => (
                <li key={link}>
                  <a 
                    href={`#${link.toLowerCase().replace('ă', 'a').replace('ț', 't')}`}
                    className="text-gray-400 hover:text-blue-400 transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-gray-400">
                <MapPin className="w-4 h-4 text-sky-400 flex-shrink-0" />
                <span>Strada Fitness Nr. 10, București</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Phone className="w-4 h-4 text-sky-400 flex-shrink-0" />
                <span>+40 722 123 456</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Mail className="w-4 h-4 text-sky-400 flex-shrink-0" />
                <span>contact@crossfit.ro</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {currentYear} CrossFit. Toate drepturile rezervate.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-500 text-sm hover:text-blue-400 transition-colors">
              Termeni și Condiții
            </a>
            <a href="#" className="text-gray-500 text-sm hover:text-blue-400 transition-colors">
              Politica de Confidențialitate
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}