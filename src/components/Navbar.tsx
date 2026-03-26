'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const navItems = [
  { label: 'Atlas', href: '/systems' },
  { label: 'Capital', href: '#capital-stack' },
  { label: 'Diligence', href: '/diligence' },
  { label: 'Fund', href: '/funding' },
  { label: 'Services', href: '/services' },
  { label: 'Live', href: '/proof' },
  { label: 'Blog', href: '/blog' },
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
              className={`text-sm transition-colors flex items-center gap-1.5 ${
                item.label === 'Live'
                  ? 'text-green-400 hover:text-green-300 font-semibold'
                  : item.label === 'Fund'
                  ? 'text-emerald-400 hover:text-emerald-300 font-semibold'                  : item.label === 'Diligence'
                  ? 'text-amber-400 hover:text-amber-300 font-semibold'
                  : item.label === 'Capital'
                  ? 'text-purple-400 hover:text-purple-300 font-semibold'                  : 'text-[#8888a0] hover:text-white'
              }`}
            >
              {item.label === 'Live' && (
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              )}
              {item.label === 'Fund' && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              )}
              {item.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-2">
          <a
            href="/funding"
            className="hidden sm:flex items-center gap-2 px-4 py-2 bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-400 rounded-lg text-sm font-medium transition-all border border-emerald-600/20"
          >
            Invest
          </a>
          <a
            href="#contact"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 rounded-lg text-sm font-medium transition-all border border-blue-600/20"
          >
            Launch With Me
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </motion.nav>
  );
}
