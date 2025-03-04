"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FaLinkedin, FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaCheck } from "react-icons/fa"

const email = "immichaelliav@gmail.com"
const linkedinUrl = "https://www.linkedin.com/in/michael-liav-a5484b220"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formError, setFormError] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setFormError("Please fill out all fields")
      return
    }

    if (!formData.email.includes("@")) {
      setFormError("Please enter a valid email address")
      return
    }

    // Clear any previous errors
    setFormError("")

    // Here you would typically send the form data to your backend
    // For now, we'll just simulate a successful submission
    setFormSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormSubmitted(false)
      setFormData({
        name: "",
        email: "",
        message: "",
      })
    }, 3000)
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  }

  const cardVariants = {
    initial: { scale: 1, y: 0 },
    hover: {
      scale: 1.05,
      y: -5,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15,
      },
    },
  }

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  }

  // Floating animation for decorative elements
  const floatingAnimation = {
    y: [0, -15, 0],
    transition: {
      duration: 6,
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "reverse",
      ease: "easeInOut",
    },
  }

  return (
    <div className="relative min-h-screen py-12 sm:py-16 md:py-20 bg-primary text-white transition-colors duration-300 dark:bg-lightPrimary dark:text-lightTextPrimary overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 rounded-full bg-highlight/10 dark:bg-lightHighlight/10 blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-accent/10 dark:bg-lightAccent/10 blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 18,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-6">
        <motion.div initial="hidden" animate="visible" variants={containerVariants} className="max-w-[1200px] mx-auto">
          {/* Header Section */}
          <motion.div variants={itemVariants} className="text-center mb-10 sm:mb-16">
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 sm:mb-6 tracking-tight"
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%"],
              }}
              transition={{
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
              style={{
                backgroundImage: "linear-gradient(90deg, #24c6dc, #5BB6AF)",
                backgroundSize: "200%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Let's Connect
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-textSecondary dark:text-lightTextSecondary max-w-2xl mx-auto leading-relaxed px-4"
            >
              Whether you're looking for collaboration, advice, or just want to say hi, I'm always happy to connect.
              Feel free to reach out to me directly.
            </motion.p>
          </motion.div>

          {/* Main Content - Split Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Contact Information */}
            <motion.div variants={itemVariants} className="space-y-6 sm:space-y-8">
              <motion.h2
                variants={itemVariants}
                className="text-xl sm:text-2xl font-bold text-textPrimary dark:text-lightTextPrimary mb-4 sm:mb-6"
              >
                Get in Touch
              </motion.h2>

              {/* Contact Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <motion.a
                  href={`mailto:${email}`}
                  variants={cardVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center p-4 sm:p-6 bg-secondary/50 dark:bg-lightSecondary/50 rounded-xl backdrop-blur-sm border border-white/5 dark:border-black/5"
                >
                  <div className="p-2 sm:p-3 rounded-full bg-highlight/20 dark:bg-lightHighlight/20 mr-3 sm:mr-4 flex-shrink-0">
                    <FaEnvelope className="text-xl sm:text-2xl text-highlight dark:text-lightHighlight" />
                  </div>
                  <div>
                    <h3 className="font-medium text-textPrimary dark:text-lightTextPrimary text-sm sm:text-base">
                      Email
                    </h3>
                    <p className="text-xs sm:text-sm text-textSecondary dark:text-lightTextSecondary mt-0.5 sm:mt-1 break-all">
                      {email}
                    </p>
                  </div>
                </motion.a>

                <motion.a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={cardVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center p-4 sm:p-6 bg-secondary/50 dark:bg-lightSecondary/50 rounded-xl backdrop-blur-sm border border-white/5 dark:border-black/5"
                >
                  <div className="p-2 sm:p-3 rounded-full bg-highlight/20 dark:bg-lightHighlight/20 mr-3 sm:mr-4 flex-shrink-0">
                    <FaLinkedin className="text-xl sm:text-2xl text-highlight dark:text-lightHighlight" />
                  </div>
                  <div>
                    <h3 className="font-medium text-textPrimary dark:text-lightTextPrimary text-sm sm:text-base">
                      LinkedIn
                    </h3>
                    <p className="text-xs sm:text-sm text-textSecondary dark:text-lightTextSecondary mt-0.5 sm:mt-1">
                      Connect with me
                    </p>
                  </div>
                </motion.a>

                <motion.div
                  variants={cardVariants}
                  initial="initial"
                  whileHover="hover"
                  className="flex items-center p-4 sm:p-6 bg-secondary/50 dark:bg-lightSecondary/50 rounded-xl backdrop-blur-sm border border-white/5 dark:border-black/5 sm:col-span-2"
                >
                  <div className="p-2 sm:p-3 rounded-full bg-highlight/20 dark:bg-lightHighlight/20 mr-3 sm:mr-4 flex-shrink-0">
                    <FaMapMarkerAlt className="text-xl sm:text-2xl text-highlight dark:text-lightHighlight" />
                  </div>
                  <div>
                    <h3 className="font-medium text-textPrimary dark:text-lightTextPrimary text-sm sm:text-base">
                      Location
                    </h3>
                    <p className="text-xs sm:text-sm text-textSecondary dark:text-lightTextSecondary mt-0.5 sm:mt-1">
                      Available for remote work worldwide
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Availability Section */}
              <motion.div
                variants={itemVariants}
                className="mt-6 sm:mt-8 p-4 sm:p-6 bg-highlight/10 dark:bg-lightHighlight/10 rounded-xl backdrop-blur-sm"
              >
                <h3 className="text-lg sm:text-xl font-bold text-highlight dark:text-lightHighlight mb-2 sm:mb-3">
                  Current Availability
                </h3>
                <p className="text-sm sm:text-base text-textSecondary dark:text-lightTextSecondary">
                  I'm currently available for freelance projects, collaborations, and consulting work. My typical
                  response time is within 24-48 hours.
                </p>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={itemVariants}>
              <motion.h2
                variants={itemVariants}
                className="text-xl sm:text-2xl font-bold text-textPrimary dark:text-lightTextPrimary mb-4 sm:mb-6"
              >
                Send a Message
              </motion.h2>

              <AnimatePresence mode="wait">
                {formSubmitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-green-500/20 p-6 sm:p-8 rounded-xl flex flex-col items-center justify-center text-center h-[280px] sm:h-[350px]"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 10 }}
                      className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-green-500 flex items-center justify-center mb-4"
                    >
                      <FaCheck className="text-white text-xl sm:text-2xl" />
                    </motion.div>
                    <h3 className="text-lg sm:text-xl font-bold mb-2">Message Sent!</h3>
                    <p className="text-sm sm:text-base text-textSecondary dark:text-lightTextSecondary">
                      Thank you for reaching out. I'll get back to you as soon as possible.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4 sm:space-y-6 bg-secondary/30 dark:bg-lightSecondary/30 p-4 sm:p-6 md:p-8 rounded-xl backdrop-blur-sm border border-white/5 dark:border-black/5"
                  >
                    {formError && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3 bg-red-500/20 text-red-200 dark:text-red-500 rounded-lg text-xs sm:text-sm"
                      >
                        {formError}
                      </motion.div>
                    )}

                    <div>
                      <label
                        htmlFor="name"
                        className="block text-xs sm:text-sm font-medium text-textSecondary dark:text-lightTextSecondary mb-1"
                      >
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-primary/50 dark:bg-lightPrimary/50 text-textPrimary dark:text-lightTextPrimary border border-white/10 dark:border-black/10 focus:border-highlight dark:focus:border-lightHighlight outline-none transition-all text-sm sm:text-base"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-xs sm:text-sm font-medium text-textSecondary dark:text-lightTextSecondary mb-1"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-primary/50 dark:bg-lightPrimary/50 text-textPrimary dark:text-lightTextPrimary border border-white/10 dark:border-black/10 focus:border-highlight dark:focus:border-lightHighlight outline-none transition-all text-sm sm:text-base"
                        placeholder="john@example.com"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-xs sm:text-sm font-medium text-textSecondary dark:text-lightTextSecondary mb-1"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-primary/50 dark:bg-lightPrimary/50 text-textPrimary dark:text-lightTextPrimary border border-white/10 dark:border-black/10 focus:border-highlight dark:focus:border-lightHighlight outline-none transition-all resize-none text-sm sm:text-base"
                        placeholder="Your message here..."
                      />
                    </div>

                    <motion.button
                      type="submit"
                      variants={buttonVariants}
                      initial="initial"
                      whileHover="hover"
                      whileTap="tap"
                      className="w-full py-2.5 sm:py-3 px-4 sm:px-6 bg-highlight dark:bg-lightHighlight text-white rounded-lg font-medium flex items-center justify-center space-x-2 text-sm sm:text-base"
                    >
                      <span>Send Message</span>
                      <FaPaperPlane className="text-xs sm:text-sm" />
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Floating Decorative Elements - Hidden on small screens */}
      <div className="hidden sm:block">
        <motion.div
          className="absolute top-1/4 left-10 w-4 h-4 rounded-full bg-highlight dark:bg-lightHighlight opacity-70"
          animate={floatingAnimation}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-6 h-6 rounded-full bg-accent dark:bg-lightAccent opacity-70"
          animate={floatingAnimation}
          transition={{
            duration: 7,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.div
          className="absolute top-1/2 right-20 w-3 h-3 rounded-full bg-highlight dark:bg-lightHighlight opacity-70"
          animate={floatingAnimation}
          transition={{
            duration: 5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>
    </div>
  )
}

