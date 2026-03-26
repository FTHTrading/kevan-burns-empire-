/**
 * Full system registry audit
 * Checks: duplicate slugs, duplicate IDs, broken relatedSystemIds,
 *         missing liveUrls for live systems, malformed URLs, empty fields,
 *         linkedDomains consistency.
 */

import { readFileSync } from 'fs';
import { createRequire } from 'module';

// Parse systems.ts by stripping TS syntax and eval'ing
const src = readFileSync('./src/content/systems.ts', 'utf8')
  .replace(/^import\s.+$/gm, '')           // remove imports
  .replace(/:\s*System\[\]/g, '')           // remove type annotations on arrays
  .replace(/:\s*System/g, '')              // remove : System
  .replace(/^export\s+default\s+/m, 'const _default = ')
  .replace(/^export\s+const\s+/gm, 'const ');

let systems;
try {
  const fn = new Function(`${src}; return systems;`);
  systems = fn();
} catch (e) {
  // Fallback: try to extract from the JSON-like export
  console.error('Parse error:', e.message);
  process.exit(1);
}

if (!systems || !Array.isArray(systems)) {
  console.error('Could not parse systems array');
  process.exit(1);
}

const ERRORS = [];
const WARNINGS = [];
const INFO = [];

const ids = new Map();
const slugs = new Map();

// ── 1. Duplicate IDs and slugs ────────────────────────────────────────────
for (const s of systems) {
  if (ids.has(s.id)) ERRORS.push(`DUPLICATE ID: "${s.id}" appears twice`);
  else ids.set(s.id, s);

  if (slugs.has(s.slug)) ERRORS.push(`DUPLICATE SLUG: "${s.slug}" (ids: ${slugs.get(s.slug)} and ${s.id})`);
  else slugs.set(s.slug, s.id);
}

// ── 2. Required fields ────────────────────────────────────────────────────
const REQUIRED = ['id','slug','name','subtitle','description','category','maturity','emoji'];
for (const s of systems) {
  for (const f of REQUIRED) {
    if (!s[f]) ERRORS.push(`MISSING FIELD "${f}" on system "${s.id}"`);
  }
}

// ── 3. Live systems with no liveUrl AND no reachable links at all ─────────
// Infrastructure/protocol systems (mesh, vault, etc.) legitimately have no
// public web UI but do have docs/repo links. Only warn if truly zero links.
for (const s of systems) {
  if (s.maturity === 'live' && !s.liveUrl && !s.docsUrl) {
    const hasAnyLink = (s.links ?? []).length > 0;
    if (!hasAnyLink) {
      WARNINGS.push(`LIVE system "${s.id}" has zero links and no liveUrl/docsUrl`);
    }
  }
}

// ── 4. Invalid URL format ─────────────────────────────────────────────────
const URL_FIELDS = ['liveUrl','docsUrl'];
for (const s of systems) {
  for (const f of URL_FIELDS) {
    if (s[f]) {
      try { new URL(s[f]); }
      catch { ERRORS.push(`INVALID URL "${s[f]}" on system "${s.id}" field ${f}`); }
    }
  }
  for (const link of (s.links ?? [])) {
    try { new URL(link.url); }
    catch { ERRORS.push(`INVALID LINK URL "${link.url}" on system "${s.id}"`); }
  }
}

// ── 5. Broken relatedSystemIds ────────────────────────────────────────────
for (const s of systems) {
  for (const ref of (s.relatedSystemIds ?? [])) {
    if (!ids.has(ref)) {
      ERRORS.push(`BROKEN relatedSystemId "${ref}" on system "${s.id}"`);
    }
  }
}

// ── 6. Broken dependency systemIds ────────────────────────────────────────
for (const s of systems) {
  for (const dep of (s.dependencies ?? [])) {
    if (!ids.has(dep.systemId)) {
      ERRORS.push(`BROKEN dependency systemId "${dep.systemId}" on system "${s.id}"`);
    }
  }
}

// ── 7. liveUrl not in linkedDomains ───────────────────────────────────────
for (const s of systems) {
  if (s.liveUrl && s.linkedDomains?.length) {
    try {
      const host = new URL(s.liveUrl).hostname;
      const covered = s.linkedDomains.some(d => host.includes(d) || d.includes(host));
      if (!covered) {
        WARNINGS.push(`liveUrl host "${host}" not reflected in linkedDomains on "${s.id}"`);
      }
    } catch {}
  }
}

// ── 8. Maturity sanity (must match MATURITY_LEVELS in src/types/system.ts) ──
const VALID_MATURITIES = [
  'thesis','designed','prototype','internal','testnet',
  'pilot','live','production','audit-mode','archived',
];
for (const s of systems) {
  if (!VALID_MATURITIES.includes(s.maturity)) {
    ERRORS.push(`INVALID maturity "${s.maturity}" on system "${s.id}"`);
  }
}

// ── 9. Category sanity ────────────────────────────────────────────────────
const cats = [...new Set(systems.map(s => s.category))];
INFO.push(`Categories (${cats.length}): ${cats.join(', ')}`);

// ── Report ────────────────────────────────────────────────────────────────
const liveCount = systems.filter(s => s.maturity === 'live').length;
const withUrl = systems.filter(s => s.liveUrl).length;

console.log('\n══════════════════════════════════════════════');
console.log('  FULL SYSTEM AUDIT REPORT');
console.log('══════════════════════════════════════════════');
console.log(`  Total systems : ${systems.length}`);
console.log(`  Live          : ${liveCount}`);
console.log(`  With liveUrl  : ${withUrl}`);
console.log(`  Unique IDs    : ${ids.size}`);
console.log(`  Unique slugs  : ${slugs.size}`);
console.log('══════════════════════════════════════════════\n');

if (ERRORS.length) {
  console.log(`❌ ERRORS (${ERRORS.length}):`);
  ERRORS.forEach(e => console.log(`   • ${e}`));
  console.log('');
} else {
  console.log('✅ NO ERRORS\n');
}

if (WARNINGS.length) {
  console.log(`⚠️  WARNINGS (${WARNINGS.length}):`);
  WARNINGS.forEach(w => console.log(`   • ${w}`));
  console.log('');
} else {
  console.log('✅ NO WARNINGS\n');
}

console.log(`ℹ️  ${INFO[0]}\n`);

process.exit(ERRORS.length > 0 ? 1 : 0);
