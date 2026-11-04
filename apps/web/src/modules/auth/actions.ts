"use server";

import { AuthError } from "next-auth";

import { signIn, signOut } from "@/auth";
import { requireRole } from "@/modules/auth/guards";
import { LoginSchema } from "@/modules/auth/schema";

type LoginState = {
  success: boolean;
  message: string;
};

function callbackUrlFrom(formData: FormData) {
  const callbackUrl = formData.get("callbackUrl");

  if (
    callbackUrl === "/admin" ||
    (typeof callbackUrl === "string" && callbackUrl.startsWith("/admin/"))
  ) {
    return callbackUrl;
  }

  return "/admin";
}

export async function login(
  _prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const parsed = LoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return {
      success: false,
      message: "Enter a valid email and password",
    };
  }

  try {
    await signIn("credentials", {
      email: parsed.data.email,
      password: parsed.data.password,
      redirectTo: callbackUrlFrom(formData),
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        success: false,
        message:
          error.type === "CredentialsSignin"
            ? "Invalid email or password"
            : "Unable to sign in",
      };
    }

    throw error;
  }

  return {
    success: true,
    message: "",
  };
}

export async function logout() {
  await signOut({ redirectTo: "/login" });
}

export async function publishPackage(formData: FormData): Promise<void> {
  const authorization = await requireRole("ADMIN");

  if (!authorization.ok) {
    return;
  }

  const packageVersionId = formData.get("packageVersionId");

  if (
    typeof packageVersionId !== "string" ||
    packageVersionId.length === 0
  ) {
    return;
  }
}