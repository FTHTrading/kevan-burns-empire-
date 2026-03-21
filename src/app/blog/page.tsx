'use client';

import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, Clock, Tag, Mail, Zap, BookOpen } from 'lucide-react';
import blogData from '@/data/blog-posts.json';

const { posts, categories, newsletter } = blogData;

const categoryColors: Record<string, string> = {
  'Architecture': '#3b82f6',
  'Technical Deep Dive': '#8b5cf6',
  'Thesis': '#f59e0b',
  'Research': '#10b981',
  'AI Systems': '#ec4899',
  'Strategy': '#06b6d4',
};

export default function BlogPage() {
  const featuredPosts = posts.filter(p => p.featured);
  const recentPosts = posts;

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
              <BookOpen className="w-3.5 h-3.5" /> SOVEREIGN SYSTEMS BLOG
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Architecture. Research. Thesis.
            </h1>
            <p className="text-[#8888a0] text-lg max-w-2xl mx-auto">
              Deep dives into deterministic infrastructure, tokenized capital markets, AI systems architecture, and the engineering behind sovereign systems.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-8 text-center"
          >
            <Zap className="w-6 h-6 text-blue-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">{newsletter.title}</h3>
            <p className="text-sm text-[#8888a0] mb-6 max-w-lg mx-auto">{newsletter.description}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-4 py-3 rounded-lg bg-[#0a0a0f] border border-[#2a2a3a] text-white placeholder-[#555566] text-sm focus:outline-none focus:border-blue-500/40"
              />
              <button className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2">
                <Mail className="w-4 h-4" />
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="pb-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-2 justify-center">
            <button className="px-4 py-2 rounded-lg text-sm font-medium bg-blue-600/10 text-blue-400 border border-blue-600/20">
              All Posts
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                className="px-4 py-2 rounded-lg text-sm font-medium text-[#8888a0] hover:text-white border border-[#1e1e2e] hover:border-[#2a2a3a] transition-colors"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-sm font-semibold text-[#8888a0] uppercase tracking-wider mb-8">Featured</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPosts.map((post, index) => (
              <motion.a
                key={post.slug}
                href={`/blog/${post.slug}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group rounded-2xl border border-[#1e1e2e] bg-[#12121a] p-6 hover:border-blue-500/20 transition-all duration-300"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span
                    className="px-2 py-0.5 rounded text-xs font-medium"
                    style={{
                      color: categoryColors[post.category] || '#8888a0',
                      backgroundColor: `${categoryColors[post.category] || '#8888a0'}15`,
                    }}
                  >
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-[#555566]">
                    <Clock className="w-3 h-3" /> {post.readTime}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-[#8888a0] leading-relaxed mb-4">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#555566]">{post.date}</span>
                  <span className="flex items-center gap-1 text-xs text-blue-400 group-hover:gap-2 transition-all">
                    Read <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* All Posts */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-sm font-semibold text-[#8888a0] uppercase tracking-wider mb-8">All Posts</h2>
          <div className="space-y-4">
            {recentPosts.map((post, index) => (
              <motion.a
                key={post.slug}
                href={`/blog/${post.slug}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group flex flex-col md:flex-row md:items-center gap-4 p-6 rounded-xl border border-[#1e1e2e] bg-[#12121a] hover:border-blue-500/20 transition-all duration-300"
              >
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span
                      className="px-2 py-0.5 rounded text-xs font-medium"
                      style={{
                        color: categoryColors[post.category] || '#8888a0',
                        backgroundColor: `${categoryColors[post.category] || '#8888a0'}15`,
                      }}
                    >
                      {post.category}
                    </span>
                    <span className="text-xs text-[#555566]">{post.date}</span>
                    <span className="flex items-center gap-1 text-xs text-[#555566]">
                      <Clock className="w-3 h-3" /> {post.readTime}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors mb-1">
                    {post.title}
                  </h3>
                  <p className="text-sm text-[#8888a0] line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <div className="flex flex-wrap gap-1">
                    {post.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="flex items-center gap-1 text-xs text-[#555566]">
                        <Tag className="w-2.5 h-2.5" /> {tag}
                      </span>
                    ))}
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#555566] group-hover:text-blue-400 transition-colors" />
                </div>
              </motion.a>
            ))}
          </div>
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
            <a href="/press" className="text-xs text-[#8888a0] hover:text-white transition-colors">Press</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
