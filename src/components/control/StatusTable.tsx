'use client';

import { motion } from 'framer-motion';
import type { ControlSystemView } from '@/lib/atlas';
import { MATURITY_COLORS, CATEGORY_LABELS } from '@/types/system';

const STATUS_CONFIG = {
  operational: { label: 'Operational', color: '#22c55e', dot: '🟢' },
  degraded: { label: 'Degraded', color: '#f59e0b', dot: '🟡' },
  offline: { label: 'Offline', color: '#6b7280', dot: '⚫' },
  development: { label: 'In Dev', color: '#818cf8', dot: '🔵' },
} as const;

interface StatusTableProps {
  views: ControlSystemView[];
}

export default function StatusTable({ views }: StatusTableProps) {
  // Sort: operational first, then degraded, then dev, then offline
  const statusOrder = { operational: 0, degraded: 1, development: 2, offline: 3 };
  const sorted = [...views].sort(
    (a, b) => statusOrder[a.status] - statusOrder[b.status] || a.system.name.localeCompare(b.system.name),
  );

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-[#1e1e2e]">
            <th className="px-4 py-3 text-[#8888a0] font-medium">Status</th>
            <th className="px-4 py-3 text-[#8888a0] font-medium">System</th>
            <th className="px-4 py-3 text-[#8888a0] font-medium hidden md:table-cell">Category</th>
            <th className="px-4 py-3 text-[#8888a0] font-medium hidden lg:table-cell">Maturity</th>
            <th className="px-4 py-3 text-[#8888a0] font-medium text-center">Live URL</th>
            <th className="px-4 py-3 text-[#8888a0] font-medium text-center hidden sm:table-cell">Deps</th>
            <th className="px-4 py-3 text-[#8888a0] font-medium text-center hidden sm:table-cell">Used By</th>
            <th className="px-4 py-3 text-[#8888a0] font-medium text-center hidden lg:table-cell">Revenue</th>
            <th className="px-4 py-3 text-[#8888a0] font-medium text-center hidden lg:table-cell">Investor</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((v, i) => {
            const cfg = STATUS_CONFIG[v.status];
            return (
              <motion.tr
                key={v.system.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.02, duration: 0.3 }}
                className="border-b border-[#1e1e2e]/50 hover:bg-[#1e1e2e]/30 transition-colors"
              >
                {/* Status */}
                <td className="px-4 py-3">
                  <span className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full inline-block"
                      style={{ backgroundColor: cfg.color }}
                    />
                    <span className="text-xs font-medium" style={{ color: cfg.color }}>
                      {cfg.label}
                    </span>
                  </span>
                </td>

                {/* System */}
                <td className="px-4 py-3">
                  <a
                    href={`/systems/${v.system.slug}/`}
                    className="text-[#f0f0f5] hover:text-blue-400 transition-colors font-medium"
                  >
                    <span className="mr-1.5">{v.system.emoji}</span>
                    {v.system.name}
                  </a>
                  {v.system.flagship && (
                    <span className="ml-2 text-[10px] bg-yellow-500/20 text-yellow-400 px-1.5 py-0.5 rounded font-medium">
                      FLAGSHIP
                    </span>
                  )}
                </td>

                {/* Category */}
                <td className="px-4 py-3 hidden md:table-cell">
                  <span className="text-xs text-[#8888a0]">
                    {CATEGORY_LABELS[v.system.category]}
                  </span>
                </td>

                {/* Maturity */}
                <td className="px-4 py-3 hidden lg:table-cell">
                  <span
                    className="text-xs font-mono px-2 py-0.5 rounded"
                    style={{
                      color: MATURITY_COLORS[v.system.maturity],
                      backgroundColor: `${MATURITY_COLORS[v.system.maturity]}15`,
                    }}
                  >
                    {v.system.maturity}
                  </span>
                </td>

                {/* Live URL */}
                <td className="px-4 py-3 text-center">
                  {v.hasLiveUrl ? (
                    <a
                      href={v.system.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 text-xs underline"
                    >
                      ↗
                    </a>
                  ) : (
                    <span className="text-[#8888a0]/40">—</span>
                  )}
                </td>

                {/* Dependencies */}
                <td className="px-4 py-3 text-center hidden sm:table-cell">
                  <span className="text-xs text-[#8888a0] font-mono">
                    {v.dependencyCount || '—'}
                  </span>
                </td>

                {/* Dependents */}
                <td className="px-4 py-3 text-center hidden sm:table-cell">
                  <span className="text-xs text-[#8888a0] font-mono">
                    {v.dependentCount || '—'}
                  </span>
                </td>

                {/* Revenue */}
                <td className="px-4 py-3 text-center hidden lg:table-cell">
                  {v.revenueReady ? (
                    <span className="text-green-400 text-xs">💰</span>
                  ) : (
                    <span className="text-[#8888a0]/40">—</span>
                  )}
                </td>

                {/* Investor */}
                <td className="px-4 py-3 text-center hidden lg:table-cell">
                  {v.investorFacing ? (
                    <span className="text-blue-400 text-xs">📊</span>
                  ) : (
                    <span className="text-[#8888a0]/40">—</span>
                  )}
                </td>
              </motion.tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
