// ─────────────────────────────────────────────────────────────────────────────
// DiligenceBadge — reusable status badge for the capital documentation layer.
//
// Six badge types, each with a distinct semantic meaning:
//   documented          — exists in a written document; content verified
//   executed            — signed by at least one party; legally active
//   estoppel-backed     — confirmed by estoppel certificate
//   contingent          — value/existence depends on future events
//   related-party       — related-party transaction between affiliated entities
//   reconciliation-req  — figures from different layers need reconciliation
// ─────────────────────────────────────────────────────────────────────────────

export type DiligenceBadgeType =
  | 'documented'
  | 'executed'
  | 'estoppel-backed'
  | 'contingent'
  | 'related-party'
  | 'reconciliation-req';

interface BadgeConfig {
  label: string;
  color: string;
  border: string;
  bg: string;
  dot: string;
}

const config: Record<DiligenceBadgeType, BadgeConfig> = {
  'documented':         { label: 'Documented',           color: 'text-green-400',  border: 'border-green-500/30',  bg: 'bg-green-500/5',  dot: 'bg-green-400' },
  'executed':           { label: 'Executed',              color: 'text-blue-400',   border: 'border-blue-500/30',   bg: 'bg-blue-500/5',   dot: 'bg-blue-400' },
  'estoppel-backed':    { label: 'Estoppel-Backed',       color: 'text-purple-400', border: 'border-purple-500/30', bg: 'bg-purple-500/5', dot: 'bg-purple-400' },
  'contingent':         { label: 'Contingent',            color: 'text-orange-400', border: 'border-orange-500/30', bg: 'bg-orange-500/5', dot: 'bg-orange-400' },
  'related-party':      { label: 'Related-Party',         color: 'text-red-400',    border: 'border-red-500/30',    bg: 'bg-red-500/5',    dot: 'bg-red-400' },
  'reconciliation-req': { label: 'Reconciliation Req.',   color: 'text-yellow-400', border: 'border-yellow-500/30', bg: 'bg-yellow-500/5', dot: 'bg-yellow-400' },
};

interface DiligenceBadgeProps {
  type: DiligenceBadgeType;
  /** Override the default label */
  label?: string;
  size?: 'sm' | 'md';
}

export default function DiligenceBadge({ type, label, size = 'sm' }: DiligenceBadgeProps) {
  const c = config[type];
  const text = label ?? c.label;
  const px = size === 'md' ? 'px-3 py-1.5' : 'px-2.5 py-1';
  const font = size === 'md' ? 'text-xs' : 'text-[10px]';

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-mono uppercase tracking-wider ${px} ${font} ${c.color} ${c.border} ${c.bg}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${c.dot}`} />
      {text}
    </span>
  );
}

/**
 * Badge group — renders multiple badges in a flex row.
 */
export function DiligenceBadgeRow({ badges }: { badges: DiligenceBadgeType[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {badges.map((b) => (
        <DiligenceBadge key={b} type={b} />
      ))}
    </div>
  );
}
