import { NavLink, useLocation } from "react-router-dom";
import { useCart } from "./CartContext";
import { useCartUi } from "./CartUiContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import {
  faCartShopping,
  faHeart,
  faBars,
  faXmark,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { useMemo, useState } from "react";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/shop", label: "Shop" },
  { to: "/contact", label: "Contact" },
] as const;

export default function Header() {
  const { cart } = useCart();
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const { openCart } = useCartUi();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const [dark, setDark] = useState(false);

  const breadcrumb = useMemo(() => {
    const parts = location.pathname.split("/").filter(Boolean);
    if (parts.length === 0) return "Home";
    const last = parts[parts.length - 1] ?? "";
    const label =
      navItems.find((i) => i.to.replace("/", "") === last)?.label ??
      last.replace(/[-_]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    return (
      <>
        <Link to="/" className="cursor-pointer">
          Home
        </Link>{" "}
        / <span>{label}</span>
      </>
    );
  }, [location.pathname]);

  useEffect(() => {
    const saved = localStorage.getItem("theme") === "dark";
    setDark(saved);
    document.documentElement.classList.toggle("dark", saved);
  }, []);

  const toggle = () => {
    const newMode = !dark;
    setDark(newMode);

    document.documentElement.classList.toggle("dark", newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
  };

  return (
    <header className="sticky top-0 z-30 border-b border-zinc-200 bg-white/80 backdrop-blur dark:bg-gray-900 dark:text-white dark:border-gray-700">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-4">
        <NavLink to="/" className="flex items-center gap-2">
          <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent">
            <span className="absolute left-0 top-1 h-2.5 w-2.5 rotate-45 rounded-sm bg-orange-500" />
            <span className="absolute left-2 top-0 h-2.5 w-2.5 rotate-45 rounded-sm bg-red-500" />
            <span className="absolute left-2 top-2.5 h-2.5 w-2.5 rotate-45 rounded-sm bg-orange-400" />
          </span>
          <span className="text-xl font-semibold tracking-tight text-zinc-950 dark:text-white">
            Gshop
          </span>
        </NavLink>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={`${item.to}-${item.label}`}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                [
                  "relative text-sm font-medium transition",
                  "after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-primary",
                  "after:scale-x-0 after:origin-left after:transition-transform after:duration-300",
                  "hover:after:scale-x-100",
                  isActive
                    ? "text-primary after:scale-x-100 dark:text-primary"
                    : "text-zinc-700 hover:text-primary dark:text-white",
                ].join(" ")
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-zinc-700 transition hover:bg-zinc-100 hover:text-zinc-950 md:hidden cursor-pointer dark:text-white"
            aria-label="Open menu"
            title="Open menu"
            onClick={() => setIsMenuOpen(true)}
          >
            <FontAwesomeIcon icon={faBars} className="dark:text-white" />
          </button>

          <button
            type="button"
            className="hidden h-10 w-10 items-center justify-center rounded-full text-zinc-700 transition hover:bg-zinc-100 hover:text-zinc-950 md:inline-flex cursor-pointer dark:text-white"
            aria-label="Search"
            title="Search"
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>

          <button
            type="button"
            onClick={openCart}
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-zinc-700 transition hover:bg-zinc-100 hover:text-zinc-950 cursor-pointer dark:text-white"
            aria-label="Open cart"
            title="Open cart"
          >
            <FontAwesomeIcon icon={faCartShopping} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 inline-flex min-w-5 items-center justify-center rounded-full bg-orange-500 px-1 py-0.5 text-[11px] font-bold leading-none text-white cursor-pointer">
                {cartCount}
              </span>
            )}
          </button>

          <NavLink
            to="/shop"
            className="h-10 items-center justify-center rounded-lg bg-primary px-4 text-sm font-semibold text-white transition hover:bg-secondary cursor-pointer hidden sm:inline-flex"
          >
            Get Started
          </NavLink>
          <button className="cursor-pointer" onClick={toggle}>
            {dark ? "☀️" : "🌙"}
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-zinc-950/30 dark:bg-gray-900"
            aria-label="Close menu overlay"
            onClick={() => setIsMenuOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-[86%] max-w-sm bg-white shadow-2xl ring-1 ring-zinc-200 dark:bg-gray-900">
            <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-4">
              <div className="text-sm font-semibold text-zinc-950 dark:text-white">
                {breadcrumb}
              </div>
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full text-zinc-700 transition hover:bg-zinc-100 hover:text-zinc-950"
                aria-label="Close menu"
                onClick={() => setIsMenuOpen(false)}
              >
                <FontAwesomeIcon
                  icon={faXmark}
                  className="text-lg cursor-pointer bg-primary text-white px-1 py-1 rounded-md hover:bg-red-600 transition"
                />
              </button>
            </div>

            <div className="px-4 py-4 border-zinc-200 bg-white/90 backdrop-blur dark:bg-gray-900">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="cursor-pointer inline-flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 text-zinc-800"
                  aria-label="Search"
                >
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsMenuOpen(false);
                    openCart();
                  }}
                  className="relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 text-zinc-800 cursor-pointer"
                  aria-label="Open cart"
                >
                  <FontAwesomeIcon icon={faCartShopping} />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 inline-flex min-w-5 items-center justify-center rounded-full bg-orange-500 px-1 py-0.5 text-[11px] font-bold leading-none text-white">
                      {cartCount}
                    </span>
                  )}
                </button>
                <NavLink
                  to="/shop"
                  onClick={() => setIsMenuOpen(false)}
                  className="ml-auto inline-flex h-10 items-center justify-center rounded-lg bg-primary px-4 text-sm font-semibold text-white transition hover:bg-secondary"
                >
                  Get Started
                </NavLink>
              </div>

              <div className="mt-5 grid gap-2">
                {navItems.map((item) => (
                  <NavLink
                    key={`m-${item.to}-${item.label}`}
                    to={item.to}
                    end={item.to === "/"}
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) =>
                      [
                        "flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition",
                        isActive
                          ? "bg-primary text-white "
                          : "bg-zinc-100 text-zinc-900 hover:bg-zinc-100 dark:bg-gray-800 dark:text-white",
                      ].join(" ")
                    }
                  >
                    <span>{item.label}</span>
                    <span className="text-white-400">›</span>
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
