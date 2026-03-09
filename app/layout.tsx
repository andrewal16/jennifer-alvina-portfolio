import type { Metadata } from "next";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.jenniferalvina.com"),
  title: {
    default: "Jennifer Alvina | Interior Designer",
    template: "%s | Jennifer Alvina",
  },
  description:
    "Elegant interior design portfolio for Jennifer Alvina, showcasing premium residential and hospitality projects.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-stone-50 text-stone-900 antialiased">
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
