import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FaArrowRight, FaCode, FaRocket, FaTerminal, FaDownload, FaLaptopCode } from 'react-icons/fa';
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
      setDelta((prevDelta) => Math.max(60, prevDelta / 1.8));
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



  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-bg-primary transition-colors duration-300 pt-32 pb-24 lg:pb-36"
    >
      {/* Subtle background grid pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03] bg-[linear-gradient(to_right,var(--text-primary)_1px,transparent_1px),linear-gradient(to_bottom,var(--text-primary)_1px,transparent_1px)] bg-[size:50px_50px]" />
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-500/5 blur-3xl animate-pulse" />
        <div className="absolute bottom-[10%] left-[30%] w-[40%] h-[40%] rounded-full bg-indigo-500/5 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full min-h-[75vh]">

          {/* LEFT COLUMN: Clean Copy Presentation */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 text-center lg:text-left flex flex-col items-center lg:items-start z-10"
          >
            {/* Tag */}
            <motion.span
              className="inline-flex items-center gap-2.5 px-4.5 py-2 bg-bg-secondary border border-glass-border rounded-full text-xs font-mono tracking-wider text-text-secondary mb-8 select-none"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-accent-primary shadow-[0_0_8px_rgba(37,99,235,0.4)] animate-pulse" />
              Full Stack Web Engineer
            </motion.span>

            {/* Greetings */}
            <span className="font-mono text-xs sm:text-sm uppercase tracking-[0.2em] text-text-secondary/60 mb-3">
              Hello, I'm
            </span>

            {/* Headline */}
            <h1 className="font-heading text-6xl sm:text-7xl md:text-8xl font-black uppercase leading-none tracking-tighter text-text-primary mb-3">
              Usama <span className="text-outline">Akbar</span>
            </h1>

            {/* Dynamic Typewriter Heading */}
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-wide mb-6 text-text-secondary min-h-[40px] sm:min-h-[50px]">
              Building <span className="text-accent-primary">{typedText}</span>
              <span className="inline-block w-0.5 h-6 sm:h-8 bg-accent-primary ml-2 animate-pulse align-middle" />
            </h2>

            {/* Paragraph Bio */}
            <div className="relative mb-8 max-w-xl mx-auto lg:mx-0 w-full">
              <div className="relative backdrop-blur-md bg-bg-secondary border border-glass-border rounded-3xl p-6 h-full flex items-center">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={loopNum % heroContent.length}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="font-body font-light text-text-secondary text-base sm:text-lg leading-relaxed m-0"
                  >
                    {highlightText(heroContent[loopNum % heroContent.length].text, 'frontend')}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start w-full sm:w-auto font-mono text-xs z-20">
              <Mg>
                <motion.a
                  href="#projects"
                  onClick={(e) => handleScroll(e, '#projects')}
                  className="group px-8 py-4 bg-text-primary rounded-2xl font-heading font-semibold uppercase tracking-widest text-bg-primary shadow-sm hover:bg-accent-primary hover:text-white transition-all duration-300 flex items-center justify-center gap-3 relative overflow-hidden"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>View Projects</span>
                  <FaArrowRight className="transform transition-transform group-hover:translate-x-1" size={12} />
                </motion.a>
              </Mg>
              <Mg>
                <motion.a
                  href="/assets/resume.pdf"
                  download="Usama_Akbar_Resume.pdf"
                  className="group px-8 py-4 bg-bg-primary hover:bg-bg-secondary rounded-2xl font-heading font-semibold uppercase tracking-widest text-text-primary border border-glass-border transition-all duration-300 flex items-center justify-center gap-2 shadow-sm"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Download CV</span>
                  <FaDownload className="text-accent-secondary" size={11} />
                </motion.a>
              </Mg>
              <Mg>
                <motion.a
                  href="#contact"
                  onClick={(e) => handleScroll(e, '#contact')}
                  className="group px-8 py-4 bg-bg-secondary hover:bg-bg-tertiary rounded-2xl font-heading font-semibold uppercase tracking-widest text-text-secondary border border-glass-border transition-all duration-300 flex items-center justify-center shadow-sm"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Contact Me
                </motion.a>
              </Mg>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Interactive Code Mockup Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 flex justify-center lg:justify-end w-full relative mt-16 lg:mt-0 z-10"
          >
            {/* Soft Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] pointer-events-none z-0 flex items-center justify-center">
              <div className="absolute w-72 h-72 bg-accent-primary rounded-full mix-blend-multiply filter blur-3xl opacity-[0.08]" />
              <div className="absolute w-56 h-56 bg-accent-secondary rounded-full mix-blend-multiply filter blur-3xl opacity-[0.08] translate-x-8 translate-y-8" />
            </div>

            <div className="relative z-10">
              {/* Floating Experience Widget */}
              <div className="absolute -top-6 -left-6 sm:-left-12 bg-bg-primary/95 border border-glass-border rounded-2xl p-4 shadow-premium flex items-center gap-4 z-30 select-none">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-accent-primary text-lg">
                  <FaCode />
                </div>
                <div>
                  <div className="text-text-primary font-heading font-bold text-sm leading-tight">1+ YEARS</div>
                  <div className="text-text-secondary text-[9px] font-mono tracking-wider uppercase mt-0.5">Experience</div>
                </div>
              </div>

              {/* Floating Projects Widget */}
              <div className="absolute -bottom-8 -right-4 sm:-right-8 bg-bg-primary/95 border border-glass-border rounded-2xl p-4 shadow-premium flex items-center gap-4 z-30 select-none">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-accent-secondary text-lg">
                  <FaRocket />
                </div>
                <div>
                  <div className="text-text-primary font-heading font-bold text-sm leading-tight">20+ PROJECTS</div>
                  <div className="text-text-secondary text-[9px] font-mono tracking-wider uppercase mt-0.5">Delivered</div>
                </div>
              </div>

              {/* Profile Card Wrapper */}
              <div className="relative z-20">
                <Tilt className="relative w-72 h-[22rem] sm:w-80 sm:h-[26rem] md:w-[350px] md:h-[420px] rounded-[2rem] p-[1px] bg-glass-border hover:bg-glass-border-dark shadow-premium overflow-hidden cursor-pointer">
                  <div className="w-full h-full rounded-[1.95rem] overflow-hidden bg-bg-primary relative flex items-center justify-center">

                    {/* Profile Photo */}
                    <div className="absolute inset-0 z-10">
                      <img
                        id="profile-photo"
                        src="/images/profile.png.jpg"
                        alt="Usama Akbar - Full Stack Developer"
                        className="w-full h-full object-cover object-center filter contrast-105 brightness-95"
                        onError={(e) => {
                          e.target.src = '/images/profile.png.jpg';
                        }}
                      />
                      {/* Color overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/80 via-transparent to-transparent group-hover:opacity-40 transition-opacity duration-300" />
                    </div>

                    {/* Glass overlay at the bottom with name */}
                    <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-bg-primary via-bg-primary/80 to-transparent z-20 flex items-end justify-center p-6 pointer-events-none">
                      <div className="text-center">
                        <p className="text-text-primary font-heading font-black text-2xl tracking-widest uppercase">USAMA</p>
                        <p className="text-accent-primary font-mono text-xs tracking-wider uppercase mt-1">Full Stack Developer</p>
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
          className="relative block w-full h-[40px] sm:h-[60px] md:h-[80px] fill-bg-primary transition-colors duration-300"
        >
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C26.9,8.75,57.05,18.3,87.74,27.06,171.7,51,250.77,69.51,321.39,56.44Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
