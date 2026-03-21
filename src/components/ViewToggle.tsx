'use client';

import { useView } from '@/context/ViewContext';
import { motion } from 'framer-motion';
import { Eye, Sparkles } from 'lucide-react';

export default function ViewToggle() {
  const { viewMode, toggleView } = useView();

  return (
    <motion.button
      onClick={toggleView}
      className="fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-2 rounded-full border border-[#1e1e2e] bg-[#12121a]/90 backdrop-blur-md text-sm text-[#8888a0] hover:text-white hover:border-blue-500/40 transition-all duration-300"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {viewMode === 'institutional' ? (
        <>
          <Eye className="w-4 h-4" />
          <span>Institutional</span>
        </>
      ) : (
        <>
          <Sparkles className="w-4 h-4" />
          <span>Creative</span>
        </>
      )}
    </motion.button>
  );
}
