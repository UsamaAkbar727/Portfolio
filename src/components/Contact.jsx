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
} from "react-icons/fa";
import emailjs from "@emailjs/browser";

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

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init("OIMkSpaJgtN7NmWDy");
  }, []);

  const contactInfo = [
    {
      icon: FaEnvelope,
      label: "Email",
      value: "usamaakbarjaatt@gmail.com",
      href: "mailto:usamaakbarjaatt@gmail.com",
    },
    {
      icon: FaMapMarkerAlt,
      label: "Location",
      value: "Pakistan",
      href: null,
    },
    {
      icon: FaGithub,
      label: "GitHub",
      value: "Usama Akbar",
      href: "https://github.com/UsamaAkbar727",
    },
    {
      icon: FaLinkedin,
      label: "LinkedIn",
      value: "Usama Akbar",
      href: "https://www.linkedin.com/in/usama-akbar-a070323a5",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      // Your EmailJS credentials
      const serviceID = import.meta.env.VITE_EMAIL_SERVICE_ID;
      const templateID = import.meta.env.VITE_EMAIL_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAIL_PUBLIC_KEY;
      
      console.log("=== EMAILJS DEBUG INFO ===");
      console.log("Service ID:", serviceID);
      console.log("Template ID:", templateID);
      console.log("Public Key:", publicKey);
      console.log("Form Data:", formData);

      // Send email using EmailJS
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
      console.log("Response status:", response.status);
      console.log("Response text:", response.text);

      setIsSubmitting(false);
      setIsSubmitted(true);
      setSubmitMessage("Message sent successfully! I'll get back to you soon.");

      // Reset form after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setSubmitMessage("");
        setFormData({ name: "", email: "", subject: "", message: "" });
      }, 5000);
    } catch (error) {
      console.error("❌ Failed to send message:", error);
      console.error("Error object:", JSON.stringify(error, null, 2));
      console.error("Error status:", error.status);
      console.error("Error text:", error.text);

      setIsSubmitting(false);

      // Get specific error message
      let errorMessage = "Failed to send message. ";

      if (error.status === 400) {
        errorMessage +=
          "Invalid request. Please check your EmailJS configuration.";
        console.log(
          "🔍 400 Error - Check if Service ID and Template ID are correct",
        );
      } else if (error.status === 500) {
        errorMessage += "EmailJS server error. Please try again later.";
        console.log("🔍 500 Error - EmailJS server issue");
      } else if (error.text) {
        errorMessage += error.text;
        console.log("🔍 Error text:", error.text);
      } else {
        errorMessage +=
          "Please try again or email directly at usamaakbarjaatt@gmail.com";
      }

      setSubmitMessage(errorMessage);

      // Don't auto-close on error - let user see the message
    }
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-secondary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? Let's talk!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <motion.div
              variants={itemVariants}
              className="glass rounded-2xl p-8"
            >
              <h3 className="font-heading text-2xl font-bold mb-6">
                Send a Message
              </h3>

              {/* Success/Error Message */}
              {submitMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${
                    submitMessage.includes("Failed")
                      ? "bg-red-500/10 border border-red-500/30 text-red-400"
                      : "bg-green-500/10 border border-green-500/30 text-green-400"
                  }`}
                >
                  {submitMessage.includes("Failed") ? (
                    <FaExclamationCircle size={20} />
                  ) : (
                    <FaCheck size={20} />
                  )}
                  <span className="text-sm font-medium">{submitMessage}</span>
                </motion.div>
              )}

              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="text-center py-12"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                      }}
                      className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center"
                    >
                      <FaCheck size={40} className="text-white" />
                    </motion.div>
                    <h4 className="font-heading text-2xl font-bold text-white mb-2">
                      Message Sent!
                    </h4>
                    <p className="text-text-secondary">
                      Thank you for reaching out. I'll get back to you soon!
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                    noValidate
                  >
                    <div className="grid sm:grid-cols-2 gap-6">
                      <motion.div
                        className="relative"
                        whileFocus={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        <label className="block text-sm font-medium text-text-secondary mb-2">
                          Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              [e.target.name]: e.target.value,
                            });
                            if (errors.name) setErrors({ ...errors, name: "" });
                          }}
                          className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent-primary/20 transition-all duration-300 ${
                            errors.name
                              ? "border-red-500/50 focus:border-red-500"
                              : "border-white/10 focus:border-accent-primary/50"
                          }`}
                          placeholder="Your Name"
                        />
                        {errors.name && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute -bottom-5 left-0 text-xs text-red-400 flex items-center gap-1"
                          >
                            <FaExclamationCircle size={10} />
                            {errors.name}
                          </motion.p>
                        )}
                      </motion.div>
                      <motion.div
                        className="relative"
                        whileFocus={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        <label className="block text-sm font-medium text-text-secondary mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              [e.target.name]: e.target.value,
                            });
                            if (errors.email)
                              setErrors({ ...errors, email: "" });
                          }}
                          className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent-primary/20 transition-all duration-300 ${
                            errors.email
                              ? "border-red-500/50 focus:border-red-500"
                              : "border-white/10 focus:border-accent-primary/50"
                          }`}
                          placeholder="your@email.com"
                        />
                        {errors.email && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute -bottom-5 left-0 text-xs text-red-400 flex items-center gap-1"
                          >
                            <FaExclamationCircle size={10} />
                            {errors.email}
                          </motion.p>
                        )}
                      </motion.div>
                    </div>

                    <motion.div
                      className="relative"
                      whileFocus={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <label className="block text-sm font-medium text-text-secondary mb-2">
                        Subject *
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            [e.target.name]: e.target.value,
                          });
                          if (errors.subject)
                            setErrors({ ...errors, subject: "" });
                        }}
                        className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent-primary/20 transition-all duration-300 ${
                          errors.subject
                            ? "border-red-500/50 focus:border-red-500"
                            : "border-white/10 focus:border-accent-primary/50"
                        }`}
                        placeholder="Project Inquiry"
                      />
                      {errors.subject && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute -bottom-5 left-0 text-xs text-red-400 flex items-center gap-1"
                        >
                          <FaExclamationCircle size={10} />
                          {errors.subject}
                        </motion.p>
                      )}
                    </motion.div>

                    <motion.div
                      className="relative"
                      whileFocus={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <label className="block text-sm font-medium text-text-secondary mb-2">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            [e.target.name]: e.target.value,
                          });
                          if (errors.message)
                            setErrors({ ...errors, message: "" });
                        }}
                        className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent-primary/20 transition-all duration-300 resize-none ${
                          errors.message
                            ? "border-red-500/50 focus:border-red-500"
                            : "border-white/10 focus:border-accent-primary/50"
                        }`}
                        placeholder="Tell me about your project..."
                      />
                      {errors.message && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute -bottom-5 left-0 text-xs text-red-400 flex items-center gap-1"
                        >
                          <FaExclamationCircle size={10} />
                          {errors.message}
                        </motion.p>
                      )}
                    </motion.div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full px-8 py-4 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-xl font-heading font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                      whileHover={!isSubmitting ? { scale: 1.02, y: -2 } : {}}
                      whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                    >
                      {isSubmitting ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        />
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          <FaPaperPlane />
                          Send Message
                        </span>
                      )}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="space-y-6"
          >
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.02, x: 5 }}
                className="glass rounded-2xl p-6 flex items-center gap-4 cursor-pointer transition-all duration-300 hover:bg-white/10 hover:border-accent-primary/30"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-accent-primary to-accent-secondary flex items-center justify-center flex-shrink-0">
                  <info.icon size={24} className="text-white" />
                </div>
                <div>
                  <p className="text-text-secondary text-sm mb-1">
                    {info.label}
                  </p>
                  {info.href ? (
                    <a
                      href={info.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-heading font-semibold text-white hover:text-accent-primary transition-colors"
                    >
                      {info.value}
                    </a>
                  ) : (
                    <p className="font-heading font-semibold text-white">
                      {info.value}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}

            <motion.div variants={itemVariants} className="pt-6">
              <h4 className="font-heading font-semibold text-white mb-4">
                Follow Me
              </h4>
              <div className="flex gap-4">
                <motion.a
                  href="https://github.com/UsamaAkbar727"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 glass rounded-xl flex items-center justify-center text-text-secondary hover:text-white hover:border-accent-primary/50 transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -3 }}
                >
                  <FaGithub size={20} />
                </motion.a>
                <motion.a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 glass rounded-xl flex items-center justify-center text-text-secondary hover:text-white hover:border-accent-primary/50 transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -3 }}
                >
                  <FaLinkedin size={20} />
                </motion.a>
                <motion.a
                  href="mailto:usamaakbarjaatt@gmail.com"
                  className="w-12 h-12 glass rounded-xl flex items-center justify-center text-text-secondary hover:text-white hover:border-accent-primary/50 transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -3 }}
                >
                  <FaEnvelope size={20} />
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
