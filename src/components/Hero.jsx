import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FaArrowRight, FaCode, FaRocket, FaTerminal, FaDownload, FaLaptopCode } from 'react-icons/fa';
import { FI, Tilt, highlightText, Mg } from './AnimationHelpers';

const Hero = () => {
  const [typedText, setTypedText] = useState('');
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [delta, setDelta] = useState(150);
  const [activeTab, setActiveTab] = useState('Developer.json');

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

  const codeSnippets = {
    'Developer.json': `{
  "name": "Usama Akbar",
  "role": "Full Stack Developer",
  "experience": "1+ Years",
  "delivered": "20+ Projects",
  "core_stack": {
    "frontend": ["React", "TailwindCSS"],
    "backend": ["PHP/Laravel", "Node.js"],
    "database": ["MySQL", "MongoDB"]
  },
  "location": "Pakistan",
  "open_to_work": true
}`,
    'App.jsx': `import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';

export default function Portfolio() {
  return (
    <div className="portfolio">
      <Navbar />
      <Hero />
      {/* Handcrafted Visuals */}
    </div>
  );
}`,
    'index.css': `:root {
  --accent-primary: #2563eb;
  --accent-secondary: #4f46e5;
  --bg-grid: linear-gradient(
    to bottom,
    rgba(15,23,42,0.015) 1px,
    transparent 1px
  );
  font-family: 'Space Grotesk';
}`
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
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 flex justify-center lg:justify-end w-full relative mt-16 lg:mt-0 z-10"
          >
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] pointer-events-none z-0 flex items-center justify-center">
              <div className="absolute w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-[0.03]" />
              <div className="absolute w-64 h-64 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-[0.03] translate-x-8" />
            </div>

            {/* Floating stats badges */}
            <div className="absolute -top-6 -left-4 sm:-left-8 bg-bg-primary/95 border border-glass-border rounded-2xl p-4 shadow-premium flex items-center gap-4 z-30 select-none">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-accent-primary text-lg">
                <FaCode />
              </div>
              <div>
                <div className="text-text-primary font-heading font-bold text-sm leading-tight">1+ YEARS</div>
                <div className="text-text-secondary text-[9px] font-mono tracking-wider uppercase mt-0.5">Experience</div>
              </div>
            </div>

            <div className="absolute -bottom-6 right-2 bg-bg-primary/95 border border-glass-border rounded-2xl p-4 shadow-premium flex items-center gap-4 z-30 select-none">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-accent-secondary text-lg">
                <FaRocket />
              </div>
              <div>
                <div className="text-text-primary font-heading font-bold text-sm leading-tight">20+ PROJECTS</div>
                <div className="text-text-secondary text-[9px] font-mono tracking-wider uppercase mt-0.5">Delivered</div>
              </div>
            </div>

            {/* Mock Editor Window */}
            <Tilt className="relative w-full max-w-[440px] rounded-3xl bg-bg-primary border border-glass-border shadow-premium overflow-hidden cursor-pointer select-none">
              {/* Window Header */}
              <div className="bg-bg-secondary border-b border-glass-border px-6 py-4 flex items-center justify-between">
                <div className="flex gap-2">
                  <span className="w-3.5 h-3.5 rounded-full bg-red-400/80" />
                  <span className="w-3.5 h-3.5 rounded-full bg-yellow-400/80" />
                  <span className="w-3.5 h-3.5 rounded-full bg-green-400/80" />
                </div>
                <div className="flex gap-1">
                  <FaTerminal className="text-text-secondary mr-2 mt-0.5" size={12} />
                  <span className="font-mono text-xs font-semibold text-text-secondary uppercase tracking-widest">
                    Vim - Developer Details
                  </span>
                </div>
                <div className="w-12" /> {/* spacing element */}
              </div>

              {/* Tab Bar */}
              <div className="flex bg-bg-secondary/50 border-b border-glass-border">
                {['Developer.json', 'App.jsx', 'index.css'].map((tab) => (
                  <button
                    key={tab}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveTab(tab);
                    }}
                    className={`px-5 py-2.5 font-mono text-xs border-r border-glass-border flex items-center gap-2 transition-all duration-300 ${
                      activeTab === tab
                        ? 'bg-bg-primary border-t-2 border-t-accent-primary text-text-primary font-bold'
                        : 'text-text-secondary hover:text-text-primary hover:bg-bg-secondary/50'
                    }`}
                  >
                    <FaLaptopCode size={11} className={activeTab === tab ? 'text-accent-primary' : 'text-text-secondary'} />
                    {tab}
                  </button>
                ))}
              </div>

              {/* Editor Workspace */}
              <div className="p-6 font-mono text-xs leading-relaxed text-text-primary min-h-[300px] flex items-stretch">
                {/* Line numbers column */}
                <div className="pr-4 border-r border-glass-border text-text-secondary/40 text-right select-none space-y-1.5 flex flex-col justify-start">
                  {codeSnippets[activeTab].split('\n').map((_, idx) => (
                    <span key={idx} className="block">{idx + 1}</span>
                  ))}
                </div>

                {/* Code viewport */}
                <div className="pl-6 flex-grow overflow-x-auto whitespace-pre space-y-1.5 text-left">
                  <AnimatePresence mode="wait">
                    <motion.code
                      key={activeTab}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.2 }}
                      className="block text-text-primary font-medium"
                    >
                      {codeSnippets[activeTab]}
                    </motion.code>
                  </AnimatePresence>
                </div>
              </div>
            </Tilt>
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
