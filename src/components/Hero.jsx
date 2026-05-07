import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const Hero = () => {
  const [typedText, setTypedText] = useState('');
  const fullText = 'Full Stack Developer';

  // Typewriter effect
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
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

  // ============================================
  // PROFILE PHOTO - EASY UPDATE INSTRUCTIONS
  // ============================================
  // 1. Place your photo in: public/images/profile.jpg (or .png, .webp)
  // 2. Supported formats: JPG, PNG, WEBP
  // 3. Recommended size: 400x400 pixels or larger (square works best)
  // 4. Simply replace the file at: public/images/profile.jpg
  //
  // Current image path is defined below in profileImagePath
  // ============================================

  const profileImagePath = '/images/profile.png.jpg';
  const fallbackImage = '/images/profile.png.jpg';

  // ============================================
  // PROFILE IMAGE SIZE & LAYOUT — ADJUST HERE
  // ============================================
  // Change the values below to resize / reposition the profile photo.
  // No need to touch anything else in the JSX.
  //
  //  width / height  → size of the photo frame (px, %, rem, etc.)
  //  borderRadius    → "50%" = circle | "1rem" = rounded square | "0" = square
  //  objectFit       → "cover" (crop to fill) | "contain" (fit inside, no crop)
  //  objectPosition  → focus point: "center", "top", "50% 20%", etc.
  //  border          → thickness + style + color  e.g. "3px solid #6366f1"
  //  boxShadow       → outer glow / shadow
  // ============================================
  const profileImgStyle = {
    width: '100%',          // ← fill the parent frame (change to e.g. '300px' to fix size)
    height: '100%',         // ← fill the parent frame
    objectFit: 'cover',     // ← "cover" | "contain" | "fill"
    objectPosition: 'center top', // ← crop focus: "center" | "top" | "50% 20%"
    borderRadius: '1rem',   // ← "50%" = circle | "1rem" = rounded | "0" = square
    border: 'none',         // ← e.g. "3px solid #6366f1"
    boxShadow: 'none',      // ← e.g. "0 0 30px rgba(99,102,241,0.5)"
  };
  // ============================================

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden animated-bg pt-20"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Enhanced floating particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-accent-primary/30 particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
            animate={{
              y: [0, -100 + Math.random() * 50, 0],
              x: [0, Math.random() * 30 - 15, 0],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Gradient orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent-primary/20 rounded-full blur-[100px]"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent-secondary/20 rounded-full blur-[100px]"
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, delay: 4 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-accent-tertiary/15 rounded-full blur-[80px]"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 12, repeat: Infinity }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left"
          >
            <motion.span
              variants={itemVariants}
              className="inline-block px-6 py-3 glass-premium rounded-lg text-sm text-accent-primary mb-6 font-semibold tracking-wide border border-accent-primary/20"
            >
              {typedText}
              <span className="inline-block w-0.5 h-4 bg-accent-primary ml-1 animate-pulse" />
            </motion.span>

            <motion.h1
              variants={itemVariants}
              className="font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6"
            >
              Hi, I'm{' '}
              <motion.span
                className="gradient-text inline-block"
                initial={{ backgroundPosition: '0% 50%' }}
                animate={{ backgroundPosition: '100% 50%' }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                style={{ backgroundSize: '200% 200%' }}
              >
                Usama Akbar
              </motion.span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="font-body text-lg sm:text-xl text-text-secondary mb-8 max-w-xl mx-auto lg:mx-0"
            >
              I design and develop scalable web applications, delivering elegant solutions to complex challenges. Driven by a passion for modern technologies, I create digital experiences that inspire and make a real impact.

            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.a
                href="#projects"
                onClick={(e) => handleScroll(e, '#projects')}
className="group px-8 py-4 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-xl font-heading font-semibold text-white shadow-lg hover:shadow-xl hover:shadow-accent-primary/30 transition-all duration-300 relative overflow-hidden"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">View Projects</span>
                <div className="absolute inset-0 bg-gradient-to-r from-accent-secondary to-accent-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.a>
              <motion.a
                href="#contact"
                onClick={(e) => handleScroll(e, '#contact')}
className="group px-8 py-4 glass-premium rounded-xl font-heading font-semibold text-text-primary border border-accent-primary/20 hover:border-accent-primary/50 transition-all duration-300 backdrop-blur-xl"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Me
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Outer glow rings */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-accent-primary/20"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.1, 0.3]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-accent-secondary/20"
                animate={{
                  scale: [1.2, 1, 1.2],
                  opacity: [0.1, 0.3, 0.1]
                }}
                transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
              />

              {/* Animated gradient ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute -inset-4 rounded-full bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-tertiary opacity-30 blur-2xl"
              />

              {/* Floating particles around photo */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-accent-primary"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -30 + Math.random() * 20, 0],
                    x: [0, Math.random() * 20 - 10, 0],
                    opacity: [0.3, 0.8, 0.3],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}

              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="relative z-10"
              >
                <div className="w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-2xl p-1 bg-gradient-to-br from-accent-primary via-accent-secondary to-accent-tertiary shadow-2xl shadow-accent-primary/30">
                  <div className="w-full h-full rounded-2xl overflow-hidden glass-premium">
                    <img
                      id="profile-photo"
                      src={profileImagePath}
                      alt="Usama Akbar - Full Stack Developer"
                      style={profileImgStyle}
                      onError={(e) => {
                        e.target.src = fallbackImage;
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
