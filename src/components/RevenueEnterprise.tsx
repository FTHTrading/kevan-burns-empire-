'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Building2, Shield, Zap, Layers, DollarSign, FileText, Mail, Download } from 'lucide-react';

const revenueChannels = [
  {
    icon: <Layers className="w-5 h-5" />,
    title: 'Architecture Sprints',
    description: 'End-to-end sovereign system design for institutions, funds, and protocol teams.',
    range: '$25K — $150K',
    color: '#3b82f6',
  },
  {
    icon: <DollarSign className="w-5 h-5" />,
    title: 'Token Design & RWA Structuring',
    description: 'Deterministic tokenomics engineering and institutional-grade asset tokenization.',
    range: '$7.5K — $50K',
    color: '#8b5cf6',
  },
  {
    icon: <Shield className="w-5 h-5" />,
    title: 'Strategic Consulting',
    description: 'Monthly retainer for ongoing infrastructure advisory and protocol governance.',
    range: '$5K — $20K/mo',
    color: '#10b981',
  },
  {
    icon: <Zap className="w-5 h-5" />,
    title: 'KAIROS AI Licensing',
    description: 'Enterprise AI operating system deployment — agentic RAG, voice AI, document intelligence.',
    range: 'Custom',
    color: '#ec4899',
  },
  {
    icon: <FileText className="w-5 h-5" />,
    title: 'FTH Certification',
    description: 'Structured certification pathway for sovereign infrastructure mastery.',
    range: '$2.5K — $7.5K',
    color: '#06b6d4',
  },
  {
    icon: <Building2 className="w-5 h-5" />,
    title: 'Enterprise Licensing',
    description: 'Bronze through Platinum SLA tiers with dedicated architecture support.',
    range: '$10K — $100K+/yr',
    color: '#f59e0b',
  },
];

export default function RevenueEnterprise() {
  return (
    <section id="enterprise" className="relative py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-xs font-medium mb-6">
            <Building2 className="w-3.5 h-3.5" /> INSTITUTIONAL SERVICES
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Revenue-Grade Infrastructure
          </h2>
          <p className="text-[#8888a0] text-lg max-w-2xl mx-auto">
            Productized offerings for institutions, funds, protocols, and enterprises building on sovereign infrastructure.
          </p>
        </motion.div>

        {/* Revenue Channels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {revenueChannels.map((channel, index) => (
            <motion.div
              key={channel.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group relative rounded-2xl border border-[#1e1e2e] bg-[#12121a] p-6 hover:border-opacity-60 transition-all duration-500"
            >
              <div
                className="absolute top-0 left-6 right-6 h-px opacity-30"
                style={{ background: `linear-gradient(90deg, transparent, ${channel.color}, transparent)` }}
              />
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: `${channel.color}15`, color: channel.color }}
              >
                {channel.icon}
              </div>
              <h3 className="text-base font-bold text-white mb-2">{channel.title}</h3>
              <p className="text-sm text-[#8888a0] mb-4 leading-relaxed">{channel.description}</p>
              <span className="text-sm font-semibold" style={{ color: channel.color }}>
                {channel.range}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Lead Capture / Institutional CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-blue-500/15 bg-gradient-to-br from-blue-500/5 to-transparent p-8 md:p-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Institutional Engagement
              </h3>
              <p className="text-[#8888a0] mb-6 leading-relaxed">
                For institutions evaluating sovereign infrastructure partnerships, architecture consulting, 
                or enterprise licensing — start with the architecture review. Zero ambiguity, deterministic outcomes.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="/services"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold text-sm transition-all duration-300"
                >
                  View All Services
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="mailto:kevan.burns@fthtrading.com?subject=Institutional%20Architecture%20Review"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-[#2a2a3a] hover:border-blue-500/40 text-[#c0c0d0] hover:text-white rounded-lg font-semibold text-sm transition-all duration-300"
                >
                  <Mail className="w-4 h-4" />
                  Request Architecture Review
                </a>
              </div>
            </div>
            <div className="space-y-4">
              <div className="rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] p-4">
                <div className="flex items-center gap-3 mb-2">
                  <Download className="w-4 h-4 text-blue-400" />
                  <span className="text-sm font-semibold text-white">Infrastructure Overview Deck</span>
                </div>
                <p className="text-xs text-[#8888a0] mb-3">
                  Comprehensive overview of all sovereign systems, capabilities, and engagement models.
                </p>
                <a
                  href="mailto:kevan.burns@fthtrading.com?subject=Infrastructure%20Deck%20Request"
                  className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Request Deck →
                </a>
              </div>
              <div className="rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] p-4">
                <div className="flex items-center gap-3 mb-2">
                  <FileText className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm font-semibold text-white">Technical Case Studies</span>
                </div>
                <p className="text-xs text-[#8888a0] mb-3">
                  Deep dives into sovereign infrastructure builds — from architecture to execution.
                </p>
                <a
                  href="/blog"
                  className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  Read Case Studies →
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
