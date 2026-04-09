// ─────────────────────────────────────────────────────────────────────────────
// LEGAL DOCUMENT SUMMARIES — Source: executed instruments, Jan–Mar 2026.
// These summaries are for portfolio surface use only.
// Raw documents are confidential. All figures drawn directly from documents.
// ─────────────────────────────────────────────────────────────────────────────

export type LegalDocType =
  | 'agreement'
  | 'exhibit'
  | 'signature-page'
  | 'promissory-note'
  | 'estoppel'
  | 'participation-certificate'
  | 'issuance-report';

export type ConfidenceLevel =
  | 'documented'
  | 'summary-only'
  | 'pending-reconciliation';

export interface LegalDocument {
  id: string;
  title: string;
  shortTitle: string;
  docNumber: string;     // e.g. "Document 1 of 5"
  type: LegalDocType;
  date: string;
  parties: { role: string; entity: string }[];
  what: string;          // what right/obligation it creates
  why: string;           // why it matters in the capital structure
  keyFacts: string[];
  cautionNote: string;
  confidence: ConfidenceLevel;
  xrplTxHash?: string;
}

export const legalDocuments: LegalDocument[] = [
  {
    id: 'strategic-infrastructure-agreement',
    title: 'Strategic Infrastructure & Execution Agreement',
    shortTitle: 'Infrastructure Agreement',
    docNumber: 'Document 1 of 5',
    type: 'agreement',
    date: 'January 26, 2026',
    parties: [
      { role: 'SPV / Issuer', entity: 'OPTKAS1-MAIN SPV (Wyoming Series LLC)' },
      { role: 'Infrastructure Partner / Payee', entity: 'Unykorn 7777, Inc.' },
    ],
    what:
      'Establishes the partnership between OPTKAS1-MAIN SPV and Unykorn 7777, Inc. Engages Unykorn as RWA Infrastructure & Blockchain Systems Partner for the TC Advantage Traders 5% Secured Medium Term Notes program. Defines scope of contributions (RWA structuring, blockchain infrastructure, documentation framework, chain of custody, smart contract settlement), economic participation by reference to Exhibit A, and smart contract settlement mechanics with USD-denomination supremacy.',
    why:
      'This is the master agreement from which both the Sponsor Note and the NDCF participation right derive. It establishes the legal framework, waterfall ordering (Senior Debt → Unykorn Participation → Operating Reserve → Residual SPV), and confirms that Unykorn\'s participation rights survive funding, repayment, refinancing, and restructuring. Non-circumvention covenant prevents SPV from structuring around the economic participation.',
    keyFacts: [
      'Effective Date: January 26, 2026',
      'Governing Law: Wyoming',
      'Unykorn role: RWA Infrastructure & Blockchain Systems Partner',
      'Contributions marked Complete: RWA Structuring, Blockchain Infrastructure, Documentation Framework, Chain of Custody, Snapshot & Reporting',
      'Contributions Ongoing: Smart Contract Settlement, Funding Coordination',
      'USD denomination governs all payment obligations',
      'Fallback: wire/ACH within 5 business days if digital rails fail',
      'Primary payment address: XRPL rnAF6Ki5sbmPZ4dTNCVzH5iyb9ScdSqyNr',
      'SHA-256 hash to be anchored to XRPL at package completion',
      'Non-circumvention covenant included',
    ],
    cautionNote:
      'Both parties signed by the same individual (Kevan Burns) as Manager of OPTKAS1-MAIN SPV and CEO of Unykorn 7777, Inc. This is a related-party agreement. Independent authority review required for outside financing treatment.',
    confidence: 'documented',
    xrplTxHash: '04A7C44E0EBAA69DF31B910E795BED8AC2BC7B7E1D83835F662218E37F835A5A',
  },

  {
    id: 'exhibit-a-economic-participation',
    title: 'Exhibit A — Economic Participation Schedule',
    shortTitle: 'Exhibit A (Participation)',
    docNumber: 'Document 2 of 5',
    type: 'exhibit',
    date: 'January 26, 2026',
    parties: [
      { role: 'SPV', entity: 'OPTKAS1-MAIN SPV (Wyoming Series LLC)' },
      { role: 'Partner', entity: 'Unykorn 7777, Inc.' },
    ],
    what:
      'Defines the economic participation terms elected by both parties. Option A was selected: 10% of Net Distributable Cash Flows, payable concurrent with each distribution event, with no minimum payment and no cap. Defines NDCF, Distribution Event, payment mechanics, and survival of rights.',
    why:
      'This exhibit is the core economic instrument creating the NDCF10 participation right. It defines exactly what "Net Distributable Cash Flows" means (gross receipts less senior debt service, operating expenses, reserves, and taxes), establishes the waterfall position (after senior debt, before residual sponsor), and ensures the right survives any restructuring or refinancing.',
    keyFacts: [
      'Option A Selected: 10% of Net Distributable Cash Flows',
      'Option B (not selected): 2% success fee + 4% ongoing participation',
      'Waterfall Position: after senior debt service, before residual sponsor distributions',
      'Payment Frequency: within 3 business days of each distribution event',
      'No minimum payment, no cap on participation',
      'NDCF = gross receipts less (senior debt service + operating expenses + reserves + taxes)',
      'Rights survive termination, repayment, refinancing, restructuring',
      'Freely assignable with SPV consent (not unreasonably withheld)',
      'Initialed by Jimmy Thomas (SPV Manager) and Kevan Burns (CEO) on behalf of their respective parties',
    ],
    cautionNote:
      'Option A and Option B boxes are both checked on the document — only Option A is initialed. Initialed by affiliated parties (Jimmy Thomas for OPTKAS1-MAIN SPV, Kevan Burns for Unykorn 7777). Outside interpretation of which option controls and whether dual-checking creates ambiguity requires legal review.',
    confidence: 'documented',
    xrplTxHash: '82732AC2A975E9478387A9FA2D15274F0E3AA687632E24747803CE38D6261AB7',
  },

  {
    id: 'signature-page',
    title: 'Signature Page',
    shortTitle: 'Signature Page',
    docNumber: 'Document 3 of 5',
    type: 'signature-page',
    date: 'January 26, 2026',
    parties: [
      { role: 'Manager', entity: 'Jimmy Thomas (OPTKAS1-MAIN SPV)' },
      { role: 'CEO', entity: 'Kevan Burns (Unykorn 7777, Inc.)' },
    ],
    what:
      'Execution page for the Strategic Infrastructure & Execution Agreement. Signed by Jimmy Thomas as Manager of OPTKAS1-MAIN SPV and Kevan Burns as CEO of Unykorn 7777, Inc.',
    why:
      'Confirms execution of the master agreement. The relationship between the signatories is a related-party consideration in the document set.',
    keyFacts: [
      'Signed January 26, 2026',
      'Jimmy Thomas signs as Manager of OPTKAS1-MAIN SPV (Issuer)',
      'Kevan Burns signs as CEO of Unykorn 7777, Inc. (Payee)',
      'Related-party transaction between affiliated entities',
    ],
    cautionNote:
      'This is the critical related-party document. Jimmy Thomas (SPV Manager) and Kevan Burns (CEO) represent affiliated entities. Any outside financing party will treat this as a related-party transaction requiring independent authority confirmation, conflict review, and possibly independent legal opinion.',
    confidence: 'documented',
    xrplTxHash: 'FA9723AAB5D814D82EE7A787EABB9FA3DB403799A47600C548F172057C3A73AE',
  },

  {
    id: 'sponsor-consideration-note',
    title: 'Sponsor Consideration Note',
    shortTitle: 'Sponsor Note ($500M)',
    docNumber: 'Document 4 of 5 / Schedule B',
    type: 'promissory-note',
    date: 'January 26, 2026',
    parties: [
      { role: 'Issuer', entity: 'OPTKAS1-MAIN SPV (Wyoming Series LLC)' },
      { role: 'Payee / Sponsor', entity: 'Unykorn 7777, Inc.' },
    ],
    what:
      'A $500,000,000 promissory note issued as deferred consideration for platform architecture, system engineering, multi-ledger integration, compliance automation, settlement infrastructure, institutional data room preparation, and legal documentation already delivered by Unykorn 7777, Inc. to OPTKAS1-MAIN SPV. Matures January 26, 2029. Interest: 5% per annum, PIK permitted. Freely assignable and financeable by Payee without Issuer consent.',
    why:
      'This is the primary standalone receivable in the capital structure — independent from and separate to the NDCF participation right. It is explicitly not equity, not a profit participation interest, and does not depend on bond issuance or investor proceeds. It ranks senior to unsecured obligations but is subordinate to senior bondholders. The Payee can assign, pledge, discount, or finance it.',
    keyFacts: [
      'Principal: $500,000,000',
      'Issue Date: January 26, 2026',
      'Maturity: January 26, 2029 (36 months)',
      'Interest: 5% per annum, PIK permitted',
      'NOT equity — no ownership, voting, or governance rights',
      'NOT a profit participation interest',
      'NOT contingent on bond issuance or investor proceeds',
      'Ranking: Senior to all unsecured; subordinate to senior bondholders',
      'No setoff, counterclaim, or deduction rights for Issuer',
      'Freely assignable/pledgeable/financeable without Issuer consent',
      'Issuer shall issue confirmations for Payee\'s financing counterparties',
      'Wyoming governing law',
      'Events of Default include failure to pay, material breach, insolvency',
      'Acceleration available upon Event of Default without notice',
    ],
    cautionNote:
      'Jimmy Thomas signs as Manager of OPTKAS1-MAIN SPV (Issuer); Kevan Burns signs as CEO of Unykorn 7777, Inc. (Payee). The services "already rendered" were rendered by a company controlled by a party affiliated with the SPV manager. This is a related-party transaction. Outside lenders will require: independent authority review, conflict waiver or independent approval, confirmation of services actually delivered, and may haircut significantly below par until validated.',
    confidence: 'documented',
    xrplTxHash: '2DEF7ED7229B18D214BB393A8156CF9DA7F8C7357F48A74EA331792C2EF05699',
  },

  {
    id: 'sponsor-note-estoppel',
    title: 'Sponsor Note Estoppel Certificate and Acknowledgment',
    shortTitle: 'Note Estoppel',
    docNumber: 'Document 5 of 5',
    type: 'estoppel',
    date: 'March 3, 2026',
    parties: [
      { role: 'Issuer / Certifying Party', entity: 'OPTKAS1-MAIN SPV' },
      { role: 'Payee / Acknowledging Party', entity: 'Unykorn 7777, Inc.' },
      { role: 'Intended Relying Party', entity: 'Any Present or Future Financing Counterparty (Lender)' },
    ],
    what:
      'An estoppel certificate issued by OPTKAS1-MAIN SPV certifying to any present or future financing counterparty that the Sponsor Consideration Note is valid, binding, and enforceable as of March 3, 2026. Confirms: current outstanding principal of $500,000,000; accrued PIK interest of $2,465,753.42; total amount due of $502,465,753.42; no offsets, defenses, deductions, or counterclaims; no prior assignments; no disputes; no Event of Default.',
    why:
      'This is the document that enables the Sponsor Note to be presented to financing counterparties. It is addressed to lenders and certifies the note\'s validity. The Issuer is estopped from asserting any defense inconsistent with the certificate. This is the primary source of the $502,465,753.42 figure used throughout the portfolio.',
    keyFacts: [
      'Date: March 3, 2026',
      'Original Principal: $500,000,000',
      'Outstanding Principal: $500,000,000',
      'Accrued PIK Interest: $2,465,753.42 (36 days at 5% per annum)',
      'Total Amount Due: $502,465,753.42',
      'Services underlying the note: confirmed substantially performed',
      'No offsets, defenses, deductions, or counterclaims',
      'No prior assignments or encumbrances',
      'Note is current — no payment default, no Event of Default',
      'Note has not been modified or amended since original execution',
      'Issuer acknowledgment: services were accepted as complete and satisfactory',
      'Assignment permitted — Issuer will recognize Lender as holder upon notice',
    ],
    cautionNote:
      'The estoppel is signed by Jimmy Thomas as Manager of OPTKAS1-MAIN SPV (the Issuer certifying the document) and by Kevan Burns as CEO of Unykorn 7777, Inc. (the Payee acknowledging the balance). An estoppel issued between affiliated parties has limited independent probative value. Outside lenders will require the Issuer to be independently controlled or will require independent legal opinion confirming authority and enforceability before relying on this certificate.',
    confidence: 'documented',
    xrplTxHash: 'C2DF14432F561E7E436ED863AE83C0304A597912F2A9FC10C6C98C472E04948B',
  },

  {
    id: 'bond-participation-certificate',
    title: 'NDCF10 Bond Participation Certificate',
    shortTitle: 'Participation Certificate',
    docNumber: 'Certificate No. NDCF10-2026-0001',
    type: 'participation-certificate',
    date: 'March 3, 2026',
    parties: [
      { role: 'Issuer / SPV', entity: 'OPTKAS1-MAIN SPV (Wyoming Series LLC)' },
      { role: 'Partner / Holder', entity: 'Unykorn 7777, Inc.' },
      { role: 'Protocol Issuer', entity: 'Unykorn Protocol (XRPL rGSDDiGaL47GcACEDfkxT7X8KGy1XFuWCc)' },
    ],
    what:
      'A printed and tokenized certificate confirming a 10% participation right in Net Distributable Cash Flows from the TC Advantage 5% Secured Medium Term Notes (CUSIP: 87225HAB4 / ISIN: US87225HAB42). Represents 10 units of the NDCF10 token on XRP Ledger mainnet. Does not represent ownership of 10% of the $5B principal.',
    why:
      'Provides the on-chain and printed evidence of the participation right established in Exhibit A. The XRPL transaction is independently verifiable. The certificate and its XRPL proof are the documentation artifacts for the participation right.',
    keyFacts: [
      'Bond Program: TC Advantage 5% Secured Medium Term Notes',
      'CUSIP (144A): 87225HAB4',
      'ISIN (144A): US87225HAB42',
      'Face Value of Note Program: $5,000,000,000',
      'Participation: 10% of Net Distributable Cash Flows (not 10% of principal)',
      'Token: 10 units of NDCF10 on XRP Ledger Mainnet',
      'Issuance TX: B68A33F006996B569F79827E4937ACFF5A912FDC4F69F74881064E625E8F93F4',
      'Holder Address: rPsj81Vis8s3NjDggsxzmMLGwNWZgPVQvy',
      'Certificate Date: March 3, 2026 (Printed)',
      'Agreement Date: January 26, 2026',
      'DEX Offer Active: SELL 1 NDCF10 @ 50 XRP (Seq #102617619)',
      'Issued by Kevan Burns as Authorized Signatory & Managing Director',
    ],
    cautionNote:
      'The certificate states "does not constitute a security in any jurisdiction where such an offering would require registration." The NDCF10 token was self-issued by the Unykorn Protocol address to Unykorn 7777 — the holder and the issuer are both controlled by the same individual. Independent verification of the CUSIP/ISIN as a real registered security is available via FINRA or CUSIP Global Services, but this does not independently confirm that OPTKAS1-MAIN SPV holds a position in that note program.',
    confidence: 'documented',
    xrplTxHash: 'B68A33F006996B569F79827E4937ACFF5A912FDC4F69F74881064E625E8F93F4',
  },

  {
    id: 'ndcf10-issuance-report',
    title: 'NDCF10 Bond Participation Issuance Report',
    shortTitle: 'Issuance Report',
    docNumber: 'Issuance Report — March 2026',
    type: 'issuance-report',
    date: 'March 3, 2026',
    parties: [
      { role: 'Reporting Entity', entity: 'Unykorn Protocol / OPTKAS1-MAIN SPV' },
    ],
    what:
      'Documents the 13 XRPL mainnet transactions associated with the NDCF10 token issuance: DefaultRipple flag, legal doc hash anchoring (docs 1–5), master document hash, NDCF10 participation record, custodian wallet funding, trust line creation, token issuance, issuance proof anchor, and final XRP transfer. All transactions independently verifiable on livenet.xrpl.org.',
    why:
      'Provides the audit trail for the NDCF10 token issuance and the XRPL anchoring of all five legal documents. The 13 on-chain transactions are the blockchain proof layer for the document set.',
    keyFacts: [
      '13 XRPL mainnet transactions — all result tesSUCCESS',
      'Legal doc hashes anchored on-chain (docs 1–5 each have separate TX)',
      'Master document hash: B23FFE500671ADB68BF862E4D5D0274A9D1C9FE434F1E1367478TD87ABB542F4',
      'NDCF10 token issuance TX: B68A33F006996B569F79827E4937ACFF5A912FDC4F69F74881064E625E8F93F4',
      'Program: $5,000,000,000 face value, 50 bonds × $10,000,000',
      'Coupon: 5.00% per annum, Maturity: May 31, 2030',
      'NDCF calculation: gross revenue less senior debt service, reserves, operational expenses',
      'Payment address: rnAF6Ki5sbmPZ4dTNCVzH5iyb9ScdSqyNr',
      'Report generated 2026-03-03 06:42:54 UTC',
    ],
    cautionNote:
      'The issuance report is generated and attested by Kevan Burns as Authorized Signatory of both entities. The XRPL transactions are real and independently verifiable, but they confirm the anchoring of document hashes and token issuance — they do not independently validate the underlying economic claims or the legal enforceability of the instruments.',
    confidence: 'documented',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// UTILITY
// ─────────────────────────────────────────────────────────────────────────────

export function getLegalDocById(id: string): LegalDocument | undefined {
  return legalDocuments.find((d) => d.id === id);
}

export const docTypeLabels: Record<LegalDocType, string> = {
  'agreement': 'Agreement',
  'exhibit': 'Exhibit',
  'signature-page': 'Signature Page',
  'promissory-note': 'Promissory Note',
  'estoppel': 'Estoppel Certificate',
  'participation-certificate': 'Participation Certificate',
  'issuance-report': 'Issuance Report',
};

export const confidenceColors: Record<ConfidenceLevel, string> = {
  'documented': 'text-green-400 border-green-500/30 bg-green-500/5',
  'summary-only': 'text-yellow-400 border-yellow-500/30 bg-yellow-500/5',
  'pending-reconciliation': 'text-orange-400 border-orange-500/30 bg-orange-500/5',
};
