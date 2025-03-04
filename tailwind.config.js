/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dark Mode Colors (Same as before)
        primary: "#111827",
        secondary: "#292929",
        textPrimary: "#ffffff",
        textSecondary: "#cccccc",
        highlight: "#24c6dc", // Blue for dark mode
        accent: "#ffcc00",

        lightPrimary: "#ffffff", // White Background
        lightSecondary: "#f4f4f4", // Light Gray for sections
        lightTextPrimary: "#1d3557", // Dark blue for strong contrast
        lightTextSecondary: "#264653", // Navy blue for secondary text
        lightHighlight: "#5BB6AF", // teal
        lightAccent: "#5BB6AF", // Softer orange for buttons/hover effects
      },
    },
  },
  plugins: [],
};
