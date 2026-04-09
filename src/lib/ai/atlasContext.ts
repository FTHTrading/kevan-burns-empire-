import { systems } from '@/content/systems';
import { brands } from '@/content/brands';
import { featuredCollections, stackPathways } from '@/content/featured';
import { portfolioMetrics } from '@/lib/portfolioMetrics';

const liveStatuses = new Set(['live', 'production']);

export const assistantQuickPrompts = [
  'What does the full stack actually do?',
  'Which systems are most important right now?',
  'How should someone move forward with this portfolio?',
  'What is live today versus still experimental?',
] as const;

export function buildAtlasContext(): string {
  const liveSystems = systems.filter((system) => liveStatuses.has(system.maturity));
  const flagshipSystems = systems.filter((system) => system.flagship);
  const strategicSystems = systems.filter((system) => system.strategicPriority === 'strategic');

  const systemSummary = systems
    .slice(0, 24)
    .map((system) => {
      const role = system.business?.strategicRole ?? system.business?.marketCategory ?? system.tagline;
      return [
        `${system.name} [${system.id}]`,
        `brand=${system.brand}`,
        `category=${system.category}`,
        `maturity=${system.maturity}`,
        `priority=${system.strategicPriority}`,
        `role=${role}`,
      ].join(' | ');
    })
    .join('\n');

  const collectionSummary = featuredCollections
    .map((collection) => `${collection.name}: ${collection.description} Systems=${collection.systemIds.join(', ')}`)
    .join('\n');

  const pathwaySummary = stackPathways
    .map((pathway) => `${pathway.name}: ${pathway.description} Flow=${pathway.systemIds.join(' -> ')}`)
    .join('\n');

  const brandSummary = brands
    .map((brand) => `${brand.label}: ${brand.description}`)
    .join('\n');

  return [
    'Atlas context for Kevan Burns infrastructure portfolio:',
    `- Total systems: ${portfolioMetrics.systemCount}`,
    `- Live systems: ${portfolioMetrics.liveCount}`,
    `- Chains integrated: ${portfolioMetrics.chainCount}`,
    `- Passing assertions: ${portfolioMetrics.passingAssertions}`,
    `- Simulated worlds: ${portfolioMetrics.worldsSimulated}`,
    `- Flagship systems: ${flagshipSystems.map((system) => system.name).join(', ')}`,
    `- Strategic systems: ${strategicSystems.slice(0, 12).map((system) => system.name).join(', ')}`,
    `- Live platforms sample: ${liveSystems.slice(0, 12).map((system) => system.name).join(', ')}`,
    '',
    'Featured collections:',
    collectionSummary,
    '',
    'Stack pathways:',
    pathwaySummary,
    '',
    'Brands:',
    brandSummary,
    '',
    'Representative system registry:',
    systemSummary,
    '',
    'Important routes:',
    '- /systems = full stack registry and detail pages',
    '- /control = control plane, dependencies, capital view, deal pipeline',
    '- /diligence = legal docs, capital positions, diligence risk flags',
    '- /funding = funding narratives and raise pathways',
    '- /proof = proof surfaces and live verification',
    '',
    'Guidance constraints:',
    '- Be concrete about what exists, what is live, and what is still research or contingent.',
    '- When asked how to move forward, recommend specific next routes, systems, or diligence steps.',
    '- For capital questions, distinguish built systems, the Sponsor Note, and NDCF participation.',
  ].join('\n');
}

export function buildLocalFallback(message: string): string {
  const lower = message.toLowerCase();

  if (lower.includes('move forward') || lower.includes('next step') || lower.includes('what next')) {
    return [
      'Best next move depends on the goal:',
      '• Technical review: start with /systems, then /control for dependencies and live status.',
      '• Capital review: go to /funding, then /diligence for the documented stack and diligence flags.',
      '• Proof-first review: use /proof to verify live and on-chain surfaces.',
      '• AI layer review: focus on KAIROS, GMIIE, DICS, DonkAI, and the AI Intelligence Layer pathway.',
    ].join('\n');
  }

  if (lower.includes('what does') || lower.includes('full stack') || lower.includes('what is this')) {
    return `This portfolio presents ${portfolioMetrics.systemCount} systems across capital infrastructure, AI supervision, compliance, research, tokenization, and sovereign operations. The core stack centers on FTH OS, UnyKorn, OPTKAS, KAIROS, Genesis Protocol, Helios, and the supporting proof/compliance rails.`;
  }

  if (lower.includes('live') || lower.includes('production')) {
    const liveSample = systems
      .filter((system) => liveStatuses.has(system.maturity))
      .slice(0, 8)
      .map((system) => system.name)
      .join(', ');
    return `There are ${portfolioMetrics.liveCount} live or production systems. Sample live systems: ${liveSample}. Use /control for the operational view and /systems for full detail.`;
  }

  return 'The stack is a live portfolio of capital, AI, compliance, and research systems. Ask about the stack purpose, live systems, flagship systems, pathways, or the best next step, and I will ground the answer in the registry.';
}
