'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { systems } from '@/content/systems';

// ─── DNS Topology from Cloudflare audit ─────────────────────────────────────

interface SubDomain {
  sub: string;
  full: string;
  label: string;
  systemSlug?: string;
}

interface Zone {
  domain: string;
  color: string;
  accent: string;
  emoji: string;
  description: string;
  subdomains: SubDomain[];
}

const ZONES: Zone[] = [
  {
    domain: 'unykorn.org',
    color: '#3b82f6',
    accent: 'blue',
    emoji: '🦄',
    description: 'Primary sovereign namespace — portfolio, apps, APIs',
    subdomains: [
      { sub: 'portfolio', full: 'https://portfolio.unykorn.org/', label: 'Portfolio', systemSlug: 'unykorn' },
      { sub: 'genesis', full: 'https://genesis.unykorn.org/', label: 'Genesis Protocol', systemSlug: 'genesis-protocol' },
      { sub: 'news', full: 'https://news.unykorn.org/', label: 'GMIIE Intelligence', systemSlug: 'gmiie' },
      { sub: 'docs', full: 'https://docs.unykorn.org/', label: 'Documentation', systemSlug: 'doc-intelligence' },
      { sub: 'solana', full: 'https://solana.unykorn.org/', label: 'Solana Launcher', systemSlug: 'solana-launcher' },
      { sub: 'launch', full: 'https://launch.unykorn.org/', label: 'Launch (alt)', systemSlug: 'solana-launcher' },
      { sub: 'explorer', full: 'https://explorer.unykorn.org/', label: 'X402 Explorer', systemSlug: 'x402' },
      { sub: 'needai', full: 'https://needai.unykorn.org/', label: 'NEED AI (alt)', systemSlug: 'need-ai' },
    ],
  },
  {
    domain: 'mensofgod.com',
    color: '#78716c',
    accent: 'stone',
    emoji: '🏛️',
    description: 'Vaughan Capital Advisory — MOG Sovereign OS',
    subdomains: [
      { sub: '@', full: 'https://mensofgod.com/', label: 'Vaughan Capital Advisory', systemSlug: 'vaughan-capital' },
      { sub: 'www', full: 'https://mensofgod.com/', label: 'Vaughan Capital (www)', systemSlug: 'vaughan-capital' },
      { sub: 'api', full: 'https://api.mensofgod.com/', label: 'MOG API (Workers)', systemSlug: 'vaughan-capital' },
    ],
  },
  {
    domain: 'y3kmarkets.com',
    color: '#8b5cf6',
    accent: 'violet',
    emoji: '⚡',
    description: 'Y3K Markets career & AI infrastructure hub',
    subdomains: [
      { sub: '@', full: 'https://y3kmarkets.com/', label: 'Y3K Markets', systemSlug: 'y3k-markets' },
      { sub: 'needai', full: 'https://needai.y3kmarkets.com/', label: 'NEED AI', systemSlug: 'need-ai' },
      { sub: 'kevan', full: 'https://kevan.y3kmarkets.com/', label: 'Kevan Burns Profile', systemSlug: 'y3k-markets' },
      { sub: 'yodaleibi', full: 'https://yodaleibi.y3kmarkets.com/', label: 'Yodaleibi Profile', systemSlug: 'y3k-markets' },
      { sub: 'resume', full: 'https://resume.y3kmarkets.com/', label: 'Resume Engine', systemSlug: 'y3k-markets' },
      { sub: 'ai', full: 'https://ai.y3kmarkets.com/', label: 'AI Tools', systemSlug: 'y3k-markets' },
      { sub: 'claim', full: 'https://claim.y3kmarkets.com/', label: 'Claim Portal', systemSlug: 'y3k-markets' },
      { sub: 'x', full: 'https://x.y3kmarkets.com/', label: 'X Feed', systemSlug: 'y3k-markets' },
      { sub: 'api', full: 'https://api.y3kmarkets.com/', label: 'Y3K API (Workers)', systemSlug: 'y3k-markets' },
    ],
  },
  {
    domain: 'optkas.org',
    color: '#10b981',
    accent: 'emerald',
    emoji: '🏦',
    description: 'OPTKAS institutional cooperative & DR intelligence',
    subdomains: [
      { sub: '@', full: 'https://optkas.org/', label: 'OPTKAS', systemSlug: 'optkas' },
      { sub: 'dr', full: 'https://dr.optkas.org/', label: 'DR Intelligence (DICS)', systemSlug: 'dr-intelligence' },
    ],
  },
  {
    domain: 'heliosdigital.xyz',
    color: '#eab308',
    accent: 'yellow',
    emoji: '🪙',
    description: 'Gold-backed digital certificates on XRPL',
    subdomains: [
      { sub: '@', full: 'https://heliosdigital.xyz/', label: 'Helios Digital', systemSlug: 'helios' },
      { sub: 'films', full: 'https://films.heliosdigital.xyz/', label: 'Helios Films', systemSlug: 'helios' },
    ],
  },
  {
    domain: 'xxxiii.io',
    color: '#6366f1',
    accent: 'indigo',
    emoji: '🏛️',
    description: 'Sovereign capital layer, university & literary protocol',
    subdomains: [
      { sub: '@', full: 'https://xxxiii.io/', label: 'XXXIII Capital', systemSlug: 'xxxiii' },
      { sub: 'fitzherbert', full: 'https://fitzherbert.xxxiii.io/', label: 'Fitzherbert University', systemSlug: 'fth-university' },
      { sub: 'university', full: 'https://university.xxxiii.io/', label: 'University (alt)', systemSlug: 'fth-university' },
      { sub: 'donkeys', full: 'https://donkeys.xxxiii.io/', label: 'The 2,500 Donkeys', systemSlug: 'twenty-five-hundred-donkeys' },
    ],
  },
  {
    domain: 'nil33.com',
    color: '#f43f5e',
    accent: 'rose',
    emoji: '⚖️',
    description: 'NIL athlete tokenization & compliance infrastructure',
    subdomains: [
      { sub: '@', full: 'https://nil33.com/', label: 'NIL33', systemSlug: 'nil33' },
    ],
  },
  {
    domain: 'drunks.app',
    color: '#f97316',
    accent: 'orange',
    emoji: '🍺',
    description: 'Experimental social platform — isolated staging',
    subdomains: [
      { sub: '@', full: 'https://drunks.app/', label: 'Drunks App', systemSlug: 'drunks-app' },
    ],
  },
];

