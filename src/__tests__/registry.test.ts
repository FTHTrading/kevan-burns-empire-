// ─────────────────────────────────────────────────────────────────────────────
// Registry Integrity Tests
//
// Validates the canonical systems.ts registry. These tests catch:
//   - Duplicate IDs or slugs
//   - Missing required fields
//   - Invalid enum values (maturity, category)
//   - Malformed URLs
//   - Empty features arrays
//
// Run: npm test
// ─────────────────────────────────────────────────────────────────────────────

import { describe, it, expect } from 'vitest';
import { systems } from '@/content/systems';
import { MATURITY_LEVELS, SYSTEM_CATEGORIES } from '@/types/system';

const REQUIRED_FIELDS = [
  'id', 'slug', 'name', 'subtitle', 'tagline', 'description',
  'color', 'colorName', 'emoji', 'category', 'maturity',
] as const;

const maturitySet = new Set<string>(MATURITY_LEVELS);
const categorySet = new Set<string>(SYSTEM_CATEGORIES);

describe('Systems Registry', () => {
  it('exports a non-empty array', () => {
    expect(Array.isArray(systems)).toBe(true);
    expect(systems.length).toBeGreaterThan(0);
  });

  it('has no duplicate IDs', () => {
    const ids = systems.map((s) => s.id);
    const unique = new Set(ids);
    const duplicates = ids.filter((id, i) => ids.indexOf(id) !== i);
    expect(duplicates, `Duplicate IDs: ${duplicates.join(', ')}`).toHaveLength(0);
    expect(unique.size).toBe(systems.length);
  });

  it('has no duplicate slugs', () => {
    const slugs = systems.map((s) => s.slug);
    const unique = new Set(slugs);
    const duplicates = slugs.filter((slug, i) => slugs.indexOf(slug) !== i);
    expect(duplicates, `Duplicate slugs: ${duplicates.join(', ')}`).toHaveLength(0);
    expect(unique.size).toBe(systems.length);
  });

  it('all systems have required fields', () => {
    const missing: string[] = [];
    for (const system of systems) {
      for (const field of REQUIRED_FIELDS) {
        const value = system[field];
        if (value === undefined || value === null || value === '') {
          missing.push(`systems["${system.id}"] missing field "${field}"`);
        }
      }
    }
    expect(missing, missing.join('\n')).toHaveLength(0);
  });

  it('all maturity values are valid enum members', () => {
    const invalid = systems.filter((s) => !maturitySet.has(s.maturity));
    expect(
      invalid.map((s) => `${s.id}: "${s.maturity}"`),
      `Invalid maturity values`
    ).toHaveLength(0);
  });

  it('all category values are valid enum members', () => {
    const invalid = systems.filter((s) => !categorySet.has(s.category));
    expect(
      invalid.map((s) => `${s.id}: "${s.category}"`),
      `Invalid category values`
    ).toHaveLength(0);
  });

  it('all systems have a non-empty features array', () => {
    const bad = systems.filter((s) => !Array.isArray(s.features) || s.features.length === 0);
    expect(
      bad.map((s) => s.id),
      `Systems with empty/missing features`
    ).toHaveLength(0);
  });

  it('all liveUrl values (when present) are https:// URLs', () => {
    const bad = systems.filter(
      (s) => s.liveUrl !== undefined && !s.liveUrl.startsWith('https://')
    );
    expect(
      bad.map((s) => `${s.id}: "${s.liveUrl}"`),
      `Systems with invalid liveUrl`
    ).toHaveLength(0);
  });

  it('IDs contain only lowercase letters, digits, and hyphens', () => {
    const bad = systems.filter((s) => !/^[a-z0-9-]+$/.test(s.id));
    expect(
      bad.map((s) => `"${s.id}"`),
      `Systems with invalid ID format`
    ).toHaveLength(0);
  });

  it('slugs contain only lowercase letters, digits, and hyphens', () => {
    const bad = systems.filter((s) => !/^[a-z0-9-]+$/.test(s.slug));
    expect(
      bad.map((s) => `"${s.slug}"`),
      `Systems with invalid slug format`
    ).toHaveLength(0);
  });
});
