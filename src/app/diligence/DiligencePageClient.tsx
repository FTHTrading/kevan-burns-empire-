'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  capitalPositions,
  legalDocuments,
  diligenceRiskFlags,
  financeabilityBuckets,
} from '@/lib/capitalPositions';
import { AlertTriangle, CheckCircle2, Info, Scale, ChevronRight, ExternalLink } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DiligenceChat from '@/components/DiligenceChat';
import OPTKASReconciliation from '@/components/OPTKASReconciliation';
import FinanceabilityPanel from '@/components/FinanceabilityPanel';

// ─── Severity helpers ────────────────────────────────────────────────────────

const severityLabel = {
  'low': { text: 'Low', color: 'text-green-400', border: 'border-green-500/20', bg: 'bg-green-500/5', icon: <CheckCircle2 className="w-4 h-4" /> },
  'moderate': { text: 'Moderate', color: 'text-yellow-400', border: 'border-yellow-500/20', bg: 'bg-yellow-500/5', icon: <Info className="w-4 h-4" /> },
  'elevated': { text: 'Elevated', color: 'text-orange-400', border: 'border-orange-500/20', bg: 'bg-orange-500/5', icon: <AlertTriangle className="w-4 h-4" /> },
  'critical-review-item': { text: 'Critical Review', color: 'text-red-400', border: 'border-red-500/20', bg: 'bg-red-500/5', icon: <Scale className="w-4 h-4" /> },
};

const confidenceStyle = {
  'documented': 'text-green-400 bg-green-500/5 border-green-500/20',
  'summary-only': 'text-yellow-400 bg-yellow-500/5 border-yellow-500/20',
  'pending-reconciliation': 'text-orange-400 bg-orange-500/5 border-orange-500/20',
};

const colorNameClass: Record<string, string> = {
  blue: 'text-blue-400',
  amber: 'text-amber-400',
  violet: 'text-violet-400',
  emerald: 'text-emerald-400',
  indigo: 'text-indigo-400',
  slate: 'text-slate-400',
};

const bucketTagClass: Record<string, string> = {
  emerald: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10',
  blue: 'border-blue-500/30 text-blue-400 bg-blue-500/10',
  indigo: 'border-indigo-500/30 text-indigo-400 bg-indigo-500/10',
  slate: 'border-slate-500/30 text-slate-400 bg-slate-500/10',
  violet: 'border-violet-500/30 text-violet-400 bg-violet-500/10',
};

