// ─────────────────────────────────────────────────────────────────────────────
// Canonical Infrastructure Atlas — Type System
// Single source of truth for all system, category, chain, and ecosystem types.
// Every field here drives the entire atlas: registry, detail pages, map,
// command center, and all filter/sort/search behavior.
// ─────────────────────────────────────────────────────────────────────────────

// ── Maturity Model ───────────────────────────────────────────────────────────

export const MATURITY_LEVELS = [
  'thesis',
  'designed',
  'prototype',
  'internal',
  'testnet',
  'pilot',
  'live',
  'production',
  'audit-mode',
  'archived',
] as const;

export type MaturityLevel = (typeof MATURITY_LEVELS)[number];

export const MATURITY_ORDER: Record<MaturityLevel, number> = {
  thesis: 0,
  designed: 1,
  prototype: 2,
  internal: 3,
  testnet: 4,
  pilot: 5,
  live: 6,
  production: 7,
  'audit-mode': 8,
  archived: 9,
};

export const MATURITY_COLORS: Record<MaturityLevel, string> = {
  thesis: '#64748b',
  designed: '#818cf8',
  prototype: '#a78bfa',
  internal: '#f59e0b',
  testnet: '#38bdf8',
  pilot: '#22d3ee',
  live: '#22c55e',
  production: '#10b981',
  'audit-mode': '#ef4444',
  archived: '#6b7280',
};

// ── Category Taxonomy ────────────────────────────────────────────────────────

export const SYSTEM_CATEGORIES = [
  'capital-infrastructure',
  'monetary-systems',
  'tokenization-rwa',
  'ai-supervisory-intelligence',
  'compliance-identity-governance',
  'cross-chain-settlement',
  'market-intelligence-analytics',
  'protocol-service-mesh',
  'education-media-community',
  'sports-nil-athlete',
  'experimental-research',
  'internal-operations',
  'energy-sustainability',
  'publishing-ip',
] as const;

export type SystemCategory = (typeof SYSTEM_CATEGORIES)[number];

export const CATEGORY_LABELS: Record<SystemCategory, string> = {
  'capital-infrastructure': 'Capital Infrastructure',
  'monetary-systems': 'Monetary Systems',
  'tokenization-rwa': 'Tokenization / RWA',
  'ai-supervisory-intelligence': 'AI / Supervisory Intelligence',
  'compliance-identity-governance': 'Compliance / Identity / Governance',
  'cross-chain-settlement': 'Cross-Chain / Settlement',
  'market-intelligence-analytics': 'Market Intelligence / Analytics',
  'protocol-service-mesh': 'Protocol / Service Mesh',
  'education-media-community': 'Education / Media / Community',
  'sports-nil-athlete': 'Sports / NIL / Athlete Intelligence',
  'experimental-research': 'Experimental / Research',
  'internal-operations': 'Internal Operations',
  'energy-sustainability': 'Energy / Sustainability',
  'publishing-ip': 'Publishing / IP',
};

export const CATEGORY_COLORS: Record<SystemCategory, string> = {
  'capital-infrastructure': '#3b82f6',
  'monetary-systems': '#10b981',
  'tokenization-rwa': '#a855f7',
  'ai-supervisory-intelligence': '#ec4899',
  'compliance-identity-governance': '#ef4444',
  'cross-chain-settlement': '#7c3aed',
  'market-intelligence-analytics': '#0ea5e9',
  'protocol-service-mesh': '#1d4ed8',
  'education-media-community': '#14b8a6',
  'sports-nil-athlete': '#f97316',
  'experimental-research': '#8b5cf6',
  'internal-operations': '#64748b',
  'energy-sustainability': '#eab308',
  'publishing-ip': '#059669',
};

// ── Chain Registry ───────────────────────────────────────────────────────────

