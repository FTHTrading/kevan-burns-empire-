'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { capitalPositions } from '@/lib/portfolio/capitalPositions';
import { legalDocuments } from '@/lib/portfolio/legalDocs';
import type { ControlSystemView } from '@/lib/atlas';

interface PipelineViewProps {
  views: ControlSystemView[];
}

// ── Raise stages derived from legal docs ─────────────────────────────────────
const RAISE_STAGES = [
  {
    id: 'documented',
    label: 'Executed Instruments',
    color: '#22c55e',
    desc: 'Signed, dated, estoppel-confirmed',
    count: legalDocuments.filter((d) => d.confidence === 'documented').length,
    items: legalDocuments.filter((d) => d.confidence === 'documented').map((d) => d.title),
  },
  {
    id: 'pending',
    label: 'Instruments Pending',
    color: '#f59e0b',
    desc: 'Documented, awaiting countersignature or condition',
    count: legalDocuments.filter((d) => d.confidence !== 'documented').length,
    items: legalDocuments.filter((d) => d.confidence !== 'documented').map((d) => d.shortTitle),
  },
  {
    id: 'diligence',
    label: 'Active Diligence',
    color: '#3b82f6',
    desc: 'Token-gated room issued, counterparty reviewing',
    count: 0, // populated from access log at runtime
    items: ['Access log updated after first auth\'d visit'],
  },
  {
    id: 'closed',
    label: 'Closed',
    color: '#8888a0',
    desc: 'Term sheet executed or capital deployed',
    count: 0,
    items: ['No closed rounds recorded'],
  },
] as const;

// ── Capital position summary ─────────────────────────────────────────────────
const STAGE_ACCENTS: Record<string, { border: string; dot: string; text: string; progress: string }> = {
  documented: {
    border: 'border-green-500/20',
    dot: 'bg-green-500',
    text: 'text-green-400',
    progress: 'bg-green-500',
  },
  pending: {
    border: 'border-amber-500/20',
    dot: 'bg-amber-500',
    text: 'text-amber-400',
    progress: 'bg-amber-500',
  },
  diligence: {
    border: 'border-blue-500/20',
    dot: 'bg-blue-500',
    text: 'text-blue-400',
    progress: 'bg-blue-500',
  },
  closed: {
    border: 'border-slate-500/20',
    dot: 'bg-slate-500',
    text: 'text-slate-400',
    progress: 'bg-slate-500',
  },
};

const POSITION_ACCENTS: Record<string, { badge: string; value: string }> = {
  'asset-backed-now': {
    badge: 'bg-green-500/10 text-green-400 border border-green-500/20',
    value: 'text-green-400',
  },
  'subject-to-diligence': {
    badge: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
    value: 'text-amber-400',
  },
  contingent: {
    badge: 'bg-purple-500/10 text-purple-400 border border-purple-500/20',
    value: 'text-purple-400',
  },
  'summary-only': {
    badge: 'bg-slate-500/10 text-slate-400 border border-slate-500/20',
    value: 'text-slate-400',
  },
};

const GROUP_ACCENTS: Record<string, { text: string; dot: string }> = {
  'Investor-Facing Systems': {
    text: 'text-blue-400',
    dot: 'bg-blue-500',
  },
  'Revenue-Ready (Live)': {
    text: 'text-green-400',
    dot: 'bg-green-500',
  },
  'Flagship Systems': {
    text: 'text-yellow-400',
    dot: 'bg-yellow-500',
  },
};

