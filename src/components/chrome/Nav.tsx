import { useEffect, useState } from "react";

const links = [
  { label: "Technology", to: "/technology" },
  { label: "Process", to: "/process" },
  { label: "Sectors", to: "/sectors/home" },
  { label: "Insights", to: "/insights" },
  { label: "About", to: "/about" },
];

import { NavLink, Link, useLocation } from "react-router-dom";

const sectorLinks = [
  { label: "Residence", to: "/sectors/home", desc: "Whole-home & under-counter" },
  { label: "Office", to: "/sectors/office", desc: "Workforce hydration" },
  { label: "Hospitality", to: "/sectors/hospitality", desc: "Restaurants & bars" },
  { label: "Medical", to: "/sectors/medical", desc: "Autoclave & dental" },
];

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sectorsOpen, setSectorsOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setSectorsOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || mobileOpen ? "py-3" : "py-6"
      }`}
    >
      <div
        className={`container mx-auto flex items-center justify-between rounded-full px-5 py-3 transition-all duration-500 ${
          scrolled || mobileOpen ? "surface-glass" : "bg-transparent"
        }`}
      >
        <Link to="/" className="group flex items-center gap-2.5">
          <span className="relative inline-flex h-7 w-7 items-center justify-center rounded-full border border-primary/40">
            <span className="absolute inset-1 rounded-full bg-gradient-liquid opacity-80 blur-[2px]" />
            <span className="relative h-1.5 w-1.5 rounded-full bg-chrome" />
          </span>
          <span className="font-display text-sm font-semibold tracking-tight text-chrome">
            WPL<span className="text-primary">.</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) =>
            l.label === "Sectors" ? (
              <div
                key={l.to}
                className="relative"
                onMouseEnter={() => setSectorsOpen(true)}
                onMouseLeave={() => setSectorsOpen(false)}
              >
                <button
                  type="button"
                  className={`rounded-full px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors ${
                    pathname.startsWith("/sectors") ? "text-chrome" : "text-muted-foreground hover:text-chrome"
                  }`}
                  aria-expanded={sectorsOpen}
                >
                  Sectors
                </button>
                {sectorsOpen && (
                  <div className="surface-glass absolute left-1/2 top-full mt-2 grid w-[420px] -translate-x-1/2 grid-cols-2 gap-1 rounded-lg p-2">
                    {sectorLinks.map((s) => (
                      <Link
                        key={s.to}
                        to={s.to}
                        className="rounded-md px-3 py-3 transition-colors hover:bg-primary/10"
                      >
                        <div className="font-display text-sm text-chrome">{s.label}</div>
                        <div className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground">
                          {s.desc}
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors ${
                    isActive ? "text-chrome" : "text-muted-foreground hover:text-chrome"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ),
          )}
        </nav>

        <div className="flex items-center gap-3">
          <span className="hidden items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-dot" />
            Live · NYC
          </span>
          <Link
            to="/contact"
            className="hidden rounded-full border border-primary/50 bg-primary/10 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-chrome transition-colors hover:bg-primary/20 sm:inline-flex sm:items-center sm:gap-2"
          >
            Consult
            <span className="h-1 w-1 rounded-full bg-primary" />
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Menu"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border md:hidden"
          >
            <span className="font-mono text-xs text-chrome">{mobileOpen ? "×" : "≡"}</span>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="container mx-auto mt-2 md:hidden">
          <div className="surface-glass rounded-lg p-4">
            <ul className="flex flex-col gap-1">
              {[...links, { label: "Contact", to: "/contact" }].map((l) => (
                <li key={l.to}>
                  <NavLink
                    to={l.to}
                    className={({ isActive }) =>
                      `block rounded-md px-3 py-2.5 font-mono text-[11px] uppercase tracking-[0.24em] ${
                        isActive ? "bg-primary/10 text-chrome" : "text-muted-foreground"
                      }`
                    }
                  >
                    {l.label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <div className="mt-3 grid grid-cols-2 gap-2 border-t border-border pt-3">
              {sectorLinks.map((s) => (
                <Link
                  key={s.to}
                  to={s.to}
                  className="rounded-md px-3 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground hover:text-chrome"
                >
                  {s.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Nav;
