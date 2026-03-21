import type { Metadata } from 'next';
import { systems } from '@/content/systems';
import ControlDashboard from '@/components/control/ControlDashboard';

export const metadata: Metadata = {
  title: 'Control Plane — Kevan Burns Empire',
  description:
    'Operational status, dependency map, capital view, and analytics across 58 infrastructure systems.',
};

export default function ControlPage() {
  return <ControlDashboard systems={systems} />;
}
