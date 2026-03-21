// ─────────────────────────────────────────────────────────────────────────────
// Platform type definitions — single source of truth for all platform records.
// Every field here must be present and valid in src/data/platforms.json.
// The audit script (scripts/audit-platforms.mjs) enforces these constraints
// at the CLI level; TypeScript enforces them at compile time.
// ─────────────────────────────────────────────────────────────────────────────

/** Allowed lifecycle states for a platform. Enforced by audit script. */
export type PlatformStatus =
  | 'live'
  | 'testnet'
  | 'dev'
  | 'staging'
  | 'internal'
  | 'audit';

/** Allowed taxonomy categories for a platform. Enforced by audit script. */
export type PlatformCategory =
  | 'infrastructure'
  | 'research'
  | 'finance'
  | 'publishing'
  | 'education'
  | 'ai'
  | 'capital'
  | 'intelligence'
  | 'compliance'
  | 'governance'
  | 'energy'
  | 'cultural'
  | 'revenue';

export interface PlatformLink {
  label: string;
  url: string;
}

/** Canonical shape of a single platform record in platforms.json. */
export interface Platform {
  id: string;
  name: string;
  subtitle: string;
  tagline: string;
  color: string;
  colorName: string;
  emoji: string;
  status: PlatformStatus;
  description: string;
  features: string[];
  links: PlatformLink[];
  category: PlatformCategory;
}

/** Shape of one metric item in the hero counter strip. */
export interface HeroMetric {
  label: string;
  value: number;
  suffix: string;
}

/** All computed metrics derived from platform records at module load. */
export interface ComputedPlatformMetrics {
  total: number;
  live: number;
  testnet: number;
  dev: number;
  staging: number;
  internal: number;
  byStatus: Partial<Record<PlatformStatus, number>>;
  byCategory: Partial<Record<PlatformCategory, number>>;
  heroMetrics: HeroMetric[];
}
