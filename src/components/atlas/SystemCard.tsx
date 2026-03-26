'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import type { System } from '@/types/system';
import CategoryBadge from './CategoryBadge';
import MaturityBadge from './MaturityBadge';
import ChainBadge from './ChainBadge';

interface Props {
  system: System;
  index?: number;
}

export default function SystemCard({ system, index = 0 }: Props) {
  const s = system;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.6) }}
    >
      <Link
        href={`/systems/${s.slug}/`}
        className="group block h-full rounded-xl border border-[#1e1e2e] bg-[#12121a] p-5 transition-all duration-300 hover:border-[#2a2a3e] hover:bg-[#16161f] hover:shadow-lg hover:shadow-black/20 hover:-translate-y-1"
      >
        {/* Header row */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <span
              className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center text-lg"
              style={{ background: `${s.color}18`, border: `1px solid ${s.color}30` }}
            >
              {s.emoji}
            </span>
            <div className="min-w-0">
              <h3 className="text-white font-semibold text-sm leading-tight truncate group-hover:text-blue-400 transition-colors">
                {s.name}
              </h3>
              <p className="text-[#8888a0] text-[11px] leading-tight truncate mt-0.5">
                {s.subtitle}
              </p>
            </div>
          </div>
          {s.flagship && (
            <span className="flex-shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-400 border border-amber-500/25">
              FLAGSHIP
            </span>
          )}
        </div>

        {/* Tagline */}
        <p className="text-[#8888a0] text-xs leading-relaxed line-clamp-2 mb-3">
          {s.tagline}
        </p>

        {/* Badges */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          <CategoryBadge category={s.category} />
          <MaturityBadge maturity={s.maturity} />
        </div>

        {/* Chains */}
        {s.chainTargets && s.chainTargets.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {s.chainTargets.slice(0, 4).map((c) => (
              <ChainBadge key={c} chain={c} />
            ))}
            {s.chainTargets.length > 4 && (
              <span className="text-[10px] text-[#8888a0] self-center ml-1">
                +{s.chainTargets.length - 4}
              </span>
            )}
          </div>
        )}

        {/* Tech stack preview */}
        {s.techStack && s.techStack.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {s.techStack.slice(0, 4).map((t) => (
              <span
                key={t}
                className="text-[10px] text-[#666680] bg-white/[0.03] rounded px-1.5 py-0.5"
              >
                {t}
              </span>
            ))}
            {s.techStack.length > 4 && (
              <span className="text-[10px] text-[#555570]">
                +{s.techStack.length - 4}
              </span>
            )}
          </div>
        )}

        {/* Live indicator */}
        {s.maturity === 'live' && (
          <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-[#1e1e2e]">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] text-green-500/80 font-medium">LIVE</span>
          </div>
        )}
      </Link>
    </motion.div>
  );
}
