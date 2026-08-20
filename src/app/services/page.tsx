import type { Metadata } from "next";
import ServiceCard from "@/components/services/ServiceCard";
import ProcessSteps from "@/components/services/ProcessSteps";
import CTABanner from "@/components/shared/CTABanner";

export const metadata: Metadata = {
  title: "Services | AI Automation & Digital Growth",
  alternates: { canonical: "/services" },
  description:
    "Explore my services from Intelligent AI Systems to Scalable Growth Strategies, delivering end-to-end technology solutions.",
  openGraph: {
    title: "Services | AI Automation & Digital Growth",
    description:
      "Explore AI automation, custom web development, AI products, marketing, SEO, and technology consulting from Ahsan Hayat.",
    url: "https://techmindswithahsan.com/services",
    type: "website",
  },
};

const services = [
  {
    iconName: "cpu",
    slug: "ai-automation",
    title: "AI Automation & Intelligent Agents",
    description:
      "Unlock the power of AI to automate complex business processes. I build custom intelligent agents, RAG-powered knowledge systems, WhatsApp AI bots, and workflow automation tools that understand your specific business context and deliver accurate, instant responses.",
    deliverables: [
      "Custom RAG pipelines",
      "AI chatbots and virtual assistants",
      "WhatsApp and Telegram AI integrations",
      "Document processing and extraction",
      "Internal knowledge base automation",
    ],
    idealFor:
      "Businesses drowning in repetitive tasks, customer support teams handling high volumes, and enterprises wanting to unlock the value in their internal documentation.",
  },
  {
    iconName: "code",
    slug: "custom-web-development",
    title: "Custom & Web Development",
    description:
      "Production-grade web applications and SaaS platforms built with modern architecture that handles growth. From MVP to enterprise scale, I use Next.js, React, Python, and cloud-native technologies to deliver fast, secure, and beautiful digital products.",
    deliverables: [
      "Custom web application development",
      "SaaS platform architecture",
      "API design and integration",
      "Database optimization",
      "Cloud deployment and DevOps",
    ],
    idealFor:
      "Startups building their first product, growing companies scaling their platforms, and enterprises modernizing legacy systems.",
  },
  {
    iconName: "mobile",
    slug: "mobile-app-development",
    title: "Mobile App Development",
    description:
      "Create polished iOS and Android apps with dependable APIs, responsive interfaces, and user flows that feel fast and natural on every device.",
    deliverables: [
      "iOS and Android app development",
      "Cross-platform product interfaces",
      "API and authentication integration",
      "Push notifications and app flows",
      "App performance and release readiness",
    ],
    idealFor:
      "Founders and businesses turning a web product, service, or new idea into a focused mobile experience.",
  },
  {
    iconName: "lightbulb",
    slug: "ai-product-development",
    title: "AI Product Development",
    description:
      "Transform your vision into an intelligent product that solves real-world problems. From medical imaging AI to educational platforms and domain-specific intelligence tools, I architect AI products from concept to production.",
    deliverables: [
      "Domain-specific AI model development",
      "Computer vision and medical AI",
      "NLP and language processing tools",
      "AI tutor and learning platforms",
      "Production deployment and monitoring",
    ],
    idealFor:
      "Innovators with AI product ideas, healthcare organizations exploring diagnostic AI, and educational institutions building personalized learning experiences.",
  },
  {
    iconName: "barchart",
    slug: "growth-marketing",
    title: "Digital Growth & Performance Marketing",
    description:
      "Data-driven advertising campaigns and conversion optimization strategies that deliver predictable revenue growth. I design and execute high-ROI marketing funnels across Meta, Google, and emerging platforms.",
    deliverables: [
      "Meta and Google Ad campaign management",
      "Conversion funnel design and optimization",
      "Landing page development",
      "A/B testing and CRO",
      "Revenue analytics and reporting",
    ],
    idealFor:
      "E-commerce brands scaling ad spend, startups looking for their first 1000 customers, and businesses wanting to maximize return on every marketing dollar.",
  },
  {
    iconName: "search",
    slug: "seo-strategy",
    title: "SEO & Organic Growth Strategy",
    description:
      "Technical SEO audits, content authority building, and organic traffic strategies that establish your brand as the definitive voice in your industry. Long-term growth through search visibility and thought leadership.",
    deliverables: [
      "Comprehensive technical SEO audits",
      "Keyword strategy and content planning",
      "On-page and off-page optimization",
      "Schema markup and structured data",
      "Performance tracking and reporting",
    ],
    idealFor:
      "Businesses investing in long-term organic growth, content-driven brands building authority, and companies tired of relying solely on paid advertising.",
  },
  {
    iconName: "linechart",
    slug: "tech-consulting",
    title: "Tech Consulting & Digital Strategy",
    description:
      "Strategic technology advisory for businesses navigating digital transformation. Whether you need an architecture audit, a digital roadmap, or fractional CTO guidance, I bring seasoned expertise to your most critical technology decisions.",
    deliverables: [
      "Technology stack evaluation and recommendation",
      "Digital transformation roadmaps",
      "Architecture audits and optimization",
      "Fractional CTO advisory",
      "Team scaling and hiring guidance",
    ],
    idealFor:
      "Startups needing senior technical direction without full-time CTO costs, enterprises undergoing digital transformation, and founders evaluating build vs buy decisions.",
  },
];

export default function ServicesPage() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <section className="pt-32 pb-20 bg-[#0A0A0A] border-b border-gray-800">
        <div className="container mx-auto px-6 max-w-7xl text-center">
          <span className="text-[#0EA5E9] font-semibold tracking-wider uppercase text-sm mb-4 block">
            Services Engineered for Impact
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-space text-white mb-6 max-w-4xl mx-auto">
            From Intelligent AI Systems to Scalable Growth Strategies
          </h1>
        </div>
      </section>

      <section className="py-20 bg-[#111111]">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                slug={service.slug}
                index={index}
                iconName={service.iconName}
                title={service.title}
                description={service.description}
                deliverables={service.deliverables}
                idealFor={service.idealFor}
              />
            ))}
          </div>
        </div>
      </section>

      <ProcessSteps />
      <CTABanner />
    </div>
  );
}
