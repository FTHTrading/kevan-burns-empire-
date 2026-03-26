import { Metadata } from 'next';
import DiligencePageClient from './DiligencePageClient';

export const metadata: Metadata = {
  title: 'Due Diligence | Kevan Burns — Portfolio',
  description:
    'Full diligence room: legal document summaries, capital position analysis, risk flags, proof surfaces, and reconciliation notes for the Kevan Burns portfolio.',
};

export default function DiligencePage() {
  return <DiligencePageClient />;
}
