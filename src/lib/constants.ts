export const BRAND = {
  name: "TechMindsWithAhsan",
  founder: "Ahsan Hayat",
  title: "Tech Founder & AI Engineer",
  email: "techmindswithahsan@gmail.com",
  phone: "+92 301 2661331",
  location: "Karachi, Pakistan",
  tagline: "Engineering Digital Empires",
};

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const SOCIAL_LINKS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/techmindswithahsan/",
  },
  { label: "Facebook", href: "https://www.facebook.com/TechMindsWithAhsan" },
  { label: "Instagram", href: "https://www.instagram.com/techmindswithahsan/" },
  { label: "TikTok", href: "https://www.tiktok.com/@techmindswithahsan" },
  { label: "YouTube", href: "https://www.youtube.com/@TechMindsWithAhsan" },
  { label: "GearLab", href: "https://www.youtube.com/@Gearlabofficial" },
  { label: "GitHub", href: "https://github.com/TechMindsWithAhsan" },
];

export const SERVICES = [
  {
    id: "ai-automation",
    title: "AI Automation & Intelligent Agents",
    description:
      "Custom RAG systems, AI-powered workflows, WhatsApp bots, document processing. Build intelligent systems that understand your business context and automate complex decisions.",
    icon: "Bot",
    features: [
      "Custom RAG Systems",
      "WhatsApp Bots",
      "Document Processing",
      "Automated Workflows",
    ],
    idealFor:
      "Businesses looking to scale operations without increasing headcount.",
  },
  {
    id: "full-stack-web",
    title: "Custom & Web Development",
    description:
      "Production-grade web applications built with Next.js, React, Python, and modern cloud architecture. Scalable platforms engineered for growth.",
    icon: "Code",
    features: [
      "Next.js Applications",
      "React & Python",
      "Cloud Architecture",
      "Scalable Solutions",
    ],
    idealFor:
      "Startups and established companies needing robust, scalable digital products.",
  },
  {
    id: "ai-product-development",
    title: "AI Product Development",
    description:
      "Transform ideas into intelligent products. From medical imaging AI to domain-specific learning platforms, we architect AI that solves real problems.",
    icon: "Cpu",
    features: [
      "Medical Imaging AI",
      "Domain-Specific Learning",
      "Custom AI Models",
      "Intelligent Analytics",
    ],
    idealFor:
      "Innovators looking to disrupt their industry with AI-powered solutions.",
  },
  {
    id: "mobile-app-development",
    title: "Mobile App Development",
    description:
      "Polished iOS and Android apps with dependable APIs, focused user flows, and performance tuned for everyday use.",
    icon: "Smartphone",
    features: [
      "iOS & Android Apps",
      "Cross-Platform Interfaces",
      "API Integration",
      "Release Readiness",
    ],
    idealFor:
      "Businesses and founders extending a product or service into a focused mobile experience.",
  },
  {
    id: "digital-growth",
    title: "Digital Growth & Performance Marketing",
    description:
      "Data-driven Meta and Google Ad campaigns, conversion funnel optimization, and ROI-focused growth strategies that scale revenue.",
    icon: "TrendingUp",
    features: [
      "Meta & Google Ads",
      "Funnel Optimization",
      "ROI Strategy",
      "Data-Driven Growth",
    ],
    idealFor:
      "E-commerce brands and SaaS companies wanting to multiply their revenue.",
  },
  {
    id: "seo-organic-growth",
    title: "SEO & Organic Growth Strategy",
    description:
      "Technical SEO audits, content authority building, and organic traffic strategies that establish your brand as an industry leader.",
    icon: "Search",
    features: [
      "Technical SEO Audits",
      "Content Authority",
      "Organic Traffic",
      "Competitor Analysis",
    ],
    idealFor:
      "Brands aiming for long-term, sustainable organic lead generation.",
  },
  {
    id: "tech-consulting",
    title: "Tech Consulting & Digital Strategy",
    description:
      "Architecture audits, digital transformation roadmaps, and fractional CTO advisory for startups and enterprises ready to scale.",
    icon: "Briefcase",
    features: [
      "Architecture Audits",
      "Transformation Roadmaps",
      "Fractional CTO",
      "Tech Stack Advisory",
    ],
    idealFor:
      "Growing companies needing expert technical leadership and strategy.",
  },
];

