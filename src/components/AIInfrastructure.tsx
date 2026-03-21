'use client';

import { motion } from 'framer-motion';
import { Brain, Mic, FileSearch, Bot, Shield, Cpu } from 'lucide-react';

const aiSystems = [
  {
    icon: Brain,
    name: 'KAIROS',
    description: 'Local Sovereign AI Operating System — zero cloud dependency, full data sovereignty, deterministic runtime.',
    color: '#EC4899',
  },
  {
    icon: Bot,
    name: 'Agentic RAG Systems',
    description: 'Multi-agent retrieval-augmented generation for deterministic document intelligence and knowledge synthesis.',
    color: '#8B5CF6',
  },
  {
    icon: Mic,
    name: 'Voice Runtime',
    description: 'XTTS + Wake Word — sovereign voice interface with local speech synthesis and recognition.',
    color: '#3B82F6',
  },
  {
    icon: FileSearch,
    name: 'Document Intelligence',
    description: 'Deterministic document processing, extraction, and semantic analysis for institutional-grade data pipelines.',
    color: '#14B8A6',
  },
  {
    icon: Shield,
    name: 'AI Compliance Validation',
    description: 'Automated compliance checking and regulatory validation powered by deterministic AI inference.',
    color: '#F59E0B',
  },
  {
    icon: Cpu,
    name: 'MCP Agentic Infrastructure',
    description: 'Model Context Protocol integration for marketing automation, content distribution, and sovereign digital presence management.',
    color: '#22C55E',
  },
];

export default function AIInfrastructure() {
  return (
    <section className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            🧪 AI Infrastructure
          </h2>
          <p className="text-[#8888a0] text-lg max-w-2xl mx-auto">
            Sovereign AI systems — local-first, deterministic, and fully autonomous.
          </p>
        </motion.div>

        {/* AI Systems Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aiSystems.map((system, index) => {
            const Icon = system.icon;
            return (
              <motion.div
                key={system.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-xl border border-[#1e1e2e] bg-[#12121a] hover:border-opacity-60 transition-all duration-300"
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${system.color}15` }}
                >
                  <Icon className="w-6 h-6" style={{ color: system.color }} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{system.name}</h3>
                <p className="text-sm text-[#8888a0] leading-relaxed">{system.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* KAIROS Callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 p-8 rounded-xl border border-pink-500/20 bg-gradient-to-r from-pink-500/5 to-purple-500/5"
        >
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-pink-500/10 flex items-center justify-center">
              <Brain className="w-7 h-7 text-pink-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">KAIROS — The Sovereign OS</h3>
              <p className="text-[#c0c0d0] leading-relaxed mb-4">
                KAIROS is not a chatbot wrapper. It&apos;s a full local AI operating system — running deterministic inference, 
                agentic RAG pipelines, voice interfaces, and document intelligence without any cloud dependency. 
                Built for sovereignty. Built for institutions that refuse to hand their data to third parties.
              </p>
              <a
                href="https://fthtrading.github.io/DOCS/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-pink-400 hover:text-pink-300 transition-colors"
              >
                Explore Documentation →
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
