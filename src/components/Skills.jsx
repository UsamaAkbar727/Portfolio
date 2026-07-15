import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  { name: 'HTML', icon: 'FaHtml5', color: '#FF4B00', category: 'frontend', level: 95 },
  { name: 'CSS', icon: 'FaCss3Alt', color: '#0066FF', category: 'frontend', level: 90 },
  { name: 'Tailwind CSS', icon: 'FaTailwind', color: '#00E5FF', category: 'frontend', level: 95 },
  { name: 'Bootstrap', icon: 'FaBootstrap', color: '#9D00FF', category: 'frontend', level: 85 },
  { name: 'JavaScript', icon: 'FaJs', color: '#FFE600', category: 'frontend', level: 90 },
  { name: 'React JS', icon: 'FaReact', color: '#00F0FF', category: 'frontend', level: 88 },
  
  { name: 'PHP', icon: 'FaPhp', color: '#777bb4', category: 'backend', level: 85 },
  { name: 'Laravel', icon: 'FaLaravel', color: '#FF0033', category: 'backend', level: 90 },
  { name: 'MySQL', icon: 'FaDatabase', color: '#0099FF', category: 'backend', level: 90 },
  { name: 'MongoDB', icon: 'FaLeaf', color: '#00FF66', category: 'backend', level: 80 },
  { name: 'Node.js', icon: 'FaNodeJs', color: '#00FF33', category: 'backend', level: 85 },
  { name: 'Express.js', icon: 'SiExpress', color: '#FFFFFF', category: 'backend', level: 85 },
];

export default function Skills() {
  const [filter, setFilter] = useState('all');

  const filteredSkills = skillsData.filter(
    (skill) => filter === 'all' || skill.category === filter
  );

  return (
    <section id="skills" className="py-24 md:py-32 relative bg-[#030303] overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#B600A8] rounded-full blur-[150px] opacity-[0.03]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#00E5FF] rounded-full blur-[150px] opacity-[0.03]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Section Header */}
        <FI delay={0} y={20} className="text-center mb-16">
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8">
            <span className="w-2 h-2 rounded-full bg-[#ec4899]" />
            <span className="text-xs sm:text-sm font-bold tracking-wider uppercase text-white/80">
              Technical Expertise
            </span>
          </div>
          
          <h2 className="text-white font-black uppercase text-center leading-none tracking-tighter text-5xl sm:text-6xl lg:text-7xl">
            My Skills
          </h2>
          <p className="text-white/45 max-w-xl mx-auto mt-6 text-base sm:text-lg text-center font-light leading-relaxed">
            The programming languages, frameworks, and technologies I use to build robust and responsive applications.
          </p>

          {/* Filter Tabs */}
          <div className="flex justify-center mt-12">
            <div className="rounded-full p-1.5 flex gap-2 border border-white/10 bg-[#07070a]/90 backdrop-blur-xl">
              {['all', 'frontend', 'backend'].map((category) => (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className="relative px-6 py-2.5 rounded-full font-heading font-black text-xs sm:text-sm uppercase tracking-wider transition-colors duration-300 z-10"
                  style={{
                    color: filter === category ? '#ffffff' : 'rgba(255, 255, 255, 0.4)',
                  }}
                >
                  {filter === category && (
                    <motion.div
                      layoutId="activeSkillTab"
                      className="absolute inset-0 rounded-full -z-10 bg-gradient-to-r from-[#B600A8] to-[#ec4899] shadow-md border border-white/10"
                      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                    />
                  )}
                  {category}
                </button>
              ))}
            </div>
          </div>
        </FI>

        {/* Skills Grid */}
        <motion.div 
          layout
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 w-full"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill) => {
              const IconComponent = iconMap[skill.icon];
              return (
                <motion.div
                  key={skill.name}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="relative rounded-2xl p-6 bg-white/[0.02] border border-white/5 hover:border-white/15 transition-all duration-300 shadow-md flex flex-col justify-between h-40 overflow-hidden group"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center border bg-white/[0.02] transition-colors duration-300"
                        style={{ borderColor: 'rgba(255, 255, 255, 0.08)' }}
                      >
                        {IconComponent && <IconComponent size={24} style={{ color: skill.color }} />}
                      </div>
                      <h4 className="font-kanit text-lg font-black text-white tracking-wide uppercase">
                        {skill.name}
                      </h4>
                    </div>
                    <span 
                      className="text-xs font-mono font-bold"
                      style={{ color: skill.color }}
                    >
                      {skill.level}%
                    </span>
                  </div>

                  <div className="w-full mt-6">
                    <div className="flex justify-between text-[10px] font-mono text-white/30 uppercase mb-2 tracking-wider">
                      <span>Proficiency</span>
                      <span className="text-white/50">{skill.category}</span>
                    </div>
                    <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden border border-white/5 relative">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: skill.color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1.2, ease: 'easeOut' }}
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
