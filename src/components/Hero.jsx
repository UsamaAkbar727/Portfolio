import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FaArrowRight, FaCode, FaRocket, FaReact, FaNodeJs, FaDatabase, FaDownload } from 'react-icons/fa';
import { FI, Tilt, highlightText, Mg } from './AnimationHelpers';

const Hero = () => {
  const [typedText, setTypedText] = useState('');
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [delta, setDelta] = useState(150);

  const heroContent = [
    {
      heading: 'Web Applications',
      text: 'I build responsive, clean, and interactive web applications using modern technologies like React JS and Laravel, focusing on clean code and reliable performance.'
    },
    {
      heading: 'Backend APIs',
      text: 'I develop secure, well-structured RESTful APIs with PHP, Node.js, and MySQL to efficiently connect client applications with server resources.'
    },
    {
      heading: 'Database Solutions',
      text: 'I design organized database schemas in MySQL and MongoDB, ensuring proper data relationships, security, and fast search performance.'
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
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

      if (window.lenis) {
        window.lenis.scrollTo(offsetPosition, {
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      } else {
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  const profileImagePath = '/images/profile.png.jpg';
  const fallbackImage = '/images/profile.png.jpg';

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#0C0C0C] pt-28 pb-24 lg:pb-32"
    >
      {/* Mesh Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)]" />
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#B600A8] opacity-[0.04] blur-3xl" />
        <div className="absolute bottom-[10%] left-[30%] w-[40%] h-[40%] rounded-full bg-[#7621B0] opacity-[0.04] blur-3xl" />
        <div className="absolute top-[20%] right-[5%] w-[45%] h-[60%] rounded-full bg-gradient-to-br from-[#B600A8] via-[#7621B0] to-transparent opacity-[0.08] blur-3xl hidden lg:block" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full min-h-[75vh]">

          {/* LEFT COLUMN: Clean Copy Presentation */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 text-center lg:text-left flex flex-col items-center lg:items-start z-10"
          >
            {/* Tag */}
            <motion.span
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs font-mono tracking-wider text-white/80 mb-6 select-none"
            >
              <span className="w-2 h-2 rounded-full bg-[#ec4899] shadow-[0_0_8px_#ec4899]" />
              Full Stack Web Developer
            </motion.span>

            {/* Greetings */}
            <motion.span
              variants={itemVariants}
              className="font-mono text-xs sm:text-sm uppercase tracking-[0.2em] text-[#D7E2EA]/50 mb-3"
            >
              Hello, I'm
            </motion.span>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="font-kanit text-5xl sm:text-7xl md:text-8xl font-black uppercase leading-none tracking-tight text-white mb-2 drop-shadow-2xl"
            >
              Usama <span className="text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.35)] hover:[-webkit-text-stroke:1px_#ec4899] transition-all duration-300">Akbar</span>
            </motion.h1>

            {/* Dynamic Typewriter Heading */}
            <motion.h2
              variants={itemVariants}
              className="font-kanit text-2xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-wide mb-6 text-white min-h-[40px] sm:min-h-[60px] drop-shadow-lg"
            >
              Building <span className="text-[#ec4899]">{typedText}</span>
              <span className="inline-block w-0.5 h-6 sm:h-10 bg-[#ec4899] ml-2 animate-pulse align-middle" />
            </motion.h2>

            {/* Paragraph Bio */}
            <motion.div variants={itemVariants} className="relative mb-8 max-w-xl mx-auto lg:mx-0">
              <div className="relative backdrop-blur-md bg-white/[0.02] border border-white/5 rounded-2xl shadow-xl p-5 h-full flex items-center">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={loopNum % heroContent.length}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="font-body font-light text-[#D7E2EA]/80 text-base sm:text-lg leading-relaxed m-0"
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
              <Mg>
                <motion.a
                  href="#projects"
                  onClick={(e) => handleScroll(e, '#projects')}
                  className="group px-8 py-4 bg-gradient-to-r from-[#B600A8] via-[#ec4899] to-[#7621B0] rounded-2xl font-kanit font-black uppercase tracking-widest text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 relative overflow-hidden"
                  whileHover={{ scale: 1.03, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10">View Projects</span>
                  <FaArrowRight className="transform transition-transform group-hover:translate-x-1 relative z-10" size={12} />
                </motion.a>
              </Mg>
              <Mg>
                <motion.a
                  href="/assets/resume.pdf"
                  download="Usama_Akbar_Resume.pdf"
                  className="group px-8 py-4 bg-white/5 hover:bg-white/10 rounded-2xl font-kanit font-black uppercase tracking-widest text-[#D7E2EA]/95 border border-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-2xl flex items-center justify-center gap-2 shadow-xl w-full"
                  whileHover={{ scale: 1.03, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10">Download CV</span>
                  <FaDownload className="relative z-10 text-[#ec4899]" size={11} />
                </motion.a>
              </Mg>
              <Mg>
                <motion.a
                  href="#contact"
                  onClick={(e) => handleScroll(e, '#contact')}
                  className="group px-8 py-4 bg-black/40 hover:bg-white/5 rounded-2xl font-kanit font-black uppercase tracking-widest text-[#D7E2EA]/90 border border-white/5 hover:border-white/20 transition-all duration-300 backdrop-blur-2xl flex items-center justify-center shadow-xl w-full"
                  whileHover={{ scale: 1.03, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Contact Me
                </motion.a>
              </Mg>
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN: Clean Profile Presentation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 flex justify-center lg:justify-end w-full relative mt-16 lg:mt-0 z-10"
          >
            {/* Soft Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] pointer-events-none z-0 flex items-center justify-center">
              <div className="absolute w-64 h-64 bg-[#B600A8] rounded-full mix-blend-screen filter blur-3xl opacity-20 transform-gpu" />
              <div className="absolute w-56 h-56 bg-[#ec4899] rounded-full mix-blend-screen filter blur-3xl opacity-15 translate-x-10 translate-y-10 transform-gpu" />
            </div>

            <div className="relative z-10">
              {/* Static Experience Widget */}
              <div className="absolute -top-6 -left-6 sm:-left-12 bg-black/80 backdrop-blur-2xl border border-white/5 rounded-2xl p-4 shadow-xl flex items-center gap-4 z-30 select-none">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#B600A8] to-[#ec4899] flex items-center justify-center text-white text-base">
                  <FaCode />
                </div>
                <div>
                  <div className="text-white font-heading font-black text-sm leading-tight">1+ YEARS</div>
                  <div className="text-[#D7E2EA]/50 text-[9px] font-mono tracking-wider uppercase mt-0.5">Experience</div>
                </div>
              </div>

              {/* Static Projects Widget */}
              <div className="absolute -bottom-8 -right-4 sm:-right-8 bg-black/80 backdrop-blur-2xl border border-white/5 rounded-2xl p-4 shadow-xl flex items-center gap-4 z-30 select-none">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7621B0] to-[#B600A8] flex items-center justify-center text-white text-base">
                  <FaRocket />
                </div>
                <div>
                  <div className="text-white font-heading font-black text-sm leading-tight">20+ PROJECTS</div>
                  <div className="text-[#D7E2EA]/50 text-[9px] font-mono tracking-wider uppercase mt-0.5">Delivered</div>
                </div>
              </div>

              {/* Profile Card Wrapper */}
              <div className="relative z-20">
                <Tilt className="relative w-72 h-[22rem] sm:w-80 sm:h-[26rem] md:w-[350px] md:h-[420px] rounded-[2rem] p-[1px] bg-white/10 hover:bg-white/20 shadow-xl overflow-hidden cursor-pointer">
                  <div className="w-full h-full rounded-[1.95rem] overflow-hidden bg-[#0C0C0C] relative flex items-center justify-center">

                    {/* Profile Photo */}
                    <div className="absolute inset-0 z-10">
                      <img
                        id="profile-photo"
                        src={profileImagePath}
                        alt="Usama Akbar - Full Stack Developer"
                        className="w-full h-full object-cover object-center filter contrast-105 brightness-95"
                        onError={(e) => {
                          e.target.src = fallbackImage;
                        }}
                      />
                      {/* Color overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:opacity-40 transition-opacity duration-300" />
                    </div>

                    {/* Glass overlay at the bottom with name */}
                    <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black via-black/80 to-transparent z-20 flex items-end justify-center p-6 pointer-events-none">
                      <div className="text-center">
                        <p className="text-white font-heading font-black text-2xl tracking-widest">USAMA</p>
                        <p className="text-[#ec4899] font-mono text-xs tracking-wider uppercase mt-1">Full Stack Developer</p>
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
