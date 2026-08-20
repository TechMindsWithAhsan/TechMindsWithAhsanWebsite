"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const features = [
  {
    title: "97% Accuracy",
    desc: "Domain-grounded responses with precise verse citations",
  },
  {
    title: "Zero Hallucination",
    desc: "Built-in safety guardrails ensure every answer is verifiable",
  },
  {
    title: "Adaptive Learning",
    desc: "Interactive Tajweed tutor from Noorani Qaida to advanced recitation",
  },
];

const techStack = ["RAG", "NLP", "Python", "Next.js", "Vector DB", "LLMs"];

export default function FlagshipProject() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 bg-[#0A0A0A] relative overflow-hidden">
      <div className="absolute inset-0 bg-[#0EA5E9]/5 skew-y-3 transform origin-bottom-left" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
          className="relative p-1 rounded-3xl bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 hover:from-[#0EA5E9]/50 hover:to-[#F59E0B]/50 transition-colors duration-500"
        >
          <div className="bg-[#111111] rounded-[22px] p-8 md:p-12 lg:p-16 flex flex-col lg:flex-row gap-12 items-center">
            <div className="flex-1 space-y-6">
              <div className="inline-block px-3 py-1 bg-[#F59E0B]/10 border border-[#F59E0B]/20 rounded-full">
                <span className="text-xs font-bold text-[#F59E0B] tracking-wider uppercase">
                  ★ Flagship Project
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                EDUCTECH: Pioneering Islamic AI Intelligence
              </h2>

              <p className="text-lg text-gray-400 leading-relaxed">
                Built the world&apos;s first domain-specific Islamic AI platform
                that achieves 97% accuracy in Quranic knowledge retrieval.
                EDUCTECH combines advanced Retrieval-Augmented Generation
                architecture with zero-hallucination guardrails to deliver
                verified, source-cited answers for Islamic education.
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-gray-900 border border-gray-800 rounded-md text-sm text-gray-300 font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="pt-6">
                <Link
                  href="/portfolio"
                  className="inline-flex items-center px-6 py-3 bg-[#0EA5E9] hover:bg-[#0284c7] text-white rounded-lg font-semibold transition-colors duration-300"
                >
                  View Full Case Study <span className="ml-2">→</span>
                </Link>
              </div>
            </div>

            <div className="flex-1 w-full grid gap-4">
              {features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  animate={
                    isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }
                  }
                  transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
                  className="bg-gray-900/50 border border-gray-800 p-6 rounded-xl"
                >
                  <h4 className="text-xl font-bold text-white mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-gray-400 text-sm">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
