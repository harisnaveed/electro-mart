import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import PaymentSuccess from "./success.tsx";
import PaymentCancel from "./cancel.tsx";

import App from "./App.tsx";
import { CartProvider } from "./CartContext.tsx";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import CheckoutPage from "./CheckoutPage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/success" element={<PaymentSuccess />} />
          <Route path="/cancel" element={<PaymentCancel />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  </StrictMode>,
);
