import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { IoMdColorPalette } from "react-icons/io";
import { IoClose } from "react-icons/io5";

const themes = [
  {
    name: "Classic",
    colors: ["#FF6B6B", "#4ECDC4", "#95A5A6", "#2C3E50"],
    gradient: "from-[#FF6B6B] via-[#4ECDC4] to-[#2C3E50]",
    accent: "#4ECDC4",
  },
  {
    name: "Dark",
    colors: ["#FF6B6B", "#4ECDC4", "#666666", "#FFFFFF"],
    gradient: "from-[#1a1a1a] via-[#2d2d2d] to-[#333333]",
    accent: "#4ECDC4",
  },
  {
    name: "Koopa Beach",
    colors: ["#FFA500", "#87CEEB", "#1E3A8A", "#0A1F44"],
    gradient: "from-[#87CEEB] via-[#1E3A8A] to-[#0A1F44]",
    accent: "#FFA500",
  },
  {
    name: "Choco Mountain",
    colors: ["#D2691E", "#FFC0CB", "#2C1810", "#8B4513"],
    gradient: "from-[#8B4513] via-[#2C1810] to-[#D2691E]",
    accent: "#FFC0CB",
  },
  {
    name: "Moo Moo Farm",
    colors: ["#FFB6C1", "#98FB98", "#008080", "#000080"],
    gradient: "from-[#98FB98] via-[#008080] to-[#000080]",
    accent: "#FFB6C1",
  },
  {
    name: "Bowser's Castle",
    colors: ["#800080", "#32CD32", "#808080", "#FFFFFF"],
    gradient: "from-[#800080] via-[#4B0082] to-[#2C0047]",
    accent: "#32CD32",
  },
  {
    name: "Yoshi Valley",
    colors: ["#90EE90", "#FF4500", "#808080", "#2F4F4F"],
    gradient: "from-[#90EE90] via-[#32CD32] to-[#228B22]",
    accent: "#FF4500",
  },
  {
    name: "Rainbow Road",
    colors: ["#00FFFF", "#00FF00", "#FF00FF", "#FF0000", "#FFFF00"],
    gradient: "from-[#FF0000] via-[#00FF00] to-[#0000FF]",
    accent: "#FFFF00",
  },
];

export default function ThemeSelector({ currentTheme, onThemeChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSelector = () => setIsOpen(!isOpen);

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* Theme Toggle Button */}
      <motion.button
        onClick={toggleSelector}
        className="absolute top-4 right-4 p-2 rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <IoMdColorPalette className="w-6 h-6 text-gray-800" />
      </motion.button>

      {/* Theme Selector Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm"
              onClick={toggleSelector}
            />

            {/* Panel */}
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full bg-white shadow-lg overflow-hidden"
            >
              <div className="max-w-7xl mx-auto p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-display font-bold text-gray-800">
                    Select Theme
                  </h2>
                  <button
                    onClick={toggleSelector}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <IoClose className="w-6 h-6 text-gray-600" />
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
                  {themes.map((theme) => (
                    <motion.button
                      key={theme.name}
                      onClick={() => {
                        onThemeChange(theme);
                        setIsOpen(false);
                      }}
                      className={`relative p-4 rounded-xl border-2 transition-all ${
                        currentTheme?.name === theme.name
                          ? "border-blue-500 shadow-lg"
                          : "border-gray-200 hover:border-blue-300"
                      }`}
                      whileHover={{
                        scale: 1.05,
                        transition: { duration: 0.2 },
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="space-y-3">
                        <div className="flex gap-1 justify-center">
                          {theme.colors.map((color, i) => (
                            <motion.div
                              key={i}
                              className="w-4 h-4 rounded-full"
                              style={{ backgroundColor: color }}
                              whileHover={{ scale: 1.2 }}
                            />
                          ))}
                        </div>
                        <p className="text-xs font-medium text-gray-700 text-center truncate">
                          {theme.name}
                        </p>
                      </div>

                      {/* Selected indicator */}
                      {currentTheme?.name === theme.name && (
                        <motion.div
                          layoutId="selectedTheme"
                          className="absolute inset-0 border-2 border-blue-500 rounded-xl"
                          initial={false}
                          transition={{
                            type: "spring",
                            bounce: 0.2,
                            duration: 0.6,
                          }}
                        />
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
