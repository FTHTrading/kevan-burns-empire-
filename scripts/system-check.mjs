#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────────
// scripts/system-check.mjs — Burns Infrastructure Health Check
// ─────────────────────────────────────────────────────────────────────────────
//
// Usage:
//   npm run check                → quick check (data integrity only)
//   npm run check:full           → full check (data + build + lint + npm audit)
//   npm run check:ci             → CI mode   (exit 1 on any error)
//
// Flags:
//   --full                       → include build, lint, npm audit
//   --ci                         → exit 1 on errors
//   --json                       → output JSON report
//   --fix                        → auto-fix safe issues (e.g. stale comment counts)
//
// Report sections:
//   1. Registry Integrity        — IDs, slugs, required fields, enums
//   2. Relationship Validation   — dependencies, relatedSystemIds, featured, pathways
//   3. Ecosystem Metrics         — computed breakdowns, metric consistency
//   4. Data Sync                 — platforms.json vs canonical registry
//   5. Build & Toolchain         — TypeScript, ESLint, npm audit (--full only)
//   6. Upgrade Recommendations   — detected improvements
// ─────────────────────────────────────────────────────────────────────────────

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { execSync } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

// ── Flags ────────────────────────────────────────────────────────────────────

const args = new Set(process.argv.slice(2));
const isFull = args.has('--full');
const isCI   = args.has('--ci');
const isJSON = args.has('--json');
const isFix  = args.has('--fix');

// ── Severity types ───────────────────────────────────────────────────────────

const SEV = { CRITICAL: 'CRITICAL', ERROR: 'ERROR', WARN: 'WARN', INFO: 'INFO' };

const issues = [];
const recommendations = [];

function issue(severity, section, message, detail = '') {
  issues.push({ severity, section, message, detail });
}

