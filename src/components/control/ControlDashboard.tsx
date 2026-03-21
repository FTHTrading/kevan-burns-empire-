'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { System } from '@/types/system';
import {
  buildControlViews,
  computeEcosystemMetrics,
  buildDependencyGraph,
  countByPriority,
} from '@/lib/atlas';
import StatusTable from '@/components/control/StatusTable';
import MaturityChart from '@/components/control/MaturityChart';
import CapitalView from '@/components/control/CapitalView';
import DependencyGraph from '@/components/control/DependencyGraph';

type ControlTab = 'status' | 'capital' | 'dependencies' | 'analytics';

const TABS: { id: ControlTab; label: string; emoji: string }[] = [
  { id: 'status', label: 'System Status', emoji: '⚡' },
  { id: 'capital', label: 'Capital View', emoji: '💰' },
  { id: 'dependencies', label: 'Dependencies', emoji: '🗺️' },
  { id: 'analytics', label: 'Analytics', emoji: '📊' },
];

interface ControlDashboardProps {
  systems: System[];
}

export default function ControlDashboard({ systems }: ControlDashboardProps) {
  const [activeTab, setActiveTab] = useState<ControlTab>('status');

  const controlViews = useMemo(() => buildControlViews(systems), [systems]);
  const metrics = useMemo(() => computeEcosystemMetrics(systems), [systems]);
  const edges = useMemo(() => buildDependencyGraph(systems), [systems]);
  const priorities = useMemo(() => countByPriority(systems), [systems]);

  const operational = controlViews.filter((v) => v.status === 'operational').length;
  const degraded = controlViews.filter((v) => v.status === 'degraded').length;
  const development = controlViews.filter((v) => v.status === 'development').length;
  const withLiveUrl = controlViews.filter((v) => v.hasLiveUrl).length;
  const revenueReady = controlViews.filter((v) => v.revenueReady).length;

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Fixed header */}
      <div className="sticky top-16 z-30 bg-[#0a0a0f]/90 backdrop-blur-xl border-b border-[#1e1e2e]">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
            <div>
              <div className="flex items-center gap-2">
                <a href="/systems/" className="text-[#8888a0] hover:text-white text-xs transition-colors">
                  ← Atlas
                </a>
                <span className="text-[#8888a0]/40 text-xs">/</span>
                <span className="text-xs text-blue-400 font-medium">Control Plane</span>
              </div>
              <h1 className="text-xl font-bold text-[#f0f0f5] mt-1">
                ⚡ Control Plane
              </h1>
            </div>

            {/* Quick stats */}
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-[#8888a0]">{operational} operational</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span className="text-[#8888a0]">{degraded} degraded</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-indigo-400" />
                <span className="text-[#8888a0]">{development} in dev</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Metric grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
          {[
            { label: 'Systems', value: metrics.totalSystems, color: '#f0f0f5' },
            { label: 'Operational', value: operational, color: '#22c55e' },
            { label: 'Live URLs', value: withLiveUrl, color: '#3b82f6' },
            { label: 'Revenue Ready', value: revenueReady, color: '#10b981' },
            { label: 'Flagships', value: priorities.flagship, color: '#eab308' },
            { label: 'Strategic', value: priorities.strategic, color: '#a855f7' },
            { label: 'Chains', value: metrics.chainsIntegrated, color: '#7c3aed' },
            { label: 'Brands', value: metrics.totalBrands, color: '#ec4899' },
          ].map((m) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#12121a] border border-[#1e1e2e] rounded-xl p-3 text-center"
            >
              <div className="text-xl font-bold font-mono" style={{ color: m.color }}>
                {m.value}
              </div>
              <div className="text-[10px] text-[#8888a0] mt-0.5">{m.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Tab bar */}
        <div className="flex items-center gap-1 bg-[#12121a] border border-[#1e1e2e] rounded-xl p-1.5 overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-600/30'
                  : 'text-[#8888a0] hover:text-white hover:bg-[#1e1e2e]/50 border border-transparent'
              }`}
              aria-label={`Switch to ${tab.label} tab`}
            >
              <span>{tab.emoji}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'status' && (
              <div className="space-y-6">
                <div className="bg-[#12121a] border border-[#1e1e2e] rounded-xl overflow-hidden">
                  <div className="px-6 py-4 border-b border-[#1e1e2e]">
                    <h2 className="text-sm font-semibold text-[#f0f0f5]">
                      System Status Matrix
                      <span className="text-[#8888a0] font-normal ml-2">
                        — {systems.length} systems
                      </span>
                    </h2>
                  </div>
                  <StatusTable views={controlViews} />
                </div>
              </div>
            )}

            {activeTab === 'capital' && <CapitalView views={controlViews} />}

            {activeTab === 'dependencies' && (
              <DependencyGraph systems={systems} edges={edges} />
            )}

            {activeTab === 'analytics' && <MaturityChart systems={systems} />}
          </motion.div>
        </AnimatePresence>

        {/* Five Questions */}
        <div className="bg-[#12121a] border border-[#1e1e2e] rounded-xl p-6">
          <h3 className="text-sm font-semibold text-[#f0f0f5] mb-4">
            Infrastructure at a Glance
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              {
                q: 'What exists?',
                a: `${metrics.totalSystems} systems across ${metrics.totalBrands} brands`,
                color: '#f0f0f5',
              },
              {
                q: 'What is live?',
                a: `${operational} operational, ${withLiveUrl} with live URLs`,
                color: '#22c55e',
              },
              {
                q: 'What is connected?',
                a: `${edges.length} dependency edges across ${new Set([...edges.map((e) => e.sourceId), ...edges.map((e) => e.targetId)]).size} nodes`,
                color: '#a855f7',
              },
              {
                q: 'What is valuable?',
                a: `${revenueReady} revenue-ready, ${priorities.flagship} flagships`,
                color: '#eab308',
              },
              {
                q: 'What gets built next?',
                a: `${development} in development, ${priorities.experimental} experimental`,
                color: '#3b82f6',
              },
            ].map((item) => (
              <div key={item.q} className="space-y-1">
                <div className="text-xs font-semibold" style={{ color: item.color }}>
                  {item.q}
                </div>
                <div className="text-xs text-[#8888a0]">{item.a}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
