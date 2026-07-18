import { motion } from 'framer-motion';
import { FI, AC } from './AnimationHelpers';
import { FaHeart, FaCircle } from 'react-icons/fa';

export default function BehindTheCode() {
  const preferences = [
    { label: 'Indentation', left: 'Spaces', right: 'Tabs', value: 80 },
    { label: 'Engineering Focus', left: 'Frontend', right: 'Backend', value: 50 },
    { label: 'Fuel Source', left: 'Coffee', right: 'Chai ☕', value: 90 },
    { label: 'Philosophy', left: 'Speed Run', right: 'Clean Code', value: 95 },
  ];

  return (
    <section id="behind-the-code" className="py-24 md:py-32 relative bg-bg-primary transition-colors duration-300 overflow-hidden border-t border-glass-border">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Section Header */}
        <FI delay={0} y={20} className="text-center mb-20">
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-glass-border bg-bg-secondary backdrop-blur-md mb-8">
            <span className="w-2 h-2 rounded-full bg-accent-secondary" />
            <span className="text-xs sm:text-sm font-bold tracking-wider uppercase text-text-secondary">
              Personal Sandbox
            </span>
          </div>
          
          <h2 className="text-text-primary font-heading font-black uppercase text-center leading-none tracking-tighter text-5xl sm:text-6xl lg:text-7xl">
            Behind <span className="text-outline">The Code</span>
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto mt-6 text-base sm:text-lg text-center font-light leading-relaxed">
            Fun statistics, work environment configurations, and engineering preferences that drive my daily builds.
          </p>
        </FI>

        {/* Master Grid (Three distinct typographic columns, no cards) */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-stretch mt-12 w-full">
          
          {/* Column 1: Typography Stats (Grid Span 4) */}
          <div className="lg:col-span-4 flex flex-col justify-center space-y-10 py-6">
            <FI delay={0.1} y={20} className="space-y-1">
              <div className="flex items-baseline gap-2">
                <span className="text-5xl sm:text-6xl font-heading font-black text-text-primary">
                  <AC value={1500} suffix="+" />
                </span>
                <span className="w-2 h-2 rounded-full bg-accent-primary animate-ping" />
              </div>
              <p className="text-[10px] font-mono font-bold tracking-widest text-text-secondary/60 uppercase">
                Hours of Keyboard Time
              </p>
            </FI>

            <FI delay={0.2} y={20} className="space-y-1">
              <div className="flex items-baseline gap-2">
                <span className="text-5xl sm:text-6xl font-heading font-black text-text-primary">
                  <AC value={350} suffix="+" />
                </span>
                <span className="w-2 h-2 rounded-full bg-accent-secondary" />
              </div>
              <p className="text-[10px] font-mono font-bold tracking-widest text-text-secondary/60 uppercase">
                Git Commits Pushed
              </p>
            </FI>

            <FI delay={0.3} y={20} className="space-y-1">
              <div className="flex items-baseline gap-2">
                <span className="text-5xl sm:text-6xl font-heading font-black text-text-primary">
                  <AC value={18} suffix="+" />
                </span>
                <span className="w-2 h-2 rounded-full bg-accent-tertiary" />
              </div>
              <p className="text-[10px] font-mono font-bold tracking-widest text-text-secondary/60 uppercase">
                Successful Deployments
              </p>
            </FI>
          </div>

          {/* Column 2: Code Editor Preview (Grid Span 5) */}
          <FI delay={0.2} y={30} className="lg:col-span-5 flex items-center justify-center">
            <div className="w-full rounded-2xl border border-glass-border bg-bg-secondary overflow-hidden shadow-2xl relative">
              
              {/* Fake IDE Header bar */}
              <div className="px-5 py-3.5 bg-bg-primary border-b border-glass-border flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FaCircle className="text-red-500/80 text-[10px]" />
                  <FaCircle className="text-yellow-500/80 text-[10px]" />
                  <FaCircle className="text-green-500/80 text-[10px]" />
                </div>
                <div className="text-text-secondary/50 font-mono text-[10px]">
                  usama_akbar.json
                </div>
                <div className="w-10 h-2" />
              </div>

              {/* Fake IDE Content */}
              <div className="p-6 font-mono text-xs sm:text-sm text-text-secondary leading-relaxed bg-bg-secondary select-none">
                <div><span className="text-accent-secondary">const</span> <span className="text-accent-primary">developer</span> = &#123;</div>
                <div className="pl-4"><span className="text-text-primary">"name"</span>: <span className="text-accent-tertiary">"Usama Akbar"</span>,</div>
                <div className="pl-4"><span className="text-text-primary">"role"</span>: <span className="text-accent-tertiary">"Full Stack Web Engineer"</span>,</div>
                <div className="pl-4"><span className="text-text-primary">"stack"</span>: [</div>
                <div className="pl-8"><span className="text-accent-tertiary">"React"</span>, <span className="text-accent-tertiary">"Laravel"</span>, <span className="text-accent-tertiary">"MySQL"</span>, <span className="text-accent-tertiary">"Tailwind"</span></div>
                <div className="pl-4">],</div>
                <div className="pl-4"><span className="text-text-primary">"nightOwl"</span>: <span className="text-accent-gold">true</span>,</div>
                <div className="pl-4"><span className="text-text-primary">"coffeeStats"</span>: <span className="text-accent-tertiary">"90% Chai"</span>,</div>
                <div className="pl-4"><span className="text-text-primary">"lovesCleanCode"</span>: <span className="text-accent-gold">true</span></div>
                <div>&#125;;</div>
              </div>
            </div>
          </FI>

          {/* Column 3: Preference Sliders (Grid Span 3) */}
          <div className="lg:col-span-3 flex flex-col justify-center space-y-8 py-6">
            <h4 className="font-heading text-lg font-black text-text-primary uppercase tracking-wider mb-2">
              Preferences
            </h4>
            
            {preferences.map((pref, idx) => (
              <FI key={idx} delay={0.2 + idx * 0.1} y={15} className="space-y-2">
                <div className="flex items-center justify-between text-[10px] font-mono font-bold uppercase tracking-wider text-text-secondary/60">
                  <span>{pref.label}</span>
                </div>

                {/* Slider Track Line */}
                <div className="relative w-full h-[3px] bg-glass-border rounded-full">
                  {/* Active fill up to point */}
                  <div
                    className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full"
                    style={{ width: `${pref.value}%` }}
                  />
                  {/* Circle Slider point indicator */}
                  <div
                    className="absolute w-2 h-2 rounded-full bg-text-primary border border-bg-primary -top-[2px] transform -translate-x-1/2"
                    style={{ left: `${pref.value}%` }}
                  />
                </div>

                {/* Value labels */}
                <div className="flex items-center justify-between text-[9px] font-mono tracking-wider font-bold">
                  <span className={pref.value < 50 ? 'text-accent-primary' : 'text-text-secondary/40'}>
                    {pref.left}
                  </span>
                  <span className={pref.value >= 50 ? 'text-accent-secondary' : 'text-text-secondary/40'}>
                    {pref.right}
                  </span>
                </div>
              </FI>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
