import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaGithub,
  FaWhatsapp,
  FaLinkedin,
  FaBars,
  FaTimes,
  FaHome,
  FaUser,
  FaCode,
  FaProjectDiagram,
  FaEnvelope,
  FaSun,
  FaMoon,
  FaServer,
  FaBriefcase,
} from 'react-icons/fa';

const navLinks = [
  { name: 'Home', href: '#home', icon: FaHome },
  { name: 'About', href: '#about', icon: FaUser },
  { name: 'Services', href: '#services', icon: FaServer },
  { name: 'Skills', href: '#skills', icon: FaCode },
  { name: 'Journey', href: '#journey', icon: FaBriefcase },
  { name: 'Projects', href: '#projects', icon: FaProjectDiagram },
  { name: 'Contact', href: '#contact', icon: FaEnvelope },
];


const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Lightweight scroll listener for header styling only
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Performance-optimized Intersection Observer for active sections
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px', // detects when section occupies the center viewport area
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    navLinks.forEach(link => {
      const element = document.getElementById(link.href.slice(1));
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offset = 80; // navbar height
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
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100, x: '-50%' }}
      animate={{ y: 0, x: '-50%' }}
      transition={{ duration: 0.8, type: 'spring', bounce: 0.25 }}
      className={`fixed left-1/2 z-50 transition-all duration-500 rounded-full border ${isScrolled
        ? 'top-4 w-[90%] md:w-[70%] max-w-4xl bg-white/80 border-slate-200/60 shadow-[0_8px_30px_rgba(0,0,0,0.03)] backdrop-blur-3xl py-2'
        : 'top-6 w-[95%] max-w-5xl bg-white/40 border-slate-200/40 shadow-sm py-3 backdrop-blur-xl'
        }`}
    >
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <motion.a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="font-heading text-xl sm:text-2xl font-extrabold text-slate-900 tracking-wider relative group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            USAMA<span className="text-accent-primary font-black font-mono">.</span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-primary group-hover:w-full transition-all duration-500 rounded-full" />
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.slice(1);

              return (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative px-4 py-2 rounded-full font-body text-sm tracking-wide transition-all duration-300 group ${isActive
                    ? 'font-bold text-slate-900'
                    : 'font-medium text-slate-500 hover:text-slate-900'
                    }`}
                  whileHover={{ y: -1, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10">
                    {link.name}
                  </span>

                  {/* Active indicator with ultra-premium glass pill */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 bg-slate-100/80 rounded-full border border-slate-200/50 shadow-[0_2px_10px_rgba(0,0,0,0.02)] backdrop-blur-md"
                      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    />
                  )}

                  {/* Hover gradient glow */}
                  {!isActive && (
                    <div className="absolute inset-0 bg-slate-50/0 group-hover:bg-slate-50 rounded-full transition-all duration-300 shadow-[inset_0_0_0_1px_rgba(0,0,0,0)] group-hover:shadow-[inset_0_0_0_1px_rgba(0,0,0,0.04)]" />
                  )}
                </motion.a>
              );
            })}
          </div>

          {/* Social Icons - Desktop */}
          <div className="hidden md:flex items-center space-x-2">
            <motion.a
              href="https://github.com/UsamaAkbar727"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 bg-slate-50 border border-slate-200/40 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-100 hover:shadow-sm transition-all duration-300 group"
              whileHover={{ scale: 1.1, y: -1 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaGithub size={16} className="group-hover:rotate-6 transition-transform duration-300" />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/usama-akbar-a070323a5"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 bg-slate-50 border border-slate-200/40 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-100 hover:shadow-sm transition-all duration-300 group"
              whileHover={{ scale: 1.1, y: -1 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaLinkedin size={16} className="group-hover:text-blue-600 transition-colors duration-300" />
            </motion.a>
            <motion.a
              href="https://wa.me/923098643058"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 bg-slate-50 border border-slate-200/40 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-100 hover:shadow-sm transition-all duration-300 group"
              whileHover={{ scale: 1.1, y: -1 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaWhatsapp size={16} className="group-hover:text-green-600 transition-colors duration-300" />
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden w-9 h-9 bg-slate-50 border border-slate-200/60 rounded-full flex items-center justify-center text-slate-600 hover:text-slate-900 transition-all duration-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
            type="button"
          >
            {isMobileMenuOpen ? <FaTimes size={16} /> : <FaBars size={16} />}
          </motion.button>

        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="md:hidden mt-4 overflow-hidden"
            >
              <div className="bg-white border border-slate-200/80 rounded-3xl p-4 space-y-2 shadow-xl">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = activeSection === link.href.slice(1);

                  return (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: navLinks.indexOf(link) * 0.05 }}
                      className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 group ${isActive
                        ? 'bg-slate-100 text-slate-900 border border-slate-200/50'
                        : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                        }`}
                    >
                      <Icon size={16} className="group-hover:scale-105 transition-transform duration-300" />
                      <span className="font-body text-base uppercase tracking-wider font-semibold">
                        {link.name}
                      </span>
                    </motion.a>
                  );
                })}

                <motion.div
                  className="flex gap-3 pt-4 mt-4 border-t border-slate-100"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <a
                    href="https://github.com/UsamaAkbar727"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 border border-slate-200/60 rounded-xl flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-all duration-300"
                  >
                    <FaGithub size={18} />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/usama-akbar-a070323a5"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 border border-slate-200/60 rounded-xl flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-all duration-300"
                  >
                    <FaLinkedin size={18} />
                  </a>
                  <a
                    href="https://wa.me/923098643058"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 border border-slate-200/60 rounded-xl flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-all duration-300"
                  >
                    <FaWhatsapp size={18} />
                  </a>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
