import React, { useState } from 'react';
import { Instagram, Facebook, Mail, Phone, MapPin } from 'lucide-react';
import Logo from './Logo';
import { useLanguage } from '../LanguageProvider';
import PolicyModal from './PolicyModal';

const getCookieContent = (language) => {
  if (language === 'ro') {
    return (
      <>
        <p><strong>1. Ce sunt Cookie-urile?</strong></p>
        <p>Cookie-urile sunt fișiere mici text stocate pe dispozitivul dumneavoastră (computer, telefon, tabletă) atunci când vizitați site-ul nostru. Acestea conțin informații despre preferințele și comportamentul de navigare, permițând site-ului să vă recunoască și să ofere o experiență personalizată.</p>
        
        <p><strong>2. Tipuri de Cookie-uri pe Care le Folosim</strong></p>
        <p><strong>Cookie-uri Esențiale (Necesare):</strong> Acestea sunt critice pentru funcționarea site-ului. Fără ele, funcții de bază cum ar fi autentificarea și securitatea nu vor funcționa. Nu necesită consimțământul explicit conform legii.</p>
        <p><strong>Cookie-uri de Performanță:</strong> Ne ajută să înțelegem cum utilizatorii interacționează cu site-ul nostru prin colectarea de date anonime despre vizite, pagini vizitate și erori. Utilizăm această informație pentru a îmbunătăți performanța site-ului.</p>
        <p><strong>Cookie-uri Funcționale:</strong> Memorizează preferințele dumneavoastră (limba, zona, etc.) pentru a personaliza experiența de navigare.</p>
        <p><strong>Cookie-uri de Marketing:</strong> Utilizate pentru a urmări comportamentul dumneavoastră și a afișa publicități relevante. Aceste cookie-uri sunt partajate cu parteneri de advertising și necesită consimțământul explicit.</p>
        
        <p><strong>3. Cookie-uri Terților</strong></p>
        <p>Site-ul nostru poate conține cookie-uri terților, cum ar fi de la Google Analytics, pentru a analiza traficul și comportamentul utilizatorilor. Terții pot utiliza aceste informații pentru a afișa publicități pe alte site-uri.</p>
        
        <p><strong>4. Cum Poți Controla Cookie-urile</strong></p>
        <p>Poți controla și șterge cookie-urile prin setările browserului tău. Majoritatea browserelor moderne permit să blochezi cookie-urile sau să primești notificări înainte ca acestea să fie stocate. Rețineți că dezactivarea anumitor cookie-uri poate afecta funcția site-ului.</p>
        
        <p><strong>5. Consimțământul pentru Cookie-uri</strong></p>
        <p>Conform legislației românești și GDPR, te vom cere consimțământul pentru cookie-urile non-esențiale. Poți retrage consimțământul în orice moment din setările de confidențialitate.</p>
        
        <p><strong>6. Retenție și Ștergere</strong></p>
        <p>Cookie-urile esențiale sunt șterse atunci când închizi browserul sau după un anumit período. Cookie-urile funcționale și de marketing pot persista mai mult. Poți șterge manual cookie-urile în orice moment.</p>
        
        <p><strong>7. Contact și Opțiuni de Opt-Out</strong></p>
        <p>Pentru mai multe informații sau pentru a opta din cookie-urile de marketing, contactează-ne la train@unbrokenspirit.ro.</p>
      </>
    );
  }
  return (
    <>
      <p><strong>1. What Are Cookies?</strong></p>
      <p>Cookies are small text files stored on your device (computer, phone, tablet) when you visit our website. They contain information about your preferences and browsing behavior, allowing the website to recognize you and provide a personalized experience.</p>
      
      <p><strong>2. Types of Cookies We Use</strong></p>
      <p><strong>Essential (Necessary) Cookies:</strong> These are critical for website functionality. Without them, basic functions such as authentication and security will not work. They do not require explicit consent under the law.</p>
      <p><strong>Performance Cookies:</strong> They help us understand how users interact with our website by collecting anonymous data about visits, pages viewed, and errors. We use this information to improve website performance.</p>
      <p><strong>Functional Cookies:</strong> Remember your preferences (language, area, etc.) to personalize your browsing experience.</p>
      <p><strong>Marketing Cookies:</strong> Used to track your behavior and display relevant advertisements. These cookies are shared with advertising partners and require explicit consent.</p>
      
      <p><strong>3. Third-Party Cookies</strong></p>
      <p>Our website may contain cookies from third parties, such as Google Analytics, to analyze traffic and user behavior. Third parties may use this information to display advertisements on other websites.</p>
      
      <p><strong>4. How You Can Control Cookies</strong></p>
      <p>You can control and delete cookies through your browser settings. Most modern browsers allow you to block cookies or receive notifications before they are stored. Note that disabling certain cookies may affect website functionality.</p>
      
      <p><strong>5. Consent for Cookies</strong></p>
      <p>In accordance with Romanian legislation and GDPR, we will request your consent for non-essential cookies. You can withdraw consent at any time from privacy settings.</p>
      
      <p><strong>6. Retention and Deletion</strong></p>
      <p>Essential cookies are deleted when you close your browser or after a certain period. Functional and marketing cookies may persist longer. You can manually delete cookies at any time.</p>
      
      <p><strong>7. Contact and Opt-Out Options</strong></p>
      <p>For more information or to opt-out of marketing cookies, contact us at train@unbrokenspirit.ro.</p>
    </>
  );
};

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

