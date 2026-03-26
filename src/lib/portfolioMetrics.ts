// ─────────────────────────────────────────────────────────────────────────────
// portfolioMetrics.ts — canonical portfolio counts for capital-facing surfaces.
//
// ALL portfolio components and data files should import from here.
// Never hardcode system counts, live platform counts, or chain counts in
// components or copy — use these computed exports instead.
//
// Sources:
//   systemCount   → systems.ts array length (canonical registry)
//   liveCount     → systems.ts maturity:'live' | 'production' computed count
//   chainCount    → businessMetrics.chainsIntegrated (manually maintained)
//   worldsSimulated → businessMetrics.worldsSimulated
//   passingAssertions → businessMetrics.passingAssertions
// ─────────────────────────────────────────────────────────────────────────────

import { platformMetrics } from './platformMetrics';
import { businessMetrics } from '@/data/businessMetrics';

export const portfolioMetrics = {
  /** Total systems registered in the canonical registry (systems.ts) */
  systemCount: platformMetrics.total,

  /** Systems at maturity 'live' or 'production' */
  liveCount: platformMetrics.live,

  /** Blockchain integrations — businessMetrics.chainsIntegrated */
  chainCount: businessMetrics.chainsIntegrated,

  /** Genesis Protocol — simulated worlds */
  worldsSimulated: businessMetrics.worldsSimulated,

  /** Passing test assertions across all test suites */
  passingAssertions: businessMetrics.passingAssertions,
} as const;

export type PortfolioMetrics = typeof portfolioMetrics;
