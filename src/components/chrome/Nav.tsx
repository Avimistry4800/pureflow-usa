import { useEffect, useState } from "react";

const links = [
  { label: "Threat", href: "#threat" },
  { label: "System", href: "#solution" },
  { label: "Heritage", href: "#proof" },
  { label: "Consult", href: "#consult" },
];

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-6"
      }`}
    >
      <div
        className={`container mx-auto flex items-center justify-between rounded-full px-5 py-3 transition-all duration-500 ${
          scrolled ? "surface-glass" : "bg-transparent"
        }`}
      >
        <a href="#" className="group flex items-center gap-2.5">
          <span className="relative inline-flex h-7 w-7 items-center justify-center rounded-full border border-primary/40">
            <span className="absolute inset-1 rounded-full bg-gradient-liquid opacity-80 blur-[2px]" />
            <span className="relative h-1.5 w-1.5 rounded-full bg-chrome" />
          </span>
          <span className="font-display text-sm font-semibold tracking-tight text-chrome">
            WPL<span className="text-primary">.</span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-chrome"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <span className="hidden items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-dot" />
            Live · NYC
          </span>
          <a
            href="#consult"
            data-magnetic
            className="group relative inline-flex items-center gap-2 rounded-full border border-primary/50 bg-primary/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-chrome transition-colors hover:bg-primary/20"
          >
            Consult
            <span className="h-1 w-1 rounded-full bg-primary" />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Nav;