const getTermsContent = (language) => {
  if (language === 'ro') {
    return (
      <>
        <p><strong>1. Acceptarea Termenilor și Condiţiilor</strong></p>
        <p>Prin utilizarea site-ului nostru și prin participarea la activitățile oferite de CrossFit Unbroken Spirit, declară că ați citit, înțeles și acceptat acești Termeni și Condiții. Dacă nu sunteți de acord cu oricare dintre acești termeni, vă rugăm să nu vă înregistrați și să nu participați la activitățile noastre.</p>
        
        <p><strong>2. Descrierea Serviciilor</strong></p>
        <p>CrossFit Unbroken Spirit oferă servicii de fitness, antrenament CrossFit, ridică de greutăți și alte activități sportive conexe. Serviciile sunt oferite doar persoanelor care au completat și semnat o declarație medicală și sunt apte din punct de vedere medical să participe la activități fizice intense.</p>
        
        <p><strong>3. Declarația de Sănătate și Asumare de Risc</strong></p>
        <p>Prin participarea la oricare dintre serviciile noastre, acceptați că exercițiul fizic comportă riscuri inerente, inclusiv dar nu limitat la răniri musculare, fracturi, atacuri de cord sau, în cazuri extreme, deces. Declară că sunteți în stare bună de sănătate și că ați consultat un medic înainte de a participa. Nu suntem responsabili pentru accidentele sau bolile care apar în urma participării la activitățile noastre.</p>
        
        <p><strong>4. Vârsta și Capacitate Juridică</strong></p>
        <p>Declarați că sunteți cu vârsta de cel puțin 18 ani și că aveți capacitate juridică deplină pentru a vă angaja în acești termeni. Pentru persoanele sub 18 ani, participarea necesită o autorizație scrisă și semnată de un părent sau tutore legal.</p>
        
        <p><strong>5. Regulile Sălii și Comportament</strong></p>
        <p>Membrii sunt obligați să respecte regulamentul intern al sălii, să nu fumeze, să nu consume alcool sau alte substanțe interzise, să mențină o comportare corespunzătoare și să nu deranjeze alți membri. Utilizarea incorectă a echipamentului sau încălcarea regulilor poate duce la suspendarea sau rezilierea abonamentului fără rambursare.</p>
        
        <p><strong>6. Responsabilitatea Membrilor</strong></p>
        <p>Sunteți responsabil pentru siguranța dumneavoastră și pentru alegerea unui nivel potrivit de exercițiu. Instructorii noștri oferă îndrumări, dar voi aveți responsabilitatea finală de a executa corect exercițiile și de a solicita ajutor atunci când este necesar. Nu vă deplasați niciodată echipamentul fără permisiune și asigurați-vă că este închis/securizat după utilizare.</p>
        
        <p><strong>7. Politica de Plată și Abonamente</strong></p>
        <p>Abonamentele sunt plătite în avans conform perioadei selectate (lunar, trimestrial sau anual). Plățile întârziate pot duce la suspendarea accesului la facilități. Returnarea și rambursarea depind de motivul anulării și sunt reglementate de politica noastră de rambursare detaliată.</p>
        
        <p><strong>8. Anulare și Reziliere</strong></p>
        <p>Aveți dreptul să vă anulați abonamentul cu o notificare scrisă de minimum 30 de zile. Anularea fără notificare prealabilă poate duce la pierderea contribuțiilor. În cazul încălcării grave a regulamentului, ne rezervăm dreptul de a rescinde abonamentul fără rambursare.</p>
        
        <p><strong>9. Proprietatea Intelectuală și Dreptul de Imagine</strong></p>
        <p>Tot conținutul de pe site-ul nostru este proprietate intelectuală a CrossFit Unbroken Spirit. Vă puteți folosi fotografiile, videoclipurile și alte materiale doar pentru uz personal. Ne rezervăm dreptul de a utiliza imagini ale membrilor în materiale de marketing, cu acordul lor explicit.</p>
        
        <p><strong>10. Confidențialitatea și Protecția Datelor</strong></p>
        <p>Conform Regulamentului General privind Protecția Datelor (GDPR) și legislației românești, informațiile dumneavoastră personale sunt protejate și utilizate doar pentru scopurile declarate. Nu vă vom vinde sau transmite date terților fără consimțământul explicit.</p>
        
        <p><strong>11. Limitarea Răspunderii</strong></p>
        <p>CrossFit Unbroken Spirit nu este responsabil pentru pierderi, furturilor, deteriorări ale bunurilor personale lăsate în sală. Vă recomandăm să nu lăsați obiecte de valoare nesupraveghate. Nu suntem responsabili pentru întreruperile serviciilor datorită circumstanțelor neprevăzute.</p>
        
        <p><strong>12. Modificarea Termenilor</strong></p>
        <p>Ne rezervăm dreptul de a modifica acești Termeni și Condiții în orice moment, cu sau fără notificare prealabilă. Utilizarea continuă a serviciilor noastre după modificări constituie acceptarea noilor termeni.</p>
        
        <p><strong>13. Legea și Jurisdicția</strong></p>
        <p>Acești Termeni și Condiții sunt reglementați de legile României. Orice dispută va fi rezolvată conform legislației române și va fi supusă jurisdicției instanțelor competente din București, Sector 3.</p>
        
        <p><strong>14. Contactare</strong></p>
        <p>Pentru orice întrebări sau nelămuriri privind acești termeni, vă rugăm să ne contactați la train@unbrokenspirit.ro sau la telefonul +40 748 838 767.</p>
      </>
    );
  }
  return (
    <>
      <p><strong>1. Acceptance of Terms and Conditions</strong></p>
      <p>By using our website and participating in activities offered by CrossFit Unbroken Spirit, you declare that you have read, understood, and accepted these Terms and Conditions. If you do not agree with any of these terms, please do not register and do not participate in our activities.</p>
      
      <p><strong>2. Description of Services</strong></p>
      <p>CrossFit Unbroken Spirit offers fitness services, CrossFit training, weightlifting, and other related sports activities. Services are offered only to persons who have completed and signed a medical declaration and are medically fit to participate in intense physical activities.</p>
      
      <p><strong>3. Health Declaration and Assumption of Risk</strong></p>
      <p>By participating in any of our services, you accept that physical exercise carries inherent risks, including but not limited to muscle injuries, fractures, heart attacks, or in extreme cases, death. You declare that you are in good health and have consulted a doctor before participating. We are not responsible for accidents or illnesses that occur as a result of participating in our activities.</p>
      
      <p><strong>4. Age and Legal Capacity</strong></p>
      <p>You declare that you are at least 18 years old and have full legal capacity to engage in these terms. For persons under 18, participation requires written authorization signed by a parent or legal guardian.</p>
      
      <p><strong>5. Gym Rules and Conduct</strong></p>
      <p>Members must respect the gym's internal regulations, not smoke, not consume alcohol or other prohibited substances, maintain appropriate behavior, and not disturb other members. Incorrect use of equipment or violation of rules may result in suspension or termination of membership without refund.</p>
      
      <p><strong>6. Member Responsibility</strong></p>
      <p>You are responsible for your own safety and for choosing an appropriate level of exercise. Our instructors provide guidance, but you have final responsibility for correctly executing exercises and requesting help when necessary. Never move equipment without permission and ensure it is closed/secured after use.</p>
      
      <p><strong>7. Payment Policy and Memberships</strong></p>
      <p>Memberships are paid in advance according to the selected period (monthly, quarterly, or annual). Late payments may result in suspension of facility access. Refunds depend on the reason for cancellation and are governed by our detailed refund policy.</p>
      
      <p><strong>8. Cancellation and Termination</strong></p>
      <p>You have the right to cancel your membership with a written notice of at least 30 days. Cancellation without prior notice may result in loss of contributions. In case of serious violation of regulations, we reserve the right to terminate the membership without refund.</p>
      
      <p><strong>9. Intellectual Property and Image Rights</strong></p>
      <p>All content on our website is the intellectual property of CrossFit Unbroken Spirit. You may use photographs, videos, and other materials only for personal use. We reserve the right to use images of members in marketing materials with their explicit consent.</p>
      
      <p><strong>10. Confidentiality and Data Protection</strong></p>
      <p>In accordance with the General Data Protection Regulation (GDPR) and Romanian legislation, your personal information is protected and used only for declared purposes. We will not sell or transmit data to third parties without your explicit consent.</p>
      
      <p><strong>11. Limitation of Liability</strong></p>
      <p>CrossFit Unbroken Spirit is not responsible for loss, theft, or damage to personal items left in the gym. We recommend that you do not leave valuable items unattended. We are not responsible for service interruptions due to unforeseen circumstances.</p>
      
      <p><strong>12. Modification of Terms</strong></p>
      <p>We reserve the right to modify these Terms and Conditions at any time, with or without prior notice. Continued use of our services after modifications constitutes acceptance of the new terms.</p>
      
      <p><strong>13. Law and Jurisdiction</strong></p>
      <p>These Terms and Conditions are governed by the laws of Romania. Any dispute will be resolved in accordance with Romanian legislation and will be subject to the jurisdiction of competent courts in Bucharest, Sector 3.</p>
      
      <p><strong>14. Contact</strong></p>
      <p>For any questions or clarifications regarding these terms, please contact us at train@unbrokenspirit.ro or call +40 748 838 767.</p>
    </>
  );
};

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
              {language === 'ro' ? 'Cookie-uri' : 'Cookies'}
            </button>
            <span className="text-gray-600">|</span>
            <button onClick={() => setOpenModal('gdpr')} className="text-blue-400 text-sm hover:text-blue-300 transition-colors">
              {language === 'ro' ? 'Confidențialitate și GDPR' : 'Privacy'}
            </button>
            <span className="text-gray-600">|</span>
            <button onClick={() => setOpenModal('terms')} className="text-blue-400 text-sm hover:text-blue-300 transition-colors">
              {language === 'ro' ? 'Termeni și Condiții' : 'Terms and Conditions'}
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
        <PolicyModal title={language === 'ro' ? 'Confidențialitate și GDPR' : t("gdprPolicy")} content={gdprContent} onClose={() => setOpenModal(null)} closeLabel={language === 'ro' ? 'Închide' : 'Close'} />
      )}
      {openModal === 'terms' && (
        <PolicyModal title={language === 'ro' ? 'Termeni și Condiții' : 'Terms and Conditions'} content={getTermsContent(language)} onClose={() => setOpenModal(null)} closeLabel={language === 'ro' ? 'Închide' : 'Close'} />
      )}
    </footer>
  );
}