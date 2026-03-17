import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/contact/contact-form";
import { getContactInfo, getSiteSettings } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const [contactInfo, siteSettings] = await Promise.all([
    getContactInfo(),
    getSiteSettings(),
  ]);

  return {
    title: contactInfo.pageTitle || "Contact",
    description:
      contactInfo.pageDescription ||
      siteSettings.brandStatement ||
      "Contact Jennifer Atelier for interior design inquiries.",
  };
}

export default async function ContactPage() {
  const [contactInfo, siteSettings] = await Promise.all([
    getContactInfo(),
    getSiteSettings(),
  ]);

  const pageEyebrow = contactInfo.pageEyebrow || "Contact";
  const pageTitle = contactInfo.pageTitle || "Start Your Project";
  const pageDescription =
    contactInfo.pageDescription ||
    "For residential, hospitality, or commercial interior design projects, please send your brief and preferred timeline.";

  const contactCards = contactInfo.contactCards?.length
    ? contactInfo.contactCards
    : [
        {
          label: "Email",
          value: siteSettings.contactEmail || "jenniferatelier@gmail.com",
          href: `mailto:${siteSettings.contactEmail || "jenniferatelier@gmail.com"}`,
        },
        {
          label: "Studio",
          value:
            contactInfo.location ||
            siteSettings.studioLocation ||
            "Jakarta, Indonesia",
        },
      ];

  const socialLinks =
    contactInfo.socialLinks?.filter((link) => !!link.url) || [];
  const ctaTitle = contactInfo.ctaTitle || "Tell us about your vision";
  const ctaDescription =
    contactInfo.ctaDescription ||
    "Share your goals, preferred timeline, and any inspirations so the studio can better understand your project.";

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-16 md:px-10 md:py-20">
      <section className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div className="space-y-8">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.22em] text-accent-500">
              {pageEyebrow}
            </p>
            <h1 className="max-w-3xl text-5xl leading-tight md:text-6xl">
              {pageTitle}
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-600">
              {pageDescription}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {contactCards.map((card) => {
              const content = (
                <>
                  <p className="text-xs uppercase tracking-[0.18em] text-accent-500">
                    {card.label}
                  </p>
                  <p className="mt-3 text-lg leading-7 text-slate-950">
                    {card.value}
                  </p>
                </>
              );

              return card.href ? (
                <a
                  key={`${card.label}-${card.value}`}
                  href={card.href}
                  className="rounded-xl border border-slate-200 bg-white p-6 transition-all hover:border-primary-200"
                >
                  {content}
                </a>
              ) : (
                <div
                  key={`${card.label}-${card.value}`}
                  className="rounded-xl border border-slate-200 bg-white p-6"
                >
                  {content}
                </div>
              );
            })}
          </div>

          <div className="rounded-xl border border-primary-800 bg-[linear-gradient(135deg,#000E1F_0%,#002147_50%,#003366_100%)] px-6 py-8 text-slate-100 md:px-8">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-300">
              Inquiry Guide
            </p>
            <h2 className="mt-3 text-3xl">{ctaTitle}</h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300">
              {ctaDescription}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {[
                "Project goals",
                "Property type",
                "Location",
                "Target timeline",
                "Style references",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-[0.14em] text-slate-200"
                >
                  {item}
                </span>
              ))}
            </div>

            {socialLinks.length ? (
              <div className="mt-8 border-t border-white/10 pt-6">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                  Connect
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {socialLinks.map((link) => (
                    <a
                      key={`${link.platform}-${link.url}`}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-[0.16em] text-slate-100 transition-colors hover:border-accent-500 hover:text-accent-500"
                    >
                      {link.platform}
                    </a>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-[0_4px_6px_-1px_rgba(0,33,71,0.06),0_2px_4px_-2px_rgba(0,33,71,0.04)] md:p-8">
          <div className="mb-6 space-y-3">
            <p className="text-xs uppercase tracking-[0.2em] text-accent-500">
              Project Inquiry Form
            </p>
            <h2 className="text-3xl text-slate-950">
              Share your project brief
            </h2>
            <p className="text-sm leading-7 text-slate-600">
              Fill in the form below and the studio will get back to you with
              the next steps for consultation, scope discussion, and timeline
              planning.
            </p>
          </div>

          <ContactForm />

          <div className="mt-8 border-t border-slate-200 pt-6 text-sm leading-7 text-slate-600">
            <p>
              Prefer direct email?{" "}
              <a
                href={`mailto:${siteSettings.contactEmail || "jenniferatelier@gmail.com"}`}
                className="text-primary-900 underline underline-offset-4"
              >
                {siteSettings.contactEmail || "jenniferatelier@gmail.com"}
              </a>
            </p>
            <p className="mt-2">
              You can also explore recent work in the{" "}
              <Link
                href="/portfolio"
                className="text-primary-900 underline underline-offset-4"
              >
                portfolio
              </Link>{" "}
              before submitting your inquiry.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