export default function PipelineView({ views }: PipelineViewProps) {
  const investorFacing = useMemo(
    () => views.filter((v) => v.investorFacing),
    [views]
  );
  const revenueReady = useMemo(
    () => views.filter((v) => v.revenueReady && v.isLive),
    [views]
  );
  const flagship = useMemo(
    () => views.filter((v) => v.system.strategicPriority === 'flagship'),
    [views]
  );

  return (
    <div className="space-y-8">
      {/* Raise pipeline */}
      <div className="bg-[#12121a] border border-[#1e1e2e] rounded-xl p-6">
        <h2 className="text-sm font-semibold text-[#f0f0f5] mb-1">
          Capital Raise Pipeline
        </h2>
        <p className="text-xs text-[#8888a0] mb-6">
          Derived from executed legal instruments + diligence access log. Not investment advice.
        </p>

        {/* Stage track */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {RAISE_STAGES.map((stage) => (
            <motion.div
              key={stage.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`rounded-xl border p-4 space-y-2 ${STAGE_ACCENTS[stage.id].border}`}
            >
              <div className="flex items-center gap-2">
                <span
                  className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${STAGE_ACCENTS[stage.id].dot}`}
                />
                <span className="text-xs font-semibold text-[#f0f0f5]">
                  {stage.label}
                </span>
              </div>
              <div className={`text-3xl font-bold font-mono ${STAGE_ACCENTS[stage.id].text}`}>
                {stage.count}
              </div>
              <div className="text-[10px] text-[#8888a0]">{stage.desc}</div>
              <ul className="space-y-0.5">
                {stage.items.slice(0, 3).map((item) => (
                  <li key={item} className="text-[10px] text-[#6b7280] truncate">
                    · {item}
                  </li>
                ))}
                {stage.items.length > 3 && (
                  <li className="text-[10px] text-[#8888a0]">
                    + {stage.items.length - 3} more
                  </li>
                )}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="flex h-1.5 rounded-full overflow-hidden gap-px">
          {RAISE_STAGES.map((s) => (
            <div
              key={s.id}
              className={`flex-1 rounded-sm opacity-70 ${STAGE_ACCENTS[s.id].progress}`}
            />
          ))}
        </div>
      </div>

      {/* Capital positions */}
      <div className="bg-[#12121a] border border-[#1e1e2e] rounded-xl p-6">
        <h2 className="text-sm font-semibold text-[#f0f0f5] mb-1">
          Documented Capital Positions
        </h2>
        <p className="text-xs text-[#8888a0] mb-5">
          Financeability ratings reflect quality of documentation, not probability of collection.
        </p>

        <div className="space-y-3">
          {capitalPositions.map((pos) => {
            const accent =
              POSITION_ACCENTS[pos.financeability as keyof typeof POSITION_ACCENTS]
              ?? POSITION_ACCENTS['summary-only'];
            return (
              <div
                key={pos.id}
                className="flex items-start gap-4 bg-[#0a0a0f] border border-[#1e1e2e] rounded-xl px-5 py-4"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold text-[#f0f0f5]">
                      {pos.title}
                    </span>
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${accent.badge}`}>
                      {pos.financeability.replace(/-/g, ' ')}
                    </span>
                  </div>
                  <p className="text-xs text-[#8888a0] mt-1 line-clamp-2">
                    {pos.amountNote ?? pos.summary.slice(0, 120)}
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className={`text-lg font-bold font-mono ${accent.value}`}>
                    {pos.amountLabel}
                  </div>
                  <div className="text-[10px] text-[#8888a0]">
                    {pos.classificationLabel}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Investor-facing systems */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {[
          {
            label: 'Investor-Facing Systems',
            color: '#3b82f6',
            items: investorFacing,
            desc: 'Suitable for LP / institutional presentation',
          },
          {
            label: 'Revenue-Ready (Live)',
            color: '#22c55e',
            items: revenueReady,
            desc: 'Operational, monetization-ready',
          },
          {
            label: 'Flagship Systems',
            color: '#eab308',
            items: flagship,
            desc: 'Highest strategic priority',
          },
        ].map((group) => (
          <div
            key={group.label}
            className="bg-[#12121a] border border-[#1e1e2e] rounded-xl p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <span className={`text-xs font-semibold ${GROUP_ACCENTS[group.label].text}`}>
                {group.label}
              </span>
              <span className={`text-lg font-bold font-mono ${GROUP_ACCENTS[group.label].text}`}>
                {group.items.length}
              </span>
            </div>
            <p className="text-[10px] text-[#6b7280] mb-3">{group.desc}</p>
            <ul className="space-y-1 max-h-48 overflow-y-auto">
              {group.items.map((v) => (
                <li key={v.system.id} className="flex items-center gap-2 text-xs">
                  <span
                    className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${GROUP_ACCENTS[group.label].dot}`}
                  />
                  <a
                    href={`/systems/${v.system.slug}`}
                    className="text-[#9ca3af] hover:text-white truncate transition-colors"
                  >
                    {v.system.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
