import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaExternalLinkAlt,
  FaCode,
  FaRocket,
  FaTimes,
  FaArrowRight,
} from "react-icons/fa";
import { projects as projectData } from "../data/projects";

const ProjectCard = ({ project, index, onClick, isFeatured }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.12,
        type: "spring",
        stiffness: 100,
      }}
      whileHover={{
        y: -12,
        transition: { duration: 0.3 },
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group cursor-pointer ${isFeatured ? "md:col-span-2 lg:col-span-2" : "col-span-1"}`}
    >
      <div
        className={`glass-premium rounded-[2rem] h-full flex flex-col transition-all duration-500 hover:bg-white/8 hover:border-accent-primary/30 relative overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-accent-primary/20 backdrop-blur-xl border border-white/10`}
        onClick={onClick}
      >
        {/* Project Image Preview */}
        <div className={`relative overflow-hidden ${isFeatured ? "h-56 sm:h-64" : "h-48"}`}>
          <motion.img
            src={project.image}
            alt={project.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
          
          {/* Featured Tag */}
          {isFeatured && (
            <div className="absolute top-6 left-6 z-20">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="px-5 py-2.5 rounded-2xl bg-accent-primary/90 text-white text-xs font-bold tracking-widest uppercase backdrop-blur-md shadow-lg border border-white/20 flex items-center gap-2"
              >
                <FaRocket className="animate-pulse" />
                Featured Project
              </motion.div>
            </div>
          )}

          {/* Technology Pills on Image (Mobile/Small Screen) */}
          <div className={`absolute bottom-4 left-4 right-4 flex flex-wrap gap-2 z-20 ${isFeatured ? "lg:hidden" : "md:hidden"}`}>
            {project.technologies.slice(0, 3).map((tech, techIndex) => (
              <span key={techIndex} className="px-3 py-1.5 text-[10px] font-bold rounded-lg bg-black/60 text-white backdrop-blur-md border border-white/10">
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className={`p-6 sm:p-8 flex flex-col flex-grow relative`}>
          {/* Gradient overlay on hover */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            style={{
              background:
                "linear-gradient(135deg, rgba(99, 102, 241, 0.08), rgba(139, 92, 246, 0.08))",
            }}
          />

          {/* Project Content */}
          <div className="relative z-10 flex-grow">
            <div className="flex items-center justify-between mb-4">
              <motion.h3
                className={`font-heading ${isFeatured ? "text-2xl sm:text-3xl" : "text-xl"} font-bold text-text-primary leading-tight group-hover:text-accent-primary transition-colors duration-300`}
              >
                {project.name}
              </motion.h3>
              <div className={isFeatured ? "lg:block" : "hidden md:block"}>
                <FaExternalLinkAlt className="text-text-secondary/40 group-hover:text-accent-primary transition-colors" size={18} />
              </div>
            </div>
            
            <p className={`font-body text-text-secondary mb-6 ${isFeatured ? "text-base leading-relaxed" : "text-sm leading-relaxed line-clamp-3"}`}>
              {project.description}
            </p>

            {/* Technologies (Large Screen) */}
            <div className={`flex flex-wrap gap-2 mb-10 ${isFeatured ? "" : "hidden md:flex"}`}>
              {project.technologies.map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className="px-4 py-2 text-xs font-semibold rounded-xl bg-white/5 text-text-secondary border border-white/10 group-hover:border-accent-primary/40 transition-all duration-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* View Details Button */}
          <motion.div
            className="mt-auto relative z-10"
            animate={isHovered ? { x: 10 } : { x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="inline-flex items-center gap-3 text-accent-primary font-bold text-sm tracking-widest uppercase">
              <span>Explore Case Study</span>
              <FaArrowRight size={16} />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  // Separate featured and regular projects
  const featuredProject = projectData.find((p) => p.featured);
  const regularProjects = projectData.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-32 relative">
      {/* Enhanced background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/3 -left-20 w-96 h-96 bg-accent-primary/15 rounded-full blur-3xl"
          animate={{
            y: [0, 50, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/3 -right-20 w-96 h-96 bg-accent-tertiary/15 rounded-full blur-3xl"
          animate={{
            y: [0, -50, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, delay: 2 }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
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
            Explore a curated selection of my most impactful works showcasing
            expertise in full-stack development
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
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(10px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, y: 50, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="glass-dark rounded-[2.5rem] max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl shadow-accent-primary/30 relative border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <motion.button
                className="absolute top-6 right-6 w-12 h-12 glass-premium rounded-2xl flex items-center justify-center text-text-secondary hover:text-white hover:border-accent-primary/50 transition-all duration-300 z-50"
                onClick={() => setSelectedProject(null)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaTimes size={20} />
              </motion.button>

              <div className="flex flex-col md:flex-row h-full">
                {/* Modal Image */}
                <div className="md:w-1/2 h-64 md:h-auto relative">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent md:bg-gradient-to-b md:from-transparent md:to-black/20" />
                </div>

                {/* Modal Content */}
                <div className="md:w-1/2 p-8 sm:p-12">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center shadow-lg shadow-accent-primary/40">
                      <FaRocket className="text-white text-xl" />
                    </div>
                    <h3 className="font-heading text-3xl font-bold text-white">
                      {selectedProject.name}
                    </h3>
                  </div>

                  <p className="text-text-secondary text-base leading-relaxed mb-8">
                    {selectedProject.description}
                  </p>

                  {/* Technologies */}
                  <div className="mb-10">
                    <h4 className="font-heading font-semibold text-white mb-4 text-lg">
                      Technologies Used
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {selectedProject.technologies.map((tech, index) => (
                        <span
                          key={tech}
                          className="px-4 py-2 glass-premium rounded-xl text-xs font-medium text-accent-primary border border-accent-primary/30"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <motion.a
                      href={selectedProject.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-tertiary rounded-xl font-heading font-semibold text-white shadow-lg hover:shadow-2xl hover:shadow-accent-primary/40 transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FaExternalLinkAlt size={16} />
                      Live Demo
                    </motion.a>
                    <motion.button
                      className="flex-1 px-6 py-4 glass-premium rounded-xl font-heading font-semibold text-text-primary border border-white/10 hover:border-accent-primary/50 transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedProject(null)}
                    >
                      Close
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
