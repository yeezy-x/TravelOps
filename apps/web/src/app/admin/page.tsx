import { Suspense } from "react";
import { listPackagesForStaff } from "@repo/db";

import { requireUser } from "@/modules/auth/guards";
import { publishPackage } from "@/modules/auth/actions";

export default function AdminPage() {
  return (
    <Suspense
      fallback={
        <p className="text-sm text-stone-500">Loading packages...</p>
      }
    >
      <AdminDashboard />
    </Suspense>
  );
}

async function AdminDashboard() {
  const user = await requireUser();

  const packages = await listPackagesForStaff();

  return (
    <div className="space-y-8">
      <section>
        <p className="text-sm font-medium uppercase tracking-wider text-[#54745D]">
          Dashboard
        </p>

        <h2 className="mt-2 text-3xl font-semibold text-[#243B2D]">
          Welcome, {user.name}
        </h2>

        <p className="mt-2 text-sm text-stone-500">
          Manage travel packages and publication status.
        </p>
      </section>

      <section className="rounded-xl border border-stone-200 bg-white">
        <div className="border-b border-stone-200 px-6 py-5">
          <h3 className="text-lg font-semibold text-[#243B2D]">
            Travel Packages
          </h3>

          <p className="mt-1 text-sm text-stone-500">
            {packages.length} packages available
          </p>
        </div>

        {packages.length === 0 ? (
          <p className="px-6 py-8 text-sm text-stone-500">
            No packages found.
          </p>
        ) : (
          <div className="divide-y divide-stone-100">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className="flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="text-xs font-medium text-stone-400">
                    {pkg.code}
                  </p>

                  <h4 className="mt-1 font-medium text-stone-800">
                    {pkg.slug}
                  </h4>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {pkg.versions.map((version) => (
                      <span
                        key={version.id}
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          version.status === "PUBLISHED"
                            ? "bg-green-100 text-green-800"
                            : version.status === "DRAFT"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-stone-100 text-stone-600"
                        }`}
                      >
                        V{version.versionNumber} · {version.status}
                      </span>
                    ))}
                  </div>
                </div>

                {user.role === "ADMIN" &&
                  pkg.versions
                    .filter((version) => version.status === "DRAFT")
                    .map((version) => (
                      <form key={version.id} action={publishPackage}>
                        <input
                          type="hidden"
                          name="packageVersionId"
                          value={version.id}
                        />

                        <button
                          type="submit"
                          className="rounded-lg bg-[#243B2D] px-4 py-2 text-sm font-medium text-white hover:bg-[#365641]"
                        >
                          Publish
                        </button>
                      </form>
                    ))}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}