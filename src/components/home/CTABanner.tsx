'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';

export default function CTABanner() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 bg-[#111111] border-t border-gray-900">
      <div className="container mx-auto px-6">
        <motion.div 
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-10 md:p-16 text-center border border-gray-800 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#0EA5E9] to-[#F59E0B]" />
          
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Ready to Build Something Extraordinary?
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            Whether you need an AI system that thinks, software that scales, or a growth strategy that delivers, let us start the conversation.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/contact"
              className="px-8 py-4 bg-[#0EA5E9] hover:bg-[#0284c7] text-white font-bold rounded-lg transition-colors shadow-lg shadow-sky-900/50"
            >
              Book a Free Strategy Call
            </Link>
            <a
              href="https://wa.me/923012661331"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-[#F59E0B] hover:bg-[#d97706] text-white font-bold rounded-lg transition-colors shadow-lg shadow-amber-900/50"
            >
              Chat on WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
