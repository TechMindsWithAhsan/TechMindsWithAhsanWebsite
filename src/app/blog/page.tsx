import { Metadata } from "next";
import { BLOG_POSTS } from "@/lib/blog-data";
import BlogFilters from "@/components/blog/BlogFilters";

export const metadata: Metadata = {
  title: "Blog | TechMindsWithAhsan",
  alternates: { canonical: "/blog" },
  description:
    "Insights and resources on AI Engineering, Tech Strategy, Growth, and Tutorials from Ahsan Hayat.",
  openGraph: {
    title: "Blog | TechMindsWithAhsan",
    description:
      "Insights on AI engineering, startup technology, YouTube automation, and digital growth from Ahsan Hayat.",
    url: "https://techmindswithahsan.com/blog",
    type: "website",
  },
};

const CATEGORIES = [
  "All",
  "AI Engineering",
  "Tech Strategy",
  "Growth",
  "Tutorials",
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <span className="text-[#F59E0B] font-semibold tracking-wider text-sm uppercase">
            Insights & Resources
          </span>
          <h1 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight">
            Latest From the Tech Lab
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-gray-400 text-lg">
            Thoughts, tutorials, and strategies on AI, software engineering, and
            digital growth.
          </p>
        </div>

        <BlogFilters posts={BLOG_POSTS} categories={CATEGORIES} />
      </div>
    </div>
  );
}
