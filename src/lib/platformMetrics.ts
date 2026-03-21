// ─────────────────────────────────────────────────────────────────────────────
// platformMetrics.ts — single computation layer.
//
// ALL display components that need system counts, maturity breakdowns,
// or the hero metric strip must import from here.
//
// Data source: src/content/systems.ts (58 canonical systems).
// Computed values are derived at module load (side-effect free).
// ─────────────────────────────────────────────────────────────────────────────

import { systems } from '@/content/systems';
import { businessMetrics } from '@/data/businessMetrics';
import type { MaturityLevel, SystemCategory } from '@/types/system';
import type { HeroMetric } from '@/types/platform';

/**
 * Full system registry — 58 canonical systems from the master registry.
 */
export { systems };

// ── Counts by maturity ───────────────────────────────────────────────────────

const countByMaturity = systems.reduce<Partial<Record<MaturityLevel, number>>>(
  (acc, s) => {
    acc[s.maturity] = (acc[s.maturity] ?? 0) + 1;
    return acc;
  },
  {}
);

const maturityCount = (m: MaturityLevel): number => countByMaturity[m] ?? 0;

// ── Counts by category ───────────────────────────────────────────────────────

const countByCategory = systems.reduce<Partial<Record<SystemCategory, number>>>(
  (acc, s) => {
    acc[s.category] = (acc[s.category] ?? 0) + 1;
    return acc;
  },
  {}
);

// ── Hero metric strip ────────────────────────────────────────────────────────

export const heroMetrics: HeroMetric[] = [
  { label: 'Systems Built',     value: systems.length,                          suffix: ''  },
  { label: 'Production',        value: maturityCount('live') + maturityCount('production'), suffix: ''  },
  { label: 'Chains Integrated', value: businessMetrics.chainsIntegrated,        suffix: '+' },
  { label: 'Worlds Simulated',  value: businessMetrics.worldsSimulated,         suffix: ''  },
  { label: 'Undefined Failures',value: businessMetrics.undefinedFailures,       suffix: ''  },
];

// ── Full metrics object (imported by PlatformsGrid, other consumers) ─────────

export interface SystemMetrics {
  total: number;
  live: number;
  testnet: number;
  prototype: number;
  thesis: number;
  designed: number;
  internal: number;
  pilot: number;
  auditMode: number;
  byMaturity: Partial<Record<MaturityLevel, number>>;
  byCategory: Partial<Record<SystemCategory, number>>;
  heroMetrics: HeroMetric[];
}

export const platformMetrics: SystemMetrics = {
  total:     systems.length,
  live:      maturityCount('live') + maturityCount('production'),
  testnet:   maturityCount('testnet'),
  prototype: maturityCount('prototype'),
  thesis:    maturityCount('thesis'),
  designed:  maturityCount('designed'),
  internal:  maturityCount('internal'),
  pilot:     maturityCount('pilot'),
  auditMode: maturityCount('audit-mode'),
  byMaturity:  countByMaturity,
  byCategory:  countByCategory,
  heroMetrics,
};
