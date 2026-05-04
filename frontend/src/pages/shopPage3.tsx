import { useEffect, useMemo, useState } from "react";
import { useCart } from "../CartContext";
import { useCartUi } from "../CartUiContext";
import SEO from "../components/SEO";

type Product = {
  id: string | number;
  title: string;
  price: number | null;
  image?: string;
  category?: string;
  description?: string;
  manufacturer?: string;
  type?: string;
  instock?: number;
  sku?: string;
};

function normalizeProducts(payload: unknown): Product[] {
  const obj = payload as {
    products?: unknown;
    items?: unknown;
    results?: unknown;
    data?: unknown;
  };

  const list = Array.isArray(payload)
    ? payload
    : (obj?.products ?? obj?.items ?? obj?.results ?? obj?.data);
  if (!Array.isArray(list)) return [];

  return list
    .map((raw) => {
      const obj = raw as Record<string, unknown>;
      const rawId = obj.id ?? obj._id ?? obj.sku;
      const id: string | number =
        typeof rawId === "string" || typeof rawId === "number"
          ? rawId
          : crypto.randomUUID();
      const title = String(obj.name ?? obj.title ?? "Untitled product");

      const priceValue = obj.price;
      const price =
        typeof priceValue === "number"
          ? priceValue
          : typeof priceValue === "string"
            ? Number(priceValue)
            : null;

      const image =
        (typeof obj.image === "string" && obj.image) ||
        (typeof obj.thumbnail === "string" && obj.thumbnail) ||
        (Array.isArray(obj.images) && typeof obj.images[0] === "string"
          ? (obj.images[0] as string)
          : undefined);

      const category =
        typeof obj.category === "string" ? obj.category : undefined;
      const description =
        typeof obj.description === "string" ? obj.description : undefined;

      const manufacturer =
        typeof obj.manufacturer === "string" ? obj.manufacturer : undefined;
      const type = typeof obj.type === "string" ? obj.type : undefined;
      const instock =
        typeof obj.instock === "number"
          ? obj.instock
          : typeof obj.skuInstock === "number"
            ? obj.skuInstock
            : undefined;
      const sku = typeof obj.sku === "string" ? obj.sku : undefined;

      return {
        id,
        title,
        price: Number.isFinite(price) ? price : null,
        image,
        category,
        description,
        manufacturer,
        type,
        instock,
        sku,
      };
    })
    .filter((p) => p.title.trim().length > 0);
}

function formatPrice(price: number | null) {
  if (price == null) return "—";
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(price);
}

const PRODUCTS_URL =
  import.meta.env.VITE_PRODUCTS_API_URL?.toString() ||
  "https://dummyjson.com/products";

const API_KEY = import.meta.env.VITE_API_KEY?.toString() || "";
const QUERY_PARAM = import.meta.env.VITE_QUERY_PARAM?.toString() || "query";

