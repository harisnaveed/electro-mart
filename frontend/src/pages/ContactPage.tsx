import ContactSection from "../components/ContactSection";
import MapComponent from "../components/MapComponent";
import SEO from "../components/SEO";
export default function ContactPage() {
  return (
    <>
      <SEO
        title="Contact Us | Electro Mart Support & Help"
        description="Get in touch with Electro Mart for support, inquiries, or product information. We're here to help you with all your electronics needs."
        page="/contact"
      />
      <div className="text-center py-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
          Contact Us
        </h1>
        <p className="mt-2 text-gray-600 dark:text-white">
          We’d love to hear from you
        </p>
      </div>
      <ContactSection />
      <MapComponent height="h-80" className="mb-5" />
    </>
  );
}
