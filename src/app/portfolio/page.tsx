import type { Metadata } from "next";
import PortfolioClient from "@/components/portfolio/PortfolioClient";

export const metadata: Metadata = {
  title: "Portfolio | TechMindsWithAhsan Projects",
  alternates: { canonical: "/portfolio" },
  description:
    "Explore EDUCTECH AI, custom web and mobile apps, Medical Imaging AI, Beta Book Publishing, and GearLab projects by Ahsan Hayat.",
  openGraph: {
    title: "Portfolio | TechMindsWithAhsan Projects",
    description:
      "Explore EDUCTECH AI, custom web and mobile apps, Medical Imaging AI, Beta Book Publishing, and GearLab projects by Ahsan Hayat.",
    url: "https://techmindswithahsan.com/portfolio",
    type: "website",
  },
};

export default function PortfolioPage() {
  return <PortfolioClient />;
}
