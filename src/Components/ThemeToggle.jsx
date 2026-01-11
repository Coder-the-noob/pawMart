// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  useEffect(() => {
    const root = document.documentElement;

    // ✅ 1) DaisyUI theme (fixes invisible text with bg-base-100/text-base-content)
    root.setAttribute("data-theme", theme);

    // ✅ 2) Tailwind dark mode support (for dark: classes if you use them)
    root.classList.toggle("dark", theme === "dark");
    root.classList.toggle("light", theme === "light");

    localStorage.setItem("theme", theme);
  }, [theme]);

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className={`
        w-16 h-8 rounded-full flex items-center px-1
        border border-base-300
        bg-base-200
        hover:bg-base-300
        transition-colors duration-300
        focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40
      `}
    >
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className={`
          w-6 h-6 rounded-full flex items-center justify-center
          shadow-md
          ${isDark ? "bg-primary text-primary-content" : "bg-warning text-warning-content"}
        `}
        style={{ marginLeft: isDark ? "32px" : "0px" }}
      >
        {isDark ? <FaMoon className="text-sm" /> : <FaSun className="text-sm" />}
      </motion.div>
    </button>
  );
};

export default ThemeToggle;
