import { useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import { FaBriefcase, FaCode, FaGraduationCap } from 'react-icons/fa';
import { FI, highlightText } from './AnimationHelpers';

const timelineData = [
  {
    id: 1,
    year: '2026 - Present',
    title: 'Freelance Full Stack Developer',
    subtitle: 'Self-Employed / Remote',
    desc: 'Developing end‑to‑end custom web applications. Blending frontend views (React JS, HTML, CSS, Bootstrap, Tailwind CSS) with robust backends (PHP, Laravel, Node.js, Express.js, MySQL, MongoDB) for client releases.',
    icon: FaBriefcase,
    color: 'var(--accent-primary)',
  },
  {
    id: 2,
    year: '2024 - 2025',
    title: 'Junior Web Developer',
    subtitle: 'Software House / Internship',
    desc: 'Worked on full-stack web applications, developing responsive user interfaces and backend features. Collaborated with senior developers to implement new functionalities, fix bugs, improve performance, and deliver scalable solutions.',
    icon: FaCode,
    color: 'var(--accent-secondary)',
  },
  {
    id: 3,
    year: '2021 - 2024',
    title: 'Bachelor of Computer Science',
    subtitle: 'University Education',
    desc: 'Graduated with a solid foundation in software development principles, relational database management, data structures, algorithms, and OOP concepts.',
    icon: FaGraduationCap,
    color: 'var(--accent-gold)',
  },
];

export default function Journey() {
  const containerRef = useRef(null);

  // Track scroll position for the vertical timeline line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  return (
    <section id="journey" ref={containerRef} className="py-24 md:py-32 relative bg-bg-primary transition-colors duration-300 overflow-hidden border-t border-glass-border">
      
      {/* Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Section Header */}
        <FI delay={0} y={30} className="text-center mb-24">
          <span className="inline-block px-5 py-2 rounded-full text-xs sm:text-sm text-text-secondary font-semibold mb-6 border border-glass-border bg-bg-secondary backdrop-blur-md uppercase tracking-widest">
            Education & Experience
          </span>
          <h2 className="font-heading font-black uppercase tracking-tight text-4xl sm:text-5xl lg:text-7xl mb-4 leading-none text-text-primary">
            My <span className="text-outline">Journey</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto mt-4 text-base sm:text-lg">
            A visual roadmap of my academic background and professional milestones.
          </p>
        </FI>

        {/* Timeline container */}
        <div className="relative max-w-4xl mx-auto mt-16 min-h-[500px]">

          {/* Base centerline track - ultra thin */}
          <div className="absolute left-[24px] md:left-1/2 top-0 bottom-0 w-[1px] bg-glass-border transform -translate-x-1/2 pointer-events-none" />

          {/* Animated active centerline - 2px */}
          <motion.div
            style={{ scaleY: scrollYProgress }}
            className="absolute left-[24px] md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-accent-primary via-accent-secondary to-accent-tertiary origin-top transform -translate-x-1/2 pointer-events-none"
          />

          {/* Timeline Items */}
          <div className="space-y-16 md:space-y-24 relative z-10">
            {timelineData.map((item, index) => {
              const Icon = item.icon;
              const isEven = index % 2 === 0;

              return (
                <div key={item.id} className="relative flex flex-col md:flex-row items-start md:items-center group/timeline">
                  
                  {/* Timeline circle node */}
                  <motion.div 
                    className="absolute left-[24px] md:left-1/2 w-10 h-10 rounded-full flex items-center justify-center bg-bg-primary border border-glass-border transform -translate-x-1/2 z-20 group-hover/timeline:scale-110 group-hover/timeline:border-text-secondary transition-all duration-300 shadow-sm"
                    style={{ borderColor: item.color }}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Icon size={16} style={{ color: item.color }} className="relative z-10" />
                    <div className="absolute inset-0 rounded-full animate-ping opacity-5" style={{ backgroundColor: item.color }}></div>
                  </motion.div>

                  {/* Desktop alignment wrapper */}
                  <div className={`w-full md:w-1/2 pl-16 md:pl-0 flex ${isEven ? 'md:justify-end md:pr-16' : 'md:justify-start md:pl-16 md:order-2'}`}>
                    <FI delay={index * 0.15} x={isEven ? -30 : 30} y={0} className="w-full max-w-lg">
                      <motion.div
                        className="rounded-[2rem] p-7 sm:p-9 border border-glass-border bg-bg-primary relative overflow-hidden group hover:border-text-secondary/30 transition-all duration-500 shadow-premium"
                        whileHover={{ y: -4, boxShadow: "0 20px 40px -10px rgba(0,0,0,0.04)" }}
                      >
                        {/* Glow background accent on hover */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                             style={{ background: `radial-gradient(circle at center, ${item.color}03 0%, transparent 70%)` }} />
                        
                        {/* Vertical colored border accent on left */}
                        <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: item.color }} />

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 relative z-10">
                          <span className="inline-block px-3.5 py-1.5 rounded-full text-[10px] font-mono tracking-wider font-bold select-none border border-glass-border bg-bg-secondary"
                            style={{ color: item.color }}>
                            {item.year}
                          </span>
                          <span className="text-[10px] font-mono uppercase tracking-widest text-text-secondary/70">
                            {item.subtitle}
                          </span>
                        </div>

                        <h3 className="font-heading text-xl sm:text-2xl font-black text-text-primary tracking-wide mb-3 relative z-10 uppercase">
                          {item.title}
                        </h3>

                        <p className="text-text-secondary font-body font-light leading-relaxed text-sm sm:text-base relative z-10">
                          {highlightText(item.desc)}
                        </p>
                      </motion.div>
                    </FI>
                  </div>

                  {/* Dummy side block for grid column alignment on desktop */}
                  <div className="hidden md:block w-1/2" />
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
