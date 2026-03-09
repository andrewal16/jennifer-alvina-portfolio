import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/contact-form";
import { getContactInfo } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Jennifer Alvina for interior design projects.",
};

export default async function ContactPage() {
  const contactInfo = await getContactInfo();

  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-16 md:px-10">
      <p className="text-xs uppercase tracking-[0.2em] text-stone-500">Contact</p>
      <h1 className="mt-2 text-5xl">Start Your Project</h1>
      <p className="mt-4 max-w-2xl text-stone-700">Share your vision and we&apos;ll prepare a tailored interior design proposal.</p>

      <div className="mt-10 grid gap-8 md:grid-cols-2">
        <div className="space-y-5 border border-stone-200 bg-white/60 p-6">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-stone-500">Email</p>
            <p className="mt-2 text-lg">{contactInfo.email || "hello@jenniferalvina.com"}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-stone-500">Phone</p>
            <p className="mt-2 text-lg">{contactInfo.phone || "-"}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-stone-500">Studio</p>
            <p className="mt-2 text-lg">{contactInfo.location || "Jakarta, Indonesia"}</p>
          </div>
        </div>
        <div className="border border-stone-200 bg-white/60 p-6">
          <ContactForm />
        </div>
      </div>
    </main>
  );
}
