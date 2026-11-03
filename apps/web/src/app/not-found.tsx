import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-semibold">404</h1>
      <p className="text-stone-600">Page not found</p>
      <Link href="/" className="underline">
        Return home
      </Link>
    </main>
  );
}
