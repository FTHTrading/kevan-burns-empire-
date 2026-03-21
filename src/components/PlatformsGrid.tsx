'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ChevronRight, Filter } from 'lucide-react';
import { useView } from '@/context/ViewContext';
import { platforms, platformMetrics } from '@/lib/platformMetrics';
import type { PlatformStatus, PlatformCategory } from '@/types/platform';

const categoryLabels: Record<PlatformCategory, string> = {
  infrastructure: 'Infrastructure',
  research: 'Research',
  finance: 'Finance',
  ai: 'AI Systems',
  publishing: 'Publishing',
  education: 'Education',
  capital: 'Capital',
  intelligence: 'Intelligence',
  compliance: 'Compliance',
  governance: 'Governance',
  energy: 'Energy & RWA',
  cultural: 'Cultural',
  revenue: 'Revenue',
};

const statusConfig: Record<PlatformStatus, { label: string; color: string; bg: string; dot: string }> = {
  live:     { label: 'LIVE',      color: '#22C55E', bg: '#22C55E15', dot: '#22C55E' },
  testnet:  { label: 'TESTNET',   color: '#F59E0B', bg: '#F59E0B15', dot: '#F59E0B' },
  dev:      { label: 'IN DEV',    color: '#3B82F6', bg: '#3B82F615', dot: '#3B82F6' },
  staging:  { label: 'STAGING',  color: '#F97316', bg: '#F9731615', dot: '#F97316' },
  internal: { label: 'INTERNAL', color: '#6B7280', bg: '#6B728015', dot: '#6B7280' },
  audit:    { label: 'AUDIT',    color: '#A855F7', bg: '#A855F715', dot: '#A855F7' },
};

const CATEGORY_FILTERS: Array<{ id: 'all' | PlatformCategory; label: string }> = [
  { id: 'all', label: 'All Systems' },
  { id: 'infrastructure', label: 'Infrastructure' },
  { id: 'capital', label: 'Capital' },
  { id: 'intelligence', label: 'Intelligence' },
  { id: 'governance', label: 'Governance' },
  { id: 'compliance', label: 'Compliance' },
  { id: 'energy', label: 'Energy & RWA' },
  { id: 'research', label: 'Research' },
  { id: 'publishing', label: 'Publishing' },
  { id: 'cultural', label: 'Cultural' },
  { id: 'finance', label: 'Finance' },
  { id: 'ai', label: 'AI Systems' },
  { id: 'education', label: 'Education' },
];

const STATUS_FILTERS: Array<{ id: 'all' | PlatformStatus; label: string }> = [
  { id: 'all',      label: 'All Status' },
  { id: 'live',     label: 'LIVE'     },
  { id: 'testnet',  label: 'TESTNET'  },
  { id: 'dev',      label: 'IN DEV'   },
  { id: 'staging',  label: 'STAGING'  },
  { id: 'internal', label: 'INTERNAL' },
];

