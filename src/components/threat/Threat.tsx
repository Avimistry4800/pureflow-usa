import { useEffect, useRef, useState } from "react";

const contaminants = [
  { code: "PFA-014", name: "PFAS / Forever Chemicals", note: "Detected in 99% of US water supplies. Linked to immune dysfunction." },
  { code: "MCP-021", name: "Microplastics", note: "Average American ingests 74,000 particles per year." },
  { code: "CL2-008", name: "Chlorine & Disinfection By-products", note: "Trihalomethanes, haloacetic acids — invisible, persistent." },
  { code: "PB-082", name: "Lead & Heavy Metals", note: "Aging US infrastructure leaches at the tap. No safe level exists." },
];

const stats = [
  { v: "87%", l: "Americans concerned about tap water" },
  { v: "99%", l: "Water sources contaminated with PFAS" },
  { v: "0.0", l: "Safe lead exposure level (mg/L)" },
];

const Threat = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const scrolled = Math.max(0, Math.min(total, -rect.top));
      const p = total > 0 ? scrolled / total : 0;
      setProgress(p);
      const idx = Math.min(contaminants.length - 1, Math.floor(p * contaminants.length));
      setActive(idx);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="threat"
      ref={sectionRef}
      className="relative bg-background"
      style={{ height: "320vh" }}
      aria-label="The invisible threat"
    >
      {/* Sticky stage */}
      <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden">
        {/* Background gradient that intensifies with scroll */}
        <div
          className="absolute inset-0 transition-opacity duration-700"
          style={{
            background: `radial-gradient(ellipse at 50% ${30 + progress * 40}%, hsl(var(--primary) / ${0.05 + progress * 0.18}), transparent 60%)`,
          }}
        />
        <div className="absolute inset-0 grid-noise opacity-50" />

        {/* Particle field — scroll-driven contaminants */}
        <div className="pointer-events-none absolute inset-0">
          {Array.from({ length: 80 }).map((_, i) => {
            const seed = (i * 9301 + 49297) % 233280;
            const x = (seed / 233280) * 100;
            const y = ((seed * 7) % 233280 / 233280) * 100;
            const size = 1 + ((seed * 3) % 5);
            const drift = Math.sin(progress * Math.PI * 2 + i) * 20;
            return (
              <span
                key={i}
                className="absolute rounded-full"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  width: size,
                  height: size,
                  background: active === 0 ? "hsl(var(--primary))" : active === 1 ? "hsl(var(--accent))" : active === 2 ? "hsl(var(--primary-glow))" : "hsl(var(--chrome))",
                  opacity: 0.15 + progress * 0.55,
                  transform: `translate(${drift}px, ${-progress * 60}px)`,
                  boxShadow: `0 0 ${4 + progress * 10}px currentColor`,
                  color: "inherit",
                  transition: "background 0.6s var(--ease-fluid)",
                }}
              />
            );
          })}
        </div>

        {/* Header */}
        <div className="relative z-10 px-6 pt-28 sm:px-12">
          <div className="container mx-auto flex flex-col gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-primary">
              Act 02 — The invisible threat
            </span>
            <h2 className="max-w-3xl font-display text-4xl font-light leading-[1.05] text-chrome sm:text-6xl md:text-7xl">
              You can't see it.<br />
              <span className="italic text-liquid">It's still there.</span>
            </h2>
          </div>
        </div>

        {/* Body grid */}
        <div className="relative z-10 mt-auto px-6 pb-20 sm:px-12">
          <div className="container mx-auto grid grid-cols-1 gap-10 md:grid-cols-12">
            {/* Left: contaminant readout */}
            <div className="md:col-span-7">
              <div className="surface-glass rounded-lg p-6 sm:p-8">
                <div className="flex items-center justify-between border-b border-border/60 pb-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                    Contaminant Sample
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-primary">
                    {String(active + 1).padStart(2, "0")} / {String(contaminants.length).padStart(2, "0")}
                  </span>
                </div>
                <div className="mt-6 min-h-[180px]">
                  <div key={active} className="animate-[clipReveal_0.8s_var(--ease-fluid)_forwards]" style={{ clipPath: "inset(0 100% 0 0)" }}>
                    <span className="font-mono text-xs text-primary">{contaminants[active].code}</span>
                    <h3 className="mt-2 font-display text-3xl font-light text-chrome sm:text-4xl">
                      {contaminants[active].name}
                    </h3>
                    <p className="mt-4 max-w-md text-sm text-muted-foreground sm:text-base">
                      {contaminants[active].note}
                    </p>
                  </div>
                </div>
                {/* Indicator dots */}
                <div className="mt-6 flex gap-2">
                  {contaminants.map((_, i) => (
                    <span
                      key={i}
                      className="h-px flex-1 transition-all duration-500"
                      style={{
                        background: i <= active ? "hsl(var(--primary))" : "hsl(var(--border))",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right: stats */}
            <div className="flex flex-col gap-4 md:col-span-5">
              {stats.map((s, i) => (
                <div
                  key={i}
                  className="surface-glass flex items-baseline justify-between rounded-lg px-5 py-4 transition-transform duration-500"
                  style={{
                    transform: `translateY(${(1 - progress) * (i + 1) * 6}px)`,
                  }}
                >
                  <span className="font-display text-3xl font-light text-chrome sm:text-4xl">
                    {s.v}
                  </span>
                  <span className="ml-4 max-w-[180px] text-right font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                    {s.l}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Vertical progress */}
        <div className="absolute right-4 top-1/2 z-10 flex h-32 -translate-y-1/2 flex-col items-center gap-2 sm:right-8">
          <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-muted-foreground">Dive</span>
          <div className="relative h-full w-px bg-border">
            <div
              className="absolute inset-x-0 top-0 bg-gradient-liquid transition-[height] duration-200"
              style={{ height: `${progress * 100}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Threat;
