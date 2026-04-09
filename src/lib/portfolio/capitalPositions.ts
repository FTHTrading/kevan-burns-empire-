// ─────────────────────────────────────────────────────────────────────────────
// CAPITAL POSITIONS — Typed, canonical data for the documented capital stack.
//
// Sources: Directly extracted from executed legal instruments (Jan–Mar 2026).
// ALL figures are as stated in the documents. Labels are disciplined.
// Related-party structure is acknowledged. External diligence is required.
//
// System counts MUST be imported from portfolioMetrics — never hardcoded.
// ─────────────────────────────────────────────────────────────────────────────

import { portfolioMetrics } from '@/lib/portfolioMetrics';

export type CapitalClass =
  | 'built-systems-ip'
  | 'executed-note'
  | 'structured-participation-right'
  | 'combined-documented-stack';

export type FinanceabilityRating =
  | 'asset-backed-now'
  | 'subject-to-diligence'
  | 'contingent'
  | 'summary-only';

export type RiskLevel = 'low' | 'moderate' | 'elevated' | 'critical-review';

export interface EvidenceTag {
  label: string;
  type: 'on-chain' | 'executed-document' | 'self-reported' | 'third-party' | 'estoppel';
}

export interface CautionTag {
  label: string;
  severity: RiskLevel;
}

export interface CapitalPosition {
  id: string;
  title: string;
  subtitle: string;
  classification: CapitalClass;
  classificationLabel: string;
  amountLabel: string;         // e.g. "$502,465,753.42" or "$25.85M–$100.8M"
  amountNote?: string;         // qualifier / context
  summary: string;
  detail: string;
  evidenceTags: EvidenceTag[];
  cautionTags: CautionTag[];
  financeability: FinanceabilityRating;
  financeabilityNote: string;
  keyFields: { label: string; value: string }[];
  documentRefs?: string[];     // references to legalDocs by id
  xrplRef?: string;            // XRPL transaction or address
  order: number;               // display order
}

// ─────────────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────────────