function recommend(section, message, detail = '') {
  recommendations.push({ section, message, detail });
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function loadJSON(relPath) {
  const abs = join(ROOT, relPath);
  if (!existsSync(abs)) return null;
  return JSON.parse(readFileSync(abs, 'utf-8'));
}

function loadTS(relPath) {
  const abs = join(ROOT, relPath);
  if (!existsSync(abs)) return null;
  return readFileSync(abs, 'utf-8');
}

function run(cmd) {
  try {
    return execSync(cmd, { cwd: ROOT, stdio: 'pipe', encoding: 'utf-8', timeout: 120_000 });
  } catch (e) {
    return { error: true, stdout: e.stdout ?? '', stderr: e.stderr ?? '', exitCode: e.status };
  }
}

// ── Canonical Enums (parsed from types/system.ts) ────────────────────────────

const typesSource = loadTS('src/types/system.ts');

function extractConstArray(name) {
  const regex = new RegExp(`export const ${name}\\s*=\\s*\\[([\\s\\S]*?)\\]\\s*as const`, 'm');
  const match = typesSource?.match(regex);
  if (!match) return [];
  return [...match[1].matchAll(/'([^']+)'/g)].map(m => m[1]);
}

const VALID_MATURITIES  = new Set(extractConstArray('MATURITY_LEVELS'));
const VALID_CATEGORIES  = new Set(extractConstArray('SYSTEM_CATEGORIES'));
const VALID_CHAINS      = new Set(extractConstArray('CHAINS'));
const VALID_BRANDS      = new Set(extractConstArray('BRANDS'));
const VALID_VISIBILITIES = new Set(['public', 'private', 'internal']);
const VALID_CONFIDENTIALITIES = new Set(['open', 'restricted', 'confidential']);
const VALID_PRIORITIES  = new Set(['flagship', 'strategic', 'supporting', 'experimental', 'legacy']);
const VALID_DEP_RELS    = new Set(['depends-on', 'feeds-into', 'integrates-with', 'extends', 'child-of']);

// ── Load Systems Registry ────────────────────────────────────────────────────

const systemsSource = loadTS('src/content/systems.ts');
if (!systemsSource) {
  issue(SEV.CRITICAL, 'registry', 'Cannot find src/content/systems.ts');
}

// Parse systems from TS source via regex (no transpiler needed)
function extractSystemsClean(src) {
  if (!src) return [];

  // Split the source into individual system blocks
  // Each system starts with '  {' and ends with '  },'
  const systemBlockRegex = /  \{[\s\S]*?(?=\n  \{|\n\];)/g;
  const blocks = src.match(systemBlockRegex) || [];

  const systems = [];

  for (const block of blocks) {
    const get = (field) => {
      const m = block.match(new RegExp(`^\\s{4}${field}:\\s*'([^']*)'`, 'm'));
      return m ? m[1] : '';
    };
    const getBool = (field) => {
      const m = block.match(new RegExp(`^\\s{4}${field}:\\s*(true|false)`, 'm'));
      return m ? m[1] === 'true' : false;
    };
    const getArray = (field) => {
      const m = block.match(new RegExp(`^\\s{4}${field}:\\s*\\[([^\\]]*?)\\]`, 'm'));
      if (!m) return [];
      return [...m[1].matchAll(/'([^']+)'/g)].map(x => x[1]);
    };
    const getMultilineArray = (field) => {
      const m = block.match(new RegExp(`^\\s{4}${field}:\\s*\\[([\\s\\S]*?)\\s{4}\\]`, 'm'));
      if (!m) return [];
      return [...m[1].matchAll(/'([^']+)'/g)].map(x => x[1]);
    };
    const getDepSystemIds = () => {
      const m = block.match(/^\s{4}dependencies:\s*\[([\s\S]*?)\s{4}\]/m);
      if (!m) return [];
      return [...m[1].matchAll(/systemId:\s*'([^']+)'/g)].map(x => x[1]);
    };
    const getDepRels = () => {
      const m = block.match(/^\s{4}dependencies:\s*\[([\s\S]*?)\s{4}\]/m);
      if (!m) return [];
      return [...m[1].matchAll(/relationship:\s*'([^']+)'/g)].map(x => x[1]);
    };

    const id = get('id');
    if (!id) continue; // skip non-system blocks

    systems.push({
      id,
      slug: get('slug'),
      name: get('name'),
      subtitle: get('subtitle'),
      tagline: get('tagline'),
      category: get('category'),
      brand: get('brand'),
      maturity: get('maturity'),
      flagship: getBool('flagship'),
      strategicPriority: get('strategicPriority'),
      visibility: get('visibility'),
      confidentiality: get('confidentiality'),
      liveUrl: get('liveUrl'),
      docsUrl: get('docsUrl'),
      chainTargets: getArray('chainTargets'),
      techStack: getArray('techStack'),
      relatedSystemIds: getArray('relatedSystemIds'),
      depSystemIds: getDepSystemIds(),
      depRelationships: getDepRels(),
      hasFeatures: /^\s{4}features:\s*\[/m.test(block),
      hasLinks: /^\s{4}links:\s*\[/m.test(block),
      hasDescription: /^\s{4}description:/m.test(block),
      hasTechStack: getArray('techStack').length > 0,
    });
  }

  return systems;
}

const systems = extractSystemsClean(systemsSource);
const systemIds = new Set(systems.map(s => s.id));
const systemSlugs = new Set(systems.map(s => s.slug));

// ── Load Featured Collections & Pathways ─────────────────────────────────────

const featuredSource = loadTS('src/content/featured.ts');

function extractCollections(src) {
  if (!src) return [];
  const collections = [];
  const regex = /\{\s*id:\s*'([^']+)'[\s\S]*?systemIds:\s*\[([^\]]*)\]/g;
  let m;
  while ((m = regex.exec(src))) {
    collections.push({
      id: m[1],
      systemIds: [...m[2].matchAll(/'([^']+)'/g)].map(x => x[1]),
    });
  }
  return collections;
}

const allFeatured = extractCollections(featuredSource);

// ── Load Blog Posts ──────────────────────────────────────────────────────────

const blogPosts = loadJSON('src/data/blog-posts.json') ?? [];

// ── Load platforms.json ──────────────────────────────────────────────────────

const platformsJSON = loadJSON('src/data/platforms.json');

// ══════════════════════════════════════════════════════════════════════════════
// SECTION 1: REGISTRY INTEGRITY
// ══════════════════════════════════════════════════════════════════════════════

const section1 = 'Registry Integrity';

// 1a. Duplicate IDs
const seenIds = new Map();
for (const s of systems) {
  if (seenIds.has(s.id)) {
    issue(SEV.CRITICAL, section1, `Duplicate system ID: "${s.id}"`, `First at index ${seenIds.get(s.id)}`);
  } else {
    seenIds.set(s.id, systems.indexOf(s));
  }
}

// 1b. Duplicate slugs
const seenSlugs = new Map();
for (const s of systems) {
  if (seenSlugs.has(s.slug)) {
    issue(SEV.CRITICAL, section1, `Duplicate slug: "${s.slug}"`, `Systems: "${s.id}" and "${systems[seenSlugs.get(s.slug)].id}"`);
  } else {
    seenSlugs.set(s.slug, systems.indexOf(s));
  }
}

// 1c. Required fields
const REQUIRED_FIELDS = ['id', 'slug', 'name', 'category', 'brand', 'maturity', 'strategicPriority', 'visibility', 'confidentiality'];
for (const s of systems) {
  for (const field of REQUIRED_FIELDS) {
    if (!s[field]) {
      issue(SEV.ERROR, section1, `System "${s.id}": missing required field "${field}"`);
    }
  }
  if (!s.hasFeatures) {
    issue(SEV.WARN, section1, `System "${s.id}": missing or empty features array`);
  }
  if (!s.hasLinks) {
    issue(SEV.WARN, section1, `System "${s.id}": missing or empty links array`);
  }
  if (!s.hasDescription) {
    issue(SEV.WARN, section1, `System "${s.id}": missing description`);
  }
}

// 1d. Enum validation
for (const s of systems) {
  if (s.maturity && !VALID_MATURITIES.has(s.maturity)) {
    issue(SEV.ERROR, section1, `System "${s.id}": invalid maturity "${s.maturity}"`, `Allowed: ${[...VALID_MATURITIES].join(', ')}`);
  }
  if (s.category && !VALID_CATEGORIES.has(s.category)) {
    issue(SEV.ERROR, section1, `System "${s.id}": invalid category "${s.category}"`, `Allowed: ${[...VALID_CATEGORIES].join(', ')}`);
  }
  if (s.brand && !VALID_BRANDS.has(s.brand)) {
    issue(SEV.ERROR, section1, `System "${s.id}": invalid brand "${s.brand}"`, `Allowed: ${[...VALID_BRANDS].join(', ')}`);
  }
  if (s.strategicPriority && !VALID_PRIORITIES.has(s.strategicPriority)) {
    issue(SEV.ERROR, section1, `System "${s.id}": invalid strategicPriority "${s.strategicPriority}"`);
  }
  if (s.visibility && !VALID_VISIBILITIES.has(s.visibility)) {
    issue(SEV.ERROR, section1, `System "${s.id}": invalid visibility "${s.visibility}"`);
  }
  if (s.confidentiality && !VALID_CONFIDENTIALITIES.has(s.confidentiality)) {
    issue(SEV.ERROR, section1, `System "${s.id}": invalid confidentiality "${s.confidentiality}"`);
  }
  // Chain targets
  for (const chain of s.chainTargets) {
    if (!VALID_CHAINS.has(chain)) {
      issue(SEV.ERROR, section1, `System "${s.id}": invalid chain "${chain}"`, `Allowed: ${[...VALID_CHAINS].join(', ')}`);
    }
  }
}

// 1e. ID-slug consistency
for (const s of systems) {
  if (s.id && s.slug && s.id === s.slug) {
    // OK — many systems use id === slug
  }
}

// ══════════════════════════════════════════════════════════════════════════════
// SECTION 2: RELATIONSHIP VALIDATION
// ══════════════════════════════════════════════════════════════════════════════

const section2 = 'Relationships';

// 2a. Dependency edges — systemId must exist
for (const s of systems) {
  for (const depId of s.depSystemIds) {
    if (!systemIds.has(depId)) {
      issue(SEV.ERROR, section2, `System "${s.id}": dependency "${depId}" does not exist in registry`);
    }
  }
  for (const rel of s.depRelationships) {
    if (!VALID_DEP_RELS.has(rel)) {
      issue(SEV.WARN, section2, `System "${s.id}": unknown dependency relationship "${rel}"`);
    }
  }
}

// 2b. Related system IDs must exist
for (const s of systems) {
  for (const relId of s.relatedSystemIds) {
    if (!systemIds.has(relId)) {
      issue(SEV.ERROR, section2, `System "${s.id}": relatedSystemId "${relId}" does not exist in registry`);
    }
    if (relId === s.id) {
      issue(SEV.WARN, section2, `System "${s.id}": references itself in relatedSystemIds`);
    }
  }
}

// 2c. Featured collections
for (const coll of allFeatured) {
  for (const sysId of coll.systemIds) {
    if (!systemIds.has(sysId)) {
      issue(SEV.ERROR, section2, `Featured/Pathway "${coll.id}": systemId "${sysId}" not found in registry`);
    }
  }
}

// ══════════════════════════════════════════════════════════════════════════════
// SECTION 3: ECOSYSTEM METRICS
// ══════════════════════════════════════════════════════════════════════════════

const section3 = 'Ecosystem Metrics';

// 3a. Maturity breakdown
const maturityBreakdown = {};
for (const s of systems) {
  maturityBreakdown[s.maturity] = (maturityBreakdown[s.maturity] ?? 0) + 1;
}

// 3b. Category breakdown
const categoryBreakdown = {};
for (const s of systems) {
  categoryBreakdown[s.category] = (categoryBreakdown[s.category] ?? 0) + 1;
}

// 3c. Brand breakdown
const brandBreakdown = {};
for (const s of systems) {
  brandBreakdown[s.brand] = (brandBreakdown[s.brand] ?? 0) + 1;
}

// 3d. Chain coverage
const chainCoverage = {};
for (const s of systems) {
  for (const c of s.chainTargets) {
    chainCoverage[c] = (chainCoverage[c] ?? 0) + 1;
  }
}

// 3e. Flagship count
const flagshipCount = systems.filter(s => s.flagship).length;

// 3f. Audit comment check
const auditCommentMatch = systemsSource?.match(/Last audit:.*?(\d+)\s+systems cataloged/);
if (auditCommentMatch) {
  const declaredCount = parseInt(auditCommentMatch[1], 10);
  if (declaredCount !== systems.length) {
    issue(SEV.WARN, section3, `Audit comment says ${declaredCount} systems but registry has ${systems.length}`, 'Update the comment at top of systems.ts');
    if (isFix) {
      const fixed = systemsSource.replace(
        /(\d+)\s+systems cataloged/,
        `${systems.length} systems cataloged`
      );
      writeFileSync(join(ROOT, 'src/content/systems.ts'), fixed, 'utf-8');
      issue(SEV.INFO, section3, `AUTO-FIXED: Updated audit comment to ${systems.length} systems`);
    }
  }
}

// 3g. businessMetrics.ts consistency
const bmSource = loadTS('src/data/businessMetrics.ts');
const bmChains = bmSource?.match(/chainsIntegrated:\s*(\d+)/);
if (bmChains) {
  const declaredChains = parseInt(bmChains[1], 10);
  const actualChains = Object.keys(chainCoverage).length;
  if (declaredChains !== VALID_CHAINS.size) {
    issue(SEV.INFO, section3, `businessMetrics.chainsIntegrated is ${declaredChains}, type system defines ${VALID_CHAINS.size} chains`, 'May be intentional if not all chains have live systems');
  }
}

// 3h. Systems with live/production maturity should have liveUrl
// Infrastructure-only categories typically have no public web URL
const INFRA_CATEGORIES = new Set([
  'protocol-service-mesh', 'ai-supervisory-intelligence',
  'compliance-identity-governance', 'cross-chain-settlement',
]);
for (const s of systems) {
  if ((s.maturity === 'live' || s.maturity === 'production') && !s.liveUrl) {
    if (INFRA_CATEGORIES.has(s.category)) {
      issue(SEV.INFO, section3, `System "${s.id}" is ${s.maturity} infrastructure — no public liveUrl (acceptable for backend systems)`);
    } else {
      issue(SEV.WARN, section3, `System "${s.id}" is ${s.maturity} but has no liveUrl`);
    }
  }
}

// 3i. Check for systems without techStack
for (const s of systems) {
  if (!s.hasTechStack && s.maturity !== 'thesis' && s.maturity !== 'designed') {
    recommend(section3, `System "${s.id}" (${s.maturity}): consider adding techStack`);
  }
}

// ══════════════════════════════════════════════════════════════════════════════
// SECTION 4: DATA SYNC
// ══════════════════════════════════════════════════════════════════════════════

const section4 = 'Data Sync';

// 4a. platforms.json sync (platforms array removed — canonical source is systems.ts)
if (platformsJSON?.platforms) {
  const pjIds = new Set(platformsJSON.platforms.map(p => p.id));
  const pjCount = platformsJSON.platforms.length;

  if (pjCount !== systems.length) {
    issue(SEV.INFO, section4, `platforms.json has ${pjCount} entries vs ${systems.length} canonical systems`, 'platforms.json "platforms" array may be stale or vestigial');
  }

  // Check for IDs in platforms.json that don't exist in systems
  for (const p of platformsJSON.platforms) {
    if (!systemIds.has(p.id)) {
      issue(SEV.WARN, section4, `platforms.json entry "${p.id}" not found in canonical systems registry`);
    }
  }
} else {
  // platforms array intentionally removed — homepage data (capabilities, differentiators, etc.) lives here
  // canonical system registry is src/content/systems.ts
}

// 4b. Blog posts — check for duplicate slugs
if (Array.isArray(blogPosts)) {
  const blogSlugs = new Map();
  for (const [i, post] of blogPosts.entries()) {
    const slug = post.slug ?? post.id;
    if (blogSlugs.has(slug)) {
      issue(SEV.ERROR, section4, `Blog post duplicate slug: "${slug}"`);
    } else {
      blogSlugs.set(slug, i);
    }
  }
}

// ══════════════════════════════════════════════════════════════════════════════
// SECTION 5: BUILD & TOOLCHAIN (--full only)
// ══════════════════════════════════════════════════════════════════════════════

const section5 = 'Build & Toolchain';

let buildResult = null;
let lintResult = null;
let auditResult = null;

if (isFull) {
  // 5a. TypeScript build
  process.stdout.write('\n  Building... ');
  buildResult = run('npx next build');
  if (buildResult.error) {
    issue(SEV.CRITICAL, section5, 'Next.js build FAILED', buildResult.stderr?.slice(0, 500));
    console.log('FAIL');
  } else {
    // Extract page count
    const pageMatch = buildResult.match?.(/Generating static pages.*?(\d+)\/(\d+)/s) ??
                      buildResult?.match?.(/(\d+)\/(\d+)/);
    console.log('OK');
  }

  // 5b. ESLint
  process.stdout.write('  Linting... ');
  lintResult = run('npx next lint');
  if (typeof lintResult === 'string') {
    if (lintResult.includes('No ESLint warnings or errors')) {
      console.log('OK');
    } else {
      const warnCount = (lintResult.match(/Warning/g) || []).length;
      const errCount = (lintResult.match(/Error/g) || []).length;
      if (errCount > 0) issue(SEV.ERROR, section5, `ESLint: ${errCount} errors`, lintResult.slice(0, 500));
      if (warnCount > 0) issue(SEV.WARN, section5, `ESLint: ${warnCount} warnings`);
      console.log(`${errCount} errors, ${warnCount} warnings`);
    }
  } else if (lintResult.error) {
    issue(SEV.ERROR, section5, 'ESLint FAILED', lintResult.stderr?.slice(0, 500));
    console.log('FAIL');
  }

  // 5c. npm audit
  process.stdout.write('  Auditing deps... ');
  auditResult = run('npm audit --json 2>&1');
  try {
    const auditStr = typeof auditResult === 'string' ? auditResult : auditResult.stdout;
    const auditData = JSON.parse(auditStr);
    const vulns = auditData.metadata?.vulnerabilities ?? {};
    const totalVulns = (vulns.high ?? 0) + (vulns.critical ?? 0);
    const modVulns = vulns.moderate ?? 0;
    const lowVulns = vulns.low ?? 0;
    if (totalVulns > 0) {
      issue(SEV.WARN, section5, `npm audit: ${totalVulns} high/critical vulnerabilities`, `high: ${vulns.high ?? 0}, critical: ${vulns.critical ?? 0}`);
    }
    if (modVulns > 0 || lowVulns > 0) {
      issue(SEV.INFO, section5, `npm audit: ${modVulns} moderate, ${lowVulns} low vulnerabilities`);
    }
    if (totalVulns === 0 && modVulns === 0 && lowVulns === 0) {
      console.log('OK');
    } else {
      console.log(`${totalVulns} high/critical, ${modVulns} moderate`);
    }
  } catch {
    console.log('parse error');
  }
}

// ══════════════════════════════════════════════════════════════════════════════
// SECTION 6: UPGRADE RECOMMENDATIONS
// ══════════════════════════════════════════════════════════════════════════════

const section6 = 'Upgrades';

// Next.js version check
const pkgJson = loadJSON('package.json');
const nextVersion = pkgJson?.dependencies?.next ?? '';
const nextMajor = parseInt(nextVersion.replace(/[^0-9]/, ''), 10);
if (nextMajor && nextMajor < 15) {
  recommend(section6, `Next.js ${nextVersion} → consider upgrading to 15.x`, 'Breaking change: requires React 19, new App Router defaults');
}

// React version
const reactVersion = pkgJson?.dependencies?.react ?? '';
if (reactVersion.includes('18')) {
  recommend(section6, `React ${reactVersion} → React 19 available`, 'Required for Next.js 15+');
}

// TypeScript
const tsVersion = pkgJson?.devDependencies?.typescript ?? '';
if (tsVersion.includes('^5') || tsVersion.includes('~5')) {
  // Current, no recommendation needed
}

// Systems without techStack
const noTechStack = systems.filter(s => !s.hasTechStack && s.maturity !== 'thesis');
if (noTechStack.length > 0) {
  recommend(section6, `${noTechStack.length} systems missing techStack`, noTechStack.map(s => s.id).join(', '));
}

// ══════════════════════════════════════════════════════════════════════════════
// REPORT OUTPUT
// ══════════════════════════════════════════════════════════════════════════════

const LINE  = '═'.repeat(64);
const LINE2 = '─'.repeat(64);
const now   = new Date().toISOString().slice(0, 19).replace('T', ' ');

const criticals = issues.filter(i => i.severity === SEV.CRITICAL);
const errors    = issues.filter(i => i.severity === SEV.ERROR);
const warnings  = issues.filter(i => i.severity === SEV.WARN);
const infos     = issues.filter(i => i.severity === SEV.INFO);

const healthScore = Math.max(0,
  100
  - (criticals.length * 25)
  - (errors.length * 10)
  - (warnings.length * 3)
  - (infos.length * 1)
);

const healthEmoji = healthScore >= 95 ? '🟢' : healthScore >= 80 ? '🟡' : healthScore >= 60 ? '🟠' : '🔴';

// ── JSON output ──────────────────────────────────────────────────────────────

if (isJSON) {
  const report = {
    timestamp: now,
    healthScore,
    systemCount: systems.length,
    issues,
    recommendations,
    metrics: {
      maturity: maturityBreakdown,
      category: categoryBreakdown,
      brand: brandBreakdown,
      chains: chainCoverage,
      flagships: flagshipCount,
    },
  };
  console.log(JSON.stringify(report, null, 2));
  process.exit(isCI && (criticals.length + errors.length) > 0 ? 1 : 0);
}

// ── Console report ───────────────────────────────────────────────────────────

console.log(`\n${LINE}`);
console.log(`  BURNS INFRASTRUCTURE — System Health Check`);
console.log(`  ${now}   ${isFull ? 'Full Mode' : 'Quick Mode'}`);
console.log(LINE);

// ── Overview ─────────────────────────────────────────────────────────────────

console.log(`\n  ${healthEmoji} Health Score: ${healthScore}/100\n`);
console.log(`  Systems registered  : ${systems.length}`);
console.log(`  Flagships           : ${flagshipCount}`);
console.log(`  Unique brands       : ${Object.keys(brandBreakdown).length}`);
console.log(`  Categories in use   : ${Object.keys(categoryBreakdown).length}`);
console.log(`  Chains referenced   : ${Object.keys(chainCoverage).length}`);
console.log(`  Featured collections: ${allFeatured.length}`);
console.log(`  Blog posts          : ${Array.isArray(blogPosts) ? blogPosts.length : 0}`);

// ── Maturity Breakdown ───────────────────────────────────────────────────────

console.log(`\n${LINE2}`);
console.log('  Maturity Distribution');
console.log(LINE2);
const maturityOrder = ['thesis','designed','prototype','internal','testnet','pilot','live','production','audit-mode','archived'];
for (const mat of maturityOrder) {
  const count = maturityBreakdown[mat] ?? 0;
  if (count === 0) continue;
  const bar = '█'.repeat(Math.min(count * 2, 40));
  console.log(`  ${mat.padEnd(14)} ${String(count).padStart(3)}  ${bar}`);
}

// ── Category Breakdown ───────────────────────────────────────────────────────

console.log(`\n${LINE2}`);
console.log('  Category Distribution');
console.log(LINE2);
for (const [cat, count] of Object.entries(categoryBreakdown).sort((a, b) => b[1] - a[1])) {
  const bar = '█'.repeat(Math.min(count * 2, 40));
  const shortCat = cat.length > 30 ? cat.slice(0, 27) + '...' : cat;
  console.log(`  ${shortCat.padEnd(32)} ${String(count).padStart(3)}  ${bar}`);
}

// ── Brand Breakdown ──────────────────────────────────────────────────────────

console.log(`\n${LINE2}`);
console.log('  Brand Distribution');
console.log(LINE2);
for (const [brand, count] of Object.entries(brandBreakdown).sort((a, b) => b[1] - a[1])) {
  const bar = '█'.repeat(Math.min(count * 2, 40));
  console.log(`  ${brand.padEnd(20)} ${String(count).padStart(3)}  ${bar}`);
}

// ── Chain Coverage ───────────────────────────────────────────────────────────

console.log(`\n${LINE2}`);
console.log('  Chain Coverage (systems referencing each chain)');
console.log(LINE2);
for (const [chain, count] of Object.entries(chainCoverage).sort((a, b) => b[1] - a[1])) {
  const bar = '█'.repeat(Math.min(count * 2, 40));
  console.log(`  ${chain.padEnd(14)} ${String(count).padStart(3)}  ${bar}`);
}

// ── Issues ───────────────────────────────────────────────────────────────────

if (issues.length > 0) {
  console.log(`\n${LINE2}`);
  console.log(`  Issues Found: ${issues.length}`);
  console.log(LINE2);

  if (criticals.length > 0) {
    console.log('\n  🔴 CRITICAL');
    for (const i of criticals) {
      console.log(`     ✗ [${i.section}] ${i.message}`);
      if (i.detail) console.log(`       ${i.detail}`);
    }
  }
  if (errors.length > 0) {
    console.log('\n  🟠 ERRORS');
    for (const i of errors) {
      console.log(`     ✗ [${i.section}] ${i.message}`);
      if (i.detail) console.log(`       ${i.detail}`);
    }
  }
  if (warnings.length > 0) {
    console.log('\n  🟡 WARNINGS');
    for (const i of warnings) {
      console.log(`     ⚠ [${i.section}] ${i.message}`);
      if (i.detail) console.log(`       ${i.detail}`);
    }
  }
  if (infos.length > 0) {
    console.log('\n  🔵 INFO');
    for (const i of infos) {
      console.log(`     ℹ [${i.section}] ${i.message}`);
      if (i.detail) console.log(`       ${i.detail}`);
    }
  }
} else {
  console.log(`\n  ✅ No issues found — all systems clean.`);
}

// ── Recommendations ──────────────────────────────────────────────────────────

if (recommendations.length > 0) {
  console.log(`\n${LINE2}`);
  console.log(`  Upgrade Recommendations: ${recommendations.length}`);
  console.log(LINE2);
  for (const r of recommendations) {
    console.log(`  → [${r.section}] ${r.message}`);
    if (r.detail) console.log(`    ${r.detail}`);
  }
}

// ── Footer ───────────────────────────────────────────────────────────────────

console.log(`\n${LINE}`);
console.log(`  Quick: npm run check   |   Full: npm run check:full`);
console.log(`  JSON:  npm run check -- --json`);
console.log(`  CI:    npm run check:ci`);
console.log(`${LINE}\n`);

// ── Exit code ────────────────────────────────────────────────────────────────

if (isCI && (criticals.length + errors.length) > 0) {
  process.exit(1);
}
