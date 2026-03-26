'use client';

import { motion } from 'framer-motion';
import {
  ArrowLeft, ArrowRight, Mail, DollarSign, TrendingUp, Shield, Users,
  Zap, Building2, FlaskConical, Globe, Target, CheckCircle2, ExternalLink,
  Coins, Cpu, Trophy, Leaf
} from 'lucide-react';
import { portfolioMetrics } from '@/lib/portfolioMetrics';

// ─── Active Raises ────────────────────────────────────────────────────────────

const activeRaises = [
  {
    id: 'cricket',
    name: 'Atlanta Cricket RWA',
    emoji: '🏏',
    status: 'OPEN',
    statusColor: '#10B981',
    type: 'Reg D 506(c) — Accredited Investors',
    amount: '$35M',
    amountLabel: 'Preferred Equity Raise',
    instrument: 'ERC-3643 ACS-S Security Token',
    minimum: '$25,000',
    target: 'Accredited investors, Family Offices, RWA-focused funds',
    highlights: [
      'First purpose-built cricket stadium in Southeast US',
      '12,000-seat Phase 1 · $150M total capital stack',
      '50M tokens at $0.70 = $35M raise',
      '6-step investor waterfall with priority return tiers',
      '5-year base revenue: $9.8M → $25.2M',
      'Exit scenarios: 2.20x – 4.12x MOIC',
      'Path: Reg D 506(c) → Reg CF → Reg A+',
      '14-document offering package ready',
    ],
    github: 'https://github.com/FTHTrading/Cricket',
    contact: 'kevan.burns@fthtrading.com',
    color: '#10B981',
  },
  {
    id: 'genesis-world',
    name: 'Genesis Sentience Protocol',
    emoji: '🧬',
    status: 'OPEN',
    statusColor: '#F59E0B',
    type: 'SAFE — Post-Money Valuation Cap',
    amount: '$1M – $3M',
    amountLabel: 'SAFE Raise',
    instrument: 'SAFE at $15M cap / 20% discount',
    minimum: '$50,000',
    target: 'AI-native investors, Web3 funds, governance-focused DAOs',
    highlights: [
      '9 smart contracts live on Polygon mainnet',
      '15 soul-bound NFTs minted · 28-page frontend live',
      '5 sovereign economic rails ($AURUM / $LEX / $NOVA / $MERC / $LUDO)',
      '$CORE (1B) + $ORIGIN (100M) token architecture',
      '3-tier constitutional governance (AI → Validators → Humans)',
      '15M cap at 20% discount — early-stage terms',
      'Live at drunks.app',
    ],
    github: 'https://github.com/FTHTrading/genesis-world',
    contact: 'kevan.burns@fthtrading.com',
    color: '#F59E0B',
  },
];

// ─── Funding by System Category ───────────────────────────────────────────────

