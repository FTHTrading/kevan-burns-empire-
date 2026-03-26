#!/usr/bin/env node
// scripts/audit-platforms.mjs
// ─────────────────────────────────────────────────────────────────────────────
// Usage:
//   npm run audit:platforms           → print full report
//   npm run validate:platforms        → exit 1 if any error found (CI/prebuild)
//
// Validates:
//   - no duplicate ids
//   - all required fields present
//   - status values within allowed enum
//   - category values within allowed enum
//   - features is a non-empty array
//   - links is a non-empty array with label+url
// ─────────────────────────────────────────────────────────────────────────────

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const isValidate = process.argv.includes('--validate');

const DATA_PATH = join(__dirname, '../src/data/platforms.json');

const ALLOWED_STATUSES = new Set([
  'live', 'testnet', 'dev', 'staging', 'internal', 'audit',
]);

const ALLOWED_CATEGORIES = new Set([
  'infrastructure', 'research', 'finance', 'publishing', 'education',
  'ai', 'capital', 'intelligence', 'compliance', 'governance',
  'energy', 'cultural', 'revenue',
]);

const REQUIRED_FIELDS = [
  'id', 'name', 'subtitle', 'tagline', 'color', 'colorName',
  'emoji', 'status', 'description', 'features', 'links', 'category',
];

// ── Load ──────────────────────────────────────────────────────────────────────

let raw;
try {
  raw = JSON.parse(readFileSync(DATA_PATH, 'utf-8'));
} catch (e) {
  console.error('❌ Failed to parse platforms.json:', e.message);
  process.exit(1);
}

const platforms = raw.platforms;
if (!Array.isArray(platforms)) {
  console.log('ℹ️  platforms.json: "platforms" array removed — canonical source is src/content/systems.ts');
  console.log('    Run `npm run check` for full system validation.');
  process.exit(0);
}

// ── Collect errors ────────────────────────────────────────────────────────────

const errors = [];
const seenIds = new Map();

for (const [i, p] of platforms.entries()) {
  const loc = `platforms[${i}] id="${p.id ?? '?'}"`;

  // Duplicate id check
  if (p.id) {
    if (seenIds.has(p.id)) {
      errors.push(`${loc}: duplicate id (first seen at index ${seenIds.get(p.id)})`);
    } else {
      seenIds.set(p.id, i);
    }
  }

  // Required fields
  for (const field of REQUIRED_FIELDS) {
    if (p[field] === undefined || p[field] === null || p[field] === '') {
      errors.push(`${loc}: missing required field "${field}"`);
    }
  }

  // Status enum
  if (p.status && !ALLOWED_STATUSES.has(p.status)) {
    errors.push(`${loc}: invalid status "${p.status}" (allowed: ${[...ALLOWED_STATUSES].join(', ')})`);
  }

  // Category enum
  if (p.category && !ALLOWED_CATEGORIES.has(p.category)) {
    errors.push(`${loc}: invalid category "${p.category}" (allowed: ${[...ALLOWED_CATEGORIES].join(', ')})`);
  }

  // features must be non-empty array
  if (!Array.isArray(p.features) || p.features.length === 0) {
    errors.push(`${loc}: "features" must be a non-empty array`);
  }

  // links must be non-empty array with label+url
  if (!Array.isArray(p.links) || p.links.length === 0) {
    errors.push(`${loc}: "links" must be a non-empty array`);
  } else {
    for (const [li, link] of p.links.entries()) {
      if (!link.label) errors.push(`${loc} links[${li}]: missing "label"`);
      if (!link.url)   errors.push(`${loc} links[${li}]: missing "url"`);
    }
  }
}

// ── Compute breakdown ─────────────────────────────────────────────────────────

const byStatus = {};
const byCategory = {};
for (const p of platforms) {
  byStatus[p.status]     = (byStatus[p.status]     ?? 0) + 1;
  byCategory[p.category] = (byCategory[p.category] ?? 0) + 1;
}

// ── Report ────────────────────────────────────────────────────────────────────

const LINE = '─'.repeat(56);
console.log(`\n${LINE}`);
console.log('  BURNS INFRASTRUCTURE — Platform Audit');
console.log(LINE);

console.log(`\nTotal platforms : ${platforms.length}`);

console.log('\nBy status');
for (const [status, count] of Object.entries(byStatus).sort()) {
  const bar = '█'.repeat(Math.min(count * 2, 40));
  console.log(`  ${status.padEnd(10)} ${String(count).padStart(2)}  ${bar}`);
}

console.log('\nBy category');
for (const [cat, count] of Object.entries(byCategory).sort()) {
  const bar = '█'.repeat(Math.min(count * 2, 40));
  console.log(`  ${cat.padEnd(14)} ${String(count).padStart(2)}  ${bar}`);
}

console.log(`\nDuplicate IDs   : ${seenIds.size === platforms.length ? 'none ✓' : '⚠ see errors below'}`);
console.log(`Validation errors: ${errors.length}`);

if (errors.length > 0) {
  console.log('\nErrors:');
  for (const e of errors) console.log(`  ✗ ${e}`);
}

console.log(`\n${LINE}\n`);

if (isValidate && errors.length > 0) {
  process.exit(1);
}
