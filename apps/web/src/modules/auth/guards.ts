import "server-only";

import { connection } from "next/server";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

import type { UserRole } from "@/types/next-auth";

export async function requireUser() {
  await connection();
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return session.user;
}

export async function requireRole(requiredRole: UserRole) {
  const user = await requireUser();

  if (user.role !== requiredRole) {
    return {
      ok: false as const,
      error: "Forbidden" as const,
    };
  }

  return {
    ok: true as const,
    user,
  };
}