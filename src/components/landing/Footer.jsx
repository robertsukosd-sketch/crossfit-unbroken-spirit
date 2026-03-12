import React, { useState } from 'react';
import { Instagram, Facebook, Mail, Phone, MapPin } from 'lucide-react';
import Logo from './Logo';
import { useLanguage } from '../LanguageProvider';
import PolicyModal from './PolicyModal';
import { CONTACT_EMAIL, QUICK_FOOTER_LINKS, scrollToSection } from '../config';

const GOOGLE_MAPS_URL = "https://www.google.com/maps/search/Splaiul+Unirii+257-259+Bucuresti";

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
        <p><strong>1. Introducere și Operatorul de Date</strong></p>
        <p>În conformitate cu Regulamentul General privind Protecția Datelor (GDPR - UE 2016/679) și legislația română în vigoare, S.C. UNBROKEN CLUB S.R.L. (denumită în continuare "noi", "societatea" sau "Operatorul") este responsabilă pentru prelucrarea datelor dumneavoastră cu caracter personal.</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Sediul social: București, Sector 1, Str. Pitar Moș, Nr. 27, la cabinet Av. Stanciu-Burileanu Bogdan, et. 5, ap. 17.</li>
          <li>Punct de lucru (locația sălii): București, Sector 3, Splaiul Unirii 257-259.</li>
          <li>Date de identificare: C.U.I. RO52691871, Reg. Com. J2025078440006.</li>
        </ul>
        <p>Pentru orice solicitări privind confidențialitatea, ne puteți contacta la train@unbrokenspirit.ro sau +40 748 838 767, +40 740 269 769.</p>

        <p><strong>2. Ce date colectăm și prin ce metode</strong></p>
        <p>Colectăm datele dumneavoastră în două moduri distincte, în funcție de interacțiunea cu noi:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>A. Direct prin site-ul www.unbrokenspirit.ro:</strong> Colectăm date de identificare (nume, prenume, e-mail, număr de telefon) exclusiv prin formularele de contact. Notă importantă: Aceste mesaje nu sunt stocate pe serverul site-ului, ci sunt transmise direct și securizat în căsuța noastră de e-mail oficială. De asemenea, colectăm date tehnice de navigare (adresa IP, tipul dispozitivului) prin module cookie.</li>
          <li><strong>B. Prin platforma terță ThunderWOD și la punctul de lucru:</strong> Pentru a beneficia de serviciile noastre de antrenament, este necesară crearea unui cont în aplicația ThunderWOD (pe web sau pe mobil). Acolo veți furniza date de identificare, date privind starea de sănătate (declarația de aptitudine pentru efort fizic) și date de plată (informații bancare). Procesarea plăților se face strict prin infrastructura securizată a ThunderWOD și a procesatorilor săi parteneri.</li>
        </ul>

        <p><strong>3. Temeiurile Juridice și Scopurile Prelucrării</strong></p>
        <p>Prelucrăm datele dumneavoastră pe baza următoarelor temeiuri:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Executarea unui contract / Demersuri pre-contractuale:</strong> Pentru a vă răspunde la solicitările de pe site, pentru a vă crea profilul de membru în ThunderWOD, a gestiona abonamentele, programările la clase și accesul în sală.</li>
          <li><strong>Obligație legală:</strong> Pentru emiterea facturilor fiscale și conformarea cu legislația financiar-contabilă, precum și respectarea normelor privind protecția muncii și a sănătății publice în incinta sălii.</li>
          <li><strong>Interesul legitim:</strong> Pentru securitatea cibernetică a site-ului nostru, prevenirea fraudelor și protejarea drepturilor societății în cazul unor litigii.</li>
          <li><strong>Consimțământ:</strong> Pentru trimiterea de comunicări de marketing (newsletter), fotografierea/filmarea în timpul claselor în scop de promovare, sau utilizarea cookie-urilor neesențiale. Consimțământul poate fi retras în orice moment.</li>
        </ul>

        <p><strong>4. Partajarea Datelor cu Terți și Transferuri Internaționale</strong></p>
        <p>Nu vindem și nu închiriem datele dumneavoastră. Partajăm datele strict în scopurile menționate, cu parteneri care au obligații contractuale de confidențialitate:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Furnizorul platformei de management al sălii (ThunderWOD) și procesatorii de plăți integrați de acesta.</li>
          <li>Firma de contabilitate (pentru datele de facturare).</li>
          <li>Furnizorii de servicii IT și găzduire web.</li>
          <li>Autorități publice, la solicitarea legală a acestora.</li>
        </ul>
        <p>Datele sunt stocate cu precădere în Uniunea Europeană. Orice transfer în afara UE se face în baza unor clauze contractuale standard aprobate de Comisia Europeană.</p>

        <p><strong>5. Perioada de Păstrare a Datelor</strong></p>
        <p>Păstrăm datele doar cât este necesar:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Datele din formularele de contact (care nu se concretizează într-un abonament): maximum 12 luni.</li>
          <li>Datele fiscale și facturile: conform legislației românești, până la 10 ani.</li>
          <li>Istoricul de membru și declarațiile medicale: pe durata activității contului și o perioadă ulterioară justificată pentru apărarea intereselor noastre legale.</li>
        </ul>

        <p><strong>6. Securitatea Datelor</strong></p>
        <p>Implementăm măsuri tehnice și organizatorice adecvate pentru a proteja datele împotriva accesului neautorizat, pierderii sau alterării. Acestea includ utilizarea certificatelor SSL pe site, direcționarea mesajelor de contact strict către e-mailul securizat al firmei și delegarea procesării plăților către platforme certificate (ThunderWOD).</p>

        <p><strong>7. Drepturile Dumneavoastră</strong></p>
        <p>Conform GDPR, aveți următoarele drepturi:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Dreptul de acces:</strong> de a obține confirmarea prelucrării și acces la date.</li>
          <li><strong>Dreptul la rectificare:</strong> de a corecta datele inexacte sau incomplete.</li>
          <li><strong>Dreptul la ștergere („dreptul de a fi uitat"):</strong> în condițiile legii.</li>
          <li><strong>Dreptul la restricționarea prelucrării</strong> și <strong>Dreptul la portabilitatea datelor.</strong></li>
          <li><strong>Dreptul la opoziție:</strong> de a vă opune prelucrării (ex. pentru marketing).</li>
          <li><strong>Dreptul de a nu face obiectul unei decizii exclusiv automate.</strong></li>
        </ul>
        <p>Pentru exercitarea acestor drepturi, ne puteți scrie la train@unbrokenspirit.ro.</p>

        <p><strong>8. Reclamații</strong></p>
        <p>Dacă considerați că v-am încălcat drepturile privind protecția datelor, aveți dreptul de a depune o plângere la Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal (ANSPDCP): B-dul G-ral. Gheorghe Magheru 28-30, Sector 1, București, www.dataprotection.ro.</p>

        <p><strong>9. Actualizarea Politicii</strong></p>
        <p>Ne rezervăm dreptul de a modifica această politică. Orice actualizare va fi publicată pe această pagină.</p>
      </>
    );
  }
  return (
      <>
        <p><strong>1. Introduction and Data Controller</strong></p>
        <p>In accordance with the General Data Protection Regulation (GDPR - EU 2016/679) and applicable Romanian data protection legislation, S.C. UNBROKEN CLUB S.R.L. (hereinafter "we", "the company", or "the Controller") is responsible for processing your personal data.</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Registered Office:</strong> Bucharest, District 1, 27 Pitar Moș St., at the law office of Av. Stanciu-Burileanu Bogdan, 5th floor, apt. 17.</li>
          <li><strong>Working Point (Gym Location):</strong> Bucharest, District 3, 257-259 Splaiul Unirii.</li>
          <li><strong>Identification Data:</strong> VAT/C.U.I. RO52691871, Trade Reg. J2025078440006.</li>
        </ul>
        <p>For any privacy-related questions, contact us at train@unbrokenspirit.ro or +40 748 838 767, +40 740 269 769.</p>

        <p><strong>2. What Data We Collect and How</strong></p>
        <p>We collect your data through two distinct channels, depending on your interaction with us:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>A. Directly via www.unbrokenspirit.ro:</strong> We collect identification data (name, email, phone number) exclusively through contact forms. Important note: These messages are not stored on the website's server but are transmitted directly and securely to our official email inbox. We also collect technical browsing data (IP address, device type) via cookies.</li>
          <li><strong>B. Via the ThunderWOD platform and at the gym:</strong> To access our training services, you must create an account on the ThunderWOD app/platform. There, you will provide identification data, health data (fitness-to-train declaration), and payment data (bank details). Payment processing is conducted strictly through ThunderWOD's secure infrastructure and its payment processing partners.</li>
        </ul>

        <p><strong>3. Legal Bases and Purposes for Processing</strong></p>
        <p>We process your data based on the following legal grounds:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Contract Execution / Pre-contractual steps:</strong> To answer your inquiries from the website, create your ThunderWOD member profile, manage memberships, class bookings, and gym access.</li>
          <li><strong>Legal Obligation:</strong> To issue invoices, comply with financial-accounting legislation, and adhere to health and safety regulations at our physical location.</li>
          <li><strong>Legitimate Interest:</strong> To ensure our website's cybersecurity, prevent fraud, and protect the company's legal rights in case of disputes.</li>
          <li><strong>Consent:</strong> For sending marketing communications (newsletters), capturing photos/videos during classes for promotional purposes, or using non-essential cookies. Consent can be withdrawn at any time.</li>
        </ul>

        <p><strong>4. Sharing Data with Third Parties and International Transfers</strong></p>
        <p>We do not sell or rent your data. We share your data strictly for the aforementioned purposes with partners bound by confidentiality agreements:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Our gym management software provider (ThunderWOD) and their integrated payment processors.</li>
          <li>Our accounting firm (for billing data).</li>
          <li>The IT and web hosting providers.</li>
          <li>Public authorities, upon legal request.</li>
        </ul>
        <p>Your data is primarily stored within the European Union. Any transfer outside the EU is subject to standard contractual clauses approved by the European Commission.</p>

        <p><strong>5. Data Retention</strong></p>
        <p>We retain your data only for as long as necessary:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Contact form data (if it does not result in a membership): maximum 12 months.</li>
          <li>Financial data and invoices: up to 10 years, according to Romanian law.</li>
          <li>Membership history and medical waivers: for the duration of your active account and a subsequent period justified for defending our legal interests.</li>
        </ul>

        <p><strong>6. Data Security</strong></p>
        <p>We implement appropriate technical and organizational measures to protect your data against unauthorized access, loss, or alteration. These include using SSL certificates on our website, routing contact messages exclusively to our secure email, and delegating payment processing to certified platforms (ThunderWOD).</p>

        <p><strong>7. Your Rights</strong></p>
        <p>Under GDPR, you have the following rights:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>The right of access:</strong> to confirm processing and access your data.</li>
          <li><strong>The right to rectification:</strong> to correct inaccurate or incomplete data.</li>
          <li><strong>The right to erasure ('right to be forgotten'):</strong> under legal conditions.</li>
          <li><strong>The right to restriction of processing</strong> and the <strong>right to data portability.</strong></li>
          <li><strong>The right to object:</strong> to object to processing (e.g., for marketing).</li>
          <li><strong>Right not to be subject to automated decision-making.</strong></li>
        </ul>
        <p>To exercise these rights, email us at train@unbrokenspirit.ro.</p>

        <p><strong>8. Complaints</strong></p>
        <p>If you believe your data protection rights have been violated, you have the right to file a complaint with the National Supervisory Authority for Personal Data Processing (ANSPDCP): 28-30 G-ral. Gheorghe Magheru Blvd., District 1, Bucharest, www.dataprotection.ro.</p>

        <p><strong>9. Policy Updates</strong></p>
        <p>We reserve the right to modify this policy. Any updates will be published on this page.</p>
      </>
    );
  };

