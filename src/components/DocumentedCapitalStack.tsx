'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import {
  ChevronDown, ChevronUp, AlertTriangle, Shield, TrendingUp, ExternalLink,
  FileText, CheckCircle2, Info, Scale
} from 'lucide-react';
import { capitalPositions, type CapitalPosition, type DiligenceRisk } from '@/lib/capitalPositions';

// ─── Severity styling ────────────────────────────────────────────────────────

const severityConfig: Record<DiligenceRisk, { bg: string; text: string; border: string; icon: React.ReactNode }> = {
  'low':                  { bg: 'bg-green-500/10',  text: 'text-green-400',  border: 'border-green-500/20',  icon: <CheckCircle2 className="w-3.5 h-3.5" /> },
  'moderate':             { bg: 'bg-yellow-500/10', text: 'text-yellow-400', border: 'border-yellow-500/20', icon: <Info className="w-3.5 h-3.5" /> },
  'elevated':             { bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/20', icon: <AlertTriangle className="w-3.5 h-3.5" /> },
  'critical-review-item': { bg: 'bg-red-500/10',    text: 'text-red-400',    border: 'border-red-500/20',    icon: <Scale className="w-3.5 h-3.5" /> },
};

const classificationConfig: Record<string, { bg: string; text: string }> = {
  'built-systems-ip':              { bg: 'bg-blue-500/10',    text: 'text-blue-400' },
  'executed-note':                 { bg: 'bg-amber-500/10',   text: 'text-amber-400' },
  'structured-participation-right':{ bg: 'bg-violet-500/10',  text: 'text-violet-400' },
  'documented-ecosystem-value':    { bg: 'bg-emerald-500/10', text: 'text-emerald-400' },
};

// ─── Single Capital Position Card ────────────────────────────────────────────

function CapitalPositionCard({ position, index }: { position: CapitalPosition; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const cc = classificationConfig[position.classification] ?? { bg: 'bg-white/5', text: 'text-white' };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="rounded-xl border border-[#1e1e2e] bg-[#0e0e1a] overflow-hidden"
    >
      {/* Card Header */}
      <div className="p-6 border-b border-[#1e1e2e]/60">
        {/* Classification badge */}
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${cc.bg} ${cc.text} border-current/20`}>
            <FileText className="w-3 h-3" />
            {position.classificationLabel}
          </span>
          {position.cautionTags.some(t => t.severity === 'critical-review-item') && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border bg-red-500/10 text-red-400 border-red-500/20">
              <AlertTriangle className="w-3 h-3" />
              Diligence Review Required
            </span>
          )}
        </div>

        <h3 className="text-xl font-semibold text-white mb-1">{position.title}</h3>
        <p className="text-sm text-[#8888a0] mb-4">{position.subtitle}</p>

        {/* Amount */}
        <div className="flex items-end gap-3 flex-wrap">
          <div className={`text-3xl md:text-4xl font-bold`} style={{ color: position.color }}>
            {position.amountDisplay}
          </div>
        </div>
        {position.amountNote && (
          <p className="text-xs text-[#6868a0] mt-2 leading-relaxed">{position.amountNote}</p>
        )}
      </div>

      {/* Summary */}
      <div className="p-6 border-b border-[#1e1e2e]/60">
        <p className="text-sm text-[#c0c0d0] leading-relaxed">{position.summary}</p>
      </div>

      {/* Evidence + Caution Tags */}
      <div className="p-6 border-b border-[#1e1e2e]/60">
        {/* Evidence */}
        {position.evidenceTags.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center gap-1.5 text-xs text-[#8888a0] uppercase tracking-wider mb-2">
              <Shield className="w-3.5 h-3.5" />
              Evidence
            </div>
            <div className="flex flex-wrap gap-1.5">
              {position.evidenceTags.map((tag, i) => (
                <span key={i} className="text-xs px-2 py-1 rounded-md bg-white/5 text-[#c0c0d0] border border-white/10">
                  {tag.label}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Cautions */}
        {position.cautionTags.length > 0 && (
          <div>
            <div className="flex items-center gap-1.5 text-xs text-[#8888a0] uppercase tracking-wider mb-2">
              <AlertTriangle className="w-3.5 h-3.5" />
              Diligence Notes
            </div>
            <div className="flex flex-col gap-1.5">
              {position.cautionTags.map((tag, i) => {
                const sc = severityConfig[tag.severity];
                return (
                  <div key={i} className={`flex items-center gap-2 text-xs px-2.5 py-1.5 rounded-md border ${sc.bg} ${sc.text} ${sc.border}`}>
                    {sc.icon}
                    {tag.label}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Expand / Collapse */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-6 py-3 flex items-center justify-between text-xs text-[#8888a0] hover:text-white transition-colors group"
      >
        <span className="font-medium">{expanded ? 'Hide detail' : 'Expand full analysis'}</span>
        {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 border-t border-[#1e1e2e]/60 pt-4">
              {/* Full detail */}
              <div className="mb-4">
                <div className="text-xs text-[#8888a0] uppercase tracking-wider mb-2">Full Analysis</div>
                <p className="text-sm text-[#c0c0d0] leading-relaxed">{position.detail}</p>
              </div>

              {/* Diligence caveats */}
              {position.diligenceCaveats.length > 0 && (
                <div className="mb-4">
                  <div className="text-xs text-[#8888a0] uppercase tracking-wider mb-2">Diligence Caveats</div>
                  <ul className="space-y-1.5">
                    {position.diligenceCaveats.map((c, i) => (
                      <li key={i} className="text-xs text-[#a0a0b8] pl-3 border-l border-amber-500/30">
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Proof links */}
              {position.proofLinks && position.proofLinks.length > 0 && (
                <div>
                  <div className="text-xs text-[#8888a0] uppercase tracking-wider mb-2">Proof Surfaces</div>
                  <div className="flex flex-wrap gap-2">
                    {position.proofLinks.map((link, i) => (
                      <a
                        key={i}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/20 transition-colors"
                      >
                        <ExternalLink className="w-3 h-3" />
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Documented Capital Stack Section ───────────────────────────────────────

export default function DocumentedCapitalStack() {
  return (
    <section id="capital-stack" className="max-w-6xl mx-auto px-6 py-24">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-6"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/20 bg-amber-500/5 text-amber-400 text-sm mb-6">
          <TrendingUp className="w-4 h-4" />
          Documented Capital Stack
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Capital Positions & Documented Claims
        </h2>
        <p className="text-[#8888a0] text-lg max-w-3xl leading-relaxed">
          This portfolio includes both built infrastructure systems and documented capital positions.
          Built systems represent software, protocol, operational, and platform value.
          Documented capital positions represent executed claims, notes, and structured participation rights
          that require separate diligence, enforceability review, and financeability assessment.
          <strong className="text-[#c0c0d0]"> These categories should not be treated as interchangeable.</strong>
        </p>
      </motion.div>

      {/* Combined headline */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mb-10 p-5 rounded-xl border border-emerald-500/20 bg-emerald-500/5"
      >
        <p className="text-sm text-emerald-400 leading-relaxed">
          The ecosystem combines a built infrastructure portfolio with documented capital positions,
          including an estoppel-backed OPTKAS note amount due of{' '}
          <strong className="text-emerald-300">$502,465,753.42</strong> as of{' '}
          <strong className="text-emerald-300">March 3, 2026</strong>, alongside a separate{' '}
          <strong className="text-emerald-300">10% Net Distributable Cash Flow participation right</strong>{' '}
          tied to the <strong className="text-emerald-300">$5B TC Advantage</strong> notes program.
          The participation right is a structured cash flow claim — not a direct claim on note face value.
        </p>
      </motion.div>

      {/* Capital position cards */}
      <div className="grid grid-cols-1 gap-6 mb-10">
        {capitalPositions.map((position, i) => (
          <CapitalPositionCard key={position.id} position={position} index={i} />
        ))}
      </div>

      {/* Caution banner */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="p-5 rounded-xl border border-red-500/20 bg-red-500/5"
      >
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
          <div>
            <div className="text-sm font-semibold text-red-400 mb-1">Diligence Disclosure</div>
            <p className="text-xs text-[#c0c0b0] leading-relaxed">
              Structured claim documents and participation rights are presented as executed internal/legal instruments
              and should be understood as subject to external diligence, enforceability review, authority review,
              and financeability assessment. Executed documents confirm claim existence — they do not confirm
              collectibility, enforceability against an independent counterparty, or financeable value at par.
              Full diligence breakdown available at{' '}
              <a href="/diligence" className="text-red-300 hover:text-red-200 underline">portfolio.unykorn.org/diligence</a>.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