export default function DiligencePageClient() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0a0a0f] pt-24 pb-32">
        <div className="max-w-5xl mx-auto px-6">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-red-500/30 bg-red-500/5 text-red-400 text-xs font-mono tracking-widest uppercase mb-6">
              Not Investment Advice — Diligence Materials
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Diligence Room
            </h1>
            <p className="text-[#8888a0] text-lg max-w-2xl mx-auto leading-relaxed">
              Legal document summaries, capital position analysis, risk flag disclosures,
              and proof surfaces. Intended for financing counterparties, legal counsel,
              and independent advisors conducting diligence.
            </p>
          </motion.div>

          <DiligenceChat />

          {/* Reconciliation Panel */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-2">Reconciliation Panel</h2>
            <p className="text-[#8888a0] text-sm mb-8">How the public capital figures relate to each other. These are distinct categories — not additive without conditions.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-[#8888a0] text-xs uppercase tracking-wider border-b border-[#1e1e2e]">
                    <th className="text-left py-3 pr-6">Position</th>
                    <th className="text-left py-3 pr-6">Figure</th>
                    <th className="text-left py-3 pr-6">Basis</th>
                    <th className="text-left py-3">Source</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1e1e2e]">
                  <tr>
                    <td className="py-3 pr-6 text-white font-medium">Built Systems Portfolio</td>
                    <td className="py-3 pr-6 font-mono text-blue-400">$25.85M – $100.8M</td>
                    <td className="py-3 pr-6 text-[#8888a0]">3rd-party analyst estimate, replacement cost + revenue multiple</td>
                    <td className="py-3 text-[#8888a0]">Portfolio site, GitHub, live platforms</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-6 text-white font-medium">Sponsor Consideration Note</td>
                    <td className="py-3 pr-6 font-mono text-amber-400">$500,000,000</td>
                    <td className="py-3 pr-6 text-[#8888a0]">Executed note — deferred infra services consideration</td>
                    <td className="py-3 text-[#8888a0]">Sponsor Consideration Note document</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-6 text-white font-medium">Estoppel-Confirmed Balance</td>
                    <td className="py-3 pr-6 font-mono text-amber-300">$502,465,753.42</td>
                    <td className="py-3 pr-6 text-[#8888a0]">Principal + 36 days PIK interest @ 5% p.a. — as of March 3, 2026</td>
                    <td className="py-3 text-[#8888a0]">Sponsor Note Estoppel Certificate</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-6 text-white font-medium">TC Advantage Participation</td>
                    <td className="py-3 pr-6 font-mono text-violet-400">10% of NDCF</td>
                    <td className="py-3 pr-6 text-[#8888a0]">NOT 10% of $5B — 10% of Net Distributable Cash Flows after senior obligations</td>
                    <td className="py-3 text-[#8888a0]">Exhibit A, Bond Participation Certificate, NDCF10 token</td>
                  </tr>
                  <tr className="font-semibold">
                    <td className="py-3 pr-6 text-white">Combined Documented Stack</td>
                    <td className="py-3 pr-6 font-mono text-emerald-400">$528.3M – $603.3M</td>
                    <td className="py-3 pr-6 text-[#8888a0]">Systems portfolio + estoppel-confirmed Note. NDCF excluded (contingent)</td>
                    <td className="py-3 text-[#8888a0]">Separate categories — reviewed independently</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* OPTKAS Reconciliation — 3-layer panel */}
          <section className="mb-16">
            <OPTKASReconciliation />
          </section>

          {/* Financeability Haircuts */}
          <section className="mb-16">
            <FinanceabilityPanel />
          </section>

          {/* Capital Positions */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-2">Capital Positions</h2>
            <p className="text-[#8888a0] text-sm mb-8">Each position should be reviewed separately — distinct financing paths, diligence requirements, and risk profiles.</p>
            <div className="space-y-6">
              {capitalPositions.map((pos, i) => (
                <motion.div
                  key={pos.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="p-6 rounded-xl border border-[#1e1e2e] bg-[#0e0e1a]"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <span className="text-xs font-mono text-[#8888a0] uppercase tracking-wider">{pos.classificationLabel}</span>
                      <h3 className="text-xl font-bold text-white mt-1">{pos.title}</h3>
                      <p className="text-sm text-[#8888a0]">{pos.subtitle}</p>
                    </div>
                    <div className={`font-mono text-2xl font-bold ${colorNameClass[pos.colorName] ?? 'text-white'}`}>{pos.amountDisplay}</div>
                  </div>
                  {pos.amountNote && (
                    <p className="text-xs text-[#6868a0] mb-4 italic">{pos.amountNote}</p>
                  )}
                  <p className="text-sm text-[#c0c0d0] leading-relaxed mb-4">{pos.detail}</p>
                  {pos.diligenceCaveats.length > 0 && (
                    <div className="border border-amber-500/10 bg-amber-500/5 rounded-lg p-4">
                      <div className="text-xs font-mono text-amber-400 uppercase tracking-wider mb-2">Diligence Caveats</div>
                      <ul className="space-y-1.5">
                        {pos.diligenceCaveats.map((c, j) => (
                          <li key={j} className="text-xs text-amber-300/80 flex gap-2">
                            <ChevronRight className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                            {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </section>

          {/* Legal Document Summaries */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-2">Legal Document Summaries</h2>
            <p className="text-[#8888a0] text-sm mb-8">Summaries drawn directly from executed instruments. All documents anchored on XRPL mainnet.</p>
            <div className="space-y-5">
              {legalDocuments.map((doc, i) => (
                <motion.div
                  key={doc.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="p-5 rounded-xl border border-[#1e1e2e] bg-[#0e0e1a]"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <h3 className="text-white font-semibold">{doc.title}</h3>
                    <span className={`text-[10px] px-2.5 py-1 rounded-full border font-mono uppercase tracking-wider ${confidenceStyle[doc.confidence]}`}>
                      {doc.confidence.replace(/-/g, ' ')}
                    </span>
                  </div>
                  {doc.date && <p className="text-xs text-[#8888a0] mb-1">Date: {doc.date}</p>}
                  {doc.parties && <p className="text-xs text-[#8888a0] mb-3">Parties: {doc.parties}</p>}
                  <p className="text-sm text-[#c0c0d0] mb-3">{doc.whatItCreates}</p>
                  <p className="text-sm text-[#8888a0] mb-3"><span className="text-white font-medium">Why it matters: </span>{doc.whyItMatters}</p>
                  <div className="p-3 rounded-lg border border-yellow-500/15 bg-yellow-500/5 text-xs text-yellow-400/80">
                    <span className="font-semibold text-yellow-400">Caution: </span>{doc.cautionNote}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Risk Flags */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-2">Diligence Risk Flags</h2>
            <p className="text-[#8888a0] text-sm mb-8">Disclosed here. These define what must be resolved before any outside financing can close.</p>
            <div className="space-y-4">
              {diligenceRiskFlags.map((flag, i) => {
                const s = severityLabel[flag.severity];
                return (
                  <motion.div
                    key={flag.id}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.07 }}
                    className={`p-5 rounded-xl border ${s.border} ${s.bg}`}
                  >
                    <div className="flex items-start gap-3 mb-2">
                      <div className={`mt-0.5 shrink-0 ${s.color}`}>{s.icon}</div>
                      <div>
                        <div className={`font-semibold text-sm ${s.color} mb-0.5`}>{flag.flag}</div>
                        <div className={`text-[10px] font-mono uppercase tracking-wider opacity-70 ${s.color}`}>{s.text}</div>
                      </div>
                    </div>
                    <p className="text-xs text-white/70 leading-relaxed mb-2">{flag.explanation}</p>
                    {flag.mitigation && (
                      <div className="border-t border-white/5 pt-2 mt-2">
                        <span className="text-[10px] font-mono text-[#8888a0] uppercase tracking-wider">Mitigation path: </span>
                        <span className="text-xs text-[#a0a0b8]">{flag.mitigation}</span>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* Portfolio Interpretation Buckets */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-2">Financeability Buckets</h2>
            <p className="text-[#8888a0] text-sm mb-8">Systems sorted by financing path — asset-backed, revenue-financeable, IP/strategic, internal, or contingent.</p>
            <div className="space-y-4">
              {financeabilityBuckets.map((bucket, i) => (
                <motion.div
                  key={bucket.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="p-5 rounded-xl border border-[#1e1e2e] bg-[#0e0e1a]"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{bucket.icon}</span>
                    <div>
                      <h3 className="text-white font-semibold">{bucket.label}</h3>
                      <p className="text-xs text-[#8888a0]">{bucket.systemIds.length} systems</p>
                    </div>
                  </div>
                  <p className="text-sm text-[#c0c0d0] mb-2">{bucket.description}</p>
                  <p className="text-xs text-[#8888a0] italic">{bucket.whyItMatters}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {bucket.systemIds.map(id => (
                      <span
                        key={id}
                        className={`text-[10px] px-2 py-0.5 rounded border font-mono ${bucketTagClass[bucket.colorName] ?? 'border-white/20 text-white bg-white/5'}`}
                      >
                        {id}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Proof Surfaces */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-2">Independently Verifiable Now</h2>
            <p className="text-[#8888a0] text-sm mb-8">These can be checked by any counterparty today — no document request required.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { title: 'OPTKAS Corporate', url: 'https://optkas.org', note: '78 mainnet ops, $25.75M escrow, institutional gateway' },
                { title: 'NIL33 Platform', url: 'https://nil33.com', note: 'Live SaaS, 33-factor valuation, Pro tier active' },
                { title: 'Genesis Protocol', url: 'https://genesis.unykorn.org', note: '6,820 world simulations, live browser engine' },
                { title: 'Zenodo DOI', url: 'https://zenodo.org/records/18729652', note: 'DOI 10.5281/zenodo.18729652 — citable research record' },
                { title: 'PolygonScan — RAMM Protocol', url: 'https://polygonscan.com', note: '14 verified contracts, RAMM governance + rUSD' },
                { title: 'Snowtrace — UNY Token', url: 'https://snowtrace.io/token/0xc09003213b34c7bec8d2eddfad4b43e51d007d66', note: '100M ERC-20, Avalanche C-Chain, dual TraderJoe pools' },
                { title: 'NDCF10 Issuance TX', url: 'https://livenet.xrpl.org/transactions/B68A33F006996B569F79827E4937ACFF5A912FDC4F69F74881064E625E8F93F4', note: 'XRPL mainnet issuance — tesSUCCESS confirmed' },
                { title: 'GitHub Organization', url: 'https://github.com/FTHTrading', note: 'Public repositories for FTH / OPTKAS / Genesis / NIL33' },
                { title: 'FTH Trading OS', url: 'https://fth-os.netlify.app', note: '22 services, 941 tests, 13 chains' },
                { title: 'Helios Digital', url: 'https://heliosdigital.xyz', note: 'Gold-backed XLS-20 NFTs, Citadel/Brinks custody' },
              ].map((item, i) => (
                <motion.a
                  key={item.url}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  className="flex flex-col gap-1 p-4 rounded-lg border border-[#1e1e2e] bg-[#0e0e1a] hover:border-blue-500/30 transition-colors group"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-white text-sm font-medium group-hover:text-blue-400 transition-colors">{item.title}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#8888a0] group-hover:text-blue-400 shrink-0" />
                  </div>
                  <span className="text-[#8888a0] text-xs">{item.note}</span>
                </motion.a>
              ))}
            </div>
          </section>

          {/* Back */}
          <div className="text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-[#1e1e2e] text-[#8888a0] hover:text-white hover:border-white/20 transition-colors text-sm font-mono"
            >
              ← Back to Portfolio
            </Link>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
