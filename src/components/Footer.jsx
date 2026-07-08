import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 relative border-t border-gray-200 dark:border-white/10 bg-white/80 dark:bg-slate-950/90 backdrop-blur-sm">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-primary/50 to-transparent" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center gap-8"
        >
          {/* Social Links inside Footer */}
          <div className="flex gap-4">
            <a
              href="https://github.com/UsamaAkbar727"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-white hover:bg-accent-primary hover:border-accent-primary transition-all duration-300 shadow-md"
            >
              <FaGithub size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/usama-akbar-a070323a5"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-white hover:bg-[#0077b5] hover:border-[#0077b5] transition-all duration-300 shadow-md"
            >
              <FaLinkedin size={18} />
            </a>
            <a
              href="https://wa.me/923098643058"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-white hover:bg-[#25D366] hover:border-[#25D366] transition-all duration-300 shadow-md"
            >
              <FaWhatsapp size={18} />
            </a>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-sm text-gray-600 dark:text-gray-300 flex items-center justify-center gap-2"
          >
            Developed{" "}
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
            {" "}by Usama Akbar
          </motion.p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
