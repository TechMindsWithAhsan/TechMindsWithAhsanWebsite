"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutHero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-space text-white mb-6">
              The Mind Behind <span className="text-[#0EA5E9]">TechMinds</span>
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              I am Ahsan Hayat, a Tech Founder and AI Engineer based in Karachi,
              Pakistan, on a mission to bridge the gap between cutting-edge
              technology and real business transformation. With over 12 years of
              experience spanning digital strategy, full-stack engineering, and
              artificial intelligence, I have dedicated my career to building
              solutions that do not just work but genuinely change how
              businesses operate and grow.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              My journey began in digital marketing, where I mastered the art of
              turning clicks into customers. Over the years, I evolved into a
              full-stack engineer and AI architect, combining deep technical
              expertise with a growth-driven mindset. Today, I lead
              TechMindsWithAhsan, where I help startups and enterprises
              worldwide harness the power of AI automation, production-grade
              software, and strategic digital growth.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative w-72 h-96 md:w-96 md:h-[32rem] rounded-2xl overflow-hidden border border-[#0EA5E9]/30 shadow-[0_0_40px_rgba(14,165,233,0.15)] bg-gradient-to-br from-[#111111] to-[#0A0A0A]">
              <Image
                src="/images/founder.webp"
                alt="Ahsan Hayat, founder of TechMindsWithAhsan"
                fill
                sizes="(max-width: 1024px) 288px, 384px"
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/10" />
              <div className="absolute inset-x-6 bottom-6 rounded-xl border border-white/10 bg-black/40 p-4 text-center backdrop-blur-sm">
                <p className="font-semibold text-white">Ahsan Hayat</p>
                <p className="mt-1 text-sm text-gray-400">
                  AI Engineer and Tech Founder
                </p>
              </div>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#0EA5E9]/10 blur-[100px] -z-10 rounded-full" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
