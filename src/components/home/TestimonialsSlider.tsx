"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiStar, HiChevronLeft, HiChevronRight } from "react-icons/hi2";

const testimonials = [
  {
    quote:
      "Working with Ahsan was a game changer for our startup. The AI integration he developed completely streamlined our operations and saved us hundreds of hours.",
    name: "Sarah Jenkins",
    role: "CEO",
    company: "TechFlow Solutions",
  },
  {
    quote:
      "The technical expertise and strategic thinking Ahsan brought to our project were unmatched. Our web platform handles our growing user base flawlessly.",
    name: "Michael Chen",
    role: "Founder",
    company: "GrowthMatrix",
  },
  {
    quote:
      "EDUCTECH is a phenomenal achievement. The accuracy and care put into the AI architecture demonstrate a deep understanding of both technology and domain requirements.",
    name: "Dr. Ahmed Hassan",
    role: "Director of Education",
    company: "Islamic Heritage Institute",
  },
];

export default function TestimonialsSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () =>
    setCurrent(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );

  return (
    <section className="py-24 bg-[#0A0A0A]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h3 className="text-[#F59E0B] font-semibold tracking-wider text-sm uppercase mb-3">
            Client Stories
          </h3>
          <h2 className="text-3xl md:text-5xl font-bold text-white">
            Trusted by Founders and Businesses
          </h2>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <div className="bg-[#111111] border border-gray-800 rounded-3xl p-8 md:p-16 relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center text-center"
              >
                <div className="flex gap-1 mb-8">
                  {[...Array(5)].map((_, i) => (
                    <HiStar key={i} className="w-6 h-6 text-[#F59E0B]" />
                  ))}
                </div>

                <p className="text-xl md:text-3xl text-gray-300 italic mb-10 leading-relaxed font-light">
                  &ldquo;{testimonials[current].quote}&rdquo;
                </p>

                <div>
                  <h4 className="text-lg font-bold text-white">
                    {testimonials[current].name}
                  </h4>
                  <p className="text-[#0EA5E9]">
                    {testimonials[current].role},{" "}
                    {testimonials[current].company}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 w-12 h-12 bg-gray-900 border border-gray-800 rounded-full flex items-center justify-center text-white hover:bg-gray-800 transition-colors z-10"
          >
            <HiChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 w-12 h-12 bg-gray-900 border border-gray-800 rounded-full flex items-center justify-center text-white hover:bg-gray-800 transition-colors z-10"
          >
            <HiChevronRight className="w-6 h-6" />
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${i === current ? "bg-[#0EA5E9] w-6" : "bg-gray-700"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
