'use client';

import { motion } from 'framer-motion';
import type { System } from '@/types/system';
import { MATURITY_COLORS, CATEGORY_LABELS, CATEGORY_COLORS } from '@/types/system';

interface MaturityChartProps {
  systems: System[];
}

const MATURITY_DISPLAY: { key: string; label: string }[] = [
  { key: 'thesis', label: 'Thesis' },
  { key: 'designed', label: 'Designed' },
  { key: 'prototype', label: 'Prototype' },
  { key: 'internal', label: 'Internal' },
  { key: 'testnet', label: 'Testnet' },
  { key: 'pilot', label: 'Pilot' },
  { key: 'live', label: 'Live' },
  { key: 'production', label: 'Production' },
  { key: 'audit-mode', label: 'Audit Mode' },
  { key: 'archived', label: 'Archived' },
];

export default function MaturityChart({ systems }: MaturityChartProps) {
  // Count by maturity
  const maturityCounts = new Map<string, number>();
  for (const s of systems) {
    maturityCounts.set(s.maturity, (maturityCounts.get(s.maturity) ?? 0) + 1);
  }

  const maxCount = Math.max(...Array.from(maturityCounts.values()), 1);

  // Count by category
  const categoryCounts = new Map<string, number>();
  for (const s of systems) {
    categoryCounts.set(s.category, (categoryCounts.get(s.category) ?? 0) + 1);
  }

  const sortedCategories = Array.from(categoryCounts.entries()).sort((a, b) => b[1] - a[1]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Maturity Distribution */}
      <div className="bg-[#12121a] border border-[#1e1e2e] rounded-xl p-6">
        <h3 className="text-sm font-semibold text-[#f0f0f5] mb-4">Maturity Distribution</h3>
        <div className="space-y-3">
          {MATURITY_DISPLAY.map((m) => {
            const count = maturityCounts.get(m.key) ?? 0;
            if (count === 0) return null;
            const pct = (count / maxCount) * 100;
            const color = MATURITY_COLORS[m.key as keyof typeof MATURITY_COLORS];
            return (
              <div key={m.key} className="flex items-center gap-3">
                <span className="w-20 text-xs text-[#8888a0] text-right font-mono">{m.label}</span>
                <div className="flex-1 h-6 bg-[#0a0a0f] rounded-lg overflow-hidden relative">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="h-full rounded-lg"
                    style={{ backgroundColor: `${color}80` }}
                  />
                  <span
                    className="absolute inset-0 flex items-center px-3 text-xs font-bold"
                    style={{ color }}
                  >
                    {count}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="bg-[#12121a] border border-[#1e1e2e] rounded-xl p-6">
        <h3 className="text-sm font-semibold text-[#f0f0f5] mb-4">Category Breakdown</h3>
        <div className="space-y-2.5">
          {sortedCategories.map(([cat, count]) => {
            const label = CATEGORY_LABELS[cat as keyof typeof CATEGORY_LABELS] ?? cat;
            const color = CATEGORY_COLORS[cat as keyof typeof CATEGORY_COLORS] ?? '#8888a0';
            const pct = (count / systems.length) * 100;
            return (
              <div key={cat} className="flex items-center gap-3">
                <span className="w-5 text-xs text-[#8888a0] text-right font-mono">{count}</span>
                <div className="flex-1 h-5 bg-[#0a0a0f] rounded overflow-hidden relative">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="h-full rounded"
                    style={{ backgroundColor: `${color}60` }}
                  />
                </div>
                <span className="w-40 text-xs truncate" style={{ color }}>
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
