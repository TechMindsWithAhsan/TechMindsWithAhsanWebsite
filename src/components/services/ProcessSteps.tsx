'use client';
import { motion } from 'framer-motion';

const steps = [
  {
    title: 'Discovery',
    description: 'We start by understanding your business goals, challenges, and vision. Every great solution begins with deep understanding.'
  },
  {
    title: 'Strategy',
    description: 'Based on your unique requirements, I craft a detailed technical and growth roadmap that aligns every decision with measurable outcomes.'
  },
  {
    title: 'Build',
    description: 'Using industry-leading technologies and best practices, I engineer your solution with precision, keeping you updated at every milestone.'
  },
  {
    title: 'Launch',
    description: 'Rigorous testing, performance optimization, and seamless deployment ensure your product hits the market ready to perform.'
  },
  {
    title: 'Scale',
    description: 'Post-launch support, analytics monitoring, and strategic optimization to help your product grow continuously.'
  }
];

export default function ProcessSteps() {
  return (
    <section className="py-20 bg-[#0A0A0A]">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-space text-white mb-4">How We Work</h2>
          <div className="w-20 h-1 bg-[#0EA5E9] mx-auto rounded-full" />
        </motion.div>

        <div className="relative">
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-800 -translate-y-1/2" />
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative bg-[#111111] p-6 rounded-2xl border border-gray-800 text-center"
              >
                <div className="w-10 h-10 rounded-full bg-[#0EA5E9] text-white font-bold flex items-center justify-center mx-auto mb-4 -mt-10 border-4 border-[#0A0A0A]">
                  {index + 1}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
