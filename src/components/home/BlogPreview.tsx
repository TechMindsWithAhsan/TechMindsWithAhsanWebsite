'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { BLOG_POSTS } from '@/lib/blog-data';

const posts = BLOG_POSTS.slice(0, 3);

export default function BlogPreview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 bg-[#111111]">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h3 className="text-[#0EA5E9] font-semibold tracking-wider text-sm uppercase mb-3">Insights</h3>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Latest From the Tech Lab
            </h2>
          </div>
          <Link
            href="/blog"
            className="px-6 py-3 border border-gray-800 hover:border-gray-600 text-white rounded-lg font-medium transition-all duration-300 whitespace-nowrap"
          >
            Read All Articles →
          </Link>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group bg-[#0A0A0A] border border-gray-800 rounded-2xl p-6 hover:-translate-y-2 transition-all duration-300 hover:border-gray-700 hover:shadow-xl hover:shadow-[#0EA5E9]/5"
            >
              <div className="flex justify-between items-center mb-6">
                <span className="px-3 py-1 bg-gray-900 text-xs font-medium text-gray-300 rounded-md">
                  {post.category}
                </span>
                <span className="text-xs text-gray-500">{post.readTime}</span>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#0EA5E9] transition-colors">
                {post.title}
              </h3>
              
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                {post.excerpt}
              </p>
              
              <Link href={`/blog/${post.slug}`} className="inline-flex items-center text-sm font-semibold text-white group-hover:text-[#0EA5E9] transition-colors">
                Read Article <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
