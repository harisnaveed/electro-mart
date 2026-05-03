import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function CartSidebar({ isOpen, onClose }: Props) {
  const { cart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();
  const [toast, setToast] = useState("");

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-[360px] bg-white/50 dark:bg-gray-900/50 backdrop-blur border-l border-white/20 z-50 shadow-2xl transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-4 flex flex-col h-full">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-zinc-800 dark:text-white">
              Cart
            </h2>

            <button
              onClick={onClose}
              className="text-lg cursor-pointer bg-primary text-white px-2 py-0.5 rounded-md hover:bg-secondary transition"
            >
              ✕
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto space-y-4 pr-1">
            {cart.length === 0 ? (
              <p className="text-sm text-gray-500 text-center mt-10 dark:text-white">
                Your cart is empty
              </p>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="relative bg-white rounded-xl p-3 mt-1 shadow-sm border border-zinc-200 hover:shadow-md transition
                  dark:bg-gray-800 dark:border-gray-700"
                >
                  {/* 🗑️ Trash Icon (optional below badge) */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="
                      absolute -top-1 right-0
                      w-6 h-6 flex items-center justify-center
                      rounded-full bg-red-100 text-red-500
                      hover:bg-red-200 hover:text-red-600
                      transition cursor-pointer
                    "
                  >
                    <FontAwesomeIcon
                      icon={faXmark}
                      className="text-red-500 text-[10px]"
                    />
                  </button>

                  {/* Content */}
                  <div className="flex flex-col gap-1 pr-6">
                    <p className="text-sm font-medium text-zinc-800 dark:text-white break-words leading-tight">
                      {item.title}
                    </p>

                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      {item.quantity} × ${item.price}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="mt-2 text-sm font-semibold text-zinc-800 dark:text-white">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {cart.length > 0 ? (
            <div className="mt-4 border-t dark:border-gray-700 pt-4 space-y-3">
              {/* Total */}
              <div className="flex justify-between items-center text-base font-semibold text-zinc-800 dark:text-white">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              {/* Buttons Row */}
              <div className="flex gap-2">
                {/* Clear Cart */}
                <button
                  onClick={clearCart}
                  className="flex-1 bg-red-500 text-white py-2 rounded-lg text-sm
                 hover:bg-red-600 transition cursor-pointer
                 flex items-center justify-center gap-1"
                >
                  🗑️ Clear
                </button>

                {/* Checkout */}
                <button
                  onClick={() => {
                    if (cart.length === 0) {
                      setToast("Your cart is empty");
                      setTimeout(() => setToast(""), 2000);
                      return;
                    }

                    navigate("/checkout");
                  }}
                  className="flex-1 bg-primary text-white py-2 rounded-lg text-sm
                 hover:bg-secondary transition cursor-pointer
                 flex items-center justify-center gap-1"
                >
                  Checkout →
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-4 border-t pt-4 space-y-3 dark:border-gray-700">
              <div className="flex gap-2">
                <button
                  onClick={onClose}
                  className="flex-1 bg-primary text-white py-2 rounded-lg text-sm
                 hover:bg-secondary transition cursor-pointer
                 flex items-center justify-center gap-1"
                >
                  ← Back
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {toast && (
        <div className="fixed bottom-15 right-5 bg-black dark:bg-primary text-white px-4 py-2 rounded-lg shadow-lg text-sm z-[999]">
          {toast}
        </div>
      )}
    </>
  );
}
