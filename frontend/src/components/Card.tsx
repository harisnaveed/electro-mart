type CardProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

export default function Card({ children, className = "", onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`
        p-6 rounded-2xl border h-full
        bg-white dark:bg-gray-800
        border-gray-200 dark:border-gray-700
        shadow-sm hover:shadow-md transition
        ${className}
      `}
    >
      {children}
    </div>
  );
}
