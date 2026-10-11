import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function FaqItem({ faq, isOpen, onToggle, delay = 0, children }) {
  return (
    <motion.div
      id={faq.id}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <button
        onClick={onToggle}
        className={cn(
          'w-full text-left px-5 sm:px-6 py-4 rounded-xl border transition-all duration-200',
          isOpen
            ? 'bg-blue-600/10 border-blue-500/50'
            : 'bg-zinc-900/50 border-zinc-800 hover:border-blue-500/30'
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-base sm:text-lg font-semibold text-white pr-2">{faq.q}</h3>
          <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }} className="flex-shrink-0 mt-0.5">
            <ChevronDown className="w-5 h-5 text-sky-400" />
          </motion.div>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-5 sm:px-6 py-4 bg-zinc-900/30 border-l-2 border-blue-500 mt-1 rounded-lg space-y-3">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}