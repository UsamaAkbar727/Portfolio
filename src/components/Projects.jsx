import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaExternalLinkAlt, FaCode, FaRocket, FaTimes, FaArrowRight } from 'react-icons/fa';

const ProjectCard = ({ project, index, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        type: 'spring',
        stiffness: 100
      }}
      whileHover={{
        scale: 1.03,
        y: -8,
        transition: { duration: 0.3 }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group cursor-pointer"
    >
      <div
        className="glass-premium rounded-2xl p-6 h-full flex flex-col transition-all duration-500 hover:bg-white/10 hover:border-accent-primary/40 relative overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-accent-primary/20"
        onClick={onClick}
      >
        {/* Animated gradient border on hover */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          style={{
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(139, 92, 246, 0.15))',
            padding: '2px'
          }}
        >
          <div className="w-full h-full rounded-2xl" style={{
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.4), rgba(236, 72, 153, 0.4))',
          }} />
        </motion.div>

        {/* Click hint */}
        <motion.div
          className="absolute top-4 right-4 text-text-secondary/50 text-xs font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ delay: 0.2 }}
        >
          Click for details
        </motion.div>

        {/* Project Header */}
        <div className="flex items-start justify-between mb-4 relative z-10">
          <motion.div
            className="w-12 h-12 rounded-xl bg-gradient-to-r from-accent-primary to-accent-secondary flex items-center justify-center shadow-lg shadow-accent-primary/40"
            animate={isHovered ? {
              scale: [1, 1.15, 1],
              rotate: [0, 10, -10, 0]
            } : {}}
            transition={{ duration: 0.6, repeat: isHovered ? Infinity : 0 }}
          >
            <span className="font-heading font-bold text-white text-lg">
              {project.name.charAt(0)}
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 10 }}
            transition={{ duration: 0.3 }}
          >
            <FaRocket className="text-accent-primary" />
          </motion.div>
        </div>

        {/* Project Content */}
        <div className="relative z-10 flex-grow">
          <motion.h3
            className="font-heading text-xl font-bold mb-3 text-white"
            animate={isHovered ? { color: '#6366f1' } : {}}
            transition={{ duration: 0.3 }}
          >
            {project.name}
          </motion.h3>
          <p className="font-body text-text-secondary mb-4">
            {project.description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.technologies.map((tech, techIndex) => (
              <motion.span
                key={techIndex}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: techIndex * 0.1 }}
                className="px-3 py-1 text-xs font-medium rounded-full bg-white/10 text-text-secondary border border-white/10 hover:border-accent-primary/50 hover:text-accent-primary transition-all duration-300"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Live Demo Button */}
        <motion.div
          className="mt-auto"
          initial={{ opacity: 1 }}
          animate={{ opacity: isHovered ? 1 : 1 }}
        >
          <div className="inline-flex items-center gap-2 text-accent-primary font-semibold group-hover:text-white transition-colors duration-300">
            <span>View Details</span>
            <FaArrowRight size={16} className="group-hover:translate-x-2 transition-transform duration-300" />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      id: 1,
      name: 'POS System',
      description: 'Inventory and billing management system with real-time stock tracking.',
      technologies: ['Tailwind CSS', 'JavaScript', 'PHP', 'MySQL'],
      liveLink: '#'
    },
    {
      id: 2,
      name: 'Shopping Store',
      description: 'Secure backend API for web applications with authentication.',
      technologies: ['Boostrap', 'J,S', 'Laravel', 'MySQL'],
      liveLink: '#'
    },
    {
      id: 3,
      name: 'CarePulse',
      description: 'Modern admin dashboard with dynamic data visualization.',
      technologies: ['PHP', 'React JS', 'Tailwind CSS'],
      liveLink: '#'
    }
  ];

  return (
    <section id="projects" className="py-20 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-0 w-64 h-64 bg-accent-primary/10 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-0 w-64 h-64 bg-accent-tertiary/10 rounded-full blur-3xl"
          animate={{
            x: [0, -50, 0],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 6, repeat: Infinity, delay: 3 }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
            Portfolio
          </motion.span>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            My <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Some of the projects I've worked on
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, y: 50, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="glass-premium rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl shadow-accent-primary/30 relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <motion.button
                className="absolute top-4 right-4 w-10 h-10 glass rounded-xl flex items-center justify-center text-text-secondary hover:text-white hover:bg-white/10 transition-all duration-300"
                onClick={() => setSelectedProject(null)}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaTimes size={18} />
              </motion.button>

              {/* Project header */}
              <div className="flex items-start gap-4 mb-6">
                <motion.div
                  className="w-16 h-16 rounded-2xl bg-gradient-to-r from-accent-primary to-accent-secondary flex items-center justify-center shadow-lg shadow-accent-primary/40"
                  initial={{ scale: 0.8, rotate: -10 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                >
                  <span className="font-heading font-bold text-white text-2xl">
                    {selectedProject.name.charAt(0)}
                  </span>
                </motion.div>
                <div>
                  <h3 className="font-heading text-3xl font-bold text-white mb-2">
                    {selectedProject.name}
                  </h3>
                  <p className="text-text-secondary">
                    {selectedProject.description}
                  </p>
                </div>
              </div>

              {/* Technologies */}
              <div className="mb-8">
                <h4 className="font-heading font-semibold text-white mb-4">Technologies Used</h4>
                <div className="flex flex-wrap gap-3">
                  {selectedProject.technologies.map((tech, index) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="px-4 py-2 glass rounded-xl text-sm font-medium text-accent-primary border border-accent-primary/30"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Live demo button */}
              <motion.a
                href={selectedProject.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-xl font-heading font-semibold text-white shadow-lg hover:shadow-xl hover:shadow-accent-primary/30 transition-all duration-300 w-full sm:w-auto"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaExternalLinkAlt size={18} />
                View Live Project
                <FaArrowRight size={18} />
              </motion.a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
