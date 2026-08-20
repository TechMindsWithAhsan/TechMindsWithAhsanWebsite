'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const stats = [
  { value: '50+', label: 'Projects Delivered' },
  { value: '12+', label: 'Years Experience' },
  { value: '97%', label: 'AI Accuracy Rate' },
  { value: '5+', label: 'Countries Served' },
];

export default function StatsCounter() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 bg-[#111111] border-y border-gray-900">
      <div className="container mx-auto px-6">
        <div 
          ref={ref}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-[#0EA5E9] to-[#F59E0B] text-transparent bg-clip-text mb-2">
                {stat.value}
              </div>
              <div className="text-sm md:text-base text-gray-400 font-medium tracking-wide">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
