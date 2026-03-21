import type { Metadata } from 'next';
import { systems } from '@/content/systems';
import { getSystemBySlug, getRelatedSystems } from '@/lib/atlas';
import SystemDetailClient from '@/components/atlas/SystemDetail';

// Static export: generate all slug pages at build time
export function generateStaticParams() {
  return systems.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const system = getSystemBySlug(systems, params.slug);
  if (!system) return { title: 'System Not Found' };
  return {
    title: `${system.name} — ${system.subtitle} | Infrastructure Atlas`,
    description: system.description.slice(0, 200),
  };
}

export default function SystemPage({ params }: { params: { slug: string } }) {
  const system = getSystemBySlug(systems, params.slug);

  if (!system) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-2">System Not Found</h1>
          <p className="text-[#8888a0] text-sm mb-6">
            No system with slug &quot;{params.slug}&quot; exists in the registry.
          </p>
          <a
            href="/systems/"
            className="px-4 py-2 bg-blue-600/10 border border-blue-600/25 text-blue-400 rounded-lg text-sm hover:bg-blue-600/20 transition-colors"
          >
            Back to Atlas
          </a>
        </div>
      </div>
    );
  }

  const related = getRelatedSystems(systems, system);

  return <SystemDetailClient system={system} relatedSystems={related} />;
}
