#!/usr/bin/env node
/**
 * scripts/issue-token.mjs
 * =======================
 * Admin utility — issue a diligence access token to a credentialed counterparty.
 *
 * Usage:
 *   node scripts/issue-token.mjs "Investor Name" investor@example.com [days]
 *
 *   days  — token validity period in days (default: 30)
 *
 * Prerequisites:
 *   1. wrangler.toml must have DILIGENCE_TOKENS KV namespace configured
 *      (run: npx wrangler kv namespace create DILIGENCE_TOKENS)
 *   2. Wrangler must be authenticated (npx wrangler login)
 *
 * The token UUID is written to the KV namespace and the access URL is printed.
 * Send the printed URL (or the raw token) to the counterparty via secure channel.
 *
 * To revoke a token:
 *   npx wrangler kv key delete --binding=DILIGENCE_TOKENS <token-uuid>
 *
 * To list all active tokens:
 *   npx wrangler kv key list --binding=DILIGENCE_TOKENS
 */

import { execSync } from "node:child_process";
import crypto from "node:crypto";
import { writeFileSync, unlinkSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

// ---------------------------------------------------------------------------
// Parse args
// ---------------------------------------------------------------------------
const [, , name, email, daysArg] = process.argv;

if (!name || !email) {
  console.error(
    "\nUsage: node scripts/issue-token.mjs \"Investor Name\" investor@example.com [days]\n"
  );
  process.exit(1);
}

const days = parseInt(daysArg ?? "30", 10);
if (isNaN(days) || days < 1 || days > 365) {
  console.error("days must be between 1 and 365");
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Generate token
// ---------------------------------------------------------------------------
const token = crypto.randomUUID();
const now = Date.now();
const expiresAt = now + days * 24 * 60 * 60 * 1000;

const record = JSON.stringify({
  name: name.trim(),
  email: email.trim().toLowerCase(),
  issuedAt: now,
  expiresAt,
});

// ---------------------------------------------------------------------------
// Write to KV via wrangler (temp file avoids shell quoting issues on Windows)
// ---------------------------------------------------------------------------
const ttlSeconds = days * 24 * 60 * 60;
const tmpFile = join(tmpdir(), `diligence-token-${token}.json`);

try {
  writeFileSync(tmpFile, record, "utf8");
  execSync(
    `npx wrangler kv key put --binding=DILIGENCE_TOKENS --remote --preview false "${token}" --path "${tmpFile}" --ttl=${ttlSeconds}`,
    { stdio: "inherit" }
  );
} catch (err) {
  console.error("\nFailed to write token to KV. Is wrangler authenticated and wrangler.toml configured?\n");
  process.exit(1);
} finally {
  try { unlinkSync(tmpFile); } catch { /* ignore */ }
}

// ---------------------------------------------------------------------------
// Output
// ---------------------------------------------------------------------------
const expiresDate = new Date(expiresAt).toISOString().split("T")[0];

console.log(`
┌─────────────────────────────────────────────────────────────┐
│  Diligence Access Token Issued                              │
├─────────────────────────────────────────────────────────────┤
│  Recipient : ${name.padEnd(47)}│
│  Email     : ${email.toLowerCase().padEnd(47)}│
│  Expires   : ${expiresDate.padEnd(47)}│
├─────────────────────────────────────────────────────────────┤
│  Token     : ${token.padEnd(47)}│
│                                                             │
│  Access URL:                                                │
│  https://portfolio-unykorn.pages.dev/diligence/login        │
│  ?next=/diligence                                           │
└─────────────────────────────────────────────────────────────┘

Send the TOKEN (not the URL) to the counterparty via a secure channel.
The login URL is public. The token is the credential.

To revoke before expiry:
  npx wrangler kv key delete --binding=DILIGENCE_TOKENS --remote --preview false "${token}"
`);