export const capitalPositions: CapitalPosition[] = [
  {
    id: 'built-systems-portfolio',
    title: 'Built Systems / Infrastructure Portfolio',
    subtitle: 'Software, Protocol, Platform, and Operating System IP',
    classification: 'built-systems-ip',
    classificationLabel: 'Built Systems / IP',
    amountLabel: '$25.85M – $100.8M',
    amountNote: 'Independent third-party valuation estimate. Not audited. Not a booked asset.',
    summary:
      `${portfolioMetrics.systemCount} cataloged systems spanning capital infrastructure, tokenization, AI, compliance, protocol, energy, and market intelligence. Includes ${portfolioMetrics.liveCount}+ live platforms, ${portfolioMetrics.chainCount} chain integrations, and peer-published simulation research. Valuation estimate is based on comparable-stage institutional fintech and infrastructure transactions.`,
    detail:
      'The built-systems portfolio spans FTH Trading Platform (22 financial services, 941 tests, 108+ database tables, 13 blockchains), UnyKorn Funding OS (22-crate Rust workspace, 166 tests, deterministic multi-rail settlement), OPTKAS (78 mainnet operations, $25.75M insured escrow, 97.4% success rate), Helios Digital (gold-backed XLS-20 NFTs, Citadel/Brinks custody), Genesis Protocol (6,820 worlds, 3.41M+ epochs, DOI-published), GMIIE (5-ring sovereign monetary intelligence, 14 jurisdictions), NIL33 (live platform, $1,200/mo Pro tier), and 51 additional systems. The valuation range ($25.85M–$100.8M) reflects independent analysis of market comparables, technical depth, operating metrics, and revenue potential — it does not incorporate the documented receivable or participation right below.',
    evidenceTags: [
      { label: 'Live platforms verified', type: 'third-party' },
      { label: 'GitHub repositories public', type: 'third-party' },
      { label: 'Zenodo DOI published', type: 'third-party' },
      { label: 'XRPL mainnet verified', type: 'on-chain' },
      { label: '$25.75M escrow insured (Q1 2026 attestation)', type: 'self-reported' },
    ],
    cautionTags: [
      { label: 'Not audited — estimate only', severity: 'moderate' },
      { label: 'No disclosed ARR — pre-revenue in most systems', severity: 'moderate' },
      { label: 'No registered patents', severity: 'low' },
    ],
    financeability: 'subject-to-diligence',
    financeabilityNote:
      'OPTKAS escrow ($25.75M insured) and Helios/AURG physical gold custody are the most immediately collateralizable components. Revenue-based financing available once MRR is disclosed in any one system.',
    keyFields: [
      { label: 'Systems Cataloged', value: String(portfolioMetrics.systemCount) },
      { label: 'Live / Operational', value: `${portfolioMetrics.liveCount}+` },
      { label: 'Chain Integrations', value: String(portfolioMetrics.chainCount) },
      { label: 'OPTKAS Escrow Insured', value: '$25.75M (Q1 2026)' },
      { label: 'OPTKAS Success Rate', value: '97.4% (trailing 12 months)' },
      { label: 'Genesis Protocol DOI', value: '10.5281/zenodo.18729652' },
      { label: 'Valuation Basis', value: 'Independent comparable analysis' },
    ],
    order: 1,
  },

  {
    id: 'optkas-sponsor-note',
    title: 'OPTKAS Sponsor Consideration Note',
    subtitle: 'Executed Promissory Note — OPTKAS1-MAIN SPV → Unykorn 7777, Inc.',
    classification: 'executed-note',
    classificationLabel: 'Executed Note / Estoppel-Backed Claim',
    amountLabel: '$502,465,753.42',
    amountNote:
      'Estoppel-confirmed amount due as of March 3, 2026. Comprises $500,000,000 principal plus $2,465,753.42 accrued PIK interest (36 days at 5% per annum).',
    summary:
      'A $500,000,000 promissory note issued by OPTKAS1-MAIN SPV (Wyoming Series LLC) to Unykorn 7777, Inc. in deferred consideration for platform architecture, system engineering, multi-ledger integration, compliance automation, and settlement infrastructure already delivered. An estoppel certificate issued March 3, 2026 confirms the note as valid, binding, and enforceable with no offsets, defenses, or counterclaims. Total amount due confirmed at $502,465,753.42.',
    detail:
      'The Sponsor Consideration Note (Document 4 of 5, Schedule B) was executed January 26, 2026. Issuer: OPTKAS1-MAIN SPV, a Wyoming Special Purpose Vehicle. Payee: Unykorn 7777, Inc. Principal: $500,000,000. Maturity: January 26, 2029 (36 months). Interest: 5% per annum, PIK permitted. The note is explicitly not equity, not a profit participation interest, and does not depend on bond issuance or investor proceeds. It is subordinate to senior bondholder obligations, senior to all other unsecured obligations. The Payee may assign, pledge, finance, discount, or encumber the note without Issuer consent. The Estoppel Certificate (Document 5 of 5, March 3, 2026) certifies: original principal $500,000,000; accrued PIK interest $2,465,753.42; total due $502,465,753.42; note is current — no default or Event of Default exists; no prior assignments disclosed; no offsets, defenses, deductions, or counterclaims. CRITICAL DILIGENCE NOTE: The Issuer (OPTKAS1-MAIN SPV) is signed by Jimmy Thomas as Manager, and the Payee (Unykorn 7777, Inc.) is signed by Kevan Burns as CEO. These are affiliated parties. This is a related-party instrument. External diligence, authority review, conflict review, and counterparty validation are required before any outside financing treatment.',
    evidenceTags: [
      { label: 'Document 4 of 5 — executed January 26, 2026', type: 'executed-document' },
      { label: 'Estoppel Certificate — March 3, 2026', type: 'estoppel' },
      { label: 'Legal doc hash anchored on XRPL mainnet', type: 'on-chain' },
      { label: 'Wyoming governing law', type: 'executed-document' },
      { label: 'No prior assignments disclosed in estoppel', type: 'estoppel' },
    ],
    cautionTags: [
      { label: 'Related-party — affiliated entities, separate signers', severity: 'critical-review' },
      { label: 'No external audit or independent valuation cited', severity: 'elevated' },
      { label: 'Issuer and Payee are controlled by affiliated parties', severity: 'critical-review' },
      { label: 'Subordinate to senior bondholders', severity: 'moderate' },
      { label: 'PIK interest — no cash payments made to date', severity: 'moderate' },
    ],
    financeability: 'subject-to-diligence',
    financeabilityNote:
      'The note is expressly assignable and financeable. However, related-party structure means outside lenders will require: authority review, conflict review, board/manager approval validation, payment-path diligence, and counterparty independence confirmation before underwriting at or near par.',
    keyFields: [
      { label: 'Instrument', value: 'Promissory Note (Schedule B)' },
      { label: 'Issuer', value: 'OPTKAS1-MAIN SPV (Wyoming Series LLC)' },
      { label: 'Payee', value: 'Unykorn 7777, Inc.' },
      { label: 'Principal', value: '$500,000,000' },
      { label: 'Accrued PIK Interest', value: '$2,465,753.42 (36 days at 5%)' },
      { label: 'Total Amount Due', value: '$502,465,753.42 (as of March 3, 2026)' },
      { label: 'Issue Date', value: 'January 26, 2026' },
      { label: 'Maturity', value: 'January 26, 2029' },
      { label: 'Interest Rate', value: '5% per annum (PIK permitted)' },
      { label: 'Estoppel Date', value: 'March 3, 2026' },
      { label: 'Governing Law', value: 'Wyoming' },
      { label: 'Ranking', value: 'Senior to unsecured; subordinate to senior bondholders' },
      { label: 'Assignment Rights', value: 'Freely assignable without Issuer consent' },
    ],
    documentRefs: ['strategic-infrastructure-agreement', 'sponsor-consideration-note', 'sponsor-note-estoppel'],
    xrplRef: 'Legal doc hashes anchored: TX 2DEF7ED7229B18D214BB393A8156CF9DA7F8C7357F48A74EA331792C2EF05699 (Note) / C2DF14432F561E7E436ED863AE83C0304A597912F2A9FC10C6C98C472E04948B (Estoppel)',
    order: 2,
  },

  {
    id: 'tc-advantage-participation',
    title: 'TC Advantage 10% NDCF Participation Right',
    subtitle: 'Structured Participation in Net Distributable Cash Flows — TC Advantage 5% Secured Medium Term Notes',
    classification: 'structured-participation-right',
    classificationLabel: 'Structured Participation Right',
    amountLabel: '10% of Net Distributable Cash Flows',
    amountNote:
      'Contingent. Dependent on actual cash flows generated by the TC Advantage note program. NDCF is gross revenue less senior debt service, reserves, and approved operational expenses. Separate from the $500M Sponsor Note.',
    summary:
      'A contractual 10% participation right in Net Distributable Cash Flows generated by OPTKAS1-MAIN SPV\'s operations under the TC Advantage 5% Secured Medium Term Notes program (CUSIP: 87225HAB4 / ISIN: US87225HAB42). This right is tokenized on XRPL mainnet as 10 units of the NDCF10 token. It is distinct from the $500M Sponsor Consideration Note and does not represent ownership of 10% of the $5B note program principal.',
    detail:
      'Established under the Strategic Infrastructure & Execution Agreement (January 26, 2026) and Exhibit A (Economic Participation Schedule, Option A selected by both parties). The participation right entitles Unykorn 7777, Inc. to 10% of Net Distributable Cash Flows — defined as gross receipts less senior debt service, operating expenses, mandatory reserves, and taxes. Payments are due within 3 business days of each distribution event. NDCF10 token: 10 units on XRPL mainnet, issued March 3, 2026, XRPL transaction B68A33F006996B569F79827E4937ACFF5A912FDC4F69F74881064E625E8F93F4. The TC Advantage bond program references CUSIP 87225HAB4 / ISIN US87225HAB42, face value $5,000,000,000 (50 bonds × $10,000,000 each), 5% coupon, maturity May 31, 2030. The participation is in NDCF, not in principal or coupon — actual distributions depend entirely on the cash flows generated. CRITICAL DISTINCTION: This instrument is separate from and independent of the $500M Sponsor Consideration Note. Both instruments coexist but represent different economic rights. CRITICAL DILIGENCE NOTE: Related-party structure applies — Jimmy Thomas signs as Manager of OPTKAS1-MAIN SPV and Kevan Burns signs as CEO of Unykorn 7777, Inc. Additionally, independent verification that OPTKAS1-MAIN SPV holds or controls position in the TC Advantage note program requires external diligence.',
    evidenceTags: [
      { label: 'XRPL mainnet — 13 transactions confirmed', type: 'on-chain' },
      { label: 'NDCF10 token TX: B68A33F006996B...', type: 'on-chain' },
      { label: 'CUSIP 87225HAB4 / ISIN US87225HAB42 referenced', type: 'self-reported' },
      { label: 'Exhibit A executed January 26, 2026', type: 'executed-document' },
      { label: 'Issuance Report — March 3, 2026', type: 'executed-document' },
    ],
    cautionTags: [
      { label: 'Related-party — affiliated entities, separate signers', severity: 'critical-review' },
      { label: 'Contingent on actual NDCF generation', severity: 'elevated' },
      { label: 'OPTKAS holding of TC Advantage bonds not independently verified', severity: 'elevated' },
      { label: 'Not direct principal ownership — cash flow participation only', severity: 'elevated' },
      { label: 'NDCF10 token self-issued by Unykorn Protocol to Unykorn 7777', severity: 'moderate' },
      { label: 'No independent audit of cash flow basis cited', severity: 'elevated' },
    ],
    financeability: 'contingent',
    financeabilityNote:
      'Contingent participation rights are not collateralizable in the traditional sense. Their value depends entirely on actual distributable cash flows. Outside treatment will require: verification of OPTKAS position in TC Advantage program, independent cash flow modeling, related-party conflict resolution, and legal opinion on enforceability.',
    keyFields: [
      { label: 'Participation Type', value: '10% of Net Distributable Cash Flows' },
      { label: 'Option Elected', value: 'Option A — Net Cash Flow Participation' },
      { label: 'Program', value: 'TC Advantage 5% Secured Medium Term Notes' },
      { label: 'CUSIP (144A)', value: '87225HAB4' },
      { label: 'ISIN (144A)', value: 'US87225HAB42' },
      { label: 'Program Face Value Reference', value: '$5,000,000,000 (50 bonds × $10M)' },
      { label: 'Coupon Rate', value: '5.00% per annum' },
      { label: 'Program Maturity', value: 'May 31, 2030' },
      { label: 'Token Symbol', value: 'NDCF10' },
      { label: 'Units Issued', value: '10 (each = 1% NDCF)' },
      { label: 'Network', value: 'XRP Ledger Mainnet' },
      { label: 'Issuance TX', value: 'B68A33F006996B569F79827E4937ACFF5A912FDC4F69F74881064E625E8F93F4' },
      { label: 'Issuance Date', value: 'March 3, 2026' },
      { label: 'Waterfall Position', value: 'After senior debt service, before residual sponsor distributions' },
      { label: 'Payment Frequency', value: 'Concurrent with each distribution event' },
    ],
    documentRefs: ['strategic-infrastructure-agreement', 'exhibit-a-economic-participation', 'bond-participation-certificate', 'ndcf10-issuance-report'],
    xrplRef: 'NDCF10 issuance TX: B68A33F006996B569F79827E4937ACFF5A912FDC4F69F74881064E625E8F93F4 — verify: https://livenet.xrpl.org/transactions/B68A33F006996B569F79827E4937ACFF5A912FDC4F69F74881064E625E8F93F4',
    order: 3,
  },

  {
    id: 'combined-documented-stack',
    title: 'Combined Documented Ecosystem Value',
    subtitle: 'Built Systems Portfolio + Estoppel-Confirmed Note Amount Due',
    classification: 'combined-documented-stack',
    classificationLabel: 'Documented Ecosystem Value',
    amountLabel: '$528.3M – $603.3M',
    amountNote:
      'Sum of built systems portfolio estimate ($25.85M–$100.8M) plus estoppel-confirmed note amount due ($502,465,753.42). This combined figure excludes any independently assigned present value to the NDCF10 participation stream. Contingent upside from the participation right sits above this figure and is separately classified.',
    summary:
      'The documented ecosystem value combines the independently assessed built-systems and infrastructure portfolio with the estoppel-backed OPTKAS Sponsor Note amount. These are distinct categories of value and must not be treated as interchangeable. The participation right in Net Distributable Cash Flows represents additional contingent upside not included in this combined figure.',
    detail:
      'This combined figure is the arithmetic sum of two distinct categories. First: the built-systems / infrastructure portfolio range of $25.85M–$100.8M, representing software platforms, protocols, on-chain deployments, and IP assessed at market comparables. Second: the estoppel-confirmed amount due of $502,465,753.42 under the OPTKAS Sponsor Consideration Note. The total of these two layers produces $528.3M (low) to $603.3M (high). The NDCF10 participation right is a third, distinct layer — contingent on actual cash flows — and is not incorporated into this combined figure because assigning it a present value would require independent cash flow modeling, rate of discount, and projected NDCF amounts, none of which have been independently audited. Readers should note that the note ($502.5M) dominates this combined figure, and that note is a related-party instrument — see diligence notes.',
    evidenceTags: [
      { label: 'Arithmetically derived from two distinct categories', type: 'self-reported' },
      { label: 'Note amount: estoppel-confirmed March 3, 2026', type: 'estoppel' },
      { label: 'Portfolio: independent comparable analysis', type: 'third-party' },
    ],
    cautionTags: [
      { label: 'Two categories are not interchangeable — treat separately', severity: 'elevated' },
      { label: 'Note dominates this figure — see related-party risk', severity: 'critical-review' },
      { label: 'Participation right excluded — contingent upside above this line', severity: 'moderate' },
      { label: 'No external audit of combined figure', severity: 'elevated' },
    ],
    financeability: 'subject-to-diligence',
    financeabilityNote:
      'This combined figure is useful for portfolio narrative but should never be presented as fully financeable at par. An outside lender or investor will separately underwrite each layer with different haircuts: built systems on operating metrics, the note on enforceability and conflict review, and the participation right on cash flow modeling.',
    keyFields: [
      { label: 'Layer 1: Built Systems / IP (low)', value: '$25,850,000' },
      { label: 'Layer 1: Built Systems / IP (high)', value: '$100,800,000' },
      { label: 'Layer 2: Estoppel-Confirmed Note Due', value: '$502,465,753.42' },
      { label: 'Combined (low)', value: '$528,315,753.42' },
      { label: 'Combined (high)', value: '$603,265,753.42' },
      { label: 'Layer 3: NDCF Participation (excluded)', value: 'Contingent — not added' },
      { label: 'Diligence Flag', value: 'Related-party instruments dominate' },
    ],
    documentRefs: ['sponsor-consideration-note', 'sponsor-note-estoppel'],
    order: 4,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// UTILITY
// ─────────────────────────────────────────────────────────────────────────────

export function getCapitalPositionById(id: string): CapitalPosition | undefined {
  return capitalPositions.find((p) => p.id === id);
}

export function getCapitalPositionsByClass(cls: CapitalClass): CapitalPosition[] {
  return capitalPositions.filter((p) => p.classification === cls);
}

export const classificationColors: Record<CapitalClass, string> = {
  'built-systems-ip': 'text-blue-400 border-blue-500/30 bg-blue-500/5',
  'executed-note': 'text-amber-400 border-amber-500/30 bg-amber-500/5',
  'structured-participation-right': 'text-purple-400 border-purple-500/30 bg-purple-500/5',
  'combined-documented-stack': 'text-emerald-400 border-emerald-500/30 bg-emerald-500/5',
};

export const financeabilityColors: Record<FinanceabilityRating, string> = {
  'asset-backed-now': 'text-green-400 bg-green-500/10 border-green-500/30',
  'subject-to-diligence': 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30',
  'contingent': 'text-orange-400 bg-orange-500/10 border-orange-500/30',
  'summary-only': 'text-slate-400 bg-slate-500/10 border-slate-500/30',
};

export const riskColors: Record<RiskLevel, string> = {
  'low': 'text-green-400',
  'moderate': 'text-yellow-400',
  'elevated': 'text-orange-400',
  'critical-review': 'text-red-400',
};
