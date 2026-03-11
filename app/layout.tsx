import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jennifer Atelier",
  description:
    "Elegant interior design portfolio and CMS for Jennifer Atelier.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="bg-stone-50 text-stone-900 antialiased">{children}</body>
    </html>
  );
}
