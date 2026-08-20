'use client';
import { motion } from 'framer-motion';
import { Lightbulb, TrendingUp, ShieldCheck } from 'lucide-react';

const philosophies = [
  {
    icon: Lightbulb,
    title: 'Human-Centric Technology',
    description: 'Technology should empower people, not replace them. Every system I build is designed to amplify human potential and make complex tasks simple.'
  },
  {
    icon: TrendingUp,
    title: 'Growth Without Compromise',
    description: 'Great software and great business outcomes are not mutually exclusive. I engineer solutions where technical excellence drives measurable growth.'
  },
  {
    icon: ShieldCheck,
    title: 'Build to Last',
    description: 'No shortcuts, no quick fixes. Every line of code is written with scalability, security, and long-term maintainability as core principles.'
  }
];

export default function Philosophy() {
  return (
    <section className="py-20 bg-[#0A0A0A]">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-space text-white mb-4">Core Philosophy</h2>
          <div className="w-20 h-1 bg-[#0EA5E9] mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {philosophies.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-[#111111] p-8 rounded-2xl border border-gray-800 hover:border-[#0EA5E9]/50 transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-gray-900 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#0EA5E9]/10 transition-colors">
                  <Icon className="w-7 h-7 text-[#0EA5E9]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
