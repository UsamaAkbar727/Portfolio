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
  FaGitAlt,
  FaTerminal,
  FaChevronRight,
  FaRobot,
  FaMagic,
  FaBrain
} from 'react-icons/fa';
import { SiTailwindcss, SiExpress, SiPostman, SiNpm, SiOpenai } from 'react-icons/si';
import { FI, highlightText } from './AnimationHelpers';

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
  FaGitAlt,
  SiPostman,
  SiNpm,
  FaTerminal,
  FaRobot,
  FaMagic,
  SiOpenai,
  FaBrain
};

const frontendSkills = [
  { name: 'React JS', icon: 'FaReact', color: '#00D8FF', level: 90, desc: 'Component architecture, Hooks state, Context APIs, performance renders.' },
  { name: 'JavaScript', icon: 'FaJs', color: '#B45309', level: 92, desc: 'ES6+ classes, Async/Await closures, DOM handlers, async logic flow.' },
  { name: 'Tailwind CSS', icon: 'FaTailwind', color: '#38BDF8', level: 95, desc: 'Utility classes, custom themes layout, flex/grid templates, mobile views.' },
  { name: 'HTML5', icon: 'FaHtml5', color: '#E34F26', level: 95, desc: 'Semantic layouts structure, SEO markup conventions, document forms.' },
  { name: 'CSS3', icon: 'FaCss3Alt', color: '#1572B6', level: 90, desc: 'Flexbox, grids coordinates, keyframes animations, variables layouts.' },
  { name: 'Bootstrap', icon: 'FaBootstrap', color: '#7952B3', level: 85, desc: 'Rapid layout prototyping, components styles, column alignment systems.' }
];

const backendSkills = [
  { name: 'Laravel Framework', icon: 'FaLaravel', color: '#FF2D20', level: 90, desc: 'MVC structures, Eloquent queries, routing middleware, authentication gates.' },
  { name: 'PHP Scripting', icon: 'FaPhp', color: '#777BB4', level: 88, desc: 'Object Oriented Programming, database drivers, script requests processing.' },
  { name: 'Node.js Engine', icon: 'FaNodeJs', color: '#339933', level: 85, desc: 'Async execution logs, package structures, server routes setups.' },
  { name: 'Express.js Framework', icon: 'SiExpress', color: '#0F172A', level: 85, desc: 'REST endpoints parsing, server routing pathways, status codes controllers.' }
];

const dataDevopsSkills = [
  { name: 'MySQL Relational', icon: 'FaDatabase', color: '#4479A1', level: 90, desc: 'Relational tables normalization, constraints keys, indexes join filters.' },
  { name: 'MongoDB Database', icon: 'FaLeaf', color: '#47A248', level: 82, desc: 'Document schemas aggregates, cursor processing, JSON catalogs.' },
  { name: 'Git & Versioning', icon: 'FaGitAlt', color: '#F05032', level: 92, desc: 'Branch merges, commit records, rebase operations, conflict resolves.' },
  { name: 'Postman Client', icon: 'SiPostman', color: '#FF6C37', level: 88, desc: 'API queries testing, token headers, collection schemas mockups.' },
  { name: 'NPM & Package', icon: 'SiNpm', color: '#CB3837', level: 90, desc: 'Dependency modules imports, package configurations, lock scripts.' },
  { name: 'Cursor AI / IDE', icon: 'FaRobot', color: '#38BDF8', level: 95, desc: 'AI-assisted code generation, multi-file edits, workspace indexing.' },
  { name: 'OpenAI / Gemini', icon: 'SiOpenai', color: '#10B981', level: 88, desc: 'LLM APIs integration, prompt structuring, assistant workflows.' },
  { name: 'Antigravity AI', icon: 'FaMagic', color: '#A855F7', level: 96, desc: 'Google Deepmind agentic AI assistant for advanced code reasoning and generation.' },
  { name: 'Codex AI', icon: 'FaBrain', color: '#EC4899', level: 88, desc: 'OpenAI Codex models translating natural language instructions to functional code.' },
  { name: 'Qoder AI', icon: 'FaTerminal', color: '#3B82F6', level: 90, desc: 'Intelligent code generation, test suite validation, and debug optimization.' }
];

