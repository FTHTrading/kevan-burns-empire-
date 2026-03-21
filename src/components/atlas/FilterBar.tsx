'use client';

import { Search, X, SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';
import type { SystemCategory, Chain, Brand, MaturityLevel } from '@/types/system';
import {
  CATEGORY_LABELS,
  CHAIN_LABELS,
  BRAND_LABELS,
  MATURITY_COLORS,
} from '@/types/system';
import type { AtlasFilters, SortKey } from '@/lib/atlas';

const MATURITY_LABELS: Record<MaturityLevel, string> = {
  thesis: 'Thesis',
  designed: 'Designed',
  prototype: 'Prototype',
  internal: 'Internal',
  testnet: 'Testnet',
  pilot: 'Pilot',
  live: 'Live',
  production: 'Production',
  'audit-mode': 'Audit Mode',
  archived: 'Archived',
};

interface Props {
  filters: AtlasFilters;
  onFiltersChange: (filters: AtlasFilters) => void;
  sortBy: SortKey;
  onSortChange: (sort: SortKey) => void;
  activeCategories: SystemCategory[];
  activeChains: Chain[];
  activeBrands: Brand[];
  activeMaturities: MaturityLevel[];
  resultCount: number;
  totalCount: number;
}

export default function FilterBar({
  filters,
  onFiltersChange,
  sortBy,
  onSortChange,
  activeCategories,
  activeChains,
  activeBrands,
  activeMaturities,
  resultCount,
  totalCount,
}: Props) {
  const [expanded, setExpanded] = useState(false);

  const hasActiveFilters = !!(filters.category || filters.chain || filters.brand || filters.maturity);
  const clearAll = () => onFiltersChange({ search: filters.search });

  const set = (key: keyof AtlasFilters, value: string | undefined) =>
    onFiltersChange({ ...filters, [key]: value });

  return (
    <div className="space-y-3">
      {/* Search + toggle row */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#555570]" />
          <input
            type="text"
            placeholder="Search systems..."
            value={filters.search ?? ''}
            onChange={(e) => set('search', e.target.value || undefined)}
            className="w-full pl-10 pr-4 py-2.5 bg-[#12121a] border border-[#1e1e2e] rounded-lg text-sm text-white placeholder-[#555570] focus:outline-none focus:border-blue-600/50 transition-colors"
          />
          {filters.search && (
            <button
              onClick={() => set('search', undefined)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#555570] hover:text-white"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border text-sm font-medium transition-colors ${
            expanded || hasActiveFilters
              ? 'bg-blue-600/10 border-blue-600/30 text-blue-400'
              : 'bg-[#12121a] border-[#1e1e2e] text-[#8888a0] hover:text-white'
          }`}
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span className="hidden sm:inline">Filters</span>
          {hasActiveFilters && (
            <span className="w-4 h-4 rounded-full bg-blue-600 text-[10px] text-white flex items-center justify-center font-bold">
              {[filters.category, filters.chain, filters.brand, filters.maturity].filter(Boolean).length}
            </span>
          )}
        </button>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as SortKey)}
          aria-label="Sort systems by"
          className="px-3 py-2.5 bg-[#12121a] border border-[#1e1e2e] rounded-lg text-sm text-[#8888a0] focus:outline-none focus:border-blue-600/50"
        >
          <option value="name">A → Z</option>
          <option value="maturity">Maturity</option>
          <option value="category">Category</option>
          <option value="brand">Brand</option>
        </select>
      </div>

      {/* Result count */}
      <div className="flex items-center justify-between text-xs text-[#555570]">
        <span>
          {resultCount === totalCount
            ? `${totalCount} systems`
            : `${resultCount} of ${totalCount} systems`}
        </span>
        {hasActiveFilters && (
          <button onClick={clearAll} className="text-blue-400 hover:text-blue-300 transition-colors">
            Clear filters
          </button>
        )}
      </div>

      {/* Expanded filter panel */}
      {expanded && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 p-4 rounded-xl border border-[#1e1e2e] bg-[#0d0d14]">
          {/* Category */}
          <div>
            <label className="block text-[10px] font-semibold text-[#555570] uppercase tracking-wider mb-1.5">
              Category
            </label>
            <select
              value={filters.category ?? ''}
              onChange={(e) => set('category', e.target.value || undefined)}
              aria-label="Filter by category"
              className="w-full px-2.5 py-2 rounded-lg bg-[#12121a] border border-[#1e1e2e] text-xs text-white focus:outline-none focus:border-blue-600/50"
            >
              <option value="">All categories</option>
              {activeCategories.map((c) => (
                <option key={c} value={c}>
                  {CATEGORY_LABELS[c]}
                </option>
              ))}
            </select>
          </div>

          {/* Chain */}
          <div>
            <label className="block text-[10px] font-semibold text-[#555570] uppercase tracking-wider mb-1.5">
              Chain
            </label>
            <select
              value={filters.chain ?? ''}
              onChange={(e) => set('chain', e.target.value || undefined)}
              aria-label="Filter by chain"
              className="w-full px-2.5 py-2 rounded-lg bg-[#12121a] border border-[#1e1e2e] text-xs text-white focus:outline-none focus:border-blue-600/50"
            >
              <option value="">All chains</option>
              {activeChains.map((c) => (
                <option key={c} value={c}>
                  {CHAIN_LABELS[c]}
                </option>
              ))}
            </select>
          </div>

          {/* Brand */}
          <div>
            <label className="block text-[10px] font-semibold text-[#555570] uppercase tracking-wider mb-1.5">
              Brand
            </label>
            <select
              value={filters.brand ?? ''}
              onChange={(e) => set('brand', e.target.value || undefined)}
              aria-label="Filter by brand"
              className="w-full px-2.5 py-2 rounded-lg bg-[#12121a] border border-[#1e1e2e] text-xs text-white focus:outline-none focus:border-blue-600/50"
            >
              <option value="">All brands</option>
              {activeBrands.map((b) => (
                <option key={b} value={b}>
                  {BRAND_LABELS[b]}
                </option>
              ))}
            </select>
          </div>

          {/* Maturity */}
          <div>
            <label className="block text-[10px] font-semibold text-[#555570] uppercase tracking-wider mb-1.5">
              Maturity
            </label>
            <select
              value={filters.maturity ?? ''}
              onChange={(e) => set('maturity', e.target.value || undefined)}
              aria-label="Filter by maturity"
              className="w-full px-2.5 py-2 rounded-lg bg-[#12121a] border border-[#1e1e2e] text-xs text-white focus:outline-none focus:border-blue-600/50"
            >
              <option value="">All levels</option>
              {activeMaturities.map((m) => (
                <option key={m} value={m}>
                  {MATURITY_LABELS[m]}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Active filter chips */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {filters.category && (
            <FilterChip label={CATEGORY_LABELS[filters.category]} onRemove={() => set('category', undefined)} />
          )}
          {filters.chain && (
            <FilterChip label={CHAIN_LABELS[filters.chain]} onRemove={() => set('chain', undefined)} />
          )}
          {filters.brand && (
            <FilterChip label={BRAND_LABELS[filters.brand]} onRemove={() => set('brand', undefined)} />
          )}
          {filters.maturity && (
            <FilterChip
              label={MATURITY_LABELS[filters.maturity]}
              color={MATURITY_COLORS[filters.maturity]}
              onRemove={() => set('maturity', undefined)}
            />
          )}
        </div>
      )}
    </div>
  );
}

function FilterChip({
  label,
  color,
  onRemove,
}: {
  label: string;
  color?: string;
  onRemove: () => void;
}) {
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border transition-colors"
      style={{
        background: color ? `${color}15` : 'rgba(59,130,246,.1)',
        color: color ?? '#60a5fa',
        borderColor: color ? `${color}30` : 'rgba(59,130,246,.25)',
      }}
    >
      {label}
      <button onClick={onRemove} className="hover:opacity-70 transition-opacity" aria-label={`Remove ${label} filter`}>
        <X className="w-3 h-3" />
      </button>
    </span>
  );
}
