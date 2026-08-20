"use client";

import { useState } from "react";
import ProjectCard, { Project } from "@/components/portfolio/ProjectCard";
import ProjectModal from "@/components/portfolio/ProjectModal";
import BrandLogoRail from "@/components/portfolio/BrandLogoRail";
import CTABanner from "@/components/shared/CTABanner";

const projects: Project[] = [
  {
    title: "Beta Book Publishing",
    category: "WordPress Development",
    description:
      "A WordPress publishing services platform that helps authors discover editing, cover design, formatting, ISBN, publishing, and book marketing services.",
    challenge:
      "Authors need a credible, easy-to-navigate service journey that explains the publishing process and makes it simple to request a quote.",
    solution:
      "Developed the WordPress site with a responsive service layout, clear publishing content, quote form flow, author-focused calls to action, and performance-conscious hosting setup.",
    results:
      "Live WordPress website, Publishing service journey, Quote request flow, Responsive author experience, Book marketing positioning",
    tech: [
      "WordPress",
      "PHP 8.2",
      "MySQL",
      "Hostinger",
      "LiteSpeed",
      "HTTP/3",
      "SEO",
      "Responsive UI",
    ],
    visual: "web",
    image: "/images/beta-book-publishing.webp",
    links: [
      {
        label: "Visit Beta Book Publishing",
        href: "https://betabookpublishing.com/",
      },
    ],
  },
  {
    title: "EDUCTECH AI Intelligence Suite",
    category: "AI Product",
    description:
      "A domain-specific Islamic AI platform with Quranic retrieval, voice interaction, source-grounded answers, and an adaptive Tajweed tutor.",
    challenge:
      "General-purpose AI can produce unreliable answers for sensitive religious and scholarly questions.",
    solution:
      "Built EDUCTECH with retrieval-grounded responses, verified source references, voice AI experiences, and learning workflows designed around authentic Quranic material.",
    results:
      "97% retrieval accuracy, Voice AI experience, Source-cited answers, Interactive Tajweed learning, Live product available at quranri.com",
    tech: ["RAG", "NLP", "Voice AI", "Python", "Next.js", "Vector Database"],
    visual: "quranri",
    image: "/images/quranri-ai-product.jpeg",
    youtubeUrl: "https://www.youtube.com/watch?v=yhA5UGObFb8",
    links: [{ label: "Try EDUCTECH live", href: "https://www.quranri.com/" }],
  },
  {
    title: "EDUCTECH Custom Web Platform",
    category: "Custom & Web Development",
    description:
      "The complete EDUCTECH web product, engineered across frontend, backend, authentication, AI workflows, content retrieval, and learning experiences.",
    challenge:
      "A trustworthy AI product needs a polished user experience and a dependable backend that can support multiple learning and guidance flows.",
    solution:
      "Built the EDUCTECH web application end to end with a responsive interface, backend services, authentication, Quran and Hadith navigation, tutor flows, and AI integrations.",
    results:
      "Live web platform, Full frontend and backend implementation, Quran, Hadith, Tutor, Prayers, and sign-in flows",
    tech: ["Next.js", "TypeScript", "React", "Node.js", "MongoDB", "AI APIs"],
    visual: "quranri",
    image: "/images/quranri-full-stack.png",
    youtubeUrl: "https://www.youtube.com/watch?v=yhA5UGObFb8",
    links: [
      { label: "Open EDUCTECH", href: "https://www.quranri.com/" },
      { label: "EDUCTECH tutor", href: "https://www.quranri.com/tutor" },
    ],
  },
  {
    title: "EDUCTECH Mobile Apps",
    category: "Mobile Apps",
    description:
      "EDUCTECH mobile applications built for both iOS and Android. Store publication is not yet live.",
    challenge:
      "The EDUCTECH experience needed a mobile-first form for users who rely on voice, guidance, and Quran learning away from a desktop browser.",
    solution:
      "Built EDUCTECH mobile app experiences for iOS and Android, aligned with the same product identity and AI learning direction as the web platform.",
    results:
      "iOS app build completed, Android app build completed, Mobile-first EDUCTECH experience, Store listing pending",
    tech: ["iOS", "Android", "Mobile UI", "Voice AI", "EDUCTECH API"],
    visual: "mobile",
    image: "/images/quranri-mobile-app.jpeg",
    youtubeUrl: "https://www.youtube.com/shorts/mcEMizixqLQ",
    links: [
      { label: "Open EDUCTECH web app", href: "https://www.quranri.com/" },
    ],
  },
  {
    title: "AI Medical Imaging System",
    category: "Healthcare AI",
    description:
      "A chest X-ray analysis application using deep learning to support radiology review with prediction and confidence output.",
    challenge:
      "Radiology teams need assistive tools that can reduce review time while keeping clinicians in control of the final decision.",
    solution:
      "Built a medical imaging interface around a DenseNet-121 model, image upload, analysis action, and clear prediction and confidence presentation.",
    results:
      "Chest X-ray analysis workflow, Prediction output, Confidence display, Radiologist decision support",
    tech: [
      "DenseNet-121",
      "PyTorch",
      "Python",
      "Computer Vision",
      "Medical AI",
    ],
    visual: "medical",
    image: "/images/medical-imaging.webp",
    youtubeUrl: "https://www.youtube.com/watch?v=xnd2Z5Ib7dI",
  },
  {
    title: "GearLab YouTube Automation",
    category: "YouTube & Affiliate Marketing",
    description:
      "A monetized US-focused YouTube channel covering survival gear, tactical equipment, EDC tools, and Amazon affiliate recommendations.",
    challenge:
      "Growing a reliable media operation requires consistent research, production, publishing, and performance feedback across a competitive niche.",
    solution:
      "Built a repeatable content system with AI-assisted research, YouTube SEO, a 4-5 person team, product-focused storytelling, and Amazon affiliate workflows.",
    results:
      "1.7K+ visible subscribers, 155 published videos, US audience, Amazon affiliate revenue, GearLab media kit and channel assets",
    tech: [
      "YouTube SEO",
      "AI Content Strategy",
      "Amazon Affiliates",
      "Video Production",
      "Analytics",
    ],
    visual: "gearlab",
    image: "/images/gearlab-media-kit.webp",
    youtubeUrl: "https://www.youtube.com/@Gearlabofficial",
    links: [
      {
        label: "Open GearLab channel",
        href: "https://www.youtube.com/@Gearlabofficial",
      },
    ],
  },
];

