'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from './ProjectCard';
import ProjectVisual from './ProjectVisual';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      >
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-[#111111] border border-gray-800 rounded-2xl p-6 md:p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto relative"
        >
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-gray-900 rounded-full text-gray-400 hover:text-white transition-colors"
          >
            ✕
          </button>

          <div className="mb-6 mt-4 md:mt-0">
            <ProjectVisual kind={project.visual} image={project.image} />
            <span className="inline-block px-3 py-1 bg-[#0EA5E9]/10 text-[#0EA5E9] rounded-full text-sm font-semibold mb-3">
              {project.category}
            </span>
            <h2 className="text-3xl font-bold font-space text-white">{project.title}</h2>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-[#F59E0B] mb-2">The Challenge</h3>
              <p className="text-gray-300 leading-relaxed">{project.challenge}</p>
            </div>
            {project.youtubeUrl && (
              <a href={project.youtubeUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center rounded-lg bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-500 transition-colors">
                Watch on YouTube
              </a>
            )}
            {project.links && project.links.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {project.links.map((link) => (
                  <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center rounded-lg border border-[#0EA5E9]/50 px-4 py-2 font-semibold text-[#7dd3fc] hover:bg-[#0EA5E9]/10 transition-colors">
                    {link.label}
                  </a>
                ))}
              </div>
            )}
            
            <div>
              <h3 className="text-xl font-bold text-[#0EA5E9] mb-2">The Solution</h3>
              <p className="text-gray-300 leading-relaxed">{project.solution}</p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-white mb-3">Key Results</h3>
              <ul className="space-y-2">
                {project.results.split(', ').map((res, i) => (
                  <li key={i} className="flex items-start text-gray-300">
                    <span className="text-[#0EA5E9] mr-2 mt-1">✓</span>
                    <span>{res}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-3">Technologies Used</h3>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t, i) => (
                  <span key={i} className="px-3 py-1 bg-gray-900 text-gray-300 text-sm rounded-lg border border-gray-800">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
