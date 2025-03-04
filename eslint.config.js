/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: "#0a0f1e", // Deep dark blue
        secondary: "#1c2333", // Slightly lighter blue for contrast
        accent: "#00ffff", // Futuristic neon cyan
        textPrimary: "#ffffff", // Bright text for readability
        textSecondary: "#b0b3c1", // Soft gray for less emphasis
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      boxShadow: {
        futuristic: "0 4px 30px rgba(0, 255, 255, 0.3)",
      },
    },
  },
  plugins: [],
};
