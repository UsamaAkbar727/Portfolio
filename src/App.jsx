import { useEffect, useMemo, useState } from 'react';
import { motion, useScroll } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Skills from './components/Skills';
import Journey from './components/Journey';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';

const THEME_STORAGE_KEY = 'portfolio-theme';

function App() {
  const [theme, setTheme] = useState('dark');
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';

    // Disable default cursor on desktop since we have a custom one
    if (typeof window !== 'undefined' && !window.matchMedia('(pointer: coarse)').matches) {
      document.body.style.cursor = 'none';
    }

    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
      document.body.style.cursor = 'auto';
    };
  }, []);

  useEffect(() => {
    // Load persisted theme
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') {
      setTheme(stored);
    } else {
      // Optional: respect system preference when no stored choice
      const prefersLight =
        window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
      setTheme(prefersLight ? 'light' : 'dark');
    }
  }, []);

  useEffect(() => {
    // Persist + apply to DOM
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    document.documentElement.dataset.theme = theme;
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const themeClass = useMemo(() => {
    return theme === 'light' ? 'theme-light' : 'theme-dark';
  }, [theme]);

  return (
    <div className={`min-h-screen bg-bg-primary ${themeClass}`}>
      <CustomCursor />
      
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#B600A8] via-[#ec4899] to-[#7621B0] origin-left z-[10000] shadow-[0_0_10px_#ec4899]"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Background */}
      <div className="fixed inset-0 animated-bg -z-10" />

      {/* Navbar */}
      <Navbar theme={theme} onToggleTheme={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))} />

      {/* Main Content */}
      <main>
        <Hero />
        <About />
        <Services />
        <Skills />
        <Journey />
        <Projects />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;