export const PROJECTS = [
  {
    id: "quranri",
    title: "EDUCTECH (FLAGSHIP)",
    category: "AI Product",
    description:
      "World's first domain-specific Islamic AI platform achieving 97% accuracy in Quranic knowledge retrieval. Built with advanced RAG architecture, zero-hallucination guardrails, and interactive Tajweed learning tools.",
    challenge:
      "Creating a highly accurate, hallucination-free AI for sensitive religious texts.",
    solution:
      "Implemented a custom RAG architecture with strict guardrails and domain-specific training.",
    results:
      "Achieved 97% accuracy in retrieval, serving thousands of users with reliable Islamic knowledge.",
    techStack: ["Python", "Next.js", "Vector Database", "LLMs", "Tailwind CSS"],
    link: "#",
  },
  {
    id: "medical-imaging",
    title: "AI-Powered Medical Imaging System",
    category: "Healthcare AI",
    description:
      "Healthcare diagnostic support tool using DenseNet-121 deep learning for chest X-ray analysis, reducing diagnostic turnaround and supporting radiologists.",
    challenge: "Improving diagnostic speed and accuracy for chest X-rays.",
    solution:
      "Developed a deep learning model based on DenseNet-121 for automated X-ray analysis.",
    results:
      "Significantly reduced diagnostic turnaround time and provided reliable support for radiologists.",
    techStack: ["Python", "PyTorch", "DenseNet-121", "React", "FastAPI"],
    link: "#",
  },
  {
    id: "gearlab",
    title: "GearLab YouTube Automation",
    category: "YouTube Automation & Affiliate Marketing",
    description:
      "Built and scaled a monetized YouTube channel (@Gearlabofficial) to 2K+ subscribers in the USA market. Focused on survival gear, tactical equipment, and EDC tools with Amazon affiliate revenue. Runs with a team of 4-5 members generating consistent USD revenue. Also expanded to Spanish market (Gear Lab ESP, 277 subs).",
    challenge:
      "Creating a sustainable, automated revenue stream through YouTube in a competitive niche.",
    solution:
      "Developed a content pipeline and team structure for consistent, high-quality video production and affiliate marketing.",
    results:
      "Scaled to 2K+ subs, monetized, established consistent USD revenue, and successfully expanded into the Spanish market.",
    techStack: [
      "YouTube SEO",
      "Premiere Pro",
      "Affiliate Marketing",
      "Content Automation",
    ],
    link: "https://www.youtube.com/@Gearlabofficial",
  },
];

export const STATS = [
  { value: 50, suffix: "+", label: "Projects Delivered" },
  { value: 12, suffix: "+", label: "Years Experience" },
  { value: 97, suffix: "%", label: "AI Accuracy Rate" },
  { value: 5, suffix: "+", label: "Countries Served" },
];

export const TECH_STACK = [
  {
    category: "AI & ML",
    technologies: [
      "Python",
      "PyTorch",
      "TensorFlow",
      "LangChain",
      "OpenAI API",
      "Hugging Face",
    ],
  },
  {
    category: "Frontend",
    technologies: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Redux",
    ],
  },
  {
    category: "Backend",
    technologies: [
      "Node.js",
      "Express",
      "FastAPI",
      "Django",
      "GraphQL",
      "REST APIs",
    ],
  },
  {
    category: "Database & Cloud",
    technologies: [
      "MongoDB",
      "PostgreSQL",
      "AWS",
      "Google Cloud",
      "Vercel",
      "Docker",
    ],
  },
  {
    category: "Marketing",
    technologies: [
      "Google Ads",
      "Meta Ads",
      "SEO",
      "Google Analytics",
      "HubSpot",
    ],
  },
];

export const TESTIMONIALS = [
  {
    name: "Sarah Johnson",
    role: "CEO",
    company: "TechFlow Solutions",
    quote:
      "Ahsan and his team transformed our operations with their custom AI automation. We saved countless hours and increased our efficiency exponentially.",
  },
  {
    name: "Michael Chen",
    role: "Founder",
    company: "HealthTech Innovations",
    quote:
      "The medical imaging AI model developed by TechMindsWithAhsan exceeded our expectations in accuracy and deployment speed. A true partner in innovation.",
  },
  {
    name: "Elena Rodriguez",
    role: "Marketing Director",
    company: "E-Shop Global",
    quote:
      "Their data-driven approach to performance marketing scaled our revenue by 300% in just 6 months. Highly recommend their growth strategies.",
  },
];
