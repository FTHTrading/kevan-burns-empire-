// ─────────────────────────────────────────────────────────────────────────────
// Business metrics — executive/research facts that cannot be derived from
// platform records. These are intentionally separated from computed metrics so
// drift is immediately visible. Update manually with a comment citing the
// source of truth when values change.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Static business metrics, last verified 2026-03-18.
 *
 * chainsIntegrated — number of blockchain networks the stack operates on.
 *   Source: FTH OS (13 chains), USDF/Anchor (XRPL, Stellar, Polygon), etc.
 *
 * worldsSimulated — Genesis Protocol DOI publication (Zenodo 18729652).
 *   5,680 simulated worlds, zero collapse observed.
 *
 * yearsTrading — FTH Trading founding context (est. 1976 → 50+ years).
 *
 * undefinedFailures — verified zero undefined failure states across the stack.
 */
export const businessMetrics = {
  chainsIntegrated: 13,
  worldsSimulated: 5680,
  yearsTrading: 50,
  undefinedFailures: 0,
} as const;

export type BusinessMetrics = typeof businessMetrics;
