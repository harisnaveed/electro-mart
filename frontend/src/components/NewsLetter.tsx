function NewsLetterSection() {
  return (
    <section className="mt-10">
      <div
        className="relative overflow-hidden rounded-3xl 
      bg-gradient-to-r from-orange-500 via-orange-500 to-orange-600 
      dark:bg-gradient-to-r dark:from-gray-800 dark:via-gray-800 dark:to-gray-900 dark:shadow-[0_22px_50px_rgba(0,0,0,0.15)]
      px-6 py-10 text-white shadow-[0_22px_50px_rgba(249,115,22,0.25)] sm:px-10"
      >
        <div className="pointer-events-none absolute inset-0 opacity-25">
          <div className="absolute -left-16 -top-16 h-56 w-56 rounded-full bg-white/25 blur-2xl" />
          <div className="absolute right-10 top-10 h-40 w-40 rounded-full bg-white/15 blur-2xl" />
          <div className="absolute -right-20 -bottom-20 h-60 w-60 rounded-full bg-white/20 blur-2xl" />
        </div>

        <div className="relative grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <h3 className="text-3xl font-extrabold tracking-tight">
              Subscribe to
              <span className="block">our newsletter</span>
            </h3>
            <p className="mt-3 max-w-lg text-sm text-white/85">
              Join our newsletter to get exclusive offers, timely updates, and
              expert tips that help you take control of your devices.
            </p>
          </div>

          <div className="rounded-2xl bg-white/15 p-4 ring-1 ring-white/20 backdrop-blur sm:p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
              <div className="flex-1">
                <label className="block text-xs font-semibold text-white/90">
                  Stay informed
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="mt-2 h-11 w-full rounded-xl bg-white px-4 text-sm font-semibold text-zinc-900 outline-none ring-1 ring-white/40 placeholder:text-zinc-400 focus:ring-2 focus:ring-white"
                />
              </div>
              <button
                type="button"
                className="inline-flex h-11 cursor-pointer items-center justify-center rounded-xl bg-secondary dark:bg-gray-900 px-6 text-sm font-extrabold text-white shadow-sm transition hover:bg-zinc-900"
              >
                Subscribe
              </button>
            </div>
            <p className="mt-3 text-[11px] text-white/80">
              By subscribing you agree to our{" "}
              <span className="font-semibold underline underline-offset-2">
                Privacy Policy
              </span>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NewsLetterSection;
