import { createContext, useContext } from "react";

type CartUiContextValue = {
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
};

const CartUiContext = createContext<CartUiContextValue | null>(null);

export function CartUiProvider(props: {
  value: CartUiContextValue;
  children: React.ReactNode;
}) {
  return (
    <CartUiContext.Provider value={props.value}>
      {props.children}
    </CartUiContext.Provider>
  );
}

export function useCartUi() {
  const ctx = useContext(CartUiContext);
  if (!ctx) {
    throw new Error("useCartUi must be used within CartUiProvider");
  }
  return ctx;
}

