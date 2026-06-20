import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FaArrowRight, FaCode, FaRocket, FaReact, FaNodeJs, FaDatabase } from 'react-icons/fa';
import { FI, Tilt, highlightText, Mg } from './AnimationHelpers';

const Hero = () => {
  const [typedText, setTypedText] = useState('');
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [delta, setDelta] = useState(150);

  const heroContent = [
    {
      heading: 'Cloud Solutions',
      text: 'I architect secure and robust cloud infrastructure, leveraging modern DevOps practices to ensure your services are highly available, scalable, and future-proof.'
    },
    {
      heading: 'Web Applications',
      text: 'I design and develop highly scalable web applications, delivering elegant solutions to complex challenges with a focus on performance and seamless user experiences.'
    },
    {
      heading: 'Scalable APIs',
      text: 'I build lightning-fast, secure RESTful and GraphQL APIs designed to handle massive traffic and enable efficient data exchange between complex systems.'
    },
    {
      heading: 'Interactive UIs',
      text: 'I craft breathtaking, interactive user interfaces with fluid animations. Driven by a passion for modern design, I create digital experiences that truly inspire.'
    }
  ];

  const toRotate = heroContent.map(c => c.heading);

  // Looping Typewriter Effect
  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => clearInterval(ticker);
  }, [typedText, delta, isDeleting, loopNum]);

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting
      ? fullText.substring(0, typedText.length - 1)
      : fullText.substring(0, typedText.length + 1);

    setTypedText(updatedText);

    if (isDeleting) {
      setDelta((prevDelta) => prevDelta / 1.8);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setDelta(1500); // Delay before deleting starts
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setDelta(120); // Speed up typing
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const handleScroll = (e, targetId) => {
    e.preventDefault();
    const element = document.querySelector(targetId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const profileImagePath = '/images/profile.png.jpg';
  const fallbackImage = '/images/profile.png.jpg';

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#0C0C0C] pt-28 pb-24 lg:pb-32"
    >
      {/* 3D Grid & Mesh Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Dot pattern with glowing radial mask */}
        <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)]" />

        {/* Glow Mesh Orbs */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#B600A8] opacity-[0.06] blur-3xl" />
        <div className="absolute bottom-[10%] left-[30%] w-[40%] h-[40%] rounded-full bg-[#7621B0] opacity-[0.06] blur-3xl" />

        {/* Soft, non-overwhelming glow orb directly behind the profile card */}
        <div className="absolute top-[20%] right-[5%] w-[45%] h-[60%] rounded-full bg-gradient-to-br from-[#B600A8] via-[#7621B0] to-transparent opacity-[0.12] blur-3xl hidden lg:block" />

        {/* Floating Hexagons on Left (Dark Side) */}
        <div className="absolute top-[20%] left-[10%] opacity-20 animate-bounce" style={{ animationDuration: '7s' }}>
          <svg className="w-10 h-10 text-[#B600A8]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="50,5 95,25 95,75 50,95 5,75 5,25" />
          </svg>
        </div>
        <div className="absolute bottom-[25%] left-[8%] opacity-15 animate-spin-slow">
          <svg className="w-14 h-14 text-[#7621B0]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
            <polygon points="50,5 95,25 95,75 50,95 5,75 5,25" />
          </svg>
        </div>

        {/* Floating Hexagons on Right */}
        <div className="absolute top-[12%] right-[15%] opacity-15 hidden lg:block animate-bounce" style={{ animationDuration: '9s' }}>
          <svg className="w-16 h-16 text-[#B600A8]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
            <polygon points="50,5 95,25 95,75 50,95 5,75 5,25" />
          </svg>
        </div>
        <div className="absolute bottom-[28%] right-[38%] opacity-20 hidden lg:block animate-spin-slow">
          <svg className="w-10 h-10 text-[#7621B0]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="50,5 95,25 95,75 50,95 5,75 5,25" />
          </svg>
        </div>

        {/* Floating dot grid on the right */}
        <div className="absolute top-[25%] right-[5%] opacity-10 hidden lg:block">
          <svg width="100" height="100" viewBox="0 0 100 100" fill="currentColor" className="text-[#D7E2EA]/30">
            <circle cx="10" cy="10" r="1.5" /><circle cx="30" cy="10" r="1.5" /><circle cx="50" cy="10" r="1.5" /><circle cx="70" cy="10" r="1.5" /><circle cx="90" cy="10" r="1.5" />
            <circle cx="10" cy="30" r="1.5" /><circle cx="30" cy="30" r="1.5" /><circle cx="50" cy="30" r="1.5" /><circle cx="70" cy="30" r="1.5" /><circle cx="90" cy="30" r="1.5" />
            <circle cx="10" cy="50" r="1.5" /><circle cx="30" cy="50" r="1.5" /><circle cx="50" cy="50" r="1.5" /><circle cx="70" cy="50" r="1.5" /><circle cx="90" cy="50" r="1.5" />
            <circle cx="10" cy="70" r="1.5" /><circle cx="30" cy="70" r="1.5" /><circle cx="50" cy="70" r="1.5" /><circle cx="70" cy="70" r="1.5" /><circle cx="90" cy="70" r="1.5" />
            <circle cx="10" cy="90" r="1.5" /><circle cx="30" cy="90" r="1.5" /><circle cx="50" cy="90" r="1.5" /><circle cx="70" cy="90" r="1.5" /><circle cx="90" cy="90" r="1.5" />
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full min-h-[75vh]">

          {/* LEFT COLUMN: Modern Content Presentation */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 text-center lg:text-left flex flex-col items-center lg:items-start z-10"
          >
            {/* Monospace intro tag */}
            <motion.span
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-black/40 backdrop-blur-md border border-[#B600A8]/30 rounded-full text-[10px] sm:text-xs font-mono tracking-widest text-[#B600A8] mb-6 select-none shadow-[0_0_15px_rgba(182,0,168,0.2)]"
            >
              <span className="w-2 h-2 rounded-full bg-[#B600A8] shadow-[0_0_8px_#B600A8] animate-ping" />
              SYSTEM_ONLINE // V_2.0
            </motion.span>

            {/* Sub-header greetings with glitch animation */}
            <motion.span
              variants={itemVariants}
              animate={{ opacity: [1, 0.5, 1, 0.2, 1], x: [0, -2, 2, -1, 0] }}
              transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
              className="font-mono text-xs sm:text-sm uppercase tracking-[0.3em] text-[#D7E2EA]/50 mb-3 drop-shadow-md"
            >
              HELLO, I'M
            </motion.span>

            {/* Outlined Custom Headline */}
            <motion.h1
              variants={itemVariants}
              className="font-kanit text-5xl sm:text-7xl md:text-8xl font-black uppercase leading-none tracking-tight text-white mb-2 drop-shadow-2xl"
            >
              Usama <span className="text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.35)] hover:[-webkit-text-stroke:1.5px_#ec4899] hover:drop-shadow-[0_0_20px_rgba(236,72,153,0.5)] transition-all duration-300">Akbar</span>
            </motion.h1>

            {/* Dynamic Typewriter Heading */}
            <motion.h2
              variants={itemVariants}
              className="font-kanit text-2xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-wide mb-6 text-white min-h-[40px] sm:min-h-[60px] drop-shadow-lg"
            >
              Crafting <span className="gradient-text highlight-shine">{typedText}</span>
              <span className="inline-block w-1 h-6 sm:h-10 bg-gradient-to-b from-[#B600A8] to-[#ec4899] ml-2 animate-pulse align-middle shadow-[0_0_10px_#ec4899]" />
            </motion.h2>

            {/* Paragraph Bio */}
            <motion.div variants={itemVariants} className="relative mb-8 max-w-xl mx-auto lg:mx-0 min-h-[160px] sm:min-h-[120px]">
              <div className="absolute inset-0 bg-gradient-to-r from-[#B600A8]/20 to-[#7621B0]/20 blur-xl rounded-full opacity-50" />
              <div className="relative backdrop-blur-md bg-white/[0.03] border border-white/10 rounded-2xl shadow-2xl p-5 h-full flex items-center">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={loopNum % heroContent.length}
                    initial={{ opacity: 0, y: 10, filter: 'blur(5px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -10, filter: 'blur(5px)' }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="font-body font-light text-[#D7E2EA]/85 text-base sm:text-lg leading-relaxed m-0"
                  >
                    {highlightText(heroContent[loopNum % heroContent.length].text, 'system')}
                  </motion.p>
                </AnimatePresence>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start w-full sm:w-auto font-mono text-xs z-20"
            >
              <Mg padding={50} strength={2}>
                <motion.a
                  href="#projects"
                  onClick={(e) => handleScroll(e, '#projects')}
                  className="group px-8 py-4 bg-gradient-to-r from-[#B600A8] via-[#ec4899] to-[#7621B0] rounded-2xl font-kanit font-black uppercase tracking-widest text-white shadow-[0_0_20px_rgba(182,0,168,0.4)] hover:shadow-[0_0_30px_rgba(236,72,153,0.6)] transition-all duration-300 flex items-center justify-center gap-3 relative overflow-hidden"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Button light sweep effect */}
                  <div className="absolute inset-0 w-1/2 h-full bg-white/20 transform -skew-x-12 -translate-x-[150%] group-hover:translate-x-[250%] transition-transform duration-1000 pointer-events-none" />
                  <span className="relative z-10">View Projects</span>
                  <FaArrowRight className="transform transition-transform group-hover:translate-x-1 relative z-10" size={12} />
                </motion.a>
              </Mg>
              <Mg padding={50} strength={2}>
                <motion.a
                  href="#contact"
                  onClick={(e) => handleScroll(e, '#contact')}
                  className="group px-8 py-4 bg-black/40 hover:bg-white/5 rounded-2xl font-kanit font-black uppercase tracking-widest text-[#D7E2EA]/90 border border-white/10 hover:border-white/30 transition-all duration-300 backdrop-blur-2xl flex items-center justify-center shadow-xl hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] w-full"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Contact Me
                </motion.a>
              </Mg>
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN: Advanced Holographic / Premium Visualizer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="lg:col-span-5 flex justify-center lg:justify-end w-full relative mt-16 lg:mt-0 z-10"
          >
            {/* Massive Glowing Orbit Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] pointer-events-none z-0 flex items-center justify-center">
              <div className="absolute w-[70%] h-[70%] rounded-full border border-[#B600A8]/20 animate-[spin_10s_linear_infinite] shadow-[0_0_30px_rgba(182,0,168,0.1)]" />
              <div className="absolute w-[50%] h-[50%] rounded-full border border-dashed border-[#7621B0]/40 animate-[spin_15s_linear_infinite_reverse]" />

              {/* Dynamic glowing blobs behind image */}
              <div className="absolute w-64 h-64 bg-[#B600A8] rounded-full mix-blend-screen filter blur-3xl opacity-40 animate-pulse" />
              <div className="absolute w-56 h-56 bg-[#ec4899] rounded-full mix-blend-screen filter blur-3xl opacity-30 translate-x-10 translate-y-10 animate-float-slow" />
            </div>

            <div className="relative z-10">
              {/* Floating Stat Widget 1 (Top Left) */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -left-6 sm:-left-12 bg-black/60 backdrop-blur-2xl border border-white/10 rounded-2xl p-4 shadow-[0_0_30px_rgba(182,0,168,0.3)] flex items-center gap-4 z-30 select-none overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#B600A8]/0 via-[#B600A8]/20 to-[#B600A8]/0 -translate-x-full group-hover:animate-shimmer pointer-events-none" />
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#B600A8] to-[#ec4899] flex items-center justify-center text-white text-lg shadow-[0_0_15px_rgba(236,72,153,0.5)]">
                  <FaCode />
                </div>
                <div>
                  <div className="text-white font-heading font-black text-sm sm:text-base leading-tight drop-shadow-md">1+ YEARS</div>
                  <div className="text-[#D7E2EA]/70 text-[9px] sm:text-[10px] font-mono tracking-widest uppercase mt-0.5">Experience</div>
                </div>
              </motion.div>

              {/* Floating Stat Widget 2 (Bottom Right) */}
              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-8 -right-4 sm:-right-8 bg-black/60 backdrop-blur-2xl border border-white/10 rounded-2xl p-4 shadow-[0_0_30px_rgba(118,33,176,0.3)] flex items-center gap-4 z-30 select-none overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#7621B0]/0 via-[#7621B0]/20 to-[#7621B0]/0 -translate-x-full group-hover:animate-shimmer pointer-events-none" />
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#7621B0] to-[#B600A8] flex items-center justify-center text-white text-lg shadow-[0_0_15px_rgba(118,33,176,0.5)]">
                  <FaRocket />
                </div>
                <div>
                  <div className="text-white font-heading font-black text-sm sm:text-base leading-tight drop-shadow-md">20+ PROJECTS</div>
                  <div className="text-[#D7E2EA]/70 text-[9px] sm:text-[10px] font-mono tracking-widest uppercase mt-0.5">Delivered</div>
                </div>
              </motion.div>

              {/* Premium Floating Card with Orbiting Icons */}
              <div className="relative z-20 group">
                {/* Orbiting Tech Icons */}
                <div className="absolute top-1/2 left-1/2 w-[120%] h-[120%] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-30">
                  <div className="absolute inset-0 animate-[spin_20s_linear_infinite]">
                    {/* React Icon */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-black/70 backdrop-blur-xl border border-[#61DAFB]/30 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(97,218,251,0.2)] animate-[spin_20s_linear_infinite_reverse]">
                      <FaReact className="text-[#61DAFB] text-2xl animate-[spin_8s_linear_infinite]" />
                    </div>
                    {/* Node.js Icon */}
                    <div className="absolute bottom-1/4 right-0 translate-x-1/2 w-10 h-10 bg-black/70 backdrop-blur-xl border border-[#339933]/30 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(51,153,51,0.2)] animate-[spin_20s_linear_infinite_reverse]">
                      <FaNodeJs className="text-[#339933] text-xl" />
                    </div>
                    {/* Database Icon */}
                    <div className="absolute bottom-1/4 left-0 -translate-x-1/2 w-10 h-10 bg-black/70 backdrop-blur-xl border border-[#B600A8]/30 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(182,0,168,0.2)] animate-[spin_20s_linear_infinite_reverse]">
                      <FaDatabase className="text-[#B600A8] text-lg" />
                    </div>
                  </div>
                </div>

                <Tilt className="relative w-72 h-[22rem] sm:w-80 sm:h-[26rem] md:w-[360px] md:h-[440px] rounded-[2.5rem] p-[2px] bg-gradient-to-br from-white/30 via-[#B600A8]/40 to-white/10 shadow-[0_0_50px_rgba(182,0,168,0.3)] overflow-hidden cursor-pointer">
                  <div className="w-full h-full rounded-[2.4rem] overflow-hidden bg-[#0C0C0C] relative flex items-center justify-center">

                    {/* Scanner line effect */}
                    <motion.div
                      animate={{ top: ['0%', '100%', '0%'] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                      className="absolute left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-[#ec4899] to-transparent shadow-[0_0_20px_rgba(236,72,153,1)] z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    />

                    {/* Corner bracket decals for high-tech HUD look */}
                    <div className="absolute top-5 left-5 w-8 h-8 border-t-2 border-l-2 border-[#ec4899]/50 pointer-events-none z-30 transition-all duration-300 group-hover:border-[#ec4899] group-hover:scale-110 group-hover:shadow-[0_0_10px_#ec4899]" />
                    <div className="absolute top-5 right-5 w-8 h-8 border-t-2 border-r-2 border-[#ec4899]/50 pointer-events-none z-30 transition-all duration-300 group-hover:border-[#ec4899] group-hover:scale-110 group-hover:shadow-[0_0_10px_#ec4899]" />
                    <div className="absolute bottom-5 left-5 w-8 h-8 border-b-2 border-l-2 border-[#7621B0]/50 pointer-events-none z-30 transition-all duration-300 group-hover:border-[#7621B0] group-hover:scale-110 group-hover:shadow-[0_0_10px_#7621B0]" />
                    <div className="absolute bottom-5 right-5 w-8 h-8 border-b-2 border-r-2 border-[#7621B0]/50 pointer-events-none z-30 transition-all duration-300 group-hover:border-[#7621B0] group-hover:scale-110 group-hover:shadow-[0_0_10px_#7621B0]" />

                    {/* Profile Photo */}
                    <div className="absolute inset-0 z-10 transition-transform duration-700 group-hover:scale-110">
                      <img
                        id="profile-photo"
                        src={profileImagePath}
                        alt="Usama Akbar - Full Stack Developer"
                        className="w-full h-full object-cover object-center filter contrast-105 brightness-95 group-hover:contrast-125 group-hover:brightness-110 transition-all duration-700"
                        onError={(e) => {
                          e.target.src = fallbackImage;
                        }}
                      />
                      {/* Color overlay to blend with theme */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-[#7621B0]/30 to-transparent mix-blend-overlay group-hover:opacity-50 transition-opacity duration-500" />
                    </div>

                    {/* Inner glowing shadow */}
                    <div className="absolute inset-0 shadow-[inset_0_0_50px_rgba(0,0,0,0.9)] z-20 pointer-events-none" />

                    {/* Glass overlay at the bottom with name */}
                    <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black via-black/60 to-transparent z-20 flex items-end justify-center p-6 pointer-events-none translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                      <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 text-center transform translate-y-4 group-hover:translate-y-0">
                        <p className="text-white font-heading font-black text-2xl tracking-widest drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">USAMA</p>
                        <p className="text-[#ec4899] font-mono text-xs tracking-[0.2em] uppercase mt-1 drop-shadow-[0_0_8px_#ec4899]">System Architect</p>
                      </div>
                    </div>
                  </div>
                </Tilt>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Bottom Wave Divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-20 pointer-events-none">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-[40px] sm:h-[60px] md:h-[80px]"
          fill="#0C0C0C"
        >
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C26.9,8.75,57.05,18.3,87.74,27.06,171.7,51,250.77,69.51,321.39,56.44Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
