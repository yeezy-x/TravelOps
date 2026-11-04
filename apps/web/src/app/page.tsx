import { Suspense } from "react";
import { db } from "@repo/db";
import { connection } from "next/server"

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

        <Suspense fallback={<p className="mt-8 text-sm text-stone-400">Loading travelers...</p>}>
          <UserList />
        </Suspense>
      </section>
    </main>
  );
}

async function UserList() {
  await connection()
  const users = await db.orm.public.User.select("id", "email", "name").all();

  if (users.length === 0) {
    return <p className="mt-8 text-sm text-stone-400">No travelers yet.</p>;
  }

  return (
    <ul className="mx-auto mt-8 max-w-md space-y-2 text-left text-sm text-stone-600">
      {users.map((user) => (
        <li key={user.id}>
          {user.id} · {user.email}
          {user.name ? ` · ${user.name}` : ""}
        </li>
      ))}
    </ul>
  );
}
