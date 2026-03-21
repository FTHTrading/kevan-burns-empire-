// ─────────────────────────────────────────────────────────────────────────────
// Categories — canonical category definitions with metadata
// ─────────────────────────────────────────────────────────────────────────────

import { SystemCategory, CATEGORY_LABELS, CATEGORY_COLORS } from '@/types/system';

export interface CategoryDefinition {
  id: SystemCategory;
  label: string;
  color: string;
  description: string;
  icon: string;
  order: number;
}

export const categories: CategoryDefinition[] = [
  { id: 'capital-infrastructure', label: CATEGORY_LABELS['capital-infrastructure'], color: CATEGORY_COLORS['capital-infrastructure'], description: 'Core capital systems: vaults, treasury, issuance rails, and institutional capital flow management.', icon: 'building-2', order: 0 },
  { id: 'monetary-systems', label: CATEGORY_LABELS['monetary-systems'], color: CATEGORY_COLORS['monetary-systems'], description: 'Reserve-backed monetary engines, stablecoin infrastructure, and deterministic mint/burn policy systems.', icon: 'banknote', order: 1 },
  { id: 'tokenization-rwa', label: CATEGORY_LABELS['tokenization-rwa'], color: CATEGORY_COLORS['tokenization-rwa'], description: 'Real-world asset tokenization, SPV-backed issuance, digital securities lifecycle management.', icon: 'coins', order: 2 },
  { id: 'ai-supervisory-intelligence', label: CATEGORY_LABELS['ai-supervisory-intelligence'], color: CATEGORY_COLORS['ai-supervisory-intelligence'], description: 'Sovereign AI operating systems, agentic RAG, voice runtime, document intelligence, and supervisory agents.', icon: 'brain', order: 3 },
  { id: 'compliance-identity-governance', label: CATEGORY_LABELS['compliance-identity-governance'], color: CATEGORY_COLORS['compliance-identity-governance'], description: 'Zero-knowledge compliance rails, KYC/AML gating, identity proofs, and governance enforcement.', icon: 'shield-check', order: 4 },
  { id: 'cross-chain-settlement', label: CATEGORY_LABELS['cross-chain-settlement'], color: CATEGORY_COLORS['cross-chain-settlement'], description: 'Multi-chain broadcast, Merkle proof settlement, and cross-chain synchronization protocols.', icon: 'git-branch', order: 5 },
  { id: 'market-intelligence-analytics', label: CATEGORY_LABELS['market-intelligence-analytics'], color: CATEGORY_COLORS['market-intelligence-analytics'], description: 'Market surveillance, institutional flow detection, sentiment analysis, and intelligence generation.', icon: 'activity', order: 6 },
  { id: 'protocol-service-mesh', label: CATEGORY_LABELS['protocol-service-mesh'], color: CATEGORY_COLORS['protocol-service-mesh'], description: 'Canonical protocol layers, service mesh infrastructure, node synchronization, and inter-service contracts.', icon: 'network', order: 7 },
  { id: 'education-media-community', label: CATEGORY_LABELS['education-media-community'], color: CATEGORY_COLORS['education-media-community'], description: 'Education platforms, media publishing, community infrastructure, and brand extensions.', icon: 'graduation-cap', order: 8 },
  { id: 'sports-nil-athlete', label: CATEGORY_LABELS['sports-nil-athlete'], color: CATEGORY_COLORS['sports-nil-athlete'], description: 'Athlete market valuation, NCAA compliance, NIL deal tracking, and sports intelligence engines.', icon: 'trophy', order: 9 },
  { id: 'experimental-research', label: CATEGORY_LABELS['experimental-research'], color: CATEGORY_COLORS['experimental-research'], description: 'Research-grade simulation, prototype environments, and experimental systems under active development.', icon: 'flask-conical', order: 10 },
  { id: 'internal-operations', label: CATEGORY_LABELS['internal-operations'], color: CATEGORY_COLORS['internal-operations'], description: 'Internal tooling, documentation infrastructure, and operational systems not publicly deployed.', icon: 'settings', order: 11 },
  { id: 'energy-sustainability', label: CATEGORY_LABELS['energy-sustainability'], color: CATEGORY_COLORS['energy-sustainability'], description: 'Renewable energy infrastructure, tokenized REC issuance, and IoT-connected energy systems.', icon: 'sun', order: 12 },
  { id: 'publishing-ip', label: CATEGORY_LABELS['publishing-ip'], color: CATEGORY_COLORS['publishing-ip'], description: 'Deterministic literary publishing, on-chain IP management, and sovereign authorship proof systems.', icon: 'book-open', order: 13 },
];

export const getCategoryById = (id: SystemCategory): CategoryDefinition | undefined =>
  categories.find((c) => c.id === id);
