'use client';

import FadeIn from '@/components/ui/FadeIn';
import type { Variants } from 'framer-motion';

const stats = [
  { value: '50+', label: 'Projects Delivered' },
  { value: '12+', label: 'Years Experience' },
  { value: '97%', label: 'AI Accuracy Rate' },
  { value: '5+', label: 'Countries Served' },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function StatsCounter() {
  return (
    <section className="py-20 bg-[#111111] border-y border-gray-900">
      <div className="container mx-auto px-6">
        <FadeIn variants={containerVariants} className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <FadeIn
              key={index}
              variants={itemVariants}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-[#0EA5E9] to-[#F59E0B] text-transparent bg-clip-text mb-2">
                {stat.value}
              </div>
              <div className="text-sm md:text-base text-gray-400 font-medium tracking-wide">
                {stat.label}
              </div>
            </FadeIn>
          ))}
        </FadeIn>
      </div>
    </section>
  );
}
