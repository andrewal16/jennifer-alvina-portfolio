export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-stone-200/70">
      <div className="mx-auto flex w-full max-w-6xl flex-col justify-between gap-2 px-6 py-8 text-xs uppercase tracking-[0.12em] text-stone-500 md:flex-row md:px-10">
        <p>© {new Date().getFullYear()} Jennifer Alvina Studio</p>
        <p>Jakarta · Interior Design</p>
      </div>
    </footer>
  );
}
