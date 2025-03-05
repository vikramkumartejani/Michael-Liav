"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FiSun, FiMoon, FiMenu, FiX } from "react-icons/fi";
import { FaHome, FaFileAlt, FaEnvelope, FaChevronRight } from "react-icons/fa";

export default function Navbar() {
  const [theme, setTheme] = useState("dark");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("/");

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Initialize theme from localStorage
  useEffect(() => {
    // Set active link based on current path
    setActiveLink(window.location.pathname);

    const storedTheme = localStorage.getItem("theme") || "dark";
    setTheme(storedTheme);
    document.documentElement.classList.toggle("dark", storedTheme === "dark");
  }, []);

  // Toggle between dark and light themes
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      const target = e.target;
      if (
        menuOpen &&
        !target.closest(".mobile-menu") &&
        !target.closest(".menu-button")
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  // Navigation links data
  const navLinks = [
    { href: "/", label: "Home", icon: <FaHome className="text-xl" /> },
    { href: "/about", label: "About", icon: <FaFileAlt className="text-xl" /> },
    {
      href: "/articles",
      label: "Articles",
      icon: <FaFileAlt className="text-xl" />,
    },
    {
      href: "/contact",
      label: "Contact",
      icon: <FaEnvelope className="text-xl" />,
    },
  ];

  return (
    <>
      {/* Overlay for mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40 lg:hidden"
            onClick={() => setMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Main Navbar */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "py-5 backdrop-blur-md bg-primary/90 dark:bg-lightPrimary/90 shadow-lg"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-[1440px] mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo with Name */}
          <Link href="/" className="group relative z-50">
            <div className="flex items-center space-x-3">
              <div className="relative overflow-hidden rounded-full border-2 border-highlight dark:border-lightHighlight transition-all duration-300 group-hover:scale-110">
                <Image
                  src="/cartoon_me.webp"
                  alt="Michael Liav Logo"
                  width={40}
                  height={40}
                  className="rounded-full transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <span
                className={`text-2xl md:text-3xl font-extrabold tracking-wide transition-all duration-300
                ${
                  scrolled
                    ? "text-textPrimary dark:text-lightTextPrimary"
                    : "text-white dark:text-lightTextPrimary"
                }
                group-hover:text-highlight dark:group-hover:text-lightHighlight`}
              >
                Michael Liav
              </span>
            </div>
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden relative z-50 menu-button p-2 rounded-full bg-highlight/20 dark:bg-lightHighlight/20 text-highlight dark:text-lightHighlight"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <FiX className="text-2xl" />
            ) : (
              <FiMenu className="text-2xl" />
            )}
          </button>

          {/* Desktop Navigation Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            <ul className="flex space-x-8 uppercase text-base font-semibold tracking-wide">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`flex items-center space-x-2 py-2 px-3 rounded-lg transition-all duration-300 relative
                      ${
                        activeLink === link.href
                          ? "text-highlight dark:text-lightHighlight"
                          : "text-textPrimary dark:text-lightTextPrimary hover:text-highlight dark:hover:text-lightHighlight"
                      }`}
                    onClick={() => setActiveLink(link.href)}
                  >
                    {link.icon}
                    <span>{link.label}</span>
                    {activeLink === link.href && (
                      <motion.span
                        layoutId="activeIndicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-highlight dark:bg-lightHighlight"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-3 rounded-full bg-secondary/80 dark:bg-lightSecondary/80 text-textPrimary dark:text-lightTextPrimary hover:bg-highlight/20 dark:hover:bg-lightHighlight/20 transition-all duration-300 hover:scale-110"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <FiSun className="text-accent text-xl" />
              ) : (
                <FiMoon className="text-lightHighlight text-xl" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Menu (Slide-in Sidebar) */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-4/5 max-w-sm bg-primary dark:bg-lightPrimary z-50 shadow-2xl mobile-menu overflow-y-auto"
          >
            <div className="flex flex-col h-full">
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between px-4 py-6 sm:p-6 border-b border-gray-700 dark:border-gray-200">
                <Link href="/" onClick={() => setMenuOpen(false)}>
                  <div className="flex items-center space-x-3">
                    <Image
                      src="/cartoon_me.webp"
                      alt="Michael Liav Logo"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <span className="text-xl font-bold text-textPrimary dark:text-lightTextPrimary">
                      Michael Liav
                    </span>
                  </div>
                </Link>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="p-2 rounded-full bg-secondary dark:bg-lightSecondary text-textPrimary dark:text-lightTextPrimary"
                  aria-label="Close menu"
                >
                  <FiX className="text-xl" />
                </button>
              </div>

              {/* Mobile Menu Links */}
              <div className="flex-1 py-6 px-4">
                <ul className="space-y-1">
                  {navLinks.map((link, index) => (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={link.href}
                        className={`flex items-center justify-between p-4 rounded-lg transition-all duration-300
                          ${
                            activeLink === link.href
                              ? "bg-highlight/20 dark:bg-lightHighlight/20 text-highlight dark:text-lightHighlight"
                              : "text-textPrimary dark:text-lightTextPrimary hover:bg-secondary dark:hover:bg-lightSecondary"
                          }`}
                        onClick={() => {
                          setActiveLink(link.href);
                          setMenuOpen(false);
                        }}
                      >
                        <div className="flex items-center space-x-3">
                          {link.icon}
                          <span className="text-lg font-medium">
                            {link.label}
                          </span>
                        </div>
                        <FaChevronRight
                          className={`transition-transform ${
                            activeLink === link.href
                              ? "text-highlight dark:text-lightHighlight"
                              : ""
                          }`}
                        />
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Mobile Menu Footer */}
              <div className="p-6 border-t border-gray-700 dark:border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-textSecondary dark:text-lightTextSecondary">
                    Switch Theme
                  </span>
                  <button
                    onClick={toggleTheme}
                    className="p-3 rounded-full bg-secondary dark:bg-lightSecondary text-textPrimary dark:text-lightTextPrimary"
                    aria-label="Toggle theme"
                  >
                    {theme === "dark" ? (
                      <FiSun className="text-accent text-xl" />
                    ) : (
                      <FiMoon className="text-lightHighlight text-xl" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
