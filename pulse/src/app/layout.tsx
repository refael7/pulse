import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pulse – מערכת ניהול משימות",
  description: "מערכת ניהול ומעקב משימות",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl">
      <body>{children}</body>
    </html>
  );
}