import { motion } from 'framer-motion';
import { FaLaptopCode, FaServer, FaCodeBranch, FaDatabase } from 'react-icons/fa';
import { FI, highlightText, Tilt } from './AnimationHelpers';
import { useState, useRef } from 'react';

const services = [
  {
    id: 1,
    title: 'Frontend Development',
    desc: 'Crafting responsive, pixel-perfect user interfaces using React JS, Tailwind CSS, and HTML5/CSS3. Focused on delivering interactive digital experiences with smooth layouts.',
    icon: FaLaptopCode,
    color: '#B600A8',
    sys: 'SYS.01',
    metric: 'RENDER_PERF',
  },
  {
    id: 2,
    title: 'Backend Development',
    desc: 'Engineering robust server-side architectures and API services using PHP, Laravel, and Node.js. Implementing secure authentication and fast request handling.',
    icon: FaServer,
    color: '#7621B0',
    sys: 'SYS.02',
    metric: 'SERVER_LOAD',
  },
  {
    id: 3,
    title: 'Database Architecture',
    desc: 'Designing and optimizing relational and non-relational database models using MySQL and MongoDB. Ensuring high data integrity and efficient queries.',
    icon: FaDatabase,
    color: '#ec4899',
    sys: 'SYS.03',
    metric: 'DATA_SYNC',
  },
  {
    id: 4,
    title: 'API Integrations',
    desc: 'Developing and consuming clean, structured RESTful and GraphQL APIs with Laravel routes or Express.js. Seamlessly connecting frontends with databases and external services.',
    icon: FaCodeBranch,
    color: '#10B981',
    sys: 'SYS.04',
    metric: 'NODE_LINK',
  },
];

