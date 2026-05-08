import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '../LanguageProvider';
import DropInTermsModal from './DropInTermsModal';

const DROP_IN_CHECKOUT_URL = 'https://checkout.stripe.com/c/pay/cs_live_a17Kbu8l647AcVvFqCkhQQYdGKuCOn3lJAR0xtl7M6WJOSMFW8qWhg6h2k#fidnandhYHdWcXxpYCc%2FJ2FgY2RwaXEnKSdicGRmZGhqaWBTZHdsZGtxJz8nZmprcXdqaScpJ3Zxd2x1YERmZmpwa3EnPydkZmZxWjRRMDR2QUNzXDZmRkw2RHYnKSdkdWxOYHwnPyd1blppbHNgWjA0TjxrTEhDd2RfTGxwPUlfYmNKaTJtVXxidlZJNjFEYF9XVDF8PU88d1Vhd2ZHNk5uS2xUM3BDV3VwUzRmVkZxX111fHNgbWJzQ2lQcmpmYU1ERl9KaXFuNTV8dW98Rn9UcScpJ2N3amhWYHdzYHcnP3F3cGApJ2dkZm5id2pwa2FGamlqdyc%2FJyZjY2NjY2MnKSdpZHxqcHFRfHVgJz8ndmxrYmlgWmxxYGgnKSdga2RnaWBVaWRmYG1qaWFgd3YnP3F3cGB4JSUl';

export default function DropInPaymentModal({ isOpen, onClose }) {
  const { language } = useLanguage();
  const [showTerms, setShowTerms] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
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
              className={`relative w-full ${showCheckout ? 'max-w-5xl' : 'max-w-md'} rounded-2xl border border-blue-400/30 bg-zinc-900 p-6 shadow-2xl shadow-blue-900/30`}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => {
                  setShowCheckout(false);
                  onClose();
                }}
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-zinc-800 text-white transition-colors hover:bg-zinc-700"
                aria-label={isRo ? 'Închide' : 'Close'}
              >
                <X className="h-4 w-4" />
              </button>

              {!showCheckout ? (
                <>
                  <div className="pr-10">
                    <h3 className="text-xl font-black text-white">
                      {isRo ? 'Plătește Drop-In Acum' : 'Pay Drop-In Now'}
                    </h3>
                    <p className="mt-4 rounded-xl border border-blue-400/30 bg-blue-500/10 p-4 text-sm font-semibold leading-relaxed text-white">
                      {isRo
                        ? 'Prin abonarea la acest pachet, accepți termenii și condițiile sălii!'
                        : "By subscribing to this package, you accept the gym's terms and conditions!"}
                    </p>
                  </div>

                  <div className="mt-6">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowTerms(true)}
                      className="w-full border-zinc-600 bg-zinc-800 text-white hover:bg-zinc-700 hover:text-white"
                    >
                      {isRo ? 'Termeni și Condiții' : 'Terms & Conditions'}
                    </Button>
                  </div>
                </>
              ) : (
                <div className="pt-8">
                  <h3 className="mb-4 text-xl font-black text-white">
                    {isRo ? 'Finalizează plata Drop-In' : 'Complete Drop-In Payment'}
                  </h3>
                  <iframe
                    src={DROP_IN_CHECKOUT_URL}
                    title={isRo ? 'Plată Drop-In Stripe' : 'Stripe Drop-In payment'}
                    className="h-[78vh] w-full rounded-xl border border-zinc-700 bg-white"
                  />
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <DropInTermsModal
        isOpen={showTerms}
        onClose={() => setShowTerms(false)}
        onAccept={() => {
          setShowTerms(false);
          setShowCheckout(true);
        }}
      />
    </>
  );
}