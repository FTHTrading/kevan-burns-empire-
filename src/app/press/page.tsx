'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Mail, Mic, FileText, Camera, Download, Globe, Zap } from 'lucide-react';

const pressReleases = [
  {
    date: '2025-03',
    title: 'Genesis Protocol Research: 5,680 Simulated Worlds With Zero Economic Collapse',
    description: 'Publication of deterministic multi-agent economic simulation research on Zenodo — demonstrating that algorithmic monetary policy eliminates cascading failure modes across thousands of independent economic simulations.',
    category: 'Research',
    link: 'https://zenodo.org/records/18729652',
  },
  {
    date: '2025-02',
    title: 'FTH Trading Launches Sovereign Systems Architecture Practice',
    description: 'Formal launch of productized infrastructure services — Architecture Sprints, Token Design, RWA Structuring, and KAIROS AI Licensing — serving institutions, funds, and protocol teams building sovereign infrastructure.',
    category: 'Launch',
    link: '/services',
  },
  {
    date: '2025-01',
    title: 'Digital Empire Index Deployed to IPFS — Sovereign Hosting Achieved',
    description: 'The Kevan Burns Digital Empire Index becomes fully sovereign-hosted on IPFS via CIDv1 content addressing and IPNS persistent naming — eliminating all centralized hosting dependencies.',
    category: 'Infrastructure',
    link: '/',
  },
];

const mediaKit = [
  {
    icon: <FileText className="w-5 h-5" />,
    title: 'Speaker Bio & One-Pager',
    description: 'Professional biography, positioning statement, and key accomplishments for event organizers and media.',
  },
  {
    icon: <Camera className="w-5 h-5" />,
    title: 'Professional Headshots',
    description: 'High-resolution professional photos for publications, conferences, and media appearances.',
  },
  {
    icon: <Globe className="w-5 h-5" />,
    title: 'Systems Overview Deck',
    description: 'Comprehensive slide deck covering all sovereign systems, capabilities, and institutional offerings.',
  },
  {
    icon: <Mic className="w-5 h-5" />,
    title: 'Speaker Kit',
    description: 'Topics, past appearances, and technical talk abstracts for conference and podcast organizers.',
  },
];

const speakingTopics = [
  'Deterministic Systems Architecture for Institutional Capital',
  'Multi-Chain Settlement: Beyond Bridges',
  'Tokenization as Infrastructure — Not Disruption',
  'AI Operating Systems for Sovereign Enterprises',
  'Computational Macroeconomics: Lessons from 5,680 Simulated Worlds',
  'Building Sovereign Infrastructure on XRPL + Stellar',
];

export default function PressPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Nav */}
      <div className="fixed top-0 left-0 right-0 z-40 border-b border-[#1e1e2e]/50 bg-[#0a0a0f]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
              KB
            </div>
            <span className="text-white font-semibold hidden sm:block">KEVAN BURNS</span>
          </a>
          <div className="flex items-center gap-4">
            <a href="/" className="flex items-center gap-2 text-sm text-[#8888a0] hover:text-white transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" /> Empire Index
            </a>
            <a href="/services" className="text-sm text-[#8888a0] hover:text-white transition-colors">
              Services
            </a>
            <a href="/blog" className="text-sm text-[#8888a0] hover:text-white transition-colors">
              Blog
            </a>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-xs font-medium mb-8">
              <Mic className="w-3.5 h-3.5" /> PRESS & MEDIA
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Press Room
            </h1>
            <p className="text-[#8888a0] text-lg max-w-2xl mx-auto">
              Press releases, media kit, speaking topics, and resources for journalists, event organizers, and media professionals.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Press Releases */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-sm font-semibold text-[#8888a0] uppercase tracking-wider mb-8">Press Releases</h2>
          <div className="space-y-6">
            {pressReleases.map((release, index) => (
              <motion.a
                key={release.title}
                href={release.link}
                target={release.link.startsWith('http') ? '_blank' : undefined}
                rel={release.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group block rounded-2xl border border-[#1e1e2e] bg-[#12121a] p-6 hover:border-blue-500/20 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs text-[#555566] font-mono">{release.date}</span>
                  <span className="px-2 py-0.5 rounded text-xs font-medium text-blue-400 bg-blue-400/10">
                    {release.category}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {release.title}
                </h3>
                <p className="text-sm text-[#8888a0] leading-relaxed">
                  {release.description}
                </p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Media Kit */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-sm font-semibold text-[#8888a0] uppercase tracking-wider mb-8">Media Kit</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mediaKit.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="rounded-xl border border-[#1e1e2e] bg-[#12121a] p-6"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
                      {item.icon}
                    </div>
                    <h3 className="font-bold text-white">{item.title}</h3>
                  </div>
                  <p className="text-sm text-[#8888a0] mb-4">{item.description}</p>
                  <a
                    href="mailto:kevan.burns@fthtrading.com?subject=Media%20Kit%20Request"
                    className="inline-flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <Download className="w-3 h-3" /> Request
                  </a>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Speaking Topics */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-sm font-semibold text-[#8888a0] uppercase tracking-wider mb-8">Speaking Topics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {speakingTopics.map((topic, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 rounded-xl border border-[#1e1e2e] bg-[#12121a] p-4"
                >
                  <Zap className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-[#c0c0d0]">{topic}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Media & Speaking Inquiries</h2>
            <p className="text-[#8888a0] mb-8 max-w-xl mx-auto">
              For press inquiries, interview requests, podcast appearances, or conference speaking engagements.
            </p>
            <a
              href="mailto:kevan.burns@fthtrading.com?subject=Media%20Inquiry"
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold text-lg transition-all duration-300"
            >
              <Mail className="w-5 h-5" />
              Get In Touch
              <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#1e1e2e] py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#8888a0]">
            &copy; {new Date().getFullYear()} Kevan Burns. All systems sovereign.
          </p>
          <div className="flex items-center gap-6">
            <a href="/" className="text-xs text-[#8888a0] hover:text-white transition-colors">Empire Index</a>
            <a href="/services" className="text-xs text-[#8888a0] hover:text-white transition-colors">Services</a>
            <a href="/blog" className="text-xs text-[#8888a0] hover:text-white transition-colors">Blog</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
