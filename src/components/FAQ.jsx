import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FI } from './AnimationHelpers';
import { FaChevronDown } from 'react-icons/fa';

const faqs = [
  {
    question: 'Do you build projects from scratch or use templates?',
    answer: 'Always from scratch. I design and code systems starting with blank folders. This ensures maximum efficiency, clean architectures, optimal performance, and full security control without generic bloated template dependencies.'
  },
  {
    question: 'What is your preferred database configuration?',
    answer: 'I prefer MySQL for structured, relational models requiring strict data integrity (like billing and inventory keys) and MongoDB for dynamic document schemas and high-throughput logging streams.'
  },
  {
    question: 'Can you work with existing codebases?',
    answer: 'Absolutely. I can read, audit, and debug legacy codebases. I refactor performance bottleneck processes, introduce unit test layers, and integrate new RESTful endpoints while keeping live client branches stable.'
  },
  {
    question: 'Are you available for international contracts or remote work?',
    answer: 'Yes, I work remotely with clients worldwide. I synchronize with local teams using Git, Slack, Teams, or Discord, and follow structured task trackers for transparent project handovers.'
  }
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIdx(openIdx === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 md:py-32 relative bg-bg-primary transition-colors duration-300 overflow-hidden border-t border-glass-border">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 w-full">
        
        {/* Section Header */}
        <FI delay={0} y={20} className="text-center mb-20">
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-glass-border bg-bg-secondary backdrop-blur-md mb-8">
            <span className="w-2 h-2 rounded-full bg-accent-tertiary" />
            <span className="text-xs sm:text-sm font-bold tracking-wider uppercase text-text-secondary">
              Information Desk
            </span>
          </div>
          
          <h2 className="text-text-primary font-heading font-black uppercase text-center leading-none tracking-tighter text-5xl sm:text-6xl lg:text-7xl">
            Frequently Asked <span className="text-outline">Questions</span>
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto mt-6 text-base sm:text-lg text-center font-light leading-relaxed">
            Clarifying technical doubts, workflow approaches, and freelance onboarding details.
          </p>
        </FI>

        {/* Accordion Layout (No boxes, no cards) */}
        <div className="space-y-0 mt-12 w-full border-t border-glass-border">
          {faqs.map((faq, index) => {
            const isOpen = openIdx === index;
            return (
              <div
                key={index}
                className="border-b border-glass-border py-6 sm:py-8 transition-colors duration-300"
              >
                {/* Accordion Header Trigger */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between text-left group focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-start gap-4 sm:gap-6 pr-4">
                    <span className="font-mono text-xs sm:text-sm font-bold tracking-wider text-text-secondary/40 select-none pt-1">
                      0{index + 1}
                    </span>
                    <span className="font-heading text-lg sm:text-xl font-bold uppercase tracking-wide text-text-primary group-hover:text-accent-primary transition-colors duration-300">
                      {faq.question}
                    </span>
                  </div>

                  {/* Icon rotation */}
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="text-text-secondary/50 group-hover:text-text-primary flex-shrink-0"
                  >
                    <FaChevronDown size={14} />
                  </motion.div>
                </button>

                {/* Accordion Content Panel */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0, marginTop: 0 }}
                      animate={{ height: 'auto', opacity: 1, marginTop: 16 }}
                      exit={{ height: 0, opacity: 0, marginTop: 0 }}
                      transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="font-body font-light text-text-secondary text-sm sm:text-base leading-relaxed pl-8 sm:pl-10 max-w-3xl">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
