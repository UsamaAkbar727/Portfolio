import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { FI, AD, AC, highlightText, Tilt } from './AnimationHelpers';

const StatWidget = ({ label, color, targetVal, maxVal }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const radius = isMobile ? 32 : 42;
  const stroke = isMobile ? 2.5 : 3;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = isInView
    ? circumference - (targetVal / maxVal) * circumference
    : circumference;

  return (
    <div ref={ref} className="flex flex-col items-center text-center group/stat relative p-2">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/5 opacity-0 group-hover/stat:opacity-100 transition-opacity duration-500 rounded-2xl blur-xl" style={{ background: `linear-gradient(to bottom, transparent, ${color}15)` }} />
      
      <div className="relative w-16 h-16 sm:w-28 sm:h-28 flex items-center justify-center">
        {/* Glow halo behind ring */}
        <div
          className="absolute inset-0 rounded-full blur-xl opacity-20 group-hover/stat:opacity-40 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle, ${color} 60%, transparent 80%)`,
          }}
        />

        {/* Rotating Outer HUD Rings */}
        <div className="absolute -inset-1 sm:-inset-2 border border-dashed rounded-full opacity-20 group-hover/stat:opacity-100 transition-opacity duration-500 animate-[spin_8s_linear_infinite]" style={{ borderColor: `${color}60` }} />
        <div className="absolute -inset-2 sm:-inset-4 border border-dotted rounded-full opacity-10 group-hover/stat:opacity-50 transition-opacity duration-700 animate-[spin_12s_linear_infinite_reverse]" style={{ borderColor: `${color}40` }} />

        {/* SVG Dial Meter */}
        <svg height={radius * 2} width={radius * 2} className="transform -rotate-90 overflow-visible relative z-10">
          <circle
            stroke="rgba(255,255,255,0.05)"
            fill="transparent"
            strokeWidth={1}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <motion.circle
            stroke={color}
            fill="rgba(12, 12, 12, 0.4)"
            strokeWidth={stroke}
            strokeDasharray={circumference + ' ' + circumference}
            animate={{ strokeDashoffset }}
            transition={{ duration: 2, delay: 0.2, ease: 'easeOut' }}
            style={{ strokeDashoffset, filter: `drop-shadow(0 0 4px ${color}80)` }}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center font-kanit font-black text-sm sm:text-3xl text-white select-none z-20 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
          <AC value={targetVal} suffix="+" />
        </div>
      </div>
      <span className="text-[#D7E2EA]/50 text-[8px] sm:text-[10px] font-mono font-bold uppercase tracking-[0.2em] mt-5 max-w-[90px] group-hover/stat:text-white transition-colors duration-300">
        {label}
      </span>
    </div>
  );
};


