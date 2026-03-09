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
  description: "Premium interior design portfolio by Jennifer Alvina.",
  openGraph: {
    title: "Jennifer Alvina | Interior Designer",
    description: "Elegant, modern, high-end interior design portfolio.",
    url: "https://www.jenniferalvina.com",
    siteName: "Jennifer Alvina",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
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
