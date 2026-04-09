'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { proofItems, proofTypeLabels } from '@/lib/portfolio/proofItems';
import DiligenceBadge from '@/components/DiligenceBadge';

const relatedPartyFlags = [
  {
    flag: 'Related-party transaction',
    detail: 'Jimmy Thomas signs as Manager of OPTKAS1-MAIN SPV (obligor). Kevan Burns signs as CEO of Unykorn 7777, Inc. (obligee/system builder). The SPV is independently managed by Thomas, Isaac, and others — this is not a single-signer arrangement.',
    severity: 'high',
  },
  {
    flag: '$502M instrument — related-party diligence required',
    detail: 'The Sponsor Consideration Note was executed between related parties. Outside lenders will require authority confirmation, conflict review, and independent legal opinion.',
    severity: 'critical',
  },
  {
    flag: '10% NDCF ≠ 10% of $5B',
    detail: 'The participation right is 10% of Net Distributable Cash Flows, which are zero if the bond program does not distribute. The $5B face value is a reference amount, not a basis for calculating the participation value.',
    severity: 'high',
  },
  {
    flag: 'No external audit',
    detail: 'No independent audit of platform metrics, OPTKAS escrow balance, or treasury positions has been disclosed.',
    severity: 'medium',
  },
];

const independentlyVerifiable = proofItems.filter((p) =>
  p.trustTags.includes('independently-verifiable') ||
  p.trustTags.includes('on-chain-verifiable') ||
  p.trustTags.includes('doi-registered') ||
  p.trustTags.includes('crates-io-published')
);

const severityStyle: Record<string, string> = {
  critical: 'border-red-500/30 bg-red-500/5 text-red-400',
  high: 'border-orange-500/30 bg-orange-500/5 text-orange-400',
  medium: 'border-yellow-500/30 bg-yellow-500/5 text-yellow-400',
};

const severityDot: Record<string, string> = {
  critical: 'bg-red-500',
  high: 'bg-orange-500',
  medium: 'bg-yellow-500',
};

export default function DiligenceNotes() {
  return (
    <section id="diligence-notes" className="relative py-24 px-6">
      <div className="max-w-5xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-red-500/30 bg-red-500/5 text-red-400 text-xs font-mono tracking-widest uppercase mb-6">
            Diligence Flags
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Diligence Notes
          </h2>
          <p className="text-[#8888a0] max-w-xl mx-auto text-sm">
            These flags are disclosed here because informed investors require them. They define the work needed to close outside financing.
          </p>
        </motion.div>

        {/* Related Party Risk — Unmissable Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="rounded-2xl border-2 border-red-500/50 bg-red-500/[0.08] p-8">
            <div className="flex items-start gap-5">
              <div className="shrink-0 w-12 h-12 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400 text-2xl font-black">
                !
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <h3 className="text-red-300 font-black text-2xl uppercase tracking-tight">Related-Party Transaction</h3>
                  <DiligenceBadge type="related-party" label="Related-Party" />
                </div>
                <p className="text-red-200/90 text-sm leading-relaxed mb-4">
                  <strong className="text-red-300">Jimmy Thomas</strong> signs as{' '}
                  <strong className="text-red-300">Manager of OPTKAS1-MAIN SPV</strong> (obligor).{' '}
                  <strong className="text-red-300">Kevan Burns</strong> signs as{' '}
                  <strong className="text-red-300">CEO of Unykorn 7777, Inc.</strong> (obligee / system builder).
                  The SPV is independently managed by Thomas, Isaac, and others.
                </p>
                <p className="text-red-200/70 text-xs leading-relaxed">
                  All instruments — Sponsor Consideration Note ($500M), Sponsor Note Estoppel ($502,465,753.42),
                  Bond Participation Certificate (NDCF10), and Strategic Infrastructure Agreement — are executed
                  between related parties. Outside financing will require independent legal opinion
                  on authority, conflicts, and enforceability before any of these positions can be relied upon.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Remaining Diligence Flags */}
        <div className="space-y-4 mb-16">
          {relatedPartyFlags.slice(1).map((flag, i) => (
            <motion.div
              key={flag.flag}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={`p-5 rounded-xl border ${severityStyle[flag.severity]}`}
            >
              <div className="flex items-start gap-3">
                <div className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${severityDot[flag.severity]}`} />
                <div>
                  <div className="font-semibold text-sm mb-1">{flag.flag}</div>
                  <p className="text-[11px] opacity-80 leading-relaxed">{flag.detail}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Independently Verifiable */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h3 className="text-white font-semibold text-lg mb-6 text-center">Independently Verifiable Right Now</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {independentlyVerifiable.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="p-4 rounded-lg border border-green-500/15 bg-green-500/5 flex flex-col gap-1"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-green-400 text-xs font-semibold">{item.title}</span>
                  <span className="text-[9px] text-[#8888a0] font-mono uppercase">{proofTypeLabels[item.type]}</span>
                </div>
                <p className="text-[#8888a0] text-[11px] leading-relaxed">{item.description}</p>
                {item.url && (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400/70 text-[10px] hover:text-blue-400 transition-colors font-mono truncate"
                  >
                    {item.url}
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            href="/diligence"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-white/10 bg-white/5 text-white/70 hover:text-white hover:bg-white/10 transition-colors font-mono text-sm uppercase tracking-widest"
          >
            Full Diligence Room →
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
