"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Cpu,
  Code2,
  Lightbulb,
  BarChart3,
  Search,
  LineChart,
  Smartphone,
} from "lucide-react";

interface ServiceCardProps {
  slug: string;
  iconName: string;
  title: string;
  description: string;
  deliverables: string[];
  idealFor: string;
  index: number;
}

const iconMap: Record<string, typeof Cpu> = {
  cpu: Cpu,
  code: Code2,
  lightbulb: Lightbulb,
  barchart: BarChart3,
  search: Search,
  linechart: LineChart,
  mobile: Smartphone,
};

export default function ServiceCard({
  slug,
  iconName,
  title,
  description,
  deliverables,
  idealFor,
  index,
}: ServiceCardProps) {
  const Icon = iconMap[iconName] || Cpu;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      id={slug}
      className="scroll-mt-28 bg-[#111111] p-8 rounded-2xl border border-gray-800 hover:border-[#F59E0B]/50 hover:shadow-[0_0_30px_rgba(245,158,11,0.1)] transition-all duration-300 flex flex-col h-full group"
    >
      <div className="w-16 h-16 bg-gray-900 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#F59E0B]/10 transition-colors">
        <Icon className="w-8 h-8 text-[#F59E0B]" />
      </div>

      <h3 className="text-2xl font-bold font-space text-white mb-4">{title}</h3>
      <p className="text-gray-300 leading-relaxed mb-6">{description}</p>

      <div className="mb-6 flex-grow">
        <h4 className="text-[#0EA5E9] font-semibold mb-3">Key Deliverables:</h4>
        <ul className="space-y-2">
          {deliverables.map((item, i) => (
            <li key={i} className="text-gray-400 flex items-start">
              <span className="text-[#0EA5E9] mr-2 mt-1">•</span>
              <span className="text-sm">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-8 p-4 bg-[#0A0A0A] rounded-xl border border-gray-800">
        <h4 className="text-sm font-semibold text-white mb-2">Ideal for:</h4>
        <p className="text-sm text-gray-400 italic">{idealFor}</p>
      </div>

      <Link
        href="/contact"
        className="inline-flex items-center text-[#F59E0B] font-semibold hover:text-white transition-colors mt-auto"
      >
        Start a Project <span className="ml-2">→</span>
      </Link>
    </motion.div>
  );
}
