"use client";
export default function Error({ error }: { error: Error }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-semibold">Error</h1>
      <p className="text-stone-600">{error.message}</p>
    </div>
  );
}
