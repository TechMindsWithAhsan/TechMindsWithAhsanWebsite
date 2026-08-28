import { Metadata } from "next";
import { BRAND } from "./constants";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: "website" | "article" | "profile";
  author?: string;
  publishedTime?: string;
}

export function generateMetadata({
  title,
  description = BRAND.tagline,
  keywords = [],
  image = "/images/logo.png?v=4",
  url = "https://techmindswithahsan.com",
  type = "website",
  author = BRAND.founder,
  publishedTime,
}: SEOProps = {}): Metadata {
  const pageTitle = title
    ? `${title} | ${BRAND.name}`
    : `${BRAND.name} | ${BRAND.tagline}`;

  const openGraphData: Metadata["openGraph"] =
    type === "article"
      ? {
          type: "article",
          title: pageTitle,
          description,
          url,
          siteName: BRAND.name,
          publishedTime,
          authors: [author],
          images: [
            {
              url: image,
              width: 1200,
              height: 630,
              alt: pageTitle,
            },
          ],
        }
      : {
          type: "website",
          title: pageTitle,
          description,
          url,
          siteName: BRAND.name,
          images: [
            {
              url: image,
              width: 1200,
              height: 630,
              alt: pageTitle,
            },
          ],
        };

  const baseMetadata: Metadata = {
    title: pageTitle,
    description,
    keywords: [
      ...keywords,
      "TechMindsWithAhsan",
      "Ahsan Hayat",
      "AI Automation",
      "Custom & Web Development",
    ],
    authors: [{ name: author }],
    creator: author,
    openGraph: openGraphData,
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: [image],
      creator: "@techmindswithahsan",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };

  return baseMetadata;
}

export function generatePersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: BRAND.founder,
    jobTitle: BRAND.title,
    url: "https://techmindswithahsan.com",
    sameAs: [
      "https://www.linkedin.com/in/techmindswithahsan/",
      "https://www.youtube.com/@TechMindsWithAhsan",
      "https://github.com/techmindswithahsan",
      "https://github.com/TechMindsWithAhsan",
    ],
  };
}

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BRAND.name,
    url: "https://techmindswithahsan.com",
    logo: "https://techmindswithahsan.com/images/logo.png?v=4",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: BRAND.phone,
      contactType: "customer service",
      email: BRAND.email,
    },
    sameAs: [
      "https://www.linkedin.com/company/techmindswithahsan",
      "https://www.facebook.com/TechMindsWithAhsan",
      "https://www.instagram.com/techmindswithahsan/",
      "https://www.tiktok.com/@techmindswithahsan",
      "https://www.youtube.com/@TechMindsWithAhsan",
    ],
  };
}

export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: BRAND.name,
    url: "https://techmindswithahsan.com",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://techmindswithahsan.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };
}

export function generateArticleSchema({
  title,
  description,
  image,
  datePublished,
  dateModified,
  authorName = BRAND.founder,
  url,
}: {
  title: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  authorName?: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description,
    image: image,
    author: {
      "@type": "Person",
      name: authorName,
    },
    publisher: {
      "@type": "Organization",
      name: BRAND.name,
      logo: {
        "@type": "ImageObject",
        url: "https://techmindswithahsan.com/images/logo.png?v=4",
      },
    },
    datePublished: datePublished,
    dateModified: dateModified || datePublished,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };
}
