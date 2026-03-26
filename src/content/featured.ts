// ─────────────────────────────────────────────────────────────────────────────
// Featured collections and stack pathways
// ─────────────────────────────────────────────────────────────────────────────

import type { FeaturedCollection, StackPathway } from '@/types/system';

export const featuredCollections: FeaturedCollection[] = [
  {
    id: 'flagship-five',
    name: 'The Flagship Five',
    description: 'The five core systems that define the infrastructure stack — capital, research, asset activation, sovereign grid, and command.',
    systemIds: ['fth-os', 'genesis-protocol', 'helios', 'unykorn', 'imperia'],
    order: 0,
  },
  {
    id: 'capital-stack',
    name: 'Capital Infrastructure Stack',
    description: 'End-to-end capital flow: issuance, tokenization, settlement, vault, and monetary operations.',
    systemIds: ['fth-os', 'usdf', 'asset-factory', 'y3k-markets', 'optkas', 'helios'],
    order: 1,
  },
  {
    id: 'ai-intelligence-layer',
    name: 'AI Intelligence Layer',
    description: 'The full supervisory AI stack: KAIROS runtime, agentic RAG, market surveillance, compliance intelligence.',
    systemIds: ['kairos', 'gmiie', 'dics', 'nil33-athlete', 'fth-boutique'],
    order: 2,
  },
  {
    id: 'compliance-proof-rail',
    name: 'Compliance & Proof Rail',
    description: 'Identity, compliance, settlement broadcasting, and sovereign key management.',
    systemIds: ['nil33-infra', 'dics', 'anchor-broadcast', 'sovereign-vault'],
    order: 3,
  },
  {
    id: 'research-frontier',
    name: 'Research Frontier',
    description: 'Research-grade systems: simulation engines, protocol testing, aerospace guidance.',
    systemIds: ['genesis-protocol', 'super-s', 'drone-gnc'],
    order: 4,
  },
];

export const stackPathways: StackPathway[] = [
  {
    id: 'capital-flow',
    name: 'Capital Flow',
    description: 'How capital moves through the ecosystem: from structuring and issuance through tokenization, settlement, and treasury management.',
    systemIds: ['fth-os', 'optkas', 'asset-factory', 'y3k-markets', 'usdf', 'helios', 'anchor-broadcast'],
    flowType: 'capital',
  },
  {
    id: 'ai-supervision-flow',
    name: 'AI Supervision Flow',
    description: 'How intelligence propagates: from market signals and data through AI processing to supervisory decisions and automated compliance.',
    systemIds: ['gmiie', 'kairos', 'dics', 'nil33-infra', 'fth-boutique'],
    flowType: 'ai-supervision',
  },
  {
    id: 'compliance-proof-flow',
    name: 'Compliance & Proof Flow',
    description: 'How compliance and proof assertions propagate: identity verification, sanctions screening, transaction monitoring, and cross-chain anchor settlement.',
    systemIds: ['nil33-infra', 'dics', 'sovereign-vault', 'anchor-broadcast', 'l1-protocol'],
    flowType: 'compliance-proof',
  },
  {
    id: 'settlement-flow',
    name: 'Settlement Flow',
    description: 'How transactions settle across chains: protocol rules, Merkle anchoring, broadcast confirmation, and finality tracking.',
    systemIds: ['l1-protocol', 'anchor-broadcast', 'sovereign-vault', 'fth-os'],
    flowType: 'settlement',
  },
  {
    id: 'issuance-flow',
    name: 'Issuance Flow',
    description: 'Asset creation pipeline: from structuring through compliance gating to multi-chain tokenization and distribution.',
    systemIds: ['optkas', 'asset-factory', 'nil33-infra', 'y3k-markets', 'usdf'],
    flowType: 'issuance',
  },
];
