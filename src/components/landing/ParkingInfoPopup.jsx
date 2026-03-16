import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, ZoomIn, ZoomOut } from 'lucide-react';
import { useLanguage } from '../LanguageProvider';

export default function ParkingInfoPopup({ isOpen, onClose }) {
  const { language } = useLanguage();
  const [mapExpanded, setMapExpanded] = useState(false);
  const isRo = language === 'ro';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 12 }}
            transition={{ type: 'spring', damping: 24, stiffness: 300 }}
            className="relative w-full max-w-sm bg-zinc-900 border border-zinc-700 rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors p-1 rounded-full hover:bg-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 z-10"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="p-5 space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-sky-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-base font-bold text-white mb-3">
                    {isRo ? 'Cum ajungi la sală?' : 'How to get to the box?'}
                  </h3>
                  <p className="text-sm text-gray-300 leading-relaxed mb-4">
                    {isRo
                      ? 'Sala este ușor accesibilă atât cu transportul în comun, cât și cu mașina.'
                      : 'The box is easily accessible by both public transport and car.'}
                  </p>

                  <div className="space-y-3">
                    <div>
                      <p className="text-xs font-semibold text-sky-300 mb-1">
                        {isRo ? '🚇 Metrou' : '🚇 Subway'}
                      </p>
                      <p className="text-xs text-gray-400">
                        {isRo
                          ? 'Stația Mihai Bravu, la 7–8 minute de mers pe jos'
                          : 'Mihai Bravu station, a 7–8 minute walk away'}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-sky-300 mb-1">
                        {isRo ? '🚌 Transport Public' : '🚌 Public Transport'}
                      </p>
                      <p className="text-xs text-gray-400">
                        {isRo
                          ? 'Pod Mihai Bravu (autobuz 223 și tramvaie 1 și 10)'
                          : 'Pod Mihai Bravu (bus 223 and trams 1 and 10)'}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-sky-300 mb-1">
                        {isRo ? '🅿️ Parcare' : '🅿️ Parking'}
                      </p>
                      <p className="text-xs text-gray-400">
                        {isRo ? 'Parcare gratuită inclusă!' : 'Free parking included!'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map image */}
              <button
                onClick={() => setMapExpanded(true)}
                className="relative w-full group cursor-pointer"
              >
                <img
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69948c0d6b8aa61f49f0a23d/4054d6144_image.png"
                  alt={isRo ? 'Hartă traseu spre sală' : 'Map route to the gym'}
                  className="w-full rounded-lg border border-zinc-700 group-hover:border-sky-400 transition-colors"
                />
                <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/0 group-hover:bg-black/30 transition-colors">
                  <ZoomIn className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Fullscreen map view */}
      <AnimatePresence>
        {mapExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setMapExpanded(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setMapExpanded(false)}
                className="absolute -top-10 right-0 text-gray-300 hover:text-white transition-colors p-2 rounded-full hover:bg-zinc-700/50"
                aria-label="Close map"
              >
                <ZoomOut className="w-5 h-5" />
              </button>
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69948c0d6b8aa61f49f0a23d/4054d6144_image.png"
                alt={isRo ? 'Hartă traseu spre sală' : 'Map route to the gym'}
                className="w-full rounded-lg border-2 border-sky-400"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AnimatePresence>
  );
}