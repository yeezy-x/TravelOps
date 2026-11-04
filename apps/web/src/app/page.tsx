
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F8F7F2] px-6">
      <section className="max-w-2xl text-center">
        <p className="mb-4 text-sm font-medium tracking-[0.3em] text-[#54745D] uppercase">
          Discover South India
        </p>

        <h1 className="text-5xl font-semibold tracking-tight text-[#243B2D] sm:text-7xl">
          Kerala Trails
        </h1>

        <p className="mt-6 text-lg leading-8 text-stone-600">
          Thoughtfully curated journeys through Kerala and beyond.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/packages"
            className="inline-flex items-center justify-center rounded-lg bg-[#243B2D] px-7 py-3 text-sm font-medium text-white transition-colors hover:bg-[#365641]"
          >
            Explore Packages
          </Link>

          <Link
            href="/login"
            className="inline-flex items-center justify-center rounded-lg border border-[#243B2D] px-7 py-3 text-sm font-medium text-[#243B2D] transition-colors hover:bg-[#243B2D]/5"
          >
            Staff Login
          </Link>
        </div>

        <p className="mt-16 text-xs tracking-wide text-stone-400">
          Crafted journeys. Meaningful experiences.
        </p>
      </section>
    </main>
  );
}