const ServiceCard = ({ service, index }) => {
  const Icon = service.icon;
  const numStr = `0${index + 1}`;
  
  // State for flashlight hover effect
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const rectRef = useRef(null);

  const handleMouseEnter = (e) => {
    setIsHovered(true);
    rectRef.current = e.currentTarget.getBoundingClientRect();
  };

  const handleMouseMove = (e) => {
    if (!rectRef.current) {
      rectRef.current = e.currentTarget.getBoundingClientRect();
    }
    const { left, top } = rectRef.current;
    setMousePos({ x: e.clientX - left, y: e.clientY - top });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    rectRef.current = null;
  };

  return (
    <FI delay={index * 0.15} y={40}>
      <Tilt className="w-full h-full p-[2px] rounded-[3rem] bg-gradient-to-br from-white/10 via-white/5 to-transparent hover:from-white/20 transition-colors duration-500 group/card cursor-pointer shadow-2xl">
        <div 
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="rounded-[2.9rem] p-8 sm:p-12 bg-[#0a0a0f]/90 backdrop-blur-3xl relative overflow-hidden flex flex-col justify-between h-full min-h-[420px]"
        >
          {/* FLASHLIGHT EFFECT (Follows Mouse) */}
          <div 
            className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none z-0 mix-blend-screen"
            style={{
              background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, ${service.color}15, transparent 80%)`
            }}
          />

          {/* Dotted Grid Overlay Background */}
          <div 
            className="absolute inset-0 opacity-0 group-hover/card:opacity-[0.05] transition-opacity duration-700 pointer-events-none z-0"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
              backgroundSize: '20px 20px',
            }}
          />

          {/* Massive Background Number */}
          <div className="absolute -right-4 -bottom-8 text-[10rem] sm:text-[14rem] leading-none font-black font-kanit text-white/[0.015] group-hover/card:text-white/[0.04] group-hover/card:scale-110 group-hover/card:-translate-x-4 transition-all duration-1000 pointer-events-none select-none z-0">
            {numStr}
          </div>

          {/* Sweep scanner line on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-[150%] group-hover/card:translate-x-[150%] transition-transform duration-[1.5s] ease-in-out pointer-events-none z-0" />

          {/* High-Tech Corner Accents */}
          <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-white/5 group-hover/card:border-white/20 transition-colors duration-500 pointer-events-none z-10" />
          <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-white/5 group-hover/card:border-white/20 transition-colors duration-500 pointer-events-none z-10" />

          <div className="relative z-20 flex-grow flex flex-col justify-start">
            
            {/* Floating System Badge */}
            <div className="absolute right-0 top-0 opacity-0 group-hover/card:opacity-100 transition-all duration-500 -translate-y-4 group-hover/card:translate-y-0">
              <span 
                className="text-[10px] font-mono tracking-[0.3em] font-bold px-4 py-1.5 rounded-full border bg-black/80 backdrop-blur-md inline-flex items-center gap-2 shadow-lg"
                style={{ borderColor: `${service.color}40`, color: service.color, boxShadow: `0 0 20px ${service.color}20` }}
              >
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: service.color }} />
                {service.sys}
              </span>
            </div>

            {/* Icon Container */}
            <div className="flex items-center gap-6 mb-8 mt-2">
              <div className="relative">
                {/* Rotating HUD Ring */}
                <div 
                  className="absolute -inset-3 border-2 border-dashed rounded-full opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 animate-[spin_6s_linear_infinite]"
                  style={{ borderColor: `${service.color}40` }}
                />
                <div 
                  className="absolute -inset-4 border border-dotted rounded-full opacity-0 group-hover/card:opacity-50 transition-opacity duration-700 animate-[spin_10s_linear_infinite_reverse]"
                  style={{ borderColor: `${service.color}60` }}
                />
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center border text-white transition-all duration-500 relative group-hover/card:scale-105"
                  style={{
                    background: `linear-gradient(135deg, ${service.color}15, ${service.color}35)`,
                    borderColor: `${service.color}40`,
                    boxShadow: `0 10px 30px -10px ${service.color}60`,
                  }}
                >
                  <div 
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 blur-md"
                    style={{ backgroundColor: service.color }}
                  />
                  <Icon size={28} style={{ color: service.color }} className="relative z-10 drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
                </div>
              </div>
              <h3 className="font-kanit text-2xl sm:text-3xl font-black uppercase tracking-wide text-white group-hover/card:text-transparent group-hover/card:bg-clip-text group-hover/card:bg-gradient-to-r group-hover/card:from-white group-hover/card:to-white/60 transition-all duration-500 drop-shadow-md">
                {service.title}
              </h3>
            </div>

            {/* Description */}
            <p className="text-[#D7E2EA]/60 font-body font-light leading-relaxed text-base sm:text-lg group-hover/card:text-[#D7E2EA]/90 transition-colors duration-300 drop-shadow-sm mb-6">
              {highlightText(service.desc)}
            </p>
          </div>

          {/* Bottom HUD Data Bars (Animated) */}
          <div className="relative z-20 mt-auto pt-6 border-t border-white/5 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 delay-100">
             <div className="flex flex-col gap-2 w-full">
               <div className="flex justify-between text-[10px] font-mono text-[#D7E2EA]/40 tracking-widest">
                 <span>{service.metric}</span>
                 <span className="font-bold" style={{ color: service.color }}>99.9%</span>
               </div>
               
               {/* Progress Bar Track */}
               <div className="w-full h-1.5 bg-black/50 rounded-full overflow-hidden border border-white/5 relative">
                 {/* Progress Fill */}
                 <div 
                   className="absolute top-0 left-0 h-full rounded-full transition-all duration-[1.5s] ease-out"
                   style={{ 
                     width: isHovered ? '100%' : '0%',
                     backgroundColor: service.color, 
                     boxShadow: `0 0 15px ${service.color}` 
                   }} 
                 />
                 {/* Moving scanning light across bar */}
                 <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover/card:animate-[shimmer_2s_infinite] pointer-events-none" />
               </div>
             </div>
          </div>

          {/* Bottom Decorative Line */}
          <div className="absolute bottom-0 left-10 right-10 h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent scale-x-0 group-hover/card:scale-x-100 transition-transform duration-700 ease-out origin-center z-10" />
        </div>
      </Tilt>
    </FI>
  );
};

export default function Services() {
  return (
    <section id="services" className="py-24 md:py-32 relative bg-[#0C0C0C] overflow-hidden">
      {/* Visual background blurred meshes & Animated Grid */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Synthwave Grid (Static for high performance) */}
        <div className="absolute inset-0 opacity-[0.03] perspective-1000">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:4rem_4rem] [transform:rotateX(60deg)_translateY(-100px)_scale(2)] origin-top transform-gpu" />
        </div>

        {/* Ambient Orbs (Static for high performance) */}
        <div
          className="absolute top-1/4 left-[-100px] w-[500px] h-[500px] bg-[#B600A8]/10 rounded-full blur-[150px] mix-blend-screen transform-gpu"
        />
        <div
          className="absolute bottom-1/4 right-[-100px] w-[500px] h-[500px] bg-[#7621B0]/10 rounded-full blur-[150px] mix-blend-screen transform-gpu"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Section Header */}
        <FI delay={0} y={30} className="text-center mb-20 md:mb-28">
          <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-white/[0.03] border border-white/10 text-xs sm:text-sm font-mono tracking-widest text-[#B600A8] uppercase mb-6 shadow-[0_0_30px_rgba(182,0,168,0.15)] backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#B600A8] animate-pulse shadow-[0_0_10px_#B600A8]"></span>
            Specialised Offerings
          </div>
          <h2 className="font-kanit text-5xl sm:text-6xl lg:text-8xl font-black uppercase leading-none tracking-tighter text-white mb-6 relative inline-block">
            What I <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B600A8] via-[#ec4899] to-[#7621B0] drop-shadow-[0_0_30px_rgba(182,0,168,0.5)]">Provide</span>
            {/* High-tech brackets */}
            <span className="absolute -left-8 -top-4 text-[#B600A8]/30 font-light text-4xl hidden md:block">{"["}</span>
            <span className="absolute -right-8 -bottom-4 text-[#ec4899]/30 font-light text-4xl hidden md:block">{"]"}</span>
          </h2>
          <p className="text-[#D7E2EA]/50 max-w-2xl mx-auto mt-6 text-lg sm:text-xl font-light">
            {highlightText("High-performance development services tailored to craft premium digital experiences.")}
          </p>
        </FI>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8 w-full relative z-10">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
