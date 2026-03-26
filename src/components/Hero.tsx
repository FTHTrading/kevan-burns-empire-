'use client';

import { motion } from 'framer-motion';
import { useView } from '@/context/ViewContext';
import AnimatedCounter from './AnimatedCounter';
import { heroMetrics } from '@/lib/platformMetrics';
import { ArrowRight, BookOpen, Building2, DollarSign, FlaskConical, Rocket } from 'lucide-react';

export default function Hero() {
  const { viewMode } = useView();

  return (
    <section className="relative min-h-screen flex items-center justify-center grid-bg overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-32 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-sm mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
          Sovereign Systems Architect
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className={`font-bold tracking-tight mb-6 ${
            viewMode === 'creative'
              ? 'text-6xl md:text-8xl bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent'
              : 'text-5xl md:text-7xl text-white'
          }`}
        >
          KEVAN BURNS
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-[#8888a0] text-sm md:text-base tracking-widest uppercase mb-8"
        >
          Blockchain Infrastructure · Deterministic Finance · AI Operating Systems · Tokenized Capital Markets
        </motion.p>

        {/* Authority statement */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-3xl mx-auto text-lg md:text-xl text-[#c0c0d0] leading-relaxed mb-12"
        >
          Builds deterministic digital capital infrastructure across XRPL, TRON, Avalanche, Polygon, and Stellar — in Rust, TypeScript, and Solidity — with AI-native payment rails (x402), multi-agent supervisory systems, and peer-published simulation research.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4 mb-20"
        >
          <a href="#platforms" className="group flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-all duration-300">
            <Building2 className="w-4 h-4" />
            View Systems
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a href="#capabilities" className="flex items-center gap-2 px-6 py-3 border border-[#2a2a3a] hover:border-blue-500/40 text-[#c0c0d0] hover:text-white rounded-lg font-medium transition-all duration-300">
            <FlaskConical className="w-4 h-4" />
            Institutional Overview
          </a>
          <a href="#research" className="flex items-center gap-2 px-6 py-3 border border-[#2a2a3a] hover:border-blue-500/40 text-[#c0c0d0] hover:text-white rounded-lg font-medium transition-all duration-300">
            <BookOpen className="w-4 h-4" />
            Research & Publications
          </a>
          <a href="/funding" className="flex items-center gap-2 px-6 py-3 border border-emerald-500/30 hover:border-emerald-500/60 text-emerald-400 hover:text-emerald-300 rounded-lg font-medium transition-all duration-300">
            <DollarSign className="w-4 h-4" />
            Funding Opportunities
          </a>
          <a href="#contact" className="flex items-center gap-2 px-6 py-3 border border-[#2a2a3a] hover:border-blue-500/40 text-[#c0c0d0] hover:text-white rounded-lg font-medium transition-all duration-300">
            <Rocket className="w-4 h-4" />
            Launch With Me
          </a>
        </motion.div>

        {/* Animated Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-5 gap-8 max-w-4xl mx-auto"
        >
          {heroMetrics.map((metric, i) => (
            <div key={metric.label} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                <AnimatedCounter end={metric.value} suffix={metric.suffix} delay={i * 0.2} />
              </div>
              <div className="text-xs md:text-sm text-[#8888a0] uppercase tracking-wider">
                {metric.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0f] to-transparent" />
    </section>
  );
}
