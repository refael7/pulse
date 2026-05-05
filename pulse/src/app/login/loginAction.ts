"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction(
  prevState: { error: string },
  formData: FormData
) {
const username = (formData.get("username") as string).trim();
const password = (formData.get("password") as string).trim();

  const validUsername = process.env.ADMIN_USERNAME;
  const validPassword = process.env.ADMIN_PASSWORD;

 
  if (username !== validUsername || password !== validPassword) {
    return { error: "שם משתמש או סיסמה שגויים" };
  }

  const cookieStore = await cookies();
  cookieStore.set("auth", "true", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24, // יום אחד
    path: "/",
  });

  redirect("/");
}
export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("auth");
  redirect("/login");
}