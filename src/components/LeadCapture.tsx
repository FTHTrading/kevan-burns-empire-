'use client';

import { motion } from 'framer-motion';
import { Mail, Zap, BookOpen, FileText, ArrowRight } from 'lucide-react';

const leadMagnets = [
  {
    icon: <FileText className="w-5 h-5" />,
    title: 'Sovereign Infrastructure Playbook',
    description: 'The complete guide to building deterministic systems that eliminate discretionary trust — from architecture to deployment.',
    type: 'PDF Guide',
    color: '#3b82f6',
  },
  {
    icon: <BookOpen className="w-5 h-5" />,
    title: 'Tokenization Architecture Framework',
    description: 'Institutional-grade framework for structuring real-world asset tokenization across XRPL, Stellar, and EVM chains.',
    type: 'Framework Doc',
    color: '#8b5cf6',
  },
  {
    icon: <Zap className="w-5 h-5" />,
    title: 'Genesis Protocol Research Summary',
    description: 'Key findings from 6,820 simulated worlds, 3.41M computed epochs — zero collapse. Summary of the Genesis Protocol computational macroeconomics research (DOI: 10.5281/zenodo.18729652).',
    type: 'Research Brief',
    color: '#10b981',
  },
];

export default function LeadCapture() {
  return (
    <section id="resources" className="relative py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-xs font-medium mb-6">
            <Mail className="w-3.5 h-3.5" /> THE SOVEREIGN SYSTEMS DISPATCH
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Intelligence. Not Noise.
          </h2>
          <p className="text-[#8888a0] text-lg max-w-2xl mx-auto mb-8">
            Weekly insights on deterministic infrastructure, tokenized capital markets, AI systems architecture, 
            and institutional blockchain strategy. No hype. No speculation. Just architecture.
          </p>

          {/* Email Input */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-lg mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-5 py-4 rounded-xl bg-[#12121a] border border-[#2a2a3a] text-white placeholder-[#555566] text-sm focus:outline-none focus:border-blue-500/40 transition-colors"
            />
            <button className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2">
              <Mail className="w-4 h-4" />
              Subscribe
            </button>
          </div>
          <p className="text-xs text-[#555566] mt-3">
            Join sovereign systems architects and institutional builders. Unsubscribe anytime.
          </p>
        </motion.div>

        {/* Lead Magnets */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {leadMagnets.map((magnet, index) => (
            <motion.div
              key={magnet.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group rounded-2xl border border-[#1e1e2e] bg-[#12121a] p-6 hover:border-blue-500/20 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${magnet.color}15`, color: magnet.color }}
                >
                  {magnet.icon}
                </div>
                <span
                  className="px-2 py-0.5 rounded text-xs font-medium"
                  style={{ color: magnet.color, backgroundColor: `${magnet.color}15` }}
                >
                  {magnet.type}
                </span>
              </div>
              <h3 className="text-base font-bold text-white mb-2">{magnet.title}</h3>
              <p className="text-sm text-[#8888a0] leading-relaxed mb-4">{magnet.description}</p>
              <a
                href="mailto:kevan.burns@fthtrading.com?subject=Resource%20Request"
                className="inline-flex items-center gap-1 text-sm font-medium group-hover:gap-2 transition-all"
                style={{ color: magnet.color }}
              >
                Request Access <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
