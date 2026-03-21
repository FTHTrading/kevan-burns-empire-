'use client';

import { motion } from 'framer-motion';
import type { System } from '@/types/system';
import { CATEGORY_COLORS, CATEGORY_LABELS } from '@/types/system';
import type { DependencyGraphEdge } from '@/lib/atlas';

interface DependencyGraphProps {
  systems: System[];
  edges: DependencyGraphEdge[];
}

const RELATIONSHIP_STYLES: Record<string, { color: string; label: string; dash: boolean }> = {
  'depends-on': { color: '#3b82f6', label: 'depends on', dash: false },
  'feeds-into': { color: '#22c55e', label: 'feeds into', dash: false },
  'integrates-with': { color: '#a855f7', label: 'integrates', dash: true },
  extends: { color: '#f59e0b', label: 'extends', dash: true },
  'child-of': { color: '#ec4899', label: 'child of', dash: true },
};

export default function DependencyGraph({ systems, edges }: DependencyGraphProps) {
  // Build node importance (how many times depended on)
  const inDegree = new Map<string, number>();
  const outDegree = new Map<string, number>();
  for (const edge of edges) {
    inDegree.set(edge.targetId, (inDegree.get(edge.targetId) ?? 0) + 1);
    outDegree.set(edge.sourceId, (outDegree.get(edge.sourceId) ?? 0) + 1);
  }

  // Get all connected system ids
  const connectedIds = new Set<string>();
  for (const edge of edges) {
    connectedIds.add(edge.sourceId);
    connectedIds.add(edge.targetId);
  }

  const connectedSystems = systems.filter((s) => connectedIds.has(s.id));
  const systemMap = new Map(systems.map((s) => [s.id, s]));

  // Group edges by relationship type
  const edgesByType = new Map<string, DependencyGraphEdge[]>();
  for (const edge of edges) {
    const type = edge.relationship;
    if (!edgesByType.has(type)) edgesByType.set(type, []);
    edgesByType.get(type)!.push(edge);
  }

  // Foundation systems (highest in-degree)
  const foundations = Array.from(inDegree.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([id, count]) => ({ system: systemMap.get(id), count }))
    .filter((e) => e.system);

  return (
    <div className="space-y-6">
      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[#12121a] border border-[#1e1e2e] rounded-xl p-4">
          <div className="text-2xl font-bold font-mono text-blue-400">{edges.length}</div>
          <div className="text-xs text-[#8888a0] mt-1">Total Edges</div>
        </div>
        <div className="bg-[#12121a] border border-[#1e1e2e] rounded-xl p-4">
          <div className="text-2xl font-bold font-mono text-purple-400">{connectedIds.size}</div>
          <div className="text-xs text-[#8888a0] mt-1">Connected Nodes</div>
        </div>
        <div className="bg-[#12121a] border border-[#1e1e2e] rounded-xl p-4">
          <div className="text-2xl font-bold font-mono text-green-400">{foundations.length}</div>
          <div className="text-xs text-[#8888a0] mt-1">Foundation Systems</div>
        </div>
        <div className="bg-[#12121a] border border-[#1e1e2e] rounded-xl p-4">
          <div className="text-2xl font-bold font-mono text-amber-400">
            {systems.length - connectedIds.size}
          </div>
          <div className="text-xs text-[#8888a0] mt-1">Standalone Systems</div>
        </div>
      </div>

      {/* Foundation systems */}
      <div className="bg-[#12121a] border border-[#1e1e2e] rounded-xl p-6">
        <h3 className="text-sm font-semibold text-[#f0f0f5] mb-4">
          Foundation Systems
          <span className="text-[#8888a0] font-normal ml-2">— most depended on</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {foundations.map(({ system: s, count }, i) => (
            <motion.div
              key={s!.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-3 bg-[#0a0a0f] rounded-lg p-3 border border-[#1e1e2e]/50"
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-lg"
                style={{ backgroundColor: `${CATEGORY_COLORS[s!.category]}20` }}
              >
                {s!.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <a
                  href={`/systems/${s!.slug}/`}
                  className="text-sm font-medium text-[#f0f0f5] hover:text-blue-400 transition-colors truncate block"
                >
                  {s!.name}
                </a>
                <div className="text-[10px] text-[#8888a0]">
                  {count} dependent{count !== 1 ? 's' : ''}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Dependency edge list by type */}
      <div className="bg-[#12121a] border border-[#1e1e2e] rounded-xl p-6">
        <h3 className="text-sm font-semibold text-[#f0f0f5] mb-4">
          Dependency Edges
          <span className="text-[#8888a0] font-normal ml-2">— all relationships</span>
        </h3>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 mb-4 pb-4 border-b border-[#1e1e2e]">
          {Object.entries(RELATIONSHIP_STYLES).map(([key, cfg]) => (
            <div key={key} className="flex items-center gap-2">
              <div
                className="w-6 h-0.5"
                style={{
                  backgroundColor: cfg.color,
                  borderStyle: cfg.dash ? 'dashed' : 'solid',
                  borderWidth: cfg.dash ? '1px' : 0,
                  borderColor: cfg.color,
                  height: cfg.dash ? 0 : 2,
                }}
              />
              <span className="text-[10px] text-[#8888a0]">{cfg.label}</span>
            </div>
          ))}
        </div>

        <div className="space-y-1.5 max-h-96 overflow-y-auto pr-2">
          {edges.map((edge, i) => {
            const source = systemMap.get(edge.sourceId);
            const target = systemMap.get(edge.targetId);
            if (!source || !target) return null;
            const style = RELATIONSHIP_STYLES[edge.relationship] ?? RELATIONSHIP_STYLES['depends-on'];
            return (
              <motion.div
                key={`${edge.sourceId}-${edge.targetId}-${i}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.03 }}
                className="flex items-center gap-2 py-1.5 px-3 rounded-lg hover:bg-[#0a0a0f]/50 transition-colors group text-sm"
              >
                <span className="text-xs">{source.emoji}</span>
                <a
                  href={`/systems/${source.slug}/`}
                  className="text-[#f0f0f5] hover:text-blue-400 transition-colors"
                >
                  {source.name}
                </a>
                <span
                  className="text-[10px] px-2 py-0.5 rounded font-mono"
                  style={{ color: style.color, backgroundColor: `${style.color}15` }}
                >
                  {style.label}
                </span>
                <span className="text-xs">{target.emoji}</span>
                <a
                  href={`/systems/${target.slug}/`}
                  className="text-[#f0f0f5] hover:text-blue-400 transition-colors"
                >
                  {target.name}
                </a>
                {edge.description && (
                  <span className="text-[10px] text-[#8888a0] ml-auto opacity-0 group-hover:opacity-100 transition-opacity hidden md:inline">
                    {edge.description}
                  </span>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Connected systems by category */}
      <div className="bg-[#12121a] border border-[#1e1e2e] rounded-xl p-6">
        <h3 className="text-sm font-semibold text-[#f0f0f5] mb-4">
          Connectivity Map
          <span className="text-[#8888a0] font-normal ml-2">— systems by category</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {connectedSystems
            .sort(
              (a, b) =>
                (inDegree.get(b.id) ?? 0) +
                (outDegree.get(b.id) ?? 0) -
                ((inDegree.get(a.id) ?? 0) + (outDegree.get(a.id) ?? 0)),
            )
            .map((s) => {
              const inD = inDegree.get(s.id) ?? 0;
              const outD = outDegree.get(s.id) ?? 0;
              return (
                <div
                  key={s.id}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg border border-[#1e1e2e]/50 hover:border-[#1e1e2e] transition-colors"
                >
                  <span className="text-sm">{s.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <a
                      href={`/systems/${s.slug}/`}
                      className="text-xs font-medium text-[#f0f0f5] hover:text-blue-400 truncate block"
                    >
                      {s.name}
                    </a>
                    <span className="text-[9px]" style={{ color: CATEGORY_COLORS[s.category] }}>
                      {CATEGORY_LABELS[s.category]}
                    </span>
                  </div>
                  <div className="text-right">
                    {inD > 0 && (
                      <div className="text-[9px] text-green-400">↙ {inD} in</div>
                    )}
                    {outD > 0 && (
                      <div className="text-[9px] text-blue-400">↗ {outD} out</div>
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
