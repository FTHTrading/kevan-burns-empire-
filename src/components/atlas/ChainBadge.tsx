'use client';

import { CHAIN_LABELS, type Chain } from '@/types/system';

const CHAIN_COLORS: Record<Chain, string> = {
  xrpl: '#00AAE4',
  stellar: '#7C68EE',
  polygon: '#8247E5',
  ethereum: '#627EEA',
  solana: '#14F195',
  avalanche: '#E84142',
  arbitrum: '#28A0F0',
  optimism: '#FF0420',
  base: '#0052FF',
  'bnb-chain': '#F3BA2F',
  cosmos: '#2E3148',
  polkadot: '#E6007A',
  near: '#00EC97',
  ipfs: '#65C2CB',
  filecoin: '#0090FF',
};

interface Props {
  chain: Chain;
  size?: 'sm' | 'md';
}

export default function ChainBadge({ chain, size = 'sm' }: Props) {
  const label = CHAIN_LABELS[chain];
  const color = CHAIN_COLORS[chain] || '#888';
  const px = size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-3 py-1 text-xs';

  return (
    <span
      className={`inline-flex items-center rounded font-mono font-medium leading-tight ${px}`}
      style={{
        background: `${color}18`,
        color,
        border: `1px solid ${color}30`,
      }}
    >
      {label}
    </span>
  );
}
