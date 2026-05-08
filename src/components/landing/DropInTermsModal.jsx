import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

const TERMS_TEXT = `REGULI GENERALE

BUN VENIT LA CROSSFIT UNBROKEN SPIRIT! Pentru a asigura un mediu sigur, curat și o comunitate unită, te rugăm să respecți următoarele reguli în incinta sălii (București, Sector 3, Splaiul Unirii 257-259).

Reguli Generale privind Accesul și Orarul
Toţi clienţii – membri sau invitaţi – trebuie să fie înregistraţi în aplicația ThunderWOD la intrarea în sală. Membrii au acces în locație doar în baza prezentării abonamentului la fiecare vizită.
Accesul în sala Unbroken Spirit NU ESTE PERMIS persoanelor aflate sub influenţa alcoolului sau drogurilor.
Este obligatorie folosirea protecției pentru încălțămintea de stradă pe toată durata vizitei dumneavoastră în sală.
Toţi invitaţii care nu sunt membri ai sălii CrossFit Unbroken Spirit, trebuie să accepte termenii și condițiile la activarea invitațiilor (după caz, inclusiv prin aplicația ThunderWOD) și să prezinte un act de identitate. Persoanele interesate de serviciile CrossFit Unbroken Spirit și care doresc să viziteze facilitățile, trebuie să completeze un „Formular de vizitator”, înainte de a face turul locației.
Membrii CrossFit Unbroken Spirit își dau acordul de a fi introduși în baza noastră de date, în scopul identificării şi utilizării legitime a dreptului de acces, în mod implicit prin semnarea contractului de membru.
Respectaţi orarul de funcționare al sălii. Vă rugăm să verificaţi programul de funcționare al sălii, afişat la intrare. Părăsirea clubului la ora închiderii este obligatorie. Nu este permis accesul în zonele de antrenament după ora închiderii.
Fumatul este interzis în această locație (inclusiv fumatul cu dispozitive electronice).
Sunt interzise fotografierea şi filmarea fără aprobarea conducerii clubului. Ne rezervăm dreptul de a folosi fotografii individuale sau de grup, sau filmări ale dumneavoastră în scopuri promoționale. În măsura în care este posibil în mod rezonabil, vă vom anunța cu privire la orice filmare sau fotografiere care are loc în sală și vă putem solicita să semnați un formular de utilizare a drepturilor de imagine pentru a vă da acordul.

Programări și Participarea la Clase
Accesul la clase se face exclusiv pe bază de programare în aplicația ThunderWOD.
Dacă nu te poți prezenta, te rugăm să anulezi programarea cu cel puțin 2 ore înainte, pentru a lăsa locul altui coleg.
Fii punctual! Încălzirea este obligatorie pentru prevenirea accidentărilor.
Dacă întârzii mai mult de 5 minute de la începerea clasei, antrenorul are dreptul să îți refuze participarea, din motive de siguranță.

Sănătate, Siguranță și Accesul Minorilor
Fiţi întotdeauna atenţi la siguranţa celorlalţi şi daţi dovadă de amabilitate în interacţiunea cu aceştia. Semnalaţi conducerii orice aspect care implică lipsa siguranței.
Doar persoanele care sunt apte fizic şi au primit acordul medicului pot să-și desfășoare antrenamentul în sală. Toţi clienţii utilizează echipamentele puse la dispoziție de către CrossFit Unbroken Spirit pe propriul risc.
Vă rugăm să informaţi instructorul/antrenorul personal dacă sunteţi însărcinată sau vă confruntaţi cu probleme de sănătate. Dacă ai o accidentare, durere sau disconfort, anunță antrenorul înainte de clasă pentru a-ți putea adapta antrenamentul.
În cazul în care apar stări de amețeală, aveți senzația de leșin sau rămâneți fară aer, scădeți intensitatea antrenamentului prin mers pe loc sau încetaţi să mai faceţi efort.
Este interzisă utilizarea echipamentelor pentru antrenament de către persoane aflate sub influenţa alcoolului, a substanţelor stimulante sau orice alte substanțe care vă pot afecta abilitățile de a vă antrena în siguranță, precum și de către persoane cu probleme de sănătate care nu au primit acordul medicului.
Accesul copiilor și minorilor: Minorii cu vârsta de până la 12 ani au acces și trebuie să fie însoțiți în permanență de un părinte/tutore legal având calitatea de membru CrossFit Unbroken Spirit. Consultați regulamentul privind accesul copiilor în sălile de antrenament, clasele de group fitness, afișat pe website-ul sălii. Minorii cu vârste cuprinse între 6 și 15 ani se vor antrena numai sub supravegherea unui antrenor personal, în baza unui contract de prestări servicii, semnat cu acordul prealabil scris al părintelui/tutorelui legal.

Echipament, Conduita în Sală și Curățenie
Echipament obligatoriu: Accesul în zona de antrenament este permis DOAR cu încălțăminte sport de schimb, curată. Nu intra pe suprafața de antrenament cu încălțămintea de afară. Echipamentul sportiv este obligatoriu în zona de antrenament: încălţăminte sport pentru interior, tricou/maiou, pantaloni, colanți. Nu sunt acceptate hainele de stradă sau papucii.
Tehnică și conduită la antrenament: Lasă orgoliul la ușă. Tehnica și execuția corectă primează în fața greutății ridicate pe bară. Ascultă indicațiile antrenorilor și nu ezita să ceri ajutorul. Apelați cu încredere la personalul CrossFit Unbroken Spirit oricând aveţi nevoie de ajutor.
Echipamentele puse la dispoziție de către CrossFit Unbroken Spirit vor fi utilizate conform modelului standard de utilizare. În situația în care nu vă este familiar un echipament, vă rugăm să apelați la unul dintre antrenori pentru asistență.
Nu trânti echipamentul necorespunzător. Este strict interzisă trântirea barelor goale, a kettlebell-urilor sau a ganterelor. Barele încărcate cu discuri de tip bumper pot fi lăsate să cadă controlat când este necesar pentru siguranță.
Folosiţi un singur aparat sau accesoriu şi permiteţi și celorlalte persoane prezente în zona de antrenament să le folosească atunci când faceţi pauze între seturi. Nu ocupaţi aparatele în timpul pauzelor dintre exerciţii.
Așezați greutățile cu atenție în locul destinat, după ce ați finalizat antrenamentul.
Igienă: Clienții au obligația să păstreze normele minime de igienă personală. Folosirea unui prosop personal este recomandată. Folosiți un prosop atunci când utilizați aparatele și dezinfectați-le după utilizare.
Regula de aur: Unde ai transpirat sau sângerat, cureți! La finalul clasei, fiecare membru are obligația de a dezinfecta echipamentul folosit (bare, bănci, aparate cardio, saltele) cu soluțiile puse la dispoziție și de a-l așeza la locul lui.
Folosește magneziul cu moderație, deasupra găleții, pentru a nu face mizerie excesivă. În cazul folosirii materialelor ajutătoare (pudră de magneziu sau altele), aveți obligația de a curăța suprafața și accesoriile.
Diverse restricții tehnice: Este interzisă modificarea setărilor termostatului de aer condiționat. Aceste modificări pot fi făcute doar de către personalul CrossFit Unbroken Spirit după anumite norme.
Este interzisă depozitarea accesoriilor personale pentru antrenament în incinta sălilor CrossFit Unbroken Spirit. Orice utilizare a echipamentului personal atrage după sine întreaga responsabilitate, iar Unbroken Spirit nu își asumă răspunderea pentru orice daună și/sau accidentare survenită în timpul antrenamentului.
Serviciile de Personal Training pot fi oferite numai de către antrenorii personali, colaboratori CrossFit Unbroken Spirit. Este interzisă comercializarea suplimentelor sportive sau a altor produse în incinta sălii CrossFit Unbroken Spirit.

Comunitate și Respect
CrossFit Unbroken Spirit este o comunitate incluzivă. Respectul reciproc, încurajarea colegilor și o atitudine pozitivă sunt obligatorii.
Toţi clienţii sunt rugaţi să se poarte în mod respectuos unii faţă de ceilalţi pentru a nu provoca situaţii neplăcute care se pot solda cu daune morale sau fizice (violenţă fizică, insulte, afectarea emoţională a altor membri).
Comportamentul agresiv, limbajul jignitor, discriminarea sau hărțuirea de orice fel atrag anularea imediată a abonamentului și interzicerea accesului în sală. Orice abatere atrage sancțiuni sau chiar rezilierea abonamentului.
Convorbirile telefonice nu sunt permise în zona de antrenament.

Reguli și Recomandări în Vestiare (Adulți)
Te rugăm să îți lași obiectele de valoare acasă. Bunurile personale/ Lucrurile de valoare trebuie să fie depozitate în dulapul alocat. Membrii sunt rugaţi să-şi depoziteze bunurile în dulapurile din vestiare. S.C. UNBROKEN CLUB S.R.L. nu este responsabilă pentru bunurile lăsate în vestiare sau în zona de antrenament. CrossFit Unbroken Spirit nu poate fi făcut responsabil pentru bunurile personale pierdute sau furate.
Vă rugăm să arătați respect față de ceilalți membri din club. Vă rugăm să semnalați angajaților noştri orice comportament nepotrivit.
Vă rugăm să respectați regulile de ordine şi igienă. Nu lăsați prosoape sau haine pe jos. Nu folosiți în exces deodorante sau parfumuri.
Nu folosiți un limbaj ofensator sau nepotrivit.
Filmarea şi fotografierea sunt interzise.
Vestiarul şi cheia de la vestiar pot fi utilizate de către membru pe parcursul unei singure vizite în incinta clubului. Membrii pot utiliza un singur vestiar pe perioada șederii în incinta clubului. La plecare, cheia se lasă la recepție/dulap.
Membrilor le este interzis să depoziteze peste noapte obiecte personale în vestiarele sălii. La închiderea sălii, toate dulapurile din vestiare se deschid automat.
Acces copii în vestiarele generale: Nu vă lăsați copiii nesupravegheați. Copiii cu vârsta mai mică de 8 ani se pot schimba în vestiarele de ambele sexe sub supravegherea unui adult. Părintele/tutorele poate însoți copilul în aceste vestiare, indiferent de sexul adultului. Copiii cu vârsta cuprinsă între 8 și 15 ani se vor schimba în vestiarele adulților corespunzătoare sexului lor (fetele în vestiarul destinat femeilor, băieții în vestiarul destinat bărbaților). Este interzis accesul în vestiar cu cărucioare de copii.

Reguli și Recomandări în Vestiarele Pentru Copii
Vestiarul poate fi utilizat de către copiii cu vârsta de până la 12 ani, însoțiți de un părinte/tutore legal. Nu vă lăsați copiii nesupravegheați.
Copiii cu vârsta de peste 12 ani vor utiliza vestiarul adulților de același sex (fetele în vestiarul destinat femeilor, băieții în vestiarul destinat bărbaților).
Vestiarul destinat copiilor nu poate fi utilizat de către persoanele adulte.
Vestiarul şi cheia de la vestiar pot fi utilizate pe parcursul unei singure vizite în incinta clubului. Bunurile personale trebuie închise în dulapurile din vestiare. Membrilor le este interzis să depoziteze peste noapte obiecte personale în vestiarele centrului. La închiderea clubului, toate dulapurile se vor deschide automat.
CrossFit Unbroken Spirit nu poate fi făcut responsabil pentru pierderea sau furtul bunurilor personale ale membrilor.
Este interzis accesul în vestiar cu cărucioare de copii.

Anexa 1

ACORD PARENTAL
ȘI DECLARAȚIE DE ASUMARE A RISCURILOR PENTRU MINORI (implicită)

Prin semnarea contractului/abonamentului și/sau prin acceptarea Regulamentului de Ordine Interioară și a Termenilor și Condițiilor CrossFit Unbroken Spirit (inclusiv prin aplicația ThunderWOD), părintele/tutorele legal declară și acceptă următoarele:

Acord de participare: își dă acordul ca minorul pentru care achiziționează abonamentul/sesiunea să participe la activitățile sportive organizate de CrossFit Unbroken Spirit.
Asumarea riscului: înțelege că antrenamentele (inclusiv antrenamentele de intensitate ridicată) implică efort fizic și utilizarea echipamentelor, existând riscuri inerente de accidentare. Declară că minorul este apt din punct de vedere medical pentru participare sau, după caz, că a obținut aviz medical atunci când există recomandări/condiții speciale.
Răspundere: își asumă responsabilitatea pentru participarea minorului și exonerează Unbroken Club S.R.L., antrenorii și personalul de răspundere pentru incidente/accidentări care nu sunt rezultatul unei culpe grave dovedite a personalului.
Intervenție de urgență: autorizează solicitarea serviciilor medicale de urgență (Ambulanță/SMURD) pentru minor atunci când situația o impune.
Respectarea Regulamentului: confirmă că minorul va respecta indicațiile antrenorilor și regulile clubului; nerespectarea acestora poate conduce la suspendarea accesului minorului la activități.
Consimțământ foto/video: Sunt de acord de acord ca imaginea minorului (foto/video) realizată în timpul activităților să fie utilizată de Unbroken Spirit exclusiv în scop de promovare, după caz.`;

export default function DropInTermsModal({ isOpen, onClose, onAccept }) {
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            className="flex max-h-[88vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-zinc-700 bg-zinc-900 shadow-2xl"
          >
            <div className="border-b border-zinc-700 p-5">
              <h2 className="text-xl font-black text-white">Termeni și Condiții</h2>
              <p className="mt-1 text-sm text-gray-400">Te rugăm să citești regulile înainte de a continua.</p>
            </div>

            <div className="overflow-y-auto p-5 text-sm leading-relaxed text-gray-300 whitespace-pre-line">
              {TERMS_TEXT}
            </div>

            <div className="border-t border-zinc-700 bg-zinc-950/80 p-5">
              <label className="flex cursor-pointer items-start gap-3 text-sm text-gray-200">
                <input
                  type="checkbox"
                  checked={accepted}
                  onChange={(e) => setAccepted(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-zinc-600 accent-blue-600"
                />
                <span>Am citit și sunt de acord cu termenii și condițiile.</span>
              </label>

              <Button
                type="button"
                disabled={!accepted}
                onClick={onAccept || onClose}
                className="mt-4 w-full bg-blue-600 text-white hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Acceptă și continuă către plată
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}