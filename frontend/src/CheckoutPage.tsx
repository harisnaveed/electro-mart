import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import SEO from "./components/SEO";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const [toast, setToast] = useState("");
  const [loading, setLoading] = useState(false);
  const { cart, removeFromCart } = useCart();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const validateForm = () => {
    let newErrors: any = {};

    if (!form.name.trim()) {
      newErrors.name = "Full name is required";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      newErrors.email = "Enter a valid email";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Phone is required";
    }

    if (!form.address.trim()) {
      newErrors.address = "Address is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const shipping = subtotal > 500 ? 0 : 15;
  const taxValue = 0.08;
  const tax = subtotal * taxValue;
  const total = subtotal + shipping + tax;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      setToast("Cart is empty");
      setTimeout(() => setToast(""), 2000);
      return;
    }

    if (!validateForm()) return;

    try {
      setLoading(true);
      const res = await fetch(
        "https://widget.boostmyrepair.com/southchase/myrepairapp/create-checkout-session.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cart,
            shipping,
            tax: taxValue,
            form,
          }),
        },
      );

      const data = await res.json();
      if (data.url) {
        setToast("Redirecting to payment...");
        window.location.href = data.url;
      } else {
        setToast("Something went wrong");
        setTimeout(() => setToast(""), 2000);
        setLoading(false);
        throw new Error("No URL returned");
      }
    } catch (error) {
      setLoading(false);
      setToast("Server error: " + error);
      setTimeout(() => setToast(""), 2000);
    }
  };

  return (
    <>
      <SEO
        title="Secure Checkout | Electro Mart"
        description="Complete your purchase securely at Electro Mart. Fast, safe, and encrypted checkout with trusted payment methods."
        page="/checkout"
      />
      <div className="min-h-screen bg-zinc-100 p-6 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-6">
          {/* ✅ FORM START */}
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-xl shadow-sm border space-y-4 dark:bg-gray-900 dark:border-gray-700"
          >
            <h2 className="text-lg font-semibold">Shipping Details</h2>

            {/* NAME */}
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full border rounded-lg px-3 py-2 text-sm dark:bg-gray-900 dark:text-zinc-500 dark:ring-zinc-800 dark:focus:border-gray-700"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}

            {/* EMAIL */}
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full border rounded-lg px-3 py-2 text-sm dark:bg-gray-900 dark:text-zinc-500 dark:ring-zinc-800 dark:focus:border-gray-700"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
            {/* PHONE */}
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="w-full border rounded-lg px-3 py-2 text-sm dark:bg-gray-900 dark:text-zinc-500 dark:ring-zinc-800 dark:focus:border-gray-700"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone}</p>
            )}
            {/* ADDRESS */}
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Address"
              className="w-full border rounded-lg px-3 py-2 text-sm dark:bg-gray-900 dark:text-zinc-500 dark:ring-zinc-800 dark:focus:outline-gray-700"
            />
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address}</p>
            )}
            {/* ✅ SUBMIT BUTTON INSIDE FORM */}
            <button
              type="submit"
              disabled={
                loading ||
                cart.length === 0 ||
                !form.name.trim() ||
                !form.email.trim() ||
                !form.phone.trim() ||
                !form.address.trim()
              }
              className="
          w-full mt-4
          flex items-center justify-center gap-2
          px-5 py-3
          rounded-full
          bg-primary text-white text-sm font-medium
          shadow-sm transition-all duration-200
          hover:bg-secondary hover:shadow-md
          dark:hover:bg-gray-700
          active:scale-95
          disabled:opacity-50 disabled:cursor-not-allowed
          cursor-pointer
        "
            >
              {cart.length === 0 ? (
                "🛒 Cart is empty"
              ) : loading ? (
                <>
                  {/* Spinner */}
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin dark:border-gray-700"></span>
                  Redirecting to Stripe...
                </>
              ) : (
                "Place Order →"
              )}
            </button>
            <div className="mt-4">
              <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                🔒 <span>Secure Payment · SSL Encrypted</span>
              </div>
            </div>
          </form>
          {toast && (
            <div className="fixed bottom-20 right-5 bg-black dark:bg-primary text-white px-4 py-2 rounded-lg shadow-lg text-sm z-50">
              {toast}
            </div>
          )}
          {/* ✅ FORM END */}

          {/* RIGHT SIDE (NOT inside form) */}
          <div className="space-y-6">
            {/* Order Summary */}
            <div className="bg-white p-5 rounded-xl shadow-sm border dark:bg-gray-900 dark:border-gray-700">
              <h2 className="font-semibold text-lg mb-4">Order Summary</h2>

              <div className="space-y-4">
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center">
                    <p className="text-3xl mb-4">🛒</p>
                    <p className="text-gray-500 text-center dark:test-gray-300">
                      Cart is empty, please{" "}
                      <Link
                        to="/" // change this to your actual shop/products route
                        className="text-primary hover:underline font-medium"
                      >
                        continue shopping
                      </Link>
                    </p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-start gap-3 border-b pb-3 dark:border-gray-700"
                    >
                      {/* LEFT */}
                      <div className="flex-1">
                        <p className="text-sm font-medium break-words">
                          {item.title}
                        </p>
                        <p className="text-xs text-zinc-500">
                          {item.quantity} × ${item.price}
                        </p>
                      </div>

                      {/* RIGHT */}
                      <div className="flex items-center gap-3">
                        {/* Price */}
                        <p className="text-sm font-semibold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>

                        {/* ❌ Remove Button */}
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-600 transition cursor-pointer text-lg"
                          title="Remove item"
                        >
                          <FontAwesomeIcon
                            icon={faTrash}
                            className="text-gray-500 text-sm hover:text-red-500"
                          />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Total */}
            <div className="bg-white p-5 rounded-xl shadow-sm border dark:bg-gray-900 dark:border-gray-700">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="border-t mt-4 pt-4 flex justify-between font-semibold text-lg dark:border-gray-700">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <p className="text-xs text-secondary mt-2 dark:text-gray-400">
                Free shipping on orders over $500
              </p>

              <button
                className="mt-2 w-full text-sm text-zinc-600 cursor-pointer hover:underline dark:text-gray-300"
                onClick={() => navigate("/")}
              >
                ← Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
