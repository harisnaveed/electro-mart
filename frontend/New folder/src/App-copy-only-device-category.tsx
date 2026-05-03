import { useEffect, useMemo, useState } from "react";

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

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
        const filtered = parsed.filter((product: any) => {
          return Number(product.price) > 0;
        });
        setProducts(filtered);
      } catch (e) {
        if ((e as { name?: string })?.name === "AbortError") return;
        setError(e instanceof Error ? e.message : "Failed to load products");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    void run();
    return () => controller.abort();
  }, [query]);

  const categories = useMemo(() => {
    const set = new Set<string>();
    for (const p of products) if (p.category) set.add(p.category);
    return ["All", ...Array.from(set).sort((a, b) => a.localeCompare(b))];
  }, [products]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      const matchesQuery =
        q.length === 0 ||
        p.title.toLowerCase().includes(q) ||
        (p.description?.toLowerCase().includes(q) ?? false);
      const matchesCategory =
        selectedCategory === "All" || p.category === selectedCategory;
      return matchesQuery && matchesCategory;
    });
  }, [products, query, selectedCategory]);

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
            <span className="font-medium text-zinc-900">{filtered.length}</span>{" "}
            of{" "}
            <span className="font-medium text-zinc-900">{products.length}</span>
          </p>
        </div>

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
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
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
                    className="mt-4 w-full rounded-xl bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-300"
                  >
                    Add to cart
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

        {!loading && !error && filtered.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-zinc-200 bg-white p-8 text-center">
            <p className="text-sm font-medium">No matches</p>
            <p className="mt-1 text-sm text-zinc-600">
              Try a different search or category.
            </p>
          </div>
        ) : null}
      </main>

      <footer className="border-t border-zinc-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-zinc-600">
          <p className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <span>
              Edit <span className="font-mono">VITE_PRODUCTS_API_URL</span> to
              use your API.
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
