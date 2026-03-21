import type { Metadata } from 'next';
import SystemsGrid from '@/components/atlas/SystemsGrid';

export const metadata: Metadata = {
  title: 'Systems Registry | Kevan Burns Infrastructure Atlas',
  description:
    'Canonical index of every system in the Burns / UnyKorn / FTH ecosystem. 50+ systems spanning capital infrastructure, AI intelligence, tokenization, compliance, and research.',
};

export default function SystemsPage() {
  return <SystemsGrid />;
}
