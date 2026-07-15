import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaPhp,
  FaLaravel,
  FaNodeJs,
  FaGitAlt,
  FaDocker,
  FaAws
} from 'react-icons/fa';
import {
  SiTailwindcss,
  SiExpress,
  SiMongodb,
  SiMysql,
  SiPostman,
  SiVite,
  SiNextdotjs,
  SiTypescript
} from 'react-icons/si';
import { FI } from './AnimationHelpers';

const techCategories = [
  { id: 'all', name: 'All Stack' },
  { id: 'frontend', name: 'Frontend' },
  { id: 'backend', name: 'Backend & APIs' },
  { id: 'database', name: 'Databases' },
  { id: 'tools', name: 'Tools & DevOps' }
];

const techItems = [
  { name: 'React.js', icon: FaReact, category: 'frontend', color: '#00D8FF', level: 'Advanced', desc: 'Component architecture, Hooks, Context API' },
  { name: 'Next.js', icon: SiNextdotjs, category: 'frontend', color: '#000000', level: 'Intermediate', desc: 'Server components, Routing, SSR/SSG' },
  { name: 'JavaScript', icon: FaJs, category: 'frontend', color: '#F7DF1E', level: 'Advanced', desc: 'ES6+, Async, DOM operations, Fetch API' },
  { name: 'TypeScript', icon: SiTypescript, category: 'frontend', color: '#3178C6', level: 'Intermediate', desc: 'Type definitions, interfaces, modules' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, category: 'frontend', color: '#38BDF8', level: 'Advanced', desc: 'Utility-first layout, custom themes, responsive views' },
  { name: 'CSS3', icon: FaCss3Alt, category: 'frontend', color: '#1572B6', level: 'Advanced', desc: 'Grid/Flexbox layouts, transitions, custom animations' },
  { name: 'HTML5', icon: FaHtml5, category: 'frontend', color: '#E34F26', level: 'Advanced', desc: 'Semantic layouts, SEO markup, accessibility structures' },
  
  { name: 'PHP', icon: FaPhp, category: 'backend', color: '#777BB4', level: 'Advanced', desc: 'OOP, script writing, server configuration' },
  { name: 'Laravel', icon: FaLaravel, category: 'backend', color: '#FF2D20', level: 'Advanced', desc: 'MVC Architecture, Eloquent ORM, Blade, migrations' },
  { name: 'Node.js', icon: FaNodeJs, category: 'backend', color: '#339933', level: 'Intermediate', desc: 'Event loop, file systems, asynchronous tasks' },
  { name: 'Express.js', icon: SiExpress, category: 'backend', color: '#000000', level: 'Intermediate', desc: 'REST endpoints, custom middlewares, router setup' },
  
  { name: 'MySQL', icon: SiMysql, category: 'database', color: '#4479A1', level: 'Advanced', desc: 'Relational schemas, query optimization, foreign keys' },
  { name: 'MongoDB', icon: SiMongodb, category: 'database', color: '#47A248', level: 'Intermediate', desc: 'NoSQL aggregation, document stores, indexes' },
  
  { name: 'Postman', icon: SiPostman, category: 'tools', color: '#FF6C37', level: 'Advanced', desc: 'API testing, validation, environment setups' },
  { name: 'Git & GitHub', icon: FaGitAlt, category: 'tools', color: '#F05032', level: 'Advanced', desc: 'Branching strategies, merge conflicts, actions' },
  { name: 'Vite', icon: SiVite, category: 'tools', color: '#646CFF', level: 'Advanced', desc: 'Fast dev bundle, assets packaging, production compiler' }
];

export default function TechStack() {
  const [activeTab, setActiveTab] = useState('all');

  const filteredItems = techItems.filter(
    (item) => activeTab === 'all' || item.category === activeTab
  );

  return (
    <section id="tech-stack" className="py-24 md:py-32 relative bg-[#f8fafc] overflow-hidden border-t border-slate-100">
      {/* Background visual graphics */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/3 left-10 w-72 h-72 rounded-full bg-blue-500/5 blur-3xl" />
        <div className="absolute bottom-1/3 right-10 w-96 h-96 rounded-full bg-indigo-500/5 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Title */}
        <FI delay={0} y={20} className="text-center mb-16">
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-blue-100 bg-blue-50/50 backdrop-blur-md mb-6">
            <span className="w-2 h-2 rounded-full bg-blue-600 shadow-[0_0_10px_#2563eb]" />
            <span className="text-xs sm:text-sm font-bold font-mono tracking-wider uppercase text-blue-800">
              Tool Landscape
            </span>
          </div>
          <h2 className="text-slate-900 font-heading font-black uppercase text-center leading-none tracking-tighter text-5xl sm:text-6xl lg:text-7xl">
            Tech <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Stack</span>
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto mt-6 text-base sm:text-lg text-center font-light leading-relaxed">
            A comprehensive look at the enterprise systems, frameworks, and workflows I master daily.
          </p>

          {/* Filtering */}
          <div className="flex justify-center mt-12 flex-wrap gap-2 sm:gap-4">
            <div className="bg-slate-100/80 backdrop-blur-xl p-1.5 rounded-full border border-slate-200/50 flex flex-wrap gap-1 sm:gap-2">
              {techCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`px-5 py-2 rounded-full font-heading text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-300 relative ${
                    activeTab === cat.id
                      ? 'text-white shadow-sm'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {activeTab === cat.id && (
                    <motion.div
                      layoutId="activeTechTab"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 -z-10"
                      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                    />
                  )}
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </FI>

        {/* Tech Grid */}
        <motion.div 
          layout 
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-12"
        >
          {filteredItems.map((tech) => {
            const Icon = tech.icon;
            return (
              <motion.div
                key={tech.name}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                whileHover={{ y: -6, boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.05)', borderColor: 'rgba(37, 99, 235, 0.2)' }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-3xl p-6 border border-slate-200/60 transition-all duration-300 group flex flex-col justify-between min-h-[220px] relative overflow-hidden"
              >
                {/* Floating graphic overlay */}
                <div 
                  className="absolute right-0 top-0 w-24 h-24 rounded-bl-full opacity-5 pointer-events-none"
                  style={{ backgroundColor: tech.color }}
                />

                <div>
                  <div className="flex items-center justify-between">
                    <div 
                      className="w-14 h-14 rounded-2xl flex items-center justify-center bg-slate-50 border border-slate-100 transition-colors duration-300"
                    >
                      <Icon size={26} style={{ color: tech.color }} />
                    </div>
                    <span 
                      className="text-[10px] font-mono font-bold uppercase px-3 py-1 rounded-full border bg-slate-50"
                      style={{ color: tech.color, borderColor: `${tech.color}25` }}
                    >
                      {tech.level}
                    </span>
                  </div>

                  <h3 className="font-heading text-lg sm:text-xl font-bold text-slate-800 mt-6 group-hover:text-blue-600 transition-colors duration-300">
                    {tech.name}
                  </h3>
                </div>

                <p className="text-xs text-slate-400 font-body mt-3 leading-relaxed">
                  {tech.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
