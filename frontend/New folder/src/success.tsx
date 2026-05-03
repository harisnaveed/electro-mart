import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck  } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";
import { useEffect } from "react";

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const { clearCart } = useCart();
  useEffect(() => {
    clearCart();
  }, []);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
        
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <FontAwesomeIcon
            icon={faCircleCheck}
            className="text-green-500 text-4xl"
          />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-800">
          Payment Successful 🎉
        </h2>

        {/* Description */}
        <p className="text-gray-500 mt-2">
          Your payment has been processed successfully. Thank you for your purchase!
        </p>

        {/* Button */}
        <button
          onClick={() => navigate("/")}
          className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition cursor-pointer"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}