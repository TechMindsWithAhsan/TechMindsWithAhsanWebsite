'use client';

import FadeIn from '@/components/ui/FadeIn';
import type { Variants } from 'framer-motion';

const categories = [
  {
    name: 'AI & Machine Learning',
    techs: ['Python', 'TensorFlow', 'PyTorch', 'LangChain', 'RAG', 'OpenAI'],
  },
  {
    name: 'Frontend',
    techs: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
  },
  {
    name: 'Backend',
    techs: ['Node.js', 'FastAPI', 'REST APIs', 'WebSockets'],
  },
  {
    name: 'Database & Cloud',
    techs: ['MongoDB', 'PostgreSQL', 'Supabase', 'Firebase', 'AWS'],
  },
  {
    name: 'Marketing',
    techs: ['Google Ads', 'Meta Ads', 'SEO Tools', 'Analytics'],
  }
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
};

export default function TechStack() {
  return (
    <section className="py-24 bg-[#111111] border-y border-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h3 className="text-[#0EA5E9] font-semibold tracking-wider text-sm uppercase mb-3">Tech Arsenal</h3>
          <h2 className="text-3xl md:text-5xl font-bold text-white max-w-2xl mx-auto">
            Built With Industry-Leading Technologies
          </h2>
        </div>

        <div className="max-w-6xl mx-auto flex flex-col gap-12">
          {categories.map((category, idx) => (
            <div key={idx} className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="md:w-64 flex-shrink-0">
                <h4 className="text-lg font-bold text-gray-300">{category.name}</h4>
              </div>
              <FadeIn variants={containerVariants} className="flex flex-wrap gap-3 flex-1">
                {category.techs.map((tech) => (
                  <FadeIn
                    key={tech}
                    variants={itemVariants}
                    className="px-4 py-2 bg-gray-900 border border-gray-800 rounded-full text-sm font-medium text-gray-300 hover:border-[#0EA5E9] hover:text-white transition-colors cursor-default"
                  >
                    {tech}
                  </FadeIn>
                ))}
              </FadeIn>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
