#!/usr/bin/env node
/**
 * scripts/access-log.mjs
 * ======================
 * View the diligence room access log stored in DILIGENCE_TOKENS KV (log: prefix).
 *
 * Usage:
 *   node scripts/access-log.mjs              # last 50 entries
 *   node scripts/access-log.mjs --limit 200  # last N entries
 *   node scripts/access-log.mjs --email gp@firm.com  # filter by email
 *   node scripts/access-log.mjs --today      # today only (UTC)
 */

import { execSync } from "node:child_process";

// ---------------------------------------------------------------------------
// Parse CLI args
// ---------------------------------------------------------------------------
const args = process.argv.slice(2);
const limitIdx = args.indexOf("--limit");
const limit = limitIdx !== -1 ? parseInt(args[limitIdx + 1], 10) : 50;
const emailFilter = args.includes("--email") ? args[args.indexOf("--email") + 1]?.toLowerCase() : null;
const todayOnly = args.includes("--today");

// ---------------------------------------------------------------------------
// Fetch all log keys
// ---------------------------------------------------------------------------
let allKeys;
try {
  const raw = execSync(
    "npx wrangler kv key list --binding=DILIGENCE_TOKENS --remote --preview false --prefix log:",
    { encoding: "utf8", stdio: ["pipe", "pipe", "pipe"] }
  );
  const jsonStart = raw.indexOf("[");
  allKeys = JSON.parse(raw.slice(jsonStart));
} catch (err) {
  console.error("Failed to list KV keys. Is wrangler authenticated?\n", err.message);
  process.exit(1);
}

if (allKeys.length === 0) {
  console.log("\nNo access log entries found. Log entries appear after the first authenticated visit.\n");
  process.exit(0);
}

// Sort descending by key (key starts with "log:<timestamp>" so lexicographic = chronological)
allKeys.sort((a, b) => b.name.localeCompare(a.name));

// Apply limit before fetching values
const keysToFetch = allKeys.slice(0, Math.min(limit * 3, allKeys.length)); // fetch extra to allow for filtering

// ---------------------------------------------------------------------------
// Fetch log entries
// ---------------------------------------------------------------------------
const entries = [];
const todayPrefix = new Date().toISOString().slice(0, 10);

for (const key of keysToFetch) {
  if (entries.length >= limit) break;

  try {
    const raw = execSync(
      `npx wrangler kv key get --binding=DILIGENCE_TOKENS --remote --preview false "${key.name}"`,
      { encoding: "utf8", stdio: ["pipe", "pipe", "pipe"] }
    );
    const jsonStart = raw.indexOf("{");
    const entry = JSON.parse(raw.slice(jsonStart));

    // Apply filters
    if (emailFilter && !(entry.email ?? "").toLowerCase().includes(emailFilter)) continue;
    if (todayOnly && !new Date(entry.ts).toISOString().startsWith(todayPrefix)) continue;

    entries.push(entry);
  } catch {
    // skip unreadable entry
  }
}

// ---------------------------------------------------------------------------
// Display
// ---------------------------------------------------------------------------
const label = [
  todayOnly ? "today" : null,
  emailFilter ? `email:${emailFilter}` : null,
  `limit:${limit}`,
].filter(Boolean).join(", ");

console.log(`\n  Diligence Room — Access Log  [${label}]`);
console.log(`  ${"─".repeat(100)}`);
console.log(
  `  ${"Timestamp (UTC)".padEnd(22)}  ${"Recipient".padEnd(22)}  ${"Email".padEnd(28)}  ${"Path".padEnd(20)}  Country`
);
console.log(`  ${"─".repeat(100)}`);

for (const e of entries) {
  const ts = new Date(e.ts).toISOString().replace("T", " ").slice(0, 19);
  const path = (e.path ?? "").slice(0, 20).padEnd(20);
  const name = (e.name ?? "").slice(0, 22).padEnd(22);
  const email = (e.email ?? "").slice(0, 28).padEnd(28);
  const country = [e.city !== "unknown" ? e.city : null, e.country].filter(Boolean).join(", ");
  console.log(`  ${ts.padEnd(22)}  ${name}  ${email}  ${path}  ${country}`);
}

console.log(`  ${"─".repeat(100)}`);
console.log(`  ${entries.length} entr${entries.length === 1 ? "y" : "ies"} shown.\n`);
