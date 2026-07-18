import { motion } from 'framer-motion';
import { useState } from 'react';
import { FI } from './AnimationHelpers';
import { FaTerminal, FaPlay, FaCircle } from 'react-icons/fa';

const steps = [
  {
    id: 1,
    phase: 'PLAN',
    title: 'Discovery & System Design',
    subtitle: 'Scope Definition & Architecture Mapping',
    description: 'Collaborating with stakeholders to define requirements. I map database models, establish clean relationship schemas, detail secure API endpoints, and design structured data flows before writing a single line of code.',
    command: 'usama --init-project "saas-architecture"',
    logs: [
      '[SYSTEM] Loading system blueprints...',
      '[SYSTEM] Analyzing database structures and relational models...',
      '[SYSTEM] Verified 12 schema tables and entity relations.',
      '[SUCCESS] System design completed. DB schema finalized.'
    ]
  },
  {
    id: 2,
    phase: 'DATA',
    title: 'Database & Backend Engineering',
    subtitle: 'Robust Schema Setup & Core Security Logic',
    description: 'Developing secure, optimized RESTful APIs and structured databases. I write migrations, define index rules for fast search queries, configure middleware gates, and build scalable endpoints with PHP/Laravel or Node.js.',
    command: 'php artisan migrate --seed',
    logs: [
      'Migration started:',
      '  - create_users_table ........................... DONE (15ms)',
      '  - create_orders_table .......................... DONE (19ms)',
      '  - create_products_table ........................ DONE (11ms)',
      '[DATABASE] Database successfully migrated and seeded.'
    ]
  },
  {
    id: 3,
    phase: 'CODE',
    title: 'Frontend & UI Assembly',
    subtitle: 'Responsive Interfaces & State Management',
    description: 'Transforming layouts into rich, fluid digital experiences. I construct modular React components, integrate state hooks, set up custom route controllers, and apply Tailwind CSS utilities for responsive views.',
    command: 'npm run dev -- --debug',
    logs: [
      'Vite v5.3.0 ready in 180ms',
      '  ➜  Local:   http://localhost:5173/',
      '[VITE] Loaded Tailwind configuration and CSS modules',
      '[REACT] Component tree rendered. HMR is active.'
    ]
  },
  {
    id: 4,
    phase: 'TEST',
    title: 'Quality Auditing & Testing',
    subtitle: 'Unit Tests, Integration Audits & Speed Tuning',
    description: 'Running unit tests to secure critical pathways. I verify logic controllers, write automated verification scripts, clean legacy loops, and profile page speeds to ensure light load weights and high lighthouse scores.',
    command: 'npm test && php artisan test',
    logs: [
      'Vitest v1.5.0: 12 unit tests passed (0.15s)',
      'PHPUnit 11.1: 34 tests, 96 assertions passed (0.35s)',
      '[TESTS] Code coverage is 94%. No security gaps detected.',
      '[PERF] Performance score: 98/100. Optimizations active.'
    ]
  },
  {
    id: 5,
    phase: 'SHIP',
    title: 'CI/CD & Live Deployment',
    subtitle: 'Cloud Handover & Version Monitoring',
    description: 'Deploying release bundles to high-performance hosts. I set up GitHub Actions workflows, initialize server webhooks, configure environmental keys, and verify successful SSL handshakes on live builds.',
    command: 'git push origin main --deploy',
    logs: [
      'Pushing commits to remote origin: main',
      'Triggering CI/CD deployment pipelines on Vercel...',
      'Building production artifacts... SUCCESS',
      '[DEPLOYED] Live URL: https://production-app.vercel.app'
    ]
  }
];

