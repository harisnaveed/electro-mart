import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import SocialIcons from "./SocialIcons";

export default function FloatingPanel() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* ⚙️ Floating Gear Button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="
    fixed left-4 bottom-6 z-50
    h-14 w-14 flex items-center justify-center
    rounded-2xl
    bg-gradient-to-r from-purple-500 to-orange-400
    text-white shadow-lg
    cursor-pointer
  "
      >
        <span className="text-xl animate-spin-slow hover:animate-none">⚙️</span>
      </button>

      {/* 🧲 Slide Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="
    fixed left-4 bottom-24 z-40
    w-64 p-4 rounded-2xl
    
    backdrop-blur-xl bg-white/70 dark:bg-gray-900/80
    border border-white/30 dark:border-gray-700
    
    shadow-[0_10px_30px_rgba(0,0,0,0.25)]
  "
          >
            <h4 className="font-semibold mb-4 text-gray-800 dark:text-white">
              Settings
            </h4>

            {/* 🌙 Dark Mode Toggle */}
            <ThemeToggle />
            <div className="mt-2"></div>
            {/* Social Icons */}
            <SocialIcons className={"!h-11 !w-12"} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
