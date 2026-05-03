import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";


export default function PaymentCancel() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
        
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <FontAwesomeIcon icon={faCircleXmark} className="text-red-500 text-[50px]" />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-800">
          Payment Cancelled ❌
        </h2>

        {/* Description */}
        <p className="text-gray-500 mt-2">
          Your payment was not completed. You can try again or continue shopping.
        </p>

        {/* Buttons */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={() => navigate("/checkout")}
            className="w-1/2 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 rounded-lg transition cursor-pointer"
          >
            Try Again
          </button>

          <button
            onClick={() => navigate("/")}
            className="w-1/2 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition cursor-pointer"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}