import { FaLaptopCode, FaServer, FaCodeBranch, FaDatabase } from 'react-icons/fa';
import { FI, highlightText, Tilt } from './AnimationHelpers';

const services = [
  {
    id: 1,
    title: 'Frontend Development',
    desc: 'Developing clean, responsive, and cross-browser user interfaces using React JS, Tailwind CSS, and HTML/CSS. Focused on user experience and speed.',
    icon: FaLaptopCode,
    color: '#B600A8',
  },
  {
    id: 2,
    title: 'Backend Development',
    desc: 'Building backend architectures and RESTful APIs using PHP, Laravel, and Node.js/Express. Focus on secure routing, authentication, and logic.',
    icon: FaServer,
    color: '#7621B0',
  },
  {
    id: 3,
    title: 'Database Architecture',
    desc: 'Designing relational and non-relational databases using MySQL and MongoDB. Creating optimized schemas and indexing for fast query performance.',
    icon: FaDatabase,
    color: '#ec4899',
  },
  {
    id: 4,
    title: 'API Integrations',
    desc: 'Integrating third-party APIs and building clean endpoints to connect backend logic with frontend UI modules seamlessly.',
    icon: FaCodeBranch,
    color: '#10B981',
  },
];

const ServiceCard = ({ service, index }) => {
  const Icon = service.icon;
  const numStr = `0${index + 1}`;
  
  return (
    <FI delay={index * 0.1} y={20}>
      <Tilt className="w-full h-full p-[1px] rounded-[3rem] bg-white/10 hover:bg-white/20 transition-all duration-300 group/card cursor-pointer shadow-lg">
        <div className="rounded-[2.9rem] p-8 sm:p-12 bg-[#0a0a0f]/90 backdrop-blur-3xl relative overflow-hidden flex flex-col justify-between h-full min-h-[380px]">
          {/* Background Number */}
          <div className="absolute -right-4 -bottom-8 text-[10rem] sm:text-[14rem] leading-none font-black font-kanit text-white/[0.015] group-hover/card:text-white/[0.03] transition-all duration-500 pointer-events-none select-none z-0">
            {numStr}
          </div>

          <div className="relative z-20 flex-grow flex flex-col justify-start">
            {/* Icon Container */}
            <div className="flex items-center gap-6 mb-8 mt-2">
              <div className="relative">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center border text-white transition-all duration-300 relative bg-white/5"
                  style={{
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                  }}
                >
                  <Icon size={28} className="relative z-10 text-white/80" />
                </div>
              </div>
              <h3 className="font-kanit text-2xl sm:text-3xl font-black uppercase tracking-wide text-white transition-all duration-300">
                {service.title}
              </h3>
            </div>

            {/* Description */}
            <p className="text-[#D7E2EA]/60 font-body font-light leading-relaxed text-base sm:text-lg group-hover/card:text-[#D7E2EA]/85 transition-colors duration-300 mb-6">
              {highlightText(service.desc)}
            </p>
          </div>
        </div>
      </Tilt>
    </FI>
  );
};

export default function Services() {
  return (
    <section id="services" className="py-24 md:py-32 relative bg-[#0C0C0C] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Section Header */}
        <FI delay={0} y={20} className="text-center mb-20 md:mb-28">
          <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-white/5 border border-white/10 text-xs sm:text-sm font-mono tracking-wider text-white/80 uppercase mb-6 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#ec4899]"></span>
            Services
          </div>
          <h2 className="font-kanit text-5xl sm:text-6xl lg:text-8xl font-black uppercase leading-none tracking-tighter text-white mb-6 relative inline-block">
            What I <span className="text-[#ec4899]">Provide</span>
          </h2>
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
