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

// Magnetic Component
export function Mg({ children, padding = 150, strength = 3 }) {
  const ref = useRef(null);
  const active = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;

      const isNear =
        e.clientX >= rect.left - padding &&
        e.clientX <= rect.right + padding &&
        e.clientY >= rect.top - padding &&
        e.clientY <= rect.bottom + padding;

      if (isNear) {
        el.style.transition = 'transform 0.3s ease-out';
        el.style.transform = `translate3d(${dx / strength}px, ${dy / strength}px, 0)`;
        active.current = true;
      } else if (active.current) {
        el.style.transition = 'transform 0.6s ease-in-out';
        el.style.transform = 'translate3d(0,0,0)';
        active.current = false;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [padding, strength]);

  return (
    <div ref={ref} style={{ willChange: 'transform' }}>
      {children}
    </div>
  );
}

// 3D Tilt Card Component
export function Tilt({ children, className = '' }) {
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    if (ref.current) {
      ref.current.style.transform = 'perspective(800px) rotateY(0) rotateX(0) scale3d(1, 1, 1)';
    }
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`tc ${className}`}
      style={{ transition: 'transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)', willChange: 'transform' }}
    >
      {children}
    </div>
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
  const isInView = useInView(ref, { once: true, margin: '-100px' });

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

// Figma Asset links
export const AD = {
  moon: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png',
  p59: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png',
  lego: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png',
  grp: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png',
};

// Keyword highlight system
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
  
  let gradientClass = 'from-[#B600A8] via-[#ec4899] to-[#7621B0]';
  if (theme === 'frontend') {
    gradientClass = 'from-cyan-400 via-sky-400 to-[#B600A8]';
  } else if (theme === 'backend') {
    gradientClass = 'from-[#7621B0] via-purple-500 to-emerald-400';
  } else if (theme === 'fullstack') {
    gradientClass = 'from-[#ec4899] via-rose-400 to-amber-400';
  }
  
  return parts.map((part, i) => {
    const isKeyword = keywords.some(kw => kw.toLowerCase() === part.toLowerCase());
    if (isKeyword) {
      return (
        <span 
          key={i} 
          className={`inline-block font-bold bg-gradient-to-r ${gradientClass} bg-clip-text text-transparent highlight-shine hover:scale-110 hover:brightness-125 transition-transform duration-300 cursor-help`}
        >
          {part}
        </span>
      );
    }
    return part;
  });
};
