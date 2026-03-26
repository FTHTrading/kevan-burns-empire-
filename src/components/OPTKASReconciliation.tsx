'use client';

import { motion } from 'framer-motion';
import DiligenceBadge from '@/components/DiligenceBadge';

// ─────────────────────────────────────────────────────────────────────────────
// OPTKASReconciliation — Three-layer breakdown of OPTKAS capital figures.
//
// Problem: The public OPTKAS portal shows operating metrics ($25.75M escrow,
// 78 mainnet ops). The private legal package introduces a separate $500M
// Sponsor Note and a $5B TC Advantage reference. These are DIFFERENT LAYERS
// and must not be conflated.
//
// This component puts them side by side so any reader immediately understands
// what belongs where.
// ─────────────────────────────────────────────────────────────────────────────

const layers = [
  {
    id: 'public-surface',
    layer: 'Layer 1',
    title: 'Public OPTKAS Surface',
    subtitle: 'Independently verifiable at optkas.org',
    badge: 'documented' as const,
    color: 'border-blue-500/20 bg-blue-500/5',
    titleColor: 'text-blue-400',
    layerColor: 'text-blue-400/60',
    items: [
      { label: 'Insured Escrow (Q1 2026)', value: '$25.75M', flag: null },
      { label: 'XRPL Mainnet Operations', value: '78', flag: null },
      { label: 'Success Rate (trailing 12mo)', value: '97.4%', flag: null },
      { label: 'SPV Structure', value: 'Wyoming Series LLC', flag: null },
      { label: 'Settlement Rail', value: 'XRPL DVP Atomic Settlement', flag: null },
      { label: 'Verification', value: 'optkas.org / on-chain TX log', flag: null },
    ],
    interpretation:
      'These are operational platform metrics. They represent the running infrastructure of the OPTKAS platform. The $25.75M is insured escrow capital — not the value of the Sponsor Note.',
  },
  {
    id: 'private-legal',
    layer: 'Layer 2',
    title: 'Private Legal Package',
    subtitle: 'Executed instruments — Jan 26 & Mar 3, 2026',
    badge: 'estoppel-backed' as const,
    color: 'border-amber-500/20 bg-amber-500/5',
    titleColor: 'text-amber-400',
    layerColor: 'text-amber-400/60',
    items: [
      { label: 'Sponsor Note Principal', value: '$500,000,000', flag: 'related-party' as const },
      { label: 'Accrued PIK Interest (36 days)', value: '$2,465,753.42', flag: null },
      { label: 'Estoppel-Confirmed Total Due', value: '$502,465,753.42', flag: 'related-party' as const },
      { label: 'TC Advantage Program Reference', value: '$5,000,000,000 face (50 bonds × $10M)', flag: null },
      { label: 'Participation Right', value: '10% of Net Distributable Cash Flows', flag: 'contingent' as const },
      { label: 'Estoppel Date', value: 'March 3, 2026', flag: null },
    ],
    interpretation:
      'The Sponsor Note ($500M) is a separate instrument from the TC Advantage participation. The $5B figure is the face value of the bond program being referenced — NOT the holder\'s claim size. The 10% right is 10% of NDCF, not 10% of $5B.',
  },
  {
    id: 'interpretation',
    layer: 'Layer 3',
    title: 'Interpretation',
    subtitle: 'How these layers relate — and where to apply haircuts',
    badge: 'reconciliation-req' as const,
    color: 'border-emerald-500/20 bg-emerald-500/5',
    titleColor: 'text-emerald-400',
    layerColor: 'text-emerald-400/60',
    items: [
      { label: 'Layer 1 ≠ Layer 2', value: 'Operating escrow ≠ Sponsor Note receivable', flag: null },
      { label: 'Note ≠ Program Face', value: '$500M Note is independent of $5B TC Advantage reference', flag: null },
      { label: '10% NDCF ≠ 10% of $5B', value: 'Participation is in distributable cash flows after all senior obligations', flag: 'contingent' as const },
      { label: 'Same Signer', value: 'Kevan Burns signs as both Issuer and Payee on all instruments', flag: 'related-party' as const },
      { label: 'Diligence Required', value: 'Authority review, conflict review, enforceability opinion', flag: 'reconciliation-req' as const },
      { label: 'Combined Documented Stack', value: '$528.3M–$603.3M (systems + note, NDCF excluded)', flag: null },
    ],
    interpretation:
      'A reader should never collapse these three layers into one number. Each layer has a distinct legal basis, distinct diligence requirement, and distinct financing path. The combined figure ($528.3M–$603.3M) is documented — but the majority ($502.5M) is subject to the related-party diligence chain before it can be treated as financeable.',
  },
] as const;

const flagBadge = (flag: 'related-party' | 'contingent' | 'reconciliation-req' | null) => {
  if (!flag) return null;
  return <DiligenceBadge type={flag} />;
};

export default function OPTKASReconciliation() {
  return (
    <section id="optkas-reconciliation" className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-yellow-500/30 bg-yellow-500/5 text-yellow-400 text-xs font-mono tracking-widest uppercase mb-6">
            Reconciliation Required
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            OPTKAS Capital Layers
          </h2>
          <p className="text-[#8888a0] max-w-2xl mx-auto text-sm leading-relaxed">
            Three separate layers of OPTKAS-related capital exist. They are related but distinct.
            Any reader conflating them will misjudge the capital position. Read each layer independently.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {layers.map((layer, i) => (
            <motion.div
              key={layer.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className={`rounded-xl border p-6 flex flex-col gap-4 ${layer.color}`}
            >
              {/* Layer header */}
              <div>
                <div className={`text-xs font-mono uppercase tracking-widest mb-1 ${layer.layerColor}`}>
                  {layer.layer}
                </div>
                <h3 className={`text-lg font-bold mb-0.5 ${layer.titleColor}`}>{layer.title}</h3>
                <p className="text-[#8888a0] text-xs">{layer.subtitle}</p>
              </div>

              {/* Badge */}
              <DiligenceBadge type={layer.badge} />

              {/* Items */}
              <div className="space-y-2.5 flex-1">
                {layer.items.map((item) => (
                  <div key={item.label} className="flex flex-col gap-0.5">
                    <span className="text-[#8888a0] text-[10px] uppercase tracking-wider font-mono">{item.label}</span>
                    <div className="flex items-start gap-2 flex-wrap">
                      <span className="text-white text-xs font-medium">{item.value}</span>
                      {flagBadge(item.flag)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Interpretation note */}
              <div className="border-t border-white/5 pt-4">
                <p className="text-[#8888a0] text-[11px] leading-relaxed italic">
                  {layer.interpretation}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
