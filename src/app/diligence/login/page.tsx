"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const ERROR_MESSAGES: Record<string, string> = {
  "invalid-token": "Access token not recognised. Please check the token and try again.",
  expired: "Your access token has expired. Please contact the issuer for a new token.",
  "missing-token": "Please enter your access token.",
  "invalid-request": "Request could not be processed. Please try again.",
  "kv-error": "Authentication service temporarily unavailable. Please try again in a moment.",
  "corrupt-token": "Token data is corrupt. Please request a new token.",
};

function LoginForm() {
  const searchParams = useSearchParams();
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);

  const next = searchParams.get("next") ?? "/diligence";
  const reason = searchParams.get("reason");
  const errorCode = searchParams.get("error");

  const errorMessage =
    (errorCode && ERROR_MESSAGES[errorCode]) ||
    (reason === "expired" && ERROR_MESSAGES["expired"]) ||
    null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token.trim()) return;
    setLoading(true);

    // Build form data and POST to the Pages Function
    const form = new FormData();
    form.append("token", token.trim());
    form.append("next", next);

    // Use a standard form POST so the Pages Function can set the cookie
    // and redirect the browser. We do this by creating a temporary form.
    const tempForm = document.createElement("form");
    tempForm.method = "POST";
    tempForm.action = "/api/diligence-auth";

    const tokenInput = document.createElement("input");
    tokenInput.type = "hidden";
    tokenInput.name = "token";
    tokenInput.value = token.trim();

    const nextInput = document.createElement("input");
    nextInput.type = "hidden";
    nextInput.name = "next";
    nextInput.value = next;

    tempForm.appendChild(tokenInput);
    tempForm.appendChild(nextInput);
    document.body.appendChild(tempForm);
    tempForm.submit();
  };

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center px-4">
      {/* Brand header */}
      <div className="mb-10 text-center">
        <span className="text-2xl font-bold tracking-tight text-white">
          Unykorn <span className="text-amber-400">7777</span>
        </span>
        <p className="mt-2 text-sm text-gray-400 uppercase tracking-widest">
          Diligence Room — Restricted Access
        </p>
      </div>

      {/* Card */}
      <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl p-8">
        <h1 className="text-xl font-semibold text-white mb-2">
          Enter your access token
        </h1>
        <p className="text-sm text-gray-400 mb-6">
          This area is restricted to credentialed counterparties. If you have
          not received a token, contact{" "}
          <a
            href="mailto:capital@unykorn.com"
            className="text-amber-400 hover:underline"
          >
            capital@unykorn.com
          </a>
          .
        </p>

        {/* Error banner */}
        {errorMessage && (
          <div className="mb-5 rounded-lg bg-red-950/60 border border-red-700/50 px-4 py-3 text-sm text-red-300">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="token"
              className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wider"
            >
              Access Token
            </label>
            <input
              id="token"
              type="text"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
              autoComplete="off"
              autoFocus
              className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-600
                         rounded-lg px-4 py-3 text-sm font-mono
                         focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50"
            />
          </div>

          <button
            type="submit"
            disabled={loading || !token.trim()}
            className="w-full bg-amber-500 hover:bg-amber-400 disabled:bg-gray-700 disabled:text-gray-500
                       text-gray-950 font-semibold rounded-lg px-4 py-3 text-sm
                       transition-colors duration-150"
          >
            {loading ? "Verifying…" : "Access Diligence Room"}
          </button>
        </form>
      </div>

      {/* Footer */}
      <div className="mt-8 text-xs text-gray-600 text-center space-x-4">
        <Link href="/" className="hover:text-gray-400 transition-colors">
          Return to site
        </Link>
        <span>·</span>
        <a
          href="mailto:capital@unykorn.com"
          className="hover:text-gray-400 transition-colors"
        >
          Request access
        </a>
      </div>
    </div>
  );
}

export default function DiligenceLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-950 flex items-center justify-center">
          <span className="text-gray-500 text-sm">Loading…</span>
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
