import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for cursor followers to feel extremely premium
  const cursorSpringConfig = { damping: 40, stiffness: 400, mass: 0.4 };
  const ringSpringConfig = { damping: 30, stiffness: 220, mass: 0.6 };

  const ringX = useSpring(mouseX, ringSpringConfig);
  const ringY = useSpring(mouseY, ringSpringConfig);
  const dotX = useSpring(mouseX, cursorSpringConfig);
  const dotY = useSpring(mouseY, cursorSpringConfig);

  useEffect(() => {
    const updateMousePosition = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e) => {
      if (
        e.target.tagName.toLowerCase() === 'a' ||
        e.target.tagName.toLowerCase() === 'button' ||
        e.target.closest('a') ||
        e.target.closest('button') ||
        e.target.closest('.cursor-pointer')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', updateMousePosition, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter, { passive: true });

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  // Disable on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      {/* Outer Ring */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          width: isHovering ? 48 : 32,
          height: isHovering ? 48 : 32,
          backgroundColor: isHovering ? 'rgba(236, 72, 153, 0.1)' : 'transparent',
          borderColor: isHovering ? 'rgba(236, 72, 153, 0.8)' : 'rgba(182, 0, 168, 0.6)',
          opacity: isVisible ? 1 : 0,
        }}
        className="fixed top-0 left-0 rounded-full border shadow-[0_0_15px_rgba(182,0,168,0.4)] pointer-events-none z-[9999] hidden md:block transition-[width,height,background-color,border-color] duration-200"
      />
      
      {/* Inner Dot */}
      <motion.div
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          scale: isHovering ? 0 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        className="fixed top-0 left-0 w-2 h-2 bg-[#ec4899] shadow-[0_0_10px_#ec4899] rounded-full pointer-events-none z-[10000] hidden md:block transition-transform duration-200"
      />
    </>
  );
};

export default CustomCursor;
