import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper/modules";
import Card from "./Card";
import { CardStars } from "./Card/CardStars";
import { CardText } from "./Card/CardText";
import { CardUser } from "./Card/CardUser";

export default function TestimonialSection() {
  const testimonials = [
    {
      name: "Ali Khan",
      role: "iPhone User",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      text: "Got my iPhone screen replaced within an hour. Excellent service.",
      stars: 5,
    },
    {
      name: "Haris Naveed",
      role: "Laptop Repair",
      image: "https://randomuser.me/api/portraits/men/45.jpg",
      text: "Motherboard issue fixed perfectly. Highly recommended!",
      stars: 3,
    },
    {
      name: "Ahmed Raza",
      role: "Android User",
      image: "https://randomuser.me/api/portraits/men/12.jpg",
      text: "Battery replacement was quick and affordable.",
      stars: 2,
    },
    {
      name: "Sara Ahmed",
      role: "Customer",
      image: "https://randomuser.me/api/portraits/women/50.jpg",
      text: "Friendly support and transparent pricing.",
      stars: 4,
    },
    {
      name: "Usman Tariq",
      role: "Gaming Laptop",
      image: "https://randomuser.me/api/portraits/men/60.jpg",
      text: "Laptop performance improved significantly after service.",
      stars: 1,
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
              <Card className="h-auto lg:h-[200px] cursor-pointer">
                <CardStars count={t.stars} />
                <CardText>“{t.text}”</CardText>
                <CardUser image={t.image} name={t.name} role={t.role} />
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* ✅ CUSTOM PAGINATION BELOW */}
        <div className="custom-pagination mt-6 flex justify-center"></div>
      </div>
    </section>
  );
}
