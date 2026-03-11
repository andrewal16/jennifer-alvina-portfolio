import Link from "next/link";
import { getContactInfo, getSiteSettings } from "@/lib/content";

function formatSocialLabel(platform: string) {
  return platform.trim() || "Social";
}

export async function SiteFooter() {
  const [siteSettings, contactInfo] = await Promise.all([
    getSiteSettings(),
    getContactInfo(),
  ]);

  const siteTitle = siteSettings.siteTitle || "Jennifer Atelier";
  const footerLocation =
    siteSettings.footerLocationLabel ||
    contactInfo.location ||
    siteSettings.studioLocation ||
    "Jennifer Atelier · Jakarta";

  const emailCard = contactInfo.contactCards?.find(
    (card) => card.label.toLowerCase() === "email",
  );
  const phoneCard = contactInfo.contactCards?.find(
    (card) => card.label.toLowerCase() === "phone",
  );

  const contactLinks = [
    emailCard?.href
      ? {
          label: "Email",
          value: emailCard.value,
          href: emailCard.href,
        }
      : siteSettings.contactEmail
        ? {
            label: "Email",
            value: siteSettings.contactEmail,
            href: `mailto:${siteSettings.contactEmail}`,
          }
        : null,
    phoneCard?.href
      ? {
          label: "Phone",
          value: phoneCard.value,
          href: phoneCard.href,
        }
      : siteSettings.contactPhone
        ? {
            label: "Phone",
            value: siteSettings.contactPhone,
            href: `tel:${siteSettings.contactPhone}`,
          }
        : null,
  ].filter(Boolean) as { label: string; value: string; href: string }[];

  const socialLinks =
    contactInfo.socialLinks?.filter((link) => !!link.url) ?? [];

  return (
    <footer className="mt-24 border-t border-stone-200/70 bg-white/40">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-10 md:grid-cols-[1.3fr_1fr_1fr] md:px-10">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.18em] text-stone-500">
            {siteSettings.siteTagline || "Interior Atelier"}
          </p>
          <h2 className="text-2xl text-stone-900">{siteTitle}</h2>
          <p className="max-w-md text-sm leading-6 text-stone-600">
            {siteSettings.brandStatement ||
              "Elegant interior design portfolio showcasing refined residential and hospitality spaces."}
          </p>
        </div>

        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.18em] text-stone-500">
            Contact
          </p>
          <div className="space-y-3 text-sm text-stone-700">
            {contactLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block transition-colors hover:text-stone-950"
              >
                <span className="block text-xs uppercase tracking-[0.16em] text-stone-400">
                  {item.label}
                </span>
                <span className="mt-1 block">{item.value}</span>
              </a>
            ))}

            {!contactLinks.length ? (
              <p className="text-stone-500">{footerLocation}</p>
            ) : null}
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.18em] text-stone-500">
            Connect
          </p>
          <div className="flex flex-wrap gap-3 text-sm text-stone-700">
            {socialLinks.length ? (
              socialLinks.map((link) => (
                <a
                  key={`${link.platform}-${link.url}`}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="border border-stone-300 px-3 py-2 transition-colors hover:border-stone-900 hover:text-stone-950"
                >
                  {formatSocialLabel(link.platform)}
                </a>
              ))
            ) : (
              <Link
                href="/contact"
                className="border border-stone-300 px-3 py-2 transition-colors hover:border-stone-900 hover:text-stone-950"
              >
                Contact Studio
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-stone-200/70">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-6 py-5 text-sm text-stone-600 md:flex-row md:items-center md:justify-between md:px-10">
          <p>
            © {new Date().getFullYear()} {siteTitle}
          </p>
          <p>{footerLocation}</p>
        </div>
      </div>
    </footer>
  );
}
