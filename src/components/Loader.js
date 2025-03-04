import { motion } from "framer-motion";

export default function Loader() {
  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#1b1b1b] to-[#292929] text-white z-50"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      {/* Rotating Loader Ring */}
      <motion.div
        className="w-20 h-20 border-4 border-accent border-t-transparent rounded-full animate-spin mb-6"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
      />

      {/* Glowing Loading Text */}
      <motion.h1
        className="text-3xl font-bold text-accent"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        Loading...
      </motion.h1>
    </motion.div>
  );
}
