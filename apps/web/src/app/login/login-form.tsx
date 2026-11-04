"use client";

import { useActionState } from "react";

import { login } from "@/modules/auth/actions";
import { Button } from "@/components/ui/button";

type LoginFormProps = {
  callbackUrl: string;
};

const initialState = {
  success: false,
  message: "",
};

export function LoginForm({ callbackUrl }: LoginFormProps) {
  const [state, formAction, pending] = useActionState(login, initialState);

  return (
    <form action={formAction} className="space-y-5">
      <input
        type="hidden"
        name="callbackUrl"
        value={callbackUrl}
      />

      <div className="space-y-2">
        <label
          htmlFor="email"
          className="text-sm font-medium"
        >
          Email address
        </label>

        <input
          id="email"
          name="email"
          type="email"
          placeholder="admin@keralatrails.test"
          autoComplete="email"
          required
          className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="password"
          className="text-sm font-medium"
        >
          Password
        </label>

        <input
          id="password"
          name="password"
          type="password"
          placeholder="Enter your password"
          autoComplete="current-password"
          required
          className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      {state.message && (
        <p
          role="alert"
          className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600"
        >
          {state.message}
        </p>
      )}

      <Button
        type="submit"
        size="lg"
        disabled={pending}
        className="w-full"
      >
        {pending ? "Signing in..." : "Sign in"}
      </Button>
    </form>
  );
}