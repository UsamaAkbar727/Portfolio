import { FaLaptopCode, FaServer, FaDatabase, FaCodeBranch } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { FI, highlightText } from './AnimationHelpers';

const services = [
  {
    id: '01',
    title: 'Frontend Development',
    desc: 'Developing clean, responsive, and cross-browser user interfaces using React JS, Tailwind CSS, and HTML/CSS. Focus on animations, interactive views, and high core web vitals speed.',
    icon: FaLaptopCode,
    color: 'var(--accent-primary)',
  },
  {
    id: '02',
    title: 'Backend Development',
    desc: 'Building backend architectures and RESTful APIs using PHP, Laravel, and Node.js/Express. Focus on secure middleware routing, request token authentication, and business logic flow.',
    icon: FaServer,
    color: 'var(--accent-secondary)',
  },
  {
    id: '03',
    title: 'Database Architecture',
    desc: 'Designing relational and non-relational databases using MySQL and MongoDB. Creating optimized schemas, constraints, indexing, and aggregates for fast search queries.',
    icon: FaDatabase,
    color: 'var(--accent-tertiary)',
  },
  {
    id: '04',
    title: 'API Integrations',
    desc: 'Integrating third-party APIs and building clean REST endpoints to connect backend logic with frontend UI components seamlessly.',
    icon: FaCodeBranch,
    color: 'var(--accent-gold)',
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 md:py-32 relative bg-bg-secondary overflow-hidden border-t border-glass-border transition-colors duration-300">
      
      {/* Background decoration grid lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Split Grid Layout */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 w-full">
          
          {/* Left Column: Sticky Editorial Header */}
          <div className="lg:col-span-4 flex flex-col justify-start lg:sticky lg:top-28 h-fit">
            <FI delay={0} y={20}>
              <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-bg-primary border border-glass-border text-xs sm:text-sm font-mono tracking-wider text-text-secondary uppercase mb-6 shadow-sm w-fit">
                <span className="w-2 h-2 rounded-full bg-accent-primary" />
                Services
              </div>
              <h2 className="font-heading text-5xl sm:text-6xl font-black uppercase leading-none tracking-tighter text-text-primary mb-6">
                What I <br /><span className="text-outline">Provide</span>
              </h2>
              <p className="text-text-secondary font-body font-light leading-relaxed text-base sm:text-lg">
                I combine visual design layouts with solid application logic to craft custom digital products that perform.
              </p>
            </FI>
          </div>

          {/* Right Column: Premium Horizontal Glass Panels */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <FI key={service.id} delay={index * 0.1} y={30} className="w-full">
                  <div
                    className="relative rounded-[2rem] p-[1px] bg-glass-border hover:bg-text-secondary/20 transition-all duration-500 shadow-premium hover:shadow-premium-hover cursor-pointer group/row overflow-hidden w-full"
                  >
                    {/* Inner content background */}
                    <div className="absolute inset-[1px] rounded-[calc(2rem-1px)] bg-bg-primary z-0" />
                    
                    {/* Hover glow line */}
                    <div 
                      className="absolute top-0 left-0 w-1.5 h-full origin-bottom transition-transform duration-500" 
                      style={{ backgroundColor: service.color }}
                    />

                    {/* Content */}
                    <div className="relative z-10 p-8 sm:p-10 flex flex-col sm:flex-row items-start justify-between gap-6 sm:gap-10">
                      
                      <div className="flex items-start gap-6 flex-1">
                        {/* Numeral */}
                        <span 
                          className="font-heading text-4xl sm:text-5xl font-black text-text-secondary/20 group-hover/row:text-text-secondary/40 transition-colors duration-500 select-none pointer-events-none mt-1"
                          style={{ fontFamily: '"Space Grotesk"' }}
                        >
                          {service.id}
                        </span>

                        {/* Text details */}
                        <div className="space-y-3">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-bg-secondary border border-glass-border flex items-center justify-center text-text-primary">
                              <Icon size={18} style={{ color: service.color }} />
                            </div>
                            <h3 className="font-heading text-xl sm:text-2xl font-black uppercase tracking-wide text-text-primary">
                              {service.title}
                            </h3>
                          </div>
                          <p className="text-text-secondary font-body font-light leading-relaxed text-sm sm:text-base group-hover/row:text-text-primary transition-colors duration-300">
                             {highlightText(service.desc)}
                          </p>
                        </div>
                      </div>

                    </div>
                  </div>
                </FI>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
