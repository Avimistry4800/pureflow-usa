import { useEffect, useRef, useState } from "react";
import { useDocumentMeta } from "@/lib/useDocumentMeta";
import { Link } from "react-router-dom";

const stages = [
  {
    code: "01",
    name: "Sediment pre-filter",
    micron: "5 μm",
    removes: "Sand, silt, rust, particulate > 5 microns",
    efficacy: "99%",
    detail:
      "Pleated polypropylene cartridge protects every downstream stage from premature fouling. Replaced annually as part of the service contract.",
  },
  {
    code: "02",
    name: "Activated carbon block",
    micron: "0.5 μm",
    removes: "Chlorine, chloramine, disinfection by-products, VOCs, taste, odor",
    efficacy: "99%+",
    detail:
      "Coconut-shell carbon, compressed into a high-surface-area block. Critical for protecting the RO membrane from oxidation and for removing the taste utilities are required to add.",
  },
  {
    code: "03",
    name: "Reverse osmosis membrane",
    micron: "0.0001 μm",
    removes: "PFAS, lead, arsenic, fluoride, nitrate, dissolved solids",
    efficacy: "99.9%",
    detail:
      "Thin-film composite membrane. The defining stage. Permits water under pressure, rejects everything else. Independently tested against NSF/ANSI 58.",
  },
  {
    code: "04",
    name: "Deionization resin",
    micron: "Ionic",
    removes: "Residual ions, conductivity polishing",
    efficacy: "99.99%",
    detail:
      "Mixed-bed cation/anion exchange resin polishes RO output to clinical conductivity (< 1 μS/cm). Specified for medical, dental, and laboratory installations.",
  },
  {
    code: "05",
    name: "Ultra-filtration ceramic",
    micron: "0.01 μm",
    removes: "Bacteria, cysts, residual microplastics",
    efficacy: "99.99%",
    detail:
      "Hollow-fibre ceramic matrix. A second mechanical barrier between the storage tank and the tap, ensuring nothing reintroduced post-RO reaches the dispense point.",
  },
  {
    code: "06",
    name: "UV-C sterilization",
    micron: "DNA",
    removes: "Viruses, residual bacteria, biofilm",
    efficacy: "99.999%",
    detail:
      "265 nm dose denatures pathogen DNA without adding chemistry. Always-on, continuously monitored lamp life with predictive replacement alerts.",
  },
  {
    code: "07",
    name: "Remineralization",
    micron: "—",
    removes: "Restores Ca²⁺, Mg²⁺ for taste and structure",
    efficacy: "—",
    detail:
      "Pure water tastes flat. A controlled remineralization stage restores calcium and magnesium to a profile selected for the installation — neutral for residence, alkaline for hospitality, none at all for medical.",
  },
  {
    code: "08",
    name: "Smart monitoring",
    micron: "—",
    removes: "Uncertainty",
    efficacy: "Real-time",
    detail:
      "Inline TDS, flow, and pressure sensors stream to a private dashboard. Filter life is predicted, not guessed. Annual service is scheduled the moment performance trends downward.",
  },
];

// Deterministic pseudo-random
const rand = (seed: number) => {
  const x = Math.sin(seed * 9999) * 43758.5453;
  return x - Math.floor(x);
};

