import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ThemeSelector from "@/components/ThemeSelector";
import { useTheme } from "@/contexts/ThemeContext";

export default function Layout({ children }) {
  const { theme, changeTheme } = useTheme();

  return (
    <div className="relative">
      <ThemeSelector currentTheme={theme} onThemeChange={changeTheme} />

      {/* Liquid Background Gradient */}
      <div
        className="fixed inset-0 transition-opacity duration-1000"
        style={{
          background: `radial-gradient(circle at 50% 50%, 
            ${theme.accent}20 0%, 
            ${theme.background}60 25%, 
            ${theme.background}90 50%, 
            ${theme.background} 100%
          )`,
          opacity: 0.8,
          zIndex: -1,
        }}
      />

      {/* Animated Gradient Overlay */}
      <div
        className="fixed inset-0 transition-opacity duration-1000"
        style={{
          background: `linear-gradient(
            45deg,
            ${theme.accent}10 0%,
            ${theme.background}30 25%,
            ${theme.accent}20 50%,
            ${theme.background}30 75%,
            ${theme.accent}10 100%
          )`,
          opacity: 0.4,
          zIndex: -1,
          animation: "gradientShift 15s ease infinite",
        }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        style={{
          backgroundColor:
            theme.gradient === "none" ? theme.background : undefined,
          color: theme.text,
        }}
        className={`min-h-screen flex flex-col justify-between relative z-0 transition-colors duration-300 ${
          theme.gradient !== "none" ? `bg-gradient-to-br ${theme.gradient}` : ""
        }`}
      >
        <style jsx global>{`
          @keyframes gradientShift {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }

          :root {
            --theme-background: ${theme.background};
            --theme-text: ${theme.text};
            --theme-text-secondary: ${theme.textSecondary};
            --theme-accent: ${theme.accent};
            --theme-nav-text: ${theme.navText};
            --theme-nav-bg: ${theme.navBackground};
            --theme-card-bg: ${theme.cardBackground};
            --theme-border: ${theme.borderColor};
            --theme-card-text: ${theme.cardText};
            --theme-button-text: ${theme.buttonText};
            --theme-icon-text: ${theme.iconText};
            --theme-heading-text: ${theme.headingText};
            --theme-paragraph-text: ${theme.paragraphText};
            --theme-section-text: ${theme.sectionText};
          }

          /* Reset all text colors to inherit from parent */
          * {
            color: inherit;
          }

          /* Base styles */
          body {
            background-color: var(--theme-background);
            color: var(--theme-text);
          }

          /* Only force black text on paragraphs in Classic theme */
          ${theme.name === "Classic"
            ? `
            p:not(.vertical-timeline-element *), .paragraph:not(.vertical-timeline-element *), [class*="text-white"]:not(.vertical-timeline-element *), [class*="text-gray"]:not(.vertical-timeline-element *), [class*="text-slate"]:not(.vertical-timeline-element *) {
              color: #2C3E50 !important;
            }
          `
            : ""}

          /* Force white text in timeline elements */
          .vertical-timeline-element,
          .vertical-timeline-element p,
          .vertical-timeline-element span,
          .vertical-timeline-element div {
            color: #ffffff !important;
          }

          /* Keep theme colors for headings */
          h1,
          h2,
          h3,
          h4,
          h5,
          h6 {
            color: var(--theme-accent);
          }

          /* Navigation */
          .nav-link {
            color: var(--theme-nav-text);
          }

          /* Links */
          a:not(.nav-link):not([class*="bg-"]) {
            color: var(--theme-accent);
          }

          /* Cards */
          .card {
            background-color: var(--theme-card-bg);
            border-color: var(--theme-border);
          }

          /* Accent text */
          .accent-text {
            color: var(--theme-accent);
          }

          /* Secondary text */
          .secondary-text {
            color: var(--theme-text-secondary);
          }

          /* Buttons with backgrounds should keep their text color */
          [class*="bg-"].button,
          [class*="bg-"].btn,
          .button[class*="bg-"],
          .btn[class*="bg-"] {
            color: #ffffff;
          }
        `}</style>
        <Navbar />
        <main className="pt-24 flex-grow relative z-0">{children}</main>
        <Footer />
      </motion.div>
    </div>
  );
}
