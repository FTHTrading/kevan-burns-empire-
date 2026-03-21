'use client';

import { MATURITY_COLORS, type MaturityLevel } from '@/types/system';

const MATURITY_LABELS: Record<MaturityLevel, string> = {
  thesis: 'Thesis',
  designed: 'Designed',
  prototype: 'Prototype',
  internal: 'Internal',
  testnet: 'Testnet',
  pilot: 'Pilot',
  live: 'Live',
  production: 'Production',
  'audit-mode': 'Audit Mode',
  archived: 'Archived',
};

interface Props {
  maturity: MaturityLevel;
  size?: 'sm' | 'md';
}

export default function MaturityBadge({ maturity, size = 'sm' }: Props) {
  const label = MATURITY_LABELS[maturity];
  const color = MATURITY_COLORS[maturity];
  const px = size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-3 py-1 text-xs';

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-medium leading-tight ${px}`}
      style={{
        background: `${color}18`,
        color,
        border: `1px solid ${color}30`,
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ background: color }}
      />
      {label}
    </span>
  );
}