const StageVisual = ({ index, progress }: { index: number; progress: number }) => {
  // Each stage gets a distinct visualization; progress 0..1 within that stage's section
  const intensity = 0.4 + progress * 0.6;
  switch (index) {
    case 0: // sediment — falling particles being caught
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden>
          <defs>
            <linearGradient id="mesh" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="hsl(var(--primary))" stopOpacity="0.6" />
              <stop offset="1" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          {Array.from({ length: 24 }).map((_, i) => {
            const x = 10 + rand(i + 1) * 180;
            const fall = (rand(i + 5) * 100 + progress * 80) % 110;
            const caught = fall > 95;
            return (
              <circle
                key={i}
                cx={x}
                cy={caught ? 105 : fall}
                r={1 + rand(i + 9) * 1.5}
                fill="hsl(var(--chrome))"
                opacity={caught ? 0.3 : 0.85}
              />
            );
          })}
          {Array.from({ length: 14 }).map((_, i) => (
            <line key={i} x1={10 + i * 14} y1={108} x2={10 + i * 14} y2={120} stroke="url(#mesh)" strokeWidth="0.6" />
          ))}
          <line x1="0" y1="108" x2="200" y2="108" stroke="hsl(var(--primary))" strokeWidth="0.5" strokeOpacity={intensity} />
        </svg>
      );
    case 1: // carbon — porous lattice
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden>
          {Array.from({ length: 60 }).map((_, i) => {
            const cx = (i % 10) * 20 + 10;
            const cy = Math.floor(i / 10) * 32 + 16;
            return (
              <circle key={i} cx={cx} cy={cy} r={6 + rand(i) * 4} fill="none" stroke="hsl(var(--primary))" strokeOpacity={0.2 + rand(i + 3) * 0.3 * intensity} strokeWidth="0.6" />
            );
          })}
          <rect x="0" y="0" width="200" height="200" fill="hsl(var(--primary))" opacity={0.05 * progress} />
        </svg>
      );
    case 2: // RO — membrane wall, molecules pushing through
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden>
          <line x1="100" y1="0" x2="100" y2="200" stroke="hsl(var(--primary))" strokeWidth="1.2" strokeOpacity={intensity} />
          {Array.from({ length: 18 }).map((_, i) => {
            const y = 10 + i * 11;
            const passed = rand(i + 7) < 0.18;
            const x = passed ? 100 + 30 + progress * 50 : 100 - 20 - rand(i + 2) * 60;
            return (
              <g key={i}>
                <circle cx={x} cy={y} r={passed ? 1.2 : 2.6} fill={passed ? "hsl(var(--chrome))" : "hsl(var(--accent))"} opacity={passed ? 0.9 : 0.7} />
                {!passed && <circle cx={x} cy={y} r={4} fill="none" stroke="hsl(var(--accent))" strokeOpacity="0.3" />}
              </g>
            );
          })}
          {Array.from({ length: 12 }).map((_, i) => (
            <line key={i} x1="100" y1={10 + i * 16} x2="100" y2={20 + i * 16} stroke="hsl(var(--chrome))" strokeWidth="0.4" opacity={0.4} />
          ))}
        </svg>
      );
    case 3: // DI — ions getting captured by resin beads
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden>
          {Array.from({ length: 9 }).map((_, i) => {
            const cx = (i % 3) * 60 + 40;
            const cy = Math.floor(i / 3) * 60 + 40;
            return (
              <g key={i}>
                <circle cx={cx} cy={cy} r="22" fill="hsl(var(--primary) / 0.06)" stroke="hsl(var(--primary))" strokeOpacity="0.4" strokeWidth="0.6" />
                <circle cx={cx} cy={cy} r={4 + progress * 8} fill="hsl(var(--primary))" opacity={0.2 + progress * 0.6} />
                <text x={cx} y={cy + 2} textAnchor="middle" fontSize="6" fill="hsl(var(--chrome))" opacity="0.7">{i % 2 ? "+" : "−"}</text>
              </g>
            );
          })}
        </svg>
      );
    case 4: // UF ceramic — hollow fibres
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden>
          {Array.from({ length: 14 }).map((_, i) => {
            const x = 10 + i * 14;
            return (
              <g key={i}>
                <line x1={x} y1="10" x2={x} y2="190" stroke="hsl(var(--primary))" strokeOpacity={0.25 + intensity * 0.3} strokeWidth="0.8" />
                <circle cx={x} cy="10" r="2.5" fill="none" stroke="hsl(var(--chrome))" strokeOpacity={0.5} strokeWidth="0.4" />
                <circle cx={x} cy="190" r="2.5" fill="hsl(var(--primary))" opacity={progress} />
              </g>
            );
          })}
        </svg>
      );
    case 5: // UV-C — beam with pulse
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden>
          <defs>
            <radialGradient id="uvg" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0" stopColor="hsl(var(--accent))" stopOpacity={0.6 * intensity} />
              <stop offset="1" stopColor="hsl(var(--accent))" stopOpacity="0" />
            </radialGradient>
          </defs>
          <ellipse cx="100" cy="100" rx={40 + progress * 50} ry={40 + progress * 50} fill="url(#uvg)" />
          <line x1="40" y1="100" x2="160" y2="100" stroke="hsl(var(--accent))" strokeWidth="1.5" strokeOpacity={intensity} />
          <circle cx="40" cy="100" r="4" fill="hsl(var(--accent))" />
          <circle cx="160" cy="100" r="4" fill="hsl(var(--accent))" />
          {Array.from({ length: 8 }).map((_, i) => (
            <circle key={i} cx={50 + i * 14} cy="100" r="1.2" fill="hsl(var(--chrome))" opacity={0.5 + Math.sin(progress * 6 + i) * 0.3} />
          ))}
        </svg>
      );
    case 6: // remineralization — droplets gaining minerals
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden>
          {Array.from({ length: 7 }).map((_, i) => {
            const cx = 30 + i * 24;
            const cy = 100 + Math.sin(i + progress * 3) * 20;
            return (
              <g key={i}>
                <circle cx={cx} cy={cy} r="14" fill="hsl(var(--primary) / 0.1)" stroke="hsl(var(--primary))" strokeOpacity="0.5" strokeWidth="0.6" />
                <text x={cx} y={cy + 2} textAnchor="middle" fontSize="6" fill="hsl(var(--chrome))" opacity={progress}>
                  {i % 2 ? "Mg" : "Ca"}
                </text>
              </g>
            );
          })}
        </svg>
      );
    case 7: // smart monitoring — pulse waveform
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden>
          <polyline
            points={Array.from({ length: 40 })
              .map((_, i) => `${i * 5},${100 + Math.sin(i * 0.5 + progress * 8) * (10 + progress * 18)}`)
              .join(" ")}
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="1.2"
            strokeOpacity={intensity}
          />
          <line x1="0" y1="100" x2="200" y2="100" stroke="hsl(var(--border))" strokeWidth="0.4" />
          {Array.from({ length: 5 }).map((_, i) => (
            <text key={i} x={4} y={30 + i * 35} fontSize="6" fontFamily="monospace" fill="hsl(var(--primary))" opacity="0.7">
              {(180 - i * 30).toString().padStart(3, "0")}
            </text>
          ))}
        </svg>
      );
    default:
      return null;
  }
};

