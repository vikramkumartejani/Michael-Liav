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
          :root {
            --theme-background: ${theme.background};
            --theme-text: ${theme.text};
            --theme-text-secondary: ${theme.textSecondary};
            --theme-accent: ${theme.accent};
            --theme-nav-text: ${theme.navText};
            --theme-nav-bg: ${theme.navBackground};
            --theme-card-bg: ${theme.cardBackground};
            --theme-border: ${theme.borderColor};
          }

          body {
            background-color: var(--theme-background);
            color: var(--theme-text);
          }

          .nav-link {
            color: var(--theme-nav-text);
          }

          .card {
            background-color: var(--theme-card-bg);
            border-color: var(--theme-border);
          }

          .accent-text {
            color: var(--theme-accent);
          }

          .secondary-text {
            color: var(--theme-text-secondary);
          }

          /* Global text color classes */
          h1,
          h2,
          h3,
          h4,
          h5,
          h6 {
            color: var(--theme-text);
          }

          p,
          span,
          div {
            color: inherit;
          }

          /* Override any hardcoded text colors */
          [class*="text-gray"],
          [class*="text-slate"],
          [class*="text-black"],
          [class*="text-white"] {
            color: inherit;
          }

          /* Ensure links use theme colors */
          a:not(.nav-link):not([class*="bg-"]) {
            color: var(--theme-accent);
          }

          /* Card and section backgrounds */
          .bg-white,
          .bg-gray-50,
          .bg-gray-100 {
            background-color: var(--theme-card-bg);
          }
        `}</style>
        <Navbar />
        <main className="pt-24 flex-grow relative z-0">{children}</main>
        <Footer />
      </motion.div>
    </div>
  );
}
