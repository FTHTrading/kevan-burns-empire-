// ─────────────────────────────────────────────────────────────────────────────
// Business metrics — executive/research facts that cannot be derived from
// platform records. These are intentionally separated from computed metrics so
// drift is immediately visible. Update manually with a comment citing the
// source of truth when values change.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Static business metrics, last verified 2026-03-21.
 *
 * chainsIntegrated — XRPL, TRON, Avalanche, Polygon, Stellar + 10 additional.
 *   Source: SUPER-S atlas (13 blockchains documented), +TRON +Avalanche confirmed live.
 *
 * worldsSimulated — Genesis Protocol DOI publication (Zenodo 18729652).
 *   6,820 simulated worlds, 3.41M computed epochs.
 *
 * yearsTrading — FTH Trading founding context (est. 1976).
 *
 * passingAssertions — FTH Capital OS: 165 assertions + FTH Capital Rails: 307 tests.
 *   Three independent security audits, Security Level A.
 */
export const businessMetrics = {
  chainsIntegrated: 15,
  worldsSimulated: 6820,
  yearsTrading: 50,
  passingAssertions: 472,
} as const;

export type BusinessMetrics = typeof businessMetrics;