const Technology = () => {
  useDocumentMeta(
    "Technology — RO, DI, UF, UV explained",
    "An eight-stage purification system: sediment, carbon, reverse osmosis, deionization, ultra-filtration, UV-C, remineralization, and continuous smart monitoring.",
  );

  const railRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = railRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height - vh;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      const ratio = total > 0 ? scrolled / total : 0;
      const idx = Math.min(stages.length - 1, Math.floor(ratio * stages.length));
      const local = (ratio * stages.length) - idx;
      setActive(idx);
      setProgress(local);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const overall = (active + progress) / stages.length;

  return (
    <article className="bg-background">
      {/* Hero */}
      <header className="container mx-auto px-6 py-20 sm:px-10 sm:py-28">
        <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-primary">
          Technology
        </span>
        <h1 className="mt-4 max-w-4xl font-display text-5xl font-light leading-[1.02] text-chrome sm:text-7xl">
          Eight stages between<br />
          <span className="italic text-liquid">the utility and your glass.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
          Reverse osmosis is the headline. The other seven stages are the reason
          it works for thirty years instead of three. Each one is specified, monitored,
          and replaced on an evidence-based schedule.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <a
            href="/wpl-technology-spec.pdf"
            download
            className="group inline-flex items-center gap-3 rounded-full border border-primary/60 bg-primary/15 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-chrome transition-all hover:bg-primary/25 hover:shadow-[0_0_30px_hsl(var(--primary)/0.4)]"
          >
            <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-primary" />
            Download spec sheet · PDF
            <span className="font-mono text-[9px] text-muted-foreground transition-transform group-hover:translate-x-1">↓ 5 KB</span>
          </a>
          <Link
            to="/contact"
            className="rounded-full border border-border px-5 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:border-primary/40 hover:text-chrome"
          >
            Request a water test
          </Link>
        </div>
      </header>

      {/* Scroll-synced rail */}
      <section
        ref={railRef}
        className="relative"
        style={{ height: `${stages.length * 90}vh` }}
        aria-label="Eight purification stages"
      >
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* Caustic backdrop */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: "var(--gradient-caustic)" }}
          />

          <div className="container relative z-10 mx-auto grid h-full grid-cols-1 items-center gap-10 px-6 sm:px-10 lg:grid-cols-12">
            {/* Left: stage list */}
            <aside className="hidden lg:col-span-3 lg:block">
              <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                Stages · 08
              </div>
              <ol className="mt-4 space-y-1">
                {stages.map((s, i) => (
                  <li
                    key={s.code}
                    className={`flex items-baseline gap-3 rounded px-2 py-1.5 transition-all ${
                      i === active ? "bg-primary/10 text-chrome" : "text-muted-foreground"
                    }`}
                  >
                    <span
                      className={`font-mono text-[10px] ${
                        i === active ? "text-primary" : "text-muted-foreground"
                      }`}
                    >
                      {s.code}
                    </span>
                    <span className="text-sm">{s.name}</span>
                  </li>
                ))}
              </ol>

              {/* Overall progress meter */}
              <div className="mt-8">
                <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.28em] text-muted-foreground">
                  <span>Pipeline depth</span>
                  <span className="text-primary">{Math.round(overall * 100)}%</span>
                </div>
                <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-border/60">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-accent transition-[width] duration-300"
                    style={{ width: `${overall * 100}%` }}
                  />
                </div>
              </div>
            </aside>

            {/* Center: visual */}
            <div className="lg:col-span-5">
              <div className="surface-glass relative aspect-square w-full overflow-hidden rounded-lg">
                <div className="absolute left-4 top-4 z-10 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.24em] text-primary">
                  <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-primary" />
                  Stage {stages[active].code}
                </div>
                <div className="absolute right-4 top-4 z-10 rounded-full border border-border bg-background/40 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground">
                  {stages[active].micron}
                </div>
                <div className="absolute inset-0 transition-opacity duration-500">
                  <StageVisual index={active} progress={progress} />
                </div>
                {/* Ambient glow */}
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, hsl(var(--primary) / ${0.05 + progress * 0.12}) 0%, transparent 70%)`,
                  }}
                />
              </div>
            </div>

            {/* Right: stage detail */}
            <div className="lg:col-span-4">
              <div key={active} className="animate-[fadeRise_0.5s_var(--ease-fluid)_both]">
                <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-primary">
                  Stage {stages[active].code} of 08
                </div>
                <h2 className="mt-3 font-display text-3xl font-light text-chrome sm:text-4xl">
                  {stages[active].name}
                </h2>
                <div className="mt-4 flex flex-wrap gap-2 font-mono text-[10px] uppercase tracking-[0.22em]">
                  <span className="rounded-full border border-border px-2 py-1 text-muted-foreground">
                    {stages[active].micron}
                  </span>
                  <span className="rounded-full border border-primary/40 bg-primary/10 px-2 py-1 text-chrome">
                    {stages[active].efficacy} efficacy
                  </span>
                </div>
                <div className="mt-5 font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                  Removes
                </div>
                <p className="mt-1 text-chrome">{stages[active].removes}</p>
                <p className="mt-5 text-sm text-muted-foreground sm:text-base">
                  {stages[active].detail}
                </p>

                {/* Per-stage local progress */}
                <div className="mt-8 h-px w-full bg-border" />
                <div className="mt-4 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.28em] text-muted-foreground">
                  <span>Stage progress</span>
                  <span className="text-primary">{Math.round(progress * 100)}%</span>
                </div>
                <div className="mt-2 h-px w-full overflow-hidden bg-border/60">
                  <div
                    className="h-full bg-primary transition-[width] duration-200"
                    style={{ width: `${progress * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="container mx-auto px-6 py-24 sm:px-10 sm:py-32">
        <div className="surface-glass relative overflow-hidden rounded-lg p-10 sm:p-16">
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: "var(--gradient-caustic)" }}
          />
          <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-primary">
                Specification
              </span>
              <h3 className="mt-3 font-display text-3xl font-light text-chrome sm:text-5xl">
                Take the engineering home with you.
              </h3>
              <p className="mt-4 max-w-xl text-muted-foreground">
                The full technical sheet — stages, micron ratings, certifications,
                operating envelope, service intervals — in a two-page PDF.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="/wpl-technology-spec.pdf"
                  download
                  className="inline-flex items-center gap-3 rounded-full border border-primary/60 bg-primary/20 px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.22em] text-chrome transition-all hover:bg-primary/30 hover:shadow-[0_0_40px_hsl(var(--primary)/0.45)]"
                >
                  <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-primary" />
                  Download spec sheet
                  <span className="font-mono text-[9px] text-muted-foreground">PDF · 2 pages</span>
                </a>
                <Link
                  to="/process"
                  className="rounded-full border border-border px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:border-primary/40 hover:text-chrome"
                >
                  See the process →
                </Link>
              </div>
            </div>
            <div className="lg:col-span-5">
              <ul className="grid grid-cols-2 gap-3 font-mono text-[10px] uppercase tracking-[0.22em]">
                {[
                  ["NSF/ANSI 58", "RO performance"],
                  ["NSF/ANSI 53", "Lead, VOC"],
                  ["NSF/ANSI 401", "PFOA / PFOS"],
                  ["WRAS", "Approved material"],
                ].map(([k, v]) => (
                  <li key={k} className="rounded-md border border-border bg-background/30 p-3">
                    <div className="text-chrome">{k}</div>
                    <div className="mt-1 text-[9px] text-muted-foreground">{v}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
};

export default Technology;
