'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ExternalLink,
  Globe,
  Code2,
  Shield,
  Users,
  DollarSign,
  Layers,
  GitBranch,
} from 'lucide-react';
import type { System } from '@/types/system';
import { BRAND_LABELS } from '@/types/system';
import CategoryBadge from './CategoryBadge';
import MaturityBadge from './MaturityBadge';
import ChainBadge from './ChainBadge';
import BrandBadge from './BrandBadge';

interface Props {
  system: System;
  relatedSystems: System[];
}

export default function SystemDetail({ system: s, relatedSystems }: Props) {
  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Back bar */}
      <div className="fixed top-0 left-0 right-0 z-40 border-b border-[#1e1e2e]/50 bg-[#0a0a0f]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link
            href="/systems/"
            className="flex items-center gap-2 text-sm text-[#8888a0] hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Atlas
          </Link>
          {s.liveUrl && (
            <a
              href={s.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600/10 border border-blue-600/25 text-blue-400 text-xs font-medium hover:bg-blue-600/20 transition-colors"
            >
              <Globe className="w-3.5 h-3.5" />
              Visit Live
            </a>
          )}
        </div>
      </div>

      <div className="pt-24 pb-16 px-6">
        <div className="max-w-5xl mx-auto space-y-10">
          {/* Hero header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-start gap-4 mb-5">
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{ background: `${s.color}18`, border: `1px solid ${s.color}30` }}
              >
                {s.emoji}
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h1 className="text-2xl sm:text-3xl font-bold text-white">{s.name}</h1>
                  {s.flagship && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/15 text-amber-400 border border-amber-500/25">
                      FLAGSHIP
                    </span>
                  )}
                </div>
                <p className="text-[#8888a0] text-sm sm:text-base">{s.subtitle}</p>
              </div>
            </div>

            <p className="text-blue-400/80 text-sm italic mb-4">{s.tagline}</p>

            {/* Badges row */}
            <div className="flex flex-wrap gap-2 mb-6">
              <CategoryBadge category={s.category} size="md" />
              <MaturityBadge maturity={s.maturity} size="md" />
              <BrandBadge brand={s.brand} />
            </div>

            {/* Description */}
            <div className="prose prose-invert prose-sm max-w-none">
              <p className="text-[#b0b0c0] leading-relaxed whitespace-pre-line">
                {s.description}
              </p>
            </div>
          </motion.div>

          {/* Info grid */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {/* Features */}
            {s.features.length > 0 && (
              <SectionCard icon={<Layers className="w-4 h-4" />} title="Features">
                <ul className="space-y-1.5">
                  {s.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-[#b0b0c0]">
                      <span className="text-blue-400 mt-0.5">•</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </SectionCard>
            )}

            {/* Tech Stack */}
            {s.techStack && s.techStack.length > 0 && (
              <SectionCard icon={<Code2 className="w-4 h-4" />} title="Tech Stack">
                <div className="flex flex-wrap gap-1.5">
                  {s.techStack.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-[#1e1e2e] text-xs text-[#b0b0c0]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </SectionCard>
            )}

            {/* Chains */}
            {s.chainTargets && s.chainTargets.length > 0 && (
              <SectionCard icon={<GitBranch className="w-4 h-4" />} title="Chain Targets">
                <div className="flex flex-wrap gap-1.5">
                  {s.chainTargets.map((c) => (
                    <ChainBadge key={c} chain={c} size="md" />
                  ))}
                </div>
              </SectionCard>
            )}

            {/* Links */}
            {s.links.length > 0 && (
              <SectionCard icon={<ExternalLink className="w-4 h-4" />} title="Links">
                <div className="space-y-1.5">
                  {s.links.map((l, i) => (
                    <a
                      key={i}
                      href={l.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-xs text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      <ExternalLink className="w-3 h-3 flex-shrink-0" />
                      <span className="truncate">{l.label}</span>
                      <span className="text-[#555570] text-[10px] uppercase">{l.type}</span>
                    </a>
                  ))}
                </div>
              </SectionCard>
            )}

            {/* Business */}
            {s.business && (
              <SectionCard icon={<DollarSign className="w-4 h-4" />} title="Business Layer">
                <div className="space-y-2.5 text-xs">
                  {s.business.targetUsers && s.business.targetUsers.length > 0 && (
                    <div>
                      <div className="text-[#555570] text-[10px] uppercase tracking-wider mb-1">
                        Target Users
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {s.business.targetUsers.map((u) => (
                          <span
                            key={u}
                            className="px-2 py-0.5 rounded bg-white/[0.04] border border-[#1e1e2e] text-[#b0b0c0] text-[11px]"
                          >
                            {u}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {s.business.revenueRole && (
                    <div>
                      <div className="text-[#555570] text-[10px] uppercase tracking-wider mb-1">
                        Revenue Role
                      </div>
                      <p className="text-[#b0b0c0]">{s.business.revenueRole}</p>
                    </div>
                  )}
                  {s.business.strategicRole && (
                    <div>
                      <div className="text-[#555570] text-[10px] uppercase tracking-wider mb-1">
                        Strategic Role
                      </div>
                      <p className="text-[#b0b0c0]">{s.business.strategicRole}</p>
                    </div>
                  )}
                  {s.business.marketCategory && (
                    <div>
                      <div className="text-[#555570] text-[10px] uppercase tracking-wider mb-1">
                        Market Category
                      </div>
                      <p className="text-[#b0b0c0]">{s.business.marketCategory}</p>
                    </div>
                  )}
                </div>
              </SectionCard>
            )}

            {/* Metrics */}
            {s.metrics && Object.values(s.metrics).some((v) => v && v > 0) && (
              <SectionCard icon={<Shield className="w-4 h-4" />} title="Metrics">
                <div className="grid grid-cols-2 gap-3">
                  {s.metrics.apiCount ? <MetricItem label="APIs" value={s.metrics.apiCount} /> : null}
                  {s.metrics.containerCount ? <MetricItem label="Containers" value={s.metrics.containerCount} /> : null}
                  {s.metrics.datastoreCount ? <MetricItem label="Datastores" value={s.metrics.datastoreCount} /> : null}
                  {s.metrics.agentCount ? <MetricItem label="Agents" value={s.metrics.agentCount} /> : null}
                  {s.metrics.contractCount ? <MetricItem label="Contracts" value={s.metrics.contractCount} /> : null}
                  {s.metrics.endpointCount ? <MetricItem label="Endpoints" value={s.metrics.endpointCount} /> : null}
                  {s.metrics.testCount ? <MetricItem label="Tests" value={s.metrics.testCount} /> : null}
                </div>
              </SectionCard>
            )}
          </motion.div>

          {/* Domains */}
          {s.linkedDomains && s.linkedDomains.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25 }}
            >
              <SectionCard icon={<Globe className="w-4 h-4" />} title="Linked Domains">
                <div className="flex flex-wrap gap-2">
                  {s.linkedDomains.map((d) => (
                    <a
                      key={d}
                      href={`https://${d}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-[#1e1e2e] text-xs text-blue-400 hover:text-blue-300 hover:border-blue-600/30 transition-colors"
                    >
                      {d}
                    </a>
                  ))}
                </div>
              </SectionCard>
            </motion.div>
          )}

          {/* Related systems */}
          {relatedSystems.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <SectionCard icon={<Users className="w-4 h-4" />} title="Related Systems">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {relatedSystems.map((r) => (
                    <Link
                      key={r.id}
                      href={`/systems/${r.slug}/`}
                      className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.02] border border-[#1e1e2e] hover:border-[#2a2a3e] hover:bg-white/[0.04] transition-all"
                    >
                      <span
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0"
                        style={{
                          background: `${r.color}18`,
                          border: `1px solid ${r.color}30`,
                        }}
                      >
                        {r.emoji}
                      </span>
                      <div className="min-w-0">
                        <div className="text-white text-xs font-medium truncate">{r.name}</div>
                        <div className="text-[#555570] text-[10px] truncate">{r.subtitle}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </SectionCard>
            </motion.div>
          )}

          {/* Metadata footer */}
          <div className="flex flex-wrap gap-x-6 gap-y-1 text-[10px] text-[#444460] pt-4 border-t border-[#1e1e2e]">
            <span>ID: {s.id}</span>
            <span>Brand: {BRAND_LABELS[s.brand]}</span>
            <span>Priority: {s.strategicPriority}</span>
            <span>Visibility: {s.visibility}</span>
            {s.createdDate && <span>Created: {s.createdDate}</span>}
            {s.lastUpdated && <span>Updated: {s.lastUpdated}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Helper components ────────────────────────────────────────────────────────

function SectionCard({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-[#1e1e2e] bg-[#12121a] p-5">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-blue-400">{icon}</span>
        <h3 className="text-xs font-semibold text-[#8888a0] uppercase tracking-wider">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function MetricItem({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="text-lg font-bold text-white tabular-nums">{value.toLocaleString()}</div>
      <div className="text-[10px] text-[#555570] uppercase tracking-wider">{label}</div>
    </div>
  );
}
