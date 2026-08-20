"use client";
import { motion } from "framer-motion";
import ProjectVisual, { ProjectVisualKind } from "./ProjectVisual";

export interface Project {
  title: string;
  category: string;
  description: string;
  challenge: string;
  solution: string;
  results: string;
  tech: string[];
  visual: ProjectVisualKind;
  image?: string;
  links?: { label: string; href: string }[];
  youtubeUrl?: string;
}

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
  index: number;
}

export default function ProjectCard({
  project,
  onClick,
  index,
}: ProjectCardProps) {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "AI Product":
        return "text-blue-400 bg-blue-400/10 border-blue-400/20";
      case "Healthcare AI":
        return "text-green-400 bg-green-400/10 border-green-400/20";
      case "YouTube Automation":
        return "text-amber-400 bg-amber-400/10 border-amber-400/20";
      case "Custom & Web Development":
        return "text-cyan-300 bg-cyan-400/10 border-cyan-400/20";
      case "WordPress Development":
        return "text-violet-300 bg-violet-400/10 border-violet-400/20";
      default:
        return "text-gray-400 bg-gray-400/10 border-gray-400/20";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      onClick={onClick}
      className="bg-[#111111] p-6 rounded-2xl border border-gray-800 hover:border-[#0EA5E9]/50 transition-all duration-300 cursor-pointer group relative overflow-hidden h-full flex flex-col"
    >
      <ProjectVisual kind={project.visual} image={project.image} compact />
      <div className="mb-4">
        <span
          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getCategoryColor(project.category)}`}
        >
          {project.category}
        </span>
      </div>

      <h3 className="text-2xl font-bold font-space text-white mb-3">
        {project.title}
      </h3>
      <p className="text-gray-400 text-sm mb-6 flex-grow">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {project.tech.slice(0, 4).map((t, i) => (
          <span
            key={i}
            className="px-2 py-1 bg-gray-900 text-gray-400 text-xs rounded-md"
          >
            {t}
          </span>
        ))}
        {project.tech.length > 4 && (
          <span className="px-2 py-1 bg-gray-900 text-gray-400 text-xs rounded-md">
            +{project.tech.length - 4}
          </span>
        )}
      </div>

      <div className="absolute inset-0 bg-[#0EA5E9]/90 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex items-center justify-center p-6 text-center z-10">
        <div>
          <span className="text-white font-bold text-lg block mb-2">
            View Details
          </span>
          <p className="text-white/90 text-sm line-clamp-3">
            {project.results.split(",")[0]}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