export default function Workflow() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="workflow" className="py-24 md:py-32 relative bg-bg-primary transition-colors duration-300 overflow-hidden border-t border-glass-border">
      {/* Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] bg-blue-500/5 rounded-full blur-[130px]" />
        <div className="absolute bottom-1/3 left-1/4 w-[450px] h-[450px] bg-indigo-500/5 rounded-full blur-[130px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Section Header */}
        <FI delay={0} y={20} className="text-center mb-20">
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-glass-border bg-bg-secondary backdrop-blur-md mb-8">
            <span className="w-2 h-2 rounded-full bg-accent-primary animate-pulse" />
            <span className="text-xs sm:text-sm font-bold tracking-wider uppercase text-text-secondary">
              Execution Process
            </span>
          </div>
          
          <h2 className="text-text-primary font-heading font-black uppercase text-center leading-none tracking-tighter text-5xl sm:text-6xl lg:text-7xl">
            How I <span className="text-outline">Work</span>
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto mt-6 text-base sm:text-lg text-center font-light leading-relaxed">
            From design to launch, here is the technical path I follow to build premium quality web systems.
          </p>
        </FI>

        {/* Custom Layout (No standard cards) */}
        <div className="grid lg:grid-cols-12 gap-12 items-start mt-12">
          
          {/* Left Column: Interactive Nav Steps (40% width) */}
          <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-28">
            <div className="border-l border-glass-border pl-6 space-y-4">
              {steps.map((step, index) => {
                const isActive = activeStep === index;
                return (
                  <div
                    key={step.id}
                    onClick={() => setActiveStep(index)}
                    className="group cursor-pointer select-none py-2 outline-none"
                  >
                    <div className="flex items-start gap-4">
                      {/* Step index */}
                      <span className={`font-mono text-xs tracking-wider transition-colors duration-300 font-bold ${
                        isActive ? 'text-accent-primary' : 'text-text-secondary/40 group-hover:text-text-secondary/80'
                      }`}>
                        0{step.id} / {step.phase}
                      </span>
                    </div>

                    {/* Step Title */}
                    <h3 className={`font-heading text-lg sm:text-xl font-bold uppercase tracking-wide mt-1 transition-all duration-300 ${
                      isActive 
                        ? 'text-text-primary translate-x-2' 
                        : 'text-text-secondary/60 group-hover:text-text-secondary group-hover:translate-x-1'
                    }`}>
                      {step.title}
                    </h3>
                    
                    {/* Custom progress line accent */}
                    <div className="mt-3 relative w-full h-[1px] bg-glass-border overflow-hidden">
                      {isActive && (
                        <motion.div 
                          layoutId="activeStepLine"
                          className="absolute inset-0 bg-gradient-to-r from-accent-primary to-accent-secondary"
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Terminal Display & Description (60% width) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="min-h-[380px] flex flex-col justify-between">
              {/* Description box (No standard card layout, clean typography-focused margins) */}
              <div className="space-y-4">
                <span className="text-[10px] font-mono font-bold tracking-widest text-accent-secondary uppercase">
                  {steps[activeStep].subtitle}
                </span>
                
                <h4 className="font-heading text-2xl sm:text-3xl font-black text-text-primary uppercase tracking-tight leading-none">
                  {steps[activeStep].title}
                </h4>
                
                <p className="font-body font-light text-text-secondary text-base leading-relaxed max-w-2xl">
                  {steps[activeStep].description}
                </p>
              </div>

              {/* Terminal Panel Mockup */}
              <div className="mt-8 rounded-2xl border border-glass-border bg-bg-secondary overflow-hidden shadow-2xl relative">
                {/* Terminal Header */}
                <div className="px-5 py-3.5 bg-bg-primary border-b border-glass-border flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FaCircle className="text-red-500/80 text-[10px]" />
                    <FaCircle className="text-yellow-500/80 text-[10px]" />
                    <FaCircle className="text-green-500/80 text-[10px]" />
                  </div>
                  <div className="flex items-center gap-1.5 text-text-secondary/50 font-mono text-[10px]">
                    <FaTerminal className="text-[9px]" />
                    <span>sh - process.sh</span>
                  </div>
                  <div className="w-10 h-2" /> {/* spacer to balance */}
                </div>

                {/* Terminal Body */}
                <div className="p-6 font-mono text-xs sm:text-sm text-text-secondary space-y-3.5 bg-bg-secondary min-h-[180px]">
                  {/* Command line */}
                  <div className="flex items-center gap-2 text-text-primary">
                    <FaPlay className="text-[9px] text-accent-primary" />
                    <span className="text-accent-tertiary">~</span>
                    <span className="text-text-primary font-bold">{steps[activeStep].command}</span>
                  </div>

                  {/* Logs stream */}
                  <div className="space-y-2 mt-4 pl-4 border-l border-glass-border">
                    {steps[activeStep].logs.map((log, lIdx) => {
                      const isSuccess = log.includes('[SUCCESS]') || log.includes('[DEPLOYED]');
                      const isSystem = log.includes('[SYSTEM]');
                      const isDB = log.includes('[DATABASE]');
                      const isVite = log.includes('[VITE]') || log.includes('[REACT]');
                      
                      let textColor = 'text-text-secondary/70';
                      if (isSuccess) textColor = 'text-green-400 font-semibold';
                      else if (isSystem) textColor = 'text-accent-primary';
                      else if (isDB) textColor = 'text-accent-secondary';
                      else if (isVite) textColor = 'text-accent-tertiary';

                      return (
                        <div key={lIdx} className={`${textColor} leading-relaxed`}>
                          {log}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
