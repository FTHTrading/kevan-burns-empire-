'use client';

import { motion } from 'framer-motion';
import type { EcosystemMetrics } from '@/types/system';

interface Props {
  metrics: EcosystemMetrics;
}

const statItem = (label: string, value: number | string) => (
  <div className="text-center px-3">
    <div className="text-xl sm:text-2xl font-bold text-white tabular-nums">{value}</div>
    <div className="text-[10px] sm:text-xs text-[#555570] uppercase tracking-wider mt-0.5">{label}</div>
  </div>
);

export default function EcosystemStats({ metrics }: Props) {
  const m = metrics;
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4 py-5 px-6 rounded-xl border border-[#1e1e2e] bg-[#0d0d14]"
    >
      {statItem('Systems', m.totalSystems)}
      <div className="w-px h-8 bg-[#1e1e2e] hidden sm:block" />
      {statItem('Live', m.liveSystems + m.productionSystems)}
      <div className="w-px h-8 bg-[#1e1e2e] hidden sm:block" />
      {statItem('Chains', m.chainsIntegrated)}
      <div className="w-px h-8 bg-[#1e1e2e] hidden sm:block" />
      {statItem('Brands', m.totalBrands)}
      <div className="w-px h-8 bg-[#1e1e2e] hidden sm:block" />
      {statItem('Categories', m.totalCategories)}
      <div className="w-px h-8 bg-[#1e1e2e] hidden sm:block" />
      {statItem('Flagships', m.flagshipCount)}
    </motion.div>
  );
}
