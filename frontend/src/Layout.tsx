import { Outlet } from "react-router-dom";
import { useCallback, useMemo, useState } from "react";
import Header from "./header";
import Footer from "./footer";
import CartSidebar from "./CartSidebar";
import { CartUiProvider } from "./CartUiContext";

export default function Layout() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);
  const toggleCart = useCallback(() => setIsCartOpen((v) => !v), []);

  const value = useMemo(
    () => ({ isCartOpen, openCart, closeCart, toggleCart }),
    [isCartOpen, openCart, closeCart, toggleCart],
  );

  return (
    <CartUiProvider value={value}>
      <div className="min-h-dvh bg-zinc-50 text-zinc-950 flex flex-col dark:bg-gray-900 dark:text-white">
        <Header />
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 dark:bg-gray-900 dark:text-white">
          <Outlet />
        </main>
        <Footer />
        <CartSidebar isOpen={isCartOpen} onClose={closeCart} />
      </div>
    </CartUiProvider>
  );
}
