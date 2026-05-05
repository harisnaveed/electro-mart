type CardStarsProps = {
  count?: number;
};

export function CardStars({ count }: CardStarsProps) {
  const total = 5;
  // clamp between 0 → 5
  const safeCount = Math.max(0, Math.min(count, total));
  return (
    <div className="flex text-sm mb-3">
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={
            i < safeCount
              ? "text-orange-400"
              : "text-gray-700 dark:text-gray-300"
          }
        >
          ★
        </span>
      ))}
    </div>
  );
}