const ExperiencePlate = ({ card, activeCard, setActiveCard }) => {
  const plateRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const rectRef = useRef(null);

  const handleMouseEnter = () => {
    setHovered(true);
    setActiveCard(card.id);
    if (plateRef.current) {
      rectRef.current = plateRef.current.getBoundingClientRect();
    }
  };

  const handleMouseMove = (e) => {
    const el = plateRef.current;
    if (!el) return;
    
    if (!rectRef.current) {
      rectRef.current = el.getBoundingClientRect();
    }

    const { left, top, width, height } = rectRef.current;
    const x = e.clientX - left;
    const y = e.clientY - top;

    const px = x / width - 0.5;
    const py = y / height - 0.5;

    const rotateX = -py * 12;
    const rotateY = px * 12;

    setRotate({ x: rotateX, y: rotateY });
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setRotate({ x: 0, y: 0 });
    setActiveCard(null);
    rectRef.current = null;
  };

  return (
    <div
      ref={plateRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative rounded-3xl p-1 bg-gradient-to-br from-white/[0.05] via-transparent to-transparent transition-all duration-300 ease-out cursor-pointer select-none group/plate overflow-visible"
      style={{
        transform: hovered
          ? `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale(1.02)`
          : 'rotateX(0deg) rotateY(0deg) scale(1)',
        transformStyle: 'preserve-3d',
        boxShadow: hovered
          ? `0 25px 50px -12px rgba(0,0,0,0.5), 0 0 40px -10px ${card.color}40`
          : '0 10px 30px -10px rgba(0,0,0,0.5)',
      }}
    >
      <div className="absolute inset-0 rounded-3xl bg-[#0a0a0f]/90 backdrop-blur-xl border border-white/5 group-hover/plate:border-white/20 transition-colors duration-500 overflow-hidden z-0">
        {/* Dotted Grid Overlay Background */}
        <div 
          className="absolute inset-0 opacity-0 group-hover/plate:opacity-[0.03] transition-opacity duration-700 pointer-events-none z-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '16px 16px',
          }}
        />

        {/* Flashlight Tracking inside plate */}
        <div 
          className="absolute inset-0 opacity-0 group-hover/plate:opacity-100 transition-opacity duration-500 pointer-events-none z-0 mix-blend-screen"
          style={{
            background: `radial-gradient(300px circle at ${mousePos.x}px ${mousePos.y}px, ${card.color}15, transparent 80%)`
          }}
        />

        {/* Massive Background Number */}
        <div className="absolute -right-2 -bottom-6 text-[8rem] leading-none font-black font-kanit text-white/[0.01] group-hover/plate:text-white/[0.04] group-hover/plate:scale-110 transition-all duration-700 pointer-events-none z-0">
          0{card.id}
        </div>
      </div>

      <div className="relative z-10 p-6 sm:p-8 flex items-start gap-5 sm:gap-6" style={{ transformStyle: 'preserve-3d' }}>
        {/* Floating circular node number */}
        <div className="relative">
          {/* Rotating Rings */}
          <div 
            className="absolute -inset-2 border-2 border-dashed rounded-full opacity-0 group-hover/plate:opacity-100 transition-opacity duration-500 animate-[spin_5s_linear_infinite]"
            style={{ borderColor: `${card.color}50` }}
          />
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-500 border text-white font-black font-kanit text-xl relative group-hover/plate:scale-110"
            style={{
              background: `linear-gradient(135deg, ${card.color}15, ${card.color}35)`,
              borderColor: hovered ? `${card.color}50` : 'rgba(255, 255, 255, 0.05)',
              transform: hovered ? 'translateZ(50px) rotateZ(5deg)' : 'translateZ(0px) rotateZ(0deg)',
              boxShadow: hovered ? `0 15px 25px -5px ${card.color}50` : '',
            }}
          >
            {/* Inner Glow */}
            <div 
              className="absolute inset-0 rounded-2xl opacity-0 group-hover/plate:opacity-100 transition-opacity duration-500 blur-md -z-10"
              style={{ backgroundColor: card.color }}
            />
            <span className="relative z-10">{card.id}</span>
          </div>
        </div>

        {/* Text descriptions */}
        <div style={{ transformStyle: 'preserve-3d' }} className="flex-1">
          <h4
            className="font-kanit text-xl sm:text-2xl font-black mb-2 uppercase tracking-wide transition-all duration-500"
            style={{
              transform: hovered ? 'translateZ(30px)' : 'translateZ(0px)',
              background: hovered ? `linear-gradient(135deg, #ffffff, ${card.color})` : '',
              WebkitBackgroundClip: hovered ? 'text' : '',
              WebkitTextFillColor: hovered ? 'transparent' : '',
              color: hovered ? '' : '#ffffff',
            }}
          >
            {card.title}
          </h4>
          <p
            className="text-sm sm:text-base font-body font-light leading-relaxed transition-colors duration-300"
            style={{
              transform: hovered ? 'translateZ(15px)' : 'translateZ(0px)',
              color: hovered ? 'rgba(215, 226, 234, 0.9)' : 'rgba(215, 226, 234, 0.45)',
            }}
          >
            {highlightText(card.desc, card.id === 1 ? 'frontend' : card.id === 2 ? 'backend' : 'fullstack')}
          </p>

          {card.tags && (
            <div 
              className="flex flex-wrap gap-2 mt-4 transition-transform duration-500" 
              style={{ transform: hovered ? 'translateZ(20px)' : 'translateZ(0px)' }}
            >
              {card.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-widest rounded-lg border transition-all duration-300 select-none"
                  style={{
                    color: hovered ? '#ffffff' : 'rgba(215, 226, 234, 0.4)',
                    borderColor: hovered ? `${card.color}40` : 'rgba(255, 255, 255, 0.05)',
                    backgroundColor: hovered ? `${card.color}15` : 'rgba(255, 255, 255, 0.02)',
                    boxShadow: hovered ? `0 0 15px ${card.color}20` : 'none',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


const SystemHubCard = ({ bioTxt, technologies, stats }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const rectRef = useRef(null);

  const handleMouseEnter = (e) => {
    rectRef.current = e.currentTarget.getBoundingClientRect();
  };

  const handleMouseMove = (e) => {
    if (!rectRef.current) {
      rectRef.current = e.currentTarget.getBoundingClientRect();
    }
    const { left, top } = rectRef.current;
    setMousePos({ x: e.clientX - left, y: e.clientY - top });
  };

  const handleMouseLeave = () => {
    rectRef.current = null;
  };

  return (
    <Tilt className="w-full h-full p-[2px] rounded-[3rem] bg-gradient-to-br from-[#B600A8]/20 via-white/5 to-[#7621B0]/20 hover:from-[#B600A8]/40 transition-colors duration-500 group/hub shadow-[0_0_40px_rgba(182,0,168,0.1)] hover:shadow-[0_0_60px_rgba(182,0,168,0.25)]">
      <div 
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="rounded-[2.9rem] p-8 sm:p-12 bg-[#0a0a0f]/90 backdrop-blur-3xl relative overflow-hidden flex flex-col justify-between h-full min-h-[500px] z-10"
      >
        {/* Flashlight Tracking */}
        <div 
          className="absolute inset-0 opacity-0 group-hover/hub:opacity-100 transition-opacity duration-500 pointer-events-none z-0 mix-blend-screen"
          style={{
            background: `radial-gradient(500px circle at ${mousePos.x}px ${mousePos.y}px, rgba(182,0,168,0.15), transparent 80%)`
          }}
        />

        {/* Sweep scanner line on hover */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#B600A8]/10 to-transparent -translate-y-[150%] group-hover/hub:translate-y-[150%] transition-transform duration-[2.5s] ease-in-out pointer-events-none z-0" />

        {/* High-Tech Corner Accents */}
        <div className="absolute top-8 left-8 w-10 h-10 border-t-2 border-l-2 border-white/10 group-hover/hub:border-[#B600A8]/50 transition-colors duration-500 pointer-events-none z-10" />
        <div className="absolute bottom-8 right-8 w-10 h-10 border-b-2 border-r-2 border-white/10 group-hover/hub:border-[#7621B0]/50 transition-colors duration-500 pointer-events-none z-10" />

        <div className="relative z-20">
          <div className="flex justify-between items-start mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#B600A8]/40 bg-[#B600A8]/10 text-[10px] font-mono font-bold uppercase tracking-widest text-[#B600A8] shadow-[0_0_20px_rgba(182,0,168,0.3)] select-none">
              <span className="w-2 h-2 rounded-full bg-[#B600A8] animate-pulse shadow-[0_0_5px_#B600A8]" />
              System Hub
            </div>
            {/* Fake pulsing status code */}
            <div className="text-[10px] font-mono text-white/20 group-hover/hub:text-[#B600A8]/50 transition-colors duration-300">
              STATUS: ONLINE
            </div>
          </div>

          <h3 className="font-kanit text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 tracking-wide uppercase mb-6 drop-shadow-md">
            Full Stack <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B600A8] to-[#ec4899]">Engineer</span>
          </h3>
          
          <div className="text-[#D7E2EA]/70 font-body font-light tracking-wide leading-relaxed text-base sm:text-lg mb-8 relative">
            <div className="absolute -left-4 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#B600A8] to-transparent opacity-0 group-hover/hub:opacity-100 transition-opacity duration-500" />
            <p>{highlightText(bioTxt)}</p>
          </div>

          {/* Tech Stack Badges */}
          <div className="mb-10">
            <span className="text-[10px] font-mono text-[#D7E2EA]/40 uppercase tracking-[0.2em] mb-4 block">Core Technologies</span>
            <div className="flex flex-wrap gap-2.5">
              {technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 text-xs font-kanit font-medium tracking-wide rounded-lg border border-white/10 bg-white/[0.02] text-[#D7E2EA]/70 hover:text-white hover:border-[#B600A8]/60 hover:bg-[#B600A8]/20 hover:shadow-[0_0_20px_rgba(182,0,168,0.4)] transition-all duration-300 cursor-default select-none relative overflow-hidden group/tech"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/tech:translate-x-full transition-transform duration-700" />
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Data Widgets Section */}
        <div className="grid grid-cols-3 gap-4 pt-8 border-t border-white/10 relative z-20">
          <div className="absolute -top-[1px] left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-[#B600A8]/50 to-transparent opacity-0 group-hover/hub:opacity-100 transition-opacity duration-700" />
          {stats.map((stat, index) => (
            <StatWidget
              key={index}
              label={stat.label}
              color={stat.color}
              targetVal={stat.val}
              maxVal={stat.max}
            />
          ))}
        </div>
      </div>
    </Tilt>
  );
};


export default function About() {
  const [activeCard, setActiveCard] = useState(null);

  const stats = [
    { label: 'Years Exp', color: '#B600A8', val: 1, max: 5 },
    { label: 'Projects Done', color: '#7621B0', val: 20, max: 30 },
    { label: 'Core Tech', color: '#ec4899', val: 10, max: 15 },
  ];

  const cards = [
    {
      id: 1,
      title: 'Frontend Development',
      desc: 'Crafting highly interactive, responsive, and pixel-perfect user interfaces with smooth animations and intuitive user experiences.',
      tags: ['UI/UX & Motion', 'Responsive Web', 'State Management'],
      color: '#B600A8',
    },
    {
      id: 2,
      title: 'Backend Development',
      desc: 'Architecting secure, scalable databases and lightning-fast, robust RESTful APIs to power complex client-side applications.',
      tags: ['API Design & Security', 'Database Design', 'Server-Side Logic'],
      color: '#7621B0',
    },
    {
      id: 3,
      title: 'Database Architecture',
      desc: 'Designing and structuring high-performance database models that ensure data integrity, fast retrieval, and seamless scalability.',
      tags: ['MySQL & MongoDB', 'Data Modeling', 'Query Optimization'],
      color: '#ec4899',
    },
  ];

  const bioTxt =
    'I am a passionate Full Stack Developer focused on building modern, scalable, and user-centric web applications. By blending frontend and backend expertise, I craft seamless digital experiences that solve real-world challenges. My journey began with a curiosity about how things work on the internet, which evolved into a professional career building complete, end-to-end web solutions.';

  const technologies = [
    'React', 'Node.js', 'Express.js', 'MongoDB', 
    'Laravel', 'PHP', 'MySQL', 'JavaScript', 
    'Tailwind', 'Bootstrap', 'HTML', 'CSS'
  ];

  return (
    <section
      id="about"
      className="min-h-screen flex flex-col items-center justify-center relative px-4 sm:px-6 lg:px-8 py-24 md:py-32 overflow-hidden bg-[#0C0C0C]"
    >
      {/* 3D background grids & lights */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Synthwave Grid (Static for high performance) */}
        <div className="absolute inset-0 opacity-[0.02] perspective-1000">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:4rem_4rem] [transform:rotateX(60deg)_translateY(-100px)_scale(2)] origin-top transform-gpu" />
        </div>
      </div>

      {/* Floating Background Graphics placed relative to the viewport/section */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden hidden md:block z-0 mix-blend-screen">
        <FI delay={0.1} x={-80} y={0} duration={0.9} className="absolute top-[12%] left-[2%] lg:left-[4%] xl:left-[6%] 2xl:left-[10%] opacity-20">
          <img src={AD.moon} alt="" className="w-[120px] sm:w-[150px] lg:w-[180px] f1 drop-shadow-[0_0_30px_rgba(182,0,168,0.5)]" />
        </FI>
        <FI delay={0.25} x={-80} y={0} duration={0.9} className="absolute bottom-[15%] left-[2%] lg:left-[4%] xl:left-[6%] 2xl:left-[10%] opacity-15">
          <img src={AD.p59} alt="" className="w-[100px] sm:w-[130px] lg:w-[150px] f2 drop-shadow-[0_0_30px_rgba(118,33,176,0.5)]" />
        </FI>
        <FI delay={0.15} x={80} y={0} duration={0.9} className="absolute top-[12%] right-[2%] lg:right-[4%] xl:right-[6%] 2xl:right-[10%] opacity-20">
          <img src={AD.lego} alt="" className="w-[120px] sm:w-[150px] lg:w-[180px] f3 drop-shadow-[0_0_30px_rgba(236,72,153,0.5)]" />
        </FI>
        <FI delay={0.3} x={80} y={0} duration={0.9} className="absolute bottom-[15%] right-[2%] lg:right-[4%] xl:right-[6%] 2xl:right-[10%] opacity-15">
          <img src={AD.grp} alt="" className="w-[120px] sm:w-[140px] lg:w-[160px] f1 drop-shadow-[0_0_30px_rgba(182,0,168,0.5)]" />
        </FI>
      </div>

      <div className="flex flex-col items-center gap-16 sm:gap-24 relative z-10 max-w-7xl w-full mx-auto">

        {/* Section Title */}
        <FI delay={0} y={30} className="text-center">
          <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-white/[0.03] border border-white/10 text-xs sm:text-sm font-mono tracking-widest text-[#7621B0] uppercase mb-6 shadow-[0_0_30px_rgba(118,33,176,0.15)] backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#7621B0] animate-pulse shadow-[0_0_10px_#7621B0]"></span>
            Origin Story
          </div>
          <h2 className="font-kanit text-5xl sm:text-6xl lg:text-8xl font-black uppercase leading-none tracking-tighter text-white relative inline-block">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B600A8] via-[#ec4899] to-[#7621B0] drop-shadow-[0_0_30px_rgba(182,0,168,0.5)]">Me</span>
            {/* High-tech brackets */}
            <span className="absolute -left-8 -top-4 text-[#B600A8]/30 font-light text-4xl hidden md:block">{"["}</span>
            <span className="absolute -right-8 -bottom-4 text-[#7621B0]/30 font-light text-4xl hidden md:block">{"]"}</span>
          </h2>
        </FI>

        {/* 3D Dashboard Deck Grid */}
        <div className="grid xl:grid-cols-12 gap-10 items-stretch w-full relative z-10">
          
          {/* HUD System Console (Left Column) */}
          <FI delay={0.15} y={40} className="xl:col-span-7 h-full flex flex-col justify-between">
            <SystemHubCard bioTxt={bioTxt} technologies={technologies} stats={stats} />
          </FI>

          {/* Interactive Stacked Plates (Right Column) */}
          <div className="xl:col-span-5 flex flex-col gap-6">
            {cards.map((card) => (
              <FI key={card.id} delay={card.id * 0.15} y={30} className="flex-1 flex">
                <ExperiencePlate
                  card={card}
                  activeCard={activeCard}
                  setActiveCard={setActiveCard}
                />
              </FI>
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
}
