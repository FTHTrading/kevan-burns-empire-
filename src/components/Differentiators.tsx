'use client';

import { motion } from 'framer-motion';
import { useView } from '@/context/ViewContext';
import platformsData from '@/data/platforms.json';

const { differentiators } = platformsData;

export default function Differentiators() {
  const { viewMode } = useView();

  return (
    <section className="relative py-32 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            {viewMode === 'creative' ? '🎬 What Makes This Different' : 'Positioning'}
          </h2>
        </motion.div>

        {/* Differentiator Cards */}
        <div className="space-y-6">
          {differentiators.map((diff, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative p-6 rounded-xl border border-[#1e1e2e] bg-[#12121a] overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500" />
              <div className="flex flex-col md:flex-row md:items-center gap-3 pl-4">
                <span className="text-[#8888a0] line-through text-lg">
                  {diff.contrast}
                </span>
                <span className="hidden md:block text-[#3a3a4a]">→</span>
                <span className="text-white font-semibold text-lg">
                  {diff.reality}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center text-[#8888a0] text-sm mt-12 italic"
        >
          That&apos;s not hype. That&apos;s positioning.
        </motion.p>
      </div>
    </section>
  );
}
