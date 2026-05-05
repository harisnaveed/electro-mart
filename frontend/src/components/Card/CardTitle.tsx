export function CardTitle({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
      {children}
    </h4>
  );
}