export default function PlatformsGrid() {
  const { viewMode } = useView();
  const [activeCategory, setActiveCategory] = useState<'all' | PlatformCategory>('all');
  const [activeStatus, setActiveStatus] = useState<'all' | PlatformStatus>('all');

  const filtered = platforms.filter((p) => {
    const catMatch = activeCategory === 'all' || p.category === activeCategory;
    const statusMatch = activeStatus === 'all' || p.status === activeStatus;
    return catMatch && statusMatch;
  });

  // All counts come from the single computation layer — no inline math here.
  const { total: totalCount, live: liveCount, testnet: testnetCount, dev: devCount } = platformMetrics;

  const statsStrip = [
    { label: 'Systems Built', value: String(totalCount) },
    { label: 'Production',    value: String(liveCount)  },
    { label: 'Testnet',       value: String(testnetCount) },
    { label: 'In Dev',        value: String(devCount)   },
    { label: 'Chains',        value: '13+'              },
  ];

  return (
    <section id="platforms" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            {viewMode === 'creative' ? '🌐 Core Platforms' : 'Sovereign Systems Index'}
          </h2>
          <p className="text-[#8888a0] text-lg max-w-2xl mx-auto">
            {totalCount} systems. {liveCount} production. 3 integrated chains. One vertically integrated sovereign stack.
          </p>

          {/* Stats strip — data-driven from platforms.json */}
          <div className="flex flex-wrap justify-center gap-6 mt-8 mb-2">
            {statsStrip.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl font-bold text-white">{s.value}</div>
                <div className="text-xs text-[#8888a0] uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-10 space-y-3"
        >
          {/* Category Filter */}
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="w-3.5 h-3.5 text-[#8888a0] shrink-0" />
            {CATEGORY_FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveCategory(f.id)}
                className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                  activeCategory === f.id
                    ? 'border-blue-500 text-blue-400 bg-blue-500/10'
                    : 'border-[#1e1e2e] text-[#8888a0] hover:border-[#3e3e5e] hover:text-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2 flex-wrap pl-5">
            {STATUS_FILTERS.map((f) => {
              const cfg = f.id !== 'all' ? statusConfig[f.id] : null;
              const isActive = activeStatus === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => setActiveStatus(f.id)}
                  className={`text-xs px-3 py-1 rounded-full border transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'border-opacity-80 text-white'
                      : 'border-[#1e1e2e] text-[#8888a0] hover:border-[#3e3e5e] hover:text-white'
                  }`}
                  style={
                    isActive && cfg
                      ? { borderColor: cfg.color, color: cfg.color, backgroundColor: cfg.bg }
                      : {}
                  }
                >
                  {cfg && (
                    <span
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ backgroundColor: isActive ? cfg.dot : '#6B7280' }}
                    />
                  )}
                  {f.label}
                </button>
              );
            })}
          </div>

          {/* Result count */}
          <p className="text-xs text-[#8888a0] pl-5">
            Showing {filtered.length} of {totalCount} systems
          </p>
        </motion.div>

        {/* Platform Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((platform, index) => {
              const statusKey: PlatformStatus = platform.status;
              const statusCfg = statusConfig[statusKey];
              return (
                <motion.div
                  key={platform.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: index * 0.03 }}
                  className="platform-card group relative rounded-xl border border-[#1e1e2e] bg-[#12121a] hover:border-opacity-60 overflow-hidden"
                  style={{ ['--card-color' as string]: platform.color }}
                >
                  {/* Top color accent */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px]"
                    style={{ background: `linear-gradient(90deg, transparent, ${platform.color}, transparent)` }}
                  />

                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="text-xl">{platform.emoji}</span>
                          <span
                            className="text-xs font-medium px-2 py-0.5 rounded-full uppercase tracking-wider"
                            style={{
                              backgroundColor: `${platform.color}15`,
                              color: platform.color,
                            }}
                          >
                            {categoryLabels[platform.category] ?? platform.category}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                          {platform.name}
                        </h3>
                        <p className="text-sm text-[#8888a0]">{platform.subtitle}</p>
                      </div>

                      {/* Status Badge */}
                      <span
                        className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest shrink-0 ml-2 flex items-center gap-1"
                        style={{ backgroundColor: statusCfg.bg, color: statusCfg.color, border: `1px solid ${statusCfg.color}30` }}
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: statusCfg.dot, boxShadow: statusKey === 'live' ? `0 0 4px ${statusCfg.dot}` : 'none' }}
                        />
                        {statusCfg.label}
                      </span>
                    </div>

                    {/* Tagline */}
                    <p className="text-sm font-medium mb-3" style={{ color: platform.color }}>
                      {platform.tagline}
                    </p>

                    {/* Description */}
                    <p className="text-sm text-[#8888a0] leading-relaxed mb-4">
                      {platform.description}
                    </p>

                    {/* Features */}
                    {viewMode === 'institutional' && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {platform.features.slice(0, 4).map((feature) => (
                          <span
                            key={feature}
                            className="text-xs px-2 py-1 rounded border border-[#1e1e2e] text-[#8888a0] bg-[#0a0a0f]"
                          >
                            {feature}
                          </span>
                        ))}
                        {platform.features.length > 4 && (
                          <span className="text-xs px-2 py-1 text-[#8888a0]">
                            +{platform.features.length - 4} more
                          </span>
                        )}
                      </div>
                    )}

                    {/* Links */}
                    <div className="flex flex-col gap-2 pt-4 border-t border-[#1e1e2e]">
                      {platform.links.map((link) => (
                        <a
                          key={link.url}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-[#8888a0] hover:text-white transition-colors group/link"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>{link.label}</span>
                          <ChevronRight className="w-3 h-3 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                        </a>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 text-[#8888a0]"
          >
            <p className="text-lg">No systems match the selected filters.</p>
            <button
              onClick={() => { setActiveCategory('all'); setActiveStatus('all'); }}
              className="mt-4 text-sm text-blue-400 hover:text-blue-300 underline"
            >
              Clear filters
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
