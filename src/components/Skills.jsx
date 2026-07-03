import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';
import {
  FaHtml5,
  FaCss3Alt,
  FaBootstrap,
  FaJs,
  FaReact,
  FaPhp,
  FaLaravel,
  FaDatabase,
  FaLeaf,
  FaNodeJs,
} from 'react-icons/fa';
import { SiTailwindcss, SiExpress } from 'react-icons/si';
import { FI } from './AnimationHelpers';

const iconMap = {
  FaHtml5,
  FaCss3Alt,
  FaTailwind: SiTailwindcss,
  FaBootstrap,
  FaJs,
  FaReact,
  FaPhp,
  FaLaravel,
  FaDatabase,
  FaLeaf,
  FaNodeJs,
  SiExpress,
};

const skillsData = [
  { name: 'HTML', icon: 'FaHtml5', color: '#FF4B00', category: 'frontend', level: 95, coords: { x: 12, y: 20 }, mCoords: { x: 20, y: 15 } },
  { name: 'CSS', icon: 'FaCss3Alt', color: '#0066FF', category: 'frontend', level: 90, coords: { x: 8, y: 40 }, mCoords: { x: 20, y: 30 } },
  { name: 'Tailwind CSS', icon: 'FaTailwind', color: '#00E5FF', category: 'frontend', level: 95, coords: { x: 10, y: 60 }, mCoords: { x: 20, y: 45 } },
  { name: 'Bootstrap', icon: 'FaBootstrap', color: '#9D00FF', category: 'frontend', level: 85, coords: { x: 16, y: 80 }, mCoords: { x: 20, y: 60 } },
  { name: 'JavaScript', icon: 'FaJs', color: '#FFE600', category: 'frontend', level: 90, coords: { x: 24, y: 25 }, mCoords: { x: 20, y: 75 } },
  { name: 'React JS', icon: 'FaReact', color: '#00F0FF', category: 'frontend', level: 88, coords: { x: 24, y: 75 }, mCoords: { x: 20, y: 90 } },
  
  { name: 'PHP', icon: 'FaPhp', color: '#777bb4', category: 'backend', level: 85, coords: { x: 88, y: 20 }, mCoords: { x: 80, y: 15 } },
  { name: 'Laravel', icon: 'FaLaravel', color: '#FF0033', category: 'backend', level: 90, coords: { x: 92, y: 40 }, mCoords: { x: 80, y: 30 } },
  { name: 'MySQL', icon: 'FaDatabase', color: '#0099FF', category: 'backend', level: 90, coords: { x: 90, y: 60 }, mCoords: { x: 80, y: 45 } },
  { name: 'MongoDB', icon: 'FaLeaf', color: '#00FF66', category: 'backend', level: 80, coords: { x: 84, y: 80 }, mCoords: { x: 80, y: 60 } },
  { name: 'Node.js', icon: 'FaNodeJs', color: '#00FF33', category: 'backend', level: 85, coords: { x: 76, y: 25 }, mCoords: { x: 80, y: 75 } },
  { name: 'Express.js', icon: 'SiExpress', color: '#FFFFFF', category: 'backend', level: 85, coords: { x: 76, y: 75 }, mCoords: { x: 80, y: 90 } },
];

