import Link from "next/link";
import { Metadata } from "next";
import {
  FiCalendar,
  FiClock,
  FiShare2,
  FiTwitter,
  FiLinkedin,
  FiArrowLeft,
} from "react-icons/fi";
import { notFound } from "next/navigation";
import { BLOG_POSTS } from "@/lib/blog-data";
import AssessmentCTA from "@/components/home/AssessmentCTA";

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);
  return {
    title: `${post?.title || "Blog Post"} | TechMindsWithAhsan`,
    description:
      post?.excerpt || "Read the latest insights from TechMindsWithAhsan.",
    alternates: { canonical: `/blog/${params.slug}` },
    openGraph: {
      title: post?.title || "Blog Post | TechMindsWithAhsan",
      description:
        post?.excerpt || "Read the latest insights from TechMindsWithAhsan.",
      url: `https://techmindswithahsan.com/blog/${params.slug}`,
      type: "article",
    },
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);
  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-gray-300 pt-24 pb-16 font-sans">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/blog"
          className="inline-flex items-center text-[#0EA5E9] hover:text-[#0EA5E9]/80 mb-8 transition-colors"
        >
          <FiArrowLeft className="mr-2" /> Back to all articles
        </Link>

        {/* Header */}
        <header className="mb-12">
          <span className="inline-block px-3 py-1 bg-[#0EA5E9]/10 text-[#0EA5E9] text-sm font-semibold rounded-full mb-6">
            {post.category}
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 py-6 border-t border-b border-gray-800 mt-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#0EA5E9] to-[#F59E0B] flex items-center justify-center text-lg font-bold text-white shadow-lg">
              AH
            </div>
            <div>
              <div className="font-semibold text-white">Ahsan Hayat</div>
              <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                <span className="flex items-center gap-1">
                  <FiCalendar /> {post.date}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <FiClock /> {post.readTime}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-a:text-[#0EA5E9] hover:prose-a:text-[#0EA5E9]/80">
          <p className="lead text-xl text-gray-400 mb-8">{post.content[0]}</p>
          {post.content.slice(1).map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {post.youtubeUrl && (
            <a
              href={post.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-lg bg-red-600 px-4 py-3 font-semibold text-white hover:bg-red-500 transition-colors"
            >
              Watch related GearLab tutorials on YouTube
            </a>
          )}
          <AssessmentCTA />
        </div>

        {/* Footer Actions */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
              Share this article
            </span>
            <div className="flex gap-2">
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://techmindswithahsan.com/blog/${post.slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on X"
                className="p-3 bg-[#111111] hover:bg-[#0EA5E9] hover:text-white rounded-full transition-all text-gray-400"
              >
                <FiTwitter className="w-5 h-5" />
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://techmindswithahsan.com/blog/${post.slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on LinkedIn"
                className="p-3 bg-[#111111] hover:bg-[#0EA5E9] hover:text-white rounded-full transition-all text-gray-400"
              >
                <FiLinkedin className="w-5 h-5" />
              </a>
              <a
                href={`mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(`https://techmindswithahsan.com/blog/${post.slug}`)}`}
                aria-label="Share by email"
                className="p-3 bg-[#111111] hover:bg-[#0EA5E9] hover:text-white rounded-full transition-all text-gray-400"
              >
                <FiShare2 className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Author Card */}
        <div className="mt-16 bg-[#111111] border border-gray-800 rounded-2xl p-8 flex flex-col sm:flex-row gap-6 items-center sm:items-start">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#0EA5E9] to-[#F59E0B] flex-shrink-0 flex items-center justify-center text-3xl font-bold text-white shadow-lg">
            AH
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">Ahsan Hayat</h3>
            <p className="text-[#0EA5E9] font-medium mb-4">
              Founder, TechMindsWithAhsan
            </p>
            <p className="text-gray-400 mb-4">
              Full-Stack Engineer and AI Strategist helping businesses scale
              through custom AI solutions, modern web architectures, and
              data-driven growth strategies.
            </p>
            <Link
              href="/contact"
              className="inline-block px-6 py-2 bg-white text-[#0A0A0A] font-semibold rounded-lg hover:bg-gray-200 transition-colors text-sm"
            >
              Work With Me
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
