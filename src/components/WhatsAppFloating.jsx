import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';

export default function WhatsAppFloating() {
  const phoneNumber = '923098643058';
  const whatsappUrl = `https://wa.me/${phoneNumber}`;

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, type: 'spring', stiffness: 260, damping: 20 }}
      className="fixed bottom-6 left-6 z-[9999]"
    >
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative group w-14 h-14 bg-bg-secondary border border-glass-border hover:border-green-500/50 rounded-full flex items-center justify-center text-text-primary hover:text-white shadow-[0_8px_30px_rgba(0,0,0,0.1)] transition-all duration-300 backdrop-blur-md"
        whileHover={{ y: -4, scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Glow backdrop on hover */}
        <div className="absolute inset-0 rounded-full bg-green-500/10 group-hover:bg-green-500 opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10 blur-sm scale-110" />

        {/* Pulse effect */}
        <span className="absolute inset-0 rounded-full bg-green-500/20 group-hover:hidden animate-ping duration-1000 -z-20" />

        {/* WhatsApp Icon */}
        <FaWhatsapp size={28} className="text-[#25D366] group-hover:text-white transition-colors duration-300" />

        {/* Tooltip message (Slide-in from right since icon is on the left) */}
        <div className="absolute left-16 top-1/2 -translate-y-1/2 px-4 py-2 bg-bg-secondary border border-glass-border rounded-xl opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 pointer-events-none whitespace-nowrap shadow-premium">
          <span className="font-mono text-[10px] font-bold tracking-wider text-text-secondary group-hover:text-text-primary">
            Chat on WhatsApp
          </span>
        </div>
      </motion.a>
    </motion.div>
  );
}
