import TestimonialSection from "../components/TestimonialSection";
import { useNavigate } from "react-router-dom";
import SEO from "../components/SEO";

export default function AboutPage() {
  const navigate = useNavigate();
  return (
    <div>
      <SEO
        title="About Electro Mart | Trusted Electronics Store"
        description="Learn more about Electro Mart, your trusted source for quality electronics, accessories, and gadgets with reliable service and secure shopping."
        page="/about"
      />
      {/* ================= HEADER ================= */}
      <div className="text-center py-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
          About Us
        </h1>
        <p className="mt-2 text-gray-600 dark:text-white">
          Learn more about who we are and what we do
        </p>
      </div>

      {/* ================= SECTION 1 ================= */}
      <section className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-2 gap-10 items-center">
        {/* Image */}
        <div>
          <img
            src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8"
            alt="About"
            className="w-full h-[350px] object-cover rounded-lg"
          />
        </div>

        {/* Content */}
        <div>
          <p className="text-sm font-semibold text-orange-600">About Us</p>
          <h3 className="mt-2 text-3xl font-extrabold tracking-tight text-secondary dark:bg-gray-900 dark:text-white">
            We Work for Your Success
          </h3>

          <p className="text-gray-600 mt-2 dark:text-white mb-4 leading-relaxed">
            At Electro Mart, we specialize in providing high-quality electronic
            products and repair services. Our goal is to deliver reliable
            solutions with customer satisfaction at the core of everything we
            do.
          </p>

          <p className="text-gray-600 dark:text-white leading-relaxed">
            Whether you're buying new devices or fixing existing ones, our team
            ensures quality, affordability, and fast service every time.
          </p>

          <button
            type="button"
            onClick={() => navigate("/contact")}
            class="mt-5 inline-flex h-11 cursor-pointer items-center justify-center rounded-xl bg-primary px-6 text-sm font-extrabold text-white shadow-sm transition hover:bg-secondary"
          >
            Contact Us
          </button>
        </div>
      </section>

      {/* ================= SECTION 2 ================= */}
      <section className="bg-gray-50 py-10 px-6 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-2xl font-extrabold tracking-tight mb-1 text-zinc-950 dark:text-white">
            Why Choose Us
          </h3>
          <p className="text-gray-600 dark:text-white mb-8">
            We deliver quality service with trust and reliability
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border dark:border-gray-700">
              <div className="text-primary items-center justify-center flex">
                <svg
                  width="50"
                  height="50"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 3l7 4v5c0 5-3.5 8-7 9-3.5-1-7-4-7-9V7l7-4z" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                Quality Service
              </h4>
              <p className="text-gray-600 dark:text-white text-sm">
                We use premium parts and skilled technicians for every repair.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border dark:border-gray-700">
              <div className="text-primary items-center justify-center flex">
                <svg
                  width="50"
                  height="50"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="9" cy="10" r="1" fill="currentColor" />
                  <circle cx="15" cy="10" r="1" fill="currentColor" />
                  <path d="M8 15c1.5 1 3 1 4 1s2.5 0 4-1" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                Customer Support
              </h4>
              <p className="text-gray-600 dark:text-white text-sm">
                Friendly support team ready to assist you anytime.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border dark:border-gray-700">
              <div className="text-primary items-center justify-center flex">
                <svg
                  width="50"
                  height="50"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 2v20" />
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7H14.5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                Affordable Pricing
              </h4>
              <p className="text-gray-600 dark:text-white text-sm">
                Transparent pricing with no hidden charges.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION 3 ================= */}
      <TestimonialSection />
    </div>
  );
}
