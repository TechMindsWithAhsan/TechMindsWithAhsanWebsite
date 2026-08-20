'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { FiArrowRight, FiCalendar, FiClock, FiSearch } from 'react-icons/fi';
import type { BlogPostData } from '@/lib/blog-data';

interface BlogFiltersProps {
  posts: BlogPostData[];
  categories: string[];
}

export default function BlogFilters({ posts, categories }: BlogFiltersProps) {
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const filteredPosts = useMemo(() => {
    const query = search.trim().toLowerCase();
    return posts.filter((post) => {
      const matchesCategory = category === 'All' || post.category === category;
      const matchesSearch = !query || `${post.title} ${post.excerpt}`.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [category, posts, search]);

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
        <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide" role="tablist" aria-label="Filter articles by category">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              role="tab"
              aria-selected={category === item}
              onClick={() => setCategory(item)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
                category === item
                  ? 'bg-[#0EA5E9] text-white font-medium'
                  : 'bg-[#111111] text-gray-400 hover:bg-gray-800 hover:text-white border border-gray-800'
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <label className="relative w-full md:w-64">
          <span className="sr-only">Search articles</span>
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search articles..."
            className="w-full bg-[#111111] border border-gray-800 rounded-full py-2 pl-10 pr-4 text-sm text-gray-200 focus:outline-none focus:border-[#0EA5E9] focus:ring-1 focus:ring-[#0EA5E9] transition-all"
          />
          <FiSearch className="absolute left-3 top-2.5 text-gray-500" aria-hidden="true" />
        </label>
      </div>

      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredPosts.map((post) => (
            <Link href={`/blog/${post.slug}`} key={post.slug} className="group flex flex-col bg-[#111111] rounded-2xl overflow-hidden border border-gray-800 hover:border-gray-700 transition-all hover:shadow-lg hover:shadow-[#0EA5E9]/5">
              <div className="h-48 bg-gradient-to-br from-[#082f49] via-gray-900 to-[#451a03] flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[#0EA5E9]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="text-4xl font-bold text-white/70" aria-hidden="true">{post.category.slice(0, 2).toUpperCase()}</span>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <span className="px-3 py-1 bg-[#0EA5E9]/10 text-[#0EA5E9] text-xs font-semibold rounded-full self-start mb-4">{post.category}</span>
                <h3 className="text-xl font-bold text-gray-100 group-hover:text-[#0EA5E9] transition-colors mb-3">{post.title}</h3>
                <p className="text-gray-400 text-sm mb-6 flex-grow line-clamp-3">{post.excerpt}</p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#0EA5E9] to-[#F59E0B] flex items-center justify-center text-xs font-bold">AH</div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-200">Ahsan Hayat</span>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span className="flex items-center gap-1"><FiCalendar className="w-3 h-3" /> {post.date}</span>
                        <span aria-hidden="true">•</span>
                        <span className="flex items-center gap-1"><FiClock className="w-3 h-3" /> {post.readTime}</span>
                      </div>
                    </div>
                  </div>
                  <FiArrowRight className="w-5 h-5 text-[#0EA5E9]" aria-hidden="true" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400 py-12">No articles match that category or search.</p>
      )}
    </>
  );
}