import { motion, AnimatePresence } from "framer-motion";

type Props = {
  message: string;
};

export default function PremiumToast({ message }: Props) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="
            fixed top-6 right-6 z-50
            px-5 py-3 rounded-2xl
            
            backdrop-blur-xl
            bg-white/60 dark:bg-gray-900/70   /* 👈 increased opacity */
            
            border border-white/30 dark:border-gray-700
            
            shadow-[0_10px_30px_rgba(0,0,0,0.25)]
            
            text-sm font-semibold text-gray-900 dark:text-white   /* 👈 FIX TEXT */
            flex items-center gap-2
          "
        >
          {/* ✨ Glow */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-400/20 to-orange-400/20 blur-xl opacity-60"></div>

          {/* Content */}
          <span className="relative z-10 flex items-center gap-2">
            🛒 {message}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
