import PremiumButton from "./PremiumButton";

type Product = {
  id: string | number;
  title: string;
  price: number;
  category?: string;
  manufacturer?: string;
  type?: string;
  description?: string;
  image?: string;
};

type Props = {
  product: Product;
  addToCart: (product: Product) => void;
  setToast: (msg: string) => void;
  formatPrice: (price: number) => string;
};

export default function ProductCard({
  product,
  addToCart,
  setToast,
  formatPrice,
}: Props) {
  const p = product;

  return (
    <article
      className="
        relative group rounded-3xl p-5
        
        backdrop-blur-xl bg-white/40 dark:bg-white/5
        border border-white/30 dark:border-white/10

        shadow-[12px_12px_30px_rgba(0,0,0,0.08),-8px_-8px_20px_rgba(255,255,255,0.6)]
        dark:shadow-[10px_10px_25px_rgba(0,0,0,0.6),-6px_-6px_18px_rgba(255,255,255,0.05)]

        transition-all duration-300
        hover:-translate-y-2 hover:scale-[1.02]
      "
    >
      {/* Glow */}
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition duration-300 bg-gradient-to-tr from-purple-400/20 via-transparent to-orange-300/20 blur-xl"></div>

      {/* Image */}
      {p.image && (
        <div className="flex justify-center mb-4 relative z-10">
          <img
            src={p.image}
            alt={p.title}
            className="
              h-28 object-contain
              transition-all duration-500
              group-hover:-translate-y-3 group-hover:scale-105
              drop-shadow-[0_12px_25px_rgba(0,0,0,0.25)]
            "
          />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10">
        <div className="flex justify-between gap-3">
          <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-100 line-clamp-2">
            {p.title}
          </h2>
          <p className="text-sm font-semibold text-gray-900 dark:text-white">
            {formatPrice(p.price)}
          </p>
        </div>

        {p.category && (
          <p className="mt-1 text-xs text-gray-500">{p.category}</p>
        )}

        {/* Tags */}
        <div className="mt-3 flex flex-wrap gap-2">
          {[p.manufacturer, p.type].filter(Boolean).map((tag, i) => (
            <span
              key={i}
              className="
                px-2 py-1 text-xs rounded-full
                bg-white/40 dark:bg-white/5
                backdrop-blur-md
                shadow-[inset_3px_3px_6px_rgba(0,0,0,0.1),inset_-3px_-3px_6px_rgba(255,255,255,0.6)]
                dark:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.6),inset_-2px_-2px_5px_rgba(255,255,255,0.05)]
              "
            >
              {tag}
            </span>
          ))}
        </div>

        {p.description && (
          <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {p.description}
          </p>
        )}

        <PremiumButton
          className="w-full mt-5"
          onClick={() => {
            addToCart(p);
            setToast(`${p.title} added to cart`);
            setTimeout(() => setToast(""), 2000);
          }}
        >
          🛒 Add to cart
        </PremiumButton>
      </div>
    </article>
  );
}
