// ─────────────────────────────────────────────────────────────────────────────
// capitalPositions.ts — Documented Capital Stack
//
// This file contains typed entries for the four capital stack positions
// surfaced on portfolio.unykorn.org and the /diligence room.
//
// IMPORTANT DISTINCTIONS:
// - Built Systems / IP ≠ Receivable ≠ Participation Right ≠ Combined Ecosystem Value
// - The Sponsor Note and the TC Advantage Participation are DISTINCT economic rights.
// - "10% participation" is 10% of Net Distributable Cash Flows, NOT 10% of principal.
// - Nothing here is presented as third-party-cleared or fully financeable at par.
// - Outside financing treatment requires: authority review, enforceability review,
//   counterparty validation, and underwriting assessment.
// ─────────────────────────────────────────────────────────────────────────────

export type CapitalClassification =
  | 'built-systems-ip'
  | 'executed-note'
  | 'structured-participation-right'
  | 'documented-ecosystem-value';

export type FinanceabilityLevel =
  | 'asset-backed-now'
  | 'revenue-financeable-soon'
  | 'strategic-infrastructure-ip'
  | 'internal-command-layer'
  | 'contingent-experimental';

export type DiligenceRisk =
  | 'low'
  | 'moderate'
  | 'elevated'
  | 'critical-review-item';

export interface EvidenceTag {
  label: string;
  type: 'document' | 'on-chain' | 'attestation' | 'estoppel' | 'certificate' | 'platform';
}

export interface CautionTag {
  label: string;
  severity: DiligenceRisk;
}

export interface CapitalPosition {
  id: string;
  title: string;
  subtitle: string;
  classification: CapitalClassification;
  classificationLabel: string;

  // Value display
  amountDisplay: string;        // e.g. "$500,000,000"
  amountLow?: number;           // numeric for sorting
  amountHigh?: number;
  amountNote?: string;          // explanatory qualifier

  // Summary
  summary: string;

  // Detail
  detail: string;

  // Evidence
  evidenceTags: EvidenceTag[];
  cautionTags: CautionTag[];

  // Links
  proofLinks?: { label: string; url: string; type: 'live' | 'docs' | 'legal' | 'on-chain' }[];

  // Diligence caveats
  diligenceCaveats: string[];

  // Accent color
  color: string;
  colorName: string;

