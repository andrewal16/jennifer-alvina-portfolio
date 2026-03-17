import { getSiteSettings } from "@/lib/content";
import { SiteHeaderClient } from "@/components/site-header-client";

export async function SiteHeader() {
  const siteSettings = await getSiteSettings();

  return (
    <SiteHeaderClient
      brandName={siteSettings.siteTitle || "Jennifer Atelier"}
      brandTagline={siteSettings.siteTagline || "Interior Atelier"}
      primaryCtaLabel={siteSettings.primaryCtaLabel || "View Portfolio"}
      primaryCtaHref={siteSettings.primaryCtaHref || "/portfolio"}
    />
  );
}
