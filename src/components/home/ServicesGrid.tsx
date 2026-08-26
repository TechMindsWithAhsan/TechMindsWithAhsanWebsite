"use client";

import Link from "next/link";
import {
  HiOutlineCpuChip,
  HiOutlineCodeBracket,
  HiOutlineDevicePhoneMobile,
  HiOutlineLightBulb,
  HiOutlineChartBar,
  HiOutlineMagnifyingGlass,
  HiOutlinePresentationChartLine,
} from "react-icons/hi2";
import FadeIn from "@/components/ui/FadeIn";
import type { Variants } from "framer-motion";

const services = [
  {
    icon: HiOutlineCpuChip,
    title: "AI Automation & Intelligent Agents",
    description:
      "Build intelligent systems that understand your business context, automate complex workflows, and deliver instant answers from your own data.",
  },
  {
    icon: HiOutlineCodeBracket,
    title: "Custom & Web Development",
    description:
      "Production-grade web applications engineered with modern architecture. From MVPs to enterprise platforms, built to handle millions of users.",
  },
  {
    icon: HiOutlineDevicePhoneMobile,
    title: "Mobile App Development",
    description:
      "Build polished iOS and Android experiences with reliable APIs, responsive interfaces, and product flows designed for everyday use.",
  },
  {
    icon: HiOutlineLightBulb,
    title: "AI Product Development",
    description:
      "Transform groundbreaking ideas into intelligent products. Medical imaging AI, educational platforms, and domain-specific intelligence that solves real problems.",
  },
  {
    icon: HiOutlineChartBar,
    title: "Digital Growth & Performance Marketing",
    description:
      "Data-driven advertising campaigns and conversion funnels that turn clicks into customers and scale your revenue predictably.",
  },
  {
    icon: HiOutlineMagnifyingGlass,
    title: "SEO & Organic Growth Strategy",
    description:
      "Technical optimization and content authority strategies that position your brand at the top of search results and keep it there.",
  },
  {
    icon: HiOutlinePresentationChartLine,
    title: "Tech Consulting & Digital Strategy",
    description:
      "Architecture audits, digital transformation roadmaps, and strategic advisory for businesses ready to embrace AI and scale globally.",
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

export default function ServicesGrid() {
  return (
    <section className="py-24 bg-[#0A0A0A]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h3 className="text-[#0EA5E9] font-semibold tracking-wider text-sm uppercase mb-3">
            What I Do
          </h3>
          <h2 className="text-3xl md:text-5xl font-bold text-white">
            Solutions Engineered for Growth
          </h2>
        </div>

        <FadeIn
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <FadeIn
                key={index}
                variants={itemVariants}
                className="group relative p-8 rounded-2xl bg-[#111111] border border-gray-800 hover:border-gray-700 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-[#0EA5E9]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-gray-900 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-7 h-7 text-[#0EA5E9]" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 mb-6 line-clamp-3">
                    {service.description}
                  </p>
                  <Link
                    href="/services"
                    className="inline-flex items-center text-[#0EA5E9] font-medium hover:text-[#0284c7] transition-colors"
                  >
                    Learn More <span className="ml-2">→</span>
                  </Link>
                </div>
              </FadeIn>
            );
          })}
        </FadeIn>
      </div>
    </section>
  );
}