const NodeLine = ({ from, to, color, active }) => {
  const pathId = useRef(`path-${Math.random()}`);
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible z-0">
      <motion.path
        id={pathId.current}
        d={`M ${from.x} ${from.y} Q ${(from.x + to.x) / 2} ${(from.y + to.y) / 2 + (from.x < to.x ? -30 : 30)} ${to.x} ${to.y}`}
        fill="none"
        stroke={active ? color : 'rgba(255, 255, 255, 0.03)'}
        strokeWidth={active ? 3 : 1}
        style={active ? { filter: `drop-shadow(0 0 12px ${color}90)` } : {}}
        transition={{ duration: 0.8 }}
      />
      {active && (
        <path
          d={`M ${from.x} ${from.y} Q ${(from.x + to.x) / 2} ${(from.y + to.y) / 2 + (from.x < to.x ? -30 : 30)} ${to.x} ${to.y}`}
          fill="none"
          stroke={`url(#glow-${color.replace('#', '')})`}
          strokeWidth={6}
          className="opacity-40 blur-sm"
        />
      )}
      {/* Moving signal pulse along the line */}
      {active && (
        <motion.circle
          r="5"
          fill="#FFF"
          style={{ filter: `drop-shadow(0 0 10px ${color}) drop-shadow(0 0 20px ${color})` }}
        >
          <animateMotion
            dur={`${2 + Math.random() * 2}s`}
            repeatCount="indefinite"
            path={`M ${from.x} ${from.y} Q ${(from.x + to.x) / 2} ${(from.y + to.y) / 2 + (from.x < to.x ? -30 : 30)} ${to.x} ${to.y}`}
          />
        </motion.circle>
      )}
      <defs>
        <linearGradient id={`glow-${color.replace('#', '')}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="1" />
          <stop offset="100%" stopColor="#030303" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
};

const SkillNode = ({ skill, active, onHover, isMobile, position }) => {
  const IconComponent = iconMap[skill.icon];
  const [hovered, setHovered] = useState(false);
  const radius = isMobile ? 36 : 50;
  const stroke = 4;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (skill.level / 100) * circumference;

  const handleMouseEnter = () => {
    setHovered(true);
    onHover(skill);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    onHover(null);
  };

  return (
    <div
      style={{
        position: 'absolute',
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: 'translate(-50%, -50%)',
        zIndex: hovered ? 40 : 20,
      }}
      className="transition-all duration-500"
    >
      <motion.div
        animate={{
          y: hovered ? 0 : [0, -8, 0],
          scale: hovered ? 1.2 : active ? 1 : 0.8,
        }}
        transition={{
          y: {
            duration: 3 + (skill.level % 3),
            repeat: Infinity,
            ease: 'easeInOut',
            delay: (skill.level % 5) * 0.4,
          },
          scale: { duration: 0.4, type: 'spring', stiffness: 300 }
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative cursor-pointer group select-none transform-gpu preserve-3d"
      >
        {/* Extreme Glow halo behind node */}
        <div
          className="absolute inset-0 rounded-full blur-2xl transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${skill.color}80, transparent 70%)`,
            opacity: hovered ? 1 : active ? 0.4 : 0,
            transform: hovered ? 'scale(2) translateZ(-10px)' : 'scale(1.5) translateZ(-10px)',
          }}
        />

        {/* Outer circular progress dial */}
        <svg
          height={radius * 2}
          width={radius * 2}
          className="transform -rotate-90 transition-all duration-500 overflow-visible relative z-10"
        >
          {/* Base track */}
          <circle
            stroke="rgba(255,255,255,0.03)"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          {/* Level indicators */}
          {active && (
            <motion.circle
              stroke={skill.color}
              fill="rgba(5, 5, 5, 0.8)"
              strokeWidth={stroke}
              strokeDasharray={circumference + ' ' + circumference}
              style={{ strokeDashoffset, filter: hovered ? `drop-shadow(0 0 10px ${skill.color})` : 'none' }}
              strokeLinecap="round"
              r={normalizedRadius}
              cx={radius}
              cy={radius}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
            />
          )}
        </svg>

        {/* Skill Icon Container */}
        <div
          className="absolute inset-0 flex items-center justify-center rounded-full transition-all duration-500 z-20 overflow-hidden backdrop-blur-sm"
          style={{
            margin: `${stroke * 2}px`,
            background: hovered
              ? `linear-gradient(135deg, ${skill.color}40, ${skill.color}10)`
              : 'rgba(255, 255, 255, 0.02)',
            border: `1px solid ${hovered ? skill.color : active ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.02)'}`,
            boxShadow: hovered ? `inset 0 0 20px ${skill.color}80` : 'none',
            transform: hovered ? 'translateZ(20px)' : 'translateZ(0px)',
          }}
        >
          {IconComponent && (
            <IconComponent
              size={isMobile ? 26 : 38}
              color={hovered ? '#ffffff' : active ? skill.color : 'rgba(255,255,255,0.1)'}
              className={`transition-all duration-500 ${hovered ? 'scale-110' : ''}`}
              style={{ filter: hovered ? `drop-shadow(0 0 10px ${skill.color})` : 'none' }}
            />
          )}
        </div>

        {/* Floating tooltip badge - Ultra Premium */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 20, x: '-50%' }}
              animate={{ opacity: 1, scale: 1, y: 0, x: '-50%' }}
              exit={{ opacity: 0, scale: 0.5, y: 10, x: '-50%' }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="absolute left-1/2 bottom-[calc(100%+25px)] mb-3 rounded-2xl py-4 px-6 text-center min-w-[180px] z-50 pointer-events-none overflow-hidden"
              style={{
                background: 'rgba(5, 5, 5, 0.85)',
                backdropFilter: 'blur(20px)',
                border: `1px solid ${skill.color}50`,
                boxShadow: `0 30px 60px -10px rgba(0,0,0,0.9), 0 0 30px ${skill.color}40, inset 0 0 20px ${skill.color}15`,
                transform: 'translateZ(40px)',
              }}
            >
              {/* Scanline overlay */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.05]" style={{ background: 'linear-gradient(transparent 50%, rgba(255,255,255,1) 50%)', backgroundSize: '100% 4px' }} />
              
              <div className="relative z-10">
                <h4 className="font-kanit font-black text-white text-lg uppercase tracking-widest leading-none drop-shadow-md">{skill.name}</h4>
                <p className="text-[10px] font-mono text-white/40 uppercase tracking-[0.2em] mt-2 mb-3">{skill.category}</p>
                <div className="flex items-center justify-between gap-3 mt-1">
                  <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden border border-white/5">
                    <div className="h-full rounded-full relative" style={{ width: `${skill.level}%`, backgroundColor: skill.color, boxShadow: `0 0 10px ${skill.color}` }}>
                      <div className="absolute top-0 right-0 bottom-0 w-4 bg-white/50 blur-[2px]" />
                    </div>
                  </div>
                  <span className="text-xs font-black font-mono" style={{ color: skill.color, textShadow: `0 0 10px ${skill.color}80` }}>{skill.level}%</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default function Skills() {
  const [filter, setFilter] = useState('all');
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        });
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    const timeout = setTimeout(handleResize, 100);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeout);
    };
  }, []);

  const centerNode = {
    x: dimensions.width * 0.5,
    y: dimensions.height * 0.5,
  };

  const frontendHub = {
    x: isMobile ? dimensions.width * 0.5 : dimensions.width * 0.30,
    y: isMobile ? dimensions.height * 0.22 : dimensions.height * 0.5,
  };

  const backendHub = {
    x: isMobile ? dimensions.width * 0.5 : dimensions.width * 0.70,
    y: isMobile ? dimensions.height * 0.78 : dimensions.height * 0.5,
  };

  const getAbsoluteCoords = (pctCoords) => {
    return {
      x: (pctCoords.x / 100) * dimensions.width,
      y: (pctCoords.y / 100) * dimensions.height,
    };
  };

  const isSkillActive = (skill) => {
    if (filter === 'all') return true;
    return skill.category === filter;
  };

  // 3D Tilt & Spotlight Mouse Tracking for Tech Tree
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cursorX = useMotionValue(-1000);
  const cursorY = useMotionValue(-1000);

  const rotateX = useSpring(useTransform(mouseY, [-20, 20], [8, -8]), { damping: 40, stiffness: 200 });
  const rotateY = useSpring(useTransform(mouseX, [-20, 20], [-8, 8]), { damping: 40, stiffness: 200 });

  const rectRef = useRef(null);

  const handleMouseEnter = () => {
    if (containerRef.current) {
      rectRef.current = containerRef.current.getBoundingClientRect();
    }
  };

  const handleMouseMove = (e) => {
    if (isMobile) return;
    
    if (!rectRef.current && containerRef.current) {
      rectRef.current = containerRef.current.getBoundingClientRect();
    }
    if (!rectRef.current) return;

    const { left, top, width, height } = rectRef.current;
    const x = e.clientX - left;
    const y = e.clientY - top;
    
    // Spotlight position
    cursorX.set(x);
    cursorY.set(y);
    
    // Tilt calculation (-20 to 20 range)
    mouseX.set((x - width / 2) / 25);
    mouseY.set((y - height / 2) / 25);
  };

  const handleMouseLeave = () => {
    rectRef.current = null;
    if (isMobile) return;
    mouseX.set(0);
    mouseY.set(0);
    cursorX.set(-1000);
    cursorY.set(-1000);
  };

  const spotlightColor = filter === 'frontend' ? '#00E5FF' : filter === 'backend' ? '#B600A8' : '#7621B0';
  const spotlightBackground = useMotionTemplate`radial-gradient(circle 800px at ${cursorX}px ${cursorY}px, ${spotlightColor}15, transparent 70%)`;

  return (
    <section id="skills" className="py-32 relative bg-[#030303] overflow-hidden">
      
      {/* Deep Tech Background Grid & Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Radar grid */}
        <div 
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
            backgroundPosition: 'center center'
          }}
        />
        
        {/* Gigantic ambient background light sources */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#B600A8] rounded-full blur-3xl opacity-20 mix-blend-screen"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
          className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#00E5FF] rounded-full blur-3xl opacity-20 mix-blend-screen"
        />
        
        {/* Central dark core to maintain contrast */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#030303_80%)] pointer-events-none z-0" />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        
        {/* Massive Section Header */}
        <div className="relative z-20 flex flex-col items-center justify-center mb-16 sm:mb-24 min-h-[30vh]">
          <FI delay={0} y={40} className="w-full flex flex-col items-center">
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8">
              <span className="w-2 h-2 rounded-full bg-[#B600A8] animate-ping" />
              <span className="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-white/80">
                Technical Expertise
              </span>
            </div>
            
            <div className="relative">
              <h2 className="text-white font-black uppercase text-center leading-none tracking-tighter" style={{ fontSize: 'clamp(3.5rem, 12vw, 150px)' }}>
                My Skills
              </h2>
              {/* Glowing Text Reflection */}
              <h2 className="absolute top-0 left-0 w-full text-transparent font-black uppercase text-center leading-none tracking-tighter blur-2xl opacity-40" style={{ fontSize: 'clamp(3.5rem, 12vw, 150px)', WebkitTextStroke: '4px #B600A8' }}>
                My Skills
              </h2>
            </div>
            <p className="text-white/40 max-w-2xl mx-auto mt-8 text-base sm:text-lg text-center font-light tracking-wide">
              The architecture and tools powering my digital solutions.
            </p>

            {/* Glowing Tab Switcher */}
            <div className="flex justify-center mt-12">
              <div className="rounded-[2rem] p-2 flex gap-2 border border-white/10 bg-[#07070a]/80 backdrop-blur-xl shadow-2xl relative">
                {['all', 'frontend', 'backend'].map((category) => (
                  <button
                    key={category}
                    onClick={() => setFilter(category)}
                    className="relative px-4 py-2.5 sm:px-10 sm:py-3.5 rounded-full font-heading font-black text-[10px] sm:text-sm uppercase tracking-[0.15em] sm:tracking-[0.2em] transition-colors duration-500 z-10"
                    style={{
                      color: filter === category ? '#ffffff' : 'rgba(255, 255, 255, 0.3)',
                    }}
                  >
                    {filter === category && (
                      <motion.div
                        layoutId="activeSkillTab2"
                        className="absolute inset-0 rounded-full -z-10 shadow-[0_0_20px_rgba(182,0,168,0.5)] border border-white/20"
                        style={{
                          background: 'linear-gradient(135deg, #B600A8, #00E5FF)',
                        }}
                        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                      />
                    )}
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </FI>
        </div>

        {/* 3D Interactive Tech Tree Canvas */}
        <div
          ref={containerRef}
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative min-h-[600px] sm:min-h-[700px] h-[80vh] w-full max-w-6xl mx-auto overflow-visible mt-10 perspective-[2000px] group/canvas"
        >
          {/* Neon Spotlight tracking cursor */}
          <motion.div
            className="absolute inset-[-100px] z-0 pointer-events-none mix-blend-screen opacity-0 group-hover/canvas:opacity-100 transition-opacity duration-1000"
            style={{ background: spotlightBackground }}
          />

          <motion.div 
            style={{ rotateX, rotateY }}
            className="w-full h-full relative transform-gpu preserve-3d"
          >
            {dimensions.width > 0 && (
              <>
                {/* Connection Pipelines */}
                {skillsData.map((skill) => {
                  const skillAbs = getAbsoluteCoords(isMobile ? skill.mCoords : skill.coords);
                  const hubAbs = skill.category === 'frontend' ? frontendHub : backendHub;
                  const active = isSkillActive(skill);
                  return (
                    <NodeLine
                      key={`line-${skill.name}`}
                      from={hubAbs}
                      to={skillAbs}
                      color={skill.color}
                      active={active}
                    />
                  );
                })}

                {/* Central to Hubs */}
                <NodeLine from={centerNode} to={frontendHub} color="#00E5FF" active={filter === 'all' || filter === 'frontend'} />
                <NodeLine from={centerNode} to={backendHub} color="#B600A8" active={filter === 'all' || filter === 'backend'} />

                {/* Central Main Hub Node */}
                <div
                  style={{
                    position: 'absolute',
                    left: `${centerNode.x}px`,
                    top: `${centerNode.y}px`,
                    transform: 'translate(-50%, -50%) translateZ(40px)',
                    zIndex: 25,
                  }}
                  className="preserve-3d"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-0 w-32 h-32 sm:w-40 sm:h-40 -ml-4 -mt-4 sm:-ml-6 sm:-mt-6 rounded-full border border-dashed border-white/20 opacity-50 translateZ(-10px)"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.05, 1], boxShadow: ['0 0 40px rgba(182,0,168,0.4)', '0 0 80px rgba(0,229,255,0.6)', '0 0 40px rgba(182,0,168,0.4)'] }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-white/30 p-1 flex items-center justify-center bg-[#050505]/90 backdrop-blur-2xl relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#B600A8] to-[#00E5FF] opacity-20" />
                    <div className="absolute inset-[2px] rounded-full bg-black/80 flex flex-col items-center justify-center z-10 shadow-inner">
                      <span className="text-[9px] font-black uppercase text-white/40 tracking-[0.3em] mb-1">Core</span>
                      <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">Stack</span>
                    </div>
                  </motion.div>
                </div>

                {/* Frontend Hub */}
                <div
                  style={{
                    position: 'absolute',
                    left: `${frontendHub.x}px`,
                    top: `${frontendHub.y}px`,
                    transform: 'translate(-50%, -50%) translateZ(20px)',
                    zIndex: 22,
                  }}
                >
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                    className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full border flex items-center justify-center backdrop-blur-xl relative overflow-hidden transition-all duration-700 ${
                      filter === 'all' || filter === 'frontend'
                        ? 'border-[#00E5FF] shadow-[0_0_50px_rgba(0,229,255,0.4)] bg-[#00E5FF]/10'
                        : 'border-white/10 bg-black/40'
                    }`}
                  >
                    <div className="absolute inset-[3px] rounded-full bg-black/90 flex flex-col items-center justify-center z-10 border border-white/5">
                      <span className={`text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] transition-colors duration-500 ${filter === 'all' || filter === 'frontend' ? 'text-[#00E5FF] drop-shadow-[0_0_8px_rgba(0,229,255,0.8)]' : 'text-white/20'}`}>Front</span>
                      <span className={`text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] transition-colors duration-500 ${filter === 'all' || filter === 'frontend' ? 'text-white' : 'text-white/20'}`}>End</span>
                    </div>
                  </motion.div>
                </div>

                {/* Backend Hub */}
                <div
                  style={{
                    position: 'absolute',
                    left: `${backendHub.x}px`,
                    top: `${backendHub.y}px`,
                    transform: 'translate(-50%, -50%) translateZ(20px)',
                    zIndex: 22,
                  }}
                >
                  <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                    className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full border flex items-center justify-center backdrop-blur-xl relative overflow-hidden transition-all duration-700 ${
                      filter === 'all' || filter === 'backend'
                        ? 'border-[#B600A8] shadow-[0_0_50px_rgba(182,0,168,0.4)] bg-[#B600A8]/10'
                        : 'border-white/10 bg-black/40'
                    }`}
                  >
                    <div className="absolute inset-[3px] rounded-full bg-black/90 flex flex-col items-center justify-center z-10 border border-white/5">
                      <span className={`text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] transition-colors duration-500 ${filter === 'all' || filter === 'backend' ? 'text-[#B600A8] drop-shadow-[0_0_8px_rgba(182,0,168,0.8)]' : 'text-white/20'}`}>Back</span>
                      <span className={`text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] transition-colors duration-500 ${filter === 'all' || filter === 'backend' ? 'text-white' : 'text-white/20'}`}>End</span>
                    </div>
                  </motion.div>
                </div>

                {/* Floating Skill Nodes */}
                {skillsData.map((skill, index) => {
                  const active = isSkillActive(skill);
                  const pos = isMobile ? skill.mCoords : skill.coords;
                  return (
                    <SkillNode
                      key={skill.name}
                      skill={skill}
                      active={active}
                      onHover={setHoveredSkill}
                      isMobile={isMobile}
                      position={pos}
                      index={index}
                    />
                  );
                })}
              </>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
