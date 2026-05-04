type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Card({ children, className = "" }: CardProps) {
  return (
    <div
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
