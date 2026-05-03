import { useEffect, useMemo, useState } from "react";
import { useCart } from "./CartContext";
import CartSidebar from "./CartSidebar";

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

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [limit, setLimit] = useState<number | "all">(12);
  const { addToCart } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toast, setToast] = useState("");
  const { cart } = useCart();

  console.log("URL: ", PRODUCTS_URL);
  console.log("QUERY_PARAM: ", QUERY_PARAM);
  console.log("API_KEY: ", API_KEY);
  console.log("QUERY: ", query);

  useEffect(() => {
    const controller = new AbortController();

    async function run() {
      setLoading(true);
      setError(null);

      try {
        const url = new URL(PRODUCTS_URL, window.location.origin);
        // ✅ Add default params correctly
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

        // 🔍 Debug (VERY IMPORTANT)
        console.log("Final URL:", url.toString());

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

        // ✅ Filter products where price > 0
        const filteredProducts = parsed.filter((product: any) => {
          return Number(product.price) > 0;
          // return parsed;
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
  }, [query, selectedCategory, limit]);

  const categories = useMemo(() => {
    const set = new Set<string>();
    for (const p of allProducts) if (p.category) set.add(p.category);
    return ["All", ...Array.from(set).sort((a, b) => a.localeCompare(b))];
  }, [allProducts]);

  const paginated = useMemo(() => {
    const q = query.trim().toLowerCase();

    // ✅ Step 1: filter (search + category)
    let result = allProducts.filter((p) => {
      const matchesQuery =
        q.length === 0 ||
        p.title.toLowerCase().includes(q) ||
        (p.description?.toLowerCase().includes(q) ?? false);

      const matchesCategory =
        selectedCategory === "All" || p.category === selectedCategory;

      return matchesQuery && matchesCategory;
    });

    // ✅ Step 2: pagination
    if (limit !== "all") {
      const start = (page - 1) * limit;
      const end = start + limit;
      result = result.slice(start, end);
    }

    return result;
  }, [allProducts, query, selectedCategory, limit, page]);

  const categoryProducts = useMemo(() => {
    const q = query.trim().toLowerCase();

    // ✅ Step 1: filter (search + category)
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

    // Always include first page
    range.push(1);

    // Include current -1, current, current +1
    for (let i = current - 1; i <= current + 1; i++) {
      if (i > 1 && i < total) {
        range.push(i);
      }
    }

    // Always include last page
    range.push(total);

    // ✅ Remove duplicates + sort
    const unique = Array.from(new Set(range)).sort((a, b) => a - b);

    // ✅ Add dots where needed
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
    <div className="min-h-dvh bg-zinc-50 text-zinc-950">
      <header className="sticky top-0 z-10 border-b border-zinc-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
          <div className="min-w-0">
            <p className="text-sm font-medium text-zinc-600">One page store</p>
            <h1 className="truncate text-xl font-semibold tracking-tight">
              Cursor Shop
            </h1>
          </div>

          <div className="flex w-full max-w-2xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
            <div className="relative w-full">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products…"
                className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm outline-none ring-zinc-300 placeholder:text-zinc-400 focus:ring-2"
              />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-sm outline-none ring-zinc-300 focus:ring-2 sm:w-56"
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
              className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-sm outline-none ring-zinc-300 focus:ring-2 sm:w-56"
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
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-6 flex flex-col gap-1">
          <p className="text-sm text-zinc-600">
            API: <span className="font-mono text-[13px]">{PRODUCTS_URL}</span>
          </p>
          <p className="text-sm text-zinc-600">
            Showing{" "}
            <span className="font-medium text-zinc-900">
              {startItem}–{endItem}
            </span>{" "}
            of{" "}
            <span className="font-medium text-zinc-900">
              {categoryProducts.length}
            </span>
          </p>
        </div>

        {toast && (
          <div className="fixed bottom-20 right-5 bg-black text-white px-4 py-2 rounded-lg shadow-lg text-sm z-50">
            {toast}
          </div>
        )}

        <button
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-5 right-5 bg-black text-white px-4 py-2 rounded-full shadow-lg cursor-pointer"
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
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 9 }).map((_, i) => (
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
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {paginated.map((p) => (
              <article
                key={p.id}
                className="group overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition hover:shadow-md"
              >
                {/*
                <div className="relative aspect-square w-full bg-zinc-100">
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={p.title}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-sm text-zinc-500">
                      No image
                    </div>
                  )}
                </div>*/}

                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="line-clamp-2 text-sm font-semibold leading-5">
                      {p.title}
                    </h2>
                    <p className="shrink-0 text-sm font-semibold tabular-nums">
                      {formatPrice(p.price)}
                    </p>
                  </div>

                  {p.category ? (
                    <p className="mt-2 text-xs text-zinc-500">{p.category}</p>
                  ) : null}

                  <div className="mt-3 flex flex-wrap gap-2 text-xs text-zinc-600">
                    {p.manufacturer ? (
                      <span className="rounded-full bg-zinc-100 px-2 py-1">
                        {p.manufacturer}
                      </span>
                    ) : null}
                    {p.type ? (
                      <span className="rounded-full bg-zinc-100 px-2 py-1">
                        {p.type}
                      </span>
                    ) : null}
                    {typeof p.instock === "number" ? (
                      <span className="rounded-full bg-zinc-100 px-2 py-1">
                        Stock: <span className="font-medium">{p.instock}</span>
                      </span>
                    ) : null}
                    {p.sku ? (
                      <span className="rounded-full bg-zinc-100 px-2 py-1 font-mono">
                        {p.sku}
                      </span>
                    ) : null}
                  </div>

                  {p.description ? (
                    <p className="mt-3 line-clamp-2 text-sm text-zinc-600">
                      {p.description}
                    </p>
                  ) : null}

                  <button
                    type="button"
                    onClick={() => {
                      addToCart(p);
                      setToast(`${p.title} added to cart`);
                      setTimeout(() => setToast(""), 2000);
                    }}
                    className="
                      mt-4 inline-flex items-center justify-center gap-2
                      rounded-full px-3 py-1
                      bg-black text-white text-sm font-small
                      shadow-sm transition-all duration-200
                      hover:bg-zinc-800 hover:shadow-md
                      active:scale-95
                      cursor-pointer
                    "
                  >
                    {/* Icon */}
                    <span className="bg-white/20 rounded-full p-1 flex items-center justify-center">
                      🛒
                    </span>
                    Add to cart
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

        {!loading && !error && paginated.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-zinc-200 bg-white p-8 text-center">
            <p className="text-sm font-medium">No matches</p>
            <p className="mt-1 text-sm text-zinc-600">
              Try a different search or product name.
            </p>
          </div>
        ) : null}
      </main>

      <div className="flex items-center justify-center gap-2 mt-6 flex-wrap">
        {/* Prev */}
        <button
          onClick={() => setPage((p) => p - 1)}
          disabled={page === 1}
          className="px-3 py-1.5 rounded-lg border text-sm font-medium
           cursor-pointer
           disabled:opacity-40 disabled:cursor-not-allowed
           hover:bg-gray-100 transition"
        >
          ← Prev
        </button>

        {/* Pages */}
        {pages.map((p, i) =>
          p === "..." ? (
            <span key={`dots-${i}`} className="px-2 text-gray-400">
              ...
            </span>
          ) : (
            <button
              key={`page-${p}-${i}`} // ✅ FIXED
              onClick={() => setPage(p)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition cursor-pointer
        ${
          page === p
            ? "bg-black text-white border-black-600"
            : "bg-white text-gray-700 hover:bg-gray-100"
        }`}
            >
              {p}
            </button>
          ),
        )}

        {/* Next */}
        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={page === totalPages}
          className="px-3 py-1.5 rounded-lg border text-sm font-medium
           cursor-pointer
           disabled:opacity-40 disabled:cursor-not-allowed
           hover:bg-gray-100 transition"
        >
          Next →
        </button>
      </div>

      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      <footer className="border-t border-zinc-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-zinc-600">
          <p className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <span>
              <span className="font-mono">My Repair APP</span>
            </span>
            <span className="font-mono text-[13px]">
              React 19 • Tailwind v4
            </span>
          </p>
        </div>
      </footer>
    </div>
  );
}
