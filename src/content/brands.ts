// ─────────────────────────────────────────────────────────────────────────────
// Brands — canonical brand definitions
// ─────────────────────────────────────────────────────────────────────────────

import { Brand } from '@/types/system';

export interface BrandDefinition {
  id: Brand;
  label: string;
  color: string;
  description: string;
  domain?: string;
  logo?: string;
}

export const brands: BrandDefinition[] = [
  { id: 'fth-trading', label: 'FTH Trading', color: '#3b82f6', description: 'Future Tech Holdings — sovereign capital infrastructure, deterministic execution, institutional-grade systems. Est. 1976.', domain: 'fthtrading.com' },
  { id: 'unykorn', label: 'UnyKorn', color: '#22c55e', description: 'Sovereign grid infrastructure for decentralized coordination, governance, and operational architecture.', domain: 'unykorn.org' },
  { id: 'y3k-markets', label: 'Y3K Markets', color: '#a855f7', description: 'Institutional-grade tokenized real-world asset infrastructure for structuring and managing digital securities.', domain: 'y3kmarkets.com' },
  { id: 'nil33', label: 'NIL33', color: '#6366f1', description: 'Zero-knowledge compliance rail and athlete intelligence platform — privacy-preserving identity and NCAA-compliant valuation.', domain: 'nil33.com' },
  { id: 'helios', label: 'Helios', color: '#eab308', description: 'Gold-backed smart contract activation and sovereign asset backing on XRPL and Stellar rails.', domain: 'helios5.netlify.app' },
  { id: 'xxxiii', label: 'XXXIII', color: '#6366f1', description: 'Deterministic literary publishing infrastructure — cryptographic authorship proof and on-chain IP management.', domain: 'xxxiii.io' },
  { id: 'genesis', label: 'Genesis Protocol', color: '#f59e0b', description: 'Deterministic multi-agent economic simulation engine — 5,680 worlds, zero collapse observed.', domain: 'fthtrading.github.io/Genesis' },
  { id: 'kairos', label: 'KAIROS', color: '#ec4899', description: 'Sovereign AI operating system — local-first, deterministic AI runtime with agentic RAG and voice.', domain: 'fthtrading.github.io/DOCS' },
  { id: 'imperia', label: 'Imperia', color: '#ef4444', description: 'Command-grade operational platform for institutional-level sovereign infrastructure management.', domain: 'imperia-platform.netlify.app' },
  { id: 'burns-independent', label: 'Burns Independent', color: '#78350f', description: 'Independent brand extensions — community, culture, experimental. Isolated from capital infrastructure.', domain: undefined },
];

export const getBrandById = (id: Brand): BrandDefinition | undefined =>
  brands.find((b) => b.id === id);
