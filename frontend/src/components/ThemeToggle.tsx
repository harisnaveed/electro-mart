import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      document.documentElement.classList.add("dark");
      setDark(true);
    }
  }, []);

  const toggleDark = () => {
    const root = document.documentElement;

    if (dark) {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }

    setDark(!dark);
  };

  return (
    <div
      className="
        flex items-center gap-3
        px-4 py-2 rounded-xl
        
        bg-white/60 dark:bg-gray-900/70
        backdrop-blur-xl
        
        border border-white/30 dark:border-gray-700
        shadow-sm
      "
    >
      {/* Toggle Switch */}
      <button
        onClick={toggleDark}
        className={`
          relative w-12 h-6 rounded-full transition
          ${dark ? "bg-purple-500" : "bg-gray-300"}
        `}
      >
        <span
          className={`
            absolute top-1 left-1 h-4 w-4 rounded-full bg-white transition
            ${dark ? "translate-x-6" : "translate-x-0"}
          `}
        />
      </button>

      {/* Icon */}
      <span className="text-lg">{dark ? "🌙" : "☀️"}</span>

      {/* Label */}
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {dark ? "Dark" : "Light"}
      </span>
    </div>
  );
}
