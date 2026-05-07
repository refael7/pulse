"use client";

import Link from "next/link";
import { useEffect } from "react";
import { backToDashboardLabel, errorTitle, tryAgainLabel } from "@/lib/messages";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center" dir="rtl">
      <div className="bg-white rounded-xl p-8 shadow text-center max-w-md">
        <p className="text-5xl mb-4">😵</p>
        <h2 className="text-xl font-bold text-gray-800 mb-2">{errorTitle}</h2>
        <p className="text-gray-500 text-sm mb-6">{error.message}</p>
        <div className="flex gap-3 justify-center">
          <button onClick={reset} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm">
            {tryAgainLabel}
          </button>
          <Link href="/" className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 text-sm">
            {backToDashboardLabel}
          </Link>
        </div>
      </div>
    </main>
  );
}