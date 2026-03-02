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

const getPrivacyContent = (language) => {
  if (language === 'ro') {
    return (
      <>
        <p><strong>1. Introducere și Responsabil de Prelucrare</strong></p>
        <p>Conform Regulamentului General privind Protecția Datelor (GDPR) nr. 2016/679 și legislației românești privind protecția datelor, S.C. UNBROKEN CLUB S.R.L. (denumit în continuare "noi" sau "compania") este responsabilă pentru prelucrarea datelor dumneavoastră cu caracter personal. Pentru orice întrebări privind confidențialitatea, contactați-ne la train@unbrokenspirit.ro sau +40 748 838 767.</p>
        
        <p><strong>2. Ce Date Colectăm</strong></p>
        <p>Colectăm următoarele categorii de date: date de identificare (nume, prenume, e-mail, telefon), date de localizare (adresă), date de sănătate (antecedente medicale în scopuri de siguranță la antrenament), date de plată (informații bancare sau de card, doar pentru procesare securizată), date de urmărire (adresa IP, cookie-uri, dispozitiv).</p>
        
        <p><strong>3. Bazele Juridice pentru Prelucrare</strong></p>
        <p>Prelucrarea datelor dumneavoastră se bazează pe: consimțământul explicit (pentru comunicări de marketing), contractul de prestare de servicii (pentru a vă oferi serviciile de antrenament), obligații legale (pentru conformitate cu legislația munca și sănătate), interesul legitim (pentru securitate și prevenirea fraudei).</p>
        
        <p><strong>4. Scopurile Prelucrării Datelor</strong></p>
        <p>Datele dumneavoastră sunt utilizate pentru: prestarea serviciilor de antrenament și fitness, gestionarea abonamentelor și plăților, comunicări administrative și legate de servicii, marketing și promovare (cu consimțământul explicit), îmbunătățirea serviciilor și site-ului, respectarea obligațiilor legale și de reglementare, prevenirea fraudelor și a activităților ilegale.</p>
        
        <p><strong>5. Partajarea Datelor cu Terți</strong></p>
        <p>Nu vândutm și nu partajăm datele dumneavoastră cu terți fără consimțământul explicit, cu excepția cazurilor în care suntem obligați legal. Partenerii noștri (procesatori de plăți, furnizori de cloud) sunt obligați prin contracte să respecte confidențialitatea și securitatea.</p>
        
        <p><strong>6. Transferuri Internaționale</strong></p>
        <p>Datele dumneavoastră sunt stocate în principal în Uniunea Europeană. Orice transfer în afara UE se face cu mecanisme de protecție adecvate, conform GDPR.</p>
        
        <p><strong>7. Retenția Datelor</strong></p>
        <p>Păstrăm datele dumneavoastră doar cât timp este necesar: datele contractuale sunt reținute pentru durata abonamentului și 6 ani după (conform legii fiscale), datele de marketing sunt șterse la retragerea consimțământului, datele de securitate sunt reținute conform legislației.</p>
        
        <p><strong>8. Drepturile Dumneavoastră</strong></p>
        <p>Aveți următoarele drepturi conform GDPR: dreptul de acces (să aflați ce date avem despre dumneavoastră), dreptul de rectificare (să corectați datele inexacte), dreptul la ștergere (dreptul de a fi uitat), dreptul la restricționarea prelucrării, dreptul la portabilitate (să primiți datele într-un format structurat), dreptul de a vă opune prelucrării, dreptul de a nu fi supus unor decizii automatizate. Pentru a exercita aceste drepturi, contactați-ne la train@unbrokenspirit.ro.</p>
        
        <p><strong>9. Securitatea Datelor</strong></p>
        <p>Implementăm măsuri de securitate tehnice și organizatorice pentru a proteja datele dumneavoastră împotriva accesului neautorizat, modificării, pierderii sau utilizării abuzive. Utilizăm criptare (SSL/TLS), acces restricționat și testare regulată a sistemelor de securitate.</p>
        
        <p><strong>10. Incidente de Securitate</strong></p>
        <p>În cazul unei breșe de date care ar putea afecta drepturile dumneavoastră, vom notifica autoritățile competente și, dacă este cazul, pe dumneavoastră, conform GDPR.</p>
        
        <p><strong>11. Cookie-uri și Tehnologii de Urmărire</strong></p>
        <p>Utilizăm cookie-uri și alte tehnologii de urmărire conform politicii noastre separate de cookie-uri. Puteți controla aceste tehnologii prin setările browserului.</p>
        
        <p><strong>12. Contact cu Autoritatea de Protecție a Datelor</strong></p>
        <p>Dacă considerați că prelucrarea datelor dumneavoastră încalcă GDPR, puteți depune o plângere la Autoritatea Națională pentru Supraveghere a Prelucrării Datelor cu Caracter Personal (ANSPDCP), strada Dem. I. Dobrescu nr. 22-24, sector 1, București, sau online pe www.dataprotection.ro.</p>
        
        <p><strong>13. Modificări ale Politicii</strong></p>
        <p>Avem dreptul de a actualiza această politică periodic. Versiunea actualizată va fi disponibilă pe site-ul nostru cu data ultimei modificări evident marcată.</p>
      </>
    );
  }
  return (
    <>
      <p><strong>1. Introduction and Data Controller</strong></p>
      <p>In accordance with the General Data Protection Regulation (GDPR) no. 2016/679 and Romanian data protection legislation, S.C. UNBROKEN CLUB S.R.L. (hereinafter "we" or "the company") is responsible for processing your personal data. For any privacy-related questions, contact us at train@unbrokenspirit.ro or +40 748 838 767.</p>
      
      <p><strong>2. What Data We Collect</strong></p>
      <p>We collect the following categories of data: identification data (name, surname, email, phone), location data (address), health data (medical history for training safety purposes), payment data (bank or card information, only for secure processing), tracking data (IP address, cookies, device).</p>
      
      <p><strong>3. Legal Bases for Processing</strong></p>
      <p>The processing of your data is based on: explicit consent (for marketing communications), service provision contract (to provide you training and fitness services), legal obligations (for labor and health law compliance), legitimate interest (for security and fraud prevention).</p>
      
      <p><strong>4. Purposes of Data Processing</strong></p>
      <p>Your data is used for: providing training and fitness services, managing memberships and payments, administrative and service-related communications, marketing and promotion (with explicit consent), improving services and website, complying with legal and regulatory obligations, preventing fraud and illegal activities.</p>
      
      <p><strong>5. Sharing Data with Third Parties</strong></p>
      <p>We do not sell or share your data with third parties without explicit consent, except where legally required. Our partners (payment processors, cloud providers) are contractually obligated to maintain confidentiality and security.</p>
      
      <p><strong>6. International Transfers</strong></p>
      <p>Your data is stored primarily within the European Union. Any transfer outside the EU is done with appropriate safeguards under GDPR.</p>
      
      <p><strong>7. Data Retention</strong></p>
      <p>We keep your data only as long as necessary: contract data is retained for the duration of membership and 6 years after (according to tax law), marketing data is deleted upon consent withdrawal, security data is retained according to legislation.</p>
      
      <p><strong>8. Your Rights</strong></p>
      <p>You have the following rights under GDPR: right of access (to know what data we have about you), right of rectification (to correct inaccurate data), right to erasure (right to be forgotten), right to restrict processing, right to data portability (to receive data in structured format), right to object to processing, right not to be subject to automated decision-making. To exercise these rights, contact us at train@unbrokenspirit.ro.</p>
      
      <p><strong>9. Data Security</strong></p>
      <p>We implement technical and organizational security measures to protect your data against unauthorized access, modification, loss, or misuse. We use encryption (SSL/TLS), restricted access, and regular security testing.</p>
      
      <p><strong>10. Security Breaches</strong></p>
      <p>In the event of a data breach that could affect your rights, we will notify competent authorities and, if necessary, you, in accordance with GDPR.</p>
      
      <p><strong>11. Cookies and Tracking Technologies</strong></p>
      <p>We use cookies and other tracking technologies in accordance with our separate cookie policy. You can control these technologies through your browser settings.</p>
      
      <p><strong>12. Contact Data Protection Authority</strong></p>
      <p>If you believe that processing of your data violates GDPR, you can file a complaint with the National Authority for Supervision of Personal Data Processing (ANSPDCP), str. Dem. I. Dobrescu no. 22-24, sector 1, Bucharest, or online at www.dataprotection.ro.</p>
      
      <p><strong>13. Policy Changes</strong></p>
      <p>We have the right to update this policy periodically. The updated version will be available on our website with the date of last modification clearly marked.</p>
    </>
  );
};

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
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Brand */}
          <div className="sm:col-span-2">
            <div className="flex items-center gap-3 mb-4">
               <Logo size={56} />
               <div className="text-center leading-tight">
                 <div className="text-xl font-black text-white tracking-wide">CrossFit</div>
                 <div className="text-xs font-black text-blue-400 uppercase tracking-wide">UNBROKEN SPIRIT</div>
               </div>
             </div>
            <p className="text-gray-300 mb-6 max-w-md">
              {t("tagline")}
            </p>
            <div className="flex gap-4">
              <a 
                href="https://www.instagram.com/crossfit.unbroken.spirit" 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-11 h-11 rounded-lg bg-zinc-900 flex items-center justify-center hover:bg-blue-500 transition-colors group"
              >
                <Instagram aria-hidden="true" className="w-5 h-5 text-gray-300 group-hover:text-white" />
              </a>
              <a 
                href="https://www.facebook.com/profile.php?id=61588232038424" 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-11 h-11 rounded-lg bg-zinc-900 flex items-center justify-center hover:bg-blue-500 transition-colors group"
              >
                <Facebook aria-hidden="true" className="w-5 h-5 text-gray-300 group-hover:text-white" />
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
                    className="text-gray-300 hover:text-blue-400 transition-colors"
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
               <li className="flex items-center gap-3 text-gray-300">
                 <MapPin className="w-4 h-4 text-sky-400 flex-shrink-0" />
                 <span>Splaiul Unirii 257-259, Sector 3, București</span>
               </li>
               <li className="flex items-center gap-3 text-gray-300">
                 <Phone className="w-4 h-4 text-sky-400 flex-shrink-0" />
                 <span>+40 748 838 767</span>
               </li>
               <li className="flex items-center gap-3 text-gray-300">
                 <Phone className="w-4 h-4 text-sky-400 flex-shrink-0" />
                 <span>+40 740 269 769</span>
               </li>
               <li className="flex items-center gap-3 text-gray-300">
                 <Mail className="w-4 h-4 text-sky-400 flex-shrink-0" />
                 <span>train@unbrokenspirit.ro</span>
               </li>
             </ul>
          </div>
        </div>
        
        {/* Bottom */}
        <div className="pt-8 border-t border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm">
            © {currentYear} CrossFit Unbroken Spirit. {t("copyright")}
          </p>
          <div className="flex flex-wrap justify-center items-center gap-3">
            <button onClick={() => setOpenModal('cookie')} className="text-blue-400 text-sm hover:text-blue-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black rounded">
              {language === 'ro' ? 'Cookie-uri' : 'Cookies'}
            </button>
            <span className="text-gray-600">|</span>
            <button onClick={() => setOpenModal('gdpr')} className="text-blue-400 text-sm hover:text-blue-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black rounded">
              {language === 'ro' ? 'Confidențialitate și GDPR' : 'Privacy'}
            </button>
            <span className="text-gray-600">|</span>
            <button onClick={() => setOpenModal('terms')} className="text-blue-400 text-sm hover:text-blue-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black rounded">
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
      <div className="text-center text-gray-400 text-xs px-6 pb-4 break-words">
        {language === 'ro'
          ? 'Toate drepturile rezervate S.C. UNBROKEN CLUB S.R.L., Nr. R.C.: J2025078440006, C.U.I.: RO52691871, Adresa: Bucuresti, Sector 1, Str. Pitar Mos, Nr. 27, la cabinet Av. Stanciu-Burileanu Bogdan, et. 5, ap. 17, Capital social 500 RON.'
          : 'All rights reserved S.C. UNBROKEN CLUB S.R.L., Reg. No.: J2025078440006, VAT: RO52691871, Address: Bucharest, Sector 1, Pitar Mos St., No. 27, at the office of Att. Stanciu-Burileanu Bogdan, 5th floor, apt. 17, Share capital 500 RON.'}
      </div>

      {/* ANPC Badges */}
      <div className="flex flex-row flex-wrap items-center justify-center gap-4 pb-8 px-4">
        <a href="https://anpc.ro/ce-este-sal/" target="_blank" rel="nofollow">
          <img width="250" height="50" style={{width:'min(250px, 100%)', height:'auto'}} src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69948c0d6b8aa61f49f0a23d/fdece7d95_anpc-sal.png" alt="Solutionarea Alternativa a Litigiilor" className="max-w-full" />
        </a>
        <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="nofollow">
          <img width="250" height="50" style={{width:'min(250px, 100%)', height:'auto'}} src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69948c0d6b8aa61f49f0a23d/af3f98021_anpc-sol.png" alt="Solutionarea Online a Litigiilor" className="max-w-full" />
        </a>
      </div>

      {openModal === 'cookie' && (
        <PolicyModal title={language === 'ro' ? 'Politica de Cookie-uri' : 'Cookie Policy'} content={getCookieContent(language)} onClose={() => setOpenModal(null)} closeLabel={language === 'ro' ? 'Închide' : 'Close'} />
      )}
      {openModal === 'gdpr' && (
        <PolicyModal title={language === 'ro' ? 'Confidențialitate și GDPR' : 'Privacy and GDPR'} content={getPrivacyContent(language)} onClose={() => setOpenModal(null)} closeLabel={language === 'ro' ? 'Închide' : 'Close'} />
      )}
      {openModal === 'terms' && (
        <PolicyModal title={language === 'ro' ? 'Termeni și Condiții' : 'Terms and Conditions'} content={getTermsContent(language)} onClose={() => setOpenModal(null)} closeLabel={language === 'ro' ? 'Închide' : 'Close'} />
      )}
    </footer>
  );
}