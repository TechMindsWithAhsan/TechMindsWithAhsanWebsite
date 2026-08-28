'use client';
import { motion } from 'framer-motion';

const skillCategories = [
  {
    title: 'AI & Machine Learning',
    skills: ['RAG Systems', 'LLMs', 'Computer Vision', 'NLP', 'TensorFlow', 'PyTorch', 'LangChain']
  },
  {
    title: 'Frontend Development',
    skills: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion']
  },
  {
    title: 'Backend & API',
    skills: ['Python', 'FastAPI', 'Node.js', 'REST APIs', 'WebSockets']
  },
  {
    title: 'Database & Cloud',
    skills: ['MongoDB', 'PostgreSQL', 'Supabase', 'Firebase', 'AWS']
  },
  {
    title: 'Growth & Strategy',
    skills: ['Meta Ads', 'Google Ads', 'SEO', 'CRO', 'Funnel Design']
  },
  {
    title: 'Business & Leadership',
    skills: ['Product Strategy', 'Team Leadership', 'Client Management']
  }
];

export default function SkillsShowcase() {
  return (
    <section className="py-20 bg-[#111111]">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-space text-white mb-4">Technical Expertise</h2>
          <div className="w-20 h-1 bg-[#0EA5E9] mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-[#0A0A0A] p-6 rounded-2xl border border-gray-800 hover:border-[#F59E0B]/30 transition-all duration-300"
            >
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
                {category.title}
              </h3>
              <div className="flex flex-wrap justify-start gap-x-3 gap-y-3">
                {category.skills.map((skill, sIndex) => (
                  <span
                    key={sIndex}
                    className="px-3 py-1.5 bg-gray-900 text-gray-300 text-sm rounded-lg border border-gray-800 hover:border-[#0EA5E9] hover:text-[#0EA5E9] transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