export default function Shop() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [limit, setLimit] = useState<number | "all">(12);
  const { addToCart, cart } = useCart();
  const { openCart } = useCartUi();
  const [toast, setToast] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function run() {
      setLoading(true);
      setError(null);

      try {
        const url = new URL(PRODUCTS_URL, window.location.origin);
        const defaultParams = new URLSearchParams(
          import.meta.env.VITE_DEFAULT_PARAMS,
        );
        defaultParams.forEach((value, key) => {
          url.searchParams.set(key, value);
        });

        const q = query.trim();
        if (q) {
          url.searchParams.set(QUERY_PARAM, q);
        }

        const res = await fetch(url.toString(), {
          method: "GET",
          signal: controller.signal,
          headers: {
            ...(API_KEY ? { "X-API-Key": API_KEY } : {}),
          },
        });
        if (!res.ok) throw new Error(`Request failed (${res.status})`);
        const json: unknown = await res.json();
        const parsed = normalizeProducts(json);
        console.log("Fetching Products");
        const filteredProducts = parsed.filter((product: any) => {
          return Number(product.price) > 0;
        });

        setAllProducts(filteredProducts);
      } catch (e) {
        if ((e as { name?: string })?.name === "AbortError") return;
        setError(e instanceof Error ? e.message : "Failed to load products");
        setAllProducts([]);
      } finally {
        setLoading(false);
      }
    }

    setPage(1);

    void run();
    return () => controller.abort();
  }, [query]);

  const categories = useMemo(() => {
    const set = new Set<string>();
    for (const p of allProducts) if (p.category) set.add(p.category);
    return ["All", ...Array.from(set).sort((a, b) => a.localeCompare(b))];
  }, [allProducts]);

  const paginated = useMemo(() => {
    const q = query.trim().toLowerCase();

    let result = allProducts.filter((p) => {
      const matchesQuery =
        q.length === 0 ||
        p.title.toLowerCase().includes(q) ||
        (p.description?.toLowerCase().includes(q) ?? false);

      const matchesCategory =
        selectedCategory === "All" || p.category === selectedCategory;

      return matchesQuery && matchesCategory;
    });

    if (limit !== "all") {
      const start = (page - 1) * limit;
      const end = start + limit;
      result = result.slice(start, end);
    }

    return result;
  }, [allProducts, query, selectedCategory, limit, page]);

  const categoryProducts = useMemo(() => {
    const q = query.trim().toLowerCase();

    const result = allProducts.filter((p) => {
      const matchesQuery =
        q.length === 0 ||
        p.title.toLowerCase().includes(q) ||
        (p.description?.toLowerCase().includes(q) ?? false);

      const matchesCategory =
        selectedCategory === "All" || p.category === selectedCategory;

      return matchesQuery && matchesCategory;
    });

    return result;
  }, [allProducts, query, selectedCategory]);

  const totalPages =
    limit === "all"
      ? 1
      : Math.ceil(
          categoryProducts.filter((p) => {
            const q = query.trim().toLowerCase();
            return (
              q.length === 0 ||
              p.title.toLowerCase().includes(q) ||
              (p.description?.toLowerCase().includes(q) ?? false)
            );
          }).length / limit,
        );
  const pages = getPagination(page, totalPages);

  function getPagination(current: number, total: number) {
    const pages: (number | "...")[] = [];

    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    const range: number[] = [];
    range.push(1);

    for (let i = current - 1; i <= current + 1; i++) {
      if (i > 1 && i < total) {
        range.push(i);
      }
    }

    range.push(total);
    const unique = Array.from(new Set(range)).sort((a, b) => a - b);

    for (let i = 0; i < unique.length; i++) {
      pages.push(unique[i]);
      if (i < unique.length - 1 && unique[i + 1] !== unique[i] + 1) {
        pages.push("...");
      }
    }

    return pages;
  }

  const startItem = limit === "all" ? 1 : (page - 1) * limit + 1;
  const endItem =
    limit === "all"
      ? categoryProducts.length
      : Math.min(page * limit, categoryProducts.length);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <SEO
        title="Shop Electronics & Accessories | Electro Mart"
        description="Browse a wide range of electronics, gadgets, and accessories at Electro Mart. Enjoy great prices, fast delivery, and secure checkout."
        page="/shop"
      />
      <div>
        <div className="mb-6 flex flex-col gap-1">
          <p className="text-sm text-zinc-600 dark:text-gray-400">
            API: <span className="font-mono text-[13px]">{PRODUCTS_URL}</span>
          </p>
          <p className="text-sm text-zinc-600 dark:text-gray-400">
            Showing{" "}
            <span className="font-medium text-zinc-900 dark:text-gray-400">
              {startItem} – {endItem}
            </span>{" "}
            of{" "}
            <span className="font-medium text-zinc-900 dark:text-gray-400">
              {categoryProducts.length}
            </span>
          </p>
        </div>

        {toast && (
          <div className="fixed bottom-20 right-5 bg-black dark:bg-primary text-white px-4 py-2 rounded-lg shadow-lg text-sm z-50">
            {toast}
          </div>
        )}

        <div className="mb-6 grid grid-cols-1 gap-3 md:grid-cols-3">
          <div className="relative w-full md:col-span-1">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products…"
              className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm outline-none ring-zinc-300 placeholder:text-zinc-400 focus:ring-2
            dark:bg-gray-900 dark:border-gray-700 dark:text-gray-400
            "
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-sm outline-none ring-zinc-300 focus:ring-2 cursor-pointer
          dark:bg-gray-900 dark:border-gray-700 dark:text-gray-400
          "
            disabled={loading || categories.length <= 1}
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <select
            value={limit}
            className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-sm outline-none ring-zinc-300 focus:ring-2 cursor-pointer
          dark:bg-gray-900 dark:border-gray-700 dark:text-gray-400"
            onChange={(e) =>
              setLimit(
                e.target.value === "all" ? "all" : Number(e.target.value),
              )
            }
          >
            <option value={12}>12</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
            <option value="all">All</option>
          </select>
        </div>

        <button
          onClick={openCart}
          className="fixed bottom-5 right-5 bg-black dark:bg-gray-700 text-white px-4 py-2 rounded-full shadow-lg cursor-pointer z-30"
        >
          🛒 Cart
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full cursor-pointer">
              {cartCount}
            </span>
          )}
        </button>

        {error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-800">
            <p className="font-semibold">Couldn’t load products</p>
            <p className="mt-1">{error}</p>
            <p className="mt-3 text-red-700/90">
              Set <span className="font-mono">VITE_PRODUCTS_API_URL</span> in a
              <span className="font-mono"> .env</span> file to your API
              endpoint.
            </p>
          </div>
        ) : loading ? (
          // Loading state with skeletons
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse rounded-2xl border border-zinc-200 bg-white p-4"
              >
                <div className="aspect-square w-full rounded-xl bg-zinc-100" />
                <div className="mt-4 h-4 w-3/4 rounded bg-zinc-100" />
                <div className="mt-2 h-4 w-1/2 rounded bg-zinc-100" />
                <div className="mt-4 h-9 w-full rounded-xl bg-zinc-100" />
              </div>
            ))}
          </div>
        ) : (
          <div className="min-h-screen p-6">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {paginated.map((p) => (
                <article
                  key={p.id}
                  className="
          relative group rounded-3xl p-5
          backdrop-blur-xl bg-white/40 dark:bg-white/5
          border border-white/20 dark:border-white/10

          shadow-[10px_10px_25px_rgba(0,0,0,0.08),-10px_-10px_25px_rgba(255,255,255,0.6)]
          dark:shadow-[8px_8px_20px_rgba(0,0,0,0.6),-6px_-6px_16px_rgba(255,255,255,0.05)]

          transition-all duration-300 ease-out
          hover:-translate-y-2 hover:scale-[1.02]
          hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)]
        "
                >
                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition duration-300 bg-gradient-to-tr from-purple-400/20 via-transparent to-orange-300/20 blur-xl"></div>

                  {/* Floating Image */}
                  {p.image && (
                    <div className="relative flex justify-center mb-4">
                      <img
                        src={p.image}
                        alt={p.title}
                        className="
                h-28 object-contain
                transition-all duration-500
                group-hover:-translate-y-3 group-hover:scale-105
                drop-shadow-[0_10px_20px_rgba(0,0,0,0.25)]
              "
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div className="relative z-10">
                    <div className="flex justify-between gap-3">
                      <h2 className="text-sm font-semibold leading-5 line-clamp-2 text-gray-800 dark:text-gray-100">
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
                      {[p.manufacturer, p.type]
                        .filter(Boolean)
                        .map((tag, i) => (
                          <span
                            key={i}
                            className="
                  text-xs px-2 py-1 rounded-full
                  bg-white/50 dark:bg-white/10
                  backdrop-blur-md
                  border border-white/20
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

                    {/* Button */}
                    <button
                      onClick={() => {
                        addToCart(p);
                        setToast(`${p.title} added to cart`);
                        setTimeout(() => setToast(""), 2000);
                      }}
                      className="
              mt-5 w-full py-2.5 rounded-xl text-sm font-medium

              bg-gradient-to-r from-purple-500 to-orange-400
              text-white

              shadow-lg shadow-purple-500/20
              transition-all duration-300

              hover:shadow-xl hover:shadow-purple-500/30
              hover:scale-[1.03]

              active:scale-95

              cursor-pointer
            "
                    >
                      🛒 Add to cart
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {!loading && !error && paginated.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-zinc-200 bg-white dark:bg-gray-800 dark:border-gray-700 p-8 text-center">
            <p className="text-sm font-medium">No matches</p>
            <p className="mt-1 text-sm text-zinc-600 dark:text-white">
              Try a different search or product name.
            </p>
          </div>
        ) : null}

        <div className="flex items-center justify-center gap-2 mt-6 mb-6 flex-wrap">
          <button
            onClick={() => setPage((p) => p - 1)}
            disabled={page === 1}
            className="px-3 py-1.5 rounded-lg border text-sm font-medium
           cursor-pointer
           disabled:opacity-40 disabled:cursor-not-allowed
           hover:bg-gray-200 transition
           dark:hover:bg-gray-700
           dark:border-gray-700
           "
          >
            ← Prev
          </button>

          {pages.map((p, i) =>
            p === "..." ? (
              <span
                key={`dots-${i}`}
                className="px-2 text-gray-400 dark:text-gray-500"
              >
                ...
              </span>
            ) : (
              <button
                key={`page-${p}-${i}`}
                onClick={() => setPage(p)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition cursor-pointer
        ${
          page === p
            ? "bg-primary text-white border-primary "
            : "bg-white text-gray-700 hover:bg-gray-200 dark:bg-gray-900 dark:text-gray-500 dark:hover:bg-gray-700"
        }`}
              >
                {p}
              </button>
            ),
          )}

          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={page === totalPages}
            className="px-3 py-1.5 rounded-lg border text-sm font-medium
           cursor-pointer
           disabled:opacity-40 disabled:cursor-not-allowed
           hover:bg-gray-200 transition
           dark:hover:bg-gray-700
           dark:border-gray-700
           "
          >
            Next →
          </button>
        </div>
      </div>
    </>
  );
}
