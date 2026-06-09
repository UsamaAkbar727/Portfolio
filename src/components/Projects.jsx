import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import { projects as projectData } from "../data/projects";
import { FI, Tilt, highlightText } from "./AnimationHelpers";

// Ultra-Premium Interactive Project Card
function ProjectCard({ project, index, total }) {
  const ref = useRef(null);
  const cardRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  // Deep 3D stacking effect on scroll
  const targetScale = 1 - (total - 1 - index) * 0.05;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);
  const scrollY = useTransform(scrollYProgress, [0, 1], ["0%", "-5%"]);
  const opacity = useTransform(scrollYProgress, [0.9, 1], [1, 0.3]);

  // Vibrant Neon Color Palette
  const projectColors = {
    1: "#FF0055", // Neon Pink
    2: "#00E5FF", // Neon Cyan
    3: "#00FF66", // Neon Green
    4: "#FF7700"  // Neon Orange
  };
  const activeColor = projectColors[project.id] || "#B600A8";

  // 3D Tilt & Spotlight Mouse Tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cursorX = useMotionValue(-1000);
  const cursorY = useMotionValue(-1000);

  const rotateX = useSpring(useTransform(mouseY, [-20, 20], [6, -6]), { damping: 40, stiffness: 200 });
  const rotateY = useSpring(useTransform(mouseX, [-20, 20], [-6, 6]), { damping: 40, stiffness: 200 });
  
  // Parallax elements inside card
  const parallaxX = useSpring(useTransform(mouseX, [-20, 20], [-25, 25]), { damping: 40, stiffness: 150 });
  const parallaxY = useSpring(useTransform(mouseY, [-20, 20], [-25, 25]), { damping: 40, stiffness: 150 });
  
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    
    // Spotlight position
    cursorX.set(x);
    cursorY.set(y);
    
    // Tilt calculation (-20 to 20 range for dramatic but smooth effect)
    mouseX.set((x - width / 2) / 25);
    mouseY.set((y - height / 2) / 25);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    cursorX.set(-1000);
    cursorY.set(-1000);
  };

  // Dynamic Spotlight background
  const spotlightBackground = useMotionTemplate`radial-gradient(circle 600px at ${cursorX}px ${cursorY}px, ${activeColor}15, transparent 80%)`;

  return (
    <div ref={ref} className="h-[100vh] flex items-center justify-center sticky top-0 w-full perspective-[2000px]">
      
      {/* Intense Ambient Background Glow emitted by the card */}
      <motion.div 
        style={{ scale, opacity, backgroundColor: activeColor }}
        className="absolute w-[80%] h-[60%] rounded-full blur-[150px] pointer-events-none mix-blend-screen opacity-30 transition-opacity duration-1000"
      />

      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          scale,
          y: scrollY,
          opacity,
          rotateX,
          rotateY,
          boxShadow: `0 40px 100px -20px rgba(0,0,0,1), 0 0 60px -15px ${activeColor}40`
        }}
        className="relative w-full max-w-[1400px] h-[85vh] rounded-[3rem] sm:rounded-[4rem] bg-[#050505]/80 backdrop-blur-3xl border border-white/5 overflow-hidden group/card transform-gpu"
      >
        {/* Interactive Spotlight following cursor */}
        <motion.div
          className="absolute inset-0 z-0 pointer-events-none mix-blend-screen"
          style={{ background: spotlightBackground }}
        />

        {/* Animated Border Gradient Shine */}
        <div className="absolute inset-0 p-[1px] rounded-[3rem] sm:rounded-[4rem] pointer-events-none opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 z-10">
          <div className="absolute inset-0 rounded-[3rem] sm:rounded-[4rem] bg-gradient-to-r from-transparent via-white/40 to-transparent animate-spin-slow" 
               style={{ background: `conic-gradient(from 0deg, transparent, ${activeColor}80, transparent)` }} />
        </div>

        {/* Inner Card Background Overlay */}
        <div className="absolute inset-[1px] rounded-[calc(3rem-1px)] sm:rounded-[calc(4rem-1px)] bg-[#07070a]/90 z-0" />
        
        {/* Extreme Noise Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay z-10" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />

        {/* Massive 3D Background Number with Parallax */}
        <motion.div 
             style={{ x: parallaxX, y: parallaxY, WebkitTextStroke: `4px ${activeColor}`, color: 'transparent' }}
             className="absolute -top-20 -right-10 z-0 text-[300px] md:text-[500px] font-black leading-none opacity-[0.04] group-hover/card:opacity-[0.15] transition-opacity duration-700 pointer-events-none select-none blur-[2px] group-hover/card:blur-none"
        >
          0{project.id}
        </motion.div>

        {/* Card Content Layout */}
        <div className="relative z-20 flex flex-col md:flex-row h-full">
          
          {/* Left Panel: Information */}
          <div className="w-full md:w-1/2 p-8 sm:p-12 md:p-16 flex flex-col justify-between h-[50%] md:h-full border-b md:border-b-0 md:border-r border-white/10 relative overflow-hidden">
            
            {/* Subtle left-side scanline effect */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{ background: 'linear-gradient(transparent 50%, rgba(255,255,255,1) 50%)', backgroundSize: '100% 4px' }} />

            {/* Header Area */}
            <motion.div style={{ x: useTransform(parallaxX, v => v * 0.2), y: useTransform(parallaxY, v => v * 0.2) }}>
              <div className="flex items-center gap-4 mb-6">
                <span className="font-mono text-4xl sm:text-5xl font-black text-white/10 tracking-tighter shadow-sm">
                  0{project.id}
                </span>
                <div className="h-[2px] w-16 bg-white/20" />
                <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.4em] px-4 py-1.5 rounded-full bg-white/5 border border-white/20 backdrop-blur-md" style={{ color: activeColor, textShadow: `0 0 15px ${activeColor}` }}>
                  {project.id === 1 ? "System.Active" : project.id === 2 ? "Standby.Log" : project.id === 3 ? "Backend.Ready" : "Database.Mount"}
                </span>
              </div>
              
              <h3 className="font-kanit text-5xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white mb-6 leading-[1.0] drop-shadow-2xl mix-blend-screen">
                {project.name}
              </h3>
              
              <p className="text-[#a1a1aa] font-light leading-relaxed text-sm sm:text-base md:text-lg max-w-xl group-hover/card:text-white/80 transition-colors duration-500">
                {highlightText(project.description, project.id === 1 ? 'fullstack' : project.id === 2 ? 'frontend' : project.id === 3 ? 'backend' : 'system')}
              </p>
            </motion.div>

            {/* Tech Stack & Action */}
            <motion.div style={{ x: useTransform(parallaxX, v => v * 0.1), y: useTransform(parallaxY, v => v * 0.1) }} className="mt-8 flex flex-col gap-8">
              <div>
                <span className="text-[10px] uppercase tracking-[0.3em] font-black text-white/40 block mb-4">Core Tech</span>
                <div className="flex flex-wrap gap-2.5">
                  {project.technologies.map((tech, techIdx) => (
                    <span
                      key={techIdx}
                      className="px-5 py-2.5 text-xs font-black uppercase tracking-widest rounded-xl bg-black/80 text-white/60 border border-white/10 backdrop-blur-xl group-hover/card:border-white/30 transition-all duration-300 hover:text-white hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:-translate-y-1"
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
                  className="w-fit group/btn relative overflow-hidden rounded-full bg-white text-black font-black uppercase tracking-[0.2em] px-10 py-5 text-xs sm:text-sm transition-all duration-500 flex items-center gap-4 hover:shadow-[0_0_40px_rgba(255,255,255,0.6)]"
                >
                  <span className="relative z-10 transition-transform duration-500 group-hover/btn:translate-x-1">Launch System</span>
                  <div className="relative z-10 w-8 h-8 rounded-full bg-black/10 flex items-center justify-center transition-transform duration-500 group-hover/btn:rotate-45 group-hover/btn:scale-110">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent opacity-0 group-hover/btn:opacity-100 group-hover/btn:animate-shimmer" />
                </a>
              ) : (
                <div className="w-fit rounded-full border-2 border-white/10 bg-[#0A0A0A] text-white/30 font-black uppercase tracking-[0.2em] px-10 py-5 text-xs sm:text-sm flex items-center gap-4 cursor-not-allowed">
                  Secured Local
                </div>
              )}
            </motion.div>

          </div>

          {/* Right Panel: Stunning Visual with Parallax */}
          <div className="w-full md:w-1/2 h-[50%] md:h-full p-4 sm:p-8 md:p-12 flex items-center justify-center relative overflow-hidden group/img">
            {/* Deep Ambient Image Glow - Lightened so images are clear */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-transparent z-10 pointer-events-none" />
            
            <motion.div 
              style={{ x: useTransform(parallaxX, v => v * -0.5), y: useTransform(parallaxY, v => v * -0.5) }}
              className="w-full h-full flex items-center justify-center relative z-0"
            >
              {project.id === 1 ? (
                <div className="relative w-full h-full max-h-[550px] flex items-center justify-center z-0">
                  <motion.img
                    src={project.image}
                    alt={project.name}
                    className="max-w-full max-h-full object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.9)] transition-transform duration-700"
                    style={{ filter: `drop-shadow(0 0 30px ${activeColor}40)` }}
                    whileHover={{ scale: 1.15, rotateZ: 2 }}
                    loading="lazy"
                  />
                </div>
              ) : (
                <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden border border-white/20 shadow-[0_40px_80px_rgba(0,0,0,0.9)] z-0 group-hover/img:border-white/40 transition-colors duration-700">
                  <motion.img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover origin-center"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.7 }}
                    loading="lazy"
                  />
                  {/* Removed the blur overlay so the image is fully clear at all times */}
                </div>
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
    <section id="projects" className="bg-[#030303] py-24 sm:py-32 relative z-10 overflow-hidden">
      
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

      <div className="w-full px-4 sm:px-6 md:px-10 relative z-30">
        {projectData.map((project, idx) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={idx}
            total={projectData.length}
          />
        ))}
      </div>
      
      {/* Bottom Spacer for smooth scroll exit */}
      <div className="h-[20vh] w-full" />
    </section>
  );
}
