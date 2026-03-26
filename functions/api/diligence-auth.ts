/**
 * Cloudflare Pages Function — Diligence Auth Endpoint
 * POST /api/diligence-auth
 *
 * Accepts { token } in JSON or form-encoded body.
 * Validates against DILIGENCE_TOKENS KV.
 * On success: sets HttpOnly cookie + redirects to `next` param (default /diligence).
 * On failure: redirects back to /diligence/login with error param.
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

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const url = new URL(request.url);

  // Parse submitted token from JSON or form data
  let submittedToken: string | null = null;
  let next = "/diligence";

  const contentType = request.headers.get("Content-Type") ?? "";

  try {
    if (contentType.includes("application/json")) {
      const body = await request.json<{ token?: string; next?: string }>();
      submittedToken = body.token?.trim() ?? null;
      next = body.next ?? "/diligence";
    } else {
      const form = await request.formData();
      submittedToken = (form.get("token") as string | null)?.trim() ?? null;
      next = (form.get("next") as string | null) ?? "/diligence";
    }
  } catch {
    return redirectFail(url, "invalid-request");
  }

  // Sanitise next to prevent open-redirect
  if (!next.startsWith("/diligence")) next = "/diligence";

  if (!submittedToken) {
    return redirectFail(url, "missing-token");
  }

  // Validate against KV
  let raw: string | null = null;
  try {
    raw = await env.DILIGENCE_TOKENS.get(submittedToken);
  } catch {
    return redirectFail(url, "kv-error");
  }

  if (!raw) {
    return redirectFail(url, "invalid-token");
  }

  let record: TokenRecord;
  try {
    record = JSON.parse(raw);
  } catch {
    return redirectFail(url, "corrupt-token");
  }

  if (Date.now() > record.expiresAt) {
    await env.DILIGENCE_TOKENS.delete(submittedToken);
    return redirectFail(url, "expired");
  }

  // Success — set cookie and redirect
  const cookie = buildCookie(submittedToken, record.expiresAt);

  return new Response(null, {
    status: 302,
    headers: {
      Location: next,
      "Set-Cookie": cookie,
    },
  });
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function buildCookie(token: string, expiresAt: number): string {
  const expires = new Date(expiresAt).toUTCString();
  return `diligence-token=${encodeURIComponent(token)}; Path=/diligence; Expires=${expires}; HttpOnly; Secure; SameSite=Lax`;
}

function redirectFail(url: URL, reason: string): Response {
  const loginUrl = new URL("/diligence/login", url.origin);
  loginUrl.searchParams.set("error", reason);
  return Response.redirect(loginUrl.toString(), 302);
}
