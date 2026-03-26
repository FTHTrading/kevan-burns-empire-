'use client';

import { ExternalLink, HardDrive, Tag, Clock, Github } from 'lucide-react';
import { systems } from '@/content/systems';
import platformsData from '@/data/platforms.json';

const { social, ipfs } = platformsData;

const BUILD_VERSION = 'v1.0.0';
const BUILD_TIMESTAMP = new Date().toISOString();
const GITHUB_SOURCE = 'https://github.com/kevanburns';

export default function Footer() {
  return (
    <footer className="border-t border-[#1e1e2e] bg-[#0a0a0f]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="text-xl font-bold text-white mb-3">KEVAN BURNS</h3>
            <p className="text-sm text-[#8888a0] leading-relaxed mb-5">
              Sovereign Systems Architect. 58 systems across blockchain, AI, and institutional finance.
            </p>
            <div className="flex flex-col gap-2">
              <a href={social.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-[#8888a0] hover:text-white transition-colors">
                <ExternalLink className="w-3.5 h-3.5" /> GitHub
              </a>
              <a href={social.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-[#8888a0] hover:text-white transition-colors">
                <ExternalLink className="w-3.5 h-3.5" /> LinkedIn
              </a>
              <a href={social.x} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-[#8888a0] hover:text-white transition-colors">
                <ExternalLink className="w-3.5 h-3.5" /> X / Twitter
              </a>
              <a href={social.zenodo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-[#8888a0] hover:text-white transition-colors">
                <ExternalLink className="w-3.5 h-3.5" /> Zenodo Research
              </a>
            </div>
          </div>

          {/* Flagship Systems */}
          <div className="md:col-span-2">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Flagship Systems</h4>
            <div className="grid grid-cols-2 gap-2">
              {systems.filter(s => s.flagship || s.strategicPriority === 'flagship').slice(0, 12).map((system) => (
                <a
                  key={system.id}
                  href={system.liveUrl ?? system.links[0]?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-[#8888a0] hover:text-white transition-colors py-1"
                >
                  <span>{system.emoji}</span>
                  <span className="truncate">{system.name}</span>
                </a>
              ))}
              <a href="/systems" className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors py-1 col-span-2">
                <ExternalLink className="w-3.5 h-3.5" /> View all 58 systems →
              </a>
            </div>
          </div>

          {/* Navigate */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Navigate</h4>
            <div className="flex flex-col gap-2">
              <a href="/systems" className="flex items-center gap-2 text-sm text-[#8888a0] hover:text-white transition-colors">
                <ExternalLink className="w-3.5 h-3.5" /> Atlas (58 Systems)
              </a>
              <a href="/funding" className="flex items-center gap-2 text-sm text-emerald-400 hover:text-emerald-300 font-medium transition-colors">
                <ExternalLink className="w-3.5 h-3.5" /> Funding Opportunities
              </a>
              <a href="/services" className="flex items-center gap-2 text-sm text-[#8888a0] hover:text-white transition-colors">
                <ExternalLink className="w-3.5 h-3.5" /> Services
              </a>
              <a href="/press" className="flex items-center gap-2 text-sm text-[#8888a0] hover:text-white transition-colors">
                <ExternalLink className="w-3.5 h-3.5" /> Press
              </a>
              <a href="/blog" className="flex items-center gap-2 text-sm text-[#8888a0] hover:text-white transition-colors">
                <ExternalLink className="w-3.5 h-3.5" /> Blog
              </a>
              <a href="/control" className="flex items-center gap-2 text-sm text-[#8888a0] hover:text-white transition-colors">
                <ExternalLink className="w-3.5 h-3.5" /> Control Dashboard
              </a>
              <a href="mailto:kevan.burns@fthtrading.com" className="flex items-center gap-2 text-sm text-[#8888a0] hover:text-white transition-colors">
                <ExternalLink className="w-3.5 h-3.5" /> kevan.burns@fthtrading.com
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="section-divider mb-8" />

        {/* IPFS Sovereign Hosting Badge */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 p-4 rounded-xl border border-emerald-500/10 bg-emerald-500/5">
          <div className="flex items-center gap-2">
            <HardDrive className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Sovereign Hosted on IPFS</span>
          </div>
          <a
            href={ipfs.gateway}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[#8888a0] hover:text-white transition-colors font-mono truncate max-w-xs"
          >
            CID: {ipfs.cid.slice(0, 20)}…{ipfs.cid.slice(-8)}
          </a>
          <a
            href={ipfs.dweb}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-emerald-400/70 hover:text-emerald-300 transition-colors"
          >
            dweb.link ↗
          </a>
        </div>

        {/* Build Metadata — System Hardening */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-6 text-[10px] font-mono text-[#555566]">
          <span className="flex items-center gap-1">
            <Tag className="w-3 h-3" /> {BUILD_VERSION}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" /> {BUILD_TIMESTAMP.split('T')[0]}
          </span>
          <a
            href={GITHUB_SOURCE}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-white transition-colors"
          >
            <Github className="w-3 h-3" /> Source ↗
          </a>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#8888a0]">
            &copy; {new Date().getFullYear()} Kevan Burns. All systems sovereign. All rights reserved.
          </p>
          <p className="text-xs text-[#555566]">
            Built with deterministic precision. Zero undefined failure states.
          </p>
        </div>
      </div>
    </footer>
  );
}
