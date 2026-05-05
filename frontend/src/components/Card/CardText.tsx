export function CardText({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-gray-600 dark:text-white text-sm mb-4">{children}</p>
  );
}
