import { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const About = () => {
  const [activeCard, setActiveCard] = useState(null);
  const [statsCount, setStatsCount] = useState([0, 0, 0]);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Animate stats counter
  useEffect(() => {
    if (isInView) {
      const targetNumbers = [3, 20, 10];
      const duration = 2000;
      const steps = 60;
      const interval = duration / steps;

      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        const easeProgress = 1 - Math.pow(1 - progress, 4); // Ease-out quart

        setStatsCount([
          Math.floor(targetNumbers[0] * easeProgress),
          Math.floor(targetNumbers[1] * easeProgress),
          Math.floor(targetNumbers[2] * easeProgress)
        ]);

        if (currentStep >= steps) {
          clearInterval(timer);
          setStatsCount(targetNumbers);
        }
      }, interval);

      return () => clearInterval(timer);
    }
  }, [isInView]);

  const stats = [
    { number: '1+', label: 'Years Experience', color: '#6366f1' },
    { number: '10+', label: 'Projects Completed', color: '#8b5cf6' },
    { number: '10+', label: 'Technologies', color: '#ec4899' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section id="about" className="py-20 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/3 left-0 w-96 h-96 bg-accent-primary/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 5, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/3 right-0 w-96 h-96 bg-accent-secondary/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 5, repeat: Infinity, delay: 2.5 }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-block px-4 py-2 glass rounded-full text-sm text-accent-primary mb-4"
          >
            About Me
          </motion.span>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Get to know the developer behind the code
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <motion.div variants={itemVariants} className="glass-premium p-8 mb-8">
              <motion.h3
                className="font-heading text-2xl font-bold mb-4 group"
                whileHover={{ color: '#6366f1' }}
                transition={{ duration: 0.3 }}
              >
                Full Stack Developer
              </motion.h3>
              <p className="font-body text-text-secondary leading-relaxed mb-6">
                Passionate Full Stack Developer crafting modern, scalable web applications.
                I blend frontend and backend expertise to deliver seamless digital experiences
                that solve real-world challenges.

              </p>
              <p className="font-body text-text-secondary leading-relaxed">
                My journey in web development began with a curiosity to create experiences that live on the internet. Today, I work with a wide range of technologies including HTML, CSS, Bootstrap, Tailwind CSS, JavaScript, PHP, Laravel, MySQL, React, Node.js, Express.js, and MongoDB to build modern, scalable applications and deliver seamless digital experiences.

              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-4"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="glass-premium rounded-xl p-6 text-center cursor-pointer group"
                  whileHover={{
                    scale: 1.08,
                    borderColor: stat.color,
                    boxShadow: `0 0 30px ${stat.color}40`,
                    y: -5
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="font-heading text-3xl sm:text-4xl font-bold mb-2"
                    style={{ background: `linear-gradient(135deg, ${stat.color}, ${stat.color}80)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                    animate={{
                      scale: [1, 1.05, 1],
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                  >
                    {statsCount[index]}{stat.number.includes('+') ? '+' : ''}
                  </motion.div>
                  <div className="text-text-secondary text-sm font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Experience Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <motion.div variants={cardVariants} className="space-y-6">
              {/* Experience Card 1 */}
              <motion.div
                className="glass-premium rounded-2xl p-6 cursor-pointer group"
                whileHover={{
                  scale: 1.03,
                  x: 15,
                  borderColor: '#6366f1',
                  boxShadow: '0 8px 40px rgba(99, 102, 241, 0.2)'
                }}
                transition={{ duration: 0.3 }}
                onHoverStart={() => setActiveCard(1)}
                onHoverEnd={() => setActiveCard(null)}
              >
                <div className="flex items-start gap-4">
                  <motion.div
                    className="w-12 h-12 rounded-xl bg-gradient-to-r from-accent-primary to-accent-secondary flex items-center justify-center flex-shrink-0 shadow-lg shadow-accent-primary/30"
                    animate={activeCard === 1 ? {
                      rotate: [0, 360],
                      scale: [1, 1.1, 1]
                    } : {}}
                    transition={{ duration: 0.6 }}
                  >
                    <span className="font-heading font-bold text-white">1</span>
                  </motion.div>
                  <div>
                    <h4 className="font-heading text-lg font-semibold mb-2">
                      Frontend Development
                    </h4>
                    <p className="text-text-secondary text-sm">
                      Building responsive and interactive user interfaces with React, Tailwind CSS, and modern JavaScript frameworks to deliver seamless digital experiences.

                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Experience Card 2 */}
              <motion.div
                className="glass-premium rounded-2xl p-6 cursor-pointer group"
                whileHover={{
                  scale: 1.03,
                  x: 15,
                  borderColor: '#8b5cf6',
                  boxShadow: '0 8px 40px rgba(139, 92, 246, 0.2)'
                }}
                transition={{ duration: 0.3 }}
                onHoverStart={() => setActiveCard(2)}
                onHoverEnd={() => setActiveCard(null)}
              >
                <div className="flex items-start gap-4">
                  <motion.div
                    className="w-12 h-12 rounded-xl bg-gradient-to-r from-accent-secondary to-accent-tertiary flex items-center justify-center flex-shrink-0 shadow-lg shadow-accent-secondary/30"
                    animate={activeCard === 2 ? {
                      rotate: [0, 360],
                      scale: [1, 1.1, 1]
                    } : {}}
                    transition={{ duration: 0.6 }}
                  >
                    <span className="font-heading font-bold text-white">2</span>
                  </motion.div>
                  <div>
                    <h4 className="font-heading text-lg font-semibold mb-2">
                      Backend Development
                    </h4>
                    <p className="text-text-secondary text-sm">
                      Creating robust APIs and server‑side applications with Laravel, PHP, and MySQL, while also working with Node.js, Express.js, and MongoDB to deliver secure, scalable, and high‑performance solutions.

                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Experience Card 3 */}
              <motion.div
                className="glass-premium rounded-2xl p-6 cursor-pointer group"
                whileHover={{
                  scale: 1.03,
                  x: 15,
                  borderColor: '#ec4899',
                  boxShadow: '0 8px 40px rgba(236, 72, 153, 0.2)'
                }}
                transition={{ duration: 0.3 }}
                onHoverStart={() => setActiveCard(3)}
                onHoverEnd={() => setActiveCard(null)}
              >
                <div className="flex items-start gap-4">
                  <motion.div
                    className="w-12 h-12 rounded-xl bg-gradient-to-r from-accent-tertiary to-accent-primary flex items-center justify-center flex-shrink-0 shadow-lg shadow-accent-tertiary/30"
                    animate={activeCard === 3 ? {
                      rotate: [0, 360],
                      scale: [1, 1.1, 1]
                    } : {}}
                    transition={{ duration: 0.6 }}
                  >
                    <span className="font-heading font-bold text-white">3</span>
                  </motion.div>
                  <div>
                    <h4 className="font-heading text-lg font-semibold mb-2">
                      Full Stack Solutions
                    </h4>
                    <p className="text-text-secondary text-sm">
                      End‑to‑end development of complete web applications — from concept to deployment — combining frontend technologies like HTML, CSS, Bootstrap, Tailwind CSS, JavaScript, and React with backend expertise in PHP, Laravel, Node.js, Express.js, MySQL, and MongoDB.

                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
