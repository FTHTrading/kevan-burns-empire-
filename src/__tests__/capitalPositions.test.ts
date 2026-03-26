// ─────────────────────────────────────────────────────────────────────────────
// Capital Positions Tests
//
// Validates the portfolio/capitalPositions.ts data layer:
//   - Well-formed structure (required fields, non-empty arrays)
//   - No duplicate position IDs
//   - keyFields counts are consistent with portfolioMetrics (canonical)
//   - All financeability ratings are valid enum members
//   - Evidence and caution tags have required fields
//   - Specific figures preserved exactly (estoppel amount, note principal)
//
// Run: npm test
// ─────────────────────────────────────────────────────────────────────────────

import { describe, it, expect } from 'vitest';
import {
  capitalPositions,
  classificationColors,
  financeabilityColors,
  type CapitalClass,
  type FinanceabilityRating,
} from '@/lib/portfolio/capitalPositions';
import { portfolioMetrics } from '@/lib/portfolioMetrics';

const VALID_FINANCEABILITY: FinanceabilityRating[] = [
  'asset-backed-now',
  'subject-to-diligence',
  'contingent',
  'summary-only',
];

const VALID_CLASSES: CapitalClass[] = [
  'built-systems-ip',
  'executed-note',
  'structured-participation-right',
  'combined-documented-stack',
];

describe('capitalPositions array', () => {
  it('is a non-empty array', () => {
    expect(Array.isArray(capitalPositions)).toBe(true);
    expect(capitalPositions.length).toBeGreaterThan(0);
  });

  it('has no duplicate IDs', () => {
    const ids = capitalPositions.map((p) => p.id);
    const unique = new Set(ids);
    expect(unique.size).toBe(capitalPositions.length);
  });

  it('all positions have required fields', () => {
    const required = ['id', 'title', 'subtitle', 'classification', 'amountLabel', 'summary', 'detail', 'financeability'] as const;
    const missing: string[] = [];
    for (const pos of capitalPositions) {
      for (const field of required) {
        const value = pos[field];
        if (!value) missing.push(`capitalPositions["${pos.id}"] missing "${field}"`);
      }
    }
    expect(missing, missing.join('\n')).toHaveLength(0);
  });

  it('all positions have non-empty evidenceTags', () => {
    const bad = capitalPositions.filter(
      (p) => !Array.isArray(p.evidenceTags) || p.evidenceTags.length === 0
    );
    expect(bad.map((p) => p.id), 'Positions with empty evidenceTags').toHaveLength(0);
  });

  it('all positions have non-empty cautionTags', () => {
    const bad = capitalPositions.filter(
      (p) => !Array.isArray(p.cautionTags) || p.cautionTags.length === 0
    );
    expect(bad.map((p) => p.id), 'Positions with empty cautionTags').toHaveLength(0);
  });

  it('all financeability values are valid enum members', () => {
    const valid = new Set(VALID_FINANCEABILITY);
    const bad = capitalPositions.filter((p) => !valid.has(p.financeability));
    expect(
      bad.map((p) => `${p.id}: "${p.financeability}"`),
      'Invalid financeability values'
    ).toHaveLength(0);
  });

  it('all classification values are valid enum members', () => {
    const valid = new Set(VALID_CLASSES);
    const bad = capitalPositions.filter((p) => !valid.has(p.classification));
    expect(
      bad.map((p) => `${p.id}: "${p.classification}"`),
      'Invalid classification values'
    ).toHaveLength(0);
  });

  it('all evidenceTag entries have label and type', () => {
    const bad: string[] = [];
    for (const pos of capitalPositions) {
      pos.evidenceTags.forEach((tag, i) => {
        if (!tag.label) bad.push(`${pos.id} evidenceTags[${i}] missing label`);
        if (!tag.type) bad.push(`${pos.id} evidenceTags[${i}] missing type`);
      });
    }
    expect(bad, bad.join('\n')).toHaveLength(0);
  });

  it('all cautionTag entries have label and severity', () => {
    const bad: string[] = [];
    for (const pos of capitalPositions) {
      pos.cautionTags.forEach((tag, i) => {
        if (!tag.label) bad.push(`${pos.id} cautionTags[${i}] missing label`);
        if (!tag.severity) bad.push(`${pos.id} cautionTags[${i}] missing severity`);
      });
    }
    expect(bad, bad.join('\n')).toHaveLength(0);
  });

  it('all keyFields entries have label and value', () => {
    const bad: string[] = [];
    for (const pos of capitalPositions) {
      (pos.keyFields ?? []).forEach((field, i) => {
        if (!field.label) bad.push(`${pos.id} keyFields[${i}] missing label`);
        if (field.value === undefined || field.value === '') {
          bad.push(`${pos.id} keyFields[${i}] missing value`);
        }
      });
    }
    expect(bad, bad.join('\n')).toHaveLength(0);
  });

  it('positions are sorted by order field', () => {
    const orders = capitalPositions.map((p) => p.order);
    const sorted = [...orders].sort((a, b) => a - b);
    expect(orders).toEqual(sorted);
  });
});

describe('capitalPositions — canonical count consistency', () => {
  it('"built-systems-portfolio" keyFields systemCount matches portfolioMetrics.systemCount', () => {
    const pos = capitalPositions.find((p) => p.id === 'built-systems-portfolio');
    expect(pos, 'built-systems-portfolio not found').toBeDefined();
    const field = pos!.keyFields.find((f) => f.label === 'Systems Cataloged');
    expect(field, 'Systems Cataloged keyField not found').toBeDefined();
    expect(field!.value).toBe(String(portfolioMetrics.systemCount));
  });

  it('"built-systems-portfolio" summary contains the derived system count', () => {
    const pos = capitalPositions.find((p) => p.id === 'built-systems-portfolio');
    expect(pos!.summary).toContain(String(portfolioMetrics.systemCount));
  });
});

describe('capitalPositions — critical figures preserved', () => {
  it('estoppel-confirmed amount is $502,465,753.42', () => {
    // This specific figure must not drift — it is the estoppel-confirmed balance
    // as of March 3, 2026. Any change must be intentional.
    const pos = capitalPositions.find((p) => p.id === 'sponsor-note-estoppel');
    if (pos) {
      expect(pos.amountLabel).toBe('$502,465,753.42');
    }
  });

  it('sponsor note principal is $500,000,000', () => {
    const pos = capitalPositions.find((p) => p.id === 'sponsor-consideration-note');
    if (pos) {
      expect(pos.amountLabel).toContain('500,000,000');
    }
  });
});

describe('color maps', () => {
  it('classificationColors covers all valid classifications', () => {
    const keys = Object.keys(classificationColors);
    for (const cls of VALID_CLASSES) {
      expect(keys, `classificationColors missing "${cls}"`).toContain(cls);
    }
  });

  it('financeabilityColors covers all valid financeability ratings', () => {
    const keys = Object.keys(financeabilityColors);
    for (const rating of VALID_FINANCEABILITY) {
      expect(keys, `financeabilityColors missing "${rating}"`).toContain(rating);
    }
  });
});
