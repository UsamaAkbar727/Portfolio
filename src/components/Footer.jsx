import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: FaGithub, href: 'https://github.com/UsamaAkbar727', label: 'GitHub' },
    { icon: FaLinkedin, href: 'https://www.linkedin.com/in/usama-akbar-a070323a5', label: 'LinkedIn' },
    // { icon: FaTwitter, href: 'https://twitter.com', label: 'Twitter' },
  ];

  return (
    <footer className="py-12 relative border-t border-white/5">
      {/* Top border with gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-primary/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 group cursor-pointer"
          >
            <motion.div
              className="w-10 h-10 rounded-xl bg-gradient-to-r from-accent-primary to-accent-secondary flex items-center justify-center shadow-lg shadow-accent-primary/30"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <span className="font-heading font-bold text-white">UA</span>
            </motion.div>
            <motion.span
              className="font-heading font-bold text-white text-lg group-hover:text-accent-primary transition-colors duration-300"
              whileHover={{ x: 5 }}
            >
              Usama Akbar
            </motion.span>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center gap-4"
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="w-10 h-10 glass-premium rounded-xl flex items-center justify-center text-text-secondary hover:text-white hover:border-accent-primary/50 transition-all duration-300 group shadow-lg hover:shadow-accent-primary/30"
                whileHover={{ scale: 1.15, y: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                <motion.div
                  whileHover={{ rotate: [0, -15, 15, -15, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <social.icon size={18} />
                </motion.div>
              </motion.a>
            ))}
          </motion.div>

          {/* Copyright */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-text-secondary text-sm"
          >
            © {currentYear} Usama JatT. All rights reserved.
          </motion.p>
        </div>

        {/* Built with love */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 text-center"
        >
          <p className="text-text-secondary text-sm flex items-center justify-center gap-2">
            Built with{" "}
            <motion.span
              className="text-accent-primary"
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              ❤
            </motion.span>
            {" "}using React & Tailwind CSS
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
