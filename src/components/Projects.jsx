import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaExternalLinkAlt, FaCode, FaRocket, FaTimes, FaArrowRight } from 'react-icons/fa';

const ProjectCard = ({ project, index, onClick, isFeatured }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.6,
        delay: index * 0.12,
        type: 'spring',
        stiffness: 100
      }}
      whileHover={{
        y: -12,
        transition: { duration: 0.3 }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group cursor-pointer ${isFeatured ? 'md:col-span-2 md:row-span-2' : ''}`}
    >
      <div
        className="glass-premium rounded-3xl p-8 h-full flex flex-col transition-all duration-500 hover:bg-white/8 hover:border-accent-primary/30 relative overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-accent-primary/20 backdrop-blur-xl"
        onClick={onClick}
      >
        {/* Gradient overlay on hover */}
        <motion.div
          className="absolute inset-0 rounded-3xl pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1), rgba(236, 72, 153, 0.05))',
          }}
        />

        {/* Subtle glow effect */}
        <motion.div
          className="absolute -top-1/2 -right-1/2 w-96 h-96 rounded-full pointer-events-none"
          animate={isHovered ? {
            opacity: [0.1, 0.2, 0.1],
            scale: [1, 1.2, 1]
          } : {
            opacity: 0
          }}
          transition={{ duration: 3, repeat: isHovered ? Infinity : 0 }}
          style={{
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.3), transparent)',
            filter: 'blur(40px)'
          }}
        />

        {/* Click hint */}
        <motion.div
          className="absolute top-6 right-6 text-text-secondary/60 text-xs font-medium tracking-widest uppercase"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : -10 }}
          transition={{ delay: 0.1 }}
        >
          Click to explore
        </motion.div>

        {/* Project Icon */}
        <div className="flex items-start justify-between mb-6 relative z-10">
          <motion.div
            className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-primary via-accent-secondary to-accent-tertiary flex items-center justify-center shadow-lg shadow-accent-primary/50"
            animate={isHovered ? {
              scale: [1, 1.2, 1],
              rotate: [0, 15, -15, 0]
            } : {}}
            transition={{ duration: 0.8, repeat: isHovered ? Infinity : 0 }}
          >
            <FaRocket className="text-white text-xl" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="px-3 py-1 rounded-full bg-white/5 text-accent-primary text-xs font-semibold border border-accent-primary/30"
          >
            Featured
          </motion.div>
        </div>

        {/* Project Content */}
        <div className="relative z-10 flex-grow">
          <motion.h3
            className="font-heading text-2xl sm:text-3xl font-bold mb-3 text-white leading-tight"
            animate={isHovered ? { color: '#6366f1' } : {}}
            transition={{ duration: 0.3 }}
          >
            {project.name}
          </motion.h3>
          <p className="font-body text-text-secondary mb-6 text-sm sm:text-base leading-relaxed">
            {project.description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-8">
            {project.technologies.map((tech, techIndex) => (
              <motion.span
                key={techIndex}
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: techIndex * 0.08, duration: 0.4 }}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-gradient-to-r from-accent-primary/10 to-accent-secondary/10 text-text-secondary border border-white/10 hover:border-accent-primary/50 hover:text-accent-primary transition-all duration-300"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>

        {/* View Details Button */}
        <motion.div
          className="mt-auto"
          initial={{ y: 0 }}
          animate={{ y: isHovered ? -4 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="inline-flex items-center gap-2 text-accent-primary font-semibold text-base group-hover:text-accent-secondary transition-colors duration-300">
            <span>Explore Project</span>
            <motion.div
              animate={isHovered ? { x: 8 } : { x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <FaArrowRight size={16} />
            </motion.div>
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
      description: 'Comprehensive inventory and billing management system with real-time stock tracking, multi-user support, and advanced reporting capabilities.',
      technologies: ['PHP', 'MySQL', 'Tailwind CSS', 'JavaScript'],
      liveLink: '#',
      featured: true
    },
    {
      id: 2,
      name: 'Laravel REST API',
      description: 'Secure backend API for web applications with robust authentication and authorization mechanisms.',
      technologies: ['Laravel', 'MySQL'],
      liveLink: '#',
      featured: false
    },
    {
      id: 3,
      name: 'React Dashboard',
      description: 'Modern admin dashboard with dynamic data visualization and interactive charts.',
      technologies: ['React JS', 'Tailwind CSS'],
      liveLink: '#',
      featured: false
    }
  ];

  // Separate featured and regular projects
  const featuredProject = projects.find(p => p.featured);
  const regularProjects = projects.filter(p => !p.featured);

  return (
    <section id="projects" className="py-32 relative">
      {/* Enhanced background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/3 -left-20 w-96 h-96 bg-accent-primary/15 rounded-full blur-3xl"
          animate={{
            y: [0, 50, 0],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/3 -right-20 w-96 h-96 bg-accent-tertiary/15 rounded-full blur-3xl"
          animate={{
            y: [0, -50, 0],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity, delay: 2 }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="inline-block px-4 py-2.5 glass-premium rounded-full text-sm font-semibold text-accent-primary mb-6 border border-accent-primary/20"
          >
            💼 Portfolio Showcase
          </motion.span>

          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto text-lg">
            Explore a curated selection of my most impactful works showcasing expertise in full-stack development
          </p>
        </motion.div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* Featured Project (Takes 2x2 space) */}
          {featuredProject && (
            <ProjectCard
              project={featuredProject}
              index={0}
              onClick={() => setSelectedProject(featuredProject)}
              isFeatured={true}
            />
          )}

          {/* Regular Projects */}
          {regularProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index + 1}
              onClick={() => setSelectedProject(project)}
              isFeatured={false}
            />
          ))}
        </div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(10px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, y: 50, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="glass-dark rounded-3xl p-10 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl shadow-accent-primary/30 relative border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <motion.button
                className="absolute top-6 right-6 w-12 h-12 glass-premium rounded-2xl flex items-center justify-center text-text-secondary hover:text-white hover:border-accent-primary/50 transition-all duration-300"
                onClick={() => setSelectedProject(null)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaTimes size={20} />
              </motion.button>

              {/* Project header */}
              <div className="flex items-start gap-6 mb-8">
                <motion.div
                  className="w-20 h-20 rounded-2xl bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center shadow-lg shadow-accent-primary/40 flex-shrink-0"
                  initial={{ scale: 0.8, rotate: -10 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                >
                  <FaRocket className="text-white text-2xl" />
                </motion.div>
                <div>
                  <h3 className="font-heading text-3xl font-bold text-white mb-2">
                    {selectedProject.name}
                  </h3>
                  <p className="text-text-secondary text-base leading-relaxed">
                    {selectedProject.description}
                  </p>
                </div>
              </div>

              {/* Technologies */}
              <div className="mb-10">
                <h4 className="font-heading font-semibold text-white mb-4 text-lg">Technologies Used</h4>
                <div className="flex flex-wrap gap-3">
                  {selectedProject.technologies.map((tech, index) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.08, duration: 0.4 }}
                      className="px-4 py-2.5 glass-premium rounded-xl text-sm font-medium text-accent-primary border border-accent-primary/30 hover:bg-white/10 transition-all duration-300"
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
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-tertiary rounded-xl font-heading font-semibold text-white shadow-lg hover:shadow-2xl hover:shadow-accent-primary/40 transition-all duration-300 w-full sm:w-auto"
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
