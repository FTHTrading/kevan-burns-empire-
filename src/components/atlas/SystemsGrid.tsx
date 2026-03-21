'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { systems } from '@/content/systems';
import {
  filterSystems,
  sortSystems,
  computeEcosystemMetrics,
  getActiveCategories,
  getActiveChains,
  getActiveBrands,
  getActiveMaturities,
  type AtlasFilters,
  type SortKey,
} from '@/lib/atlas';
import FilterBar from '@/components/atlas/FilterBar';
import SystemCard from '@/components/atlas/SystemCard';
import EcosystemStats from '@/components/atlas/EcosystemStats';

export default function SystemsGrid() {
  const [filters, setFilters] = useState<AtlasFilters>({});
  const [sortBy, setSortBy] = useState<SortKey>('name');

  const metrics = useMemo(() => computeEcosystemMetrics(systems), []);
  const activeCategories = useMemo(() => getActiveCategories(systems), []);
  const activeChains = useMemo(() => getActiveChains(systems), []);
  const activeBrands = useMemo(() => getActiveBrands(systems), []);
  const activeMaturities = useMemo(() => getActiveMaturities(systems), []);

  const result = useMemo(
    () => sortSystems(filterSystems(systems, filters), sortBy),
    [filters, sortBy],
  );

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Header */}
      <div className="pt-24 pb-8 px-6 border-b border-[#1e1e2e]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-2">
              Infrastructure Atlas
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
              Systems Registry
            </h1>
            <p className="text-[#8888a0] text-sm sm:text-base max-w-2xl">
              Canonical index of every system in the Burns / UnyKorn / FTH ecosystem.
              Filter by category, chain, brand, or maturity.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Ecosystem stats */}
        <EcosystemStats metrics={metrics} />

        {/* Filter bar */}
        <FilterBar
          filters={filters}
          onFiltersChange={setFilters}
          sortBy={sortBy}
          onSortChange={setSortBy}
          activeCategories={activeCategories}
          activeChains={activeChains}
          activeBrands={activeBrands}
          activeMaturities={activeMaturities}
          resultCount={result.length}
          totalCount={systems.length}
        />

        {/* Grid */}
        {result.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {result.map((system, i) => (
              <SystemCard key={system.id} system={system} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-[#555570] text-lg">No systems match your filters.</p>
            <button
              onClick={() => setFilters({})}
              className="mt-3 text-blue-400 text-sm hover:text-blue-300 transition-colors"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
