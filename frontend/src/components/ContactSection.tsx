import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import InputField from "./InputField";
import TextareaField from "./TextareaField";
import PremiumButton from "./PremiumButton";
function ContactSection() {
  const businessPhone = import.meta.env.VITE_PHONE;
  const businessEmail = import.meta.env.VITE_EMAIL;
  const businessAddress = import.meta.env.VITE_MAP_ADDRESS;
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      message: formData.get("message"),
    };

    console.log(data);

    // 👉 send to API here
  };
  return (
    <section className="mt-10 dark:bg-gray-900 dark:text-white mb-5">
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
        <div className="relative overflow-hidden rounded-3xl bg-[#0B1A3A] p-7 text-white shadow-[0_20px_50px_rgba(2,6,23,0.25)] dark:bg-gray-900 dark:text-white">
          <div className="pointer-events-none absolute inset-0 opacity-20">
            <div className="absolute -left-20 -top-24 h-64 w-64 rounded-full bg-white/20 blur-3xl" />
            <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          </div>

          <div className="relative">
            <div className="text-sm font-semibold text-white/80 dark:text-gray-400">
              Address
            </div>
            <div className="mt-2 text-sm font-semibold">{businessAddress}</div>

            <div className="mt-6 text-sm font-semibold text-white/80 dark:text-gray-400">
              Contact
            </div>
            <div className="mt-2 text-sm font-semibold">
              {businessPhone}
              <br />
              {businessEmail}
            </div>

            <div className="mt-6 text-sm font-semibold text-white/80 dark:text-gray-400">
              Open Time
            </div>
            <div className="mt-2 text-sm font-semibold">
              Saturday - Friday : 10:00 - 20:00
            </div>

            <div className="mt-7 text-sm font-semibold text-white/80 dark:text-gray-400">
              Stay Connected
            </div>
            <div className="mt-3 flex items-center gap-3">
              {[faFacebookF, faTwitter, faInstagram, faLinkedinIn].map(
                (icon, i) => (
                  <button
                    key={i}
                    type="button"
                    className="grid h-10 w-10 cursor-pointer place-items-center rounded-full bg-white/10 dark:bg-gray-700 text-sm font-extrabold text-white dark:text-gray-900 hover:text-white ring-1 ring-white/15 transition hover:bg-primary/25 hover:ring-primary/40"
                    aria-label="Social"
                  >
                    <FontAwesomeIcon
                      icon={icon}
                      className="text-gray-600 group-hover:text-white dark:text-gray-900"
                    />
                  </button>
                ),
              )}
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-7 shadow-[0_18px_40px_rgba(15,23,42,0.06)] ring-1 ring-zinc-100 dark:bg-gray-900 dark:text-white dark:ring-gray-800">
          <p className="text-sm font-semibold text-orange-600">Contact Us</p>
          <h3 className="mt-2 text-3xl font-extrabold tracking-tight text-secondary dark:bg-gray-900 dark:text-white">
            Get Your Free Quote Today!
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div>
                <InputField
                  label="Your Name"
                  name="name"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div>
                <InputField
                  label="Email"
                  name="email"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <InputField
                  label="Phone"
                  name="phone"
                  placeholder="Enter phone number"
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <TextareaField
                  label="Your Message"
                  name="message"
                  placeholder="Write here..."
                />
              </div>
            </div>

            <PremiumButton className="inline-flex items-center justify-center rounded-xl px-6 text-sm h-11 font-extrabold text-white mt-5">
              Send Message
            </PremiumButton>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
