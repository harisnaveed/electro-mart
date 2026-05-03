import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
function ContactSection() {
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
            <div className="mt-2 text-sm font-semibold">
              24K Royal, Mesa,
              <br />
              New Jersey 45
            </div>

            <div className="mt-6 text-sm font-semibold text-white/80 dark:text-gray-400">
              Contact
            </div>
            <div className="mt-2 text-sm font-semibold">
              +92 300 000 0000
              <br />
              support@myrepair.com
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

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs font-semibold text-secondary dark:bg-gray-900 dark:text-gray-400">
                Your Name *
              </label>
              <input
                className="mt-2 h-11 w-full rounded-xl bg-zinc-50 px-4 text-sm font-semibold text-zinc-900 outline-none ring-1 ring-zinc-200 focus:ring-2 focus:ring-orange-300 dark:bg-gray-900 dark:text-zinc-500 dark:ring-zinc-800 dark:focus:ring-gray-700"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-secondary dark:bg-gray-900 dark:text-gray-400">
                Email *
              </label>
              <input
                type="email"
                className="mt-2 h-11 w-full rounded-xl bg-zinc-50 px-4 text-sm font-semibold text-zinc-900 outline-none ring-1 ring-zinc-200 focus:ring-2 focus:ring-orange-300 dark:bg-gray-900 dark:text-zinc-500 dark:ring-zinc-800 dark:focus:ring-gray-700"
                placeholder="Enter email"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs font-semibold text-secondary dark:bg-gray-900 dark:text-gray-400">
                Phone *
              </label>
              <input
                className="mt-2 h-11 w-full rounded-xl bg-zinc-50 px-4 text-sm font-semibold text-zinc-900 outline-none ring-1 ring-zinc-200 focus:ring-2 focus:ring-orange-300 dark:bg-gray-900 dark:text-zinc-500 dark:ring-zinc-800 dark:focus:ring-gray-700"
                placeholder="Enter phone number"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs font-semibold text-secondary dark:bg-gray-900 dark:text-gray-400">
                Your Message *
              </label>
              <textarea
                className="mt-2 min-h-28 w-full resize-none rounded-xl bg-zinc-50 px-4 py-3 text-sm font-semibold text-zinc-900 outline-none ring-1 ring-zinc-200 focus:ring-2 focus:ring-orange-300 dark:bg-gray-900 dark:text-zinc-500 dark:ring-zinc-800 dark:focus:ring-gray-700"
                placeholder="Write here..."
              />
            </div>
          </div>

          <button
            type="button"
            className="mt-5 inline-flex h-11 cursor-pointer items-center justify-center rounded-xl bg-primary px-6 text-sm font-extrabold text-white shadow-sm transition hover:bg-secondary"
          >
            Send Message
          </button>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
