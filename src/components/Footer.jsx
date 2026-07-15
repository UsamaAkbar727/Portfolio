import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 relative border-t border-slate-100 bg-[#f8fafc] backdrop-blur-sm">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-primary/30 to-transparent" />

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
              className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-500 hover:text-white hover:bg-slate-900 hover:border-slate-900 transition-all duration-300 shadow-sm"
            >
              <FaGithub size={16} />
            </a>
            <a
              href="https://www.linkedin.com/in/usama-akbar-a070323a5"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-500 hover:text-white hover:bg-blue-600 hover:border-blue-600 transition-all duration-300 shadow-sm"
            >
              <FaLinkedin size={16} />
            </a>
            <a
              href="https://wa.me/923098643058"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-500 hover:text-white hover:bg-green-500 hover:border-green-500 transition-all duration-300 shadow-sm"
            >
              <FaWhatsapp size={16} />
            </a>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-sm text-slate-500 flex items-center justify-center gap-2"
          >
            Developed{"  "}
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
            {"  "}by Usama Akbar
          </motion.p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
