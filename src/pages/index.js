"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "@/contexts/ThemeContext";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { useState, useEffect } from "react";

export default function Home() {
  const { theme } = useTheme();

  // Enhanced particle animation configuration
  const particles = Array.from({ length: 30 }).map((_, i) => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    duration: Math.random() * 6 + 4,
  }));

  const experiences = [
    {
      title: "Platform Tech Lead",
      company_name: "Migdal Group",
      icon: "/migdal.jpeg",
      iconBg: "#FFF",
      date: "Mar 2024 - Present",
      points: [
        "Assembled and led the dedicated platform team from inception, driving innovation and efficiency.",
        "Redefined AWS landing zone architecture to enhance security, scalability, and performance.",
        "Orchestrated the implementation of DevOps methodologies to optimize operational workflows.",
        "Collaborated with cross-functional teams to improve infrastructure automation and cloud governance.",
        "Designed and enforced best practices for CI/CD pipelines, monitoring, and cloud cost optimization.",
      ],
    },
    {
      title: "DevOps Lead",
      company_name: "Migdal Group",
      icon: "/migdal.jpeg",
      iconBg: "#FFF",
      date: "Mar 2023 - Mar 2024",
      points: [
        "Led the DevOps team, driving automation and operational excellence across cloud environments.",
        "Implemented CI/CD pipelines to accelerate software deployment and ensure code quality.",
        "Enhanced infrastructure security by applying best practices and compliance frameworks.",
        "Optimized cloud resource allocation to reduce costs while maintaining performance.",
        "Mentored junior engineers, fostering a culture of collaboration and continuous learning.",
      ],
    },
    {
      title: "DevOps Engineer",
      company_name: "Migdal Group",
      icon: "/migdal.jpeg",
      iconBg: "#FFF",
      date: "Oct 2022 - Mar 2023",
      points: [
        "Developed and maintained cloud-based infrastructure for high availability and scalability.",
        "Automated deployment processes using Terraform, Kubernetes, and CI/CD pipelines.",
        "Monitored system health and performance, proactively resolving incidents and issues.",
        "Collaborated with development teams to improve DevOps practices and code deployment strategies.",
      ],
    },
    {
      title: "DevOps Engineer",
      company_name: "Teva Pharmaceuticals",
      icon: "/teva.jpeg",
      iconBg: "#FFF",
      date: "June 2022 - Oct 2022",
      points: [
        "Managed Microsoft-based cloud environments, ensuring security, availability, and compliance.",
        "Led seamless migrations of enterprise applications to the cloud with minimal downtime.",
        "Administered and optimized enterprise-level infrastructure for performance and cost-efficiency.",
        "Developed automation scripts to streamline system administration and monitoring tasks.",
      ],
    },
    {
      title: "Business Owner",
      company_name: "MCL",
      icon: "/MCL.jpeg",
      iconBg: "#FFF",
      date: "Sep 2020 - Aug 2022",
      points: [
        "Founded and managed a successful business, overseeing all operational aspects.",
        "Developed business strategies to drive growth, improve profitability, and expand market reach.",
        "Led a team, managing recruitment, training, and day-to-day operations.",
        "Implemented digital transformation initiatives to optimize processes and customer engagement.",
      ],
    },
    {
      title: "DevOps Engineer",
      company_name: "Israel Defense Forces",
      icon: "/idf.jpeg",
      iconBg: "#FFF",
      date: "Mar 2018 - Sep 2019",
      points: [
        "Designed and maintained mission-critical infrastructure for secure and reliable operations.",
        "Implemented automation tools to enhance deployment efficiency and system monitoring.",
        "Worked closely with security teams to ensure compliance with military-grade cybersecurity standards.",
        "Optimized server performance and network reliability for large-scale operations.",
      ],
    },
  ];

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
                  repeat: Number.POSITIVE_INFINITY,
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
                  repeat: Number.POSITIVE_INFINITY,
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
                    repeat: Number.POSITIVE_INFINITY,
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
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Experience Timeline Section */}
        <div
          id="experience"
          className="mt-20 max-w-[1440px] mx-auto px-6 md:px-8"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-display font-bold mb-12 text-center"
          >
            My <span style={{ color: theme.accent }}>Professional</span> Journey
          </motion.h2>

          <VerticalTimeline>
            {experiences.map((experience, index) => (
              <ExperienceCard
                key={`experience-${index}`}
                experience={experience}
              />
            ))}
          </VerticalTimeline>
        </div>
        <style jsx global>{`
          .vertical-timeline::before {
            background: ${theme.accent};
          }
          .vertical-timeline-element-icon {
            box-shadow: 0 0 0 4px ${theme.accent},
              inset 0 2px 0 rgba(0, 0, 0, 0.08), 0 3px 0 4px rgba(0, 0, 0, 0.05);
          }
          @media (max-width: 767px) {
            .vertical-timeline-element-date {
              display: block !important;
              float: none !important;
              color: #fff;
              margin-top: 0.5rem;
              font-size: 0.8rem !important;
            }
          }
        `}</style>
      </div>
    </div>
  );
}

const ExperienceCard = ({ experience }) => {
  const { theme } = useTheme();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <VerticalTimelineElement
      contentStyle={{
        background: "#110c13",
        color: "#fff",
        borderRadius: "12px",
        padding: isMobile ? "1rem" : "1.5rem",
      }}
      contentArrowStyle={{
        borderRight: `7px solid ${theme.accent}`,
      }}
      date={
        <span
          style={{
            color: theme.name === "Classic" ? "black" : "inherit",
            WebkitTextFillColor: theme.name === "Classic" ? "black" : "inherit", // Extra override
          }}
        >
          {experience.date}
        </span>
      }
      iconStyle={{ background: experience.iconBg }}
      icon={
        <div className="flex justify-center items-center w-full h-full rounded-full">
          <Image
            src={experience.icon || "/placeholder.svg"}
            alt={experience.company_name}
            width={100}
            height={100}
            className="w-full h-full object-cover rounded-full"
          />
        </div>
      }
      lineColor={theme.accent}
    >
      <div>
        <h3
          className="text-[20px] md:text-[24px] leading-[1.2] font-display font-bold"
          style={{ color: theme.accent }}
        >
          {experience.title}
        </h3>
      </div>

      <ul className="mt-3 md:mt-5 list-disc ml-4 md:ml-5 space-y-1 md:space-y-2">
        {experience?.points?.map((point, index) => (
          <li
            key={`experience-point-${index}`}
            className="text-white/90 text-[12px] md:text-[14px] tracking-wider"
            dangerouslySetInnerHTML={{ __html: point }}
          ></li>
        ))}
      </ul>
    </VerticalTimelineElement>
  );
};
