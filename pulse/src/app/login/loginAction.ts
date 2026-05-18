"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getUserByUsernameAndCode } from "@/lib/dal/users";
import { wrongCredentials } from "@/lib/messages";

export interface LoginFormState {
  error: string;
}

const ONE_DAY = 60 * 60 * 24; // יום אחד בשניות
export async function loginAction(
  _state: LoginFormState,
  formData: FormData
): Promise<LoginFormState> {
  const username = (formData.get("username") as string).trim();
  const password = (formData.get("password") as string).trim();

  const user = await getUserByUsernameAndCode(username, password);

  if (!user) {
    return { error: wrongCredentials };
  }

  const cookieStore = await cookies();
  cookieStore.set("auth", user.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: ONE_DAY,
    path: "/",
  });

  redirect("/");
  return { error: "" };
}
export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("auth");
  redirect("/login");
}