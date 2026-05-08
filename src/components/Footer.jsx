import { motion } from 'framer-motion';

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
          <motion.div 
            className="relative"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-center rounded-3xl border-2 border-gray-200/60 dark:border-white/15 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl px-10 py-8 shadow-2xl shadow-slate-900/10 dark:shadow-accent-primary/10">
              <img
                src="/assets/image.png"
                alt="JuTt Tech Solutions logo"
                className="h-24 object-contain drop-shadow-sm rounded-xl"
              />
            </div>
          </motion.div>

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
            {" "}by JuTt Tech Solutions
          </motion.p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