const categories = [
  "All",
  "AI Product",
  "Custom & Web Development",
  "WordPress Development",
  "Mobile Apps",
  "Healthcare AI",
  "YouTube & Affiliate Marketing",
];

export default function PortfolioClient() {
  const [filter, setFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const filteredProjects =
    filter === "All"
      ? projects
      : projects.filter((project) => project.category === filter);

  return (
    <div className="flex flex-col w-full min-h-screen">
      <section className="pt-32 pb-20 bg-[#0A0A0A] border-b border-gray-800">
        <div className="container mx-auto px-6 max-w-7xl text-center">
          <span className="text-[#0EA5E9] font-semibold tracking-wider uppercase text-sm mb-4 block">
            Portfolio
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-space text-white mb-6 max-w-4xl mx-auto">
            Products, Platforms, Apps, and Media Systems Built to Ship
          </h1>
          <p className="max-w-3xl mx-auto text-gray-400 text-lg">
            Explore EDUCTECH across AI, custom web, and mobile work, alongside
            Beta Book Publishing, medical AI, and the GearLab media operation.
          </p>
        </div>
      </section>

      <BrandLogoRail />

      <section className="py-20 bg-[#111111]">
        <div className="container mx-auto px-6 max-w-7xl">
          <div
            className="flex flex-wrap justify-center gap-3 mb-16"
            role="tablist"
            aria-label="Filter portfolio projects"
          >
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={filter === category}
                onClick={() => setFilter(category)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${filter === category ? "bg-[#0EA5E9] text-white shadow-[0_0_15px_rgba(14,165,233,0.4)]" : "bg-gray-900 text-gray-400 hover:bg-gray-800 hover:text-white"}`}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </div>
        </div>
      </section>
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
      <CTABanner />
    </div>
  );
}