export const CHAINS = [
  'xrpl',
  'stellar',
  'polygon',
  'ethereum',
  'solana',
  'avalanche',
  'arbitrum',
  'optimism',
  'base',
  'bnb-chain',
  'cosmos',
  'polkadot',
  'near',
  'ipfs',
  'filecoin',
] as const;

export type Chain = (typeof CHAINS)[number];

export const CHAIN_LABELS: Record<Chain, string> = {
  xrpl: 'XRPL',
  stellar: 'Stellar',
  polygon: 'Polygon',
  ethereum: 'Ethereum',
  solana: 'Solana',
  avalanche: 'Avalanche',
  arbitrum: 'Arbitrum',
  optimism: 'Optimism',
  base: 'Base',
  'bnb-chain': 'BNB Chain',
  cosmos: 'Cosmos',
  polkadot: 'Polkadot',
  near: 'NEAR',
  ipfs: 'IPFS',
  filecoin: 'Filecoin',
};

// ── Brand Registry ───────────────────────────────────────────────────────────

export const BRANDS = [
  'fth-trading',
  'unykorn',
  'y3k-markets',
  'nil33',
  'helios',
  'xxxiii',
  'genesis',
  'kairos',
  'imperia',
  'burns-independent',
] as const;

export type Brand = (typeof BRANDS)[number];

export const BRAND_LABELS: Record<Brand, string> = {
  'fth-trading': 'FTH Trading',
  unykorn: 'UnyKorn',
  'y3k-markets': 'Y3K Markets',
  nil33: 'NIL33',
  helios: 'Helios',
  xxxiii: 'XXXIII',
  genesis: 'Genesis Protocol',
  kairos: 'KAIROS',
  imperia: 'Imperia',
  'burns-independent': 'Burns Independent',
};

// ── Visibility & Confidentiality ─────────────────────────────────────────────

export type Visibility = 'public' | 'private' | 'internal';
export type ConfidentialityLevel = 'open' | 'restricted' | 'confidential';
export type StrategicPriority = 'flagship' | 'strategic' | 'supporting' | 'experimental' | 'legacy';

// ── Artifact & Evidence Types ────────────────────────────────────────────────

export interface Artifact {
  type: 'repo' | 'paper' | 'contract' | 'dashboard' | 'api-doc' | 'diagram' | 'screenshot' | 'demo' | 'deck' | 'memo' | 'video' | 'audit';
  label: string;
  url: string;
  description?: string;
}

export interface Milestone {
  date: string;
  label: string;
  description?: string;
}

export interface DependencyEdge {
  systemId: string;
  relationship: 'depends-on' | 'feeds-into' | 'integrates-with' | 'extends' | 'child-of';
  description?: string;
}

// ── Functional Architecture ──────────────────────────────────────────────────

export interface FunctionalArchitecture {
  modules?: string[];
  services?: string[];
  apis?: string[];
  stores?: string[];
  chains?: string[];
  contracts?: string[];
  agents?: string[];
  externalIntegrations?: string[];
}

// ── System Links ─────────────────────────────────────────────────────────────

export interface SystemLink {
  label: string;
  url: string;
  type?: 'live' | 'docs' | 'repo' | 'demo' | 'paper' | 'deck' | 'memo';
}

// ── Infrastructure Metrics ───────────────────────────────────────────────────

export interface SystemMetrics {
  apiCount?: number;
  containerCount?: number;
  datastoreCount?: number;
  agentCount?: number;
  contractCount?: number;
  endpointCount?: number;
  testCount?: number;
}

// ── Business Layer ───────────────────────────────────────────────────────────

export interface BusinessLayer {
  targetUsers?: string[];
  revenueRole?: string;
  strategicRole?: string;
  marketCategory?: string;
  assetFunction?: string;
  capitalFunction?: string;
  intelligenceFunction?: string;
  complianceFunction?: string;
  economicRole?: string;
  sovereignRole?: string;
}

// ── Operational Notes ────────────────────────────────────────────────────────

