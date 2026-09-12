import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '../LanguageProvider';
import DropInTermsModal from './DropInTermsModal';
import DropInDetailsModal from './DropInDetailsModal';

export default function DropInPaymentModal({ isOpen, onClose }) {
  const { language } = useLanguage();
  const [showTerms, setShowTerms] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const isRo = language === 'ro';

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
            onClick={onClose}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-md rounded-2xl border border-blue-400/30 bg-zinc-900 p-6 shadow-2xl shadow-blue-900/30"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => {
                  setShowDetails(false);
                  setShowTerms(false);
                  onClose();
                }}
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-zinc-800 text-white transition-colors hover:bg-zinc-700"
                aria-label={isRo ? 'Închide' : 'Close'}
              >
                <X className="h-4 w-4" />
              </button>

              <div className="text-center">
                <h3 className="px-10 text-xl font-black text-white">
                  {isRo ? 'Plătește Drop-In Acum' : 'Pay Drop-In Now'}
                </h3>
                <p className="mx-auto mt-4 rounded-xl border border-blue-400/30 bg-blue-500/10 p-4 text-center text-sm font-semibold leading-relaxed text-white">
                  {isRo
                    ? <>{'Prin abonarea la acest pachet,'}<br />{'accepți termenii și condițiile sălii!'}</>
                    : <>By subscribing to this package,<br />you accept the gym&apos;s terms and conditions!</>}
                </p>
              </div>

              <div className="mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowDetails(true)}
                  className="w-full border-zinc-600 bg-zinc-800 text-white hover:bg-zinc-700 hover:text-white"
                >
                  {isRo ? 'Completează detaliile' : 'Fill in details'}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <DropInDetailsModal
        isOpen={showDetails}
        onClose={() => setShowDetails(false)}
        onSubmitted={() => {
          setShowDetails(false);
          setShowTerms(true);
        }}
      />

      <DropInTermsModal
        isOpen={showTerms}
        onClose={() => setShowTerms(false)}
        onAccept={() => {
          setShowTerms(false);
          onClose();
        }}
      />
    </>
  );
}