import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="border-b border-stone-200/70 backdrop-blur">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5 md:px-10">
        <Link href="/" className="text-lg uppercase tracking-[0.12em]">Jennifer Alvina</Link>
        <div className="flex items-center gap-6 text-xs uppercase tracking-[0.16em] text-stone-700">
          <Link href="/">Home</Link>
          <Link href="/portfolio">Portfolio</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </nav>
    </header>
  );
}
