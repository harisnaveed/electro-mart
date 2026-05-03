import ContactSection from "../components/ContactSection";
import SEO from "../components/SEO";
export default function AboutPage() {
  return (
    <>
      <SEO
        title="About Electro Mart | Trusted Electronics Store"
        description="Learn more about Electro Mart, your trusted source for quality electronics, accessories, and gadgets with reliable service and secure shopping."
        page="/about"
      />
      <div className="text-center py-10 dark:bg-gray-900 dark:text-white">
        <h1 className="text-3xl sm:text-4xl font-bold text-secondary dark:bg-gray-900 dark:text-white">
          About Us
        </h1>
        <p className="mt-2 text-gray-600 dark:bg-gray-900 dark:text-white">
          Electro Mart is your one-stop store for electronics and accessories.
          We focus on quality products, clear pricing, and a smooth checkout
          experience.
        </p>
      </div>
      <ContactSection />
    </>
  );
}
