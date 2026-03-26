'use client';

import { motion } from 'framer-motion';
import { financeabilityBuckets, type FinanceabilityBucket } from '@/lib/capitalPositions';
import { systems } from '@/content/systems';
import { BarChart2, ExternalLink } from 'lucide-react';

// ─── Bucket display card ──────────────────────────────────────────────────────

function BucketCard({ bucket, index }: { bucket: FinanceabilityBucket; index: number }) {
  // Resolve systems that exist in the registry for this bucket
  const resolvedSystems = bucket.systemIds
    .map(id => systems.find(s => s.id === id))
    .filter(Boolean);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="rounded-xl border border-[#1e1e2e] bg-[#0e0e1a] p-6"
    >
      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
          style={{ backgroundColor: `${bucket.color}15`, border: `1px solid ${bucket.color}30` }}
        >
          {bucket.icon}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">{bucket.label}</h3>
          <div className="text-xs text-[#8888a0] mt-0.5">{resolvedSystems.length} systems</div>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-[#c0c0d0] leading-relaxed mb-3">{bucket.description}</p>

      {/* Why it matters */}
      <div className="p-3 rounded-lg bg-white/3 border border-white/5 mb-4">
        <div className="text-xs text-[#8888a0] uppercase tracking-wider mb-1">Why This Matters</div>
        <p className="text-xs text-[#a0a0b8] leading-relaxed">{bucket.whyItMatters}</p>
      </div>

      {/* Systems chips */}
      <div className="flex flex-wrap gap-1.5">
        {resolvedSystems.map((sys) => sys && (
          <a
            key={sys.id}
            href={`/systems/${sys.slug}`}
            className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-md border transition-colors"
            style={{
              backgroundColor: `${bucket.color}10`,
              borderColor: `${bucket.color}30`,
              color: bucket.color,
            }}
          >
            <span className="text-base leading-none">{sys.emoji}</span>
            <span>{sys.name}</span>
            <ExternalLink className="w-2.5 h-2.5 opacity-60" />
          </a>
        ))}
        {/* Any bucket IDs that didn't resolve to a known system */}
        {bucket.systemIds
          .filter(id => !systems.find(s => s.id === id))
          .map(id => (
            <span
              key={id}
              className="text-xs px-2.5 py-1 rounded-md border bg-white/5 border-white/10 text-[#8888a0]"
            >
              {id}
            </span>
          ))}
      </div>
    </motion.div>
  );
}

// ─── Portfolio Interpretation Section ────────────────────────────────────────

export default function PortfolioInterpretation() {
  return (
    <section id="portfolio-interpretation" className="max-w-6xl mx-auto px-6 py-24">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-sm mb-6">
          <BarChart2 className="w-4 h-4" />
          Portfolio Interpretation
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          How to Read This Portfolio
        </h2>
        <p className="text-[#8888a0] text-lg max-w-3xl leading-relaxed">
          The portfolio is organized into five financeability buckets. A capital reader should
          understand each bucket separately — the financing path, instruments, and timelines
          differ materially across them. Systems in the same tool stack may be in different
          financial buckets.
        </p>
      </motion.div>

      {/* Bucket grid */}
      <div className="flex flex-col gap-6">
        {financeabilityBuckets.map((bucket, i) => (
          <BucketCard key={bucket.id} bucket={bucket} index={i} />
        ))}
      </div>

      {/* Bottom note */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-12 p-5 rounded-xl border border-[#1e1e2e] bg-[#0a0a0f]"
      >
        <p className="text-sm text-[#8888a0] leading-relaxed">
          <strong className="text-[#c0c0d0]">Classification note:</strong> Portfolio buckets are assigned based on
          current operational status and documented asset backing as of March 2026. Systems may move between
          buckets as revenue is disclosed, audits are completed, or additional collateral is formalized.
          The Internal Command Layer and Contingent / Experimental buckets contribute to overall technical
          credibility and signal organizational depth — both of which are meaningful inputs to equity valuation
          even where direct financing is not yet applicable.
        </p>
      </motion.div>
    </section>
  );
}
