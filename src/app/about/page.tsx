import type { Metadata } from "next";
import AboutHero from "@/components/about/AboutHero";
import JourneyTimeline from "@/components/about/JourneyTimeline";
import SkillsShowcase from "@/components/about/SkillsShowcase";
import Philosophy from "@/components/about/Philosophy";
import CTABanner from "@/components/shared/CTABanner";

export const metadata: Metadata = {
  title: "About Ahsan Hayat | Tech Founder & AI Engineer",
  alternates: { canonical: "/about" },
  description:
    "Learn about Ahsan Hayat, the Tech Founder and AI Engineer behind TechMindsWithAhsan. Discover my journey from digital marketing to full-stack engineering and AI architecture.",
  openGraph: {
    title: "About Ahsan Hayat | Tech Founder & AI Engineer",
    description:
      "Discover Ahsan Hayat's journey from digital marketing to AI engineering and technology leadership.",
    url: "https://techmindswithahsan.com/about",
    type: "profile",
  },
};

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <AboutHero />
      <Philosophy />
      <SkillsShowcase />
      <JourneyTimeline />
      <CTABanner />
    </div>
  );
}
