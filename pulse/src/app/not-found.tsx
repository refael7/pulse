import Link from "next/link";
import { backToDashboardLabel, notFoundDescription, notFoundTitle } from "@/lib/messages";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center" dir="rtl">
      <div className="bg-white rounded-xl p-8 shadow text-center max-w-md">
        <p className="text-5xl mb-4">🔍</p>
        <h2 className="text-xl font-bold text-gray-800 mb-2">{notFoundTitle}</h2>
        <p className="text-gray-500 text-sm mb-6">{notFoundDescription}</p>
        <Link href="/" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm">
          {backToDashboardLabel}
        </Link>
      </div>
    </main>
  );
}