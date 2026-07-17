import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { FaLaptopCode, FaDatabase, FaServer } from 'react-icons/fa';
import { FI, highlightText, AC } from './AnimationHelpers';

// Premium Circular Progress Widget
const StatWidget = ({ label, color, targetVal, maxVal }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });
  const radius = 56;
  const stroke = 3;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = isInView
    ? circumference - (targetVal / maxVal) * circumference
    : circumference;

  return (
    <div ref={ref} className="flex flex-col items-center text-center group/stat relative p-2">
      <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center">
        {/* Glow halo behind ring */}
        <div
          className="absolute inset-0 rounded-full blur-xl opacity-[0.02] transition-opacity duration-500 group-hover/stat:opacity-[0.06]"
          style={{
            background: `radial-gradient(circle, ${color} 60%, transparent 80%)`,
          }}
        />

        {/* SVG Dial Meter */}
        <svg height={radius * 2} width={radius * 2} className="transform -rotate-90 overflow-visible relative z-10">
          <circle
            stroke="var(--glass-border)"
            fill="transparent"
            strokeWidth={1}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <motion.circle
            stroke={color}
            fill="transparent"
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
        <div className="absolute inset-0 flex items-center justify-center font-heading font-black text-2xl sm:text-3xl text-text-primary select-none z-20">
          <AC value={targetVal} suffix="+" />
        </div>
      </div>
      <span className="text-text-secondary/60 text-[9px] font-mono font-bold uppercase tracking-[0.25em] mt-4 group-hover/stat:text-text-primary transition-colors duration-300">
        {label}
      </span>
    </div>
  );
};

// Bento Plate representation
const PhilosophyPlate = ({ card }) => {
  const Icon = card.icon;
  return (
    <div
      className="relative rounded-[2rem] p-[1px] bg-glass-border hover:bg-text-secondary/20 transition-all duration-500 shadow-premium hover:shadow-premium-hover cursor-pointer select-none group/plate w-full overflow-hidden"
    >
      <div className="absolute inset-[1px] rounded-[calc(2rem-1px)] bg-bg-primary z-0" />
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-bg-secondary to-transparent pointer-events-none rounded-tr-[2rem]" />
      
      {/* Visual Accent Bar */}
      <div className="absolute top-0 left-0 w-1 h-full transition-transform duration-500 origin-bottom" style={{ backgroundColor: card.color }} />

      <div className="relative z-10 p-7 sm:p-9 flex items-start gap-6">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-300 bg-bg-secondary border-glass-border"
        >
          <Icon size={20} style={{ color: card.color }} />
        </div>

        <div className="flex-1">
          <h4 className="font-heading text-lg font-bold mb-2 uppercase tracking-wider text-text-primary">
            {card.title}
          </h4>
          <p className="text-sm font-body font-light leading-relaxed text-text-secondary group-hover/plate:text-text-primary transition-colors duration-300">
            {highlightText(card.desc, card.id === 1 ? 'frontend' : card.id === 2 ? 'backend' : 'fullstack')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default function About() {
  const stats = [
    { label: 'Years Exp', color: 'var(--accent-primary)', val: 1, max: 5 },
    { label: 'Projects Done', color: 'var(--accent-secondary)', val: 20, max: 30 },
    { label: 'Core Tech', color: 'var(--accent-gold)', val: 10, max: 15 },
  ];

  const philosophyCards = [
    {
      id: 1,
      title: 'Frontend Aesthetics',
      desc: 'Crafting pixel-perfect views with Space Grotesk interfaces, fluid responsive systems, and micro-animations designed to elevate user experience.',
      icon: FaLaptopCode,
      color: 'var(--accent-primary)',
    },
    {
      id: 2,
      title: 'Structured Backend Flow',
      desc: 'Formulating RESTful routing blocks, strict security checks, and optimized controllers via PHP, Laravel, and Node.js architectures.',
      icon: FaServer,
      color: 'var(--accent-secondary)',
    },
    {
      id: 3,
      title: 'Optimized Data Relays',
      desc: 'Designing relational schemas in MySQL and document catalogs in MongoDB. Focus on indexing and query plans to keep responses sub-millisecond.',
      icon: FaDatabase,
      color: 'var(--accent-gold)',
    },
  ];

  const mainBio =
    "I am Usama Akbar, a Full Stack Developer specializing in building clean, responsive, and reliable web applications. Guided by Computer Science principles and actual developer patterns, I focus on writing maintainable modules and solving real-world challenges. Whether designing frontend user states or optimizing backend database logic, my aim is to deliver products that look premium and perform flawlessly.";

  return (
    <section
      id="about"
      className="min-h-screen flex flex-col items-center justify-center relative px-4 sm:px-6 lg:px-8 py-24 md:py-32 overflow-hidden bg-bg-primary transition-colors duration-300"
    >
      {/* Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/3 left-[-10%] w-[350px] h-[350px] bg-blue-500/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/3 right-[-10%] w-[350px] h-[350px] bg-indigo-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl w-full mx-auto relative z-10 flex flex-col items-center gap-16 sm:gap-24">

        {/* Section Header */}
        <FI delay={0} y={20} className="text-center">
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-bg-secondary border border-glass-border text-xs sm:text-sm font-mono tracking-wider text-text-secondary uppercase mb-6 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-accent-primary" />
            Introduction
          </div>
          <h2 className="font-heading text-5xl sm:text-6xl lg:text-8xl font-black uppercase leading-none tracking-tighter text-text-primary relative inline-block">
            About <span className="text-outline">Me</span>
          </h2>
        </FI>

        {/* Main Bento Grid */}
        <div className="grid lg:grid-cols-12 gap-10 items-stretch w-full relative z-10">
          
          {/* Left Column: Big Editorial Bio */}
          <FI delay={0.1} y={20} className="lg:col-span-7 flex flex-col justify-between">
            <div className="rounded-[3rem] p-[1px] bg-glass-border shadow-premium h-full flex">
              <div className="rounded-[calc(3rem-1px)] p-8 sm:p-12 bg-bg-primary flex flex-col justify-between h-full w-full">
                
                <div className="space-y-8">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-glass-border bg-bg-secondary text-[10px] font-mono font-bold uppercase tracking-widest text-text-secondary select-none w-fit">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-primary" />
                    Developer Profile
                  </div>

                  <h3 className="font-heading text-4xl sm:text-5xl font-black text-text-primary uppercase leading-[1.15] tracking-tight">
                    Building premium <span className="text-accent-primary">digital</span> tools.
                  </h3>

                  <p className="text-text-secondary font-body font-light leading-relaxed text-base sm:text-lg">
                    {highlightText(mainBio)}
                  </p>
                </div>

                {/* Circular Dial Metrics */}
                <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-10 border-t border-glass-border mt-12">
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
            </div>
          </FI>

          {/* Right Column: Staggered Philosophy Cards */}
          <div className="lg:col-span-5 flex flex-col gap-6 justify-center">
            {philosophyCards.map((card) => (
              <FI key={card.id} delay={card.id * 0.1} y={20} className="flex">
                <PhilosophyPlate card={card} />
              </FI>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
