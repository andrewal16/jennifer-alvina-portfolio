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
      {/* COLOR PALETTE UPDATE */}
      <body className="bg-brand-primary text-brand-darkest antialiased">{children}</body>
    </html>
  );
}
