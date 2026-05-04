import { useMemo, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import ContactSection from "../components/ContactSection";
import NewsLetterSection from "../components/NewsLetter";
import SEO from "../components/SEO";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const categories = useMemo(
    () => [
      {
        label: "Devices",
        off: "20% off",
        emoji: "🎧",
        bg: "bg-sky-50 dark:bg-gray-800",
      },
      {
        label: "Repairs",
        off: "10% off",
        emoji: "🧰",
        bg: "bg-blue-50 dark:bg-gray-800",
      },
      {
        label: "Accessories",
        off: "15% off",
        emoji: "🔌",
        bg: "bg-orange-50 dark:bg-gray-800",
      },
      {
        label: "Parts",
        off: "25% off",
        emoji: "⚙️",
        bg: "bg-amber-50 dark:bg-gray-800",
      },
      {
        label: "Services",
        off: "30% off",
        emoji: "🛠️",
        bg: "bg-emerald-50 dark:bg-gray-800",
      },
      {
        label: "Categories",
        off: "5% off",
        emoji: "📦",
        bg: "bg-zinc-50 dark:bg-gray-800",
      },
    ],
    [],
  );

  const categoriesRef = useRef<HTMLDivElement | null>(null);
  const businessPhone = import.meta.env.VITE_PHONE;

  const scrollCategories = (dir: "prev" | "next") => {
    const el = categoriesRef.current;
    if (!el) return;
    const amount = el.clientWidth;
    el.scrollBy({
      left: dir === "next" ? amount : -amount,
      behavior: "smooth",
    });
  };

  const navigate = useNavigate();

  return (
    <>
      <SEO
        title="Electro Mart - Best Electronics Store"
        description="Shop the latest electronics, accessories, and gadgets at Electro Mart. Fast delivery and secure checkout."
        page="/"
      />
      <div className="py-6 sm:py-8">
        <section className="relative overflow-hidden rounded-3xl bg-white px-6 py-10 shadow-[0_18px_40px_rgba(15,23,42,0.08)] ring-1 ring-zinc-100 sm:px-10 dark:bg-gray-900 dark:text-white dark:ring-gray-800">
          <div className="pointer-events-none absolute inset-0">
            <span className="absolute left-10 top-10 h-2 w-2 rounded-sm bg-orange-500/50" />
            <span className="absolute left-24 top-36 h-2 w-2 rounded-sm bg-blue-500/30" />
            <span className="absolute right-28 top-24 h-2 w-2 rounded-sm bg-zinc-900/10" />
            <span className="absolute right-14 top-48 h-2 w-2 rounded-sm bg-orange-500/30" />
            <span className="absolute left-16 bottom-14 h-2 w-2 rotate-12 rounded-sm bg-emerald-500/20" />
            <span className="absolute right-36 bottom-20 h-2 w-2 -rotate-6 rounded-sm bg-red-500/20" />
          </div>

          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr_0.85fr]">
            <div>
              <h1 className="text-[42px] font-extrabold leading-[1.05] tracking-tight text-zinc-950 sm:text-6xl dark:bg-gray-900 dark:text-white">
                Our Best <span className="block">Collections</span>{" "}
                <span className="block">For You</span>
              </h1>
              <p className="mt-5 max-w-md text-[13px] leading-6 text-zinc-600 dark:bg-gray-900 dark:text-white">
                The styles of iPhones are available to consumers in endless and
                profit at the best possible prices.
              </p>

              <div className="mt-7 flex flex-row gap-3 items-center mt-1">
                <button
                  onClick={() => navigate("/shop")}
                  type="button"
                  className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl 
                  bg-primary px-6 text-sm font-semibold text-white 
                  shadow-[0_6px_18px_rgba(0,0,0,0.2)] 
                  transition-all duration-300 
                  hover:bg-secondary hover:shadow-[0_10px_25px_rgba(0,0,0,0.3)] 
                  active:scale-95 cursor-pointer
                  animate-[soft-pulse_1s_ease-in-out_infinite]"
                >
                  <span className="text-base transition group-hover:animate-[icon-bounce_0.4s_ease-in-out]">
                    📱
                  </span>

                  <span className="tracking-wide">Shop Now</span>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    (window.location.href = `tel:${businessPhone}`)
                  }
                  className="group inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-secondary px-5 text-sm font-semibold text-white transition hover:text-white hover:bg-primary cursor-pointer border border-secondary"
                >
                  <FontAwesomeIcon
                    icon={faPhone}
                    className="text-primary group-hover:text-white"
                  />
                  Call Us
                </button>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-md">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-10 -right-10 top-10 mx-auto h-[320px] rotate-[-12deg] opacity-95 sm:top-6"
                style={{
                  backgroundImage: "url(/src/assets/hero-swoosh.svg)",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  backgroundSize: "contain",
                }}
              />

              <div className="relative mx-auto grid place-items-center">
                <img
                  src="/src/assets/iphone-pro-max.svg"
                  loading="lazy"
                  alt="iPhone Pro Max"
                  className="w-[180px] drop-shadow-[0_28px_30px_rgba(0,0,0,0.14)] sm:w-[180px]"
                />
              </div>

              <svg
                aria-hidden="true"
                className="pointer-events-none absolute right-2 top-[275px] hidden h-16 w-36 text-orange-500 lg:block"
                viewBox="0 0 180 80"
                fill="none"
              >
                <path
                  d="M8 30c32 22 70 32 112 28"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <path
                  d="M116 53c12-1 25-6 38-16"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <path
                  d="M156 36l-8 2 5 7"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-10 left-2 select-none text-[72px] font-extrabold tracking-[0.22em] text-zinc-200/50 sm:text-[88px]"
              >
                IPHONE
              </div>
            </div>

            <div className="flex flex-col gap-4 ">
              <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:bg-gray-900 dark:text-white dark:border-gray-800">
                <p className="text-sm font-semibold text-zinc-950 dark:text-white">
                  Get up to <span className="text-orange-500">30% off</span>
                </p>
                <p className="mt-1 text-xs text-zinc-600 dark:text-white">
                  You can get up to 30 percent discount from here
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:bg-gray-900 dark:text-white dark:border-gray-800">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-white">
                      Limited Deal
                    </p>
                    <p className="mt-2 text-2xl font-extrabold text-zinc-950 dark:text-white">
                      $999.00
                    </p>
                    <p className="mt-1 text-xs text-zinc-600 dark:text-white">
                      Free delivery • 2 year warranty
                    </p>

                    <div className="mt-3 flex items-center gap-2">
                      <div className="flex items-center gap-0.5 text-orange-500">
                        <span aria-hidden="true">★</span>
                        <span aria-hidden="true">★</span>
                        <span aria-hidden="true">★</span>
                        <span aria-hidden="true">★</span>
                        <span
                          aria-hidden="true"
                          className="text-zinc-300 dark:text-white"
                        >
                          ★
                        </span>
                      </div>
                      <span className="text-xs font-semibold text-zinc-700 dark:text-white">
                        4.0
                      </span>
                      <span className="text-xs text-zinc-500 dark:text-white">
                        (2.4k reviews)
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700">
                      -30%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="flex items-center gap-3 rounded-2xl bg-white p-4 dark:bg-gray-900 dark:text-white shadow-[0_14px_30px_rgba(15,23,42,0.06)] ring-1 ring-zinc-100 dark:ring-gray-800">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-secondary dark:bg-gray-800 dark:text-white">
              <span className="text-base">🚚</span>
            </div>
            <div>
              <div className="text-sm font-semibold text-zinc-950 dark:text-white">
                Free Shipping
              </div>
              <div className="text-xs text-zinc-600 dark:text-white">
                Free shipping on orders over $500
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl bg-white dark:bg-gray-900 dark:text-white p-4 shadow-[0_14px_30px_rgba(15,23,42,0.06)] ring-1 ring-zinc-100 dark:ring-gray-800">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-red-50 text-secondary dark:bg-gray-800">
              <span className="text-base">🎧</span>
            </div>
            <div>
              <div className="text-sm font-semibold text-zinc-950 dark:text-white">
                Support 24/7
              </div>
              <div className="text-xs text-zinc-600 dark:text-white">
                Contact us 24 hrs a day
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl bg-white dark:bg-gray-900 dark:text-white p-4 shadow-[0_14px_30px_rgba(15,23,42,0.06)] ring-1 ring-zinc-100 dark:ring-gray-800">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-amber-50 text-secondary dark:bg-gray-800">
              <span className="text-base">🔒</span>
            </div>
            <div>
              <div className="text-sm font-semibold text-zinc-950 dark:text-white">
                Payment Secure
              </div>
              <div className="text-xs text-zinc-600 dark:text-white">
                Your transactions are safe and protected
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight text-zinc-950 dark:text-white">
                Categories
              </h2>
              <p className="mt-1 text-sm text-zinc-600 dark:text-white">
                Choose what you want to repair or buy today.
              </p>
            </div>
            <div className="hidden items-center gap-2 sm:flex">
              <button
                type="button"
                className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl bg-white text-zinc-700 shadow-sm ring-1 ring-zinc-200 hover:bg-zinc-50"
                aria-label="Previous"
                title="Previous"
                onClick={() => scrollCategories("prev")}
              >
                ←
              </button>
              <button
                type="button"
                className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl bg-primary text-white shadow-sm ring-1 ring-primary hover:bg-primary"
                aria-label="Next"
                title="Next"
                onClick={() => scrollCategories("next")}
              >
                →
              </button>
            </div>
          </div>

          <div
            ref={categoriesRef}
            className="mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {categories.map((c) => (
              <div
                key={c.label}
                className={[
                  "relative w-[280px] flex-none snap-start overflow-hidden rounded-3xl p-6 shadow-[0_18px_40px_rgba(15,23,42,0.06)] ring-1 ring-zinc-100 dark:ring-gray-800 sm:w-[320px] lg:w-[calc((100%-2rem)/3)]",
                  c.bg,
                ].join(" ")}
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="rounded-full bg-white/90 dark:bg-gray-700 px-3 py-1 text-xs font-semibold text-zinc-800 ring-1 ring-zinc-200 dark:ring-gray-600 dark:text-white">
                    {c.off}
                  </span>
                  <button
                    type="button"
                    className="grid h-9 w-9 cursor-pointer place-items-center rounded-full bg-white/90 dark:bg-gray-700 text-zinc-700 ring-1 ring-zinc-200 dark:ring-gray-600 dark:text-white dark:hover:bg-gray-800 hover:bg-white"
                    aria-label="Add to wishlist"
                    title="Add to wishlist"
                  >
                    ♡
                  </button>
                </div>

                <div className="mt-6 grid place-items-center">
                  <div className="grid h-24 w-24 place-items-center rounded-[28px] bg-white/80 dark:bg-gray-700 dark:ring-gray-700 ring-1 ring-zinc-200">
                    <span className="text-4xl">{c.emoji}</span>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <div className="text-lg font-extrabold text-zinc-950 dark:text-white">
                    {c.label}
                  </div>
                  <div className="mt-2 text-sm font-semibold text-red-600">
                    $120.99{" "}
                    <span className="ml-2 font-medium text-zinc-400 line-through">
                      $180.99
                    </span>
                  </div>
                  <div className="mt-2 text-orange-500">
                    <span aria-hidden="true">★★★★★</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        {/* Contact Section */}
        <ContactSection />

        {/* Newsletter Section */}
        <NewsLetterSection />
      </div>
    </>
  );
}
