import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects as projectData } from "../data/projects";
import { FI, Tilt, highlightText } from "./AnimationHelpers";
import { FaTimes, FaExternalLinkAlt, FaGithub, FaChevronRight } from "react-icons/fa";

// Elegant Project Card
function ProjectCard({ project, onViewDetails }) {
  const projectColors = {
    1: "#2563eb", // Royal Blue
    2: "#4f46e5", // Indigo
    3: "#06b6d4", // Cyan
    4: "#d97706"  // Gold
  };
  const activeColor = projectColors[project.id] || "#2563eb";

  const projectCategories = {
    1: "Frontend Game",
    2: "Web Application",
    3: "Full Stack App",
    4: "E-Commerce Web"
  };
  const category = projectCategories[project.id] || "Web Project";

  return (
    <div className="w-full max-w-[1200px] mx-auto mb-16 relative">
      <Tilt className="relative w-full rounded-3xl bg-white border border-slate-200/80 overflow-hidden group/card shadow-[0_4px_30px_rgba(0,0,0,0.015)] hover:border-slate-300 transition-all duration-300">
        
        {/* Inner Card Background Overlay */}
        <div className="absolute inset-[1px] rounded-[calc(1.5rem-1px)] bg-slate-50/50 z-0" />

        {/* Card Content Layout */}
        <div className="relative z-20 flex flex-col md:flex-row h-auto">

          {/* Left Panel: Information */}
          <div className="w-full md:w-1/2 p-8 sm:p-10 md:p-12 flex flex-col justify-between h-auto border-b md:border-b-0 md:border-r border-slate-200/60 relative">
            
            <div>
              <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                <span className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-slate-200 tracking-tighter">
                  0{project.id}
                </span>
                <div className="h-[1px] w-12 bg-slate-200" />
                <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-slate-600">
                  {category}
                </span>
              </div>

              <h3 
                onClick={() => onViewDetails(project)}
                className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-800 mb-2 md:mb-4 leading-[1.1] hover:text-blue-600 transition-colors duration-300 cursor-pointer"
              >
                {project.name}
              </h3>
              
              <p className="text-slate-500 font-body font-light leading-relaxed text-sm md:text-base max-w-xl group-hover/card:text-slate-600 transition-colors duration-300">
                {highlightText(project.description, project.id === 1 ? 'fullstack' : project.id === 2 ? 'frontend' : project.id === 3 ? 'backend' : 'system')}
              </p>
            </div>

            {/* Tech Stack & Action */}
            <div className="mt-8 flex flex-col gap-6">
              <div>
                <div className="flex flex-wrap gap-1.5 md:gap-2">
                  {project.technologies.slice(0, 4).map((tech, techIdx) => (
                    <span
                      key={techIdx}
                      className="px-3 py-1.5 text-xs font-heading font-medium tracking-wide rounded-lg bg-slate-50 text-slate-600 border border-slate-250 transition-all duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="px-3 py-1.5 text-xs font-heading font-medium text-slate-400">
                      +{project.technologies.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              <button
                onClick={() => onViewDetails(project)}
                className="w-fit group/btn relative overflow-hidden rounded-2xl bg-slate-900 text-white font-semibold tracking-wide px-8 py-3 text-xs sm:text-sm transition-all duration-300 flex items-center gap-3 hover:bg-blue-600 hover:shadow-lg"
              >
                <span className="relative z-10">Case Study & Demo</span>
                <FaChevronRight className="text-xs group-hover/btn:translate-x-1 transition-transform duration-300" />
              </button>
            </div>

          </div>

          {/* Right Panel: Visual representation */}
          <div className="w-full md:w-1/2 h-auto min-h-[220px] sm:min-h-[280px] p-6 sm:p-8 flex items-center justify-center relative overflow-hidden bg-slate-100/20">
            <div 
              onClick={() => onViewDetails(project)}
              className="w-full h-full rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm z-0 hover:border-blue-500/20 transition-all duration-500 cursor-pointer"
            >
              <motion.img
                src={project.image}
                alt={project.name}
                className="w-full h-full object-cover origin-center hover:scale-[1.02] transition-transform duration-500"
                loading="lazy"
              />
            </div>
          </div>

        </div>
      </Tilt>
    </div>
  );
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  // Extended project case details for details modal
  const projectDetailsMap = {
    1: {
      role: "Lead Full-Stack Developer",
      challenge: "Creating a high-performance daily game loop that minimizes client-side load time and runs smoothly on all devices while maintaining state across sessions.",
      features: ["Daily word bank generation", "Interactive custom virtual keyboard", "Session progress analytics", "Performance-optimized DOM animations"]
    },
    2: {
      role: "Database & Backend Architect",
      challenge: "Handling synchronous inventory adjustments and transaction billing in real-time under potential connection drop-offs on local hosting services.",
      features: ["Real-time inventory level deductions", "Automated custom receipts PDF billing generator", "Sales logs and statistics reports", "Dynamic client management console"]
    },
    3: {
      role: "Full-Stack Engineer",
      challenge: "Designing a responsive notifications queue and geographical grouping mechanism to connect blood group donors with nearby emergency requests immediately.",
      features: ["Geographical user filters", "Verified donor badges dashboard", "Immediate emergency blood request broadcaster", "Responsive mobile-first state flows"]
    },
    4: {
      role: "Lead Systems Architect",
      challenge: "Ensuring secure role access parameters and reliable session validations across an un-cached PHP environment containing user transactions.",
      features: ["Custom role permissions structure (Admin vs Client)", "Secure credit credentials masking", "Advanced search optimization logs", "Dynamic product uploads database controller"]
    }
  };

  return (
    <section id="projects" className="bg-[#f8fafc] py-24 sm:py-32 relative z-10 overflow-hidden border-t border-slate-100">
      
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[150px]" />
      </div>

      {/* Header */}
      <div className="relative z-20 flex flex-col items-center justify-center mb-10 sm:mb-20 min-h-[30vh] px-4">
        <FI delay={0} y={20} className="w-full flex flex-col items-center">
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-slate-200 bg-slate-50 backdrop-blur-md mb-8">
            <span className="w-2 h-2 rounded-full bg-accent-primary" />
            <span className="text-xs sm:text-sm font-bold tracking-wider uppercase text-slate-600">
              Selected Works
            </span>
          </div>

          <h2 className="text-slate-800 font-heading font-black uppercase text-center leading-none tracking-tighter text-5xl sm:text-6xl lg:text-7xl">
            Projects
          </h2>
        </FI>
      </div>

      <div className="w-full px-4 sm:px-6 md:px-10 relative z-30 flex flex-col gap-6 pb-[10vh]">
        {projectData.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onViewDetails={(proj) => setSelectedProject(proj)}
          />
        ))}
      </div>

      {/* Premium Case Details Modal */}
      <AnimatePresence>
        {selectedProject && (() => {
          const detail = projectDetailsMap[selectedProject.id] || {
            role: "Software Developer",
            challenge: "Delivering optimal loading metrics and clean accessibility structure.",
            features: ["Clean UI components", "Optimized queries", "Responsive layout styles"]
          };
          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[10000] flex items-center justify-center p-4 sm:p-6"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.95, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 30 }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="bg-white border border-slate-200 shadow-2xl rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto z-[10001] flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="sticky top-0 bg-white/90 backdrop-blur-md px-6 py-5 border-b border-slate-100 flex justify-between items-center z-50">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                      Project Case Study
                    </span>
                    <h3 className="font-heading text-xl sm:text-2xl font-bold text-slate-800 mt-2">
                      {selectedProject.name}
                    </h3>
                  </div>
                  <button 
                    onClick={() => setSelectedProject(null)}
                    className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors duration-300"
                  >
                    <FaTimes size={16} />
                  </button>
                </div>

                {/* Modal Content */}
                <div className="p-6 sm:p-10 space-y-8 flex-1">
                  
                  {/* Large visual preview */}
                  <div className="rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm max-h-[380px]">
                    <img 
                      src={selectedProject.image} 
                      alt={selectedProject.name} 
                      className="w-full h-full object-cover" 
                    />
                  </div>

                  {/* Core Specs Grid */}
                  <div className="grid sm:grid-cols-2 gap-8 border-b border-slate-100 pb-8">
                    <div>
                      <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-slate-400 mb-2">My Role</h4>
                      <p className="text-slate-700 font-body text-base font-semibold">{detail.role}</p>
                    </div>
                    <div>
                      <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-slate-400 mb-2">Key Tech Stack</h4>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {selectedProject.technologies.map((t, idx) => (
                          <span key={idx} className="bg-slate-50 text-slate-600 border border-slate-200 px-2.5 py-1 rounded-lg text-xs font-medium">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Descriptions Columns */}
                  <div className="grid md:grid-cols-12 gap-8">
                    <div className="md:col-span-7 space-y-6">
                      <div>
                        <h4 className="font-heading text-lg font-bold text-slate-800 mb-3">Project Summary</h4>
                        <p className="text-slate-500 font-body leading-relaxed text-sm sm:text-base font-light">
                          {selectedProject.description}
                        </p>
                      </div>

                      <div>
                        <h4 className="font-heading text-lg font-bold text-slate-800 mb-3 font-semibold">Core Deliverables & Features</h4>
                        <ul className="space-y-2.5">
                          {detail.features.map((feat, idx) => (
                            <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-500 font-body font-light">
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="md:col-span-5 space-y-6">
                      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/60">
                        <h4 className="font-heading text-base font-bold text-slate-800 mb-3">The Challenge</h4>
                        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-body font-light">
                          {detail.challenge}
                        </p>
                      </div>

                      {/* Action Links */}
                      <div className="flex flex-col gap-3 pt-4">
                        {selectedProject.liveLink !== "#" ? (
                          <a
                            href={selectedProject.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-3.5 bg-blue-600 text-white font-heading font-semibold text-sm rounded-xl flex items-center justify-center gap-2 hover:bg-blue-700 hover:shadow-md transition-all duration-300"
                          >
                            <FaExternalLinkAlt size={12} />
                            <span>Launch Live Application</span>
                          </a>
                        ) : (
                          <div className="w-full py-3.5 bg-slate-100 text-slate-400 font-heading font-semibold text-sm rounded-xl flex items-center justify-center gap-2 cursor-not-allowed">
                            🔒 Enterprise Local Hosting Only
                          </div>
                        )}
                        
                        <a
                          href="https://github.com/UsamaAkbar727"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-3.5 bg-white border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-50 font-heading font-semibold text-sm rounded-xl flex items-center justify-center gap-2 transition-all duration-300"
                        >
                          <FaGithub size={14} />
                          <span>View Code on GitHub</span>
                        </a>
                      </div>
                    </div>
                  </div>

                </div>
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </section>
  );
}
