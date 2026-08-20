'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { HiOutlineSparkles, HiOutlineShieldCheck, HiOutlineArrowTrendingUp, HiOutlineUserGroup } from 'react-icons/hi2';

const features = [
  {
    icon: HiOutlineSparkles,
    title: 'AI-First Engineering',
    desc: 'Every solution is designed with intelligent automation at its core. Not just adding AI as an afterthought, but architecting systems where AI drives the value.',
  },
  {
    icon: HiOutlineShieldCheck,
    title: 'Production-Grade Quality',
    desc: 'No shortcuts, no fragile prototypes. Every line of code is built for scale, security, and long-term maintainability in high-traffic production environments.',
  },
  {
    icon: HiOutlineArrowTrendingUp,
    title: 'Growth-Driven Strategy',
    desc: 'Technology without strategy is just an expensive hobby. Every technical decision is aligned with measurable business outcomes and revenue growth.',
  },
  {
    icon: HiOutlineUserGroup,
    title: 'Direct Founder Access',
    desc: 'Work directly with the architect behind the code. No account managers, no communication gaps. Just transparent, high-bandwidth collaboration.',
  }
];

export default function WhyChooseMe() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 bg-[#0A0A0A]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h3 className="text-[#F59E0B] font-semibold tracking-wider text-sm uppercase mb-3">Why TechMinds</h3>
          <h2 className="text-3xl md:text-5xl font-bold text-white">What Sets This Partnership Apart</h2>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex flex-col sm:flex-row gap-6 p-6 md:p-8 rounded-2xl bg-[#111111] border border-gray-800"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-[#0EA5E9]/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-[#0EA5E9]" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
