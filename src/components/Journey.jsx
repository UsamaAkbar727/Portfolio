import { useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import { FaGraduationCap, FaBriefcase, FaCode } from 'react-icons/fa';
import { FI, highlightText } from './AnimationHelpers';

const timelineData = [
  {
    id: 1,
    year: '2026 - Present',
    title: 'Freelance Full Stack Developer',
    subtitle: 'Self-Employed / Remote',
    desc: 'Developing end‑to‑end custom web applications. Blending frontend views (React JS, HTML, CSS, Bootstrap, Tailwind CSS) with robust backends (PHP, Laravel, Node.js, Express.js, MySQL, MongoDB).',
    icon: FaBriefcase,
    color: '#B600A8',
  },
  {
    id: 2,
    year: '2024 - 2025',
    title: 'Junior Web Developer',
    subtitle: 'Software House / Internship',
    desc: 'Worked on full-stack web applications, developing responsive user interfaces and backend features. Collaborated with senior developers to implement new functionalities, fix bugs, improve performance, and deliver scalable solutions.',
    icon: FaCode,
    color: '#8b5cf6',
  },
  {
    id: 3,
    year: '2021 - 2024',
    title: 'Bachelor of Computer Science',
    subtitle: 'University Education',
    desc: 'Graduated with a solid foundation in software development principles, relational database management, data structures, algorithms, and OOP concepts.',
    icon: FaGraduationCap,
    color: '#00E5FF',
  },
];

export default function Journey() {
  const containerRef = useRef(null);

  // Track scroll position for the vertical growth line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  return (
    <section id="journey" ref={containerRef} className="py-24 md:py-32 relative bg-[#0C0C0C] overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1.5px, transparent 0)',
            backgroundSize: '50px 50px',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-[#B600A8]/5 rounded-full blur-[100px]"
          animate={{
            scale: [1.1, 0.95, 1.1],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Section Header */}
        <FI delay={0} y={30} className="text-center mb-20">
          <span className="inline-block px-4 py-2 glass-premium rounded-xl text-xs sm:text-sm text-[#D7E2EA] font-semibold mb-4 border border-white/10 uppercase tracking-widest">
            Timeline Milestone
          </span>
          <h2 className="hh font-black uppercase tracking-tight text-4xl sm:text-5xl lg:text-7xl mb-4 leading-none">
            My <span className="gradient-text">Journey</span>
          </h2>
          <p className="text-[#D7E2EA]/40 max-w-2xl mx-auto mt-4 text-base sm:text-lg">
            A visual roadmap of my academic background and professional milestones.
          </p>
        </FI>

        {/* Timeline container */}
        <div className="relative max-w-4xl mx-auto mt-16 min-h-[500px]">

          {/* Base centerline track */}
          <div className="absolute left-[24px] md:left-1/2 top-0 bottom-0 w-[2px] bg-white/[0.03] transform -translate-x-1/2 pointer-events-none" />

          {/* Animated active centerline */}
          <motion.div
            style={{ scaleY: scrollYProgress }}
            className="absolute left-[24px] md:left-1/2 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#B600A8] via-[#8b5cf6] to-[#ec4899] origin-top transform -translate-x-1/2 pointer-events-none shadow-[0_0_15px_rgba(139,92,246,0.5)]"
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
                    className="absolute left-[24px] md:left-1/2 w-12 h-12 rounded-full flex items-center justify-center bg-[#0C0C0C] border-2 border-white/10 transform -translate-x-1/2 z-20 group-hover/timeline:scale-110 group-hover/timeline:border-white/30 transition-all duration-300"
                    style={{ borderColor: item.color, boxShadow: `0 0 20px ${item.color}40` }}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Icon size={20} style={{ color: item.color }} className="relative z-10" />
                    {/* Ping Animation */}
                    <div className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ backgroundColor: item.color }}></div>
                  </motion.div>

                  {/* Connecting Line (Desktop) */}
                  <motion.div 
                    className={`hidden md:block absolute top-6 h-[2px] z-10 ${isEven ? 'right-[50%] mr-6' : 'left-[50%] ml-6'}`}
                    style={{ 
                      width: 'calc(50% - 24px - 3rem)',
                      background: isEven ? `linear-gradient(to left, ${item.color}80, transparent)` : `linear-gradient(to right, ${item.color}80, transparent)`,
                      transformOrigin: isEven ? 'right center' : 'left center'
                    }}
                    initial={{ scaleX: 0, opacity: 0 }}
                    whileInView={{ scaleX: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.7, delay: index * 0.15 + 0.3 }}
                  />

                  {/* Desktop alignment wrapper */}
                  <div className={`w-full md:w-1/2 pl-20 md:pl-0 flex ${isEven ? 'md:justify-end md:pr-16' : 'md:justify-start md:pl-16 md:order-2'}`}>
                    <FI delay={index * 0.15} x={isEven ? -40 : 40} y={0} className="w-full max-w-lg">
                      <motion.div
                        className="glass-premium rounded-[2rem] p-7 sm:p-9 border border-white/5 bg-[#0a0a0a]/80 backdrop-blur-xl relative overflow-hidden group hover:border-white/20 transition-all duration-500"
                        whileHover={{ y: -5, boxShadow: `0 20px 40px -10px rgba(0, 0, 0, 0.6), 0 0 30px -5px ${item.color}25` }}
                      >
                        {/* Glowing background accent on hover */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                             style={{ background: `radial-gradient(circle at center, ${item.color}10 0%, transparent 70%)` }} />

                        {/* Glow corner accent */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/[0.04] to-transparent pointer-events-none rounded-tr-[2rem]" />
                        
                        {/* Left colored border accent */}
                        <div className="absolute top-0 left-0 w-1.5 h-full" style={{ backgroundColor: item.color, boxShadow: `0 0 10px ${item.color}` }} />

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 relative z-10">
                          <span className="inline-block px-4 py-1.5 rounded-full text-[11px] font-mono tracking-wider text-white select-none shadow-lg"
                            style={{ background: `linear-gradient(135deg, ${item.color}40, ${item.color}10)`, border: `1px solid ${item.color}40` }}>
                            {item.year}
                          </span>
                          <span className="text-[11px] font-mono uppercase tracking-widest text-[#D7E2EA]/40">
                            {item.subtitle}
                          </span>
                        </div>

                        <h3 className="font-kanit text-2xl font-bold text-white tracking-wide mb-3 relative z-10">
                          {item.title}
                        </h3>

                        <p className="text-[#D7E2EA]/70 font-body font-light leading-relaxed text-sm sm:text-base relative z-10">
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
