'use client';

import { motion } from 'framer-motion';
import DiligenceBadge from '@/components/DiligenceBadge';

// ─────────────────────────────────────────────────────────────────────────────
// FinanceabilityPanel — four-column haircut analysis.
//
// Documented → Collectible → Financeable at Par → Contingent Upside
//
// Designed to force the distinction between what is written, what can be
// recovered, and what a lender will actually underwrite.
// ─────────────────────────────────────────────────────────────────────────────

interface HaircutRow {
  label: string;
  documented: string;
  collectible: string;
  financeable: string;
  contingent: string;
}

const rows: HaircutRow[] = [
  {
    label: 'Built Systems / IP',
    documented: '$25.85M–$100.8M',
    collectible: 'Platform-by-platform underwriting. OPTKAS escrow ($25.75M insured) is cleanest anchor.',
    financeable: 'Revenue-based financing opens once MRR is disclosed. Equity SAFE available now for Tier 1 systems.',
    contingent: 'Upside if ARR disclosed on NIL33 / NEED AI / OPTKAS fees.',
  },
  {
    label: 'Sponsor Note Principal',
    documented: '$500,000,000',
    collectible: 'Subject to: authority review, conflict review, enforceability opinion. No independent counterparty.',
    financeable: 'Not yet financeable at par. Lenders will apply steep haircut until related-party chain closes.',
    contingent: 'Once diligence chain closes: assignable, pledgeable, discountable without Issuer consent.',
  },
  {
    label: 'Estoppel-Confirmed Balance',
    documented: '$502,465,753.42',
    collectible: 'Estoppel is procedurally significant — Issuer estopped from denying validity. Still requires payment-path analysis.',
    financeable: 'Same as Note principal — related-party estoppel has limited standalone probative value to outside lender.',
    contingent: 'If conflict and authority reviews close cleanly, estoppel + no-offsets language materially strengthens position.',
  },
  {
    label: '10% NDCF Participation',
    documented: '10% of NDCF (Exhibit A, Option A)',
    collectible: 'Contingent on actual NDCF generation. NDCF = 0 if program does not distribute.',
    financeable: 'Not collateralizable in traditional sense without NDCF projection model.',
    contingent: 'If TC Advantage program generates cash flows, this right participates before residual sponsor distributions.',
  },
];

const col = {
  documented:  { label: 'Documented',         badge: 'estoppel-backed' as const, accent: 'text-purple-400', border: 'border-purple-500/20', bg: 'bg-purple-500/5' },
  collectible: { label: 'Collectible',         badge: 'reconciliation-req' as const, accent: 'text-yellow-400', border: 'border-yellow-500/20', bg: 'bg-yellow-500/5' },
  financeable: { label: 'Financeable at Par',  badge: 'related-party' as const,  accent: 'text-red-400',    border: 'border-red-500/20',    bg: 'bg-red-500/5' },
  contingent:  { label: 'Contingent Upside',   badge: 'contingent' as const,     accent: 'text-orange-400', border: 'border-orange-500/20', bg: 'bg-orange-500/5' },
};

export default function FinanceabilityPanel() {
  return (
    <section id="financeability" className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/5 text-purple-400 text-xs font-mono tracking-widest uppercase mb-6">
            Financeability Analysis
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Documented → Collectible → Financeable
          </h2>
          <p className="text-[#8888a0] max-w-2xl mx-auto text-sm leading-relaxed mb-8">
            A document existing does not make a claim collectible. A collectible claim does not mean a lender will
            underwrite it at par. Each column represents a distinct hurdle. Read left to right.
          </p>
        </motion.div>

        {/* Column headers — desktop */}
        <div className="hidden md:grid md:grid-cols-4 gap-3 mb-4">
          {(Object.entries(col) as [keyof typeof col, typeof col[keyof typeof col]][]).map(([key, cfg]) => (
            <div key={key} className={`rounded-lg border p-4 text-center ${cfg.border} ${cfg.bg}`}>
              <DiligenceBadge type={cfg.badge} size="md" />
              <div className={`mt-2 text-sm font-semibold ${cfg.accent}`}>{cfg.label}</div>
            </div>
          ))}
        </div>

        {/* Rows */}
        <div className="space-y-4">
          {rows.map((row, i) => (
            <motion.div
              key={row.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-xl border border-[#1e1e2e] bg-[#0e0e1a] overflow-hidden"
            >
              {/* Row label */}
              <div className="px-5 py-3 border-b border-[#1e1e2e] bg-[#12121e]">
                <span className="text-white font-semibold text-sm">{row.label}</span>
              </div>

              {/* Four cells */}
              <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[#1e1e2e]">
                {(Object.entries(col) as [keyof typeof col, typeof col[keyof typeof col]][]).map(([key, cfg]) => (
                  <div key={key} className="p-4">
                    {/* Mobile: show column label */}
                    <div className={`text-[9px] font-mono uppercase tracking-widest mb-2 md:hidden ${cfg.accent}`}>
                      {cfg.label}
                    </div>
                    <p className={`text-xs leading-relaxed ${key === 'documented' ? 'font-mono font-semibold text-white' : 'text-[#c0c0d0]'}`}>
                      {row[key]}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 p-4 rounded-lg border border-white/5 bg-white/3 text-center"
        >
          <p className="text-[#8888a0] text-xs leading-relaxed">
            <span className="text-white font-semibold">Financeability gap: </span>
            The gap between documented and financeable is the diligence workload — authority review, conflict resolution,
            enforceability opinion, payment-path analysis. None of these are technical barriers. They are process steps.
            The Sponsor Note is expressly assignable, pledgeable, and discountable without Issuer consent once the above close.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
