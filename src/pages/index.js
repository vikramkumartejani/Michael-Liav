"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { FaGithub, FaLinkedin, FaMedium } from "react-icons/fa";
import { useTheme } from "@/contexts/ThemeContext";

export default function Home() {
  const { theme } = useTheme();

  // Enhanced particle animation configuration
  const particles = Array.from({ length: 30 }).map((_, i) => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    duration: Math.random() * 6 + 4,
  }));

  return (
    <div className="min-h-screen">
      {/* Animated background particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              backgroundColor: theme.colors[i % theme.colors.length],
              opacity: 0.2,
            }}
            animate={{
              x: [0, Math.random() * 200 - 100],
              y: [0, Math.random() * 200 - 100],
              scale: [1, 1.5, 0.5, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="max-w-[1440px] w-full mx-auto px-6 md:px-8 py-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Column: Text Content */}
          <div className="lg:w-1/2">
            <motion.h1
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              style={{ color: theme.accent }}
            >
              Sharing Knowledge With Platform Engineers Worldwide
            </motion.h1>

            <motion.p
              className="mt-6 text-lg text-white/90 font-mono"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Michael Liav Platform Engineering Tech Lead | Speaker | Mentor
            </motion.p>

            <motion.div
              className="mt-8 flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Link
                href="/articles"
                className="px-8 py-3 rounded-full font-medium transition-all"
                style={{ backgroundColor: theme.accent, color: "#000000" }}
              >
                Read Articles
              </Link>
              <Link
                href="/contact"
                className="px-8 py-3 rounded-full font-medium transition-all border-2"
                style={{ borderColor: theme.accent, color: theme.accent }}
              >
                Contact
              </Link>
            </motion.div>
          </div>

          {/* Right Column: Illustration */}
          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="relative">
              <motion.div
                className="relative z-10"
                animate={{ y: [-10, 10] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
              >
                <Image
                  src="/Platform_engineering.svg"
                  alt="Platform Engineering Illustration"
                  width={600}
                  height={600}
                  className="w-full h-auto"
                  priority
                />
              </motion.div>
              {/* Animated glow effect */}
              <motion.div
                className="absolute -inset-4 opacity-50 blur-3xl -z-10 rounded-full"
                style={{ backgroundColor: theme.accent }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* About Section */}
        <motion.div
          className="mt-20 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-display font-bold mb-6">
            Let Me <span style={{ color: theme.accent }}>Introduce</span> Myself
          </h2>
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-2/3">
              <p className="text-lg text-white/90 mb-6 font-mono">
                I'm a passionate{" "}
                <span style={{ color: theme.accent }}>
                  Platform Engineering Tech Lead
                </span>{" "}
                with a strong focus on developer experience, automation, and
                cloud-native technologies.
              </p>
              <p className="text-lg text-white/90 font-mono">
                I love{" "}
                <span style={{ color: theme.accent }}>
                  writing, mentoring, and sharing insights
                </span>{" "}
                to help others succeed in the field.
              </p>
            </div>
            <div className="md:w-1/3">
              <motion.div
                className="relative"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div
                  className="relative z-10"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  }}
                >
                  <Image
                    src="/cartoon_me.webp"
                    alt="Michael Liav"
                    width={300}
                    height={300}
                    className="rounded-full border-4"
                    style={{ borderColor: theme.accent }}
                  />
                </motion.div>
                {/* Animated background effect */}
                <motion.div
                  className="absolute -inset-4 blur-2xl -z-10 rounded-full"
                  style={{ backgroundColor: theme.accent }}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.4, 0.2],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Social Links */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-display font-bold mb-4">Find Me On</h3>
          <p className="text-white/90 mb-6 font-mono">
            Feel free to <span style={{ color: theme.accent }}>connect</span>{" "}
            with me
          </p>
          <div className="flex justify-center space-x-6">
            {[
              { icon: FaGithub, href: "https://github.com/michaelliav" },
              {
                icon: FaLinkedin,
                href: "https://www.linkedin.com/in/michael-liav-a5484b220",
              },
              { icon: FaMedium, href: "https://medium.com/@immichaelliav" },
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-3xl transition-colors"
                style={{ color: "white" }}
                whileHover={{
                  scale: 1.2,
                  rotate: [0, -10, 10, 0],
                  color: theme.accent,
                }}
                transition={{ duration: 0.3 }}
              >
                <social.icon />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
