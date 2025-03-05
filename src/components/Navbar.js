"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import { FaHome, FaFileAlt, FaEnvelope, FaChevronRight } from "react-icons/fa";
import { useTheme } from "@/contexts/ThemeContext";

export default function Navbar() {
  const { theme } = useTheme();
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

  // Initialize active link
  useEffect(() => {
    setActiveLink(window.location.pathname);
  }, []);

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
      <motion.nav
        style={{
          backgroundColor: scrolled ? theme.navBackground : "transparent",
          color: theme.navText,
        }}
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
          scrolled ? "py-4 shadow-lg backdrop-blur-md" : "py-6"
        }`}
      >
        <div className="max-w-[1440px] mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo with Name */}
          <Link href="/" className="group relative z-50">
            <div className="flex items-center space-x-3">
              <div
                className="relative overflow-hidden rounded-full border-2 transition-all duration-300 group-hover:scale-110"
                style={{ borderColor: theme.accent }}
              >
                <Image
                  src="/cartoon_me.webp"
                  alt="Michael Liav Logo"
                  width={40}
                  height={40}
                  className="rounded-full transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <span
                className="text-2xl md:text-3xl font-extrabold tracking-wide transition-all duration-300"
                style={{
                  color: theme.navText,
                }}
              >
                Michael Liav
              </span>
            </div>
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden relative z-50 menu-button p-2 rounded-full transition-colors duration-300"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            style={{
              backgroundColor: `${theme.accent}20`,
              color: theme.accent,
            }}
          >
            {menuOpen ? (
              <FiX className="text-2xl" />
            ) : (
              <FiMenu className="text-2xl" />
            )}
          </button>

          {/* Desktop Navigation Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            <ul className="flex space-x-8 uppercase mr-9 text-base font-semibold tracking-wide">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center space-x-2 py-2 px-3 rounded-lg transition-all duration-300 relative nav-link"
                    onClick={() => setActiveLink(link.href)}
                    style={{
                      color:
                        activeLink === link.href ? theme.accent : theme.navText,
                    }}
                  >
                    {link.icon}
                    <span>{link.label}</span>
                    {activeLink === link.href && (
                      <motion.span
                        layoutId="activeIndicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5"
                        style={{ backgroundColor: theme.accent }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-4/5 max-w-sm shadow-2xl mobile-menu overflow-y-auto z-50"
            style={{ backgroundColor: theme.navBackground }}
          >
            <div className="flex flex-col h-full">
              {/* Mobile Menu Header */}
              <div
                className="flex items-center justify-between px-4 py-6 sm:p-6 border-b"
                style={{ borderColor: theme.borderColor }}
              >
                <Link href="/" onClick={() => setMenuOpen(false)}>
                  <div className="flex items-center space-x-3">
                    <Image
                      src="/cartoon_me.webp"
                      alt="Michael Liav Logo"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <span
                      className="text-xl font-bold"
                      style={{ color: theme.navText }}
                    >
                      Michael Liav
                    </span>
                  </div>
                </Link>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="p-2 rounded-full"
                  style={{
                    backgroundColor: theme.cardBackground,
                    color: theme.navText,
                  }}
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
                        className="flex items-center space-x-4 px-4 py-3 rounded-lg transition-all duration-300"
                        style={{
                          backgroundColor:
                            activeLink === link.href
                              ? `${theme.accent}20`
                              : "transparent",
                          color:
                            activeLink === link.href
                              ? theme.accent
                              : theme.navText,
                        }}
                        onClick={() => {
                          setActiveLink(link.href);
                          setMenuOpen(false);
                        }}
                      >
                        {link.icon}
                        <span className="font-medium">{link.label}</span>
                        <motion.div
                          className="ml-auto"
                          animate={{
                            x: activeLink === link.href ? 0 : -10,
                            opacity: activeLink === link.href ? 1 : 0,
                          }}
                        >
                          <FaChevronRight />
                        </motion.div>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
