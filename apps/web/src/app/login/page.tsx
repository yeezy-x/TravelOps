import { Suspense } from "react";
import { connection } from "next/server";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { LoginForm } from "./login-form";

type LoginPageProps = {
  searchParams: Promise<{
    callbackUrl?: string;
  }>;
};

export default function LoginPage({ searchParams }: LoginPageProps) {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
          <p className="text-sm text-gray-500">Loading sign in...</p>
        </main>
      }
    >
      <LoginContent searchParams={searchParams} />
    </Suspense>
  );
}

async function LoginContent({ searchParams }: LoginPageProps) {
  await connection();
  const session = await auth();
  if (session?.user) {
    redirect("/admin");
  }
  const params = await searchParams;
  const callbackUrl =
    params.callbackUrl === "/admin" ||
    params.callbackUrl?.startsWith("/admin/")
      ? params.callbackUrl
      : "/admin";

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-2xl border bg-white p-8 shadow-sm">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold tracking-tight">
            Kerala Trails
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Sign in to your staff account
          </p>
        </div>

        <LoginForm callbackUrl={callbackUrl} />
      </div>
    </main>
  );
}