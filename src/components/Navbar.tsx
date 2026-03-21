'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const navItems = [
  { label: 'Atlas', href: '/systems' },
  { label: 'Control', href: '/control' },
  { label: 'Systems', href: '#platforms' },
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Services', href: '/services' },
  { label: 'Blog', href: '/blog' },
  { label: 'Research', href: '#research' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-40 border-b border-[#1e1e2e]/50 bg-[#0a0a0f]/80 backdrop-blur-xl"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
            KB
          </div>
          <span className="text-white font-semibold hidden sm:block">KEVAN BURNS</span>
        </a>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-[#8888a0] hover:text-white transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="#contact"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 rounded-lg text-sm font-medium transition-all border border-blue-600/20"
        >
          Launch With Me
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </motion.nav>
  );
}
