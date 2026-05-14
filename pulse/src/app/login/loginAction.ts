"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { wrongCredentials } from "@/lib/messages";

const ONE_DAY = 60 * 60 * 24; // יום אחד בשניות
export async function loginAction(
  formData: FormData
) {
  const username = (formData.get("username") as string).trim();
  const password = (formData.get("password") as string).trim();

  const validUsername = process.env.ADMIN_USERNAME;
  const validPassword = process.env.ADMIN_PASSWORD;


  if (username !== validUsername || password !== validPassword) {
    return { error: wrongCredentials };
  }

  const cookieStore = await cookies();
  cookieStore.set("auth", "true", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: ONE_DAY,
    path: "/",
  });

  redirect("/");
}
export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("auth");
  redirect("/login");
}