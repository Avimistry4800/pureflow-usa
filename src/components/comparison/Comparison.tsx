const columns = [
  { key: "pitcher", label: "Pitcher Filter", sub: "Brita-class" },
  { key: "market", label: "Supermarket RO", sub: "Big-box brand" },
  { key: "bottled", label: "Bottled Service", sub: "Cooler & jugs" },
  { key: "wpl", label: "WPL", sub: "This system", featured: true },
];

const rows: { label: string; values: (string | boolean)[] }[] = [
  { label: "PFAS removal", values: [false, "partial", false, true] },
  { label: "Microplastic removal", values: ["partial", "partial", false, true] },
  { label: "Lead reduction", values: ["partial", true, false, true] },
  { label: "Annual plastic waste", values: ["~60 cartridges", "~12 cartridges", "~2,800 bottles", "~0"] },
  { label: "10-yr cost", values: ["$1,800", "$3,400", "$11,000+", "$4,200"] },
  { label: "Service life", values: ["1 yr", "5 yr", "Indefinite (rental)", "30 yr"] },
];

const Cell = ({ v, featured }: { v: string | boolean; featured?: boolean }) => {
  if (v === true)
    return (
      <span
        className={`inline-flex h-6 w-6 items-center justify-center rounded-full ${
          featured ? "bg-primary/20 text-primary shadow-glow" : "bg-primary/10 text-primary"
        }`}
        aria-label="Yes"
      >
        ✓
      </span>
    );
  if (v === false)
    return (
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-border/40 text-muted-foreground" aria-label="No">
        —
      </span>
    );
  if (v === "partial")
    return (
      <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
        partial
      </span>
    );
  return (
    <span className={`font-mono text-xs tabular-nums ${featured ? "text-chrome" : "text-muted-foreground"}`}>
      {v}
    </span>
  );
};

const Comparison = () => (
  <section
    id="comparison"
    className="relative py-32 sm:py-40"
    style={{ background: "hsl(var(--surface-elevated))" }}
    aria-label="Comparison"
  >
    <div className="container relative mx-auto px-6">
      <div className="mb-16 grid grid-cols-1 gap-10 md:grid-cols-12 md:items-end">
        <div className="md:col-span-7">
          <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-muted-foreground">
            Four ways to make water drinkable. One that lasts.
          </span>
          <h2 className="mt-5 font-display text-4xl font-light leading-[1.02] text-chrome sm:text-6xl">
            Not all clean<br />
            is clean.
          </h2>
        </div>
        <div className="md:col-span-5">
          <p className="text-base text-muted-foreground sm:text-lg">
            A pitcher buys you a week. A bottled service buys you guilt.
            This is what permanent looks like.
          </p>
          <p className="mt-6 font-mono text-xs uppercase tracking-[0.24em] text-chrome tabular-nums">
            <span className="text-muted-foreground">10-yr cost</span>
            <span className="mx-3 text-muted-foreground/40">/</span>
            <span className="line-through decoration-muted-foreground/60">$11,000</span>
            <span className="mx-2 text-muted-foreground">→</span>
            <span className="text-primary">$4,200</span>
          </p>
        </div>
      </div>

      {/* Desktop matrix — flat datasheet */}
      <div className="hidden overflow-hidden rounded-sm border border-border/60 bg-background md:block">
        <div className="grid grid-cols-5 border-b border-border/60">
          <div className="p-5" />
          {columns.map((c) => (
            <div
              key={c.key}
              className={`relative p-5 ${
                c.featured ? "bg-primary/5" : ""
              }`}
            >
              {c.featured && (
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
              )}
              <div className={`font-display text-lg ${c.featured ? "text-chrome" : "text-muted-foreground"}`}>
                {c.label}
              </div>
              <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.28em] text-muted-foreground">
                {c.sub}
              </div>
            </div>
          ))}
        </div>

        {rows.map((r, ri) => (
          <div
            key={r.label}
            className={`grid grid-cols-5 ${
              ri !== rows.length - 1 ? "border-b border-border/40" : ""
            }`}
          >
            <div className="flex items-center p-5 font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
              {r.label}
            </div>
            {r.values.map((v, ci) => (
              <div
                key={ci}
                className={`flex items-center p-5 ${columns[ci].featured ? "bg-primary/5" : ""}`}
              >
                <Cell v={v} featured={columns[ci].featured} />
              </div>
            ))}
          </div>
        ))}

        <div className="grid grid-cols-5 border-t border-border/40 bg-primary/[0.03]">
          <div className="p-4" />
          {columns.map((c) => (
            <div
              key={c.key}
              className={`p-4 font-mono text-[9px] uppercase tracking-[0.28em] ${
                c.featured ? "text-primary" : "text-muted-foreground/60"
              }`}
            >
              {c.featured ? "→ Recommended" : ""}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile stack — WPL first */}
      <div className="space-y-4 md:hidden">
        {[columns[3], columns[0], columns[1], columns[2]].map((c) => {
          const colIdx = columns.findIndex((x) => x.key === c.key);
          return (
            <div
              key={c.key}
              className={`surface-glass rounded-lg p-5 ${
                c.featured ? "border-primary/60 shadow-glow" : ""
              }`}
            >
              <div className="flex items-baseline justify-between border-b border-border/40 pb-3">
                <div>
                  <div className={`font-display text-lg ${c.featured ? "text-chrome" : "text-muted-foreground"}`}>
                    {c.label}
                  </div>
                  <div className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.28em] text-muted-foreground">
                    {c.sub}
                  </div>
                </div>
                {c.featured && (
                  <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-primary">
                    Recommended
                  </span>
                )}
              </div>
              <dl className="mt-4 space-y-3">
                {rows.map((r) => (
                  <div key={r.label} className="flex items-center justify-between gap-4">
                    <dt className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                      {r.label}
                    </dt>
                    <dd>
                      <Cell v={r.values[colIdx]} featured={c.featured} />
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

export default Comparison;
