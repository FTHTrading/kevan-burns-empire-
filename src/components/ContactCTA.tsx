'use client';

import { motion } from 'framer-motion';
import { Rocket, ArrowRight, Mail, Phone, DollarSign } from 'lucide-react';

export default function ContactCTA() {
  return (
    <section id="contact" className="relative py-32 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-500/10 mb-8">
            <Rocket className="w-8 h-8 text-blue-400" />
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Build With Deterministic Infrastructure
          </h2>

          <p className="text-[#8888a0] text-lg max-w-2xl mx-auto mb-4">
            Whether you&apos;re an institution seeking sovereign capital architecture, a fund manager tokenizing real-world assets,
            or a protocol team that needs deterministic execution — let&apos;s architect it.
          </p>

          <p className="text-[#8888a0] text-base max-w-xl mx-auto mb-8">
            Accepting select consulting engagements, institutional partnerships, and infrastructure build contracts.
          </p>

          {/* Investor track */}
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 px-5 py-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 mb-8">
            <DollarSign className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <p className="text-sm text-emerald-300">
              Looking to invest? Two active raises: <strong>Atlanta Cricket RWA ($35M Reg D)</strong> and <strong>Genesis Sentience Protocol (SAFE $1M–$3M)</strong>.
            </p>
            <a href="/funding" className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 whitespace-nowrap underline underline-offset-2 transition-colors">
              View Funding →
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-6 mb-10 text-sm text-[#8888a0]">
            <a href="mailto:kevan.burns@fthtrading.com" className="flex items-center gap-2 hover:text-white transition-colors">
              <Mail className="w-4 h-4" /> kevan.burns@fthtrading.com
            </a>
            <a href="tel:+13212788323" className="flex items-center gap-2 hover:text-white transition-colors">
              <Phone className="w-4 h-4" /> (321) 278-8323
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="mailto:kevan.burns@fthtrading.com"
              className="group flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold text-lg transition-all duration-300"
            >
              <Mail className="w-5 h-5" />
              Launch With Me
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="https://www.linkedin.com/in/kevan-burns-842827389/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-8 py-4 border border-[#2a2a3a] hover:border-blue-500/40 text-[#c0c0d0] hover:text-white rounded-lg font-semibold text-lg transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
