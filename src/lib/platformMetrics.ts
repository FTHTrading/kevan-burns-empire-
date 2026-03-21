// ─────────────────────────────────────────────────────────────────────────────
// platformMetrics.ts — single computation layer.
//
// ALL display components that need platform counts, status breakdowns,
// or the hero metric strip must import from here — never from platforms.json
// directly (except for the raw platform records themselves via `platforms`).
//
// Computed values are derived at module load (side-effect free).
// ─────────────────────────────────────────────────────────────────────────────

import platformsData from '@/data/platforms.json';
import { businessMetrics } from '@/data/businessMetrics';
import type {
  Platform,
  PlatformStatus,
  PlatformCategory,
  ComputedPlatformMetrics,
  HeroMetric,
} from '@/types/platform';

/**
 * Typed platform records. Cast is safe because audit-platforms.mjs validates
 * the JSON shape at runtime and tsc validates it at compile time via this cast.
 */
export const platforms = platformsData.platforms as Platform[];

// ── Counts by status ─────────────────────────────────────────────────────────

const countByStatus = platforms.reduce<Partial<Record<PlatformStatus, number>>>(
  (acc, p) => {
    acc[p.status] = (acc[p.status] ?? 0) + 1;
    return acc;
  },
  {}
);

const statusCount = (s: PlatformStatus): number => countByStatus[s] ?? 0;

// ── Counts by category ───────────────────────────────────────────────────────

const countByCategory = platforms.reduce<Partial<Record<PlatformCategory, number>>>(
  (acc, p) => {
    acc[p.category] = (acc[p.category] ?? 0) + 1;
    return acc;
  },
  {}
);

// ── Hero metric strip ────────────────────────────────────────────────────────
// Computed values first; manual business metrics clearly labelled.

export const heroMetrics: HeroMetric[] = [
  { label: 'Systems Built',    value: platforms.length,                        suffix: ''  },
  { label: 'Production',       value: statusCount('live'),                     suffix: ''  },
  { label: 'Chains Integrated',value: businessMetrics.chainsIntegrated,        suffix: '+' },
  { label: 'Worlds Simulated', value: businessMetrics.worldsSimulated,         suffix: ''  },
  { label: 'Undefined Failures',value: businessMetrics.undefinedFailures,      suffix: ''  },
];

// ── Full metrics object (imported by PlatformsGrid, other consumers) ─────────

export const platformMetrics: ComputedPlatformMetrics = {
  total:    platforms.length,
  live:     statusCount('live'),
  testnet:  statusCount('testnet'),
  dev:      statusCount('dev'),
  staging:  statusCount('staging'),
  internal: statusCount('internal'),
  byStatus:   countByStatus,
  byCategory: countByCategory,
  heroMetrics,
};
