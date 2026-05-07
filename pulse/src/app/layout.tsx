import type { Metadata } from "next";
import "./globals.css";
import { appMetadataDescription, appMetadataTitle } from "@/lib/messages";

export const metadata: Metadata = {
  title: appMetadataTitle,
  description: appMetadataDescription,
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