import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCheck,
  FaPaperPlane,
  FaExclamationCircle,
  FaUser,
  FaTag,
  FaCommentAlt
} from "react-icons/fa";
import emailjs from "@emailjs/browser";
import { FI, highlightText, Mg, Tilt } from "./AnimationHelpers";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitMessage, setSubmitMessage] = useState("");

  // Initialize EmailJS (Preserved original credentials/logic)
  useEffect(() => {
    emailjs.init("OIMkSpaJgtN7NmWDy");
  }, []);

  const contactInfo = [
    {
      icon: FaEnvelope,
      label: "Email Address",
      value: "usamaakbarjaatt@gmail.com",
      href: "mailto:usamaakbarjaatt@gmail.com",
      color: "var(--accent-primary)",
    },
    {
      icon: FaMapMarkerAlt,
      label: "Primary Location",
      value: "Pakistan",
      href: null,
      color: "var(--accent-secondary)",
    },
    {
      icon: FaGithub,
      label: "GitHub Handle",
      value: "Usama Akbar",
      href: "https://github.com/UsamaAkbar727",
      color: "var(--accent-tertiary)",
    },
    {
      icon: FaLinkedin,
      label: "LinkedIn Profile",
      value: "Usama Akbar",
      href: "https://www.linkedin.com/in/usama-akbar-a070323a5",
      color: "var(--accent-gold)",
    },
  ];

  // Preserved validation logic exactly
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Preserved handleSubmit logic exactly
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const serviceID = import.meta.env.VITE_EMAIL_SERVICE_ID;
      const templateID = import.meta.env.VITE_EMAIL_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAIL_PUBLIC_KEY;

      console.log("=== EMAILJS DEBUG INFO ===");
      console.log("Service ID:", serviceID);
      console.log("Template ID:", templateID);
      console.log("Public Key:", publicKey);
      console.log("Form Data:", formData);

      const response = await emailjs.send(
        serviceID,
        templateID,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_name: "Usama Akbar",
          reply_to: formData.email,
        },
        publicKey,
      );

      console.log("✅ Email sent successfully!", response);
      setIsSubmitting(false);
      setIsSubmitted(true);
      setSubmitMessage("Message sent successfully! I'll get back to you soon.");

      setTimeout(() => {
        setIsSubmitted(false);
        setSubmitMessage("");
        setFormData({ name: "", email: "", subject: "", message: "" });
      }, 5000);
    } catch (error) {
      console.error("❌ Failed to send message:", error);
      setIsSubmitting(false);
 
      let errorMessage = "Failed to send message. ";
      if (error.status === 400) {
        errorMessage += "Invalid request. Please check your EmailJS configuration.";
      } else if (error.status === 500) {
        errorMessage += "EmailJS server error. Please try again later.";
      } else if (error.text) {
        errorMessage += error.text;
      } else {
        errorMessage += "Please try again or email directly at usamaakbarjaatt@gmail.com";
      }
      setSubmitMessage(errorMessage);
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 relative bg-bg-primary transition-colors duration-300 overflow-hidden border-t border-glass-border">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Section Header */}
        <FI delay={0} y={20} className="text-center mb-24">
          <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-bg-secondary border border-glass-border text-xs sm:text-sm font-mono tracking-wider text-text-secondary uppercase mb-6 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-accent-primary"></span>
            Contact
          </div>
          <h2 className="font-heading text-5xl sm:text-6xl lg:text-8xl font-black uppercase leading-none tracking-tighter text-text-primary mb-6 relative inline-block">
            Get In <span className="text-outline">Touch</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto mt-6 text-lg sm:text-xl font-light">
            Have a project in mind or want to work together? Drop me a message and I will get back to you as soon as possible.
          </p>
        </FI>

        {/* Content Layout */}
        <div className="grid lg:grid-cols-12 gap-10 items-stretch w-full relative z-10">
          
          {/* LEFT COLUMN: Contact info */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-8 h-full relative">
            <FI delay={0.1} y={20} className="flex-grow flex flex-col justify-between h-full">
              <div className="w-full h-full p-[1px] rounded-[2rem] md:rounded-[3rem] bg-glass-border shadow-[0_4px_30px_rgba(0,0,0,0.015)] group/tilt cursor-pointer">
                <div className="rounded-[calc(2rem-2px)] md:rounded-[2.9rem] p-6 sm:p-8 md:p-10 bg-bg-primary relative overflow-hidden flex flex-col justify-between h-full min-h-[400px] md:min-h-[500px]">
                  
                  <div className="space-y-10 relative z-10">
                    <div>
                      <h3 className="font-heading text-3xl font-black text-text-primary uppercase tracking-wider">
                        Contact <span className="text-accent-primary">Details</span>
                      </h3>
                    </div>

                    <div className="space-y-5">
                      {contactInfo.map((info, idx) => (
                        <motion.a
                          key={idx}
                          href={info.href || undefined}
                          target={info.href ? "_blank" : undefined}
                          rel={info.href ? "noopener noreferrer" : undefined}
                          className={`flex items-center gap-4 sm:gap-5 p-3 sm:p-4 rounded-2xl border transition-all duration-300 relative group/item overflow-hidden ${
                            info.href ? "cursor-pointer" : "cursor-default"
                          }`}
                          style={{
                            borderColor: "var(--glass-border)",
                            background: "var(--bg-secondary)"
                          }}
                          whileHover={{ x: 6, backgroundColor: "var(--bg-tertiary)" }}
                        >
                          <div
                            className="w-14 h-14 rounded-xl flex items-center justify-center border text-text-primary transition-all duration-300 relative bg-bg-primary border-glass-border"
                          >
                            <info.icon size={22} style={{ color: info.color }} />
                          </div>
                          <div>
                            <p className="text-[10px] font-mono text-text-secondary/70 uppercase tracking-[0.2em] leading-none mb-2">
                              {info.label}
                            </p>
                            <p className="font-heading font-semibold text-text-primary text-base sm:text-lg tracking-wide group-hover/item:text-accent-primary transition-all duration-300 break-all sm:break-normal">
                              {info.value}
                            </p>
                          </div>
                        </motion.a>
                      ))}
                    </div>
                  </div>

                  {/* Follow Me Block */}
                  <div className="pt-8 mt-8 border-t border-glass-border flex items-center justify-between gap-4 relative z-10">
                    <span className="text-xs font-heading font-bold text-text-secondary/70 uppercase tracking-[0.3em]">
                      Follow Me
                    </span>
                    <div className="flex gap-4">
                      <Mg>
                        <motion.a
                          href="https://github.com/UsamaAkbar727"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-14 h-14 bg-bg-secondary border border-glass-border rounded-2xl flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-bg-tertiary transition-all duration-300 shadow-sm group/icon relative overflow-hidden"
                        >
                          <FaGithub size={24} className="relative z-10" />
                        </motion.a>
                      </Mg>
                      <Mg>
                        <motion.a
                          href="https://www.linkedin.com/in/usama-akbar-a070323a5"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-14 h-14 bg-bg-secondary border border-glass-border rounded-2xl flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-bg-tertiary transition-all duration-300 shadow-sm group/icon relative overflow-hidden"
                        >
                          <FaLinkedin size={24} className="relative z-10" />
                        </motion.a>
                      </Mg>
                    </div>
                  </div>
                </div>
              </div>
            </FI>
          </div>

          {/* RIGHT COLUMN: Contact Form */}
          <div className="lg:col-span-7 flex">
            <FI delay={0.2} y={20} className="w-full flex">
              <div className="w-full relative p-[1px] rounded-[2rem] md:rounded-[3rem] bg-glass-border shadow-md">
                <div className="rounded-[calc(2rem-2px)] md:rounded-[2.9rem] p-5 sm:p-8 md:p-12 bg-bg-primary relative overflow-hidden flex flex-col w-full h-full">
                  
                  {/* Status Alerts */}
                  <AnimatePresence mode="wait">
                    {submitMessage && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, mb: 0 }}
                        animate={{ opacity: 1, height: "auto", mb: 24 }}
                        exit={{ opacity: 0, height: 0, mb: 0 }}
                        className="overflow-hidden rounded-2xl"
                      >
                        <div className={`p-5 flex items-center gap-4 relative z-10 border ${
                          submitMessage.includes("Failed")
                            ? "bg-red-500/10 border-red-500/20 text-red-500"
                            : "bg-emerald-500/10 border-emerald-500/20 text-emerald-500"
                        }`}>
                          {submitMessage.includes("Failed") ? (
                            <FaExclamationCircle size={20} />
                          ) : (
                            <FaCheck size={20} />
                          )}
                          <span className="text-sm font-heading font-semibold tracking-wide">{submitMessage}</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <AnimatePresence mode="wait">
                    {isSubmitted ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="text-center py-20 flex-grow flex flex-col justify-center items-center z-10"
                      >
                        <div className="relative w-32 h-32 mb-10 flex items-center justify-center">
                          <div className="absolute inset-0 rounded-full bg-emerald-500/10 animate-pulse" />
                          <div className="w-20 h-20 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg z-10">
                            <FaCheck size={36} className="text-white" />
                          </div>
                        </div>
                        <h4 className="font-heading text-4xl font-black text-text-primary uppercase tracking-wider mb-4">
                          Message Sent
                        </h4>
                        <p className="text-lg text-text-secondary max-w-md font-body font-light">
                          Thank you! Your message has been sent successfully. I will get back to you shortly.
                        </p>
                      </motion.div>
                    ) : (
                      <motion.form
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onSubmit={handleSubmit}
                        className="space-y-8 w-full flex-grow flex flex-col relative z-10"
                        noValidate
                      >
                        <div className="space-y-8">
                          <div className="grid sm:grid-cols-2 gap-8">
                            
                            {/* Name Field */}
                            <div className="relative group/input">
                              <label className="block text-xs font-heading text-text-secondary/70 uppercase tracking-[0.2em] mb-3 group-focus-within/input:text-accent-primary">
                                Name
                              </label>
                              <div className="relative">
                                <div className="relative flex items-center bg-bg-secondary rounded-2xl overflow-hidden border border-glass-border group-focus-within/input:border-accent-primary/50 group-focus-within/input:ring-2 group-focus-within/input:ring-accent-primary/10 transition-all duration-300">
                                  <div className="absolute left-5 text-text-secondary/70 group-focus-within/input:text-accent-primary z-10">
                                    <FaUser size={18} />
                                  </div>
                                  <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={(e) => {
                                      setFormData({ ...formData, [e.target.name]: e.target.value });
                                      if (errors.name) setErrors({ ...errors, name: "" });
                                    }}
                                    className="w-full pl-12 sm:pl-14 pr-4 sm:pr-6 py-4 md:py-5 bg-transparent text-text-primary placeholder-text-secondary/40 focus:outline-none text-sm sm:text-base font-light tracking-wide"
                                    placeholder="Enter your name"
                                  />
                                </div>
                              </div>
                              <AnimatePresence>
                                {errors.name && (
                                  <motion.p
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -5 }}
                                    className="absolute left-0 -bottom-6 text-xs text-red-500 flex items-center gap-1.5 font-heading tracking-wide"
                                  >
                                    <FaExclamationCircle size={12} />
                                    {errors.name}
                                  </motion.p>
                                )}
                              </AnimatePresence>
                            </div>

                            {/* Email Field */}
                            <div className="relative group/input">
                              <label className="block text-xs font-heading text-text-secondary/70 uppercase tracking-[0.2em] mb-3 group-focus-within/input:text-accent-primary">
                                Email Address
                              </label>
                              <div className="relative">
                                <div className="relative flex items-center bg-bg-secondary rounded-2xl overflow-hidden border border-glass-border group-focus-within/input:border-accent-primary/50 group-focus-within/input:ring-2 group-focus-within/input:ring-accent-primary/10 transition-all duration-300">
                                  <div className="absolute left-5 text-text-secondary/70 group-focus-within/input:text-accent-primary z-10">
                                    <FaEnvelope size={18} />
                                  </div>
                                  <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={(e) => {
                                      setFormData({ ...formData, [e.target.name]: e.target.value });
                                      if (errors.email) setErrors({ ...errors, email: "" });
                                    }}
                                    className="w-full pl-12 sm:pl-14 pr-4 sm:pr-6 py-4 md:py-5 bg-transparent text-text-primary placeholder-text-secondary/40 focus:outline-none text-sm sm:text-base font-light tracking-wide"
                                    placeholder="name@domain.com"
                                  />
                                </div>
                              </div>
                              <AnimatePresence>
                                {errors.email && (
                                  <motion.p
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -5 }}
                                    className="absolute left-0 -bottom-6 text-xs text-red-500 flex items-center gap-1.5 font-heading tracking-wide"
                                  >
                                    <FaExclamationCircle size={12} />
                                    {errors.email}
                                  </motion.p>
                                )}
                              </AnimatePresence>
                            </div>
                          </div>

                          {/* Subject Field */}
                          <div className="relative group/input">
                            <label className="block text-xs font-heading text-text-secondary/70 uppercase tracking-[0.2em] mb-3 group-focus-within/input:text-accent-primary">
                              Subject
                            </label>
                            <div className="relative">
                              <div className="relative flex items-center bg-bg-secondary rounded-2xl overflow-hidden border border-glass-border group-focus-within/input:border-accent-primary/50 group-focus-within/input:ring-2 group-focus-within/input:ring-accent-primary/10 transition-all duration-300">
                                <div className="absolute left-5 text-text-secondary/70 group-focus-within/input:text-accent-primary z-10">
                                  <FaTag size={18} />
                                </div>
                                <input
                                  type="text"
                                  name="subject"
                                  value={formData.subject}
                                  onChange={(e) => {
                                    setFormData({ ...formData, [e.target.name]: e.target.value });
                                    if (errors.subject) setErrors({ ...errors, subject: "" });
                                  }}
                                  className="w-full pl-12 sm:pl-14 pr-4 sm:pr-6 py-4 md:py-5 bg-transparent text-text-primary placeholder-text-secondary/40 focus:outline-none text-sm sm:text-base font-light tracking-wide"
                                  placeholder="Topic of conversation"
                                />
                              </div>
                            </div>
                            <AnimatePresence>
                              {errors.subject && (
                                <motion.p
                                  initial={{ opacity: 0, y: -5 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -5 }}
                                  className="absolute left-0 -bottom-6 text-xs text-red-500 flex items-center gap-1.5 font-heading tracking-wide"
                                >
                                  <FaExclamationCircle size={12} />
                                  {errors.subject}
                                </motion.p>
                              )}
                            </AnimatePresence>
                          </div>

                          {/* Message Field */}
                          <div className="relative group/input">
                            <label className="block text-xs font-heading text-text-secondary/70 uppercase tracking-[0.2em] mb-3 group-focus-within/input:text-accent-primary">
                              Message
                            </label>
                            <div className="relative">
                              <div className="relative flex bg-bg-secondary rounded-2xl overflow-hidden border border-glass-border group-focus-within/input:border-accent-primary/50 group-focus-within/input:ring-2 group-focus-within/input:ring-accent-primary/10 transition-all duration-300">
                                <div className="absolute left-5 top-6 text-text-secondary/70 group-focus-within/input:text-accent-primary z-10">
                                  <FaCommentAlt size={18} />
                                </div>
                                <textarea
                                  name="message"
                                  rows={5}
                                  value={formData.message}
                                  onChange={(e) => {
                                    setFormData({ ...formData, [e.target.name]: e.target.value });
                                    if (errors.message) setErrors({ ...errors, message: "" });
                                  }}
                                  className="w-full pl-12 sm:pl-14 pr-4 sm:pr-6 py-4 md:py-6 bg-transparent text-text-primary placeholder-text-secondary/40 focus:outline-none text-sm sm:text-base font-light tracking-wide resize-none shadow-inner"
                                  placeholder="Details about your project or inquiry..."
                                />
                              </div>
                            </div>
                            <AnimatePresence>
                              {errors.message && (
                                <motion.p
                                  initial={{ opacity: 0, y: -5 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -5 }}
                                  className="absolute left-0 -bottom-6 text-xs text-red-500 flex items-center gap-1.5 font-heading tracking-wide"
                                >
                                  <FaExclamationCircle size={12} />
                                  {errors.message}
                                </motion.p>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>

                        <div className="pt-8 w-full flex justify-end">
                          <Mg className="w-full sm:w-auto">
                            <motion.button
                              type="submit"
                              disabled={isSubmitting}
                              className="w-full sm:w-auto px-8 md:px-12 py-4 bg-accent-primary rounded-2xl font-heading font-bold uppercase text-sm tracking-wider text-white hover:bg-blue-600 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 relative overflow-hidden"
                              whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                              whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                            >
                              {isSubmitting ? (
                                <div className="inline-block w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              ) : (
                                <>
                                  <FaPaperPlane size={14} />
                                  <span>Send Message</span>
                                </>
                              )}
                            </motion.button>
                          </Mg>
                        </div>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </FI>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
