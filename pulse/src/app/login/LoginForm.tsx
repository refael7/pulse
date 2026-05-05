"use client";

import { useActionState } from "react";
import { loginAction } from "./loginAction";

const initialState = { error: "" };

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginAction, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-4 text-right">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">שם משתמש</label>
        <input
          name="username"
          type="text"
          className="w-full border rounded-lg px-3 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="שם משתמש"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">סיסמה</label>
        <input
          name="password"
          type="password"
          className="w-full border rounded-lg px-3 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="סיסמה"
        />
      </div>

      {state.error && (
        <p className="text-red-500 text-sm">{state.error}</p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {isPending ? "מתחבר..." : "התחבר"}
      </button>
    </form>
  );
}