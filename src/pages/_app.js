import "@/styles/globals.css";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import Layout from "@/components/Layout";
import { useState, useEffect } from "react";
import Loader from "@/components/Loader";
import { ThemeProvider } from "@/contexts/ThemeContext";
import ThemeSelector from "@/components/ThemeSelector";

// Font configurations
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export default function App({ Component, pageProps }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Show the loader only when the site is first loaded
    const isFirstLoad = sessionStorage.getItem("isFirstLoad");

    if (!isFirstLoad) {
      setTimeout(() => {
        setLoading(false);
        sessionStorage.setItem("isFirstLoad", "true"); // Prevents loader from showing again
      }, 2000);
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <ThemeProvider>
      <main
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans`}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </main>
    </ThemeProvider>
  );
}
