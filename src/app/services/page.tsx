'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Check, Mail, ArrowLeft, Shield, Zap, Crown, Gem } from 'lucide-react';
import servicesData from '@/data/services.json';

const { hero, tiers, enterprise, cta } = servicesData;

const enterpriseIcons: Record<string, React.ReactNode> = {
  Bronze: <Shield className="w-5 h-5" />,
  Silver: <Zap className="w-5 h-5" />,
  Gold: <Crown className="w-5 h-5" />,
  Platinum: <Gem className="w-5 h-5" />,
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Nav Back */}
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
            <a href="/blog" className="text-sm text-[#8888a0] hover:text-white transition-colors">
              Blog
            </a>
            <a
              href={`mailto:${cta.email}`}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 rounded-lg text-sm font-medium transition-all border border-blue-600/20"
            >
              <Mail className="w-3.5 h-3.5" />
              Contact
            </a>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-xs font-medium mb-8">
              <Zap className="w-3.5 h-3.5" /> PRODUCTIZED SERVICES
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {hero.title}
            </h1>
            <p className="text-[#8888a0] text-lg max-w-2xl mx-auto">
              {hero.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Service Tiers */}
      <section className="pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tiers.map((tier, index) => (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative rounded-2xl border border-[#1e1e2e] bg-[#12121a] p-8 hover:border-opacity-60 transition-all duration-500"
                style={{ '--tier-color': tier.color } as React.CSSProperties}
              >
                {/* Color accent */}
                <div
                  className="absolute top-0 left-6 right-6 h-px opacity-40"
                  style={{ background: `linear-gradient(90deg, transparent, ${tier.color}, transparent)` }}
                />

                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white mb-1">{tier.name}</h3>
                  <p className="text-sm text-[#8888a0]">{tier.tagline}</p>
                </div>

                <div className="mb-6">
                  <span className="text-2xl font-bold" style={{ color: tier.color }}>{tier.price}</span>
                  <p className="text-xs text-[#555566] mt-1">{tier.priceNote}</p>
                </div>

                <p className="text-sm text-[#8888a0] mb-6 leading-relaxed">
                  {tier.description}
                </p>

                <div className="mb-6">
                  <div className="text-xs font-semibold text-white uppercase tracking-wider mb-3">Deliverables</div>
                  <ul className="space-y-2">
                    {tier.deliverables.map((d, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-[#8888a0]">
                        <Check className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: tier.color }} />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between text-xs text-[#555566] mb-6">
                  <span>Timeline: {tier.timeline}</span>
                </div>

                <p className="text-xs text-[#555566] italic mb-6">
                  Ideal for: {tier.ideal}
                </p>

                <a
                  href={`mailto:${cta.email}?subject=${encodeURIComponent(tier.name + ' Inquiry')}`}
                  className="block w-full text-center py-3 rounded-lg text-sm font-semibold transition-all duration-300 border"
                  style={{
                    borderColor: `${tier.color}33`,
                    color: tier.color,
                    backgroundColor: `${tier.color}08`,
                  }}
                >
                  Inquire About {tier.name}
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise Licensing */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{enterprise.title}</h2>
              <p className="text-[#8888a0] max-w-xl mx-auto">{enterprise.description}</p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {enterprise.tiers.map((tier, index) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`rounded-2xl border p-6 transition-all duration-300 ${
                  tier.name === 'Platinum'
                    ? 'border-blue-500/30 bg-blue-500/5'
                    : 'border-[#1e1e2e] bg-[#12121a]'
                }`}
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className={`p-2 rounded-lg ${tier.name === 'Platinum' ? 'bg-blue-500/10 text-blue-400' : 'bg-[#1a1a2a] text-[#8888a0]'}`}>
                    {enterpriseIcons[tier.name]}
                  </div>
                  <div>
                    <h3 className="font-bold text-white">{tier.name}</h3>
                    <p className="text-sm font-semibold text-blue-400">{tier.price}</p>
                  </div>
                </div>

                <ul className="space-y-2">
                  {tier.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[#8888a0]">
                      <Check className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-emerald-400" />
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{cta.title}</h2>
            <p className="text-[#8888a0] mb-8 max-w-xl mx-auto">{cta.subtitle}</p>
            <a
              href={`mailto:${cta.email}?subject=${encodeURIComponent('Architecture Review Request')}`}
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold text-lg transition-all duration-300"
            >
              <Mail className="w-5 h-5" />
              {cta.buttonText}
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
            <a href="/blog" className="text-xs text-[#8888a0] hover:text-white transition-colors">Blog</a>
            <a href="/press" className="text-xs text-[#8888a0] hover:text-white transition-colors">Press</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
