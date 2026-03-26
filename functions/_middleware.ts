/**
 * Cloudflare Pages Middleware — Diligence Room Token Gate + Access Log
 *
 * Protects all /diligence/* routes (except /diligence/login and the auth API).
 * Validates the `diligence-token` cookie against the DILIGENCE_TOKENS KV namespace.
 * Writes a non-blocking access log entry (key prefix "log:") on every valid visit.
 *
 * Token format in KV:
 *   key:   <token-uuid>
 *   value: JSON { name: string, email: string, issuedAt: number, expiresAt: number }
 *
 * Access log format in KV:
 *   key:   log:<timestamp-ms>:<token-uuid-prefix-8>
 *   value: JSON AccessLogEntry
 *   TTL:   90 days
 */

interface Env {
  DILIGENCE_TOKENS: KVNamespace;
}

interface TokenRecord {
  name: string;
  email: string;
  issuedAt: number;
  expiresAt: number;
}

interface AccessLogEntry {
  ts: number;           // Unix ms
  token: string;        // first 8 chars only
  name: string;
  email: string;
  path: string;
  method: string;
  country: string;
  city: string;
  ua: string;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const { request, next, env } = context;
  const url = new URL(request.url);
  const path = url.pathname;

  // Only gate /diligence/* routes
  if (!path.startsWith("/diligence")) {
    return next();
  }

  // Always allow the login page and the auth API endpoint
  if (
    path === "/diligence/login" ||
    path.startsWith("/diligence/login/") ||
    path.startsWith("/api/diligence-auth")
  ) {
    return next();
  }

  // Read the token cookie
  const cookieHeader = request.headers.get("Cookie") ?? "";
  const token = parseCookie(cookieHeader, "diligence-token");

  if (!token) {
    return redirectToLogin(url);
  }

  // Validate against KV
  try {
    const raw = await env.DILIGENCE_TOKENS.get(token);
    if (!raw) {
      return redirectToLogin(url);
    }

    const record: TokenRecord = JSON.parse(raw);

    // Check expiry
    if (Date.now() > record.expiresAt) {
      await env.DILIGENCE_TOKENS.delete(token);
      return redirectToLogin(url, "expired");
    }

    // Non-blocking access log write (90-day TTL)
    const cf = (request as Request & { cf?: Record<string, string> }).cf ?? {};
    const logEntry: AccessLogEntry = {
      ts: Date.now(),
      token: token.slice(0, 8),
      name: record.name,
      email: record.email,
      path,
      method: request.method,
      country: cf["country"] ?? "unknown",
      city: cf["city"] ?? "unknown",
      ua: request.headers.get("User-Agent") ?? "unknown",
    };
    const logKey = `log:${logEntry.ts}:${logEntry.token}`;
    context.waitUntil(
      env.DILIGENCE_TOKENS.put(logKey, JSON.stringify(logEntry), {
        expirationTtl: 90 * 24 * 60 * 60,
      })
    );

    // Valid — pass through and refresh the cookie TTL
    const response = await next();
    const refreshed = new Response(response.body, response);
    refreshed.headers.append(
      "Set-Cookie",
      buildCookie(token, record.expiresAt)
    );
    return refreshed;
  } catch {
    // KV unavailable or corrupt token — fail closed
    return redirectToLogin(url);
  }
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function parseCookie(header: string, name: string): string | null {
  const match = header
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.slice(name.length + 1)) : null;
}

function buildCookie(token: string, expiresAt: number): string {
  const expires = new Date(expiresAt).toUTCString();
  return `diligence-token=${encodeURIComponent(token)}; Path=/diligence; Expires=${expires}; HttpOnly; Secure; SameSite=Lax`;
}

function redirectToLogin(url: URL, reason?: string): Response {
  const loginUrl = new URL("/diligence/login", url.origin);
  loginUrl.searchParams.set("next", url.pathname);
  if (reason) loginUrl.searchParams.set("reason", reason);
  return Response.redirect(loginUrl.toString(), 302);
}
