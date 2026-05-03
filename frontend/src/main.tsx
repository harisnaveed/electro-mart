import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import PaymentSuccess from "./success.tsx";
import PaymentCancel from "./cancel.tsx";

import { CartProvider } from "./CartContext.tsx";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import CheckoutPage from "./CheckoutPage";
import Layout from "./Layout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import Shop from "./pages/ShopPage.tsx";
import { HelmetProvider } from "react-helmet-async";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/success" element={<PaymentSuccess />} />
              <Route path="/cancel" element={<PaymentCancel />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </HelmetProvider>
  </StrictMode>,
);
