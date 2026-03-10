import React, { createContext, useState, useEffect } from 'react';

const LanguageContext = createContext(null);

export const useLanguage = () => {
  const context = React.useContext(LanguageContext);
  if (!context) {
    // Return default context if not wrapped
    return {
      language: 'ro',
      changeLanguage: () => {},
      t: (key) => translations['ro'][key] || key
    };
  }
  return context;
};

export const translations = {
  ro: {
    home: "Acasă",
    startHere: "Începători",
    programs: "Programe",
    pricing: "Prețuri",
    schedule: "Orar",
    contact: "Contact",
    freeTrial: "Prima Ședință Gratuită",
    heroTag: "Pentru tine. Pentru PRs. Pentru comunitate.",
    heroTitle: "FORȚĂ. COMUNITATE. TRANSFORMĂRI REALE.",
    heroSubtitle: "Fie că începi de la zero, fie că ești avansat, găsești la noi tot ce-ți trebuie.",
    startNow: "Începe Acum",
    discoverThePrograms: "Descoperă Programele",
    aboutUs: "Despre Noi",
    moreThangym: "Mai mult decât un gym",
    aboutDesc: "Indiferent de unde pornești, întâlnește oameni care-ți vor succesul. Clasele au oameni în toate stadiile, iar antrenorul adaptează antrenamentul PENTRU TINE. Asta e diferența: nu te-ai adapta tu la sală, ci sala se adaptează la tine.",
    intenseTraining: "Antrenamente Intense",
    intenseTrainingDesc: "WOD-uri care evoluează cu tine.",
    strongCommunity: "Comunitate Puternică",
    strongCommunityDesc: "Nu-ți ascunzi efortul. Aici bate toata lumea palma.",
    professionalCoaching: "Coaching Profesionist",
    professionalCoachingDesc: "Corecții în timp real. La tine, nu la grup.",
    visibleResults: "Rezultate Vizibile",
    visibleResultsDesc: "Măsurabil. Săptămână de săptămână.",
    everyoneUnique: "Toți suntem diferiți",
    everyoneUniqueDesc: "iar programele noastre sunt adaptabile oricărui nivel de formă fizică.",
    crossfitTitle: "CrossFit",
    crossfitDesc: "Antrenamente funcționale de înaltă intensitate, care combină gimnastică, haltere și condiționare.",
    weightlifting: "Haltere",
    weightliftingDesc: "Tehnici de halterofilie olimpică, pentru dezvoltare forței și puterii explozive.",
    gymnastics: "Gimnastică",
    gymnasticsDesc: "Dezvoltă forța relativă, stabilitatea, mobilitatea și flexibilitatea pentru performanță.",
    personalTraining: "Personal Training",
    personalTrainingDesc: "Antrenament 1-la-1 personalizat pentru a-ți atinge obiectivele in ritmul tău.",
    openGym: "Open Gym",
    openGymDesc: "Acces liber la echipamente pentru antrenamente independente.",
    pricingTitle: "Prețuri",
    pricingSubtitle: "Antrenori care te învaţă. O comunitate care nu judecă. Progres vizibil.\nCompetiţia e numai cu tine, nu cu ceilalţi.",
    crossfitMemberships: "Abonamente CrossFit",
    dropIn: "Drop In",
    dropInDesc: "Încearcă un antrenament",
    dropInWeek: "Drop In 1 Week",
    dropInWeekDesc: "Încearcă o săptămână completă",
    eightSessions: "8 Ședințe",
    eightSessionsDesc: "2 antrenamente pe săptămână",
    twelveSessions: "12 Ședințe",
    twelveSessionsDesc: "3 antrenamente pe săptămână",
    unlimited: "Nelimitat",
    unlimitedDesc: "Acces complet fără restricții",
    extraServices: "Servicii Extra",
    openGymMembership: "Open Gym",
    openGymMembershipDesc: "Antrenament independent",
    nutrition: "Nutriție",
    nutritionDesc: "Plan alimentar personalizat",
    ptSessions: "Personal Training",
    pt8sessions: "PT 8 Ședințe",
    pt8sessionsDesc: "Antrenament personalizat",
    pt12sessions: "PT 12 Ședințe",
    pt12sessionsDesc: "Transformare completă",
    popular: "Popular",
    startNowBtn: "Începe Acum",
    ron: "RON",
    scheduleTitle: "Orarul Claselor",
    scheduleSubtitle: "Același WOD, ore diferite. Alege când vrei să vii.",
    monday: "Luni",
    tuesday: "Marți",
    wednesday: "Miercuri",
    thursday: "Joi",
    friday: "Vineri",
    saturday: "Sâmbătă",
    sunday: "Duminică",
    mondayAbbr: "Lun",
    tuesdayAbbr: "Mar",
    wednesdayAbbr: "Mie",
    thursdayAbbr: "Joi",
    fridayAbbr: "Vin",
    saturdayAbbr: "Sâm",
    sundayAbbr: "Dum",
    closed: "Închis",
    noClasses: "Nu avem clase programate în această zi",
    spotsAvailable: "locuri",
    coach: "Antrenor",
    contactTitle: "Hai să vorbim",
    contactTitlePrefix: "Hai să",
    contactTitleHighlight: "vorbim",
    contactSubtitle: "",
    address: "Adresă",
    phone: "Telefon",
    email: "E-mail",
    schedule_label: "Program",
    fullName: "Nume Complet",
    fullNamePlaceholder: "Ion Popescu",
    emailPlaceholder: "ion@email.com",
    phonePlaceholder: "+40 722 123 456",
    message: "Mesaj",
    messagePlaceholder: "Cu ce te putem ajuta?",
    sendMessage: "Trimite Mesajul",
    sending: "Se trimite...",
    thank: "Ești în!",
    thankDesc: "Te vom contacta în 24 de ore pentru a-ți programa prima clasă. Pregătește-te—comunitatea te așteaptă.",
    thankDescMobile: "Te vom contacta în 24 de ore.",
    sendAnother: "Trimite Alt Mesaj",
    follow: "Urmărește-ne",
    location: "Splaiul Unirii 257-259, Sector 3, București",
    locationCity: "Sector 3, București",
    phone1: "+40 748 838 767",
    phone2: "+40 740 269 769",
    email_contact: "train@unbrokenspirit.ro",
    hours: "L-V: 07:00 - 20:30",
    hoursSaturday: "S: 09:00 - 11:30",
    hoursSunday: "D: Închis",
    thunderwod: "ThunderWOD App",
    quickLinks: "Link-uri Rapide",
    footerContact: "Contact",
    terms: "Termeni și Condiții",
    privacy: "Politica de Confidențialitate",
    cookiePolicy: "Politica de Cookie",
    gdprPolicy: "Confidențialitate și GDPR",
    anpc: "ANPC",
    copyright: "Toate drepturile rezervate.",
    tagline: "Comunitatea ta de fitness. Antrenamente funcționale de înaltă intensitate pentru rezultate reale.",
    startHereTitle: "De Unde Să Începi",
    startHereSubtitle: "Toți termenii au fost neclari când i-am auzit prima oară.\nToți am fost în locul tău la un moment dat.",
    startHerePreview: "**Ce înseamnă CrossFit?**\n\nDacă ai căutat pe Internet, probabil ai găsit definiția oficială: \"mișcări funcționale, constant variate, executate la intensitate ridicată\". Sună cam tehnic, nu? **Uite ce înseamnă de fapt:** CrossFit-ul este un antrenament conceput să te pregătească pentru viața reală. Nu te antrenezi doar ca să arăți bine în oglindă (deși asta va fi o consecință).",
    startHerePreviewFullWidth: "Te antrenezi ca să poți ridica o cutie grea fără să ți se blocheze spatele, să alergi după autobuz și să nu rămâi fără aer și să fii în cea mai bună formă fizică a vieții tale.\n\nCombinăm elemente de gimnastică, ridicări de greutăți și cardio, pe care le schimbăm în fiecare zi. La noi, rutina este inamicul, așa că n-o să te plictisești niciodată.",
    startHereFullText1: `## Mitul suprem: „Trebuie să fiu deja în formă ca să mă apuc de CrossFit"

E perfect normal ca prima oară să te simți intimidat, dar asta e și cea mai mare barieră care te ține pe loc. De la bun început, un lucru trebuie să fie clar: **nu trebuie să fii în formă ca să te apuci de CrossFit; te apuci de CrossFit ca să ajungi să fii în formă.**

A spune că trebuie să te antrenezi înainte să vii la noi e ca și cum ai spune că trebuie să știi deja o limbă străină înainte să te înscrii la curs. N-are niciun sens!

Iată realitatea din sala noastră: la aceeași clasă, se pot antrena cot la cot un fost sportiv de performanță și o persoană de 40 de ani care lucrează toată ziua la birou și nu are prea mult timp pentru mișcare. Amândoi fac același antrenament, dar adaptat nivelului fiecăruia (vei vedea mai jos că noi numim asta varianta **scaled**).

* Dacă antrenamentul cere genuflexiuni cu o halteră grea, o persoană poate folosi chiar greutatea prescrisă în antrenament, pe când alta poate folosi o țeavă de PVC sau pur și simplu cu greutatea corpulu, așezându-se pe o cutie.
* Dacă în antrenamentul zilei (**[Workout of the Day](https://www.crossfit.com/workout/)**) sunt programate tracțiuni, unii le vor face la bară, iar alții vor face ramat la inele, sprijinindu-se pe picioare.

Intensitatea e complet relativă. Antrenorii sunt aici ca să se asigure că lucrezi corect și la **limita ta** de confort, nu a celui de lângă tine. **Ego-ul rămâne mereu la ușă.** Vino exact așa cum ești acum.`,
    startHereFullText2: `## De ce CrossFit și nu o Sală Clasică? (Matematica Rezultatelor)

Să fim sinceri: un abonament la o sală clasică este adesea mai ieftin la prima vedere. Dar cât te costă, de fapt, lipsa rezultatelor și timpul pierdut? Iată de ce modelul CrossFit funcționează complet diferit:

* **Antrenor aproape Personal inclus, nu plătit separat:** La o sală clasică, plătești doar accesul la aparate. Dacă vrei să știi ce faci și să nu te accidentezi, trebuie să plătești separat un Antrenor Personal (ceea ce îți mărește considerabil costul lunar). La noi, **antrenorul si antrenamentul sunt incluse în abonament**. Fiecare clasă este condusă de un antrenor care îți explică mișcările, te corectează constant și îți adaptează greutățile. Este antrenament personalizat pentru nivelul tău, dar cu energia și susținerea întregului grup.
* **Eficiență maximă (Fără scroll pe telefon):** Știi cum arată o oră la o sală obișnuită: 15 minute aștepți să se elibereze un aparat, 15 minute stai pe telefon între serii și nu știi exact ce să lucrezi azi. La noi, intri pe ușă și, timp de 60 de minute, ești ghidat secundă cu secundă: încălzire specifică, tehnică, forță și antrenamentul zilei (WOD). **Sunt cele mai eficiente, dar și cele mai plăcute 60 de minute din ziua ta.** Nicio secundă pierdută.
* **Construim o armură, nu doar mușchi de oglindă:** Aparatele de la sala clasică îți izolează mușchii în timp ce stai așezat confortabil pe un scaun. În viața reală, corpul tău nu funcționează așa. Când ridici un copil în brațe, când muți mobilă sau când pui bagajul în avion, corpul tău lucrează ca un întreg. Noi folosim mișcări compuse (genuflexiuni, îndreptări cu bara, ridicări deasupra capului) care declanșează un răspuns hormonal uriaș, arzând grăsime mai rapid și construind o forță funcțională pe care o vei simți zi de zi.
* **Responsabilitate (Cineva observă când lipsești):** Sălilor comerciale le convine cel mai mult să îți faci abonament pe un an și să nu mai treci pe acolo niciodată. Așa fac ele profit. La noi, faci parte dintr-o comunitate. Lucrezi în grupuri mici. Când nu apari la clasa ta obișnuită, antrenorul și colegii te vor întreba a doua zi: *„Hei, unde ai fost ieri, te-am așteptat la antrenament!"*. Această responsabilitate te va face să te mobilizezi și să vii la sală exact în zilele în care motivația îți scade.

## De ce CrossFit și nu doar Alergare în Parc? (Uzura vs. Construcția Corpului)

Alergarea e un mod fantastic de a-ți elibera mintea și de a lucra inima, iar partea cea mai bună e că e gratuită. Dar, din punct de vedere biomecanic, alergarea pe termen lung, fără un antrenament serios de forță, vine cu un preț ridicat:

* **Îți construim șasiul pentru a putea susține motorul:** Gândește-te la inima și plămânii tăi ca la motorul unei mașini, iar la oase, articulații și musculatură ca la șasiu. Alergarea îți face motorul de cursă, dar dacă șasiul tău este slab, se va rupe sub presiune. Durerile constante de genunchi, glezne și șolduri apar la alergători pentru că musculatura picioarelor și a trunchiului (core) nu e suficient de puternică să absoarbă șocul repetat al impactului cu asfaltul. Antrenamentele noastre îți construiesc „armura" necesară pentru a putea alerga ani de zile fără accidentări.
* **Arzi calorii chiar și când dormi:** Alergarea la un ritm constant arde calorii doar *în timp ce alergi*. Imediat ce te-ai oprit, procesul de ardere se încheie. În schimb, antrenamentele noastre cu greutăți și intensitate ridicată dezvoltă masa musculară slabă. Mușchiul e un țesut activ din punct de vedere metabolic. Asta înseamnă că, după un WOD la noi, vei continua să arzi calorii în ritm accelerat (datorită efectului EPOC - Excess Post-exercise Oxygen Consumption) timp de până la 24 de ore după antrenament, chiar și în repaos.
* **Evitarea plafonării:** Corpul uman e o mașinărie incredibilă de supraviețuire și adaptare. Dacă alergi 5 km în fiecare zi, în doar câteva săptămâni corpul tău va deveni atât de eficient la această mișcare încât va arde din ce în ce mai puține calorii pentru același efort. În CrossFit, pentru că schimbăm stimulul zilnic (folosim greutăți diferite, combinăm gimnastica cu sprinturile, modificăm durata efortului), **corpul tău nu se poate plafona**. E scos mereu din zona de confort și forțat să creeze noi adaptări.`,
    startHereFullText3: `## Ce rezultate concrete poți obține?

Nu vindem iluzii, ci rezultate pe care le poți măsura în timp real, săptămână de săptămână:

* **Compoziție corporală schimbată:** Vei vedea o scădere clară a procentului de grăsime și o creștere a masei musculare (hainele se vor așeza altfel pe tine).
* **Forță și rezistență crescute:** Vei putea ridica greutăți la care nici nu visai în prima zi și vei putea susține efortul mai mult timp, fără să obosești.
* **O sănătate de fier:** Analizele tale se vor îmbunătăți (tensiune arterială optimă, ritm cardiac de repaus redus, energie constantă pe tot parcursul zilei).
* **Mobilitate recâștigată:** Întărind musculatura spatelui, îți vei corecta postura greșită de la birou, ameliorând acest dureri.

![CrossFit Glossary](https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69948c0d6b8aa61f49f0a23d/f100bfcb9_image.png)

## Glosarul Începătorului: Vorbește pe limba noastră

La primele antrenamente, s-ar putea să auzi niște termeni care sună a limbaj secret. Stai liniștit, iată mini-dicționarul tău de supraviețuire:

* **Box / Affiliate:** Așa numim noi sala de CrossFit. E un spațiu deschis, brut, fără oglinzi și plin de energie. Sălile oficiale sunt „afiliate" independente, nu francize corporative.
* **WOD (Workout of the Day):** Antrenamentul Zilei. Misiunea ta pentru ziua respectivă, care este mereu diferită de ce ai făcut ieri.
* **AMRAP (As Many Rounds/Reps As Possible):** Provocarea de a face cât mai multe runde sau repetări dintr-un circuit, într-un timp limită dat. Tu ești cel care dictează ritmul!
* **EMOM (Every Minute on the Minute):** Începi un exercițiu fix la începutul fiecărui minut. Ce îți rămâne din acel minut după ce termini repetările este pauza ta. 
* **Tabata:** Un format de antrenament rapid și intens: 8 runde a câte 20 de secunde de efort maxim, urmate de 10 secunde de pauză. Durează doar 4 minute, dar promitem că le vei simți din plin!
* **PR / PB (Personal Record / Personal Best):** Recordul tău personal la o ridicare de greutăți sau la un WOD. Acesta este momentul în care toată sala va bate palma cu tine!
* **Benchmark:** Un antrenament standard, de testare, pe care îl repetăm de câteva ori pe an. Este modul nostru de a măsura clar și matematic cât de mult ai progresat față de lunile trecute.
* **Hero WOD:** Un antrenament special, de obicei mai greu și mai intens, creat la nivel global în onoarea unui membru al forțelor armate sau de intervenție care a căzut la datorie. 
* **Chipper:** Un antrenament format dintr-o listă lungă de exerciții (de obicei cu multe repetări fiecare). Termini toate repetările de la un exercițiu și treci la următorul, „ciobind" treptat din volumul total de muncă până ajungi la final.
* **Met-Con (Metabolic Conditioning):** Partea de condiționare metabolică (cardio) a antrenamentului, menită să-ți crească rezistența la efort și să ardă calorii mult timp după ce ai plecat de la sală.
* **Kipping:** O mișcare fluidă, specifică gimnasticii, în care folosești balansul și impulsul propriului corp pentru a completa o mișcare (cum ar fi tracțiunile la bară). Nu înseamnă că „trișezi", ci că îți miști într-un mod mai eficient întregul corp.
* **RX (As Prescribed):** Când reușești să faci antrenamentul exact cu greutățile și mișcările scrise pe tablă. Este varianta originală, gândită pentru a-i provoca pe cei mai avansați atleți din sală.
* **Scaled (Adaptat / Modificat):** *Acesta este cel mai important cuvânt pentru tine!* Orice mișcare și orice greutate din CrossFit pot fi modificate de antrenor pentru a se potrivi nivelului tău fizic actual, păstrând în același timp beneficiile antrenamentului original.`,
  },
  en: {
    home: "Home",
    startHere: "Beginners",
    programs: "Programs",
    pricing: "Pricing",
    schedule: "Schedule",
    contact: "Contact",
    freeTrial: "Your First Free Session",
    heroTag: "Build strength. Find community. Set PRs.",
    heroTitle: "Strong. Supported. Stronger.",
    heroSubtitle: "New to CrossFit or already competitive, we push you at YOUR level.",
    startNow: "Start Now",
    discoverThePrograms: "Discover the Programs",
    aboutUs: "About Us",
    moreThangym: "More than a gym",
    aboutDesc: "New here or back from competitions? Same class, adapted programming. That's the point: you're not fighting to keep up. You're fighting against yourself.",
    intenseTraining: "High Intensity Training",
    intenseTrainingDesc: "Programming that grows with you.",
    strongCommunity: "Strong Community",
    strongCommunityDesc: "Your progress is witnessed. Celebrated.",
    professionalCoaching: "Professional Coaching",
    professionalCoachingDesc: "Real-time coaching designed for YOU, not the class.",
    visibleResults: "Visible Results",
    visibleResultsDesc: "You'll PR within 4 weeks. Guaranteed.",
    everyoneUnique: "We are all different,",
    everyoneUniqueDesc: "and our programs are scalable to any fitness level.",
    crossfitTitle: "CrossFit",
    crossfitDesc: "High-intensity functional workouts combining gymnastics, weightlifting and conditioning.",
    weightlifting: "Weightlifting",
    weightliftingDesc: "Olympic weightlifting techniques for strength and explosive power development.",
    gymnastics: "Gymnastics",
    gymnasticsDesc: "Develop relative strength, stability, mobility and flexibility for performance.",
    personalTraining: "Personal Training",
    personalTrainingDesc: "1-on-1 personalized training to achieve your goals at your own pace.",
    openGym: "Open Gym",
    openGymDesc: "Free access to equipment for independent workouts.",
    pricingTitle: "Pricing",
    pricingSubtitle: "Learn right from day one. No judgment. Real coaches, real progress.\nCompete with your past self.",
    crossfitMemberships: "CrossFit Memberships",
    dropIn: "Drop In",
    dropInDesc: "Try a workout",
    dropInWeek: "Drop In 1 Week",
    dropInWeekDesc: "Try a full week",
    eightSessions: "8 Sessions",
    eightSessionsDesc: "2 workouts per week",
    twelveSessions: "12 Sessions",
    twelveSessionsDesc: "3 workouts per week",
    unlimited: "Unlimited",
    unlimitedDesc: "Unlimited access with no restrictions",
    extraServices: "Extra Services",
    openGymMembership: "Open Gym",
    openGymMembershipDesc: "Independent training",
    nutrition: "Nutrition",
    nutritionDesc: "Personalized meal plan",
    ptSessions: "Personal Training",
    pt8sessions: "PT 8 Sessions",
    pt8sessionsDesc: "Personalized training",
    pt12sessions: "PT 12 Sessions",
    pt12sessionsDesc: "Complete transformation",
    popular: "Popular",
    startNowBtn: "Start Now",
    ron: "RON",
    scheduleTitle: "Class Schedule",
    scheduleSubtitle: "Same workout, multiple times. Better fit means you won't skip.",
    monday: "Monday",
    tuesday: "Tuesday",
    wednesday: "Wednesday",
    thursday: "Thursday",
    friday: "Friday",
    saturday: "Saturday",
    sunday: "Sunday",
    mondayAbbr: "Mon",
    tuesdayAbbr: "Tue",
    wednesdayAbbr: "Wed",
    thursdayAbbr: "Thu",
    fridayAbbr: "Fri",
    saturdayAbbr: "Sat",
    sundayAbbr: "Sun",
    closed: "Closed",
    noClasses: "We have no classes scheduled for this day",
    spotsAvailable: "spots",
    coach: "Coach",
    contactTitle: "Let's Talk",
    contactTitlePrefix: "Let's",
    contactTitleHighlight: "Talk",
    contactSubtitle: "Free first class. Zero judgment. Bring nothing but yourself. That's all we need.",
    address: "Address",
    phone: "Phone",
    email: "E-mail",
    schedule_label: "Schedule",
    fullName: "Full Name",
    fullNamePlaceholder: "John Doe",
    emailPlaceholder: "john@email.com",
    phonePlaceholder: "+40 722 123 456",
    message: "Message",
    messagePlaceholder: "How can we help?",
    sendMessage: "Send Message",
    sending: "Sending...",
    thank: "You're In!",
    thankDesc: "We'll reach out within 24 hours to schedule your first class. Get ready—the community is waiting.",
    sendAnother: "Send Another Message",
    thankDescMobile: "We'll reach out within 24 hours.",
    follow: "Follow Us",
    location: "Splaiul Unirii 257-259, Sector 3, Bucharest",
    locationCity: "Sector 3, Bucharest",
    phone1: "+40 748 838 767",
    phone2: "+40 740 269 769",
    email_contact: "train@unbrokenspirit.ro",
    hours: "Mon-Fri: 07:00 - 20:30",
    hoursSaturday: "Sat: 09:00 - 11:30",
    hoursSunday: "Sun: Closed",
    thunderwod: "ThunderWOD App",
    quickLinks: "Quick Links",
    footerContact: "Contact",
    terms: "Terms & Conditions",
    privacy: "Privacy Policy",
    cookiePolicy: "Cookie Policy",
    gdprPolicy: "Privacy Policy",
    anpc: "ANPC",
    copyright: "All rights reserved.",
    tagline: "Your fitness community. High-intensity functional training for real results.",
    startHereTitle: "Where to Start",
    startHereSubtitle: "Every single term here was confusing when we first heard it. Everyone was you once.",
    startHerePreview: "**What is CrossFit?**\n\nIf you already searched on the Internet, you probably found the official definition: \"constantly varied functional movements, executed at a high intensity\". Sounds pretty technical, right? **Here's what it actually means:** CrossFit is a training program designed to prepare you for real life. You're not just training to look good in the mirror (though that will be a consequence).",
    startHerePreviewFullWidth: "You're training so you can lift a heavy box without breaking your back, so you can run for the bus without running out of breath, and be in the best physical shape of your life.\n\nWe combine gymnastics, weightlifting and cardio elements, which we vary every day. With us, routine is the enemy, so you will never get bored.",
    startHereFullText1: `## The Biggest Lie: "I First Need to Be in Shape Before I Start CrossFit"

It's perfectly normal to feel intimidated the first time, but that's also the biggest barrier keeping you stuck. From the start, one thing must be clear: **you don't need to be in shape to start CrossFit; you start CrossFit to get in shape.**

Saying you need to train before coming to us is like saying you need to already know a foreign language before signing up for a course. It makes no sense!

Here's the reality in our gym: at the same class, a former competitive athlete and a 40-year-old with a desk job can train side by side. Both do the same workout, but adapted to each person's level (we call this the **scaled** version).

* If the workout calls for squats with a heavy weight, one person might use the prescribed weight, while another might use a PVC pipe or just bodyweight, sitting on a box.
* If today's [Workout of the Day](https://www.crossfit.com/workout/) (WOD) has pull-ups, some will do them at the bar, others will do assisted ring rows with their feet on the ground.

Intensity is completely relative. Coaches are here to make sure you work correctly and at **your limit**. **Your ego stays at the door.** Come exactly as you are now.`,
    startHereFullText1Part2En: `## Why CrossFit and Not a Traditional Gym? (The Simple Math)

Let's be honest: a traditional gym membership often seems cheaper at first glance. But how much does a lack of results and wasted time really cost you? Here's why the CrossFit model works completely differently:

* **An almost Personal Trainer is included:** In a traditional gym, you pay only for access to equipment. If you want to know what you're doing and avoid injury, you need to pay separately for a Personal Trainer (which significantly increases your monthly cost). With us, **the coach and workout are included in your membership**. Every class is led by a coach who explains movements, constantly corrects you, and adjusts weights for you. It's personalized training for your level, but with the energy and support of the whole group.
* **No doom scrolling on your phone:** Here's what an hour at a regular gym looks like: 15 minutes waiting for equipment to free up, 15 minutes on your phone between sets, and no clue what to work on today. With us, you walk in the door and for 60 minutes you get step by step guidance: specific warm-up, technique, strength, and the [Workout of the Day](https://www.crossfit.com/workout/) (WOD). **These are the most efficient, but also the most enjoyable 60 minutes of your day.** No time wasted.
* **We build armor, not just mirror muscles:** Machines at traditional gyms isolate your muscles while you sit comfortably in a chair. In real life, your body doesn't work that way. When you lift a child, move furniture, or put luggage in a plane, your body works as a whole. We use compound movements (squats, deadlifts, overhead presses) that trigger a massive hormonal response, burning fat faster and building functional strength you'll feel every day.
* **Accountability (Someone notices when you're missing):** Commercial gyms profit most when you buy a year-long membership and never come back. That's their business model. With us, you're part of a community. You train in small groups. When you miss your regular class, the coach and your classmates will ask you the next day: *"Hey, where were you yesterday, we were waiting for you in class!"*. This accountability will motivate you to come to the gym exactly when your motivation dips.

## Why CrossFit and Not Just Running in the Park? (Wear and Tear vs. Building)

Running is a fantastic way to clear your mind and work your heart, and the best part is it's free. But from a biomechanical perspective, long-term running without serious strength training comes with a heavy price:

* **We build the chassis to support the engine:** Think of your heart and lungs as a car's engine, and your bones, joints, and muscles as the chassis. Running builds your racing engine, but if your chassis is weak, it will break under pressure. Constant knee, ankle, and hip pain in runners happens because the leg and core muscles aren't strong enough to absorb the repeated impact of hitting the pavement. Our training builds the "armor" you need to run for years without injury.
* **You burn calories even when sleeping:** Running at a steady pace only burns calories *while you're running*. The moment you stop, the burn stops. In contrast, our weight and high-intensity training builds lean muscle mass. Muscle is metabolically active tissue. This means after a WOD with us, you'll continue burning calories at an accelerated rate (thanks to the EPOC effect - Excess Post-exercise Oxygen Consumption) for up to 24 hours after training, even at rest.
* **Avoiding plateaus:** The human body is an incredible survival and adaptation machine. If you run 5 km every day, within weeks your body becomes so efficient at this movement that it burns fewer and fewer calories for the same effort. In CrossFit, because we change the stimulus daily (using different weights, combining gymnastics with sprints, changing effort duration), **your body can't plateau**. It's constantly pushed out of its comfort zone and forced to create new adaptations.`,
    startHereFullText2: `## What Can You Get Out of CrossFit Training?

We don't sell illusions, but results you can measure in real time, week by week:

* **Changed body composition:** You'll see a clear decrease in fat percentage and an increase in muscle mass (clothes will fit differently on you).
* **Increased strength and endurance:** You'll be able to lift weights you didn't even dream of on day one and sustain effort longer without getting tired.
* **Solid health:** Your blood work will improve (optimal blood pressure, reduced resting heart rate, constant energy throughout the day).
* **Restored mobility:** By strengthening your back muscles, you'll correct poor desk posture and eliminate stiffness and back pain.

![CrossFit Glossary](https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69948c0d6b8aa61f49f0a23d/47b405b96_image.png)

## Beginner's Glossary: Speak Our Language

At your first workouts, you might hear terms that sound like secret language. Don't worry, here's your survival dictionary:

* **Box / Affiliate:** That's what we call the CrossFit gym. It's an open, raw space with no mirrors and full of energy. Official gyms are independent "affiliates", not corporate franchises.
* **WOD (Workout of the Day):** Your task for the day, which is always different from what you did yesterday.
* **AMRAP (As Many Rounds/Reps As Possible):** The challenge to do as many rounds or reps as possible from a series of exercises in a given time. You set your own pace!
* **EMOM (Every Minute on the Minute):** You start an exercise at the beginning of each minute. Your reps is your rest time.
* **Tabata:** A fast and intense workout format: 8 rounds, 20 seconds each, of maximum effort, followed by 10 seconds of rest. It only lasts 4 minutes, but we promise you'll feel it fully!
* **PR / PB (Personal Record / Personal Best):** Your personal record on a lift or a WOD. This is the moment the whole gym will clap for you!
* **Benchmark:** A standard test workout we repeat a few times a year. It's how we clearly and mathematically measure how much you've progressed from the previous months.
* **Hero WOD:** A special, usually harder and more intense workout, created globally in honor of a member of the armed forces or emergency services that died in the line of duty.
* **Chipper:** A workout made up of a long list of exercises (usually with many reps each). You finish all reps of one exercise and move to the next, gradually "chipping away" at the total volume of work until you reach the end.
* **Met-Con (Metabolic Conditioning):** The metabolic conditioning (cardio) part of the workout, designed to increase your endurance and burn calories long after you leave the gym.
* **Kipping:** A fluid movement, specific to gymnastics, where you use the swing and momentum of your own body to complete a movement (like pull-ups on the bar). It doesn't mean you're "cheating," it means you're moving more efficiently using your whole body.
* **RX (As Prescribed):** When you manage to do the workout exactly as written on the board with the prescribed weights and movements. It's the original version, designed to challenge the most advanced athletes in the gym.
* **Scaled (Adapted / Modified):** *This is the most important word for you!* Any CrossFit movement and any weight can be modified by the coach to fit your current fitness level, while still preserving the benefits of the original workout.`,
    startHereFullText3: ``,
  }
};

export default function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('appLanguage') || 'ro';
    }
    return 'ro';
  });

  const changeLanguage = (lang) => {
    localStorage.setItem('appLanguage', lang);
    setLanguage(lang);
  };

  const t = (key) => {
    return translations[language][key] || translations['ro'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}