import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getSiteSettings } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getSiteSettings();

  const siteTitle = siteSettings.siteTitle || "Jennifer Atelier";
  const seoDescription =
    siteSettings.seoDescription ||
    siteSettings.brandStatement ||
    "Elegant interior design portfolio for Jennifer Atelier, showcasing premium residential and hospitality projects.";

  return {
    metadataBase: new URL("https://www.jenniferatelier.com"),
    title: {
      default: `${siteTitle} | Interior Atelier`,
      template: `%s | ${siteTitle}`,
    },
    description: seoDescription,
  };
}

export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <SiteHeader />
      {children}
      <SiteFooter />
    </>
  );
}
