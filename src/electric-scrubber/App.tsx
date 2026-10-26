import "./App.css";

import { useState } from "react";

import HeroSection from "./HeroSection";
import CustomerReviews from "./CustomerReviews";
import Features from "./Features";
import OrderForm from "./OrderForm";
import Footer from "./Footer";
import SalesNotifications from "./SalesNotifications";
import FAQSection from "./FAQSection";
import CustomerReviews2 from "./CustomerReviews2";
import FreeGiftsSection from "./FreeGiftsSection";
import FinalSalesSection from "./FinalSalesSection";

function App() {
  const [openModal, setOpenModal] = useState<
    "privacy" | "terms" | null
  >(null);

  return (
    <div className="min-h-screen overflow-x-hidden bg-white font-sans text-slate-900 antialiased selection:bg-amber-100 selection:text-[#101A35]">
      {/* SKIP LINK FOR KEYBOARD USERS */}
      <a
        href="#main-content"
        className="fixed left-3 top-24 z-[110] -translate-y-40 rounded-lg bg-white px-4 py-3 font-bold text-[#101A35] shadow-lg focus:translate-y-0"
      >
        Skip to main content
      </a>

      {/* MAIN LANDING PAGE */}
      <main id="main-content">
        {/* HERO: Fixed top countdown, video and offer */}
        <HeroSection />

        {/* FIRST CUSTOMER REVIEWS */}
        <CustomerReviews />

        {/* FEATURES: Benefits and product image gallery */}
        <Features />

        <FAQSection />

        <CustomerReviews2 />

        <FreeGiftsSection />

        <FinalSalesSection />

        {/* CHECKOUT: EmailJS and WhatsApp */}
        <OrderForm />
      </main>

      {/* FOOTER AND LEGAL MODALS */}
      <Footer
        openModal={openModal}
        setOpenModal={setOpenModal}
      />

      <SalesNotifications />
    </div>
  );
}

export default App;