const fundingCategories = [
  {
    icon: <Coins className="w-6 h-6" />,
    label: 'RWA & Tokenization',
    color: '#10B981',
    systems: ['Atlanta Cricket RWA', 'LPS1', 'Asset Factory', 'Solana Token Launcher', 'XRPL RWA Bridge'],
    fundingTypes: ['Reg D 506(c) Security Token Offering', 'Reg CF (Retail Crowdfunding)', 'Reg A+ (Mini-IPO)', 'Accredited Investor SPV'],
    whatFundersSee: 'Revenue-generating real assets with on-chain compliance rails, accredited investor protection, and full LP/SPV audit trail.',
    targetInvestors: ['Real estate funds', 'RWA-focused crypto funds', 'Family offices', 'Accredited individuals'],
  },
  {
    icon: <Cpu className="w-6 h-6" />,
    label: 'AI & Operating Systems',
    color: '#6366F1',
    systems: ['KAIROS', 'Genesis Sentience Protocol', 'Global Truth Protocol', 'SGE Alignment OS', 'X407'],
    fundingTypes: ['SAFE / Convertible Note', 'VC Series A/B', 'Strategic Partnership', 'Token Sale (SAFT/SAFE+Token)'],
    whatFundersSee: 'Production AI infrastructure with live deployments, agent-native monetization, and defensible IP in deterministic AI coordination.',
    targetInvestors: ['AI-first VCs', 'Web3 native funds', 'Strategic enterprise investors', 'Crypto-native angels'],
  },
  {
    icon: <Trophy className="w-6 h-6" />,
    label: 'Sports & NIL',
    color: '#059669',
    systems: ['NIL33', 'QB DNA', 'NIL Transparency Network', 'VS Identity OS'],
    fundingTypes: ['VC (Pre-Seed / Seed)', 'Sports industry strategic', 'Revenue-based financing', 'Angel round'],
    whatFundersSee: '$8B+ NIL market, live platform at nil33.com, unique Rust + AI stack with verifiable NCAA compliance via RAG corpus.',
    targetInvestors: ['Sports tech VCs', 'Athlete-founder angels', 'Media & entertainment funds', 'NCAA ecosystem strategics'],
  },
  {
    icon: <FlaskConical className="w-6 h-6" />,
    label: 'Research & Forensics',
    color: '#8B5CF6',
    systems: ['Genesis Protocol', 'GRAVITY-', 'Global Truth Protocol', 'Fitzherbert University'],
    fundingTypes: ['Research grants (NSF, NIH, DARPA)', 'University partnership', 'Government contract', 'Academic licensing'],
    whatFundersSee: 'Peer-accepted research at Zenodo (5,680 simulated worlds), rigorous Bayesian methodology, published frameworks applicable to policy and defense.',
    targetInvestors: ['Federal research agencies', 'Think tanks', 'University research offices', 'Defense contractors'],
  },
  {
    icon: <Leaf className="w-6 h-6" />,
    label: 'Energy & Infrastructure',
    color: '#16A34A',
    systems: ['SGE — Scalable Green Energy', 'SGE Alignment OS', 'Unykorn L1', 'POPEYE/MARS/TEV'],
    fundingTypes: ['Impact investment', 'Green bond / ReFi', 'Infrastructure equity', 'Token raise (ERC-20)'],
    whatFundersSee: 'Live Ethereum mainnet settlement, ERC-20 SGE token deployed, instant settlement CLI with verifiable Etherscan receipts.',
    targetInvestors: ['Impact/ESG funds', 'Energy transition investors', 'Infrastructure allocators', 'DeFi protocols'],
  },
  {
    icon: <Globe className="w-6 h-6" />,
    label: 'Protocol & L1',
    color: '#B45309',
    systems: ['Unykorn L1', 'KAIROS Settlement', 'XRPL Infrastructure', 'Stellar Integration'],
    fundingTypes: ['Foundation grant', 'Ecosystem fund', 'Token pre-sale (SAFT)', 'VC infrastructure round'],
    whatFundersSee: 'Production Rust L1 with 3s block time, 62 tests, 3-node devnet, and 5-component closed-loop design — not a whitepaper.',
    targetInvestors: ['Protocol foundations (XRPL, Stellar, Polygon)', 'Layer-1 infrastructure VCs', 'Ecosystem development funds'],
  },
];

// ─── What Funders Look For ─────────────────────────────────────────────────────

const funderTypes = [
  {
    type: 'Venture Capitalists',
    icon: <TrendingUp className="w-5 h-5" />,
    color: '#6366F1',
    lookFor: [
      'Defensible technical moat (proprietary Rust engines, custom AI stacks)',
      'Large addressable market ($8B+ NIL, $16T+ RWA, trillion-dollar AI)',
      'Live product with real users or revenue',
      'Founder credibility: code depth + domain expertise',
      'Clear token or equity path to liquidity',
    ],
    whatWeHave: `NIL33 live at nil33.com, Genesis live at drunks.app, ${portfolioMetrics.systemCount} systems with GitHub-verified code, published peer research.`,
  },
  {
    type: 'Angel Investors',
    icon: <Zap className="w-5 h-5" />,
    color: '#F59E0B',
    lookFor: [
      'Founder who ships — real GitHub commits, not decks',
      'Early stage with high upside',
      'Domain they understand and believe in',
      'Simple instrument: SAFE, convertible note',
      'Access and relationship with the builder',
    ],
    whatWeHave: 'SAFE available for Genesis Sentience Protocol ($15M cap). Full GitHub audit trail of every commit for every system.',
  },
  {
    type: 'Family Offices',
    icon: <Shield className="w-5 h-5" />,
    color: '#10B981',
    lookFor: [
      'Real assets with blockchain compliance overlay',
      'Accredited-investor-compliant structure (Reg D)',
      'Clear waterfall, preferred equity, downside protection',
      'Existing legal documents and SPV setup',
      'Long-term capital return, not speculative token',
    ],
    whatWeHave: 'Cricket RWA: full 14-document Reg D 506(c) offering, two-SPV structure, 6-step waterfall, accredited-only ACS-S token.',
  },
  {
    type: 'Strategic Partners',
    icon: <Building2 className="w-5 h-5" />,
    color: '#0EA5E9',
    lookFor: [
      'Infrastructure that integrates with their stack',
      'White-label or licensing model',
      'Proven technical reliability and production maturity',
      'Long-term engineering relationship',
      'IP ownership or exclusivity options',
    ],
    whatWeHave: 'Services menu from $7.5K Architecture Sprint to $250K+ Platinum retainer. X407 agent commerce layer available for white-label.',
  },
  {
    type: 'Government & Grants',
    icon: <FlaskConical className="w-5 h-5" />,
    color: '#8B5CF6',
    lookFor: [
      'Published peer-reviewed or academically-accepted research',
      'Reproducible methodology (code + datasets available)',
      'Clear societal or scientific benefit',
      'Institutional affiliation or track record',
      'Defined deliverables and milestone reporting',
    ],
    whatWeHave: 'Zenodo-published simulation research (DOI: 10.5281/zenodo.18729652). GRAVITY- forensic system with 390 tests and full methodology.',
  },
  {
    type: 'Ecosystem Funds (Blockchain)',
    icon: <Coins className="w-5 h-5" />,
    color: '#B45309',
    lookFor: [
      'Building on their chain / expanding ecosystem TVL',
      'Developer tooling or infrastructure that attracts builders',
      'Live deployment, not vaporware',
      'Alignment with chain\u2019s strategic roadmap',
      'Community building or governance participation',
    ],
    whatWeHave: '9 contracts on Polygon mainnet (Genesis). XRPL + Stellar cross-chain infrastructure. Avalanche, Arbitrum, Base integrations active.',
  },
];

