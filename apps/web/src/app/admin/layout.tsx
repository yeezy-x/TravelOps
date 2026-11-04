import { Suspense } from "react";
import { requireUser } from "@/modules/auth/guards";
import { LogoutButton } from "@/components/auth/logout-button";

import type { ReactNode } from "react";

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center">
          <p className="text-sm text-stone-500">
            Checking session...
          </p>
        </main>
      }
    >
      <AdminShell>{children}</AdminShell>
    </Suspense>
  );
}

async function AdminShell({
  children,
}: {
  children: ReactNode;
}) {
  const user = await requireUser();

  return (
    <div className="min-h-screen bg-[#F8F7F2]">
      <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-xl font-semibold text-[#243B2D]">
              Kerala Trails
            </h1>

            <p className="text-xs text-stone-500">
              Staff Administration
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-stone-800">
                {user.name}
              </p>

              <p className="text-xs text-stone-500">
                {user.role}
              </p>
            </div>

            <LogoutButton />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">
        {children}
      </main>
    </div>
  );
}