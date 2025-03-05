"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { FaGithub, FaLinkedin, FaMedium } from "react-icons/fa";

export default function Home() {
  // Particle animation configuration
  const particles = Array.from({ length: 20 }).map((_, i) => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 4 + 3,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#01bf71] via-[#00a86b] to-[#09ace3] text-white">
      {/* Animated background particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[#09ace3] opacity-20"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, Math.random() * 100 - 50, 0],
              scale: [1, 1.5, 0.5, 1],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: particle.duration,
              repeat: Number.POSITIVE_INFINITY,
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
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Sharing Knowledge With Platform Engineers Worldwide
            </motion.h1>

            <motion.p
              className="mt-6 text-lg text-gray-100"
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
                className="px-8 py-3 bg-white text-[#01bf71] rounded-full font-medium hover:opacity-90 transition-all"
              >
                Read Articles
              </Link>
              <Link
                href="/contact"
                className="px-8 py-3 border-2 border-white text-white rounded-full font-medium hover:bg-white/10 transition-all"
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
              <Image
                src="/Platform_engineering.svg"
                alt="Platform Engineering Illustration"
                width={600}
                height={600}
                className="w-full h-auto"
                priority
              />
              {/* Glow effect */}
              <div className="absolute -inset-4 bg-[#00c6ad] opacity-20 blur-3xl -z-10 rounded-full"></div>
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
          <h2 className="text-4xl font-bold mb-6">
            Let Me <span className="text-white">Introduce</span> Myself
          </h2>
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-2/3">
              <p className="text-lg text-gray-100 mb-6">
                I'm a passionate{" "}
                <span className="text-white">
                  Platform Engineering Tech Lead
                </span>{" "}
                with a strong focus on developer experience, automation, and
                cloud-native technologies.
              </p>
              <p className="text-lg text-gray-100">
                I love{" "}
                <span className="text-white">
                  writing, mentoring, and sharing insights
                </span>{" "}
                to help others succeed in the field.
              </p>
            </div>
            <div className="md:w-1/3">
              <div className="relative">
                <Image
                  src="/cartoon_me.webp"
                  alt="Michael Liav"
                  width={300}
                  height={300}
                  className="rounded-full border-4 border-white"
                />
                <div className="absolute -inset-4 bg-[#00c6ad] opacity-20 blur-2xl -z-10 rounded-full"></div>
              </div>
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
          <h3 className="text-2xl font-bold mb-4">Find Me On</h3>
          <p className="text-gray-100 mb-6">
            Feel free to <span className="text-white">connect</span> with me
          </p>
          <div className="flex justify-center space-x-6">
            <motion.a
              href="https://github.com/michaelliav"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl text-white hover:text-[#00c6ad] transition-colors"
              whileHover={{ scale: 1.1 }}
            >
              <FaGithub />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/michael-liav-a5484b220"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl text-white hover:text-[#00c6ad] transition-colors"
              whileHover={{ scale: 1.1 }}
            >
              <FaLinkedin />
            </motion.a>
            <motion.a
              href="https://medium.com/@immichaelliav"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl text-white hover:text-[#00c6ad] transition-colors"
              whileHover={{ scale: 1.1 }}
            >
              <FaMedium />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
