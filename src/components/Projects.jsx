import { useRef } from "react";
import { motion } from "framer-motion";
import { projects as projectData } from "../data/projects";
import { FI, Tilt, highlightText } from "./AnimationHelpers";

// Elegant & Subtle Premium Project Card
function ProjectCard({ project, index }) {
  // Color theme per project
  const projectColors = {
    1: "#6366f1", // Indigo
    2: "#8b5cf6", // Violet
    3: "#ec4899", // Pink
    4: "#14b8a6"  // Teal
  };
  const activeColor = projectColors[project.id] || "#6366f1";

  // Category map
  const projectCategories = {
    1: "Frontend Game",
    2: "Web Application",
    3: "Full Stack App",
    4: "E-Commerce Web"
  };
  const category = projectCategories[project.id] || "Web Project";

  return (
    <div className="sticky top-[5vh] sm:top-[8vh] md:top-[12vh] flex items-center justify-center w-full pb-4 md:pb-0">
      <Tilt className="relative w-full max-w-[1300px] h-auto rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[3rem] bg-[#0a0a0f]/95 border border-white/5 overflow-hidden group/card shadow-xl hover:border-white/10 transition-all duration-300">
        
        {/* Inner Card Background Overlay */}
        <div className="absolute inset-[1px] rounded-[calc(1.5rem-1px)] sm:rounded-[calc(2rem-1px)] md:rounded-[calc(3rem-1px)] bg-[#0d0d14]/90 z-0" />

        {/* Card Content Layout */}
        <div className="relative z-20 flex flex-col md:flex-row min-h-full h-auto">

          {/* Left Panel: Information */}
          <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-14 flex flex-col justify-center h-auto border-b md:border-b-0 md:border-r border-white/5 relative">
            
            {/* Header Area */}
            <div>
              <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                <span className="font-mono text-2xl sm:text-3xl md:text-4xl font-bold text-white/10 tracking-tighter">
                  0{project.id}
                </span>
                <div className="h-[1px] w-12 bg-white/10" />
                <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-white/70">
                  {category}
                </span>
              </div>

              {project.liveLink !== "#" ? (
                <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="block group/title">
                  <h3 
                    className="font-kanit text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight text-white mb-2 md:mb-4 leading-[1.1] transition-colors duration-300 hover:text-white/80"
                    style={{ color: 'white' }}
                  >
                    {project.name}
                  </h3>
                </a>
              ) : (
                <h3 className="font-kanit text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight text-white mb-2 md:mb-4 leading-[1.1]">
                  {project.name}
                </h3>
              )}
              
              <p className="text-[#94a3b8] font-light leading-relaxed text-xs sm:text-sm md:text-lg max-w-xl group-hover/card:text-white/80 transition-colors duration-300">
                {highlightText(project.description, project.id === 1 ? 'fullstack' : project.id === 2 ? 'frontend' : project.id === 3 ? 'backend' : 'system')}
              </p>
            </div>

            {/* Tech Stack & Action */}
            <div className="mt-4 md:mt-8 flex flex-col gap-4 md:gap-8">
              <div>
                <div className="flex flex-wrap gap-1.5 md:gap-2">
                  {project.technologies.map((tech, techIdx) => (
                    <span
                      key={techIdx}
                      className="px-2.5 py-1 md:px-4 md:py-2 text-[10px] md:text-xs font-medium tracking-wide rounded-lg bg-white/5 text-white/60 border border-white/10 backdrop-blur-xl transition-all duration-300 hover:text-white hover:bg-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {project.liveLink !== "#" ? (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-fit group/btn relative overflow-hidden rounded-xl bg-white text-black font-semibold tracking-wide px-8 py-3 text-xs sm:text-sm transition-all duration-300 flex items-center gap-3 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:-translate-y-0.5"
                >
                  <span className="relative z-10">View Project</span>
                  <div className="relative z-10 flex items-center justify-center transition-transform duration-300 group-hover/btn:translate-x-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </a>
              ) : (
                <div className="w-fit rounded-xl border border-white/10 bg-white/5 text-white/40 font-semibold tracking-wide px-8 py-3 text-xs sm:text-sm flex items-center gap-3 cursor-not-allowed">
                  Secured Local
                </div>
              )}
            </div>

          </div>

          {/* Right Panel: Visual representation */}
          <div className="w-full md:w-1/2 h-auto min-h-[180px] sm:min-h-[250px] md:min-h-[300px] p-4 sm:p-8 md:p-12 flex items-center justify-center relative overflow-hidden">
            <div className="w-full h-full flex items-center justify-center relative z-0">
              {project.liveLink !== "#" ? (
                <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="w-full h-full flex items-center justify-center">
                  {project.id === 1 ? (
                    <div className="relative w-full h-full max-h-[180px] sm:max-h-[250px] md:max-h-[450px] flex items-center justify-center z-0">
                      <motion.img
                        src={project.image}
                        alt={project.name}
                        className="max-w-full max-h-full object-contain drop-shadow-lg transition-transform duration-500 hover:scale-[1.03]"
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    <div className="relative w-full h-full rounded-[1.5rem] overflow-hidden border border-white/10 shadow-lg z-0 hover:border-white/20 transition-all duration-500">
                      <motion.img
                        src={project.image}
                        alt={project.name}
                        className="w-full h-full object-cover origin-center hover:scale-[1.03] transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                  )}
                </a>
              ) : (
                project.id === 1 ? (
                  <div className="relative w-full h-full max-h-[180px] sm:max-h-[250px] md:max-h-[450px] flex items-center justify-center z-0">
                    <motion.img
                      src={project.image}
                      alt={project.name}
                      className="max-w-full max-h-full object-contain drop-shadow-lg transition-transform duration-500 hover:scale-[1.03]"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <div className="relative w-full h-full rounded-[1.5rem] overflow-hidden border border-white/10 shadow-lg z-0 hover:border-white/20 transition-all duration-500">
                    <motion.img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover origin-center hover:scale-[1.03] transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                )
              )}
            </div>
          </div>

        </div>
      </Tilt>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="bg-[#030303] py-24 sm:py-32 relative z-10 overflow-hidden">
      
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-[#6366f1] rounded-full blur-[150px] opacity-[0.02]" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-[#ec4899] rounded-full blur-[150px] opacity-[0.02]" />
      </div>

      {/* Header */}
      <div className="relative z-20 flex flex-col items-center justify-center mb-10 sm:mb-20 min-h-[30vh] px-4">
        <FI delay={0} y={20} className="w-full flex flex-col items-center">
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8">
            <span className="w-2 h-2 rounded-full bg-[#ec4899]" />
            <span className="text-xs sm:text-sm font-bold tracking-wider uppercase text-white/80">
              Selected Works
            </span>
          </div>

          <h2 className="text-white font-black uppercase text-center leading-none tracking-tighter text-5xl sm:text-6xl lg:text-7xl">
            Projects
          </h2>
        </FI>
      </div>

      <div className="w-full px-4 sm:px-6 md:px-10 relative z-30 flex flex-col gap-12 lg:gap-32 pb-[20vh] md:pb-[30vh]">
        {projectData.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
          />
        ))}
      </div>
    </section>
  );
}
