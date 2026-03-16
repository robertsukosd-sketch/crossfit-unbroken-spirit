import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../LanguageProvider';

export default function SubscriptionConfirmModal({ isOpen, onConfirm, onCancel }) {
  const { language } = useLanguage();
  const isRo = language === 'ro';

  const message = isRo
    ? 'Plata abonamentelor se face numai prin intermediul aplicației de mobil ThunderWOD.'
    : 'Plan payments are made through the ThunderWOD mobile app.';

  const confirmText = isRo ? 'OK' : 'OK';
  const cancelText = isRo ? 'Renunț' : 'Cancel';

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCancel}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-zinc-900 border border-blue-400/40 rounded-2xl shadow-2xl shadow-blue-900/40 max-w-sm w-full overflow-hidden">
              {/* Header */}
              <div className="px-6 py-4 border-b border-blue-400/20 bg-gradient-to-r from-zinc-900 to-zinc-800">
                <h2 className="text-lg font-bold text-white">
                  {isRo ? 'Informație importantă' : 'Important Information'}
                </h2>
              </div>

              {/* Content */}
              <div className="px-6 py-6">
                <div className="px-4 py-3 rounded-lg bg-blue-500/15 border border-blue-400/40">
                  <p className="text-white text-center text-base font-semibold leading-relaxed">
                    {message}
                  </p>
                </div>
              </div>

              {/* Footer with buttons */}
              <div className="px-6 py-4 border-t border-blue-400/20 flex gap-3 justify-center">
                <button
                  onClick={onCancel}
                  className="px-6 py-2.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-gray-300 hover:text-white font-semibold transition-colors duration-150 text-sm"
                >
                  {cancelText}
                </button>
                <button
                  onClick={onConfirm}
                  className="px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors duration-150 text-sm shadow-lg shadow-blue-600/40"
                >
                  {confirmText}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}