import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  FaHtml5, FaCss3Alt, FaBootstrap, FaJs, FaReact, 
  FaPhp, FaLaravel, FaDatabase, FaServer, FaLeaf, FaNodeJs, FaJsSquare
} from 'react-icons/fa';
import { SiTailwindcss } from 'react-icons/si';
import { SiExpress } from 'react-icons/si';


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
  FaServer,
  FaLeaf,
  FaNodeJs,
  FaJsSquare,
};

const SkillCard = ({ skill, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const IconComponent = iconMap[skill.icon];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: -45 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ 
        duration: 0.7, 
        delay: index * 0.08,
        type: 'spring',
        stiffness: 120
      }}
      whileHover={{ 
        scale: 1.08, 
        y: -10,
        transition: { duration: 0.3, type: 'spring' }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group"
    >
      <div className={`glass-premium rounded-2xl p-6 text-center cursor-pointer transition-all duration-300 hover:bg-white/10 hover:border-accent-primary/40 relative overflow-hidden ${isHovered ? 'shadow-xl shadow-accent-primary/25' : ''}`}>
        <div className="flex justify-center mb-4">
          <motion.div 
            className="w-16 h-16 rounded-2xl flex items-center justify-center relative"
            style={{ 
              background: `linear-gradient(135deg, ${skill.color}25, ${skill.color}45)`,
              boxShadow: `0 0 25px ${skill.color}40, inset 0 0 20px ${skill.color}10`
            }}
            animate={isHovered ? {
              scale: [1, 1.15, 1],
              rotate: [0, 8, -8, 0],
            } : {}}
            transition={{ duration: 0.6, repeat: isHovered ? Infinity : 0 }}
          >
            {IconComponent && (
              <IconComponent size={32} color={skill.color} />
            )}
          </motion.div>
        </div>
        
        <motion.h3 
          className="font-heading font-semibold text-white mb-3 text-lg"
          animate={isHovered ? { color: skill.color, scale: 1.05 } : {}}
          transition={{ duration: 0.3 }}
        >
          {skill.name}
        </motion.h3>
        
        <div className="w-full h-2.5 rounded-full bg-white/10 overflow-hidden shadow-inner">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: index * 0.1 + 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="h-full rounded-full relative"
            style={{
              background: `linear-gradient(90deg, ${skill.color}, ${skill.color}cc)`
            }}
          >
            {/* Shimmer effect on progress bar */}
            <div className="absolute inset-0 shimmer opacity-50" />
          </motion.div>
        </div>
        
        {/* Glow effect on hover */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            boxShadow: `inset 0 0 40px ${skill.color}30`,
            border: `1px solid ${skill.color}50`
          }}
        />
        
        {/* Animated ring on hover */}
        <motion.div
          className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `linear-gradient(135deg, ${skill.color}20, transparent, ${skill.color}20)`,
          }}
          animate={{
            rotate: isHovered ? 360 : 0
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      </div>
    </motion.div>
  );
};

const Skills = () => {
  const [filter, setFilter] = useState('all');
  
  const skillCategories = {
    all: ['HTML', 'CSS', 'Tailwind CSS', 'Bootstrap', 'JavaScript', 'React JS', 'PHP', 'Laravel', 'MySQL', 'REST APIs'],
    frontend: ['HTML', 'CSS', 'Tailwind CSS', 'Bootstrap', 'JavaScript', 'React JS'],
    backend: ['PHP', 'Laravel', 'MySQL', 'REST APIs']
  };
  
const skills = [
  { name: 'HTML', icon: 'FaHtml5', color: '#e34c26', category: 'frontend' },
  { name: 'CSS', icon: 'FaCss3Alt', color: '#264de4', category: 'frontend' },
  { name: 'Tailwind CSS', icon: 'FaTailwind', color: '#06b6d4', category: 'frontend' },
  { name: 'Bootstrap', icon: 'FaBootstrap', color: '#7952b3', category: 'frontend' },
  { name: 'JavaScript', icon: 'FaJs', color: '#f7df1e', category: 'frontend' },
  { name: 'React JS', icon: 'FaReact', color: '#61dafb', category: 'frontend' },
  { name: 'PHP', icon: 'FaPhp', color: '#777bb4', category: 'backend' },
  { name: 'Laravel', icon: 'FaLaravel', color: '#ff2d20', category: 'backend' },
  { name: 'MySQL', icon: 'FaDatabase', color: '#4479a1', category: 'backend' },
  { name: 'REST APIs', icon: 'FaServer', color: '#00d4aa', category: 'backend' },
  { name: 'MongoDB', icon: 'FaLeaf', color: '#47A248', category: 'backend' },
  { name: 'Node.js', icon: 'FaNodeJs', color: '#68A063', category: 'backend' },
  { name: 'Express.js', icon: 'SiExpress', color: '#FFFFFF', category: 'backend' }
];

  const filteredSkills = filter === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === filter);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" className="py-20 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-accent-primary/5 to-transparent"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-r from-accent-secondary/5 to-transparent"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, delay: 2 }}
        />
        
        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-accent-primary/30"
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: Math.random() * 1000 
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-block px-4 py-2 glass-premium rounded-lg text-sm text-accent-primary mb-4 font-semibold border border-accent-primary/20"
          >
            Technical Expertise
          </motion.span>
          
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            My <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto mb-8">
            Technologies and tools I work with to bring ideas to life
          </p>
          
          {/* Filter Buttons */}
          <motion.div 
            className="flex flex-wrap justify-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            {['all', 'frontend', 'backend'].map((category) => (
              <motion.button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-6 py-2.5 rounded-lg font-medium text-sm uppercase tracking-wide transition-all duration-300 ${
                  filter === category
                    ? 'bg-gradient-to-r from-accent-primary to-accent-secondary text-white shadow-lg shadow-accent-primary/30'
                    : 'glass text-text-secondary hover:text-white hover:bg-white/10'
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>

        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, index) => (
            <SkillCard key={skill.name} skill={skill} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
