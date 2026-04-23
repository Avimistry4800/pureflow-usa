import { Link, useLocation } from "react-router-dom";

const labelize = (seg: string) =>
  seg.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

const Breadcrumb = () => {
  const { pathname } = useLocation();
  if (pathname === "/") return null;
  const parts = pathname.split("/").filter(Boolean);
  return (
    <nav
      aria-label="Breadcrumb"
      className="container mx-auto px-6 pt-28 sm:px-10"
    >
      <ol className="flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
        <li>
          <Link to="/" className="transition-colors hover:text-chrome">
            Home
          </Link>
        </li>
        {parts.map((p, i) => {
          const to = "/" + parts.slice(0, i + 1).join("/");
          const isLast = i === parts.length - 1;
          return (
            <li key={to} className="flex items-center gap-2">
              <span className="text-primary/60">/</span>
              {isLast ? (
                <span className="text-chrome">{labelize(p)}</span>
              ) : (
                <Link to={to} className="transition-colors hover:text-chrome">
                  {labelize(p)}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
