import React, { useState } from 'react';
import { Instagram, Facebook, Mail, Phone, MapPin } from 'lucide-react';
import Logo from './Logo';
import { useLanguage } from '../LanguageProvider';
import PolicyModal from './PolicyModal';

const cookieContent = (
  <>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
    <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.</p>
    <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.</p>
    <p>Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit.</p>
  </>
);

const gdprContent = (
  <>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Conform Regulamentului General privind Protecția Datelor (GDPR) nr. 2016/679, avem obligația de a vă informa cu privire la prelucrarea datelor dumneavoastră cu caracter personal.</p>
    <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Datele colectate sunt utilizate exclusiv în scopurile declarate și nu vor fi transmise terților fără consimțământul explicit al utilizatorului.</p>
    <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam. Aveți dreptul de acces, rectificare, ștergere și portabilitate a datelor dumneavoastră personale.</p>
    <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit. Puteți retrage consimțământul în orice moment, fără a afecta legalitatea prelucrării efectuate anterior retragerii acestuia.</p>
    <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti. Pentru exercitarea drepturilor menționate sau pentru orice întrebări legate de prelucrarea datelor, ne puteți contacta la train@unbrokenspirit.ro.</p>
    <p>Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Avem dreptul de a actualiza această politică periodic, iar versiunea actualizată va fi disponibilă pe site-ul nostru.</p>
  </>
);

export default function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();
  const [openModal, setOpenModal] = useState(null); // 'cookie' | 'gdpr' | null
  
  return (
    <footer className="bg-black border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
               <Logo size={48} />
               <div className="text-center">
                 <div className="text-2xl font-black text-sky-400 uppercase">CROSSFIT</div>
                 <div className="text-base font-black text-blue-700 uppercase">UNBROKEN SPIRIT</div>
               </div>
             </div>
            <p className="text-gray-400 mb-6 max-w-md">
              {t("tagline")}
            </p>
            <div className="flex gap-4">
              <a 
                href="https://www.instagram.com/crossfit.unbroken.spirit" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-zinc-900 flex items-center justify-center hover:bg-blue-500 transition-colors group"
              >
                <Instagram className="w-5 h-5 text-gray-400 group-hover:text-white" />
              </a>
              <a 
                href="https://www.facebook.com/profile.php?id=61588232038424" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-zinc-900 flex items-center justify-center hover:bg-blue-500 transition-colors group"
              >
                <Facebook className="w-5 h-5 text-gray-400 group-hover:text-white" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-4">{t("quickLinks")}</h4>
            <ul className="space-y-3">
              {[{label: t("home"), href: "#hero"}, {label: t("programs"), href: "#programs"}, {label: t("pricing"), href: "#pricing"}, {label: t("schedule"), href: "#schedule"}, {label: t("contact"), href: "#contact"}].map((link) => (
                <li key={link.href}>
                  <a 
                    href={link.href}
                    className="text-gray-400 hover:text-blue-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-4">{t("footerContact")}</h4>
            <ul className="space-y-3">
               <li className="flex items-center gap-3 text-gray-400">
                 <MapPin className="w-4 h-4 text-sky-400 flex-shrink-0" />
                 <span>Splaiul Unirii 257-259, Sector 3, București</span>
               </li>
               <li className="flex items-center gap-3 text-gray-400">
                 <Phone className="w-4 h-4 text-sky-400 flex-shrink-0" />
                 <span>+40 748 838 767</span>
               </li>
               <li className="flex items-center gap-3 text-gray-400">
                 <Phone className="w-4 h-4 text-sky-400 flex-shrink-0" />
                 <span>+40 740 269 769</span>
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
            © {currentYear} CrossFit Unbroken Spirit. {t("copyright")}
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-500 text-sm hover:text-blue-400 transition-colors">
              {t("terms")}
            </a>
            <a href="#" className="text-gray-500 text-sm hover:text-blue-400 transition-colors">
              {t("privacy")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}