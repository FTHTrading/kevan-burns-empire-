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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="text-xl font-bold text-white mb-3">KEVAN BURNS</h3>
            <p className="text-sm text-[#8888a0] leading-relaxed">
              Sovereign Systems Architect. Building deterministic infrastructure across blockchain, AI, and institutional finance.
            </p>
          </div>

          {/* Platforms */}
          <div className="md:col-span-2">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Systems Index</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {systems.map((system) => (
                <a
                  key={system.id}
                  href={system.links[0]?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-[#8888a0] hover:text-white transition-colors py-1"
                >
                  <span>{system.emoji}</span>
                  <span>{system.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Connect</h4>
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
                <ExternalLink className="w-3.5 h-3.5" /> Zenodo
              </a>
              <a href={social.orcid} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-[#8888a0] hover:text-white transition-colors">
                <ExternalLink className="w-3.5 h-3.5" /> ORCID
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
