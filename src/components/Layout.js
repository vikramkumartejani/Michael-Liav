import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Layout({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="bg-primary text-white min-h-screen flex flex-col justify-between dark:bg-lightPrimary dark:text-lightTextPrimary"
    >
      <Navbar />
      <main className="pt-24 flex-grow">{children}</main>
      <Footer />
    </motion.div>
  );
}
