import { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { FI, AC, highlightText, Tilt } from './AnimationHelpers';

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
      <div className="relative w-16 h-16 sm:w-28 sm:h-28 flex items-center justify-center">
        {/* Glow halo behind ring */}
        <div
          className="absolute inset-0 rounded-full blur-xl opacity-[0.03]"
          style={{
            background: `radial-gradient(circle, ${color} 60%, transparent 80%)`,
          }}
        />

        {/* SVG Dial Meter */}
        <svg height={radius * 2} width={radius * 2} className="transform -rotate-90 overflow-visible relative z-10">
          <circle
            stroke="rgba(0,0,0,0.04)"
            fill="transparent"
            strokeWidth={1}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <motion.circle
            stroke={color}
            fill="rgba(248, 250, 252, 0.4)"
            strokeWidth={stroke}
            strokeDasharray={circumference + ' ' + circumference}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, delay: 0.1, ease: 'easeOut' }}
            style={{ strokeDashoffset }}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center font-heading font-bold text-sm sm:text-3xl text-slate-800 select-none z-20">
          <AC value={targetVal} suffix="+" />
        </div>
      </div>
      <span className="text-slate-400 text-[8px] sm:text-[10px] font-mono font-bold uppercase tracking-[0.2em] mt-5 max-w-[90px] group-hover/stat:text-slate-800 transition-colors duration-300">
        {label}
      </span>
    </div>
  );
};

const ExperiencePlate = ({ card }) => {
  return (
    <div
      className="relative rounded-3xl p-[1px] bg-slate-200/50 hover:bg-slate-300 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:shadow-md cursor-pointer select-none group/plate w-full overflow-hidden"
    >
      {/* Background overlay */}
      <div className="absolute inset-[1px] rounded-3xl bg-white/95 backdrop-blur-xl z-0" />

      <div className="relative z-10 p-6 sm:p-8 flex items-start gap-5 sm:gap-6">
        <div>
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 border text-slate-800 font-bold font-heading text-xl relative bg-slate-50 border-slate-100"
          >
            <span className="relative z-10">{card.id}</span>
          </div>
        </div>

        {/* Text descriptions */}
        <div className="flex-1">
          <h4 className="font-heading text-xl sm:text-2xl font-bold mb-2 uppercase tracking-wide text-slate-800">
            {card.title}
          </h4>
          <p className="text-sm sm:text-base font-body font-light leading-relaxed text-slate-500 group-hover/plate:text-slate-700 transition-colors duration-300">
            {highlightText(card.desc, card.id === 1 ? 'frontend' : card.id === 2 ? 'backend' : 'fullstack')}
          </p>

          {card.tags && (
            <div className="flex flex-wrap gap-2 mt-4">
              {card.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 text-[9px] sm:text-[10px] font-mono font-semibold uppercase tracking-widest rounded-lg border text-slate-400 border-slate-200/60 bg-slate-50"
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
  return (
    <Tilt className="w-full h-full p-[1px] rounded-[3rem] bg-slate-200/50 shadow-[0_4px_30px_rgba(0,0,0,0.015)]">
      <div className="rounded-[2.9rem] p-8 sm:p-12 bg-white relative overflow-hidden flex flex-col justify-between h-full min-h-[500px] z-10">
        <div className="relative z-20">
          <div className="flex justify-between items-start mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-200/60 bg-slate-50 text-[10px] font-mono font-bold uppercase tracking-widest text-slate-600 select-none">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-primary" />
              Profile Bio
            </div>
          </div>

          <h3 className="font-heading text-4xl sm:text-5xl font-black text-slate-800 tracking-wide uppercase mb-6">
            Full Stack <span className="text-accent-primary font-bold">Developer</span>
          </h3>
          
          <div className="text-slate-600 font-body font-light tracking-wide leading-relaxed text-base sm:text-lg mb-8 relative">
            <p>{highlightText(bioTxt)}</p>
          </div>

          {/* Tech Stack Badges */}
          <div className="mb-10">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-[0.2em] mb-4 block">Core Technologies</span>
            <div className="flex flex-wrap gap-2.5">
              {technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 text-xs font-heading font-semibold tracking-wide rounded-lg border border-slate-200/60 bg-slate-50 text-slate-600 hover:text-blue-600 hover:border-blue-500/30 hover:bg-blue-50/50 transition-all duration-300 cursor-default select-none"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Data Widgets Section */}
        <div className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-100 relative z-20">
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
  const stats = [
    { label: 'Years Exp', color: '#2563eb', val: 1, max: 5 },
    { label: 'Projects Done', color: '#4f46e5', val: 20, max: 30 },
    { label: 'Core Tech', color: '#d97706', val: 10, max: 15 },
  ];

  const cards = [
    {
      id: 1,
      title: 'Frontend Development',
      desc: 'Crafting responsive, clean, and pixel-perfect user interfaces with intuitive user paths and standard animations.',
      tags: ['UI/UX Development', 'Responsive Layouts', 'State Management'],
      color: '#2563eb',
    },
    {
      id: 2,
      title: 'Backend Development',
      desc: 'Developing robust backend services and structured RESTful APIs to power complex client-side applications.',
      tags: ['API Design & Security', 'Database Design', 'Server Logic'],
      color: '#4f46e5',
    },
    {
      id: 3,
      title: 'Database Architecture',
      desc: 'Designing database models that guarantee data integrity, reliable relationships, and efficient search performance.',
      tags: ['MySQL & MongoDB', 'Data Schemas', 'Query Management'],
      color: '#06b6d4',
    },
  ];

  const bioTxt =
    'I am a Full Stack Developer specializing in building clean, responsive, and reliable web applications. With a strong interest in both frontend and backend technologies, I focus on writing maintainable code and solving practical issues. My web development journey started with exploring web scripts, which led me to study Computer Science and pursue a professional career in software development.';

  const technologies = [
    'React', 'Node.js', 'Express.js', 'MongoDB', 
    'Laravel', 'PHP', 'MySQL', 'JavaScript', 
    'Tailwind', 'Bootstrap', 'HTML', 'CSS'
  ];

  return (
    <section
      id="about"
      className="min-h-screen flex flex-col items-center justify-center relative px-4 sm:px-6 lg:px-8 py-24 md:py-32 overflow-hidden bg-white"
    >
      <div className="max-w-7xl w-full mx-auto relative z-10 flex flex-col items-center gap-16 sm:gap-24">

        {/* Section Title */}
        <FI delay={0} y={20} className="text-center">
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-slate-50 border border-slate-200/60 text-xs sm:text-sm font-mono tracking-wider text-slate-600 uppercase mb-6 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-accent-primary" />
            Introduction
          </div>
          <h2 className="font-heading text-5xl sm:text-6xl lg:text-8xl font-black uppercase leading-none tracking-tighter text-slate-800 relative inline-block">
            About <span className="text-accent-primary">Me</span>
          </h2>
        </FI>

        {/* Main Grid */}
        <div className="grid xl:grid-cols-12 gap-10 items-stretch w-full relative z-10">
          
          {/* Main Bio Card */}
          <FI delay={0.1} y={20} className="xl:col-span-7 h-full flex flex-col justify-between">
            <SystemHubCard bioTxt={bioTxt} technologies={technologies} stats={stats} />
          </FI>

          {/* Interactive Stacked Plates */}
          <div className="xl:col-span-5 flex flex-col gap-6">
            {cards.map((card) => (
              <FI key={card.id} delay={card.id * 0.1} y={20} className="flex-1 flex">
                <ExperiencePlate card={card} />
              </FI>
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
}