// ─── Due Diligence Anchors ────────────────────────────────────────────────────

const diligenceAnchors = [
  { label: `Full System Atlas (${portfolioMetrics.systemCount} systems)`, href: '/systems', icon: <Globe className="w-4 h-4" /> },
  { label: 'Control Dashboard', href: '/control', icon: <Target className="w-4 h-4" /> },
  { label: 'GitHub — FTHTrading', href: 'https://github.com/FTHTrading', icon: <ExternalLink className="w-4 h-4" />, external: true },
  { label: 'Zenodo Research Publication', href: 'https://zenodo.org/records/18729652', icon: <ExternalLink className="w-4 h-4" />, external: true },
  { label: 'NIL33 Live Platform', href: 'https://nil33.com', icon: <ExternalLink className="w-4 h-4" />, external: true },
  { label: 'Genesis Sentience (drunks.app)', href: 'https://www.drunks.app', icon: <ExternalLink className="w-4 h-4" />, external: true },
  { label: 'SGE Settlement Demo', href: 'https://fthtrading.github.io/sge-alignment-os', icon: <ExternalLink className="w-4 h-4" />, external: true },
  { label: 'Services & Engagement Tiers', href: '/services', icon: <ArrowRight className="w-4 h-4" /> },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function FundingPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Navbar */}
      <div className="fixed top-0 left-0 right-0 z-40 border-b border-[#1e1e2e]/50 bg-[#0a0a0f]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm">KB</div>
            <span className="text-white font-semibold hidden sm:block">KEVAN BURNS</span>
          </a>
          <div className="flex items-center gap-4">
            <a href="/" className="flex items-center gap-2 text-sm text-[#8888a0] hover:text-white transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" /> Empire Index
            </a>
            <a href="/systems" className="text-sm text-[#8888a0] hover:text-white transition-colors">Atlas</a>
            <a href="/services" className="text-sm text-[#8888a0] hover:text-white transition-colors">Services</a>
            <a
              href="mailto:kevan.burns@fthtrading.com"
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-400 rounded-lg text-sm font-medium transition-all border border-emerald-600/20"
            >
              <Mail className="w-3.5 h-3.5" />
              Invest
            </a>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-xs font-medium mb-8">
              <DollarSign className="w-3.5 h-3.5" /> FUNDING & INVESTMENT OPPORTUNITIES
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {portfolioMetrics.systemCount} Systems.<br />
              <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                Multiple Ways to Fund.
              </span>
            </h1>
            <p className="text-[#8888a0] text-lg max-w-2xl mx-auto mb-10">
              Every system in this ecosystem has a funding path — whether that&apos;s Reg D tokenized equity,
              a SAFE, VC round, grant, or strategic partnership. This page maps the opportunities,
              explains what each investor type looks for, and points to the due diligence materials.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a href="#active-raises" className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-medium text-sm transition-all">
                <DollarSign className="w-4 h-4" /> Active Raises
              </a>
              <a href="#by-category" className="flex items-center gap-2 px-5 py-2.5 border border-[#2a2a3a] hover:border-blue-500/40 text-[#c0c0d0] hover:text-white rounded-lg font-medium text-sm transition-all">
                Funding by Category
              </a>
              <a href="#what-funders-want" className="flex items-center gap-2 px-5 py-2.5 border border-[#2a2a3a] hover:border-blue-500/40 text-[#c0c0d0] hover:text-white rounded-lg font-medium text-sm transition-all">
                What Funders Look For
              </a>
              <a href="#diligence" className="flex items-center gap-2 px-5 py-2.5 border border-[#2a2a3a] hover:border-blue-500/40 text-[#c0c0d0] hover:text-white rounded-lg font-medium text-sm transition-all">
                Due Diligence
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── ACTIVE RAISES ── */}
      <section id="active-raises" className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-xs font-medium mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> LIVE
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Active Raises</h2>
            <p className="text-[#8888a0] mt-2 text-sm">Currently open for qualified investors.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {activeRaises.map((raise, i) => (
              <motion.div
                key={raise.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative rounded-2xl border border-[#1e1e2e] bg-[#12121a] p-8 overflow-hidden"
              >
                {/* top accent */}
                <div className="absolute top-0 left-6 right-6 h-px opacity-60"
                  style={{ background: `linear-gradient(90deg, transparent, ${raise.color}, transparent)` }} />

                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{raise.emoji}</span>
                    <div>
                      <h3 className="text-xl font-bold text-white">{raise.name}</h3>
                      <p className="text-xs text-[#8888a0] mt-0.5">{raise.type}</p>
                    </div>
                  </div>
                  <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
                    style={{ background: `${raise.statusColor}15`, color: raise.statusColor, border: `1px solid ${raise.statusColor}30` }}>
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: raise.statusColor }} />
                    {raise.status}
                  </span>
                </div>

                <div className="flex items-end gap-6 mb-6">
                  <div>
                    <p className="text-xs text-[#8888a0] uppercase tracking-wider mb-1">Raise Amount</p>
                    <p className="text-3xl font-bold" style={{ color: raise.color }}>{raise.amount}</p>
                    <p className="text-xs text-[#555566]">{raise.amountLabel}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#8888a0] uppercase tracking-wider mb-1">Instrument</p>
                    <p className="text-sm font-medium text-white">{raise.instrument}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-xs font-semibold text-white uppercase tracking-wider mb-3">Highlights</p>
                  <ul className="space-y-2">
                    {raise.highlights.map((h, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-[#8888a0]">
                        <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: raise.color }} />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-[#0a0a0f] rounded-xl p-4 mb-6">
                  <p className="text-xs text-[#555566] uppercase tracking-wider mb-1">Target Investors</p>
                  <p className="text-sm text-[#8888a0]">{raise.target}</p>
                  <p className="text-xs text-[#555566] mt-2">Minimum: <span className="text-white">{raise.minimum}</span></p>
                </div>

                <div className="flex gap-3">
                  <a href={`mailto:${raise.contact}?subject=Investment Inquiry: ${raise.name}`}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all"
                    style={{ background: `${raise.color}20`, color: raise.color, border: `1px solid ${raise.color}30` }}>
                    <Mail className="w-3.5 h-3.5" /> Contact to Invest
                  </a>
                  <a href={raise.github} target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-4 py-2.5 border border-[#2a2a3a] hover:border-[#3a3a4a] text-[#8888a0] hover:text-white rounded-lg text-sm transition-all">
                    <ExternalLink className="w-3.5 h-3.5" /> GitHub
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* divider */}
      <div className="max-w-7xl mx-auto px-6"><div className="h-px bg-[#1e1e2e]" /></div>

      {/* ── FUNDING BY CATEGORY ── */}
      <section id="by-category" className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Funding by System Category</h2>
            <p className="text-[#8888a0] text-sm">Each category of the stack has its own investor audience and funding instruments.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {fundingCategories.map((cat, i) => (
              <motion.div
                key={cat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-2xl border border-[#1e1e2e] bg-[#12121a] p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: `${cat.color}15`, color: cat.color }}>
                    {cat.icon}
                  </div>
                  <h3 className="font-bold text-white">{cat.label}</h3>
                </div>

                <div className="mb-4">
                  <p className="text-xs font-semibold text-[#555566] uppercase tracking-wider mb-2">Systems in This Category</p>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.systems.map(s => (
                      <span key={s} className="px-2 py-0.5 rounded text-xs border border-[#2a2a3a] text-[#8888a0]">{s}</span>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-xs font-semibold text-[#555566] uppercase tracking-wider mb-2">Funding Instruments</p>
                  <ul className="space-y-1">
                    {cat.fundingTypes.map(f => (
                      <li key={f} className="flex items-center gap-2 text-xs text-[#8888a0]">
                        <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: cat.color }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-4 bg-[#0a0a0f] rounded-xl p-3">
                  <p className="text-xs font-semibold text-[#555566] uppercase tracking-wider mb-1">What Funders See</p>
                  <p className="text-xs text-[#8888a0] leading-relaxed">{cat.whatFundersSee}</p>
                </div>

                <div>
                  <p className="text-xs font-semibold text-[#555566] uppercase tracking-wider mb-2">Target Investors</p>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.targetInvestors.map(t => (
                      <span key={t} className="px-2 py-0.5 rounded text-xs font-medium"
                        style={{ background: `${cat.color}10`, color: cat.color, border: `1px solid ${cat.color}20` }}>{t}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* divider */}
      <div className="max-w-7xl mx-auto px-6"><div className="h-px bg-[#1e1e2e]" /></div>

      {/* ── WHAT FUNDERS LOOK FOR ── */}
      <section id="what-funders-want" className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">What Funders Look For</h2>
            <p className="text-[#8888a0] text-sm">How each investor type evaluates a system — and what already exists to satisfy each criterion.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {funderTypes.map((funder, i) => (
              <motion.div
                key={funder.type}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="rounded-2xl border border-[#1e1e2e] bg-[#12121a] p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ background: `${funder.color}15`, color: funder.color }}>
                    {funder.icon}
                  </div>
                  <h3 className="font-bold text-white">{funder.type}</h3>
                </div>

                <div className="mb-4">
                  <p className="text-xs font-semibold text-[#555566] uppercase tracking-wider mb-2">What They Look For</p>
                  <ul className="space-y-1.5">
                    {funder.lookFor.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-[#8888a0]">
                        <CheckCircle2 className="w-3 h-3 mt-0.5 flex-shrink-0" style={{ color: funder.color }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-[#0a0a0f] rounded-xl p-3 border-l-2" style={{ borderColor: funder.color }}>
                  <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: funder.color }}>What We Have</p>
                  <p className="text-xs text-[#8888a0] leading-relaxed">{funder.whatWeHave}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* divider */}
      <div className="max-w-7xl mx-auto px-6"><div className="h-px bg-[#1e1e2e]" /></div>

      {/* ── DUE DILIGENCE ANCHORS ── */}
      <section id="diligence" className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Due Diligence Resources</h2>
            <p className="text-[#8888a0] text-sm">Everything a serious investor needs — system registry, live deployments, GitHub, research, and engagement tiers.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {diligenceAnchors.map((anchor, i) => (
              <motion.a
                key={anchor.href}
                href={anchor.href}
                {...(anchor.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="flex items-center gap-3 p-4 rounded-xl border border-[#1e1e2e] bg-[#12121a] hover:border-blue-500/30 hover:bg-[#15151f] text-[#8888a0] hover:text-white transition-all group"
              >
                <span className="text-blue-400 group-hover:text-blue-300 flex-shrink-0">{anchor.icon}</span>
                <span className="text-sm font-medium">{anchor.label}</span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* divider */}
      <div className="max-w-7xl mx-auto px-6"><div className="h-px bg-[#1e1e2e]" /></div>

      {/* ── CONTACT CTA ── */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-500/10 mb-8">
              <Users className="w-8 h-8 text-emerald-400" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Ready to Invest or Partner?
            </h2>
            <p className="text-[#8888a0] text-lg max-w-xl mx-auto mb-8">
              Whether you&apos;re looking to invest in a specific system, discuss co-building infrastructure,
              or explore a strategic partnership across the stack — reach out directly.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8 text-sm text-[#8888a0]">
              <a href="mailto:kevan.burns@fthtrading.com" className="flex items-center gap-2 hover:text-white transition-colors">
                <Mail className="w-4 h-4" /> kevan.burns@fthtrading.com
              </a>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="mailto:kevan.burns@fthtrading.com?subject=Investment Inquiry"
                className="group flex items-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-semibold text-base transition-all duration-300">
                <Mail className="w-5 h-5" />
                Investment Inquiry
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="/services"
                className="flex items-center gap-2 px-8 py-4 border border-[#2a2a3a] hover:border-blue-500/40 text-[#c0c0d0] hover:text-white rounded-lg font-semibold text-base transition-all duration-300">
                <Building2 className="w-5 h-5" />
                Services & Retainers
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