const getTermsContent = (language) => {
  if (language === 'ro') {
    return (
      <>
        <p><strong>1. Informații Generale și Acceptarea Termenilor</strong></p>
        <p>Site-ul www.unbrokenspirit.ro este deținut și administrat de S.C. UNBROKEN CLUB S.R.L., având sediul social în București, Sector 1, Str. Pitar Moș, Nr. 27, la cabinet Av. Stanciu-Burileanu Bogdan, et. 5, ap. 17, și punctul de lucru (locația fizică a sălii) în București, Sector 3, Splaiul Unirii 257-259. Societatea este înregistrată la Registrul Comerțului sub nr. J2025078440006, C.U.I. RO52691871, capital social 500 RON.</p>
        <p>Prin utilizarea acestui site și prin participarea la activitățile oferite de CrossFit Unbroken Spirit, declarați că ați citit, înțeles și acceptat acești Termeni și Condiții. Dacă nu sunteți de acord cu acești termeni, vă rugăm să nu utilizați serviciile noastre.</p>

        <p><strong>2. Descrierea Serviciilor și Platforma ThunderWOD</strong></p>
        <p>CrossFit Unbroken Spirit oferă servicii de fitness, antrenamente de tip CrossFit, haltere (ridicare de greutăți), gimnastică și activități sportive conexe la punctul său de lucru.</p>
        <p>Site-ul www.unbrokenspirit.ro are rol de prezentare. Achiziționarea abonamentelor, plățile și programările la clase se efectuează exclusiv online, prin intermediul aplicației terțe ThunderWOD (https://thunderwod.com). Prin crearea unui cont și efectuarea plăților în ThunderWOD, acceptați implicit și termenii platformei respective.</p>

        <p><strong>3. Declarația de Sănătate și Asumarea Riscului</strong></p>
        <p>Prin participarea la oricare dintre antrenamentele noastre, acceptați faptul că exercițiul fizic de intensitate ridicată comportă riscuri inerente (inclusiv, dar fără a se limita la: leziuni musculare, articulare sau afecțiuni cardiovasculare). Declarați pe proprie răspundere că sunteți apt din punct de vedere medical și că ați consultat un medic înainte de a începe acest program de antrenamente. UNBROKEN CLUB S.R.L. nu este responsabilă pentru accidentările sau afecțiunile medicale survenite în urma participării la activitățile noastre.</p>

        <p><strong>4. Vârsta și Capacitatea Juridică</strong></p>
        <p>Declarați că aveți cel puțin 18 ani și capacitate juridică deplină. Pentru persoanele sub 18 ani, participarea la antrenamente este permisă exclusiv în baza unui acord scris și semnat de către un părinte sau tutore legal.</p>

        <p><strong>5. Politica de Plăți, Abonamente și Anulare</strong></p>
        <p>Abonamentele se achită în avans, integral, conform perioadei selectate, prin intermediul aplicației ThunderWOD. Neplata la termen duce la suspendarea automată a accesului la programări. Puteți solicita anularea reînnoirii abonamentului direct din aplicație sau printr-o notificare scrisă trimisă pe e-mail. Returnarea parțială a fondurilor se face doar în cazuri medicale excepționale (dovedite cu acte) și conform politicii interne de rambursare a sălii.</p>

        <p><strong>6. Regulile Sălii și Responsabilitatea Membrilor</strong></p>
        <p>Sunteți responsabil pentru siguranța dumneavoastră și pentru executarea corectă a exercițiilor conform indicațiilor antrenorului. Membrii sunt obligați:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Să respecte regulamentul de ordine interioară (ROI) afișat în sală.</li>
          <li>Să nu utilizeze echipamentul fără permisiune și să îl igienizeze/așeze la loc după utilizare.</li>
          <li>Să mențină un comportament respectuos. Consumul de alcool, substanțe interzise sau comportamentul agresiv atrag rezilierea imediată a abonamentului, fără drept de rambursare.</li>
        </ul>

        <p><strong>7. Proprietatea Intelectuală și Dreptul de Imagine</strong></p>
        <p>Tot conținutul site-ului www.unbrokenspirit.ro este proprietatea intelectuală a UNBROKEN CLUB S.R.L. Ne rezervăm dreptul de a realiza și utiliza fotografii/videoclipuri din timpul antrenamentelor în scopuri de marketing pe rețelele sociale, cu respectarea normelor GDPR. Dacă nu doriți să apăreți în aceste materiale, vă rugăm să notificați antrenorul sau recepția.</p>

        <p><strong>8. Limitarea Răspunderii</strong></p>
        <p>S.C. UNBROKEN CLUB S.R.L. nu este responsabilă pentru pierderea, furtul sau deteriorarea bunurilor personale lăsate în vestiare sau în incinta sălii. De asemenea, nu suntem responsabili pentru întreruperile serviciilor cauzate de forță majoră sau circumstanțe neprevăzute.</p>

        <p><strong>9. Modificarea Termenilor și Jurisdicția</strong></p>
        <p>Ne rezervăm dreptul de a actualiza acești Termeni și Condiții. Continuarea utilizării serviciilor noastre reprezintă acceptarea modificărilor. Orice litigiu va fi guvernat de legislația din România și va fi soluționat de instanțele judecătorești competente din București.</p>

        <p><strong>10. Contact</strong></p>
        <p>Pentru întrebări, ne puteți contacta la e-mail: train@unbrokenspirit.ro sau telefon: 0748 838 767, 0740 269 769.</p>
      </>
    );
  }
  return (
      <>
        <p><strong>1. General Information and Acceptance of Terms</strong></p>
        <p>The website www.unbrokenspirit.ro is owned and operated by S.C. UNBROKEN CLUB S.R.L., having its registered office in Bucharest, District 1, 27 Pitar Moș St., at the law office of Av. Stanciu-Burileanu Bogdan, 5th floor, apt. 17, and its working point (physical gym location) at 257-259 Splaiul Unirii, District 3, Bucharest. The company is registered with the Trade Register under no. J2025078440006, VAT/C.U.I. RO52691871, share capital 500 RON.</p>
        <p>By using this website and participating in the activities offered by CrossFit Unbroken Spirit, you declare that you have read, understood, and accepted these Terms and Conditions. If you do not agree with any of these terms, please do not use our services.</p>

        <p><strong>2. Description of Services and ThunderWOD Integration</strong></p>
        <p>CrossFit Unbroken Spirit provides fitness services, CrossFit training, weightlifting, gymnastics and related sports activities at its physical location.</p>
        <p>The website www.unbrokenspirit.ro serves as a presentation platform. Purchasing memberships, processing payments, and booking classes are done exclusively online via the third-party application ThunderWOD (https://thunderwod.com). By creating an account and making payments in ThunderWOD, you also accept the terms and policies of that platform.</p>

        <p><strong>3. Health Declaration and Assumption of Risk</strong></p>
        <p>By participating in any of our services, you acknowledge that high-intensity physical exercise carries inherent risks (including, but not limited to, muscle/joint injuries or cardiovascular events). You declare that you are in good medical condition and have consulted a physician prior to participating. UNBROKEN CLUB S.R.L. is not liable for any injuries or medical conditions resulting from your participation in our activities.</p>

        <p><strong>4. Age and Legal Capacity</strong></p>
        <p>You declare that you are at least 18 years old and possess full legal capacity. For individuals under 18, participation requires a written and signed authorization from a parent or legal guardian.</p>

        <p><strong>5. Payment Policy, Memberships, and Cancellation</strong></p>
        <p>Memberships are paid in advance according to the selected billing cycle via the ThunderWOD app. Late or failed payments will result in the automatic suspension of your ability to book classes. You may cancel your membership renewal directly in the app or via written notice sent by email. Partial refunds are only granted in exceptional, documented medical cases, in accordance with the gym's internal refund policy.</p>

        <p><strong>6. Gym Rules and Member Responsibility</strong></p>
        <p>You are responsible for your own safety and for executing exercises correctly under the coaches' guidance. Members must:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Follow the gym's Internal Rules (ROI) displayed at the location.</li>
          <li>Not use equipment without permission, and ensure it is cleaned and properly stored after use.</li>
          <li>Maintain respectful behavior. The use of alcohol, illegal substances, or aggressive behavior will lead to immediate membership termination without a refund.</li>
        </ul>

        <p><strong>7. Intellectual Property and Image Rights</strong></p>
        <p>All content on www.unbrokenspirit.ro is the intellectual property of UNBROKEN CLUB S.R.L. We reserve the right to capture and use photos/videos of members during classes for marketing purposes on social media, in compliance with GDPR. If you prefer not to be featured, please inform the coach or reception.</p>

        <p><strong>8. Limitation of Liability</strong></p>
        <p>S.C. UNBROKEN CLUB S.R.L. is not responsible for the loss, theft, or damage of personal belongings left in the locker rooms or anywhere on the premises. We are also not liable for service interruptions due to unforeseen circumstances or force majeure.</p>

        <p><strong>9. Modifications and Jurisdiction</strong></p>
        <p>We reserve the right to modify these Terms and Conditions at any time. Continued use of our services constitutes acceptance of the updated terms. Any disputes will be governed by Romanian law and submitted to the competent courts of Bucharest.</p>

        <p><strong>10. Contact</strong></p>
        <p>For any questions or concerns, please contact us at train@unbrokenspirit.ro or by phone at 0748 838 767, 0740 269 769.</p>
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
           <button onClick={() => scrollToSection('hero')} className="flex items-center gap-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg p-1 inline-block hover:opacity-80 transition-opacity">
                <Logo size={56} />
                <div className="text-center leading-tight">
                  <div className="text-xl font-black text-white tracking-wide">CrossFit</div>
                  <div className="text-xs font-black text-blue-400 uppercase tracking-wide">UNBROKEN SPIRIT</div>
                </div>
              </button>
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
              {QUICK_FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <button 
                    onClick={() => scrollToSection(link.href.replace('#', ''))}
                    className="text-gray-300 hover:text-blue-400 transition-colors text-left focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1"
                  >
                    {t(link.label)}
                  </button>
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
                  <a href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer" className="hover:text-sky-400 transition-colors">{t("location")}</a>
                </li>
               <li className="flex items-center gap-3 text-gray-200">
                 <Phone className="w-5 h-5 text-sky-400 flex-shrink-0" />
                 <a href="tel:+40748838767" className="text-sm hover:text-sky-400 transition-colors">+40 748 838 767</a>
               </li>
               <li className="flex items-center gap-3 text-gray-200">
                 <Phone className="w-5 h-5 text-sky-400 flex-shrink-0" />
                 <a href="tel:+40740269769" className="text-sm hover:text-sky-400 transition-colors">+40 740 269 769</a>
               </li>
               <li className="flex items-center gap-3 text-gray-200">
                 <Mail className="w-5 h-5 text-sky-400 flex-shrink-0" />
                 <a href="mailto:train@unbrokenspirit.ro" className="text-sm hover:text-sky-400 transition-colors">train@unbrokenspirit.ro</a>
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
              {language === 'ro' ? 'Confidențialitate și GDPR' : 'Privacy Policy'}
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
      <div className="text-center text-gray-400 text-xs sm:text-sm px-6 pb-4 break-words leading-relaxed">
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