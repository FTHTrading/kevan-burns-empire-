// ─────────────────────────────────────────────────────────────────────────────
// Canonical Metrics Tests
//
// Validates that portfolioMetrics derives all counts correctly from systems.ts.
// These tests catch count drift if systems.ts is updated without portfolioMetrics
// updating automatically (which it does — but this confirms the chain).
//
// Run: npm test
// ─────────────────────────────────────────────────────────────────────────────

import { describe, it, expect } from 'vitest';
import { systems } from '@/content/systems';
import { platformMetrics } from '@/lib/platformMetrics';
import { portfolioMetrics } from '@/lib/portfolioMetrics';
import { businessMetrics } from '@/data/businessMetrics';

describe('platformMetrics', () => {
  it('total equals systems.ts array length', () => {
    expect(platformMetrics.total).toBe(systems.length);
  });

  it('live count is a positive number', () => {
    expect(platformMetrics.live).toBeGreaterThan(0);
  });

  it('live count does not exceed total', () => {
    expect(platformMetrics.live).toBeLessThanOrEqual(platformMetrics.total);
  });

  it('byMaturity entries sum to total', () => {
    const sum = Object.values(platformMetrics.byMaturity).reduce<number>(
      (acc, v) => acc + (v ?? 0),
      0
    );
    expect(sum).toBe(platformMetrics.total);
  });

  it('byCategory values are all positive', () => {
    for (const [cat, count] of Object.entries(platformMetrics.byCategory)) {
      expect(count, `Category "${cat}" has non-positive count`).toBeGreaterThan(0);
    }
  });

  it('heroMetrics array is non-empty', () => {
    expect(platformMetrics.heroMetrics.length).toBeGreaterThan(0);
  });
});

describe('portfolioMetrics', () => {
  it('systemCount equals systems.ts array length', () => {
    expect(portfolioMetrics.systemCount).toBe(systems.length);
  });

  it('systemCount equals platformMetrics.total', () => {
    expect(portfolioMetrics.systemCount).toBe(platformMetrics.total);
  });

  it('liveCount equals platformMetrics.live', () => {
    expect(portfolioMetrics.liveCount).toBe(platformMetrics.live);
  });

  it('liveCount is a positive number', () => {
    expect(portfolioMetrics.liveCount).toBeGreaterThan(0);
  });

  it('liveCount does not exceed systemCount', () => {
    expect(portfolioMetrics.liveCount).toBeLessThanOrEqual(portfolioMetrics.systemCount);
  });

  it('chainCount equals businessMetrics.chainsIntegrated', () => {
    expect(portfolioMetrics.chainCount).toBe(businessMetrics.chainsIntegrated);
  });

  it('chainCount is a positive number', () => {
    expect(portfolioMetrics.chainCount).toBeGreaterThan(0);
  });

  it('worldsSimulated equals businessMetrics.worldsSimulated', () => {
    expect(portfolioMetrics.worldsSimulated).toBe(businessMetrics.worldsSimulated);
  });

  it('passingAssertions equals businessMetrics.passingAssertions', () => {
    expect(portfolioMetrics.passingAssertions).toBe(businessMetrics.passingAssertions);
  });

  it('all values are finite positive numbers', () => {
    for (const [key, value] of Object.entries(portfolioMetrics)) {
      expect(Number.isFinite(value), `portfolioMetrics.${key} is not finite`).toBe(true);
      expect(value, `portfolioMetrics.${key} is not positive`).toBeGreaterThan(0);
    }
  });
});
