"use client";
import { motion } from "framer-motion";

const timelineData = [
  {
    year: "2014",
    title: "Digital Foundations",
    description:
      "Started exploring the digital landscape, mastering web technologies and digital marketing strategies that would become the foundation for everything ahead.",
  },
  {
    year: "2017",
    title: "Growth Marketing Mastery",
    description:
      "Built expertise in performance marketing, managing campaigns across Meta and Google platforms, driving measurable ROI for businesses across Pakistan.",
  },
  {
    year: "2020",
    title: "Full-Stack Engineering",
    description:
      "Transitioned into full-stack software development, building scalable web applications with modern technologies like React, Next.js, and Python.",
  },
  {
    year: "2022",
    title: "AI Revolution",
    description:
      "Embraced AI and machine learning, specializing in RAG architectures, large language models, and domain-specific AI solutions for enterprise clients.",
  },
  {
    year: "2023",
    title: "EDUCTECH Launch",
    description:
      "Launched EDUCTECH, the world-first domain-specific Islamic AI platform with 97% accuracy, pioneering the intersection of faith and technology.",
  },
  {
    year: "2024",
    title: "GearLab & Scaling Globally",
    description:
      "Built and monetized GearLab, a YouTube automation venture targeting the US market with a team of 4 to 5 members, generating consistent affiliate revenue through strategic content and Amazon partnerships.",
  },
  {
    year: "2025",
    title: "TechMindsWithAhsan Today",
    description:
      "Leading a full-service AI engineering and digital growth practice, serving clients across the USA, Pakistan, and beyond with innovative solutions.",
  },
];

export default function JourneyTimeline() {
  return (
    <section className="py-20 bg-[#0A0A0A]">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-space text-white mb-4">
            The Journey So Far
          </h2>
          <div className="w-20 h-1 bg-[#0EA5E9] mx-auto rounded-full" />
        </motion.div>

        <div className="relative border-l border-[#0EA5E9]/30 ml-4 md:ml-0 md:mx-auto">
          {timelineData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`mb-12 relative pl-8 md:pl-0 ${index % 2 === 0 ? "md:pr-1/2 md:text-right" : "md:pl-1/2 md:ml-auto"} md:w-1/2`}
            >
              <div
                className={`absolute top-0 w-4 h-4 rounded-full bg-[#0EA5E9] shadow-[0_0_10px_#0EA5E9] -left-[9px] md:${index % 2 === 0 ? "-right-[9px] left-auto" : "-left-[9px]"}`}
              />

              <div
                className={`bg-[#111111] p-6 rounded-xl border border-gray-800 hover:border-[#0EA5E9]/50 transition-colors duration-300 ${index % 2 === 0 ? "md:mr-8" : "md:ml-8"}`}
              >
                <span className="inline-block px-3 py-1 bg-[#0EA5E9]/10 text-[#0EA5E9] rounded-full text-sm font-semibold mb-3">
                  {item.year}
                </span>
                <h3 className="text-xl font-bold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
