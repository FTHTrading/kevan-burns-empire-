'use client';

import { motion } from 'framer-motion';
import { useView } from '@/context/ViewContext';
import platformsData from '@/data/platforms.json';
import {
  Layers, Coins, Shield, Landmark, Brain, Server,
  FlaskConical, Briefcase, Mic, FileSearch, Blocks, Megaphone,
} from 'lucide-react';

const { capabilities } = platformsData;

const icons = [
  Layers, Coins, Shield, Landmark, Brain, Server,
  FlaskConical, Briefcase, Mic, FileSearch, Blocks, Megaphone,
];

export default function Capabilities() {
  const { viewMode } = useView();

  return (
    <section id="capabilities" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            {viewMode === 'creative' ? '🧩 What I Actually Do' : 'I Design Deterministic Systems'}
          </h2>
          <p className="text-[#8888a0] text-lg max-w-2xl mx-auto">
            Not random tech builder. Every system is engineered for zero-ambiguity execution.
          </p>
        </motion.div>

        {/* Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {capabilities.map((capability, index) => {
            const Icon = icons[index % icons.length];
            return (
              <motion.div
                key={capability}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="flex items-center gap-4 p-4 rounded-lg border border-[#1e1e2e] bg-[#12121a] hover:border-blue-500/20 transition-all duration-300"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-blue-400" />
                </div>
                <span className="text-sm md:text-base text-[#c0c0d0]">{capability}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
