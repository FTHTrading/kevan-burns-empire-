#!/usr/bin/env node
/**
 * scripts/list-tokens.mjs
 * =======================
 * List all active diligence access tokens from KV.
 * Skips access log entries (key prefix "log:").
 *
 * Usage:
 *   node scripts/list-tokens.mjs
 *   node scripts/list-tokens.mjs --expired   # include expired tokens
 *
 * To revoke a token:
 *   npx wrangler kv key delete --binding=DILIGENCE_TOKENS --remote --preview false <token-uuid>
 */

import { execSync } from "node:child_process";

const showExpired = process.argv.includes("--expired");

// ---------------------------------------------------------------------------
// Fetch all keys (skip log: prefix)
// ---------------------------------------------------------------------------
let allKeys;
try {
  const raw = execSync(
    "npx wrangler kv key list --binding=DILIGENCE_TOKENS --remote --preview false",
    { encoding: "utf8", stdio: ["pipe", "pipe", "pipe"] }
  );
  // Strip wrangler header lines before the JSON
  const jsonStart = raw.indexOf("[");
  allKeys = JSON.parse(raw.slice(jsonStart));
} catch (err) {
  console.error("Failed to list KV keys. Is wrangler authenticated?\n", err.message);
  process.exit(1);
}

const tokenKeys = allKeys.filter((k) => !k.name.startsWith("log:"));

if (tokenKeys.length === 0) {
  console.log("\nNo active tokens found.\n");
  process.exit(0);
}

// ---------------------------------------------------------------------------
// Fetch each token record
// ---------------------------------------------------------------------------
const now = Date.now();
const tokens = [];

for (const key of tokenKeys) {
  try {
    const raw = execSync(
      `npx wrangler kv key get --binding=DILIGENCE_TOKENS --remote --preview false "${key.name}"`,
      { encoding: "utf8", stdio: ["pipe", "pipe", "pipe"] }
    );
    const jsonStart = raw.indexOf("{");
    const record = JSON.parse(raw.slice(jsonStart));
    tokens.push({ token: key.name, ...record });
  } catch {
    tokens.push({ token: key.name, name: "UNREADABLE", email: "-", issuedAt: 0, expiresAt: 0 });
  }
}

// ---------------------------------------------------------------------------
// Display
// ---------------------------------------------------------------------------
const active = tokens.filter((t) => !showExpired ? t.expiresAt > now : true);

console.log(`\n  Diligence Access Tokens — ${new Date().toISOString().slice(0, 10)}`);
console.log(`  ${"─".repeat(90)}`);
console.log(
  `  ${"Token (8c)".padEnd(10)}  ${"Recipient".padEnd(22)}  ${"Email".padEnd(28)}  ${"Issued".padEnd(12)}  ${"Expires".padEnd(12)}  Status`
);
console.log(`  ${"─".repeat(90)}`);

for (const t of active) {
  const issued = t.issuedAt ? new Date(t.issuedAt).toISOString().slice(0, 10) : "?";
  const expires = t.expiresAt ? new Date(t.expiresAt).toISOString().slice(0, 10) : "?";
  const expired = t.expiresAt < now;
  const status = expired ? "EXPIRED" : "ACTIVE";
  console.log(
    `  ${t.token.slice(0, 8).padEnd(10)}  ${(t.name ?? "").slice(0, 22).padEnd(22)}  ${(t.email ?? "").slice(0, 28).padEnd(28)}  ${issued.padEnd(12)}  ${expires.padEnd(12)}  ${status}`
  );
}

console.log(`  ${"─".repeat(90)}`);
console.log(`  ${active.length} token(s) shown. Run with --expired to include expired tokens.\n`);
console.log(`  To revoke:`);
console.log(`    npx wrangler kv key delete --binding=DILIGENCE_TOKENS --remote --preview false <token-uuid>\n`);
