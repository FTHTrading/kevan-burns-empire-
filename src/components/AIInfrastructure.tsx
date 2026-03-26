'use client';

import { motion } from 'framer-motion';
import { Brain, Mic, FileSearch, Bot, Shield, Cpu } from 'lucide-react';

const aiSystems = [
  {
    icon: Brain,
    name: 'KAIROS — Supervisory AI',
    description: 'Multi-agent AI cognitive layer running across all 60 systems — LLM orchestration, RAG pipelines, deterministic simulation integration, and continuous autonomous compliance surveillance.',
    color: '#EC4899',
  },
  {
    icon: Cpu,
    name: 'x402 AI-Native Payments',
    description: 'HTTP 402 payment protocol engineered for AI-to-AI commerce. Flow: request → 402 challenge → Ed25519 cryptographic proof → instant USDF settlement. Runs edge-first on Cloudflare Workers. Live at x402.unykorn.org.',
    color: '#14B8A6',
  },
  {
    icon: Bot,
    name: 'Agentic RAG Systems',
    description: 'Multi-agent retrieval-augmented generation for deterministic document intelligence — institutional knowledge synthesis with auditable citation chains and zero hallucination guarantees.',
    color: '#8B5CF6',
  },
  {
    icon: Shield,
    name: 'AI Compliance Validation',
    description: 'Automated compliance checking with OFAC SDN sanctions screening, automated SAR/CTR regulatory filing, and AI-driven AML/KYC validation across TRON and XRPL settlement rails.',
    color: '#F59E0B',
  },
  {
    icon: FileSearch,
    name: 'Document Intelligence',
    description: 'Deterministic document processing, extraction, and semantic analysis — SHA-256 proof chains on every output, institutional-grade audit trail by default.',
    color: '#3B82F6',
  },
  {
    icon: Mic,
    name: 'Rust Native AI Runtimes',
    description: 'Unykorn Layer 1 and the Popeye-Tars-Mars-Tev multi-agent cluster are fully Rust-native — deterministic memory safety, gRPC transport, and no runtime garbage collection. Built for sovereign infrastructure, not demos.',
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
                KAIROS is not a chatbot wrapper. It&apos;s a multi-agent supervisory AI layer operating across all 60 systems — running LLM orchestration, RAG pipelines, and autonomous compliance surveillance without cloud dependency. 
                The x402 Protocol extends this: HTTP 402 challenge-response with Ed25519 cryptographic proof verification running edge-first on Cloudflare Workers — AI agents paying AI agents, settled in USDF, no intermediary required. 
                Both are in production. Both are live.
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
