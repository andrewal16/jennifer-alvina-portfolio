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
      {/* Performance: system font stack avoids extra font downloads and keeps PR diffs text-only. */}
      <body className="bg-stone-50 text-stone-900 antialiased [font-family:Inter,ui-sans-serif,system-ui,-apple-system,Segoe_UI,Roboto,Helvetica,Arial,sans-serif]">
        {children}
      </body>
    </html>
  );
}
