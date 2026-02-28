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

const termsContent = (
  <>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aceste Termeni și Condiții guvernează utilizarea site-ului nostru și serviciilor oferite de CrossFit Unbroken Spirit.</p>
    <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Utilizatorul acceptă că utilizarea acestui site se face pe bază de voluntariat și sub răspunderea sa exclusivă.</p>
    <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam. Ne rezervăm dreptul de a modifica acești termeni și condiții în orice moment, iar modificările vor intra în vigoare imediat.</p>
    <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit. Utilizatorul declară că are vârsta minimă legal permisă și că acceptă toate riscurile asociate cu participarea la activitățile noastre fitness.</p>
    <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti. Orice dispută sau reclamație va fi rezolvată conform legilor României și sub jurisdicția instanțelor competente din București.</p>
    <p>Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Pentru orice întrebări referitoare la acești termeni, vă rugăm să ne contactați la train@unbrokenspirit.ro.</p>
  </>
);

export default function Footer() {
  const { t, language } = useLanguage();
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
                 <span>train@unbrokenspirit.ro</span>
               </li>
             </ul>
          </div>
        </div>
        
        {/* Bottom */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {currentYear} CrossFit Unbroken Spirit. {t("copyright")}
          </p>
          <div className="flex flex-wrap justify-center items-center gap-3">
            <button onClick={() => setOpenModal('cookie')} className="text-blue-400 text-sm hover:text-blue-300 transition-colors">
              Cookies
            </button>
            <span className="text-gray-600">|</span>
            <button onClick={() => setOpenModal('gdpr')} className="text-blue-400 text-sm hover:text-blue-300 transition-colors">
              Privacy
            </button>
            <span className="text-gray-600">|</span>
            <button onClick={() => setOpenModal('terms')} className="text-blue-400 text-sm hover:text-blue-300 transition-colors">
              Terms and Conditions
            </button>
            <span className="text-gray-600">|</span>
            <a href="https://anpc.ro" target="_blank" rel="noopener noreferrer" className="text-blue-400 text-sm hover:text-blue-300 transition-colors">
              ANPC
            </a>
          </div>
        </div>
      </div>

      {/* Legal Info */}
      <div className="text-center text-gray-500 text-xs px-6 pb-4">
        {language === 'ro'
          ? 'Toate drepturile rezervate S.C. UNBROKEN CLUB S.R.L., Nr. R.C.: J2025078440006, C.U.I.: RO52691871, Adresa: Bucuresti, Sector 1, Str. Pitar Mos, Nr. 27, la cabinet Av. Stanciu-Burileanu Bogdan, et. 5, ap. 17, Capital social 500 RON.'
          : 'All rights reserved S.C. UNBROKEN CLUB S.R.L., Reg. No.: J2025078440006, VAT: RO52691871, Address: Bucharest, Sector 1, Pitar Mos St., No. 27, at the office of Att. Stanciu-Burileanu Bogdan, 5th floor, apt. 17, Share capital 500 RON.'}
      </div>

      {/* ANPC Badges */}
      <div className="flex flex-row flex-wrap items-center justify-center gap-4 pb-8">
        <a href="https://anpc.ro/ce-este-sal/" target="_blank" rel="nofollow">
          <img style={{width:'250px'}} src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69948c0d6b8aa61f49f0a23d/fdece7d95_anpc-sal.png" alt="Solutionarea Alternativa a Litigiilor" />
        </a>
        <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="nofollow">
          <img style={{width:'250px'}} src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69948c0d6b8aa61f49f0a23d/af3f98021_anpc-sol.png" alt="Solutionarea Online a Litigiilor" />
        </a>
      </div>

      {openModal === 'cookie' && (
        <PolicyModal title={t("cookiePolicy")} content={cookieContent} onClose={() => setOpenModal(null)} closeLabel={language === 'ro' ? 'Închide' : 'Close'} />
      )}
      {openModal === 'gdpr' && (
        <PolicyModal title={t("gdprPolicy")} content={gdprContent} onClose={() => setOpenModal(null)} closeLabel={language === 'ro' ? 'Închide' : 'Close'} />
      )}
      {openModal === 'terms' && (
        <PolicyModal title={language === 'ro' ? 'Termeni și Condiții' : 'Terms and Conditions'} content={termsContent} onClose={() => setOpenModal(null)} closeLabel={language === 'ro' ? 'Închide' : 'Close'} />
      )}
    </footer>
  );
}