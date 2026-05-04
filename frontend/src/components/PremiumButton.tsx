import { motion } from "framer-motion";

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

export default function PremiumButton({ children, onClick, className }: Props) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 18 }}
      className={`
        group relative overflow-hidden
        py-2.5 rounded-xl text-sm font-medium text-white

        bg-gradient-to-r from-purple-500 to-orange-400

        shadow-lg shadow-purple-500/30
        hover:shadow-xl hover:shadow-purple-500/40
        cursor-pointer
        ${className || ""}
      `}
    >
      {/* ✨ Shine Sweep */}
      <span
        className="
          pointer-events-none absolute inset-0
          bg-gradient-to-r from-transparent via-white/40 to-transparent
          translate-x-[-120%]
          group-hover:translate-x-[120%]
          transition-transform duration-700 ease-out
        "
      />

      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </motion.button>
  );
}
