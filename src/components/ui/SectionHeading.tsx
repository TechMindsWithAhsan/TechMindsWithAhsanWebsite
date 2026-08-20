'use client';

import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export default function SectionHeading({
  title,
  subtitle,
  centered = true,
  className,
}: SectionHeadingProps) {
  // Simple regex to find words to highlight (e.g., words wrapped in *)
  // Or just color the last word. We'll highlight the first word if it has two words, or just a simple split.
  // Actually, let's keep it simple: no auto highlight unless specified, or we can just render it.
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
      className={twMerge('mb-12', centered ? 'text-center flex flex-col items-center' : 'text-left flex flex-col items-start', className)}
    >
      {subtitle && (
        <span className="text-sky-500 uppercase tracking-widest text-sm font-semibold mb-3">
          {subtitle}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
        {title}
      </h2>
      <div className={twMerge('h-1 bg-gradient-to-r from-sky-500 to-transparent w-24 rounded', centered ? 'mx-auto' : '')} />
    </motion.div>
  );
}
