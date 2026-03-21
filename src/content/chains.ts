// ─────────────────────────────────────────────────────────────────────────────
// Chains — canonical chain definitions with metadata
// ─────────────────────────────────────────────────────────────────────────────

import { Chain } from '@/types/system';

export interface ChainDefinition {
  id: Chain;
  label: string;
  color: string;
  type: 'l1' | 'l2' | 'sidechain' | 'storage' | 'federated';
  description: string;
}

export const chains: ChainDefinition[] = [
  { id: 'xrpl', label: 'XRPL', color: '#23292f', type: 'l1', description: 'XRP Ledger — fast settlement, native DEX, institutional-grade payment rails.' },
  { id: 'stellar', label: 'Stellar', color: '#7c8cf8', type: 'l1', description: 'Stellar Network — asset issuance, cross-border settlement, anchored fiat rails.' },
  { id: 'polygon', label: 'Polygon', color: '#8247e5', type: 'l2', description: 'Polygon PoS — EVM-compatible scalability layer for tokenization and compliance contracts.' },
  { id: 'ethereum', label: 'Ethereum', color: '#627eea', type: 'l1', description: 'Ethereum mainnet — canonical smart contract platform and settlement layer.' },
  { id: 'solana', label: 'Solana', color: '#14f195', type: 'l1', description: 'Solana — high-throughput execution for DeFi and token programs.' },
  { id: 'avalanche', label: 'Avalanche', color: '#e84142', type: 'l1', description: 'Avalanche — subnet architecture for institutional asset chains.' },
  { id: 'arbitrum', label: 'Arbitrum', color: '#28a0f0', type: 'l2', description: 'Arbitrum — optimistic rollup for cost-efficient EVM execution.' },
  { id: 'optimism', label: 'Optimism', color: '#ff0420', type: 'l2', description: 'Optimism — OP Stack rollup for scalable Ethereum transactions.' },
  { id: 'base', label: 'Base', color: '#0052ff', type: 'l2', description: 'Base — Coinbase L2 built on OP Stack for onchain economy.' },
  { id: 'bnb-chain', label: 'BNB Chain', color: '#f0b90b', type: 'l1', description: 'BNB Chain — EVM-compatible chain for DeFi and token infrastructure.' },
  { id: 'cosmos', label: 'Cosmos', color: '#6f7390', type: 'l1', description: 'Cosmos ecosystem — IBC-connected sovereign chains.' },
  { id: 'polkadot', label: 'Polkadot', color: '#e6007a', type: 'l1', description: 'Polkadot — parachain architecture for interoperable blockchains.' },
  { id: 'near', label: 'NEAR', color: '#00ec97', type: 'l1', description: 'NEAR Protocol — sharded, developer-friendly smart contract platform.' },
  { id: 'ipfs', label: 'IPFS', color: '#65c2cb', type: 'storage', description: 'InterPlanetary File System — content-addressed decentralized storage.' },
  { id: 'filecoin', label: 'Filecoin', color: '#0090ff', type: 'storage', description: 'Filecoin — incentivized decentralized storage network.' },
];

export const getChainById = (id: Chain): ChainDefinition | undefined =>
  chains.find((c) => c.id === id);
