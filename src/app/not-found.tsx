import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 — Node Not Found | Burns Infrastructure',
  description: 'System route unresolved. Navigate back to a known node.',
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] flex flex-col items-center justify-center px-6">
      {/* Grid background */}
      <div
        className="fixed inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 text-center max-w-lg">
        {/* Error symbol */}
        <div className="mb-8 flex items-center justify-center">
          <div className="w-20 h-20 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
            <span className="text-4xl">◉</span>
          </div>
        </div>

        {/* Error code */}
        <div className="mb-2">
          <span className="text-[10px] font-mono tracking-[0.3em] text-red-400/60 uppercase">
            error.hash: 0x404_node_not_found · sovereign-mesh/routing
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3 tracking-tight">
          NODE NOT FOUND
        </h1>
        <p className="text-[#8888a0] text-base mb-2">System route unresolved</p>
        <p className="text-[#555570] text-sm mb-10">
          The protocol path you requested does not exist in the sovereign catalog.
          Navigate back to a known node.
        </p>

        {/* Nav links */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {[
            { href: '/', label: 'Home', icon: '◉' },
            { href: '/systems/', label: 'Systems', icon: '⬡' },
            { href: '/control/', label: 'Operations', icon: '▣' },
            { href: '/press/', label: 'Research', icon: '📄' },
          ].map(({ href, label, icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-[#a0a0b8] hover:text-white hover:bg-white/10 hover:border-white/20 transition-all"
            >
              <span className="text-xs">{icon}</span>
              {label}
            </Link>
          ))}
        </div>

        {/* Back button */}
        <Link
          href="/systems/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600/10 border border-blue-600/25 text-blue-400 text-sm font-medium hover:bg-blue-600/20 hover:border-blue-600/40 transition-all"
        >
          ← Back to Atlas
        </Link>

        {/* Footer note */}
        <p className="mt-12 text-[#333350] text-[11px] font-mono">
          Burns Infrastructure · Sovereign Mesh · All systems nominal
        </p>
      </div>
    </div>
  );
}
