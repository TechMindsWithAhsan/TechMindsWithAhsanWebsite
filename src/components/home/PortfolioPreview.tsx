"use client";

import Link from "next/link";
import Image from "next/image";
import FadeIn from "@/components/ui/FadeIn";
import type { Variants } from "framer-motion";

const projects = [
  {
    title: "Beta Book Publishing",
    category: "WordPress Development",
    desc: "WordPress publishing services platform for authors and book marketing",
    image: "/images/beta-book-publishing.webp",
  },
  {
    title: "EDUCTECH",
    category: "AI Product",
    desc: "World's first Islamic AI with 97% accuracy",
    image: "/images/quranri-ai-product.jpeg",
  },
  {
    title: "Medical Imaging AI",
    category: "Healthcare AI",
    desc: "DenseNet-121 diagnostic support system",
    image: "/images/medical-imaging.webp",
  },
  {
    title: "GearLab YouTube",
    category: "YouTube Automation",
    desc: "Monetized channel with 2K+ US subscribers generating affiliate revenue",
    image: "/images/gearlab-media-kit.webp",
  },
  {
    title: "EDUCTECH Mobile Apps",
    category: "Mobile Apps",
    desc: "iOS and Android app builds for EDUCTECH",
    image: "/images/quranri-mobile-app.jpeg",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function PortfolioPreview() {
  return (
    <section className="py-24 bg-[#111111]">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h3 className="text-[#0EA5E9] font-semibold tracking-wider text-sm uppercase mb-3">
              Portfolio
            </h3>
            <h2 className="text-3xl md:text-4xl font-bold text-white max-w-2xl">
              Recent Projects That Delivered Results
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="px-6 py-3 border border-gray-800 hover:border-gray-600 text-white rounded-lg font-medium transition-all duration-300 whitespace-nowrap"
          >
            View All Projects →
          </Link>
        </div>

        <FadeIn
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
        >
          {projects.map((project, idx) => (
            <FadeIn
              key={idx}
              variants={itemVariants}
              className="group relative h-80 rounded-2xl bg-gray-900 border border-gray-800 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />

              {project.category === "Mobile Apps" && project.image ? (
                <div className="absolute left-1/2 top-1/2 h-[86%] aspect-[9/19.5] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[1.4rem] border-4 border-zinc-800 bg-black shadow-2xl">
                  <Image
                    src={project.image}
                    alt={`${project.title} screenshot`}
                    fill
                    sizes="180px"
                    className="object-cover"
                  />
                </div>
              ) : project.image ? (
                <Image
                  src={project.image}
                  alt={`${project.title} project screenshot`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-rose-950 via-[#171717] to-orange-950 px-8 text-center">
                  <div>
                    <p className="text-3xl font-bold text-white">Beta Book</p>
                    <p className="mt-1 text-sm uppercase tracking-[0.2em] text-rose-200">
                      Publishing
                    </p>
                  </div>
                </div>
              )}

              <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end">
                <div className="mb-4">
                  <span className="px-3 py-1 bg-[#0EA5E9]/20 text-[#0EA5E9] text-xs font-bold rounded-full">
                    {project.category}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-300">{project.desc}</p>
              </div>

              <div className="absolute inset-0 bg-black/60 z-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm">
                <Link
                  href="/portfolio"
                  className="px-6 py-3 bg-white text-black font-semibold rounded-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                >
                  View Details
                </Link>
              </div>
            </FadeIn>
          ))}
        </FadeIn>
      </div>
    </section>
  );
}
