"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaLinkedin, FaMedium, FaGithub, FaArrowUp } from "react-icons/fa";

const linkedinUrl = "https://www.linkedin.com/in/michael-liav-a5484b220";
const mediumUrl = "https://medium.com/@immichaelliav";
const githubUrl = "https://github.com/michaelliav";

export default function Footer() {
  const [visible, setVisible] = useState(false);

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisible = () => {
      const scrolled = document.documentElement.scrollTop;
      if (scrolled > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisible);
    return () => window.removeEventListener("scroll", toggleVisible);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Animation variants
  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const socialIconVariants = {
    initial: { y: 0, opacity: 1 },
    hover: {
      y: -5,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  };

  const arrowVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  };

  return (
    <motion.footer
      initial="hidden"
      animate="visible"
      variants={footerVariants}
      className="relative  text-white py-6 mt-16 transition-colors duration-300 dark:bg-lightPrimary dark:text-lightTextPrimary border-t border-gray-800/30 dark:border-gray-200/10"
    >
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center px-4 sm:px-6 lg:px-8">
        {/* Copyright */}
        <motion.div
          className="flex flex-col items-center md:items-start"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-sm font-medium text-textPrimary dark:text-lightTextPrimary mb-1">
            Michael Liav
          </p>
          <p className="text-sm text-textSecondary dark:text-lightTextSecondary">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </motion.div>

        {/* Social Links */}
        <div className="flex space-x-6 mt-6 md:mt-0">
          <motion.a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl text-textSecondary dark:text-lightTextSecondary hover:text-highlight dark:hover:text-lightHighlight p-2 rounded-full bg-white/5 hover:bg-white/10"
            aria-label="LinkedIn"
            variants={socialIconVariants}
            initial="initial"
            whileHover="hover"
            whileTap={{ scale: 0.95 }}
          >
            <FaLinkedin />
          </motion.a>
          <motion.a
            href={mediumUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl text-textSecondary dark:text-lightTextSecondary hover:text-highlight dark:hover:text-lightHighlight p-2 rounded-full bg-white/5 hover:bg-white/10"
            aria-label="Medium"
            variants={socialIconVariants}
            initial="initial"
            whileHover="hover"
            whileTap={{ scale: 0.95 }}
          >
            <FaMedium />
          </motion.a>
          <motion.a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl text-textSecondary dark:text-lightTextSecondary hover:text-highlight dark:hover:text-lightHighlight p-2 rounded-full bg-white/5 hover:bg-white/10"
            aria-label="GitHub"
            variants={socialIconVariants}
            initial="initial"
            whileHover="hover"
            whileTap={{ scale: 0.95 }}
          >
            <FaGithub />
          </motion.a>
        </div>
      </div>

      {/* Back to top arrow with framer-motion */}
      <AnimatePresence>
        {visible && (
          <motion.button
            onClick={scrollToTop}
            className="fixed bottom-5 sm:bottom-14 right-5 sm:right-8 p-3 rounded-full bg-highlight dark:bg-lightHighlight text-white shadow-lg"
            aria-label="Back to top"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            variants={arrowVariants}
            whileHover="hover"
            whileTap={{ scale: 0.9 }}
          >
            <FaArrowUp />
          </motion.button>
        )}
      </AnimatePresence>
    </motion.footer>
  );
}