  order: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// Capital Stack — Four Layers
// ─────────────────────────────────────────────────────────────────────────────

export const capitalPositions: CapitalPosition[] = [
  {
    id: 'built-systems-portfolio',
    title: 'Built Systems / Infrastructure Portfolio',
    subtitle: 'Portfolio Infrastructure Value',
    classification: 'built-systems-ip',
    classificationLabel: 'Built Systems / IP',
    amountDisplay: '$25.85M – $100.8M',
    amountLow: 25_850_000,
    amountHigh: 100_800_000,
    amountNote: 'Independent third-party valuation range — based on maturity tiers, comparable transactions, and disclosed operational data.',
    summary:
      'Fifty-eight built platforms, protocols, operating systems, and infrastructure components spanning capital markets, AI, compliance, tokenization, and sovereign sovereign infrastructure. Valued on the basis of maturity, verifiable on-chain data, comparable transaction benchmarks, and disclosed operational metrics.',
    detail:
      'The portfolio spans four value tiers. Tier 1 (fundable now) includes OPTKAS ($3M–$12M equity / $10M–$25M credit), Atlanta Cricket RWA ($35M structured raise), Helios + AURG (gold custody as clean collateral), Genesis Protocol (published DOI, citable research IP), GMIIE ($1M–$5M seed), UnyKorn ($5M–$20M SAFE), and NIL33 ($2M–$8M seed). Tier 2 includes FTH Trading Platform, RAMM Protocol, Solana Token Launcher, NEED AI, Y3K Markets, DR Intelligence, x402, X407, FTH Boutique, and Vaughan Capital. Tiers 3 and 4 are enabling infrastructure and supporting IP. The consolidated range of $25.85M–$100.8M is a bottom-up assembly of defensible per-system ranges — not a single discounted cash flow model.',
    evidenceTags: [
      { label: '58 cataloged systems', type: 'platform' },
      { label: 'GitHub repositories public', type: 'on-chain' },
      { label: 'OPTKAS: $25.75M insured escrow', type: 'attestation' },
      { label: 'OPTKAS: 78 mainnet operations recorded', type: 'on-chain' },
      { label: 'Genesis Protocol: Zenodo DOI published', type: 'document' },
      { label: 'RAMM: 14 contracts verified on PolygonScan', type: 'on-chain' },
      { label: 'NIL33: live platform at nil33.com', type: 'platform' },
    ],
    cautionTags: [
      { label: 'No disclosed ARR — absence materially limits top-end range', severity: 'elevated' },
      { label: 'No registered patents — trade secret + on-chain provenance only', severity: 'moderate' },
      { label: 'Some systems pre-revenue — valuation depends on narrative and comparable', severity: 'moderate' },
    ],
    proofLinks: [
      { label: 'Portfolio Atlas', url: 'https://portfolio.unykorn.org/systems', type: 'live' },
      { label: 'OPTKAS Corporate', url: 'https://optkas.org', type: 'live' },
      { label: 'Genesis Protocol DOI', url: 'https://zenodo.org/records/18729652', type: 'docs' },
      { label: 'GitHub', url: 'https://github.com/FTHTrading', type: 'live' },
    ],
    diligenceCaveats: [
      'Platform values are analyst-derived ranges — not audited financial statements.',
      'Disclosing ARR on any single system above $15K/mo dramatically changes the top-end range.',
      'The OPTKAS insured escrow ($25.75M) is the single most provable quantitative anchor in this tier.',
      'Third-party audit of OPTKAS operations would materially increase institutional confidence.',
    ],
    color: '#3B82F6',
    colorName: 'blue',
    order: 1,
  },

  {
    id: 'optkas-sponsor-note',
    title: 'OPTKAS Sponsor Consideration Note',
    subtitle: 'Documented Receivable — Estoppel-Backed',
    classification: 'executed-note',
    classificationLabel: 'Executed Note / Estoppel-Backed Claim',
    amountDisplay: '$500,000,000',
    amountLow: 500_000_000,
    amountHigh: 502_465_753.42,
    amountNote: 'Principal: $500,000,000. Estoppel-confirmed amount due: $502,465,753.42 as of March 3, 2026.',
    summary:
      'Executed Sponsor Consideration Note with principal of $500,000,000, representing deferred consideration for platform and infrastructure services delivered. The estoppel confirms the note as valid, binding, and enforceable, with no offsets, defenses, or counterclaims, and states the amount due of $502,465,753.42 as of March 3, 2026. This instrument is separate and independent from the TC Advantage participation right.',
    detail:
      'The Sponsor Consideration Note is structured as deferred compensation for infrastructure and platform services already delivered. As an executed note with estoppel confirmation, it carries stronger procedural position than an unacknowledged receivable. The estoppel statement asserting no offsets, defenses, or counterclaims is legally significant. However, outside financing treatment — including pledging, factoring, or collateralizing this note — requires authority review, counterparty validation, and independent enforceability analysis, particularly given the related-party execution context.',
    evidenceTags: [
      { label: 'Executed Sponsor Consideration Note', type: 'document' },
      { label: 'Sponsor Note Estoppel signed', type: 'estoppel' },
      { label: '$502,465,753.42 confirmed as of March 3, 2026', type: 'estoppel' },
      { label: 'No offsets, defenses, or counterclaims stated', type: 'estoppel' },
      { label: 'Strategic Infrastructure Agreement on record', type: 'document' },
    ],
    cautionTags: [
      { label: 'Related-party execution — affiliated entities with separate signers', severity: 'critical-review-item' },
      { label: 'No external counterparty validation confirmed', severity: 'elevated' },
      { label: 'Enforceability subject to outside legal review', severity: 'elevated' },
      { label: 'Payment path and liquidity profile not disclosed', severity: 'moderate' },
    ],
    proofLinks: [
      { label: 'OPTKAS Corporate Portal', url: 'https://optkas.org', type: 'live' },
      { label: 'OPTKAS TC Platform', url: 'https://optkas-tc.netlify.app', type: 'live' },
      { label: 'Operations Manual', url: 'https://github.com/FTHTrading/optkas-manual', type: 'docs' },
    ],
    diligenceCaveats: [
      'Executed as related-party paper — affiliated entities require conflict and authority review before outside treatment.',
      'Estoppel is a procedurally useful instrument, but does not substitute for independent counterparty validation.',
      'Financing against this note at par is not supportable without: authority opinion, enforceability opinion, payment-path diligence.',
      'Present as: executed related-party structured claim, estoppel-backed, subject to diligence.',
    ],
    color: '#F59E0B',
    colorName: 'amber',
    order: 2,
  },

  {
    id: 'tc-advantage-participation',
    title: 'TC Advantage Participation Right',
    subtitle: 'Structured Cash Flow Participation',
    classification: 'structured-participation-right',
    classificationLabel: 'Contingent Cash Flow Participation',
    amountDisplay: '10% of Net Distributable Cash Flows',
    amountLow: 0,
    amountHigh: undefined,
    amountNote: 'Tied to the TC Advantage 5% Secured Medium Term Notes program. Face program reference: $5,000,000,000. This is NOT 10% of principal — it is a participation in Net Distributable Cash Flows.',
    summary:
      'A 10% Net Distributable Cash Flow participation right tied to the TC Advantage 5% Secured Medium Term Notes program. The participation certificates reference a $5,000,000,000 face-value note program. This right is a structured cash flow claim — distinct from direct principal ownership — and its value is contingent on actual distributable cash flows generated by the program.',
    detail:
      'The TC Advantage participation right is governed by the Strategic Infrastructure Agreement and Exhibit A (Economic Participation). The right entitles the holder to 10% of Net Distributable Cash Flows from the TC Advantage structure — not 10% of the $5B principal. This distinction is material: NDCF participation depends on the program generating distributable cash after all senior obligations, fees, reserves, and expenses. The upside is real but contingent. Present value depends on: (1) total NDCF generated, (2) timing of distributions, (3) enforceability of the participation right, and (4) the structure of the governing documents. Do not assign a present-value dollar figure to this position without an independent financial model.',
    evidenceTags: [
      { label: 'Strategic Infrastructure Agreement executed', type: 'document' },
      { label: 'Exhibit A — Economic Participation terms', type: 'document' },
      { label: 'Bond Participation Certificate issued', type: 'certificate' },
      { label: '$5B face-value program referenced in certificates', type: 'document' },
    ],
    cautionTags: [
      { label: 'Contingent — depends on actual NDCF generated', severity: 'elevated' },
      { label: 'Related-party document set — same structural cautions as Note', severity: 'critical-review-item' },
      { label: '10% of NDCF ≠ 10% of $5B principal — do not conflate', severity: 'critical-review-item' },
      { label: 'No independent financial model of expected NDCF', severity: 'elevated' },
    ],
    proofLinks: [
      { label: 'OPTKAS Corporate Portal', url: 'https://optkas.org', type: 'live' },
    ],
    diligenceCaveats: [
      'This is a structured cash flow participation, not a principal ownership claim.',
      'The present value of 10% NDCF depends entirely on program cash flow generation — contingent upside, not booked receivable.',
      'The $5B face-value reference is the program size, not the participation holder\'s claim.',
      'No present-value dollar figure is assigned here. That assignment requires an independent financial model.',
      'Outside financing treatment requires all the same review steps as the Sponsor Note, plus a NDCF projection model.',
    ],
    color: '#8B5CF6',
    colorName: 'violet',
    order: 3,
  },

  {
    id: 'combined-documented-stack',
    title: 'Combined Documented Ecosystem Stack',
    subtitle: 'Documented Ecosystem Value',
    classification: 'documented-ecosystem-value',
    classificationLabel: 'Documented Ecosystem Value',
    amountDisplay: '$528.3M – $603.3M',
    amountLow: 528_300_000,
    amountHigh: 603_300_000,
    amountNote:
      'Built systems portfolio ($25.85M–$100.8M) plus estoppel-confirmed note amount due ($502,465,753.42). Excludes independent present-value assignment to the NDCF participation stream, which is contingent upside sitting above this figure.',
    summary:
      'Combined documented ecosystem value representing the built infrastructure portfolio plus the estoppel-confirmed Sponsor Consideration Note amount due. The TC Advantage participation right represents additional contingent upside not included in this figure. These categories are distinct and should not be treated as interchangeable.',
    detail:
      'This figure combines two distinct categories: (1) the built systems / infrastructure portfolio range of $25.85M–$100.8M, derived from bottom-up system-level analysis; and (2) the estoppel-confirmed Sponsor Consideration Note amount due of $502,465,753.42 as of March 3, 2026. The TC Advantage 10% NDCF participation right is excluded because it is contingent — its present value depends on actual cash flow generation from the program and cannot be responsibly added to the documented stack without an independent financial model. The combined range of $528.3M–$603.3M should be understood as: documented ecosystem value subject to the diligence requirements applicable to each component separately.',
    evidenceTags: [
      { label: 'Built systems: 58 cataloged, analyst-valued', type: 'platform' },
      { label: 'OPTKAS Note: estoppel-backed, $502.47M as of March 3, 2026', type: 'estoppel' },
      { label: 'Categories treated separately — not blended', type: 'document' },
    ],
    cautionTags: [
      { label: 'Distinct categories combined — infrastructure IP ≠ receivable ≠ participation', severity: 'elevated' },
      { label: 'NDCF participation excluded — contingent upside above this figure', severity: 'moderate' },
      { label: 'Overall figure depends on enforceability of Note component', severity: 'critical-review-item' },
    ],
    proofLinks: [
      { label: 'Portfolio Atlas', url: 'https://portfolio.unykorn.org/systems', type: 'live' },
      { label: 'OPTKAS Corporate', url: 'https://optkas.org', type: 'live' },
    ],
    diligenceCaveats: [
      'Do not treat this combined figure as a single homogeneous asset — the components require separate diligence.',
      'The Note component ($502M+) drives the majority of the figure and carries the highest diligence burden.',
      'Financing against the combined figure is not available without resolving the Note\'s authority and enforceability questions first.',
      'The NDCF participation (excluded from this figure) could expand the total meaningfully if program cash flows materialize.',
    ],
    color: '#10B981',
    colorName: 'emerald',
    order: 4,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Financeability Buckets — Portfolio Interpretation Layer
// ─────────────────────────────────────────────────────────────────────────────

export interface FinanceabilityBucket {
  id: FinanceabilityLevel;
  label: string;
  description: string;
  whyItMatters: string;
  systemIds: string[];
  color: string;
  colorName: string;
  icon: string;
}

export const financeabilityBuckets: FinanceabilityBucket[] = [
  {
    id: 'asset-backed-now',
    label: 'Asset-Backed Now',
    description:
      'These systems have tangible, verifiable underlying assets — physical gold in insured custody, verified institutional escrow, structured real estate — that support immediate collateralization or credit facility structuring.',
    whyItMatters:
      'A capital reader evaluating the portfolio should begin here. These are the systems where a financing conversation can start today without waiting for revenue disclosure or audited statements.',
    systemIds: ['helios', 'aurg', 'optkas', 'cricket'],
    color: '#10B981',
    colorName: 'emerald',
    icon: '🏦',
  },
  {
    id: 'revenue-financeable-soon',
    label: 'Revenue-Financeable Soon',
    description:
      'Live platforms with SaaS, licensing, or transaction fee models. Disclosing MRR above $15K–$25K on any one of these systems unlocks revenue-based financing at 12–18x monthly recurring revenue — non-dilutive, immediate.',
    whyItMatters:
      'The single largest unlock across the portfolio. No new building required — only MRR disclosure. Revenue-based lenders operate in 30–45 day deal timelines.',
    systemIds: ['nil33-athlete', 'y3k-markets', 'need-ai', 'gmiie', 'solana-launcher', 'vaughan-capital'],
    color: '#3B82F6',
    colorName: 'blue',
    icon: '📈',
  },
  {
    id: 'strategic-infrastructure-ip',
    label: 'Strategic Infrastructure / IP',
    description:
      'Production-grade infrastructure platforms, published research IP, and protocol layers that drive equity valuation narratives. Best accessed through SAFE, convertible notes, or licensing deals — not debt.',
    whyItMatters:
      'These systems establish the technical moat and research credibility behind the equity story. Funders evaluating the equity raises will verify these as proof of build depth.',
    systemIds: [
      'fth-os', 'unykorn', 'genesis-protocol', 'genesis-world', 'kairos',
      'x402', 'x407', 'global-truth', 'popeye-tars', 'sovereign-mesh', 'sovereign-vault',
      'gmiie', 'dics', 'doc-intelligence', 'nil33-infra', 'asset-factory',
    ],
    color: '#6366F1',
    colorName: 'indigo',
    icon: '⚙️',
  },
  {
    id: 'internal-command-layer',
    label: 'Internal Command Layer',
    description:
      'Operational infrastructure, governance, protocol, and documentation systems. Not independently fundable, but they make everything above them credible — proving the ecosystem is operated, not just imagined.',
    whyItMatters:
      'A capital reader who sees sophisticated internal infrastructure infers organizational maturity. These systems are the evidence of an operating organization, not a whitepaper.',
    systemIds: [
      'imperia', 'freelance-cc', 'fth-docs', 'policy-integrity-engine',
      'l1-protocol', 'anchor-broadcast', 'sovereign-mesh', 'super-s',
    ],
    color: '#64748B',
    colorName: 'slate',
    icon: '🏛️',
  },
  {
    id: 'contingent-experimental',
    label: 'Contingent / Experimental',
    description:
      'Research, experimental, and early-stage systems that represent optionality — not near-term fundable, but represent upside if the underlying thesis proves out.',
    whyItMatters:
      'Portfolio breadth and research velocity signal capability. These systems prove the team continues building beyond the core capital stack.',
    systemIds: [
      'drone-gnc', 'spectral-ledger', 'drunks-app', 'sge',
      'aif', 'sunfarm', 'gravity', 'helios-video-gen', 'unykorn-7777',
    ],
    color: '#8B5CF6',
    colorName: 'violet',
    icon: '🔬',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Legal Document Summaries — Diligence Room
// ─────────────────────────────────────────────────────────────────────────────

export type DocumentConfidence = 'documented' | 'summary-only' | 'pending-reconciliation';

export interface LegalDocumentSummary {
  id: string;
  title: string;
  role: string;
  whatItCreates: string;
  date?: string;
  parties?: string;
  whyItMatters: string;
  cautionNote: string;
  confidence: DocumentConfidence;
  relatedPositionId: string;
}

export const legalDocuments: LegalDocumentSummary[] = [
  {
    id: 'strategic-infrastructure-agreement',
    title: 'Strategic Infrastructure Agreement',
    role: 'Master infrastructure services agreement governing the relationship between platform builder and program operator.',
    whatItCreates:
      'Establishes the legal foundation for both the Sponsor Consideration Note and the TC Advantage participation right. Creates the contractual basis for deferred consideration and cash flow participation.',
    date: '2025–2026',
    parties: 'Builder / Platform Operator ↔ Program Operator (related-party execution noted)',
    whyItMatters:
      'The root instrument. Without this agreement, neither the Note nor the Participation Right has a contractual basis. Reviewing this document is the first step in any diligence process.',
    cautionNote:
      'Related-party execution — affiliated entities. Authority and conflict review required before outside treatment.',
    confidence: 'documented',
    relatedPositionId: 'optkas-sponsor-note',
  },
  {
    id: 'exhibit-a-economic-participation',
    title: 'Exhibit A — Economic Participation Terms',
    role: 'Defines the 10% NDCF participation right attached to the Strategic Infrastructure Agreement.',
    whatItCreates:
      'Creates the specific economic participation terms: 10% of Net Distributable Cash Flows tied to the TC Advantage 5% Secured Medium Term Notes program.',
    whyItMatters:
      'This exhibit is the governing mechanism for the participation right. It defines what "10%" means, what qualifies as distributable cash flows, and the program to which participation attaches.',
    cautionNote:
      'Participation is in NDCF, not principal. Distributable cash flows depend entirely on program performance — no floor, no guarantee.',
    confidence: 'documented',
    relatedPositionId: 'tc-advantage-participation',
  },
  {
    id: 'sponsor-consideration-note',
    title: 'Sponsor Consideration Note',
    role: 'Debt instrument creating a $500,000,000 principal obligation payable to the platform builder.',
    whatItCreates:
      'A $500,000,000 note receivable representing deferred consideration for infrastructure and platform services delivered. This is a separate instrument from the TC Advantage participation economics.',
    date: 'Pre-March 3, 2026',
    parties: 'Issuer (program operator) → Holder (platform builder)',
    whyItMatters:
      'The largest single documented claim in the portfolio. The estoppel confirmation ($502,465,753.42 due as of March 3, 2026) gives it procedural weight beyond an unacknowledged receivable.',
    cautionNote:
      'Related-party paper. Financing at par requires independent authority opinion, enforceability opinion, and payment-path diligence.',
    confidence: 'documented',
    relatedPositionId: 'optkas-sponsor-note',
  },
  {
    id: 'sponsor-note-estoppel',
    title: 'Sponsor Note Estoppel',
    role: 'Estoppel certificate confirming the Sponsor Consideration Note as valid, binding, and enforceable, with no offsets, defenses, or counterclaims.',
    whatItCreates:
      'Estoppel confirmation of: (1) note validity, (2) binding nature, (3) enforceability, (4) no offsets, defenses, or counterclaims, (5) amount due of $502,465,753.42 as of March 3, 2026.',
    date: 'March 3, 2026',
    whyItMatters:
      'Estoppel certificates are procedurally significant — they prevent the issuing party from later claiming the note is invalid, unpaid, or subject to defenses. This is stronger than an unacknowledged receivable.',
    cautionNote:
      'Estoppel is procedurally useful but does not substitute for independent counterparty validation or payment-path diligence. Still requires outside authority and enforceability review.',
    confidence: 'documented',
    relatedPositionId: 'optkas-sponsor-note',
  },
  {
    id: 'bond-participation-certificate',
    title: 'Bond Participation Certificate',
    role: 'Certificate evidencing the 10% NDCF participation right in the TC Advantage 5% Secured Medium Term Notes program.',
    whatItCreates:
      'Physical/digital evidence of the participation right. References the $5,000,000,000 face-value note program. Confirms 10% participation in Net Distributable Cash Flows.',
    whyItMatters:
      'Certificates create a traceable record of the participation right. The $5B reference is the program size — not the holder\'s claim.',
    cautionNote:
      'Certificate value depends entirely on NDCF generation. $5B face-value is the program scale reference, NOT the holder\'s claim size.',
    confidence: 'documented',
    relatedPositionId: 'tc-advantage-participation',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Risk Flags — Diligence Room
// ─────────────────────────────────────────────────────────────────────────────

export interface DiligenceRiskFlag {
  id: string;
  flag: string;
  explanation: string;
  severity: DiligenceRisk;
  applicableTo: string[];
  mitigation?: string;
}

export const diligenceRiskFlags: DiligenceRiskFlag[] = [
  {
    id: 'related-party-execution',
    flag: 'Related-party execution',
    explanation:
      'The Issuer (OPTKAS1-MAIN SPV, managed by Jimmy Thomas) and the Payee (Unykorn 7777, Inc., led by Kevan Burns as CEO) are affiliated parties. This related-party structure will be the first issue raised by any outside lender, investor, or auditor.',
    severity: 'critical-review-item',
    applicableTo: ['optkas-sponsor-note', 'tc-advantage-participation'],
    mitigation:
      'Obtain an independent authority opinion confirming the capacity of each signing party. Document the conflict review process. If possible, obtain co-signature or ratification from an independent party.',
  },
  {
    id: 'no-external-audit',
    flag: 'No external audit cited for claims',
    explanation:
      'Neither the Sponsor Note nor the NDCF participation right has been independently audited by a third party. The estoppel is an internal confirmation, not an external validation.',
    severity: 'elevated',
    applicableTo: ['optkas-sponsor-note', 'tc-advantage-participation'],
    mitigation:
      'Engage an independent accounting firm to confirm note balances and review the participation structure before presenting to outside capital sources.',
  },
  {
    id: 'ndcf-contingency',
    flag: 'Participation right is contingent on NDCF generation',
    explanation:
      'The 10% NDCF participation has no floor and no guaranteed distribution. Value depends entirely on the TC Advantage program generating distributable cash flows after all prior obligations.',
    severity: 'elevated',
    applicableTo: ['tc-advantage-participation'],
    mitigation:
      'Commission an independent financial model projecting expected NDCF from the program under base, stress, and upside scenarios. Assign a probability-weighted present value before any financing conversation.',
  },
  {
    id: 'public-private-figure-mismatch',
    flag: 'Public / private figure reconciliation required',
    explanation:
      'The public portfolio site presents certain OPTKAS figures (e.g., $25.75M insured escrow, 78 mainnet operations) while the private legal package references $500M Note and $5B program. These are different layers and should not be conflated in any investor communication.',
    severity: 'moderate',
    applicableTo: ['optkas-sponsor-note', 'built-systems-portfolio'],
    mitigation:
      'Add a clear reconciliation note to all investor materials distinguishing: platform operating metrics (public), Note principal (private legal layer), and NDCF participation (separate economic right).',
  },
  {
    id: 'financeability-gap',
    flag: 'Documented ≠ Collectible ≠ Financeable',
    explanation:
      'A document can be executed and still not be collectible. A collectible claim can still not be financeable at par. Outside lenders will apply significant haircuts to related-party paper regardless of estoppel.',
    severity: 'elevated',
    applicableTo: ['optkas-sponsor-note', 'tc-advantage-participation', 'combined-documented-stack'],
    mitigation:
      'Do not represent either position as financeable at par without completing the full diligence chain: authority → enforceability → payment path → counterparty validation → underwriting.',
  },
  {
    id: 'no-disclosed-arr',
    flag: 'No disclosed Annual Recurring Revenue across the built systems portfolio',
    explanation:
      'The absence of disclosed ARR is the single largest limiting factor on the built systems portion of the portfolio. Any system with confirmed MRR above $15–25K unlocks additional capital from revenue-based financing sources.',
    severity: 'moderate',
    applicableTo: ['built-systems-portfolio'],
    mitigation:
      'Disclose MRR for NIL33, NEED AI, or OPTKAS platform fees. Even a single system with confirmed MRR changes the capital conversation materially.',
  },
];
