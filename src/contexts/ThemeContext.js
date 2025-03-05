import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

const themes = {
  Classic: {
    name: "Classic",
    colors: ["#FF6B6B", "#4ECDC4", "#95A5A6", "#2C3E50"],
    gradient: "none",
    accent: "#4ECDC4",
    background: "#FFFFFF",
    text: "#2C3E50",
    textSecondary: "#64748B",
    navText: "#2C3E50",
    navBackground: "#FFFFFF",
    cardBackground: "#F8FAFC",
    borderColor: "#E2E8F0",
  },
  Dark: {
    name: "Dark",
    colors: ["#FF6B6B", "#4ECDC4", "#666666", "#FFFFFF"],
    gradient: "from-[#1a1a1a] via-[#2d2d2d] to-[#333333]",
    accent: "#4ECDC4",
    background: "#1a1a1a",
    text: "#FFFFFF",
    textSecondary: "#94A3B8",
    navText: "#FFFFFF",
    navBackground: "#2d2d2d",
    cardBackground: "#2d2d2d",
    borderColor: "#404040",
  },
  "Koopa Beach": {
    name: "Koopa Beach",
    colors: ["#FFA500", "#87CEEB", "#1E3A8A", "#0A1F44"],
    gradient: "from-[#87CEEB] via-[#1E3A8A] to-[#0A1F44]",
    accent: "#FFA500",
    background: "#1E3A8A",
    text: "#FFFFFF",
    textSecondary: "#E2E8F0",
    navText: "#FFFFFF",
    navBackground: "#0A1F44",
    cardBackground: "#2563EB",
    borderColor: "#60A5FA",
  },
  "Choco Mountain": {
    name: "Choco Mountain",
    colors: ["#D2691E", "#FFC0CB", "#2C1810", "#8B4513"],
    gradient: "from-[#8B4513] via-[#2C1810] to-[#D2691E]",
    accent: "#FFC0CB",
    background: "#2C1810",
    text: "#FFFFFF",
    textSecondary: "#FFC0CB",
    navText: "#FFFFFF",
    navBackground: "#8B4513",
    cardBackground: "#3C2A20",
    borderColor: "#D2691E",
  },
  "Moo Moo Farm": {
    name: "Moo Moo Farm",
    colors: ["#FFB6C1", "#98FB98", "#008080", "#000080"],
    gradient: "from-[#98FB98] via-[#008080] to-[#000080]",
    accent: "#FFB6C1",
    background: "#008080",
    text: "#FFFFFF",
    textSecondary: "#98FB98",
    navText: "#FFFFFF",
    navBackground: "#000080",
    cardBackground: "#006666",
    borderColor: "#98FB98",
  },
  "Bowser's Castle": {
    name: "Bowser's Castle",
    colors: ["#800080", "#32CD32", "#808080", "#FFFFFF"],
    gradient: "from-[#800080] via-[#4B0082] to-[#2C0047]",
    accent: "#32CD32",
    background: "#4B0082",
    text: "#FFFFFF",
    textSecondary: "#32CD32",
    navText: "#FFFFFF",
    navBackground: "#2C0047",
    cardBackground: "#600080",
    borderColor: "#32CD32",
  },
  "Yoshi Valley": {
    name: "Yoshi Valley",
    colors: ["#90EE90", "#FF4500", "#808080", "#2F4F4F"],
    gradient: "from-[#90EE90] via-[#32CD32] to-[#228B22]",
    accent: "#FF4500",
    background: "#228B22",
    text: "#FFFFFF",
    textSecondary: "#90EE90",
    navText: "#FFFFFF",
    navBackground: "#2F4F4F",
    cardBackground: "#32CD32",
    borderColor: "#FF4500",
  },
  "Rainbow Road": {
    name: "Rainbow Road",
    colors: ["#00FFFF", "#00FF00", "#FF00FF", "#FF0000", "#FFFF00"],
    gradient: "from-[#FF0000] via-[#00FF00] to-[#0000FF]",
    accent: "#FFFF00",
    background: "#000000",
    text: "#FFFFFF",
    textSecondary: "#FFFF00",
    navText: "#FFFFFF",
    navBackground: "rgba(0, 0, 0, 0.8)",
    cardBackground: "rgba(0, 0, 0, 0.6)",
    borderColor: "#FF00FF",
  },
};

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("selectedTheme");
      return savedTheme ? JSON.parse(savedTheme) : themes.Classic;
    }
    return themes.Classic;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedTheme", JSON.stringify(theme));
      // Apply theme colors to root element
      const root = document.documentElement;
      root.style.setProperty("--theme-background", theme.background);
      root.style.setProperty("--theme-text", theme.text);
      root.style.setProperty("--theme-text-secondary", theme.textSecondary);
      root.style.setProperty("--theme-accent", theme.accent);
      root.style.setProperty("--theme-nav-text", theme.navText);
      root.style.setProperty("--theme-nav-bg", theme.navBackground);
      root.style.setProperty("--theme-card-bg", theme.cardBackground);
      root.style.setProperty("--theme-border", theme.borderColor);
    }
  }, [theme]);

  const changeTheme = (newTheme) => {
    setTheme(themes[newTheme.name]);
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
