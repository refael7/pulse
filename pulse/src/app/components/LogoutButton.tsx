"use client";

import { useTransition } from "react";
import { logoutAction } from "@/app/login/loginAction";

export default function LogoutButton() {
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    startTransition(async () => {
      await logoutAction();
    });
  }

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 disabled:opacity-50"
    >
      {isPending ? "יוצא..." : "יציאה"}
    </button>
  );
}