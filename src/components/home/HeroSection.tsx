"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const headlines = [
  "I Build AI Systems That Think",
  "I Build Software That Scales",
  "I Build Brands That Dominate",
];

export default function HeroSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % headlines.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0A0A0A] pt-24">
      <Image
        src="/images/techmindswithahsan-banner.webp"
        alt="TechMindsWithAhsan - Building AI That Wins"
        fill
        priority
        quality={85}
        sizes="100vw"
        className="z-0 object-cover object-center opacity-45 md:opacity-55"
      />
      {/* Top and bottom gradient scrim for header & footer transitions */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#0A0A0A]/75 via-[#0A0A0A]/35 to-[#0A0A0A]/85" />
      {/* Center radial vignette to keep text contrast crisp */}
      <div className="absolute inset-0 z-[2] bg-[radial-gradient(ellipse_at_center,rgba(10,10,10,0.6)_0%,rgba(10,10,10,0.2)_50%,transparent_90%)]" />

      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-gray-700/60 bg-gray-900/70 backdrop-blur-md shadow-lg">
            <span className="text-sm font-medium text-gray-300">
              ✦ AI Engineer · Full-Stack Developer · Tech Founder
            </span>
          </div>
        </motion.div>

        <div className="h-[120px] md:h-[150px] flex items-center justify-center mb-6">
          <AnimatePresence mode="wait">
            <motion.h1
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-5xl md:text-7xl font-bold tracking-tight text-white"
            >
              {headlines[index]}
            </motion.h1>
          </AnimatePresence>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="max-w-2xl mx-auto text-lg md:text-xl text-gray-400 mb-10 leading-relaxed"
        >
          Transforming bold ideas into intelligent digital products. From
          advanced AI automation to scalable SaaS platforms, I engineer
          solutions that drive real business growth for startups and enterprises
          worldwide.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/contact"
            className="w-full sm:w-auto px-8 py-4 bg-[#0EA5E9] hover:bg-[#0284c7] text-white rounded-lg font-semibold transition-all duration-300 shadow-lg shadow-sky-500/25"
          >
            Book a Free Strategy Call
          </Link>
          <Link
            href="/portfolio"
            className="w-full sm:w-auto px-8 py-4 bg-gray-900 hover:bg-gray-800 text-white border border-gray-800 rounded-lg font-semibold transition-all duration-300"
          >
            Explore My Work
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
