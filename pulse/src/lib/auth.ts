"use server";
import { cookies } from "next/headers";
import { getUserById } from "@/lib/dal/users";

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("auth")?.value;

  if (!userId) {
    return null;
  }

  return getUserById(userId);
}
