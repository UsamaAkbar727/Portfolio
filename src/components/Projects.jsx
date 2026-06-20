import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import { projects as projectData } from "../data/projects";
import { FI, Tilt, highlightText } from "./AnimationHelpers";

// Elegant & Subtle Premium Project Card
function ProjectCard({ project, index, total }) {
  const cardRef = useRef(null);

  // Subtle Premium Color Palette instead of harsh neon
  const projectColors = {
    1: "#6366f1", // Indigo
    2: "#8b5cf6", // Violet
    3: "#ec4899", // Pink
    4: "#14b8a6"  // Teal
  };
  const activeColor = projectColors[project.id] || "#6366f1";

  // 3D Tilt & Spotlight Mouse Tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cursorX = useMotionValue(-1000);
  const cursorY = useMotionValue(-1000);

  const rotateX = useSpring(useTransform(mouseY, [-20, 20], [6, -6]), { damping: 40, stiffness: 200 });
  const rotateY = useSpring(useTransform(mouseX, [-20, 20], [-6, 6]), { damping: 40, stiffness: 200 });

  // Parallax elements inside card
  const parallaxX = useSpring(useTransform(mouseX, [-20, 20], [-20, 20]), { damping: 40, stiffness: 150 });
  const parallaxY = useSpring(useTransform(mouseY, [-20, 20], [-20, 20]), { damping: 40, stiffness: 150 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    // Spotlight position
    cursorX.set(x);
    cursorY.set(y);

    // Tilt calculation
    mouseX.set((x - width / 2) / 25);
    mouseY.set((y - height / 2) / 25);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    cursorX.set(-1000);
    cursorY.set(-1000);
  };

  // Dynamic Spotlight background - reduced intensity
  const spotlightBackground = useMotionTemplate`radial-gradient(circle 500px at ${cursorX}px ${cursorY}px, ${activeColor}10, transparent 80%)`;

  return (
    <div 
      className="sticky top-[5vh] sm:top-[8vh] md:top-[12vh] flex items-center justify-center w-full perspective-[2000px]"
    >

      {/* Subtle Ambient Background Glow emitted by the card */}
      <div
        style={{ backgroundColor: activeColor }}
        className="absolute w-[60%] h-[50%] rounded-full blur-[120px] pointer-events-none mix-blend-screen opacity-[0.06]"
      />

      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          boxShadow: `0 20px 40px -20px rgba(0,0,0,0.8), 0 0 40px -15px ${activeColor}20`
        }}
        className="relative w-full max-w-[1300px] h-auto rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[3rem] bg-[#0a0a0f]/95 backdrop-blur-md border border-white/5 overflow-hidden group/card transform-gpu pb-4 md:pb-0"
      >
        {/* Interactive Spotlight following cursor */}
        <motion.div
          className="absolute inset-0 z-0 pointer-events-none mix-blend-screen"
          style={{ background: spotlightBackground }}
        />

        {/* Inner Card Background Overlay */}
        <div className="absolute inset-[1px] rounded-[calc(1.5rem-1px)] sm:rounded-[calc(2rem-1px)] md:rounded-[calc(3rem-1px)] bg-[#0d0d14]/90 z-0" />

        {/* Subtle Background Number */}
        <motion.div
          style={{ x: parallaxX, y: parallaxY, WebkitTextStroke: `1px ${activeColor}`, color: 'transparent' }}
          className="absolute -top-10 -right-10 z-0 text-[200px] md:text-[350px] font-black leading-none opacity-[0.02] group-hover/card:opacity-[0.06] transition-opacity duration-700 pointer-events-none select-none blur-[1px] group-hover/card:blur-none"
        >
          0{project.id}
        </motion.div>

        {/* Card Content Layout */}
        <div className="relative z-20 flex flex-col md:flex-row min-h-full h-auto">

          {/* Left Panel: Information */}
          <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-14 flex flex-col justify-center h-auto border-b md:border-b-0 md:border-r border-white/5 relative">
            
            {/* Header Area */}
            <motion.div style={{ x: useTransform(parallaxX, v => v * 0.1), y: useTransform(parallaxY, v => v * 0.1) }}>
              <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                <span className="font-mono text-2xl sm:text-3xl md:text-4xl font-bold text-white/10 tracking-tighter shadow-sm">
                  0{project.id}
                </span>
                <div className="h-[1px] w-12 bg-white/10" />
                <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-white/70">
                  {project.id === 1 ? "System.Active" : project.id === 2 ? "Standby.Log" : project.id === 3 ? "Backend.Ready" : "Database.Mount"}
                </span>
              </div>

              {project.liveLink !== "#" ? (
                <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="block group/title">
                  <h3 
                    className="font-kanit text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight text-white mb-2 md:mb-4 leading-[1.1] transition-colors duration-300"
                    onMouseEnter={(e) => e.target.style.color = activeColor}
                    onMouseLeave={(e) => e.target.style.color = 'white'}
                  >
                    {project.name}
                  </h3>
                </a>
              ) : (
                <h3 className="font-kanit text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight text-white mb-2 md:mb-4 leading-[1.1]">
                  {project.name}
                </h3>
              )}
              
              <p className="text-[#94a3b8] font-light leading-relaxed text-xs sm:text-sm md:text-lg max-w-xl group-hover/card:text-white/80 transition-colors duration-500">
                {highlightText(project.description, project.id === 1 ? 'fullstack' : project.id === 2 ? 'frontend' : project.id === 3 ? 'backend' : 'system')}
              </p>
            </motion.div>

            {/* Tech Stack & Action */}
            <motion.div style={{ x: useTransform(parallaxX, v => v * 0.05), y: useTransform(parallaxY, v => v * 0.05) }} className="mt-4 md:mt-8 flex flex-col gap-4 md:gap-8">
              <div>
                <div className="flex flex-wrap gap-1.5 md:gap-2">
                  {project.technologies.map((tech, techIdx) => (
                    <span
                      key={techIdx}
                      className="px-2.5 py-1 md:px-4 md:py-2 text-[10px] md:text-xs font-medium tracking-wide rounded-lg bg-white/5 text-white/60 border border-white/10 backdrop-blur-xl transition-all duration-300 hover:text-white hover:bg-white/10 hover:-translate-y-0.5"
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
                  className="w-fit group/btn relative overflow-hidden rounded-xl bg-white text-black font-semibold tracking-wide px-8 py-3 text-xs sm:text-sm transition-all duration-500 flex items-center gap-3 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] hover:-translate-y-1"
                >
                  <span className="relative z-10 transition-transform duration-500">View Project</span>
                  <div className="relative z-10 flex items-center justify-center transition-transform duration-500 group-hover/btn:translate-x-1">
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
            </motion.div>

          </div>

          {/* Right Panel: Visual with subtle parallax */}
          <div className="w-full md:w-1/2 h-auto min-h-[180px] sm:min-h-[250px] md:min-h-[300px] p-4 sm:p-8 md:p-12 flex items-center justify-center relative overflow-hidden group/img">
            <motion.div 
              style={{ x: useTransform(parallaxX, v => v * -0.2), y: useTransform(parallaxY, v => v * -0.2) }}
              className="w-full h-full flex items-center justify-center relative z-0"
            >
              {project.liveLink !== "#" ? (
                <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="w-full h-full flex items-center justify-center">
                  {project.id === 1 ? (
                    <div className="relative w-full h-full max-h-[180px] sm:max-h-[250px] md:max-h-[450px] flex items-center justify-center z-0">
                      <motion.img
                        src={project.image}
                        alt={project.name}
                        className="max-w-full max-h-full object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)] transition-transform duration-700"
                        whileHover={{ scale: 1.05, rotateZ: 1 }}
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    <div className="relative w-full h-full rounded-[1.5rem] overflow-hidden border border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.5)] z-0 group-hover/img:border-white/20 transition-colors duration-700">
                      <motion.img
                        src={project.image}
                        alt={project.name}
                        className="w-full h-full object-cover origin-center"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.7 }}
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
                      className="max-w-full max-h-full object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)] transition-transform duration-700"
                      whileHover={{ scale: 1.05, rotateZ: 1 }}
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <div className="relative w-full h-full rounded-[1.5rem] overflow-hidden border border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.5)] z-0 group-hover/img:border-white/20 transition-colors duration-700">
                    <motion.img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover origin-center"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.7 }}
                      loading="lazy"
                    />
                  </div>
                )
              )}
            </motion.div>
          </div>

        </div>
      </motion.div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="bg-[#030303] py-24 sm:py-32 relative z-10 clip-path-none">

      {/* Deep Space Background Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
          backgroundSize: '100px 100px',
          backgroundPosition: 'center center'
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#030303_80%)] pointer-events-none" />

      {/* Massive Header */}
      <div className="relative z-20 flex flex-col items-center justify-center mb-10 sm:mb-20 min-h-[40vh] px-4">
        <FI delay={0} y={40} className="w-full flex flex-col items-center">
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8">
            <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse" />
            <span className="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-white/80">
              Selected Works
            </span>
          </div>

          <div className="relative">
            <h2 className="text-white font-black uppercase text-center leading-none tracking-tighter" style={{ fontSize: 'clamp(4rem, 15vw, 200px)' }}>
              Projects
            </h2>
            {/* Glowing Text Reflection */}
            <h2 className="absolute top-0 left-0 w-full text-transparent font-black uppercase text-center leading-none tracking-tighter blur-2xl opacity-50" style={{ fontSize: 'clamp(4rem, 15vw, 200px)', WebkitTextStroke: '4px #00E5FF' }}>
              Projects
            </h2>
          </div>
        </FI>
      </div>

      <div className="w-full px-4 sm:px-6 md:px-10 relative z-30 flex flex-col gap-12 lg:gap-32 pb-[20vh] md:pb-[30vh]">
        {projectData.map((project, idx) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={idx}
            total={projectData.length}
          />
        ))}
      </div>
    </section>
  );
}
