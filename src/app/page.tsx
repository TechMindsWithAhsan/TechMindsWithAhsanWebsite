import { Metadata } from "next";
import dynamic from "next/dynamic";
import HeroSection from "@/components/home/HeroSection";
import BrandLogoRail from "@/components/portfolio/BrandLogoRail";
import StatsCounter from "@/components/home/StatsCounter";
import ServicesGrid from "@/components/home/ServicesGrid";
import AssessmentCTA from "@/components/home/AssessmentCTA";

const FlagshipProject = dynamic(() => import("@/components/home/FlagshipProject"));
const PortfolioPreview = dynamic(() => import("@/components/home/PortfolioPreview"));
const WhyChooseMe = dynamic(() => import("@/components/home/WhyChooseMe"));
const TechStack = dynamic(() => import("@/components/home/TechStack"), { ssr: false });
const TestimonialsSlider = dynamic(() => import("@/components/home/TestimonialsSlider"));
const BlogPreview = dynamic(() => import("@/components/home/BlogPreview"));
const CTABanner = dynamic(() => import("@/components/home/CTABanner"), { ssr: false });

export const metadata: Metadata = {
  title: "TechMindsWithAhsan | AI Engineering & Custom Web Development",
  alternates: { canonical: "/" },
  description:
    "Ahsan Hayat is a Tech Founder and AI Engineer transforming bold ideas into intelligent digital products. Specializing in scalable SaaS platforms and AI automation.",
  openGraph: {
    title: "TechMindsWithAhsan | AI Engineering & Custom Web Development",
    description:
      "Transforming bold ideas into intelligent digital products. Specializing in AI automation, scalable SaaS platforms, and digital growth.",
    url: "https://techmindswithahsan.com",
    siteName: "TechMindsWithAhsan",
    images: [
      {
        url: "/images/techmindswithahsan-banner.webp",
        width: 1200,
        height: 630,
        alt: "TechMindsWithAhsan",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://techmindswithahsan.com/#website",
        url: "https://techmindswithahsan.com/",
        name: "TechMindsWithAhsan",
        description: "AI Engineering and Custom Web Development",
        publisher: {
          "@id": "https://techmindswithahsan.com/#person",
        },
      },
      {
        "@type": "Person",
        "@id": "https://techmindswithahsan.com/#person",
        name: "Ahsan Hayat",
        jobTitle: "Tech Founder & AI Engineer",
        url: "https://techmindswithahsan.com",
        sameAs: [
          "https://www.linkedin.com/in/techmindswithahsan/",
          "https://www.facebook.com/TechMindsWithAhsan",
          "https://www.instagram.com/techmindswithahsan/",
          "https://www.tiktok.com/@techmindswithahsan",
          "https://www.youtube.com/@TechMindsWithAhsan",
          "https://www.youtube.com/@Gearlabofficial",
          "https://github.com/TechMindsWithAhsan",
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="flex flex-col min-h-screen bg-[#0A0A0A]">
        <HeroSection />
        <BrandLogoRail />
        <StatsCounter />
        <ServicesGrid />
        <FlagshipProject />
        <PortfolioPreview />
        <WhyChooseMe />
        <TechStack />
        <TestimonialsSlider />
        <BlogPreview />
        <AssessmentCTA />
        <CTABanner />
      </main>
    </>
  );
}