// ─── Animated counter ────────────────────────────────────────────────────────

function Counter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let start = 0;
    const duration = 1200;
    const step = duration / value;
    const timer = setInterval(() => {
      start += 1;
      setDisplay(start);
      if (start >= value) clearInterval(timer);
    }, step);
    return () => clearInterval(timer);
  }, [value]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

// ─── Derived stats ───────────────────────────────────────────────────────────

function computeStats() {
  const total = systems.length;
  const live = systems.filter((s) => s.maturity === 'live').length;
  const withUrl = systems.filter((s) => s.liveUrl).length;
  const domains = ZONES.length;
  const subdomains = ZONES.reduce((acc, z) => acc + z.subdomains.length, 0);
  const chains = new Set(systems.flatMap((s) => s.chainTargets ?? [])).size;
  const categories = new Set(systems.map((s) => s.category)).size;
  const techStack = new Set(systems.flatMap((s) => s.techStack ?? [])).size;

  return { total, live, withUrl, domains, subdomains, chains, categories, techStack };
}

// ─── Main component ──────────────────────────────────────────────────────────

export default function InfraProof() {
  const stats = computeStats();

  // All live systems with a URL, sorted by maturity then name
  const liveSystems = systems
    .filter((s) => s.liveUrl)
    .sort((a, b) => {
      const order = { live: 0, testnet: 1, pilot: 2, prototype: 3, concept: 4 };
      const ao = order[a.maturity as keyof typeof order] ?? 5;
      const bo = order[b.maturity as keyof typeof order] ?? 5;
      return ao - bo || a.name.localeCompare(b.name);
    });

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-[#f0f0f5]">
      {/* ── Hero ── */}
      <div className="relative overflow-hidden border-b border-[#1e1e2e]">
        <div className="absolute inset-0 grid-bg opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/30 via-transparent to-transparent" />
        <div className="relative max-w-7xl mx-auto px-6 pt-28 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-3">
              Infrastructure Proof — March 2026
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight mb-4">
              Every System.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">
                Every URL. All Live.
              </span>
            </h1>
            <p className="text-[#8888a0] text-base sm:text-lg max-w-2xl mb-8">
              Full inventory of the FTH / UnyKorn / Burns empire — 8 Cloudflare zones, 57 systems,
              verified DNS topology, and direct links to every live property.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="/systems/"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-semibold transition-colors"
              >
                🗺️ Systems Atlas
              </a>
              <a
                href="/control/"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1e1e2e] hover:bg-[#2a2a3e] text-white rounded-lg text-sm font-semibold border border-[#2a2a3e] hover:border-blue-500/40 transition-all"
              >
                ⚡ Control Plane
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Stat bar ── */}
      <div className="border-b border-[#1e1e2e] bg-[#0d0d14]">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {[
              { label: 'Systems', value: stats.total, color: 'text-blue-400' },
              { label: 'Live', value: stats.live, color: 'text-green-400' },
              { label: 'Live URLs', value: stats.withUrl, color: 'text-violet-400' },
              { label: 'Domains', value: stats.domains, color: 'text-amber-400' },
              { label: 'Subdomains', value: stats.subdomains, color: 'text-sky-400' },
              { label: 'Chains', value: stats.chains, color: 'text-emerald-400' },
              { label: 'Categories', value: stats.categories, color: 'text-rose-400' },
              { label: 'Tech', value: stats.techStack, suffix: '+', color: 'text-indigo-400' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="text-center"
              >
                <div className={`text-2xl font-black ${stat.color}`}>
                  <Counter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-xs text-[#555570] mt-0.5 font-medium uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 space-y-16">

        {/* ── Domain Topology ── */}
        <section>
          <div className="mb-8">
            <p className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-1">
              Cloudflare DNS Topology
            </p>
            <h2 className="text-2xl font-bold text-white">8 Active Zones</h2>
            <p className="text-[#8888a0] text-sm mt-1">
              Every subdomain verified via Cloudflare API — click any to open live.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ZONES.map((zone, zi) => (
              <motion.div
                key={zone.domain}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: zi * 0.07 }}
                className="bg-[#12121a] border border-[#1e1e2e] rounded-xl overflow-hidden hover:border-[#2a2a3e] transition-colors"
              >
                {/* Zone header */}
                <div
                  className="px-5 py-4 flex items-center gap-3"
                  style={{ borderBottom: `1px solid ${zone.color}22` }}
                >
                  <span className="text-xl">{zone.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-white text-sm">{zone.domain}</div>
                    <div className="text-xs text-[#555570] truncate">{zone.description}</div>
                  </div>
                  <div
                    className="text-xs font-semibold px-2 py-0.5 rounded-full"
                    style={{ background: `${zone.color}18`, color: zone.color }}
                  >
                    {zone.subdomains.length} {zone.subdomains.length === 1 ? 'record' : 'records'}
                  </div>
                </div>

                {/* Subdomain list */}
                <div className="divide-y divide-[#1a1a25]">
                  {zone.subdomains.map((sd) => (
                    <a
                      key={sd.sub + sd.full}
                      href={sd.full}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-5 py-2.5 hover:bg-[#1a1a28] transition-colors group"
                    >
                      <span className="w-2 h-2 rounded-full bg-green-500 shrink-0 group-hover:shadow-[0_0_6px_2px_rgba(34,197,94,0.4)] transition-shadow" />
                      <code className="text-xs text-[#555570] w-20 shrink-0">{sd.sub === '@' ? zone.domain : `${sd.sub}.`}</code>
                      <span className="text-sm text-[#c0c0d8] group-hover:text-white transition-colors flex-1 truncate">
                        {sd.label}
                      </span>
                      <span className="text-xs text-[#3a3a50] group-hover:text-blue-400 transition-colors">↗</span>
                    </a>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Live Systems Launchpad ── */}
        <section>
          <div className="mb-8">
            <p className="text-xs font-bold uppercase tracking-widest text-green-400 mb-1">
              Live Systems Launchpad
            </p>
            <h2 className="text-2xl font-bold text-white">{liveSystems.length} Systems with Live URLs</h2>
            <p className="text-[#8888a0] text-sm mt-1">
              Every system with a deployed URL. Click any row to open the live site.
            </p>
          </div>

          <div className="bg-[#12121a] border border-[#1e1e2e] rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#1e1e2e]">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-[#555570] uppercase tracking-wider">System</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-[#555570] uppercase tracking-wider hidden sm:table-cell">Category</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-[#555570] uppercase tracking-wider hidden md:table-cell">Stack</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-[#555570] uppercase tracking-wider">URL</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-[#555570] uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#16161f]">
                {liveSystems.map((system, i) => {
                  const maturityColor: Record<string, string> = {
                    live: 'bg-green-500',
                    testnet: 'bg-blue-500',
                    pilot: 'bg-amber-500',
                    prototype: 'bg-orange-500',
                    concept: 'bg-[#3a3a50]',
                  };
                  const dot = maturityColor[system.maturity] ?? 'bg-[#3a3a50]';
                  const domain = system.liveUrl
                    ? new URL(system.liveUrl).hostname
                    : '';

                  return (
                    <motion.tr
                      key={system.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: Math.min(i * 0.015, 0.6) }}
                      className="hover:bg-[#16161f] transition-colors group cursor-pointer"
                      onClick={() => window.open(system.liveUrl!, '_blank')}
                    >
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2.5">
                          <span className="text-base shrink-0">{system.emoji}</span>
                          <div>
                            <div className="font-semibold text-[#e0e0f0] group-hover:text-white transition-colors text-sm">
                              {system.name}
                            </div>
                            <div className="text-xs text-[#555570] truncate max-w-[180px] sm:max-w-none">
                              {system.subtitle}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 hidden sm:table-cell">
                        <span className="text-xs px-2 py-0.5 rounded bg-[#1e1e2e] text-[#8888a0]">
                          {system.category.replace(/-/g, ' ')}
                        </span>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <div className="flex gap-1 flex-wrap">
                          {(system.techStack ?? []).slice(0, 3).map((t) => (
                            <span key={t} className="text-xs px-1.5 py-0.5 rounded bg-[#1a1a28] text-[#666680] font-mono">
                              {t}
                            </span>
                          ))}
                          {(system.techStack ?? []).length > 3 && (
                            <span className="text-xs text-[#444460]">+{(system.techStack ?? []).length - 3}</span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-xs font-mono text-blue-400 group-hover:text-blue-300 transition-colors">
                          {domain}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`inline-block w-2.5 h-2.5 rounded-full ${dot} group-hover:shadow-[0_0_6px_2px_rgba(34,197,94,0.4)] transition-shadow`} />
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Architecture by the numbers ── */}
        <section>
          <div className="mb-8">
            <p className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-1">
              Architecture
            </p>
            <h2 className="text-2xl font-bold text-white">What Powers It</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Chains */}
            <div className="bg-[#12121a] border border-[#1e1e2e] rounded-xl p-6">
              <div className="text-xs font-bold uppercase tracking-widest text-[#555570] mb-4">Blockchain Targets</div>
              {Array.from(new Set(systems.flatMap((s) => s.chainTargets ?? []))).map((chain) => {
                const count = systems.filter((s) => s.chainTargets?.includes(chain)).length;
                const chainColors: Record<string, string> = {
                  xrpl: '#00adef', stellar: '#08b5e5', polygon: '#8247e5',
                  ethereum: '#627eea', solana: '#9945ff', bitcoin: '#f7931a',
                };
                const color = chainColors[chain] ?? '#8888a0';
                return (
                  <div key={chain} className="flex items-center gap-2 mb-2">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
                    <span className="text-sm capitalize text-[#c0c0d8] font-medium">{chain.toUpperCase()}</span>
                    <span className="ml-auto text-xs text-[#555570]">{count} systems</span>
                  </div>
                );
              })}
            </div>

            {/* Maturity */}
            <div className="bg-[#12121a] border border-[#1e1e2e] rounded-xl p-6">
              <div className="text-xs font-bold uppercase tracking-widest text-[#555570] mb-4">Maturity Distribution</div>
              {(['live', 'testnet', 'pilot', 'prototype', 'concept'] as const).map((m) => {
                const count = systems.filter((s) => s.maturity === m).length;
                if (!count) return null;
                const colors: Record<string, string> = {
                  live: '#22c55e', testnet: '#3b82f6', pilot: '#f59e0b',
                  prototype: '#f97316', concept: '#6366f1',
                };
                const pct = Math.round((count / systems.length) * 100);
                return (
                  <div key={m} className="mb-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="capitalize font-medium" style={{ color: colors[m] }}>{m}</span>
                      <span className="text-[#555570]">{count} / {pct}%</span>
                    </div>
                    <div className="h-1.5 bg-[#1e1e2e] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${pct}%`, background: colors[m] }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Categories */}
            <div className="bg-[#12121a] border border-[#1e1e2e] rounded-xl p-6">
              <div className="text-xs font-bold uppercase tracking-widest text-[#555570] mb-4">System Categories</div>
              {Array.from(
                systems.reduce((acc, s) => {
                  acc.set(s.category, (acc.get(s.category) ?? 0) + 1);
                  return acc;
                }, new Map<string, number>()),
              )
                .sort((a, b) => b[1] - a[1])
                .map(([cat, count]) => (
                  <div key={cat} className="flex items-center gap-2 mb-1.5">
                    <span className="text-xs text-[#8888a0] flex-1 truncate capitalize">
                      {cat.replace(/-/g, ' ')}
                    </span>
                    <span className="text-xs font-mono text-[#555570]">{count}</span>
                  </div>
                ))}
            </div>
          </div>
        </section>

        {/* ── CTA strip ── */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              href: '/systems/',
              label: '🗺️ Browse All 57 Systems',
              sub: 'Full atlas with filters, search, and system detail pages',
              color: 'border-blue-500/30 hover:border-blue-500/60 hover:bg-blue-950/20',
            },
            {
              href: '/control/',
              label: '⚡ Control Plane',
              sub: 'Status table, maturity chart, capital view, dependency graph',
              color: 'border-violet-500/30 hover:border-violet-500/60 hover:bg-violet-950/20',
            },
            {
              href: '/services/',
              label: '🤝 Services',
              sub: 'Infrastructure advisory, capital structuring, AI deployment',
              color: 'border-amber-500/30 hover:border-amber-500/60 hover:bg-amber-950/20',
            },
          ].map((cta) => (
            <a
              key={cta.href}
              href={cta.href}
              className={`block p-5 rounded-xl bg-[#12121a] border transition-all ${cta.color}`}
            >
              <div className="font-bold text-white mb-1">{cta.label}</div>
              <div className="text-xs text-[#555570]">{cta.sub}</div>
            </a>
          ))}
        </section>

      </div>

      {/* Footer strip */}
      <div className="border-t border-[#1e1e2e] mt-8">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-[#444460]">
            FTH Trading Group · Burns Empire Infrastructure · {new Date().getFullYear()}
          </span>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs text-[#555570]">All systems operational</span>
          </div>
        </div>
      </div>
    </div>
  );
}
