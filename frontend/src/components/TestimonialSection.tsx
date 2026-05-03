import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper/modules";

export default function TestimonialSection() {
  const testimonials = [
    {
      name: "Ali Khan",
      role: "iPhone User",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      text: "Got my iPhone screen replaced within an hour. Excellent service.",
    },
    {
      name: "Haris Naveed",
      role: "Laptop Repair",
      image: "https://randomuser.me/api/portraits/men/45.jpg",
      text: "Motherboard issue fixed perfectly. Highly recommended!",
    },
    {
      name: "Ahmed Raza",
      role: "Android User",
      image: "https://randomuser.me/api/portraits/men/12.jpg",
      text: "Battery replacement was quick and affordable.",
    },
    {
      name: "Sara Ahmed",
      role: "Customer",
      image: "https://randomuser.me/api/portraits/women/50.jpg",
      text: "Friendly support and transparent pricing.",
    },
    {
      name: "Usman Tariq",
      role: "Gaming Laptop",
      image: "https://randomuser.me/api/portraits/men/60.jpg",
      text: "Laptop performance improved significantly after service.",
    },
  ];

  return (
    <section className="py-10 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
          What Our Customers Say
        </h3>
        <p className="text-gray-600 dark:text-white mb-8">
          Real feedback from our repair customers
        </p>

        <Swiper
          modules={[Pagination]}
          spaceBetween={20}
          pagination={{ clickable: true }}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {testimonials.map((t, i) => (
            <SwiperSlide key={i}>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border h-full dark:border-gray-700">
                {/* Stars */}
                <div className="flex text-primary text-sm mb-3">
                  {"★★★★★".split("").map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>

                {/* Text */}
                <p className="text-gray-600 dark:text-white text-sm mb-4">
                  “{t.text}”
                </p>

                {/* User */}
                <div className="flex items-center gap-3 mt-auto">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                      {t.name}
                    </h4>
                    <p className="text-xs text-gray-500">{t.role}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* ✅ CUSTOM PAGINATION BELOW */}
        <div className="custom-pagination mt-6 flex justify-center"></div>
      </div>
    </section>
  );
}