export interface OperationalNotes {
  confidenceNotes?: string;
  knownGaps?: string[];
  nextMilestones?: string[];
  roadmapStatus?: string;
}

// ── THE CANONICAL SYSTEM TYPE ────────────────────────────────────────────────

export interface System {
  // ── Identity
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  tagline: string;
  description: string;

  // ── Visual
  color: string;
  colorName: string;
  emoji: string;
  icon?: string;

  // ── Classification
  category: SystemCategory;
  subcategory?: string;
  brand: Brand;
  parentEcosystem?: string;

  // ── Status
  maturity: MaturityLevel;
  flagship: boolean;
  strategicPriority: StrategicPriority;
  visibility: Visibility;
  confidentiality: ConfidentialityLevel;

  // ── Technical
  techStack?: string[];
  chainTargets?: Chain[];
  features: string[];
  architecture?: FunctionalArchitecture;
  metrics?: SystemMetrics;

  // ── Links
  links: SystemLink[];
  liveUrl?: string;
  docsUrl?: string;
  repoUrls?: string[];
  linkedDomains?: string[];

  // ── Relationships
  dependencies?: DependencyEdge[];
  dependents?: DependencyEdge[];
  relatedSystemIds?: string[];

  // ── Evidence
  artifacts?: Artifact[];
  milestones?: Milestone[];

  // ── Business
  business?: BusinessLayer;

  // ── Tags
  complianceTags?: string[];
  monetizationTags?: string[];
  audienceTags?: string[];

  // ── Operational
  operationalNotes?: OperationalNotes;

  // ── Metadata
  createdDate?: string;
  lastUpdated?: string;
}

// ── Ecosystem Aggregate Metrics ──────────────────────────────────────────────

export interface EcosystemMetrics {
  totalSystems: number;
  productionSystems: number;
  liveSystems: number;
  researchSystems: number;
  chainsIntegrated: number;
  totalApis: number;
  totalContainers: number;
  totalDatabases: number;
  totalAgents: number;
  totalContracts: number;
  totalBrands: number;
  totalCategories: number;
  flagshipCount: number;
  byMaturity: Partial<Record<MaturityLevel, number>>;
  byCategory: Partial<Record<SystemCategory, number>>;
  byChain: Partial<Record<Chain, number>>;
  byBrand: Partial<Record<Brand, number>>;
}

// ── Featured Collections ─────────────────────────────────────────────────────

export interface FeaturedCollection {
  id: string;
  name: string;
  description: string;
  systemIds: string[];
  order: number;
}

// ── Full Stack Pathways ──────────────────────────────────────────────────────

export interface StackPathway {
  id: string;
  name: string;
  description: string;
  systemIds: string[];
  flowType: 'capital' | 'ai-supervision' | 'compliance-proof' | 'settlement' | 'intelligence' | 'issuance';
}

// ── Infrastructure Layer (for map views) ─────────────────────────────────────

export const INFRASTRUCTURE_LAYERS = [
  'research-simulation',
  'supervisory-ai',
  'compliance-identity',
  'issuance-tokenization',
  'treasury-capital-ops',
  'broadcast-settlement',
  'data-intelligence',
  'service-mesh-protocol',
  'governance-policy',
  'media-education-brand',
] as const;

export type InfrastructureLayer = (typeof INFRASTRUCTURE_LAYERS)[number];

export const LAYER_LABELS: Record<InfrastructureLayer, string> = {
  'research-simulation': 'Research & Simulation',
  'supervisory-ai': 'Supervisory AI',
  'compliance-identity': 'Compliance & Identity',
  'issuance-tokenization': 'Issuance & Tokenization',
  'treasury-capital-ops': 'Treasury & Capital Operations',
  'broadcast-settlement': 'Broadcast & Settlement',
  'data-intelligence': 'Data & Intelligence',
  'service-mesh-protocol': 'Service Mesh & Protocol',
  'governance-policy': 'Governance & Policy',
  'media-education-brand': 'Media / Education / Brand',
};
