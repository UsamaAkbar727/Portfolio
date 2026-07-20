import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects as projectData } from "../data/projects";
import { FI, highlightText } from "./AnimationHelpers";
import { FaTimes, FaExternalLinkAlt, FaGithub, FaChevronRight } from "react-icons/fa";

// Elegant Project Card
function ProjectCard({ project, onViewDetails, category, activeColor }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="group/card relative rounded-[2rem] p-[1px] bg-glass-border hover:bg-text-secondary/20 transition-all duration-500 shadow-premium hover:shadow-premium-hover cursor-pointer overflow-hidden flex flex-col justify-between w-[85vw] max-w-[340px] md:w-auto md:max-w-none shrink-0 md:shrink-1 snap-center md:snap-align-none"
      onClick={() => onViewDetails(project)}
    >
      <div className="absolute inset-[1px] rounded-[calc(2rem-1px)] bg-bg-primary z-0" />
      
      {/* Background glow overlay */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full blur-3xl opacity-0 group-hover/card:opacity-[0.05] transition-opacity duration-500 z-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${activeColor} 0%, transparent 70%)`
        }}
      />
      
      <div className="relative z-10 flex flex-col h-full">
        {/* Sleek Browser Frame Image Wrapper */}
        <div className="p-4 bg-bg-secondary/40 border-b border-glass-border">
          <div className="relative rounded-2xl border border-glass-border bg-bg-primary overflow-hidden shadow-sm aspect-[16/10] flex items-center justify-center">
            {/* Fake browser bar */}
            <div className="absolute top-0 left-0 w-full bg-bg-secondary border-b border-glass-border px-3.5 py-2.5 flex items-center justify-between select-none z-20">
              <div className="flex gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-500/30" />
                <span className="w-2 h-2 rounded-full bg-yellow-500/30" />
                <span className="w-2 h-2 rounded-full bg-green-500/30" />
              </div>
              <div className="bg-bg-primary border border-glass-border rounded px-3 py-0.5 text-[8px] font-mono text-text-secondary/50 w-2/3 text-center overflow-hidden whitespace-nowrap text-ellipsis">
                {project.liveLink !== '#' ? project.liveLink.replace('https://', '') : 'internal-hosting'}
              </div>
              <div className="w-4" />
            </div>

            {/* Viewport Image */}
            <div className="w-full h-full pt-7 overflow-hidden relative bg-bg-secondary">
              <img
                src={project.image}
                alt={project.name}
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover/card:scale-105"
                loading="lazy"
              />
              {/* Case Study Badge Overlay */}
              <div className="absolute inset-0 bg-bg-primary/20 backdrop-blur-[1px] opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                <span className="px-4.5 py-2.5 rounded-2xl border border-white/10 bg-text-primary/95 text-bg-primary font-heading font-black text-[10px] uppercase tracking-widest shadow-lg flex items-center gap-2 transform translate-y-2 group-hover/card:translate-y-0 transition-all duration-300">
                  Explore Case Study
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Info Panel */}
        <div className="p-6 flex flex-col justify-between flex-grow">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span 
                className="text-[9px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-bg-secondary border border-glass-border"
                style={{ color: activeColor }}
              >
                {category}
              </span>
              <span className="text-[10px] font-mono text-text-secondary/30 font-bold">0{project.id}</span>
            </div>

            <h3 className="font-heading text-lg sm:text-xl font-black text-text-primary uppercase tracking-wide leading-tight group-hover/card:text-accent-primary transition-colors duration-300">
              {project.name}
            </h3>
            
            <p className="text-text-secondary font-body font-light leading-relaxed text-xs sm:text-sm line-clamp-3">
              {project.description}
            </p>
          </div>

          <div className="mt-6 space-y-4">
            {/* Tech Badges */}
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.slice(0, 3).map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 text-[9px] font-mono font-bold uppercase tracking-wider rounded bg-bg-secondary border border-glass-border text-text-secondary"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 3 && (
                <span className="px-2 py-1 text-[9px] font-mono font-bold text-text-secondary/50">
                  +{project.technologies.length - 3} MORE
                </span>
              )}
            </div>

            {/* Bottom link */}
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-text-primary uppercase tracking-widest pt-3 border-t border-glass-border">
              <span>Read study</span>
              <FaChevronRight size={10} className="transform group-hover/card:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeModalTab, setActiveModalTab] = useState("overview");

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

  const projectColors = {
    1: "var(--accent-primary)",
    2: "var(--accent-secondary)",
    3: "var(--accent-tertiary)",
    4: "var(--accent-gold)"
  };

  const getCategory = (project) => {
    if (project.id === 1) return "Frontend";
    if (project.id === 4) return "E-Commerce";
    return "Full-Stack";
  };

  // Filters projects based on selected tab
  const filteredProjects = projectData.filter((project) => {
    if (activeFilter === "All") return true;
    return getCategory(project) === activeFilter;
  });

  const handleOpenDetails = (project) => {
    setSelectedProject(project);
    setActiveModalTab("overview");
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

          <h2 className="text-text-primary font-heading font-black uppercase text-center leading-none tracking-tighter text-5xl sm:text-6xl lg:text-7xl mb-8">
            Featured <span className="text-outline">Projects</span>
          </h2>
          
          {/* Elegant Capsule Filter Tabs */}
          <div className="inline-flex bg-bg-secondary/80 border border-glass-border p-1.5 rounded-full backdrop-blur-md shadow-sm">
            {["All", "Full-Stack", "Frontend", "E-Commerce"].map((filter) => {
              const isActive = activeFilter === filter;
              return (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`relative px-5 py-2.5 rounded-full font-heading font-bold text-xs uppercase tracking-wider transition-colors duration-500 ${
                    isActive ? "text-bg-primary" : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  <span className="relative z-10">{filter}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeFilterPill"
                      className="absolute inset-0 bg-text-primary rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </FI>
      </div>

      {/* Projects Grid / Slider Layout */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 relative z-30 w-full overflow-hidden">
        {/* Mobile Swipe Indicator */}
        <div className="flex md:hidden items-center justify-center gap-2 mb-6 font-mono text-[10px] text-text-secondary/40 font-bold uppercase tracking-wider select-none">
          <span>Swipe to explore</span>
          <span className="animate-bounce-horizontal">→</span>
        </div>

        <motion.div 
          layout 
          className="flex md:grid md:grid-cols-2 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory md:snap-none gap-6 md:gap-8 lg:gap-10 pb-6 md:pb-0 scrollbar-none"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                category={getCategory(project)}
                activeColor={projectColors[project.id] || "var(--accent-primary)"}
                onViewDetails={handleOpenDetails}
              />
            ))}
          </AnimatePresence>
        </motion.div>
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
              className="fixed inset-0 bg-bg-primary/85 backdrop-blur-md z-[10000] flex items-center justify-center p-4 sm:p-6"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.95, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 30 }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="bg-bg-primary border border-glass-border shadow-2xl rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden z-[10001] flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="bg-bg-primary px-6 py-5 border-b border-glass-border flex justify-between items-center z-50 flex-shrink-0">
                  <div>
                    <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-accent-primary bg-blue-500/10 px-3 py-1 rounded-full border border-accent-primary/20">
                      Project Case Study
                    </span>
                    <h3 className="font-heading text-lg sm:text-xl font-bold text-text-primary mt-2 uppercase tracking-wide">
                      {selectedProject.name}
                    </h3>
                  </div>
                  <button 
                    onClick={() => setSelectedProject(null)}
                    className="w-9 h-9 rounded-full bg-bg-secondary border border-glass-border flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-bg-tertiary transition-colors duration-300 shadow-sm"
                  >
                    <FaTimes size={14} />
                  </button>
                </div>

                {/* Modal Content Scroll Body */}
                <div className="overflow-y-auto flex-grow flex flex-col md:flex-row">
                  
                  {/* Left Column: Visual & CTA */}
                  <div className="w-full md:w-[40%] p-6 bg-bg-secondary/15 border-b md:border-b-0 md:border-r border-glass-border flex flex-col gap-6">
                    <div className="rounded-2xl overflow-hidden border border-glass-border shadow-premium aspect-[4/3] bg-bg-secondary flex items-center justify-center relative">
                      <img 
                        src={selectedProject.image} 
                        alt={selectedProject.name} 
                        className="w-full h-full object-cover object-top" 
                      />
                    </div>

                    <div className="flex flex-col gap-3 font-mono text-[10px] w-full">
                      {selectedProject.liveLink !== "#" ? (
                        <a
                          href={selectedProject.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-3.5 bg-accent-primary hover:bg-blue-600 text-white font-heading font-semibold rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-sm"
                        >
                          <FaExternalLinkAlt size={10} />
                          <span>Launch Live Demo</span>
                        </a>
                      ) : (
                        <div className="w-full py-3.5 bg-bg-secondary border border-glass-border text-text-secondary/40 font-heading font-semibold rounded-xl flex items-center justify-center gap-2 cursor-not-allowed text-center">
                          🔒 Local Enterprise Host
                        </div>
                      )}
                      
                      <a
                        href="https://github.com/UsamaAkbar727"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-3.5 bg-bg-primary border border-glass-border text-text-primary hover:bg-bg-secondary font-heading font-semibold rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-sm"
                      >
                        <FaGithub size={12} />
                        <span>Source Code</span>
                      </a>
                    </div>
                  </div>

                  {/* Right Column: Tabbed Content Details */}
                  <div className="w-full md:w-[60%] p-6 sm:p-8 flex flex-col gap-6">
                    
                    {/* Tab Header Controls */}
                    <div className="flex border-b border-glass-border gap-6 flex-shrink-0">
                      {[
                        { id: 'overview', label: 'Overview' },
                        { id: 'features', label: 'Key Features' },
                        { id: 'challenge', label: 'Challenge' }
                      ].map((tab) => {
                        const isActive = activeModalTab === tab.id;
                        return (
                          <button
                            key={tab.id}
                            onClick={() => setActiveModalTab(tab.id)}
                            className={`relative pb-3 text-xs font-heading font-black uppercase tracking-wider transition-colors duration-300 ${
                              isActive ? "text-text-primary" : "text-text-secondary/40 hover:text-text-primary"
                            }`}
                          >
                            <span>{tab.label}</span>
                            {isActive && (
                              <motion.div 
                                layoutId="activeModalTabLine"
                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-text-primary rounded-full"
                              />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Active Tab Panel Body */}
                    <div className="flex-grow min-h-[200px]">
                      <AnimatePresence mode="wait">
                        {activeModalTab === 'overview' && (
                          <motion.div
                            key="overview"
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.2 }}
                            className="space-y-4"
                          >
                            <h4 className="font-heading text-xs font-bold uppercase tracking-widest text-text-secondary/70">Project Summary</h4>
                            <p className="text-text-secondary font-body leading-relaxed text-sm font-light">
                              {highlightText(selectedProject.description, selectedProject.id === 1 ? 'fullstack' : selectedProject.id === 2 ? 'frontend' : selectedProject.id === 3 ? 'backend' : 'system')}
                            </p>
                            
                            <div className="pt-4 space-y-2">
                              <h4 className="font-heading text-xs font-bold uppercase tracking-widest text-text-secondary/70">Built With</h4>
                              <div className="flex flex-wrap gap-1.5 pt-1">
                                {selectedProject.technologies.map((t, idx) => (
                                  <span key={idx} className="bg-bg-secondary text-text-secondary border border-glass-border px-2.5 py-1 rounded-lg text-[9px] font-mono font-bold uppercase">
                                    {t}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {activeModalTab === 'features' && (
                          <motion.div
                            key="features"
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.2 }}
                            className="space-y-4"
                          >
                            <h4 className="font-heading text-xs font-bold uppercase tracking-widest text-text-secondary/70">Deliverables</h4>
                            <ul className="space-y-3 pt-1">
                              {detail.features.map((feat, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-text-secondary font-body font-light leading-relaxed">
                                  <span className="w-1.5 h-1.5 rounded-full bg-accent-primary mt-2 flex-shrink-0" />
                                  <span>{feat}</span>
                                </li>
                              ))}
                            </ul>
                          </motion.div>
                        )}

                        {activeModalTab === 'challenge' && (
                          <motion.div
                            key="challenge"
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.2 }}
                            className="space-y-4"
                          >
                            <div className="space-y-1">
                              <h4 className="font-heading text-xs font-bold uppercase tracking-widest text-text-secondary/70">Developer Role</h4>
                              <p className="text-text-primary font-heading font-semibold text-sm">{detail.role}</p>
                            </div>

                            <div className="bg-bg-secondary p-5 rounded-2xl border border-glass-border mt-4">
                              <h4 className="font-heading text-[10px] font-bold uppercase tracking-widest text-text-secondary/70 mb-2">The Challenge</h4>
                              <p className="text-xs text-text-secondary leading-relaxed font-body font-light">
                                {detail.challenge}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
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
