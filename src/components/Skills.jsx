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
  { name: 'HTML', icon: 'FaHtml5', color: '#E34F26', category: 'frontend', level: 95 },
  { name: 'CSS', icon: 'FaCss3Alt', color: '#1572B6', category: 'frontend', level: 90 },
  { name: 'Tailwind CSS', icon: 'FaTailwind', color: '#38BDF8', category: 'frontend', level: 95 },
  { name: 'Bootstrap', icon: 'FaBootstrap', color: '#7952B3', category: 'frontend', level: 85 },
  { name: 'JavaScript', icon: 'FaJs', color: '#B45309', category: 'frontend', level: 90 },
  { name: 'React JS', icon: 'FaReact', color: '#00D8FF', category: 'frontend', level: 88 },
  
  { name: 'PHP', icon: 'FaPhp', color: '#777bb4', category: 'backend', level: 85 },
  { name: 'Laravel', icon: 'FaLaravel', color: '#FF2D20', category: 'backend', level: 90 },
  { name: 'MySQL', icon: 'FaDatabase', color: '#4479a1', category: 'backend', level: 90 },
  { name: 'MongoDB', icon: 'FaLeaf', color: '#47A248', category: 'backend', level: 80 },
  { name: 'Node.js', icon: 'FaNodeJs', color: '#339933', category: 'backend', level: 85 },
  { name: 'Express.js', icon: 'SiExpress', color: '#0f172a', category: 'backend', level: 85 },
];

export default function Skills() {
  const [filter, setFilter] = useState('all');

  const filteredSkills = skillsData.filter(
    (skill) => filter === 'all' || skill.category === filter
  );

  return (
    <section id="skills" className="py-24 md:py-32 relative bg-white overflow-hidden border-t border-slate-100">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Section Header */}
        <FI delay={0} y={20} className="text-center mb-16">
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-slate-200/60 bg-slate-50 backdrop-blur-md mb-8">
            <span className="w-2 h-2 rounded-full bg-accent-primary" />
            <span className="text-xs sm:text-sm font-bold tracking-wider uppercase text-slate-600">
              Technical Expertise
            </span>
          </div>
          
          <h2 className="text-slate-800 font-heading font-black uppercase text-center leading-none tracking-tighter text-5xl sm:text-6xl lg:text-7xl">
            My Skills
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto mt-6 text-base sm:text-lg text-center font-light leading-relaxed">
            The programming languages, frameworks, and technologies I use to build robust and responsive applications.
          </p>

          {/* Filter Tabs */}
          <div className="flex justify-center mt-12">
            <div className="rounded-full p-1.5 flex gap-2 border border-slate-200 bg-slate-100/80 backdrop-blur-xl">
              {['all', 'frontend', 'backend'].map((category) => (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className="relative px-6 py-2.5 rounded-full font-heading font-semibold text-xs sm:text-sm uppercase tracking-wider transition-colors duration-300 z-10"
                  style={{
                    color: filter === category ? '#ffffff' : 'rgba(15, 23, 42, 0.5)',
                  }}
                >
                  {filter === category && (
                    <motion.div
                      layoutId="activeSkillTab"
                      className="absolute inset-0 rounded-full -z-10 bg-gradient-to-r from-accent-primary to-accent-secondary shadow-sm"
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
                  className="relative rounded-2xl p-6 bg-white border border-slate-200 hover:border-blue-500/20 hover:shadow-md transition-all duration-300 flex flex-col justify-between h-40 overflow-hidden group"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center border bg-slate-50 border-slate-100 transition-colors duration-300"
                      >
                        {IconComponent && <IconComponent size={24} style={{ color: skill.color }} />}
                      </div>
                      <h4 className="font-heading text-lg font-bold text-slate-800 tracking-wide uppercase">
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
                    <div className="flex justify-between text-[10px] font-mono text-slate-400 uppercase mb-2 tracking-wider">
                      <span>Proficiency</span>
                      <span className="text-slate-500">{skill.category}</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200/40 relative">
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