export default function Skills() {
  const [activeSkill, setActiveSkill] = useState(frontendSkills[0]);

  return (
    <section id="skills" className="py-24 md:py-32 relative bg-bg-primary transition-colors duration-300 overflow-hidden border-t border-glass-border">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Section Header */}
        <FI delay={0} y={20} className="text-center mb-20">
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-glass-border bg-bg-secondary backdrop-blur-md mb-8">
            <span className="w-2 h-2 rounded-full bg-accent-primary" />
            <span className="text-xs sm:text-sm font-bold tracking-wider uppercase text-text-secondary">
              Technical Landscape
            </span>
          </div>
          
          <h2 className="text-text-primary font-heading font-black uppercase text-center leading-none tracking-tighter text-5xl sm:text-6xl lg:text-7xl">
            Skills & <span className="text-outline">Technologies</span>
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto mt-6 text-base sm:text-lg text-center font-light leading-relaxed">
            A combined view of the languages, structural tools, and database stacks I use to write scalable software.
          </p>
        </FI>

        {/* Master Bento Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch w-full mt-12">
          
          {/* Card 1: Frontend Ecosystem (Grid Span 6) */}
          <FI delay={0.1} y={20} className="lg:col-span-6 flex flex-col h-full">
            <div className="rounded-[2.5rem] p-[1px] bg-glass-border shadow-premium hover:shadow-premium-hover transition-all duration-500 h-full flex">
              <div className="rounded-[calc(2.5rem-1px)] p-8 sm:p-10 bg-bg-primary flex flex-col justify-between h-full w-full">
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-accent-primary bg-blue-500/10 px-3 py-1.5 rounded-full">
                      Client Interfaces
                    </span>
                    <span className="text-xs font-mono text-text-secondary/70">Frontend Stack</span>
                  </div>
                  <h3 className="font-heading text-2xl font-black text-text-primary uppercase tracking-wide mb-8">
                    Frontend Engineering
                  </h3>
                  
                  {/* Tool List */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {frontendSkills.map((skill) => {
                      const Icon = iconMap[skill.icon];
                      const isActive = activeSkill.name === skill.name;
                      return (
                        <div
                          key={skill.name}
                          onClick={() => setActiveSkill(skill)}
                          onMouseEnter={() => setActiveSkill(skill)}
                          className={`p-4 rounded-2xl border transition-all duration-300 flex items-center gap-4 cursor-pointer select-none ${
                            isActive
                              ? 'border-accent-primary/20 bg-accent-primary/10 shadow-sm'
                              : 'border-glass-border bg-bg-secondary hover:bg-bg-tertiary'
                          }`}
                        >
                          <div className="w-10 h-10 rounded-xl bg-bg-primary flex items-center justify-center border border-glass-border">
                            {Icon && <Icon size={20} style={{ color: skill.color }} />}
                          </div>
                          <div>
                            <h4 className="font-heading text-xs font-bold text-text-primary uppercase tracking-wide">
                              {skill.name}
                            </h4>
                            <span className="text-[10px] font-mono text-text-secondary">{skill.level}%</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-glass-border flex items-center justify-between text-xs text-text-secondary font-mono">
                  <span>Interactive Selection</span>
                  <FaChevronRight size={10} className="text-accent-primary animate-pulse" />
                </div>
              </div>
            </div>
          </FI>

          {/* Card 2: Backend Architecture (Grid Span 6) */}
          <FI delay={0.2} y={20} className="lg:col-span-6 flex flex-col h-full">
            <div className="rounded-[2.5rem] p-[1px] bg-glass-border shadow-premium hover:shadow-premium-hover transition-all duration-500 h-full flex">
              <div className="rounded-[calc(2.5rem-1px)] p-8 sm:p-10 bg-bg-primary flex flex-col justify-between h-full w-full">
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-accent-secondary bg-indigo-500/10 px-3 py-1.5 rounded-full">
                      Server Logic & APIs
                    </span>
                    <span className="text-xs font-mono text-text-secondary/70">Backend Stack</span>
                  </div>
                  <h3 className="font-heading text-2xl font-black text-text-primary uppercase tracking-wide mb-8">
                    Backend Architecture
                  </h3>
                  
                  {/* Tool List */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {backendSkills.map((skill) => {
                      const Icon = iconMap[skill.icon];
                      const isActive = activeSkill.name === skill.name;
                      return (
                        <div
                          key={skill.name}
                          onClick={() => setActiveSkill(skill)}
                          onMouseEnter={() => setActiveSkill(skill)}
                          className={`p-4 rounded-2xl border transition-all duration-300 flex items-center gap-4 cursor-pointer select-none ${
                            isActive
                              ? 'border-accent-secondary/20 bg-accent-secondary/10 shadow-sm'
                              : 'border-glass-border bg-bg-secondary hover:bg-bg-tertiary'
                          }`}
                        >
                          <div className="w-10 h-10 rounded-xl bg-bg-primary flex items-center justify-center border border-glass-border">
                            {Icon && <Icon size={20} style={{ color: skill.color }} />}
                          </div>
                          <div>
                            <h4 className="font-heading text-xs font-bold text-text-primary uppercase tracking-wide">
                              {skill.name}
                            </h4>
                            <span className="text-[10px] font-mono text-text-secondary">{skill.level}%</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-glass-border flex items-center justify-between text-xs text-text-secondary font-mono">
                  <span>Interactive Selection</span>
                  <FaChevronRight size={10} className="text-accent-secondary animate-pulse" />
                </div>
              </div>
            </div>
          </FI>

          {/* Card 3: Dynamic Detail Panel (Grid Span 4) */}
          <FI delay={0.3} y={20} className="lg:col-span-4 flex flex-col h-full">
            <div className="rounded-[2.5rem] p-[1px] bg-glass-border shadow-premium h-full flex">
              <div className="rounded-[calc(2.5rem-1px)] p-8 sm:p-10 bg-bg-secondary flex flex-col justify-between h-full w-full">
                
                <div className="space-y-6">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-text-secondary/70">
                    Technology Detail
                  </span>
                  
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-14 h-14 rounded-2xl flex items-center justify-center border bg-bg-primary shadow-sm border-glass-border"
                    >
                      {activeSkill && (() => {
                        const Icon = iconMap[activeSkill.icon];
                        return Icon && <Icon size={28} style={{ color: activeSkill.color }} />;
                      })()}
                    </div>
                    <div>
                      <h4 className="font-heading text-lg font-black text-text-primary uppercase tracking-wide">
                        {activeSkill.name}
                      </h4>
                      <span className="text-xs font-mono font-bold" style={{ color: activeSkill.color }}>
                        Proficiency: {activeSkill.level}%
                      </span>
                    </div>
                  </div>

                  <p className="text-sm font-body font-light text-text-secondary leading-relaxed pt-2">
                    {activeSkill.desc}
                  </p>
                </div>

                {/* Progress Visual */}
                <div className="mt-8 space-y-3">
                  <div className="flex justify-between text-[10px] font-mono text-text-secondary uppercase tracking-wider">
                    <span>Expertise Indicator</span>
                    <span className="text-text-primary">{activeSkill.level}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-bg-primary rounded-full overflow-hidden border border-glass-border relative">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: activeSkill.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${activeSkill.level}%` }}
                      key={activeSkill.name}
                      transition={{ duration: 1, ease: 'easeOut' }}
                    />
                  </div>
                </div>

              </div>
            </div>
          </FI>

          {/* Card 4: Databases, DevOps, Tools Landscape (Grid Span 8) */}
          <FI delay={0.4} y={20} className="lg:col-span-8 flex flex-col h-full">
            <div className="rounded-[2.5rem] p-[1px] bg-glass-border shadow-premium hover:shadow-premium-hover transition-all duration-500 h-full flex">
              <div className="rounded-[calc(2.5rem-1px)] p-8 sm:p-10 bg-bg-primary flex flex-col justify-between h-full w-full">
                
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-accent-gold bg-amber-500/10 px-3 py-1.5 rounded-full">
                      Storage & Deliverability
                    </span>
                    <span className="text-xs font-mono text-text-secondary/70">Database & DevOps</span>
                  </div>
                  <h3 className="font-heading text-2xl font-black text-text-primary uppercase tracking-wide mb-8">
                    Databases, Tools & AI
                  </h3>

                  {/* Databases and DevOps grid */}
                  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {dataDevopsSkills.map((skill) => {
                      const Icon = iconMap[skill.icon];
                      const isActive = activeSkill.name === skill.name;
                      return (
                        <div
                          key={skill.name}
                          onClick={() => setActiveSkill(skill)}
                          onMouseEnter={() => setActiveSkill(skill)}
                          className={`p-4 rounded-2xl border transition-all duration-300 flex items-center gap-4 cursor-pointer select-none ${
                            isActive
                              ? 'border-accent-gold/20 bg-accent-gold/10 shadow-sm'
                              : 'border-glass-border bg-bg-secondary hover:bg-bg-tertiary'
                          }`}
                        >
                          <div className="w-10 h-10 rounded-xl bg-bg-primary flex items-center justify-center border border-glass-border">
                            {Icon && <Icon size={20} style={{ color: skill.color }} />}
                          </div>
                          <div>
                            <h4 className="font-heading text-xs font-bold text-text-primary uppercase tracking-wide whitespace-nowrap overflow-hidden text-ellipsis max-w-[80px]">
                              {skill.name.split(' ')[0]}
                            </h4>
                            <span className="text-[10px] font-mono text-text-secondary">{skill.level}%</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-glass-border flex items-center justify-between text-xs text-text-secondary font-mono">
                  <span>MySQL, Git, Postman, NPM, AI Assistants</span>
                  <FaChevronRight size={10} className="text-accent-gold animate-pulse" />
                </div>

              </div>
            </div>
          </FI>

        </div>

      </div>
    </section>
  );
}
