"use client";

import { useState, useEffect, useRef } from "react";
import { getMediumPosts } from "@/lib/fetchMedium";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaSearch,
  FaClock,
  FaCalendarAlt,
  FaArrowRight,
  FaChevronDown,
} from "react-icons/fa";

const CustomDropdown = ({
  selectedCategory,
  setSelectedCategory,
  categories,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Animation variants
  const dropdownVariants = {
    closed: {
      opacity: 0,
      y: -4,
      scale: 0.95,
      transition: {
        duration: 0.15,
        ease: "easeInOut",
      },
    },
    open: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  };

  const itemVariants = {
    closed: {
      opacity: 0,
      x: -10,
      transition: {
        duration: 0.1,
      },
    },
    open: (custom) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: custom * 0.05,
        type: "spring",
        stiffness: 250,
        damping: 20,
      },
    }),
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Dropdown Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2.5 sm:py-3 rounded-lg bg-gradient-to-r from-teal-400/90 to-teal-500/90 dark:from-teal-500/90 dark:to-teal-600/90 text-white shadow-md hover:shadow-lg border border-teal-300/30 dark:border-teal-600/30 outline-none transition-all flex items-center justify-between group"
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex items-center">
          <span className="text-sm font-medium">{selectedCategory}</span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="ml-2 text-white/80 group-hover:text-white"
        >
          <FaChevronDown className="text-xs" />
        </motion.div>
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={dropdownVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="absolute z-50 w-full bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-teal-200 dark:border-teal-800/30"
            style={{
              boxShadow:
                "0 10px 25px -5px rgba(20, 184, 166, 0.3), 0 8px 10px -6px rgba(20, 184, 166, 0.2)",
            }}
          >
            <div className=" py-1">
              {categories.map((category, index) => (
                <motion.button
                  key={category}
                  custom={index}
                  variants={itemVariants}
                  whileHover={{
                    x: 5,
                    backgroundColor: "rgba(20, 184, 166, 0.08)",
                    transition: { duration: 0.2 },
                  }}
                  className={`w-full text-left px-4 py-2.5 sm:py-3 text-sm transition-all relative group
                    ${
                      selectedCategory === category
                        ? "text-teal-600 dark:text-teal-300 font-medium"
                        : "text-gray-700 dark:text-gray-300"
                    }`}
                  onClick={() => {
                    setSelectedCategory(category);
                    setIsOpen(false);
                  }}
                >
                  <div className="flex items-center">
                    {selectedCategory === category && (
                      <motion.div
                        layoutId="activeCategory"
                        className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-teal-400 to-teal-500 dark:from-teal-500 dark:to-teal-400"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      />
                    )}
                    <span
                      className={`${
                        selectedCategory === category ? "pl-2" : "pl-3"
                      } transition-all`}
                    >
                      {category}
                    </span>
                  </div>

                  {selectedCategory === category && (
                    <motion.div
                      layoutId="activeBg"
                      className="absolute inset-0 bg-teal-50 dark:bg-teal-900/20 -z-10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export async function getServerSideProps() {
  let articles = [];
  try {
    articles = await getMediumPosts();
  } catch (error) {
    console.error("Error fetching articles:", error);
  }

  return { props: { articles } };
}

export default function Articles({ articles }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredArticles, setFilteredArticles] = useState(articles);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef(null);

  // Extract unique categories from articles (if they have categories)
  const categories = [
    "All",
    ...new Set(
      articles
        .map((article) => article.categories?.[0] || "Uncategorized")
        .filter(Boolean)
    ),
  ];

  // Filter articles based on search term and category
  useEffect(() => {
    setIsLoading(true);

    // Simulate loading delay for better UX
    const timer = setTimeout(() => {
      const filtered = articles.filter((article) => {
        const matchesSearch = article.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const matchesCategory =
          selectedCategory === "All" ||
          (article.categories &&
            article.categories.includes(selectedCategory)) ||
          (selectedCategory === "Uncategorized" &&
            (!article.categories || article.categories.length === 0));

        return matchesSearch && matchesCategory;
      });

      setFilteredArticles(filtered);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, selectedCategory, articles]);

  // Estimate reading time based on content length (if available) or title length as fallback
  const getReadingTime = (article) => {
    // If we have content, calculate based on average reading speed (225 words per minute)
    if (article.content) {
      const wordCount = article.content.split(/\s+/).length;
      const readingTime = Math.ceil(wordCount / 225);
      return readingTime > 0 ? readingTime : 1;
    }

    // Fallback: estimate based on title length
    return Math.ceil(article.title.split(/\s+/).length / 10) || 1;
  };

  // Format publication date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
    hover: {
      y: -10,
      boxShadow:
        "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15,
      },
    },
  };

  return (
    <div className="bg-primary text-white min-h-screen transition-colors duration-300 dark:bg-lightPrimary dark:text-lightTextPrimary">
      {/* Hero Section with Background */}
      <section className="relative py-12 sm:py-16 md:py-24 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#09ace3]/10 to-transparent dark:from-lightHighlight/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          />
          <motion.div
            className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[#09ace3]/20 dark:bg-lightHighlight/20 blur-3xl"
            animate={{
              x: [0, -30, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 15,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-accent/10 dark:bg-lightAccent/10 blur-3xl"
            animate={{
              x: [0, 40, 0],
              y: [0, -40, 0],
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-6 tracking-tight"
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%"],
              }}
              transition={{
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
              style={{
                backgroundImage: "linear-gradient(90deg, #24c6dc, #5BB6AF)",
                backgroundSize: "200%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Latest Articles
            </motion.h1>

            <motion.p
              className="text-xl text-gray-300 dark:text-gray-600 mb-10 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Explore our collection of articles about technology, design, and
              development.
            </motion.p>

            {/* Search and Filter */}
            <motion.div
              className="flex gap-3 flex-col md:flex-row  sm:gap-4 justify-center mt-4 sm:mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <div className="relative w-full ">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-textSecondary dark:text-lightTextSecondary" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-secondary/50 dark:bg-lightSecondary/50 text-textPrimary dark:text-lightTextPrimary border border-white/10 dark:border-black/10 focus:border-[#09ace3] dark:focus:border-lightHighlight outline-none transition-all text-sm sm:text-base"
                />
              </div>

              {/* Custom Animated Dropdown */}
              <div className="w-full md:max-w-[230px]">
                <CustomDropdown
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  categories={categories}
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="max-w-[1440px] w-full mx-auto px-[20px] sm:px-6 md:px-8 pb-16 sm:pb-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-6 sm:mb-8"
        >
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-2xl font-bold text-textPrimary dark:text-lightTextPrimary">
              {searchTerm || selectedCategory !== "All"
                ? `${filteredArticles.length} ${
                    filteredArticles.length === 1 ? "Result" : "Results"
                  }`
                : "All Articles"}
            </h2>
            {isLoading && (
              <div className="flex items-center">
                <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 border-[#09ace3] dark:border-lightHighlight border-t-transparent animate-spin mr-2"></div>
                <span className="text-xs sm:text-sm text-textSecondary dark:text-lightTextSecondary">
                  Loading...
                </span>
              </div>
            )}
          </div>

          <AnimatePresence mode="wait">
            {filteredArticles.length > 0 ? (
              <motion.div
                key="articles-grid"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: 20 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
              >
                {filteredArticles.map((article, index) => (
                  <motion.a
                    key={article.guid}
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    variants={cardVariants}
                    whileHover="hover"
                    className="bg-secondary/40 dark:bg-lightSecondary/40 rounded-lg overflow-hidden shadow-lg border border-white/5 dark:border-black/5 flex flex-col h-full transition-all"
                    custom={index}
                  >
                    {article.image && (
                      <div className="relative h-52 sm:h-64 overflow-hidden">
                        <img
                          src={article.image || "/placeholder.svg"}
                          alt={article.title}
                          className="w-full h-full object-cover "
                        />
                        {article.categories &&
                          article.categories.length > 0 && (
                            <div className="absolute top-2 sm:top-3 left-2 sm:left-3">
                              <span className="text-sm px-2 py-1 capitalize sm:py-1 rounded-lg  bg-[#09ace3]/80 dark:bg-lightHighlight/80 text-white">
                                {article.categories[0]}
                              </span>
                            </div>
                          )}
                      </div>
                    )}
                    <div className="px-[14px] py-4 md:p-5 flex-grow  flex flex-col">
                      <h3 className="text-lg font-medium md:font-bold text-textPrimary dark:text-lightTextPrimary mb-2 line-clamp-2">
                        {article.title}
                      </h3>
                      <div className="flex items-center text-base text-textSecondary dark:text-lightTextSecondary mb-4 mt-2 sm:my-3">
                        <span className="flex items-center mr-4">
                          <FaCalendarAlt className="mr-1" />
                          {formatDate(article.pubDate)}
                        </span>
                        <span className="flex items-center">
                          <FaClock className="mr-1" />
                          {getReadingTime(article)} min read
                        </span>
                      </div>
                      <div className="flex items-center text-[#09ace3] dark:text-lightHighlight text-base font-medium mt-auto group">
                        Read more
                        <FaArrowRight className="ml-2 text-sm group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </motion.a>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="no-results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-secondary/30 dark:bg-lightSecondary/30 rounded-xl p-6 sm:p-10 text-center"
              >
                <svg
                  className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 text-textSecondary dark:text-lightTextSecondary opacity-50"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="text-lg sm:text-xl font-bold text-textPrimary dark:text-lightTextPrimary mb-2">
                  No articles found
                </h3>
                <p className="text-sm text-textSecondary dark:text-lightTextSecondary">
                  {searchTerm
                    ? `No articles matching "${searchTerm}"`
                    : "No articles available in this category at the moment."}
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("All");
                  }}
                  className="mt-3 sm:mt-4 px-3 sm:px-4 py-1.5 sm:py-2 bg-[#09ace3]/20 dark:bg-lightHighlight/20 text-[#09ace3] dark:text-lightHighlight rounded-lg hover:bg-[#09ace3]/30 dark:hover:bg-lightHighlight/30 transition-colors text-sm"
                >
                  Clear filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </section>
    </div>
  );
}
