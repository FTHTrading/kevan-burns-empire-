'use client';

import { ViewProvider } from '@/context/ViewContext';
import Navbar from '@/components/Navbar';
import ViewToggle from '@/components/ViewToggle';
import Hero from '@/components/Hero';
import PlatformsGrid from '@/components/PlatformsGrid';
import Capabilities from '@/components/Capabilities';
import Differentiators from '@/components/Differentiators';
import AIInfrastructure from '@/components/AIInfrastructure';
import Research from '@/components/Research';
import LeadCapture from '@/components/LeadCapture';
import RevenueEnterprise from '@/components/RevenueEnterprise';
import ContactCTA from '@/components/ContactCTA';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <ViewProvider>
      <Navbar />
      <ViewToggle />
      <main>
        <Hero />
        <div className="section-divider" />
        <PlatformsGrid />
        <div className="section-divider" />
        <Capabilities />
        <div className="section-divider" />
        <Differentiators />
        <div className="section-divider" />
        <AIInfrastructure />
        <div className="section-divider" />
        <Research />
        <div className="section-divider" />
        <LeadCapture />
        <div className="section-divider" />
        <RevenueEnterprise />
        <div className="section-divider" />
        <ContactCTA />
      </main>
      <Footer />
    </ViewProvider>
  );
}
