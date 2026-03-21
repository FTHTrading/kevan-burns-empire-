'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Tag, Mail, Zap } from 'lucide-react';
import { useParams } from 'next/navigation';
import blogData from '@/data/blog-posts.json';

const { posts, newsletter } = blogData;

const categoryColors: Record<string, string> = {
  'Architecture': '#3b82f6',
  'Technical Deep Dive': '#8b5cf6',
  'Thesis': '#f59e0b',
  'Research': '#10b981',
  'AI Systems': '#ec4899',
  'Strategy': '#06b6d4',
};

export default function BlogPostClient() {
  const params = useParams();
  const slug = params.slug as string;
  const post = posts.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <a href="/blog" className="text-blue-400 hover:text-blue-300 transition-colors">
            ← Back to Blog
          </a>
        </div>
      </div>
    );
  }

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
            <a href="/blog" className="flex items-center gap-2 text-sm text-[#8888a0] hover:text-white transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" /> All Posts
            </a>
            <a href="/services" className="text-sm text-[#8888a0] hover:text-white transition-colors">
              Services
            </a>
          </div>
        </div>
      </div>

      {/* Article */}
      <article className="pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span
                className="px-3 py-1 rounded text-xs font-medium"
                style={{
                  color: categoryColors[post.category] || '#8888a0',
                  backgroundColor: `${categoryColors[post.category] || '#8888a0'}15`,
                }}
              >
                {post.category}
              </span>
              <span className="text-sm text-[#555566]">{post.date}</span>
              <span className="flex items-center gap-1 text-sm text-[#555566]">
                <Clock className="w-3.5 h-3.5" /> {post.readTime}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="text-lg text-[#8888a0] mb-8 leading-relaxed border-l-2 border-blue-500/30 pl-4">
              {post.excerpt}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-12">
              {post.tags.map(tag => (
                <span key={tag} className="flex items-center gap-1 px-3 py-1 rounded-lg text-xs text-[#555566] border border-[#1e1e2e]">
                  <Tag className="w-3 h-3" /> {tag}
                </span>
              ))}
            </div>

            {/* Content */}
            <div className="space-y-6">
              {post.content.map((block, i) => {
                if (block.type === 'heading') {
                  return (
                    <h2 key={i} className="text-2xl font-bold text-white mt-12 mb-4">
                      {block.text}
                    </h2>
                  );
                }
                return (
                  <p key={i} className="text-[#b0b0c0] leading-relaxed text-base">
                    {block.text}
                  </p>
                );
              })}
            </div>
          </motion.div>

          {/* Author */}
          <div className="mt-16 pt-8 border-t border-[#1e1e2e]">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
                KB
              </div>
              <div>
                <p className="font-semibold text-white">Kevan Burns</p>
                <p className="text-sm text-[#8888a0]">Sovereign Systems Architect</p>
              </div>
            </div>
          </div>

          {/* Newsletter CTA */}
          <div className="mt-12 rounded-2xl border border-blue-500/20 bg-blue-500/5 p-8 text-center">
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
          </div>
        </div>
      </article>

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
