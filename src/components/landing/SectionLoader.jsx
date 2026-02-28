import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export default function SectionLoader() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center justify-center py-20"
    >
      <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
    </motion.div>
  );
}