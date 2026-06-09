import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaGithub,
  FaWhatsapp,
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


const Navbar = ({ theme, onToggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = navLinks.map(link => link.href.slice(1));
      const scrollPosition = window.scrollY + 150;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offset = 80; // navbar height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100, x: '-50%' }}
      animate={{ y: 0, x: '-50%' }}
      transition={{ duration: 0.8, type: 'spring', bounce: 0.25 }}
      className={`fixed left-1/2 z-50 transition-all duration-700 rounded-full border ${isScrolled
        ? 'top-4 w-[90%] md:w-[70%] max-w-4xl bg-white/5 dark:bg-black/20 border-white/20 shadow-[0_8px_32px_0_rgba(99,102,241,0.2)] backdrop-blur-3xl py-2'
        : 'top-6 w-[95%] max-w-5xl bg-white/5 dark:bg-black/10 border-white/10 shadow-lg py-3 backdrop-blur-xl'
        }`}
    >
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <motion.a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="font-heading text-xl sm:text-2xl font-extrabold highlight-shine bg-clip-text text-transparent bg-gradient-to-r from-accent-primary via-white to-accent-secondary relative group drop-shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Usama JutT
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-accent-primary to-accent-secondary group-hover:w-full transition-all duration-500 shadow-[0_0_15px_rgba(99,102,241,0.8)] rounded-full" />
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeSection === link.href.slice(1);


              return (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative px-4 py-2 rounded-full font-body text-sm tracking-wide transition-all duration-300 group ${isActive
                    ? 'font-bold text-white'
                    : 'font-medium text-text-secondary hover:text-white'
                    }`}
                  whileHover={{ y: -2, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className={`flex items-center relative z-10 transition-all duration-300 ${isActive ? 'drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]' : ''}`}>
                    {link.name}
                  </span>

                  {/* Active indicator with ultra-premium glass pill */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 bg-white/10 dark:bg-white/10 rounded-full border border-white/20 shadow-[inset_0_0_15px_rgba(255,255,255,0.1),0_0_20px_rgba(99,102,241,0.3)] backdrop-blur-md"
                      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    />
                  )}

                  {/* Hover gradient glow */}
                  {!isActive && (
                    <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 rounded-full transition-all duration-300 shadow-[inset_0_0_0_1px_rgba(255,255,255,0)] group-hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)]" />
                  )}
                </motion.a>
              );
            })}
          </div>

          {/* Theme toggle & Social - Desktop */}
          <div className="hidden md:flex items-center space-x-2">
            <motion.button
              type="button"
              onClick={onToggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              className="w-9 h-9 bg-white/5 border border-transparent rounded-full flex items-center justify-center text-text-secondary hover:text-white hover:bg-white/10 hover:border-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-all duration-300 group"
              whileHover={{ scale: 1.15, y: -2 }}
              whileTap={{ scale: 0.9 }}
            >
              {theme === 'dark' ? <FaSun size={18} /> : <FaMoon size={18} />}
            </motion.button>

            {/* Social Icons - Desktop */}

            <motion.a
              href="https://github.com/UsamaAkbar727"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 bg-white/5 border border-transparent rounded-full flex items-center justify-center text-text-secondary hover:text-white hover:bg-white/10 hover:border-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-all duration-300 group"
              whileHover={{ scale: 1.15, y: -2 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaGithub size={18} className="group-hover:rotate-12 transition-transform duration-300" />
            </motion.a>
            <motion.a
              href="https://wa.me/923098643058"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 bg-white/5 border border-transparent rounded-full flex items-center justify-center text-text-secondary hover:text-white hover:bg-white/10 hover:border-green-400/50 hover:shadow-[0_0_20px_rgba(74,222,128,0.2)] transition-all duration-300 group"
              whileHover={{ scale: 1.15, y: -2 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaWhatsapp size={18} className="group-hover:text-green-500 transition-colors duration-300" />
            </motion.a>
          </div>

          {/* Mobile Theme Toggle */}
          <motion.button
            className="md:hidden w-9 h-9 glass rounded-full flex items-center justify-center text-text-secondary hover:text-white transition-all duration-300 hover:border-white/40 mr-2"
            onClick={onToggleTheme}
            whileTap={{ scale: 0.9 }}
            type="button"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <FaSun size={16} /> : <FaMoon size={16} />}
          </motion.button>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden w-9 h-9 glass rounded-full flex items-center justify-center text-text-secondary hover:text-white transition-all duration-300 hover:border-white/40"
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
              <div className="glass-premium rounded-2xl p-4 space-y-2 shadow-2xl">
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
                      transition={{ delay: navLinks.indexOf(link) * 0.1 }}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${isActive
                        ? 'bg-gradient-to-r from-accent-primary/30 to-accent-secondary/30 text-white border border-accent-primary/30'
                        : 'text-text-secondary hover:text-white hover:bg-white/5'
                        }`}
                    >
                      <Icon size={16} className="group-hover:scale-110 transition-transform duration-300" />
                      <span className="font-body text-base uppercase tracking-wider font-medium">
                        {link.name}
                      </span>
                    </motion.a>
                  );
                })}

                <motion.div
                  className="flex gap-3 pt-4 mt-4 border-t border-gray-200 dark:border-white/10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <a
                    href="https://github.com/UsamaAkbar727"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 glass rounded-lg flex items-center justify-center text-text-secondary hover:text-white hover:border-accent-primary/50 transition-all duration-300 hover:scale-110"
                  >
                    <FaGithub size={18} />
                  </a>
                  <a
                    href="https://wa.me/923098643058"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 glass rounded-lg flex items-center justify-center text-text-secondary hover:text-white hover:border-accent-primary/50 transition-all duration-300 hover:scale-110"
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
