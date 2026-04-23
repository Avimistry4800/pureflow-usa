import { useRef, useEffect, useState } from "react";
import purifierImg from "@/assets/purifier.png";

const stages = [
  { id: "01", code: "RO-MEM", name: "Reverse Osmosis Membrane", desc: "Sub-nanometer pores reject 99.9% of dissolved solids, PFAS and heavy metals.", color: "#5BE9FF" },
  { id: "02", code: "DI-RES", name: "Deionization Resin", desc: "Cation/anion exchange polishes water to clinical conductivity for medical use.", color: "#6F4CFF" },
  { id: "03", code: "UF-CER", name: "Ultra-Filtration Ceramic", desc: "Hollow-fibre matrix captures bacteria, cysts and microplastics > 0.01μm.", color: "#5BE9FF" },
  { id: "04", code: "UV-STR", name: "UV-C Sterilization Chamber", desc: "265nm dose denatures viral DNA. Guardian-grade microbial control.", color: "#E8F6FF" },
];

/**
 * Product photography stage — replaces the procedural R3F model.
 * Real product render with scroll-driven parallax, glow rings, scan line and hotspot reveal.
 */
function PurifierStage({ explode, active }: { explode: number; active: number }) {
  const hotspots = [
    { top: "20%" },
    { top: "38%" },
    { top: "58%" },
    { top: "78%" },
  ];

  return (
    <div className="relative h-full w-full">
      {/* Ambient cyan glow */}
      <div
        className="absolute left-1/2 top-1/2 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{
          background: "radial-gradient(circle, hsl(var(--primary) / 0.45), transparent 65%)",
          opacity: 0.4 + explode * 0.5,
        }}
      />

      {/* Concentric rings */}
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/20"
          style={{
            width: `${50 + i * 18 + explode * 10}%`,
            height: `${50 + i * 18 + explode * 10}%`,
            opacity: (0.5 - i * 0.15) * (0.5 + explode * 0.5),
            transform: `translate(-50%, -50%) rotate(${explode * 90 * (i % 2 === 0 ? 1 : -1)}deg)`,
            transition: "transform 0.3s ease-out, opacity 0.3s ease-out",
          }}
        />
      ))}

      {/* Product render */}
      <img
        src={purifierImg}
        alt="WPL Liquid purification system — chrome cylinder with glowing cyan core"
        loading="lazy"
        width={1080}
        height={1920}
        className="absolute left-1/2 top-1/2 h-[88%] w-auto object-contain drop-shadow-[0_30px_60px_hsl(var(--primary)/0.35)]"
        style={{
          transform: `translate(-50%, calc(-50% + ${(explode - 0.5) * -30}px)) scale(${1 + explode * 0.06})`,
          transition: "transform 0.2s ease-out",
          filter: `brightness(${1 + explode * 0.15}) contrast(${1 + explode * 0.05})`,
        }}
      />

      {/* Sweeping scan line */}
      <div
        className="pointer-events-none absolute left-0 right-0 h-[2px]"
        style={{
          top: `${15 + explode * 70}%`,
          background:
            "linear-gradient(90deg, transparent, hsl(var(--primary)) 50%, transparent)",
          opacity: explode > 0.05 && explode < 0.95 ? 0.9 : 0,
          boxShadow: "0 0 20px hsl(var(--primary))",
        }}
      />

      {/* Hotspots */}
      {hotspots.map((h, i) => (
        <div
          key={i}
          className="pointer-events-none absolute left-[58%] -translate-y-1/2"
          style={{
            top: h.top,
            opacity: explode > 0.2 ? 1 : 0,
            transition: "opacity 0.4s ease-out",
          }}
        >
          <div
            className={`flex items-center gap-3 ${
              i === active ? "scale-110" : "scale-100"
            } transition-transform`}
          >
            <span
              className={`block h-2 w-2 rounded-full ${
                i === active ? "bg-primary shadow-[0_0_12px_hsl(var(--primary))]" : "bg-chrome/60"
              }`}
            />
            <span className="h-px w-10 bg-primary/40" />
            <span
              className={`font-mono text-[10px] uppercase tracking-[0.28em] ${
                i === active ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {stages[i].code}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

const Solution = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const scrolled = Math.max(0, Math.min(total, -rect.top));
      const p = total > 0 ? scrolled / total : 0;
      setProgress(p);
      setActive(Math.min(stages.length - 1, Math.floor(p * stages.length)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const explode = Math.min(1, Math.max(0, (progress - 0.15) / 0.7));

  return (
    <section
      id="solution"
      ref={sectionRef}
      className="relative z-0 bg-background"
      style={{ height: "360vh" }}
      aria-label="The system"
    >
      <div className="sticky top-0 flex h-screen overflow-hidden">
        <div className="absolute inset-0 grid-noise opacity-40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,hsl(var(--primary)/0.12),transparent_60%)]" />

        <div className="relative z-10 grid h-full w-full grid-cols-1 md:grid-cols-2">
          {/* Product stage */}
          <div className="relative h-[55vh] md:h-full">
            <PurifierStage explode={explode} active={active} />

            {/* Stage label overlay */}
            <div className="pointer-events-none absolute left-6 top-28 sm:left-10">
              <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-primary">
                Act 03 — Reveal
              </span>
              <h2 className="mt-3 max-w-md font-display text-4xl font-light leading-[1.05] text-chrome sm:text-5xl">
                Engineered to be <span className="italic text-liquid">invisible.</span>
              </h2>
            </div>

            <div className="pointer-events-none absolute bottom-6 left-6 font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground sm:left-10">
              MODEL · WPL-LIQ-001
            </div>
            <div className="pointer-events-none absolute bottom-6 right-6 font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
              REVEAL · {(explode * 100).toFixed(0)}%
            </div>
          </div>

          {/* Stage info panel */}
          <div className="relative flex items-center justify-start px-6 py-12 sm:px-12 md:px-16">
            <div className="w-full max-w-md">
              <div className="mb-8 space-y-1">
                {stages.map((s, i) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => {
                      const el = sectionRef.current;
                      if (!el) return;
                      const total = el.offsetHeight - window.innerHeight;
                      const target = el.offsetTop + ((i + 0.5) / stages.length) * total;
                      window.scrollTo({ top: target, behavior: "smooth" });
                    }}
                    className={`group flex w-full items-center gap-4 rounded border-l-2 py-2 pl-4 text-left transition-all ${
                      i === active
                        ? "border-primary bg-primary/5"
                        : "border-border/40 hover:border-primary/60"
                    }`}
                  >
                    <span
                      className={`font-mono text-[10px] uppercase tracking-[0.28em] transition-colors ${
                        i === active ? "text-primary" : "text-muted-foreground"
                      }`}
                    >
                      {s.id}
                    </span>
                    <span
                      className={`font-display text-sm transition-colors ${
                        i === active ? "text-chrome" : "text-muted-foreground"
                      }`}
                    >
                      {s.name}
                    </span>
                  </button>
                ))}
              </div>

              <div key={active} className="surface-glass rounded-lg p-6">
                <div className="flex items-center justify-between border-b border-border/60 pb-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-primary">
                    {stages[active].code}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                    Stage {stages[active].id}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-2xl font-light text-chrome">
                  {stages[active].name}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground">{stages[active].desc}</p>
              </div>

              <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                Scroll to reveal →
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Solution;
