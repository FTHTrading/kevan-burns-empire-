// ─────────────────────────────────────────────────────────────────────────────
// Atlas Utilities — filtering, sorting, search, and ecosystem metrics
// ─────────────────────────────────────────────────────────────────────────────

import type {
  System,
  SystemCategory,
  Chain,
  Brand,
  MaturityLevel,
  EcosystemMetrics,
} from '@/types/system';
import { MATURITY_ORDER } from '@/types/system';

// ── Search ───────────────────────────────────────────────────────────────────

export function searchSystems(systems: System[], query: string): System[] {
  if (!query.trim()) return systems;
  const q = query.toLowerCase();
  return systems.filter(
    (s) =>
      s.name.toLowerCase().includes(q) ||
      s.subtitle.toLowerCase().includes(q) ||
      s.tagline.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q) ||
      s.id.toLowerCase().includes(q) ||
      s.features.some((f) => f.toLowerCase().includes(q)) ||
      (s.techStack?.some((t) => t.toLowerCase().includes(q)) ?? false) ||
      (s.business?.marketCategory?.toLowerCase().includes(q) ?? false),
  );
}

// ── Filters ──────────────────────────────────────────────────────────────────

export interface AtlasFilters {
  category?: SystemCategory;
  chain?: Chain;
  brand?: Brand;
  maturity?: MaturityLevel;
  search?: string;
}

export function filterSystems(systems: System[], filters: AtlasFilters): System[] {
  let result = systems;
  if (filters.search) result = searchSystems(result, filters.search);
  if (filters.category) result = result.filter((s) => s.category === filters.category);
  if (filters.chain) result = result.filter((s) => s.chainTargets?.includes(filters.chain!));
  if (filters.brand) result = result.filter((s) => s.brand === filters.brand);
  if (filters.maturity) result = result.filter((s) => s.maturity === filters.maturity);
  return result;
}

// ── Sorting ──────────────────────────────────────────────────────────────────

export type SortKey = 'name' | 'maturity' | 'category' | 'brand';

export function sortSystems(systems: System[], sortBy: SortKey): System[] {
  const sorted = [...systems];
  switch (sortBy) {
    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'maturity':
      return sorted.sort((a, b) => MATURITY_ORDER[b.maturity] - MATURITY_ORDER[a.maturity]);
    case 'category':
      return sorted.sort((a, b) => a.category.localeCompare(b.category));
    case 'brand':
      return sorted.sort((a, b) => a.brand.localeCompare(b.brand));
    default:
      return sorted;
  }
}

// ── Ecosystem Metrics ────────────────────────────────────────────────────────

export function computeEcosystemMetrics(systems: System[]): EcosystemMetrics {
  const byMaturity: Partial<Record<MaturityLevel, number>> = {};
  const byCategory: Partial<Record<SystemCategory, number>> = {};
  const byChain: Partial<Record<Chain, number>> = {};
  const byBrand: Partial<Record<Brand, number>> = {};

  const chainSet = new Set<Chain>();
  let totalApis = 0;
  let totalContainers = 0;
  let totalDatabases = 0;
  let totalAgents = 0;
  let totalContracts = 0;

  for (const s of systems) {
    // Maturity
    byMaturity[s.maturity] = (byMaturity[s.maturity] ?? 0) + 1;
    // Category
    byCategory[s.category] = (byCategory[s.category] ?? 0) + 1;
    // Brand
    byBrand[s.brand] = (byBrand[s.brand] ?? 0) + 1;
    // Chains
    for (const c of s.chainTargets ?? []) {
      chainSet.add(c);
      byChain[c] = (byChain[c] ?? 0) + 1;
    }
    // Metrics
    if (s.metrics) {
      totalApis += s.metrics.apiCount ?? 0;
      totalContainers += s.metrics.containerCount ?? 0;
      totalDatabases += s.metrics.datastoreCount ?? 0;
      totalAgents += s.metrics.agentCount ?? 0;
      totalContracts += s.metrics.contractCount ?? 0;
    }
  }

  const liveLevels: MaturityLevel[] = ['live', 'production'];
  const researchLevels: MaturityLevel[] = ['thesis', 'designed', 'prototype'];

  return {
    totalSystems: systems.length,
    productionSystems: systems.filter((s) => s.maturity === 'production').length,
    liveSystems: systems.filter((s) => liveLevels.includes(s.maturity)).length,
    researchSystems: systems.filter((s) => researchLevels.includes(s.maturity)).length,
    chainsIntegrated: chainSet.size,
    totalApis,
    totalContainers,
    totalDatabases,
    totalAgents,
    totalContracts,
    totalBrands: new Set(systems.map((s) => s.brand)).size,
    totalCategories: new Set(systems.map((s) => s.category)).size,
    flagshipCount: systems.filter((s) => s.flagship).length,
    byMaturity,
    byCategory,
    byChain,
    byBrand,
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

export function getSystemBySlug(systems: System[], slug: string): System | undefined {
  return systems.find((s) => s.slug === slug);
}

export function getRelatedSystems(systems: System[], system: System): System[] {
  if (!system.relatedSystemIds?.length) return [];
  return systems.filter((s) => system.relatedSystemIds!.includes(s.id));
}

export function getSystemsByCategory(systems: System[], category: SystemCategory): System[] {
  return systems.filter((s) => s.category === category);
}

export function getSystemsByChain(systems: System[], chain: Chain): System[] {
  return systems.filter((s) => s.chainTargets?.includes(chain));
}

export function getSystemsByBrand(systems: System[], brand: Brand): System[] {
  return systems.filter((s) => s.brand === brand);
}

/** Unique categories present in the given systems array. */
export function getActiveCategories(systems: System[]): SystemCategory[] {
  return Array.from(new Set(systems.map((s) => s.category)));
}

/** Unique chains present in the given systems array. */
export function getActiveChains(systems: System[]): Chain[] {
  const chains = new Set<Chain>();
  for (const s of systems) for (const c of s.chainTargets ?? []) chains.add(c);
  return Array.from(chains);
}

/** Unique brands present in the given systems array. */
export function getActiveBrands(systems: System[]): Brand[] {
  return Array.from(new Set(systems.map((s) => s.brand)));
}

/** Unique maturity levels present in the given systems array. */
export function getActiveMaturities(systems: System[]): MaturityLevel[] {
  return Array.from(new Set(systems.map((s) => s.maturity)));
}
