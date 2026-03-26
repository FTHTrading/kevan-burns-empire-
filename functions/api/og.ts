/**
 * Cloudflare Pages Function — Dynamic OG Image Generator
 * GET /api/og?title=...&subtitle=...&category=...&maturity=...&color=...
 *
 * Returns a 1200×630 SVG open-graph image.
 * Accepted by LinkedIn, X/Twitter, Facebook, Slack, Discord.
 *
 * Query params:
 *   title     - system name (required)
 *   subtitle  - system subtitle
 *   category  - system category slug → displayed as readable label
 *   maturity  - live | beta | active | research | deprecated
 *   color     - hex accent colour (no #), default amber
 *   chains    - comma-separated chain names (first 4 shown)
 */

export const onRequestGet: PagesFunction = async (context) => {
  const url = new URL(context.request.url);
  const p = url.searchParams;

  const title    = truncate(p.get("title")    ?? "Unykorn Systems", 42);
  const subtitle = truncate(p.get("subtitle") ?? "Digital Infrastructure", 58);
  const category = toLabel(p.get("category")  ?? "infrastructure");
  const maturity = (p.get("maturity") ?? "live").toLowerCase();
  const rawColor = p.get("color") ?? "f59e0b";   // amber-400
  const color    = /^[0-9a-fA-F]{3,6}$/.test(rawColor) ? rawColor : "f59e0b";
  const chains   = (p.get("chains") ?? "")
    .split(",")
    .map((c) => c.trim())
    .filter(Boolean)
    .slice(0, 4);

  // Maturity badge colours
  const maturityBg: Record<string, string> = {
    live:       "166534", // green-800
    beta:       "1e3a5f", // blue-900
    active:     "1e3a5f",
    research:   "4a1942", // purple-900
    deprecated: "374151", // gray-700
  };
  const maturityFg: Record<string, string> = {
    live:       "4ade80",
    beta:       "60a5fa",
    active:     "60a5fa",
    research:   "c084fc",
    deprecated: "9ca3af",
  };

  const mbg = maturityBg[maturity] ?? "1f2937";
  const mfg = maturityFg[maturity] ?? "9ca3af";

  // Chain pills (max 4)
  const chainPills = chains.map((c, i) => {
    const x = 80 + i * 170;
    return `
      <rect x="${x}" y="530" width="155" height="36" rx="6" fill="#1f2937" stroke="#374151" stroke-width="1"/>
      <text x="${x + 77}" y="554" font-family="system-ui, -apple-system, sans-serif" font-size="15" fill="#9ca3af" text-anchor="middle">${escapeXml(c)}</text>`;
  }).join("");

  // Red pulsing dot for "live"
  const liveDot = maturity === "live"
    ? `<circle cx="1108" cy="122" r="7" fill="#22c55e" opacity="0.9"/>`
    : "";

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0a0a0f"/>
      <stop offset="100%" stop-color="#0f0f1a"/>
    </linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#${color}" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="#${color}" stop-opacity="0"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bg)"/>

  <!-- Accent strip top -->
  <rect x="0" y="0" width="1200" height="4" fill="#${color}"/>

  <!-- Accent glow behind title area -->
  <rect x="0" y="0" width="700" height="630" fill="url(#accent)"/>

  <!-- Grid lines (subtle) -->
  <line x1="0" y1="210" x2="1200" y2="210" stroke="#ffffff" stroke-opacity="0.03" stroke-width="1"/>
  <line x1="0" y1="420" x2="1200" y2="420" stroke="#ffffff" stroke-opacity="0.03" stroke-width="1"/>
  <line x1="400" y1="0" x2="400" y2="630" stroke="#ffffff" stroke-opacity="0.03" stroke-width="1"/>
  <line x1="800" y1="0" x2="800" y2="630" stroke="#ffffff" stroke-opacity="0.03" stroke-width="1"/>

  <!-- Maturity badge -->
  <rect x="80" y="80" width="130" height="36" rx="6" fill="#${mbg}40" stroke="#${mfg}60" stroke-width="1"/>
  <circle cx="101" cy="98" r="5" fill="#${mfg}"/>
  <text x="116" y="103" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="600" fill="#${mfg}" letter-spacing="0.05em">${maturity.toUpperCase()}</text>
  ${liveDot}

  <!-- Category label -->
  <text x="230" y="103" font-family="system-ui, -apple-system, sans-serif" font-size="14" fill="#6b7280" letter-spacing="0.08em">${escapeXml(category.toUpperCase())}</text>

  <!-- Title -->
  <text x="80" y="290" font-family="system-ui, -apple-system, sans-serif" font-size="${titleSize(title)}" font-weight="700" fill="#ffffff" letter-spacing="-0.02em">${escapeXml(title)}</text>

  <!-- Subtitle -->
  <text x="80" y="360" font-family="system-ui, -apple-system, sans-serif" font-size="26" fill="#9ca3af" font-weight="400">${escapeXml(subtitle)}</text>

  <!-- Divider -->
  <rect x="80" y="490" width="240" height="2" rx="1" fill="#${color}" opacity="0.6"/>

  <!-- Chain pills -->
  ${chainPills}

  <!-- Branding -->
  <text x="1120" y="590" font-family="system-ui, -apple-system, sans-serif" font-size="18" font-weight="700" fill="#${color}" text-anchor="end" opacity="0.9">Unykorn ⬡</text>
  <text x="1120" y="612" font-family="system-ui, -apple-system, sans-serif" font-size="13" fill="#6b7280" text-anchor="end">kevanburns.com</text>
</svg>`;

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
    },
  });
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function truncate(str: string, max: number): string {
  return str.length > max ? str.slice(0, max - 1) + "…" : str;
}

function titleSize(title: string): number {
  if (title.length <= 18) return 72;
  if (title.length <= 28) return 60;
  if (title.length <= 38) return 50;
  return 42;
}

function toLabel(slug: string): string {
  const map: Record<string, string> = {
    "defi-protocol":        "DeFi Protocol",
    "ai-infrastructure":    "AI Infrastructure",
    "rwa-tokenization":     "RWA Tokenization",
    "cross-chain-settlement": "Cross-Chain",
    "research-platform":    "Research Platform",
    "identity-compliance":  "Identity & Compliance",
    "capital-markets":      "Capital Markets",
    "data-infrastructure":  "Data Infrastructure",
    "developer-tooling":    "Developer Tooling",
    "consumer-app":         "Consumer App",
    "nft-gaming":           "NFT & Gaming",
    "infrastructure":       "Infrastructure",
  };
  return map[slug] ?? slug.replace(/-/g, " ");
}
