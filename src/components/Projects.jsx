import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects as projectData } from "../data/projects";
import { FI, Tilt, highlightText } from "./AnimationHelpers";
import { FaTimes, FaExternalLinkAlt, FaGithub, FaChevronRight } from "react-icons/fa";

// Elegant Project Card
function ProjectCard({ project, onViewDetails }) {
  const projectColors = {
    1: "var(--accent-primary)",
    2: "var(--accent-secondary)",
    3: "var(--accent-tertiary)",
    4: "var(--accent-gold)"
  };
  const activeColor = projectColors[project.id] || "var(--accent-primary)";

  const projectCategories = {
    1: "Frontend Game",
    2: "Web Application",
    3: "Full Stack App",
    4: "E-Commerce Web"
  };
  const category = projectCategories[project.id] || "Web Project";

  return (
    <div className="w-full max-w-[1100px] mx-auto mb-20 relative">
      
      {/* Editorial Card Grid layout */}
      <div className="relative w-full rounded-[2.5rem] bg-bg-primary border border-glass-border shadow-premium overflow-hidden group/card transition-all duration-300">
        
        {/* Fine background lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--glass-border)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />

        {/* Content Columns */}
        <div className="relative z-10 flex flex-col lg:flex-row items-stretch">

          {/* Left: Project Details Info (Grid Span 6) */}
          <div className="w-full lg:w-1/2 p-8 sm:p-12 md:p-14 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-glass-border bg-bg-primary">
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="font-heading text-3xl font-black text-text-secondary/20 select-none">
                  0{project.id}
                </span>
                <span className="w-2.5 h-[1px] bg-glass-border" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full bg-bg-secondary border border-glass-border text-text-secondary">
                  {category}
                </span>
              </div>

              <h3 
                onClick={() => onViewDetails(project)}
                className="font-heading text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-text-primary leading-[1.1] hover:text-accent-primary transition-colors duration-300 cursor-pointer uppercase"
              >
                {project.name}
              </h3>
              
              <p className="text-text-secondary font-body font-light leading-relaxed text-sm sm:text-base">
                {highlightText(project.description, project.id === 1 ? 'fullstack' : project.id === 2 ? 'frontend' : project.id === 3 ? 'backend' : 'system')}
              </p>
            </div>

            {/* Bottom Stack Badges & CTA */}
            <div className="mt-10 space-y-6">
              <div className="flex flex-wrap gap-2">
                {project.technologies.slice(0, 4).map((tech, techIdx) => (
                  <span
                    key={techIdx}
                    className="px-3 py-1.5 text-[10px] font-mono font-bold uppercase tracking-wider rounded-lg bg-bg-secondary text-text-secondary border border-glass-border"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 4 && (
                  <span className="px-3 py-1.5 text-[10px] font-mono font-bold text-text-secondary/70">
                    +{project.technologies.length - 4} MORE
                  </span>
                )}
              </div>

              <button
                onClick={() => onViewDetails(project)}
                className="group/btn relative overflow-hidden rounded-2xl bg-text-primary text-bg-primary font-heading font-semibold text-xs sm:text-sm tracking-wider px-8 py-3.5 flex items-center gap-3 hover:bg-accent-primary hover:text-white transition-all duration-300 shadow-sm"
              >
                <span>Read Case & Demo</span>
                <FaChevronRight className="text-xs group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>

          {/* Right: Immersive Browser Frame Mockup (Grid Span 6) */}
          <div className="w-full lg:w-1/2 p-6 sm:p-10 flex items-center justify-center bg-bg-secondary/30 relative overflow-hidden">
            
            {/* Background design lines */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--glass-border)_2px,transparent_0)] bg-[size:24px_24px] pointer-events-none" />

            <div 
              onClick={() => onViewDetails(project)}
              className="w-full relative rounded-2xl bg-bg-primary border border-glass-border shadow-premium overflow-hidden cursor-pointer group/browser hover:border-text-secondary/30 transition-all duration-500"
            >
              {/* Browser bar */}
              <div className="bg-bg-secondary border-b border-glass-border px-4 py-2.5 flex items-center justify-between select-none">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-text-secondary/20" />
                  <span className="w-2.5 h-2.5 rounded-full bg-text-secondary/20" />
                  <span className="w-2.5 h-2.5 rounded-full bg-text-secondary/20" />
                </div>
                {/* Simulated URL bar */}
                <div className="bg-bg-primary border border-glass-border rounded-md px-4 py-1 text-[9px] font-mono text-text-secondary w-1/2 text-center overflow-hidden whitespace-nowrap text-ellipsis">
                  {project.liveLink !== '#' ? project.liveLink.replace('https://', '') : 'internal-enterprise-hosting'}
                </div>
                <div className="w-8" /> {/* offset */}
              </div>

              {/* Viewport Image */}
              <div className="aspect-[4/3] w-full overflow-hidden relative z-10 bg-bg-secondary">
                <motion.img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover/browser:scale-[1.025]"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

        </div>

      </div>
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
    <section id="projects" className="bg-bg-primary py-24 sm:py-32 relative z-10 overflow-hidden border-t border-glass-border transition-colors duration-300">
      
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[150px]" />
      </div>

      {/* Header */}
      <div className="relative z-20 flex flex-col items-center justify-center mb-16 px-4">
        <FI delay={0} y={20} className="w-full flex flex-col items-center">
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-glass-border bg-bg-secondary backdrop-blur-md mb-8 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-accent-primary" />
            <span className="text-xs sm:text-sm font-bold tracking-wider uppercase text-text-secondary">
              Selected Works
            </span>
          </div>

          <h2 className="text-text-primary font-heading font-black uppercase text-center leading-none tracking-tighter text-5xl sm:text-6xl lg:text-7xl">
            Featured <span className="text-outline">Projects</span>
          </h2>
        </FI>
      </div>

      {/* Projects list */}
      <div className="w-full px-4 sm:px-6 md:px-10 relative z-30 flex flex-col">
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
              className="fixed inset-0 bg-bg-primary/80 backdrop-blur-md z-[10000] flex items-center justify-center p-4 sm:p-6"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.95, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 30 }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="bg-bg-primary border border-glass-border shadow-2xl rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto z-[10001] flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="sticky top-0 bg-bg-primary/95 backdrop-blur-md px-6 py-5 border-b border-glass-border flex justify-between items-center z-50">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-accent-primary bg-blue-500/10 px-3 py-1 rounded-full border border-accent-primary/20">
                      Project Case Study
                    </span>
                    <h3 className="font-heading text-xl sm:text-2xl font-bold text-text-primary mt-2 uppercase tracking-wide">
                      {selectedProject.name}
                    </h3>
                  </div>
                  <button 
                    onClick={() => setSelectedProject(null)}
                    className="w-10 h-10 rounded-full bg-bg-secondary border border-glass-border flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-bg-tertiary transition-colors duration-300 shadow-sm"
                  >
                    <FaTimes size={16} />
                  </button>
                </div>

                {/* Modal Content */}
                <div className="p-6 sm:p-10 space-y-8 flex-1">
                  
                  {/* Large visual preview - browser style */}
                  <div className="rounded-2xl overflow-hidden border border-glass-border shadow-premium max-h-[380px]">
                    <img 
                      src={selectedProject.image} 
                      alt={selectedProject.name} 
                      className="w-full h-full object-cover" 
                    />
                  </div>

                  {/* Core Specs Grid */}
                  <div className="grid sm:grid-cols-2 gap-8 border-b border-glass-border pb-8">
                    <div>
                      <h4 className="font-heading text-xs font-bold uppercase tracking-widest text-text-secondary/70 mb-2">My Role</h4>
                      <p className="text-text-primary font-body text-base font-semibold">{detail.role}</p>
                    </div>
                    <div>
                      <h4 className="font-heading text-xs font-bold uppercase tracking-widest text-text-secondary/70 mb-2">Key Tech Stack</h4>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {selectedProject.technologies.map((t, idx) => (
                          <span key={idx} className="bg-bg-secondary text-text-secondary border border-glass-border px-2.5 py-1 rounded-lg text-xs font-mono font-bold uppercase">
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
                        <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-text-primary mb-3">Project Summary</h4>
                        <p className="text-text-secondary font-body leading-relaxed text-sm sm:text-base font-light">
                          {selectedProject.description}
                        </p>
                      </div>

                      <div>
                        <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-text-primary mb-3">Core Deliverables & Features</h4>
                        <ul className="space-y-3">
                          {detail.features.map((feat, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-sm text-text-secondary font-body font-light">
                              <span className="w-1.5 h-1.5 rounded-full bg-accent-primary mt-2 flex-shrink-0" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="md:col-span-5 space-y-6">
                      <div className="bg-bg-secondary p-6 rounded-2xl border border-glass-border">
                        <h4 className="font-heading text-xs font-bold uppercase tracking-widest text-text-secondary/70 mb-3">The Challenge</h4>
                        <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-body font-light">
                          {detail.challenge}
                        </p>
                      </div>

                      {/* Action Links */}
                      <div className="flex flex-col gap-3 pt-4 font-mono text-xs">
                        {selectedProject.liveLink !== "#" ? (
                          <a
                            href={selectedProject.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-4 bg-accent-primary text-white font-heading font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-blue-600 transition-all duration-300 shadow-sm"
                          >
                            <FaExternalLinkAlt size={12} />
                            <span>Launch Live Application</span>
                          </a>
                        ) : (
                          <div className="w-full py-4 bg-bg-secondary text-text-secondary/50 font-heading font-semibold rounded-xl flex items-center justify-center gap-2 cursor-not-allowed border border-glass-border">
                            🔒 Enterprise Local Hosting
                          </div>
                        )}
                        
                        <a
                          href="https://github.com/UsamaAkbar727"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-4 bg-bg-primary border border-glass-border text-text-primary hover:bg-bg-secondary font-heading font-semibold rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-sm"
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
