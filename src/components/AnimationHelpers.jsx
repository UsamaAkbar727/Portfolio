import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useInView } from 'framer-motion';

// Fade In Component
export function FI({ children, delay = 0, duration = 0.7, x = 0, y = 30, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Magnetic Component - Optimized to use smooth CSS scale instead of high-frequency mousemove listeners
export function Mg({ children, className = '' }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -2 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// 3D Tilt Card Component - Replaced JS layout calculation with lightweight GPU-accelerated Framer Motion scales
export function Tilt({ children, className = '' }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Scroll Triggered Character Reveal Component
export function AT({ text, className = '' }) {
  const ref = useRef(null);
  const spansRef = useRef([]);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (value) => {
      const len = spansRef.current.length;
      if (!len) return;
      const range = 0.06;
      spansRef.current.forEach((span, i) => {
        if (!span) return;
        const threshold = i / len;
        const percent = (value - (threshold - range)) / range;
        span.style.opacity = Math.max(0.2, Math.min(1, 0.2 + 0.8 * percent));
      });
    });
    return unsubscribe;
  }, [scrollYProgress]);

  const chars = text.split('');

  return (
    <p ref={ref} className={className}>
      {chars.map((c, i) =>
        React.createElement(
          'span',
          {
            key: i,
            ref: (el) => {
              if (el) spansRef.current[i] = el;
            },
            style: { opacity: 0.2, transition: 'opacity 0.1s ease' },
          },
          c === ' ' ? ' ' : c
        )
      )}
    </p>
  );
}

// Scroll Triggered Animated Counter
export function AC({ value, suffix = '', duration = 2 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });

  useEffect(() => {
    if (!isInView) return;
    let startVal = 0;
    const stepsPerSecond = 60;
    const stepIncrement = value / (duration * stepsPerSecond);
    
    const interval = setInterval(() => {
      startVal += stepIncrement;
      if (startVal >= value) {
        setCount(value);
        clearInterval(interval);
      } else {
        setCount(Math.floor(startVal));
      }
    }, 1000 / stepsPerSecond);

    return () => clearInterval(interval);
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className="sn">
      {count}
      {suffix}
    </span>
  );
}

// Localized Asset paths
export const AD = {
  moon: '/images/moon_icon.png',
  p59: '/images/p59_1.png',
  lego: '/images/lego_icon.png',
  grp: '/images/group_134.png',
};

// Keyword highlight system - Toned down to avoid shifting layout or laggy glow animations
export const highlightText = (text, theme = 'system') => {
  if (!text) return text;
  const keywords = [
    'React', 'Laravel', 'PHP', 'MySQL', 'Node.js', 'Express.js', 'MongoDB', 
    'Full Stack Developer', 'Full Stack Engineer', 'Full Stack Solutions', 
    'Frontend Development', 'Backend Development', 'frontend and backend',
    'HTML', 'CSS', 'Bootstrap', 'Tailwind CSS', 'JavaScript',
    'cloud infrastructure', 'DevOps', 'scalable web applications', 'GraphQL APIs', 'RESTful', 'user interfaces', 'digital experiences', 'elegant solutions'
  ];
  const pattern = new RegExp(`\\b(${keywords.join('|')})\\b`, 'gi');
  const parts = text.split(pattern);
  
  let colorClass = 'text-accent-tertiary'; // Standard static color
  if (theme === 'frontend') {
    colorClass = 'text-accent-primary';
  } else if (theme === 'backend') {
    colorClass = 'text-accent-secondary';
  } else if (theme === 'fullstack') {
    colorClass = 'text-accent-tertiary';
  }
  
  return parts.map((part, i) => {
    const isKeyword = keywords.some(kw => kw.toLowerCase() === part.toLowerCase());
    if (isKeyword) {
      return (
        <span 
          key={i} 
          className={`font-semibold ${colorClass}`}
        >
          {part}
        </span>
      );
    }
    return part;
  });
};
