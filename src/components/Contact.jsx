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

// Interactive animated vector graphic for a modern developer aesthetic
const GridSphere = () => {
  return (
    <div className="relative w-40 h-40 mx-auto select-none opacity-40 hover:opacity-80 transition-opacity duration-500 pointer-events-none hidden md:block">
      <svg className="w-full h-full animate-[spin_20s_linear_infinite]" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="0.8" fill="none" strokeDasharray="3 3" />
        <circle cx="50" cy="50" r="35" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="0.8" fill="none" />
        <ellipse cx="50" cy="50" rx="45" ry="15" stroke="rgba(182, 0, 168, 0.35)" strokeWidth="0.8" fill="none" />
        <ellipse cx="50" cy="50" rx="15" ry="45" stroke="rgba(118, 33, 176, 0.35)" strokeWidth="0.8" fill="none" />
        <line x1="50" y1="5" x2="50" y2="95" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="0.5" />
        <line x1="5" y1="50" x2="95" y2="50" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="0.5" />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[8px] font-mono tracking-widest text-[#B600A8]/60 animate-pulse">CONNECT</span>
      </div>
    </div>
  );
};

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
      color: "#B600A8",
    },
    {
      icon: FaMapMarkerAlt,
      label: "Primary Location",
      value: "Pakistan",
      href: null,
      color: "#8b5cf6",
    },
    {
      icon: FaGithub,
      label: "GitHub Handle",
      value: "Usama Akbar",
      href: "https://github.com/UsamaAkbar727",
      color: "#00E5FF",
    },
    {
      icon: FaLinkedin,
      label: "LinkedIn Profile",
      value: "Usama Akbar",
      href: "https://www.linkedin.com/in/usama-akbar-a070323a5",
      color: "#00FF66",
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
      console.log("Response status:", response.status);
      console.log("Response text:", response.text);

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
      console.error("Error object:", JSON.stringify(error, null, 2));
      console.error("Error status:", error.status);
      console.error("Error text:", error.text);

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
    <section id="contact" className="py-24 md:py-32 relative bg-[#0C0C0C] overflow-hidden">
      {/* Visual background blurred meshes & Animated Grid */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Animated Synthwave Grid */}
        <div className="absolute inset-0 opacity-[0.03] perspective-1000">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:4rem_4rem] [transform:rotateX(60deg)_translateY(-100px)_scale(2)] origin-top animate-[grid-move_15s_linear_infinite]" />
        </div>

        {/* Ambient Orbs */}
        <motion.div
          className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#B600A8]/20 rounded-full blur-[150px] mix-blend-screen"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#ec4899]/15 rounded-full blur-[150px] mix-blend-screen"
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#7621B0]/10 rounded-full blur-[150px] mix-blend-screen"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Section Header */}
        <FI delay={0} y={30} className="text-center mb-24">
          <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-white/[0.03] border border-white/10 text-xs sm:text-sm font-mono tracking-widest text-[#ec4899] uppercase mb-6 shadow-[0_0_30px_rgba(236,72,153,0.15)] backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#ec4899] animate-pulse shadow-[0_0_10px_#ec4899]"></span>
            Initialize Connection
          </div>
          <h2 className="font-kanit text-4xl sm:text-5xl lg:text-8xl font-black uppercase leading-none tracking-tighter text-white mb-6 relative inline-block">
            Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B600A8] via-[#ec4899] to-[#7621B0] drop-shadow-[0_0_30px_rgba(236,72,153,0.5)]">Touch</span>
            {/* High-tech brackets */}
            <span className="absolute -left-8 -top-4 text-[#ec4899]/30 font-light text-4xl hidden md:block">{"["}</span>
            <span className="absolute -right-8 -bottom-4 text-[#7621B0]/30 font-light text-4xl hidden md:block">{"]"}</span>
          </h2>
          <p className="text-[#D7E2EA]/50 max-w-2xl mx-auto mt-6 text-lg sm:text-xl font-light">
            {highlightText("Have a bold vision? Let's engineer the future together. Drop me a message and I'll get back to you at warp speed.")}
          </p>
        </FI>

        {/* Content Layout */}
        <div className="grid lg:grid-cols-12 gap-10 items-stretch w-full relative z-10">
          
          {/* LEFT COLUMN: Premium Info Panels & Vector Decor */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-8 h-full relative">
            {/* Background scanner line for left column */}
            <motion.div
              animate={{ top: ['0%', '100%', '0%'] }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              className="absolute left-0 w-1 h-24 bg-gradient-to-b from-transparent via-[#ec4899] to-transparent shadow-[0_0_15px_#ec4899] z-20 -translate-x-1/2 rounded-full hidden lg:block"
            />

            <FI delay={0.1} y={30} className="flex-grow flex flex-col justify-between h-full">
              <Tilt className="w-full h-full p-[2px] rounded-[2rem] md:rounded-[3rem] bg-gradient-to-b from-white/20 via-[#B600A8]/20 to-white/10 shadow-[0_0_50px_rgba(182,0,168,0.2)] group/tilt cursor-pointer">
                <div className="rounded-[calc(2rem-2px)] md:rounded-[2.9rem] p-6 sm:p-8 md:p-10 bg-[#0a0a0f]/90 backdrop-blur-3xl relative overflow-hidden flex flex-col justify-between h-full min-h-[400px] md:min-h-[500px]">
                  
                  {/* Animated Glow overlay inside card */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#B600A8]/20 via-transparent to-[#ec4899]/10 opacity-0 group-hover/tilt:opacity-100 transition-opacity duration-700 pointer-events-none z-0" />

                  {/* Corner tech accents */}
                  <div className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-white/10 group-hover/tilt:border-[#ec4899]/50 transition-colors duration-500" />
                  <div className="absolute bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 border-white/10 group-hover/tilt:border-[#7621B0]/50 transition-colors duration-500" />

                  <div className="space-y-10 relative z-10">
                    <div>
                      <h3 className="font-kanit text-3xl font-black text-white uppercase tracking-wider">
                        Direct <span className="text-[#ec4899]">Channels</span>
                      </h3>
                      <div className="w-12 h-1 bg-gradient-to-r from-[#B600A8] to-transparent mt-4 rounded-full" />
                    </div>

                    {/* Clean direct info nodes with mouse reactive backlights */}
                    <div className="space-y-5">
                      {contactInfo.map((info, idx) => (
                        <motion.a
                          key={idx}
                          href={info.href || undefined}
                          target={info.href ? "_blank" : undefined}
                          rel={info.href ? "noopener noreferrer" : undefined}
                          className={`flex items-center gap-4 sm:gap-5 p-3 sm:p-4 rounded-2xl border transition-all duration-500 relative group/item overflow-hidden ${
                            info.href ? "cursor-pointer" : "cursor-default"
                          }`}
                          style={{
                            borderColor: "rgba(255, 255, 255, 0.03)",
                            background: "rgba(255, 255, 255, 0.01)"
                          }}
                          whileHover={{ x: 10, backgroundColor: "rgba(255, 255, 255, 0.03)" }}
                        >
                          {/* Glow indicator backplate on card hover */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#ec4899]/5 to-transparent -translate-x-full group-hover/item:translate-x-full transition-transform duration-1000 ease-in-out" />

                          <div
                            className="w-14 h-14 rounded-xl flex items-center justify-center border text-white transition-all duration-500 relative group-hover/item:scale-110 shadow-lg"
                            style={{
                              background: `linear-gradient(135deg, ${info.color}15, ${info.color}35)`,
                              borderColor: `${info.color}30`,
                              boxShadow: `0 0 20px ${info.color}20`
                            }}
                          >
                            <info.icon size={22} style={{ color: info.color }} className="group-hover/item:animate-bounce" />
                          </div>
                          <div>
                            <p className="text-[10px] font-mono text-[#D7E2EA]/40 uppercase tracking-[0.2em] leading-none mb-2">
                              {info.label}
                            </p>
                            <p className="font-kanit font-medium text-white text-base sm:text-lg tracking-wide group-hover/item:text-transparent group-hover/item:bg-clip-text group-hover/item:bg-gradient-to-r group-hover/item:from-white group-hover/item:to-white/50 transition-all duration-300 break-all sm:break-normal">
                              {info.value}
                            </p>
                          </div>
                        </motion.a>
                      ))}
                    </div>
                  </div>

                  {/* Follow Me Block */}
                  <div className="pt-8 mt-8 border-t border-white/10 flex items-center justify-between gap-4 relative z-10">
                    <span className="text-xs font-kanit font-bold text-[#D7E2EA]/50 uppercase tracking-[0.3em]">
                      Follow Me
                    </span>
                    <div className="flex gap-4">
                      <Mg padding={30} strength={1.5}>
                        <motion.a
                          href="https://github.com/UsamaAkbar727"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-14 h-14 bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-center text-white/70 hover:text-white hover:bg-gradient-to-br hover:from-[#B600A8] hover:to-[#ec4899] hover:border-transparent transition-all duration-500 shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_rgba(236,72,153,0.5)] group/icon relative overflow-hidden"
                        >
                          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] bg-[length:250%_250%,100%_100%] bg-no-repeat [background-position:-100%_0,0_0] group-hover/icon:[background-position:200%_0,0_0] transition-[background-position] duration-1000" />
                          <FaGithub size={24} className="group-hover/icon:scale-110 transition-transform duration-300 relative z-10" />
                        </motion.a>
                      </Mg>
                      <Mg padding={30} strength={1.5}>
                        <motion.a
                          href="https://www.linkedin.com/in/usama-akbar-a070323a5"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-14 h-14 bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-center text-white/70 hover:text-white hover:bg-gradient-to-br hover:from-[#B600A8] hover:to-[#ec4899] hover:border-transparent transition-all duration-500 shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_rgba(236,72,153,0.5)] group/icon relative overflow-hidden"
                        >
                          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] bg-[length:250%_250%,100%_100%] bg-no-repeat [background-position:-100%_0,0_0] group-hover/icon:[background-position:200%_0,0_0] transition-[background-position] duration-1000" />
                          <FaLinkedin size={24} className="group-hover/icon:scale-110 transition-transform duration-300 relative z-10" />
                        </motion.a>
                      </Mg>
                    </div>
                  </div>
                </div>
              </Tilt>
            </FI>
          </div>

          {/* RIGHT COLUMN: Ultra-Premium Animated Form Panel */}
          <div className="lg:col-span-7 flex">
            <FI delay={0.2} y={30} className="w-full flex">
              <div className="w-full relative p-[2px] rounded-[2rem] md:rounded-[3rem] bg-gradient-to-br from-[#B600A8]/30 via-white/5 to-[#ec4899]/30 shadow-[0_0_50px_rgba(236,72,153,0.15)] group/formcontainer">
                {/* Moving border light effect */}
                <div className="absolute inset-0 rounded-[3rem] overflow-hidden">
                  <div className="absolute top-0 left-[-100%] w-full h-[2px] bg-gradient-to-r from-transparent via-[#ec4899] to-transparent animate-[shimmer_3s_infinite]" />
                  <div className="absolute bottom-0 right-[-100%] w-full h-[2px] bg-gradient-to-l from-transparent via-[#B600A8] to-transparent animate-[shimmer_3s_infinite_reverse]" />
                </div>

                <div className="rounded-[calc(2rem-2px)] md:rounded-[2.9rem] p-5 sm:p-8 md:p-12 border border-white/5 bg-[#0a0a0f]/90 backdrop-blur-3xl relative overflow-hidden flex flex-col w-full h-full">
                  
                  {/* Status Alerts */}
                  <AnimatePresence mode="wait">
                    {submitMessage && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, mb: 0 }}
                        animate={{ opacity: 1, height: "auto", mb: 24 }}
                        exit={{ opacity: 0, height: 0, mb: 0 }}
                        className={`overflow-hidden rounded-2xl`}
                      >
                        <div className={`p-5 flex items-center gap-4 relative z-10 border ${
                          submitMessage.includes("Failed")
                            ? "bg-red-500/10 border-red-500/30 text-red-400 shadow-[0_0_20px_rgba(239,68,68,0.2)]"
                            : "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.2)]"
                        }`}>
                          {submitMessage.includes("Failed") ? (
                            <FaExclamationCircle size={20} />
                          ) : (
                            <FaCheck size={20} />
                          )}
                          <span className="text-sm font-kanit font-medium tracking-wide">{submitMessage}</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <AnimatePresence mode="wait">
                    {isSubmitted ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="text-center py-20 flex-grow flex flex-col justify-center items-center z-10"
                      >
                        {/* High-tech success animation */}
                        <div className="relative w-32 h-32 mb-10 flex items-center justify-center">
                          <motion.div 
                            animate={{ rotate: 360, scale: [1, 1.1, 1] }} 
                            transition={{ rotate: { duration: 8, repeat: Infinity, ease: "linear" }, scale: { duration: 2, repeat: Infinity } }}
                            className="absolute inset-0 rounded-full border-2 border-dashed border-emerald-500/40" 
                          />
                          <div className="absolute inset-2 rounded-full border border-emerald-400/20" />
                          <div className="absolute inset-0 rounded-full blur-xl bg-emerald-500/30 animate-pulse" />
                          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-emerald-600 to-emerald-300 flex items-center justify-center shadow-[0_0_40px_rgba(16,185,129,0.6)] z-10">
                            <FaCheck size={36} className="text-white" />
                          </div>
                        </div>
                        <h4 className="font-kanit text-4xl font-black text-white uppercase tracking-wider mb-4 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]">
                          Transmission Successful
                        </h4>
                        <p className="text-lg text-[#D7E2EA]/60 max-w-md font-light">
                          Your message has been encrypted and delivered. I will decode it and respond shortly.
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
                              <label className="block text-xs font-kanit text-[#D7E2EA]/50 uppercase tracking-[0.2em] mb-3 transition-colors duration-300 group-focus-within/input:text-[#ec4899]">
                                Origin ID (Name)
                              </label>
                              <div className="relative">
                                {/* Gradient border glow effect */}
                                <div className="absolute -inset-[1px] bg-gradient-to-r from-[#B600A8] to-[#ec4899] rounded-2xl opacity-0 group-focus-within/input:opacity-100 transition-opacity duration-300 blur-[2px]" />
                                
                                <div className="relative flex items-center bg-[#0C0C0C]/90 rounded-2xl overflow-hidden border border-white/5 group-focus-within/input:border-transparent transition-colors duration-300">
                                  <div className="absolute left-5 text-[#D7E2EA]/30 group-focus-within/input:text-[#ec4899] transition-colors duration-300 z-10">
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
                                    className="w-full pl-12 sm:pl-14 pr-4 sm:pr-6 py-4 md:py-5 bg-transparent text-white placeholder-white/20 focus:outline-none text-sm sm:text-base font-light tracking-wide shadow-inner"
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
                                    className="absolute left-0 -bottom-6 text-xs text-red-400 flex items-center gap-1.5 font-kanit tracking-wide"
                                  >
                                    <FaExclamationCircle size={12} />
                                    {errors.name}
                                  </motion.p>
                                )}
                              </AnimatePresence>
                            </div>

                            {/* Email Field */}
                            <div className="relative group/input">
                              <label className="block text-xs font-kanit text-[#D7E2EA]/50 uppercase tracking-[0.2em] mb-3 transition-colors duration-300 group-focus-within/input:text-[#ec4899]">
                                Comms Link (Email)
                              </label>
                              <div className="relative">
                                <div className="absolute -inset-[1px] bg-gradient-to-r from-[#B600A8] to-[#ec4899] rounded-2xl opacity-0 group-focus-within/input:opacity-100 transition-opacity duration-300 blur-[2px]" />
                                <div className="relative flex items-center bg-[#0C0C0C]/90 rounded-2xl overflow-hidden border border-white/5 group-focus-within/input:border-transparent transition-colors duration-300">
                                  <div className="absolute left-5 text-[#D7E2EA]/30 group-focus-within/input:text-[#ec4899] transition-colors duration-300 z-10">
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
                                    className="w-full pl-12 sm:pl-14 pr-4 sm:pr-6 py-4 md:py-5 bg-transparent text-white placeholder-white/20 focus:outline-none text-sm sm:text-base font-light tracking-wide shadow-inner"
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
                                    className="absolute left-0 -bottom-6 text-xs text-red-400 flex items-center gap-1.5 font-kanit tracking-wide"
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
                            <label className="block text-xs font-kanit text-[#D7E2EA]/50 uppercase tracking-[0.2em] mb-3 transition-colors duration-300 group-focus-within/input:text-[#ec4899]">
                              Directive (Subject)
                            </label>
                            <div className="relative">
                              <div className="absolute -inset-[1px] bg-gradient-to-r from-[#B600A8] to-[#ec4899] rounded-2xl opacity-0 group-focus-within/input:opacity-100 transition-opacity duration-300 blur-[2px]" />
                              <div className="relative flex items-center bg-[#0C0C0C]/90 rounded-2xl overflow-hidden border border-white/5 group-focus-within/input:border-transparent transition-colors duration-300">
                                <div className="absolute left-5 text-[#D7E2EA]/30 group-focus-within/input:text-[#ec4899] transition-colors duration-300 z-10">
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
                                  className="w-full pl-12 sm:pl-14 pr-4 sm:pr-6 py-4 md:py-5 bg-transparent text-white placeholder-white/20 focus:outline-none text-sm sm:text-base font-light tracking-wide shadow-inner"
                                  placeholder="What's the mission?"
                                />
                              </div>
                            </div>
                            <AnimatePresence>
                              {errors.subject && (
                                <motion.p
                                  initial={{ opacity: 0, y: -5 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -5 }}
                                  className="absolute left-0 -bottom-6 text-xs text-red-400 flex items-center gap-1.5 font-kanit tracking-wide"
                                >
                                  <FaExclamationCircle size={12} />
                                  {errors.subject}
                                </motion.p>
                              )}
                            </AnimatePresence>
                          </div>

                          {/* Message Field */}
                          <div className="relative group/input">
                            <label className="block text-xs font-kanit text-[#D7E2EA]/50 uppercase tracking-[0.2em] mb-3 transition-colors duration-300 group-focus-within/input:text-[#ec4899]">
                              Payload (Message)
                            </label>
                            <div className="relative">
                              <div className="absolute -inset-[1px] bg-gradient-to-r from-[#B600A8] to-[#ec4899] rounded-2xl opacity-0 group-focus-within/input:opacity-100 transition-opacity duration-300 blur-[2px]" />
                              <div className="relative flex bg-[#0C0C0C]/90 rounded-2xl overflow-hidden border border-white/5 group-focus-within/input:border-transparent transition-colors duration-300">
                                <div className="absolute left-5 top-6 text-[#D7E2EA]/30 group-focus-within/input:text-[#ec4899] transition-colors duration-300 z-10">
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
                                  className="w-full pl-12 sm:pl-14 pr-4 sm:pr-6 py-4 md:py-6 bg-transparent text-white placeholder-white/20 focus:outline-none text-sm sm:text-base font-light tracking-wide resize-none shadow-inner"
                                  placeholder="Detail the parameters of your project..."
                                />
                              </div>
                            </div>
                            <AnimatePresence>
                              {errors.message && (
                                <motion.p
                                  initial={{ opacity: 0, y: -5 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -5 }}
                                  className="absolute left-0 -bottom-6 text-xs text-red-400 flex items-center gap-1.5 font-kanit tracking-wide"
                                >
                                  <FaExclamationCircle size={12} />
                                  {errors.message}
                                </motion.p>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>

                        <div className="pt-8 w-full flex justify-end">
                          <Mg padding={40} strength={1.5} className="w-full sm:w-auto">
                            <motion.button
                              type="submit"
                              disabled={isSubmitting}
                              className="w-full sm:w-auto px-8 md:px-12 py-4 md:py-6 bg-gradient-to-r from-[#B600A8] via-[#ec4899] to-[#7621B0] rounded-2xl font-kanit font-black uppercase text-sm tracking-[0.2em] text-white shadow-[0_0_40px_rgba(182,0,168,0.4)] hover:shadow-[0_0_60px_rgba(236,72,153,0.6)] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 md:gap-4 relative overflow-hidden group/btn"
                              whileHover={!isSubmitting ? { scale: 1.05 } : {}}
                              whileTap={!isSubmitting ? { scale: 0.95 } : {}}
                            >
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-[150%] group-hover/btn:translate-x-[150%] transition-transform duration-1000 ease-in-out pointer-events-none" />

                              {isSubmitting ? (
                                <motion.div
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                  className="inline-block w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                                />
                              ) : (
                                <>
                                  <FaPaperPlane size={18} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-300" />
                                  <span>Transmit</span>
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
