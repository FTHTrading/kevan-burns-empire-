'use client';

import { motion } from 'framer-motion';
import { ExternalLink, FileText, Award } from 'lucide-react';
import platformsData from '@/data/platforms.json';

const { research, social } = platformsData;

export default function Research() {
  return (
    <section id="research" className="relative py-32 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Research & Publications
          </h2>
          <p className="text-[#8888a0] text-lg max-w-2xl mx-auto">
            Peer-reviewed research and open publications in deterministic systems and computational economics.
          </p>
        </motion.div>

        {/* Research Cards */}
        <div className="space-y-6 mb-12">
          {research.map((paper, index) => (
            <motion.a
              key={index}
              href={paper.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="block p-6 rounded-xl border border-[#1e1e2e] bg-[#12121a] hover:border-blue-500/30 transition-all duration-300 group"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-indigo-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors mb-1">
                    {paper.title}
                  </h3>
                  <p className="text-sm text-[#8888a0] mb-2">{paper.description}</p>
                  <span className="inline-flex items-center gap-1 text-xs text-blue-400">
                    {paper.platform}
                    <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <a
            href={social.zenodo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[#1e1e2e] bg-[#12121a] text-[#c0c0d0] hover:text-white hover:border-blue-500/30 transition-all"
          >
            <FileText className="w-4 h-4" />
            Zenodo Profile
          </a>
          <a
            href={social.orcid}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[#1e1e2e] bg-[#12121a] text-[#c0c0d0] hover:text-white hover:border-green-500/30 transition-all"
          >
            <Award className="w-4 h-4" />
            ORCID Profile
          </a>
          <a
            href={social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[#1e1e2e] bg-[#12121a] text-[#c0c0d0] hover:text-white hover:border-purple-500/30 transition-all"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
}
