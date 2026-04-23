import { Link } from "react-router-dom";
import { useDocumentMeta } from "@/lib/useDocumentMeta";

export interface SectorContent {
  slug: "home" | "office" | "hospitality" | "medical";
  eyebrow: string;
  title: string;
  italic: string;
  intro: string;
  problem: string;
  recommended: { name: string; spec: string[] };
  useCases: { title: string; body: string }[];
  stats: { v: string; l: string }[];
  faq: { q: string; a: string }[];
}

const SectorTemplate = ({ c }: { c: SectorContent }) => {
  useDocumentMeta(
    `${c.title} — Water Purification`,
    c.intro.slice(0, 155),
  );

  return (
    <article className="relative bg-background">
      {/* Hero */}
      <header className="relative overflow-hidden pt-16 sm:pt-24">
        <div className="pointer-events-none absolute inset-0 bg-gradient-caustic" />
        <div className="pointer-events-none absolute inset-0 grid-noise opacity-40" />
        <div className="container relative mx-auto grid grid-cols-1 gap-12 px-6 py-20 md:grid-cols-12 sm:px-10 sm:py-28">
          <div className="md:col-span-7">
            <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-primary">
              {c.eyebrow}
            </span>
            <h1 className="mt-4 font-display text-5xl font-light leading-[1.02] text-chrome sm:text-7xl">
              {c.title}
              <br />
              <span className="italic text-liquid">{c.italic}</span>
            </h1>
            <p className="mt-6 max-w-xl text-base text-muted-foreground sm:text-lg">
              {c.intro}
            </p>
            <Link
              to={`/contact?sector=${c.slug}`}
              className="mt-10 inline-flex items-center gap-3 rounded-full bg-chrome px-7 py-3.5 font-mono text-[11px] uppercase tracking-[0.28em] text-background transition-shadow hover:shadow-glow"
            >
              Request a consultation
              <span className="h-1 w-1 rounded-full bg-background" />
            </Link>
          </div>
          <aside className="md:col-span-5">
            <div className="surface-glass rounded-lg p-6 sm:p-8">
              <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                Recommended configuration
              </span>
              <h3 className="mt-3 font-display text-2xl text-chrome">
                {c.recommended.name}
              </h3>
              <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
                {c.recommended.spec.map((s) => (
                  <li key={s} className="flex gap-3">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </header>

      {/* Problem */}
      <section className="container mx-auto grid grid-cols-1 gap-10 px-6 py-24 md:grid-cols-12 sm:px-10">
        <div className="md:col-span-5">
          <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-primary">
            The problem
          </span>
        </div>
        <p className="md:col-span-7 font-display text-2xl font-light leading-snug text-chrome sm:text-3xl">
          {c.problem}
        </p>
      </section>

      {/* Use cases */}
      <section className="bg-surface/50 py-24">
        <div className="container mx-auto px-6 sm:px-10">
          <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-primary">
            Where it matters
          </span>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {c.useCases.map((u) => (
              <div key={u.title} className="surface-glass rounded-lg p-6">
                <h3 className="font-display text-xl text-chrome">{u.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{u.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="container mx-auto px-6 py-24 sm:px-10">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {c.stats.map((s) => (
            <div key={s.l} className="surface-glass rounded-lg px-6 py-8">
              <div className="font-display text-5xl font-light text-chrome">{s.v}</div>
              <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="container mx-auto px-6 pb-32 sm:px-10">
        <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-primary">
          Frequently asked
        </span>
        <div className="mt-8 divide-y divide-border border-y border-border">
          {c.faq.map((f) => (
            <details key={f.q} className="group py-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-chrome">
                <span className="font-display text-lg sm:text-xl">{f.q}</span>
                <span className="font-mono text-xs text-primary transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-4 max-w-3xl text-sm text-muted-foreground sm:text-base">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </section>
    </article>
  );
};

export default SectorTemplate;
