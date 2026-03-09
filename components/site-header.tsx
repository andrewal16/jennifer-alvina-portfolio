import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-stone-200/70">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5 md:px-10">
        <Link href="/" className="text-xl tracking-[0.12em] uppercase">
          Jennifer Alvina
        </Link>
        <ul className="flex items-center gap-6 text-sm text-stone-700">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="hover:text-stone-950 transition-colors">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
