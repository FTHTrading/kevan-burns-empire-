// ─────────────────────────────────────────────────────────────────────────────
// PROOF ITEMS — Verified, live, and on-chain proof surfaces.
// ─────────────────────────────────────────────────────────────────────────────

export type ProofType =
  | 'live-platform'
  | 'github'
  | 'on-chain'
  | 'document'
  | 'doi'
  | 'legal-instrument'
  | 'manual'
  | 'institutional-portal'
  | 'dns-verified';

export type TrustTag =
  | 'independently-verifiable'
  | 'on-chain-verifiable'
  | 'doi-registered'
  | 'crates-io-published'
  | 'live-product'
  | 'self-reported'
  | 'related-party-document';

export interface ProofItem {
  id: string;
  title: string;
  type: ProofType;
  description: string;
  url?: string;
  trustTags: TrustTag[];
  cautionNote?: string;
}

export const proofItems: ProofItem[] = [
  // ── LIVE PLATFORMS ──────────────────────────────────────────────────────────
  {
    id: 'optkas-live',
    title: 'OPTKAS Platform',
    type: 'live-platform',
    description: '78 mainnet operations, $25.75M insured escrow, 97.4% success rate, Wyoming SPV structure. Corporate, institutional gateway, factory OS, engineering docs all live.',
    url: 'https://optkas.org/',
    trustTags: ['live-product', 'independently-verifiable'],
  },
  {
    id: 'unykorn-live',
    title: 'UnyKorn.org',
    type: 'live-platform',
    description: 'Funding OS architecture, lifecycle, use cases, whitepaper, and XRPL demo live at unykorn.org.',
    url: 'https://unykorn.org/',
    trustTags: ['live-product', 'independently-verifiable'],
  },
  {
    id: 'genesis-live',
    title: 'Genesis Protocol',
    type: 'live-platform',
    description: '6,820 world simulations, live browser engine, Moltbook research showcase. Published DOI.',
    url: 'https://genesis.unykorn.org/',
    trustTags: ['live-product', 'doi-registered', 'independently-verifiable'],
  },
  {
    id: 'nil33-live',
    title: 'NIL33 Platform',
    type: 'live-platform',
    description: '33-factor NIL valuation, live at nil33.com. $1,200/mo Pro tier. NCAA + 50-state compliance.',
    url: 'https://nil33.com/',
    trustTags: ['live-product', 'independently-verifiable'],
  },
  {
    id: 'helios-live',
    title: 'Helios Digital',
    type: 'live-platform',
    description: 'Gold-backed XLS-20 NFT certificates. Citadel/Brinks custody. $99.95 founding membership.',
    url: 'https://heliosdigital.xyz/',
    trustTags: ['live-product', 'independently-verifiable'],
  },
  {
    id: 'gmiie-live',
    title: 'GMIIE Platform',
    type: 'live-platform',
    description: '5-ring sovereign monetary intelligence, 14 jurisdictions, 40+ sources, Oracle Prediction Factory.',
    url: 'https://news.unykorn.org/',
    trustTags: ['live-product', 'independently-verifiable'],
  },
  {
    id: 'fth-os-live',
    title: 'FTH Trading Platform',
    type: 'live-platform',
    description: '$25.75M escrow insured, 22 financial services, 941 tests, 13 chains.',
    url: 'https://fth-os.netlify.app/',
    trustTags: ['live-product', 'independently-verifiable'],
  },
  {
    id: 'funding-page',
    title: 'Funding Intelligence',
    type: 'live-platform',
    description: 'Active raises, funder criteria, due diligence anchors. /funding page on portfolio site.',
    url: 'https://portfolio.unykorn.org/funding',
    trustTags: ['live-product', 'independently-verifiable'],
  },
  // ── ON-CHAIN ─────────────────────────────────────────────────────────────
  {
    id: 'ndcf10-token',
    title: 'NDCF10 Token — XRPL Mainnet',
    type: 'on-chain',
    description: '10 units of NDCF10 participation token issued on XRP Ledger mainnet. Issuance TX: B68A33F006996B569F79827E4937ACFF5A912FDC4F69F74881064E625E8F93F4',
    url: 'https://livenet.xrpl.org/accounts/rPsj81Vis8s3NjDggsxzmMLGwNWZgPVQvy',
    trustTags: ['on-chain-verifiable'],
    cautionNote: 'Token self-issued by Unykorn Protocol to Unykorn 7777 — confirms tokenization occurred, not independent validation of underlying claim.',
  },
  {
    id: 'legal-doc-hashes',
    title: 'Legal Document Hashes — XRPL Mainnet',
    type: 'on-chain',
    description: '5 legal document SHA-256 hashes anchored individually on XRPL mainnet. Master hash also anchored. All 13 transactions confirm tesSUCCESS.',
    url: 'https://livenet.xrpl.org/transactions/B23FFE500671ADB68BF862E4D5D0274A9D1C9FE434F1E1367478TD87ABB542F4',
    trustTags: ['on-chain-verifiable'],
    cautionNote: 'Anchoring confirms document content at time of anchoring. Does not independently validate legal enforceability.',
  },
  {
    id: 'optkas-xrpl-ops',
    title: 'OPTKAS XRPL Mainnet Operations',
    type: 'on-chain',
    description: '78 mainnet XRPL operations verified. XRPL DVP atomic settlement confirmed. Dual-ledger (XRPL + Stellar) active.',
    url: 'https://optkas.org/engineering',
    trustTags: ['on-chain-verifiable', 'independently-verifiable'],
  },
  {
    id: 'uny-token-avalanche',
    title: 'UNY Token — Avalanche C-Chain',
    type: 'on-chain',
    description: '100M fixed-cap ERC-20. Verified on Snowtrace. Dual TraderJoe pools (WAVAX/UNY + USDC/UNY).',
    url: 'https://snowtrace.io/token/0xc09003213b34c7bec8d2eddfad4b43e51d007d66',
    trustTags: ['on-chain-verifiable', 'independently-verifiable'],
  },
  {
    id: 'ramm-polygon',
    title: 'RAMM Protocol — Polygon Mainnet',
    type: 'on-chain',
    description: '14 smart contracts verified on PolygonScan. RAMM governance + rUSD stablecoin + Treasury + Reserve Oracle.',
    url: 'https://ram.unykorn.org/',
    trustTags: ['on-chain-verifiable', 'independently-verifiable'],
  },
  // ── RESEARCH / DOI ────────────────────────────────────────────────────────
  {
    id: 'zenodo-doi',
    title: 'Genesis Protocol — Zenodo DOI',
    type: 'doi',
    description: 'Peer-published research. DOI: 10.5281/zenodo.18729652. "Deterministic Multi-Agent Economic Simulation Under Structural Invariant Violations." Permanently citable.',
    url: 'https://zenodo.org/records/18729652',
    trustTags: ['doi-registered', 'independently-verifiable'],
  },
  {
    id: 'crates-io',
    title: 'genesis-multiverse — crates.io',
    type: 'doi',
    description: 'Public Rust crate for parallel world orchestration. Published on crates.io.',
    url: 'https://crates.io/crates/genesis-multiverse',
    trustTags: ['crates-io-published', 'independently-verifiable'],
  },
  // ── GITHUB ───────────────────────────────────────────────────────────────
  {
    id: 'github-fthtrading',
    title: 'FTHTrading GitHub Organization',
    type: 'github',
    description: 'Primary GitHub org for FTH Trading / OPTKAS / UnyKorn / Helios / NIL33 / Genesis repositories.',
    url: 'https://github.com/FTHTrading',
    trustTags: ['independently-verifiable'],
  },
  {
    id: 'optkas-manual',
    title: 'OPTKAS Manual — GitHub',
    type: 'github',
    description: 'Public operational manual for OPTKAS cooperative. Settlement procedures, membership, governance documentation.',
    url: 'https://github.com/FTHTrading/optkas-manual',
    trustTags: ['independently-verifiable'],
  },
  // ── LEGAL INSTRUMENTS ─────────────────────────────────────────────────────
  {
    id: 'sponsor-note-estoppel-proof',
    title: 'Sponsor Note Estoppel Certificate',
    type: 'legal-instrument',
    description: 'Estoppel-confirmed amount due: $502,465,753.42 as of March 3, 2026. Issued by OPTKAS1-MAIN SPV. Addressed to any financing counterparty.',
    trustTags: ['related-party-document'],
    cautionNote: 'Signed by same individual on both sides. Related-party estoppel. External diligence required.',
  },
  {
    id: 'sponsor-note-proof',
    title: 'Sponsor Consideration Note ($500M)',
    type: 'legal-instrument',
    description: 'Executed January 26, 2026. $500M principal, 5% PIK, matures January 2029. Freely assignable and financeable.',
    trustTags: ['related-party-document'],
    cautionNote: 'Signed by same individual as both Issuer and Payee.',
  },
  {
    id: 'ndcf10-certificate-proof',
    title: 'NDCF10 Bond Participation Certificate',
    type: 'legal-instrument',
    description: 'Certificate No. NDCF10-2026-0001. 10% NDCF participation in TC Advantage 5% Secured Medium Term Notes (CUSIP 87225HAB4). Tokenized on XRPL mainnet.',
    url: 'https://livenet.xrpl.org/transactions/B68A33F006996B569F79827E4937ACFF5A912FDC4F69F74881064E625E8F93F4',
    trustTags: ['on-chain-verifiable', 'related-party-document'],
    cautionNote: 'Participation in NDCF is contingent. Not direct ownership of note principal.',
  },
  // ── INSTITUTIONAL PORTALS ─────────────────────────────────────────────────
  {
    id: 'optkas-tc-team-portal',
    title: 'OPTKAS TC Team Portal',
    type: 'institutional-portal',
    description: 'OPTKAS TC operator and team portal. Institutional-facing OPTKAS infrastructure surface.',
    url: 'https://optkas-tc.netlify.app/',
    trustTags: ['live-product', 'independently-verifiable'],
  },
  {
    id: 'super-s',
    title: 'SUPER-S Infrastructure Guide',
    type: 'manual',
    description: '100+ modules, 13 blockchains, 22 categories, 16 narrated build sessions. Complete FTH infrastructure atlas.',
    url: 'https://super-s.pages.dev/',
    trustTags: ['live-product', 'independently-verifiable'],
  },
  {
    id: 'portfolio-site',
    title: 'Portfolio / Systems Atlas',
    type: 'live-platform',
    description: '58-system registry at portfolio.unykorn.org. Filterable, searchable, with system deep-dives.',
    url: 'https://portfolio.unykorn.org/',
    trustTags: ['live-product', 'independently-verifiable'],
  },
];

export function getProofItemsByType(type: ProofType): ProofItem[] {
  return proofItems.filter((p) => p.type === type);
}

export const proofTypeLabels: Record<ProofType, string> = {
  'live-platform': 'Live Platform',
  'github': 'GitHub',
  'on-chain': 'On-Chain Verified',
  'document': 'Document',
  'doi': 'DOI / Published Research',
  'legal-instrument': 'Legal Instrument',
  'manual': 'Manual / Documentation',
  'institutional-portal': 'Institutional Portal',
  'dns-verified': 'DNS Verified',
};
