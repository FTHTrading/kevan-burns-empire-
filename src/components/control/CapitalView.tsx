'use client';

import { motion } from 'framer-motion';
import type { ControlSystemView } from '@/lib/atlas';

interface CapitalViewProps {
  views: ControlSystemView[];
}

type CapitalTier = 'monetizable' | 'investor-facing' | 'internal-only' | 'pre-revenue';

function classifyCapitalTier(v: ControlSystemView): CapitalTier {
  if (v.revenueReady && v.investorFacing) return 'monetizable';
  if (v.investorFacing) return 'investor-facing';
  if (v.isLive && !v.investorFacing) return 'internal-only';
  return 'pre-revenue';
}

const TIER_CONFIG: Record<CapitalTier, { label: string; color: string; desc: string }> = {
  monetizable: { label: 'Monetizable', color: '#22c55e', desc: 'Live, revenue-ready, investor-facing' },
  'investor-facing': { label: 'Investor-Facing', color: '#3b82f6', desc: 'Strategic / flagship but pre-revenue' },
  'internal-only': { label: 'Internal Only', color: '#f59e0b', desc: 'Live but not externally monetized' },
  'pre-revenue': { label: 'Pre-Revenue', color: '#8888a0', desc: 'In development or experimental' },
};

const TIER_ORDER: CapitalTier[] = ['monetizable', 'investor-facing', 'internal-only', 'pre-revenue'];

export default function CapitalView({ views }: CapitalViewProps) {
  const grouped = new Map<CapitalTier, ControlSystemView[]>();
  for (const tier of TIER_ORDER) grouped.set(tier, []);
  for (const v of views) {
    const tier = classifyCapitalTier(v);
    grouped.get(tier)!.push(v);
  }

  return (
    <div className="space-y-6">
      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {TIER_ORDER.map((tier) => {
          const cfg = TIER_CONFIG[tier];
          const count = grouped.get(tier)!.length;
          return (
            <motion.div
              key={tier}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#12121a] border border-[#1e1e2e] rounded-xl p-4"
            >
              <div className="text-2xl font-bold font-mono" style={{ color: cfg.color }}>
                {count}
              </div>
              <div className="text-xs font-medium text-[#f0f0f5] mt-1">{cfg.label}</div>
              <div className="text-[10px] text-[#8888a0] mt-0.5">{cfg.desc}</div>
            </motion.div>
          );
        })}
      </div>

      {/* Tier detail lists */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {TIER_ORDER.map((tier) => {
          const cfg = TIER_CONFIG[tier];
          const items = grouped.get(tier)!;
          if (items.length === 0) return null;
          return (
            <div key={tier} className="bg-[#12121a] border border-[#1e1e2e] rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cfg.color }} />
                <h4 className="text-sm font-semibold" style={{ color: cfg.color }}>
                  {cfg.label}
                </h4>
                <span className="text-xs text-[#8888a0] ml-auto">{items.length} systems</span>
              </div>
              <div className="space-y-2">
                {items
                  .sort((a, b) => a.system.name.localeCompare(b.system.name))
                  .map((v) => (
                    <div key={v.system.id} className="flex items-center gap-3 group">
                      <span className="text-sm">{v.system.emoji}</span>
                      <a
                        href={`/systems/${v.system.slug}/`}
                        className="text-sm text-[#f0f0f5] hover:text-blue-400 transition-colors flex-1 truncate"
                      >
                        {v.system.name}
                      </a>
                      {v.system.flagship && (
                        <span className="text-[9px] bg-yellow-500/20 text-yellow-400 px-1 py-0.5 rounded">
                          ★
                        </span>
                      )}
                      {v.hasLiveUrl && (
                        <a
                          href={v.system.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          ↗ live
                        </a>
                      )}
                      <span className="text-[10px] text-[#8888a0] font-mono">
                        {v.system.maturity}
                      </span>
                    </div>
                  ))}
              </div>
              {tier === 'monetizable' && (
                <div className="mt-3 pt-3 border-t border-[#1e1e2e]">
                  <div className="text-[10px] text-[#8888a0]">
                    Revenue models:{' '}
                    {items
                      .map((v) => v.system.business?.revenueRole)
                      .filter(Boolean)
                      .join(' · ')}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
