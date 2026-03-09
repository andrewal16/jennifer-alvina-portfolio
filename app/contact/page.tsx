import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Jennifer Alvina for interior design inquiries.",
};

export default function ContactPage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-16 md:px-10">
      <p className="text-xs uppercase tracking-[0.2em] text-stone-500">Contact</p>
      <h1 className="mt-2 text-5xl">Start Your Project</h1>
      <p className="mt-4 max-w-2xl text-stone-700">
        For residential, hospitality, or commercial interior design projects, please send your brief and preferred timeline.
      </p>

      <div className="mt-10 grid gap-8 border border-stone-200 bg-white/60 p-8 md:grid-cols-2">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-stone-500">Email</p>
          <a href="mailto:hello@jenniferalvina.com" className="mt-2 block text-lg">
            hello@jenniferalvina.com
          </a>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-stone-500">Studio</p>
          <p className="mt-2 text-lg">Jakarta, Indonesia</p>
        </div>
      </div>
    </main>
  );
}
