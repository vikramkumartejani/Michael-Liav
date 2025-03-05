"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import {
  FaAws,
  FaPython,
  FaJs,
  FaGithub,
  FaSlack,
  FaCode,
  FaTerminal,
  FaLinkedin,
  FaMedium,
} from "react-icons/fa";
import {
  SiKubernetes,
  SiBackstage,
  SiArgo,
  SiMacos,
  SiDocker,
  SiTerraform,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

// Liquid Card component for tools and skills
const LiquidCard = ({ icon: Icon, name, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Create unique animation patterns based on index
  const getAnimationPattern = (idx) => {
    // Different seed values for variety
    const seeds = [
      [
        "30% 70% 70% 30% / 30% 30% 70% 70%",
        "60% 40% 30% 70% / 50% 60% 40% 50%",
        "40% 60% 70% 30% / 40% 40% 60% 60%",
      ],
      [
        "50% 50% 40% 60% / 40% 30% 70% 60%",
        "30% 70% 70% 30% / 50% 60% 40% 50%",
        "60% 40% 50% 50% / 40% 40% 60% 60%",
      ],
      [
        "40% 60% 60% 40% / 60% 30% 70% 40%",
        "50% 50% 40% 60% / 30% 60% 40% 70%",
        "30% 70% 60% 40% / 50% 40% 60% 50%",
      ],
      [
        "60% 40% 30% 70% / 60% 40% 60% 40%",
        "40% 60% 50% 50% / 40% 60% 50% 50%",
        "50% 50% 40% 60% / 60% 40% 50% 50%",
      ],
      [
        "30% 70% 60% 40% / 50% 30% 70% 50%",
        "50% 50% 50% 50% / 50% 50% 50% 50%",
        "70% 30% 40% 60% / 40% 60% 50% 50%",
      ],
      [
        "50% 50% 30% 70% / 40% 60% 40% 60%",
        "40% 60% 40% 60% / 50% 30% 70% 50%",
        "60% 40% 50% 50% / 30% 70% 40% 60%",
      ],
    ];

    // Use modulo to cycle through patterns if we have more items than patterns
    const patternIndex = idx % seeds.length;
    return seeds[patternIndex];
  };

  const pattern = getAnimationPattern(index);

  // Different animation durations and delays based on index
  const duration = 3 + (index % 3); // 3, 4, or 5 seconds
  const delay = index * 0.2; // Staggered delays

  return (
    <motion.div
      className="relative w-full h-40 overflow-hidden"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.05, y: -5 }}
    >
      {/* Liquid Background with Gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-400 to-green-400 dark:from-blue-500 dark:to-green-500"
        animate={{
          borderRadius: pattern,
        }}
        transition={{
          duration: duration,
          delay: delay,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          ease: "easeInOut",
          paused: isHovered,
        }}
      />

      {/* Card Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center p-6">
        <Icon className="text-4xl sm:text-5xl text-white mb-3" />
        <span className="text-sm font-medium text-white">{name}</span>
      </div>
    </motion.div>
  );
};

export default function About() {
  const [isVisible, setIsVisible] = useState({});

  // Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible((prev) => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting,
          }));
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".observe-section").forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  const skillVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.4 },
    },
  };

  // Skills data
  const skillsData = [
    { icon: FaAws, name: "AWS" },
    { icon: SiKubernetes, name: "Kubernetes" },
    { icon: SiDocker, name: "Docker" },
    { icon: FaPython, name: "Python" },
    { icon: FaJs, name: "JavaScript" },
    { icon: SiBackstage, name: "Backstage" },
    { icon: SiArgo, name: "ArgoCD" },
    { icon: SiTerraform, name: "Terraform" },
  ];

  // Tools data
  const toolsData = [
    { icon: FaGithub, name: "GitHub" },
    { icon: VscVscode, name: "VS Code" },
    { icon: FaSlack, name: "Slack" },
    { icon: FaTerminal, name: "Terminal" },
    { icon: SiMacos, name: "macOS" },
    { icon: FaCode, name: "Code" },
  ];

  return (
    <div className="relative min-h-screen bg-primary text-textPrimary transition-colors duration-300 dark:bg-lightPrimary dark:text-lightTextPrimary overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-[#09ace3]/10 dark:bg-lightHighlight/10 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-accent/10 dark:bg-lightAccent/10 blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-16 sm:mb-24"
        >
          <motion.h1
            className="text-4xl sm:text-6xl font-extrabold text-[#09ace3] dark:text-lightHighlight pb-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Know Who I Am
          </motion.h1>
          <motion.div
            className="h-1 w-24 bg-[#09ace3] dark:bg-lightHighlight mx-auto mt-4 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </motion.div>

        {/* Main Section */}
        <div id="intro-section" className="observe-section">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isVisible["intro-section"] ? "visible" : "hidden"}
            className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16"
          >
            {/* Profile Image */}
            <motion.div
              variants={itemVariants}
              className="w-full lg:w-2/5 flex justify-center"
            >
              <div className="relative group">
                <div className="absolute inset-0 bg-[#09ace3] dark:bg-lightHighlight rounded-2xl blur opacity-50 group-hover:opacity-75 transition duration-500 transform group-hover:scale-105"></div>
                <div className="relative w-72 h-72 sm:w-[400px] sm:h-full rounded-2xl overflow-hidden border-4 border-[#09ace3] dark:border-lightHighlight shadow-xl">
                  <Image
                    src="/me.jpg"
                    alt="Michael Liav"
                    width={520}
                    height={520}
                    className="w-full h-full object-cover transition-transform duration-500 transform group-hover:scale-110"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-primary dark:bg-lightPrimary p-3 rounded-full shadow-lg border-2 border-[#09ace3] dark:border-lightHighlight">
                  <FaLinkedin className="text-2xl text-[#09ace3] dark:text-lightHighlight" />
                </div>
              </div>
            </motion.div>

            {/* Text Content */}
            <motion.div variants={itemVariants} className="w-full lg:w-3/5">
              <motion.div className="space-y-6">
                <motion.h2 className="text-3xl sm:text-4xl font-bold">
                  Hi Everyone, I am{" "}
                  <span className="text-[#09ace3] dark:text-lightHighlight">
                    Michael Liav
                  </span>
                  .
                </motion.h2>

                <motion.p className="text-lg text-textSecondary dark:text-lightTextSecondary leading-relaxed">
                  I am a{" "}
                  <span className="text-[#09ace3] dark:text-lightHighlight font-semibold">
                    Platform Engineering Tech Lead
                  </span>{" "}
                  with expertise in{" "}
                  <span className="text-[#09ace3] dark:text-lightHighlight font-semibold">
                    Internal Developer Portals, Cloud-Native Technologies,
                    Automation, and Infrastructure Scalability
                  </span>
                  .
                </motion.p>

                <motion.div className="bg-secondary/30 dark:bg-lightSecondary/50 p-6 rounded-xl">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <span className="text-2xl mr-2">🚀</span>
                    Beyond Engineering
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <span className="text-[#09ace3] dark:text-lightHighlight mr-3 text-xl">
                        ✦
                      </span>
                      <span>
                        Writing tech articles on{" "}
                        <span className="text-[#09ace3] dark:text-lightHighlight font-medium">
                          LinkedIn & Medium
                        </span>
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#09ace3] dark:text-lightHighlight mr-3 text-xl">
                        ✦
                      </span>
                      <span>
                        Mentoring engineers and{" "}
                        <span className="text-[#09ace3] dark:text-lightHighlight font-medium">
                          giving talks on DevOps & platform engineering
                        </span>
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#09ace3] dark:text-lightHighlight mr-3 text-xl">
                        ✦
                      </span>
                      <span>
                        Contributing to{" "}
                        <span className="text-[#09ace3] dark:text-lightHighlight font-medium">
                          open-source projects
                        </span>
                      </span>
                    </li>
                  </ul>
                </motion.div>

                <motion.div className="flex flex-wrap gap-3">
                  <a
                    href="/contact"
                    className="px-4 h-[50px] flex items-center justify-center bg-[#09ace3] dark:bg-lightHighlight text-textPrimary dark:text-lightPrimary rounded-lg font-medium hover:bg-opacity-90 transition-all transform hover:scale-105"
                  >
                    Contact Me
                  </a>
                  <a
                    href="#"
                    className="px-4 h-[50px] flex items-center justify-center border-2 border-[#09ace3] dark:border-lightHighlight text-[#09ace3] dark:text-lightHighlight rounded-lg font-medium hover:bg-[#09ace3]/10 dark:hover:bg-lightHighlight/10 transition-all transform hover:scale-105"
                  >
                    Download Resume
                  </a>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Professional Skillset - Updated with Liquid Cards */}
        <div id="skills-section" className="observe-section mt-24 sm:mt-32">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isVisible["skills-section"] ? "visible" : "hidden"}
            className="text-center"
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl sm:text-4xl font-bold text-[#09ace3] dark:text-lightHighlight mb-4"
            >
              Professional Skillset
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-textSecondary dark:text-lightTextSecondary max-w-2xl mx-auto mb-12"
            >
              Technologies and frameworks I specialize in to build scalable
              platform solutions
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8"
            >
              {skillsData.map((skill, index) => (
                <motion.div key={index} variants={skillVariants}>
                  <LiquidCard
                    icon={skill.icon}
                    name={skill.name}
                    index={index}
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Tools I Use - With Liquid Cards */}
        <div id="tools-section" className="observe-section mt-24 sm:mt-32">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isVisible["tools-section"] ? "visible" : "hidden"}
            className="text-center"
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl sm:text-4xl font-bold text-[#09ace3] dark:text-lightHighlight mb-4"
            >
              Tools I Use
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-textSecondary dark:text-lightTextSecondary max-w-2xl mx-auto mb-12"
            >
              My favorite tools and applications for maximum productivity
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8"
            >
              {toolsData.map((tool, index) => (
                <motion.div key={index} variants={skillVariants}>
                  <LiquidCard
                    icon={tool.icon}
                    name={tool.name}
                    index={index + skillsData.length}
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Connect With Me */}
        <div id="connect-section" className="observe-section mt-24 sm:mt-32">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isVisible["connect-section"] ? "visible" : "hidden"}
            className="bg-secondary/30 dark:bg-lightSecondary/50 rounded-2xl p-8 sm:p-12 text-center"
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl sm:text-4xl font-bold text-[#09ace3] dark:text-lightHighlight mb-6"
            >
              Let's Connect
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-textSecondary dark:text-lightTextSecondary max-w-2xl mx-auto mb-8"
            >
              Feel free to reach out for collaborations or just a friendly chat
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap justify-center gap-4"
            >
              {[
                {
                  icon: FaLinkedin,
                  name: "LinkedIn",
                  bgColor: "bg-[#09ace3] dark:bg-lightHighlight",
                },
                {
                  icon: FaGithub,
                  name: "GitHub",
                  bgColor: "bg-secondary dark:bg-lightTextPrimary",
                },
                {
                  icon: FaMedium,
                  name: "Medium",
                  bgColor: "bg-accent dark:bg-lightAccent",
                },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-2 px-5 py-3 ${social.bgColor} text-textPrimary dark:text-lightPrimary rounded-full font-medium transition-all`}
                >
                  <social.icon className="text-xl" />
                  <span>{social.name}</span>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
