import { useEffect, useRef, useState } from "react";

const contaminants = [
  { code: "PFA-014", name: "PFAS / Forever Chemicals", note: "Detected in 99% of US water supplies. Linked to immune dysfunction.", peakPpm: 70, unit: "ppt" },
  { code: "MCP-021", name: "Microplastics", note: "Average American ingests 74,000 particles per year.", peakPpm: 240, unit: "p/L" },
  { code: "CL2-008", name: "Chlorine & Disinfection By-products", note: "Trihalomethanes, haloacetic acids — invisible, persistent.", peakPpm: 4.0, unit: "mg/L" },
  { code: "PB-082", name: "Lead & Heavy Metals", note: "Aging US infrastructure leaches at the tap. No safe level exists.", peakPpm: 15, unit: "µg/L" },
];

// Deterministic pseudo-random for stable layouts
const rand = (seed: number) => {
  const x = Math.sin(seed * 9999) * 43758.5453;
  return x - Math.floor(x);
};

// PFAS — hexagonal molecular rings with bond lines
const PfasField = ({ progress, visible }: { progress: number; visible: boolean }) => {
  const nodes = Array.from({ length: 14 }).map((_, i) => ({
    x: 8 + rand(i + 1) * 84,
    y: 12 + rand(i + 11) * 76,
    size: 22 + rand(i + 21) * 26,
    delay: rand(i + 31),
  }));
  return (
    <div
      className="pointer-events-none absolute inset-0 transition-opacity duration-700"
      style={{ opacity: visible ? 1 : 0 }}
      aria-hidden
    >
      <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
        {nodes.slice(0, 8).map((n, i) => {
          const m = nodes[(i + 3) % nodes.length];
          return (
            <line
              key={i}
              x1={n.x} y1={n.y} x2={m.x} y2={m.y}
              stroke="hsl(var(--primary))"
              strokeWidth="0.08"
              strokeOpacity={0.15 + progress * 0.35}
            />
          );
        })}
      </svg>
      {nodes.map((n, i) => (
        <span
          key={i}
          className="absolute motion-safe:animate-[pfasFloat_9s_ease-in-out_infinite]"
          style={{
            left: `${n.x}%`,
            top: `${n.y}%`,
            width: n.size,
            height: n.size,
            marginLeft: -n.size / 2,
            marginTop: -n.size / 2,
            clipPath: "polygon(25% 6%, 75% 6%, 100% 50%, 75% 94%, 25% 94%, 0% 50%)",
            background: "transparent",
            border: "1px solid hsl(var(--primary) / 0.55)",
            boxShadow: `inset 0 0 ${6 + progress * 14}px hsl(var(--primary) / ${0.15 + progress * 0.35})`,
            opacity: 0.4 + progress * 0.5,
            animationDelay: `${n.delay * 4}s`,
            transform: `translateY(${-progress * 30}px) rotate(${progress * 60 + i * 8}deg)`,
          }}
        />
      ))}
    </div>
  );
};

// Microplastics — irregular tumbling shards
const MicroplasticsField = ({ progress, visible }: { progress: number; visible: boolean }) => {
  const shards = Array.from({ length: 40 }).map((_, i) => ({
    x: rand(i + 101) * 100,
    y: rand(i + 201) * 100,
    size: 3 + rand(i + 301) * 11,
    layer: Math.floor(rand(i + 401) * 3),
    rot: rand(i + 501) * 360,
    shape: Math.floor(rand(i + 601) * 4),
  }));
  const clips = [
    "polygon(20% 0%, 100% 30%, 80% 100%, 0% 70%)",
    "polygon(0% 20%, 60% 0%, 100% 60%, 40% 100%)",
    "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
    "polygon(10% 10%, 90% 0%, 100% 80%, 30% 100%, 0% 50%)",
  ];
  return (
    <div
      className="pointer-events-none absolute inset-0 transition-opacity duration-700"
      style={{ opacity: visible ? 1 : 0 }}
      aria-hidden
    >
      {shards.map((s, i) => {
        const speed = (s.layer + 1) * 18;
        return (
          <span
            key={i}
            className="absolute"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: s.size,
              height: s.size,
              clipPath: clips[s.shape],
              background: `hsl(var(--accent) / ${0.35 + s.layer * 0.2})`,
              opacity: 0.3 + progress * 0.55,
              transform: `translate(${Math.sin(progress * Math.PI * 2 + i) * speed}px, ${-progress * speed * 1.5}px) rotate(${s.rot + progress * 220}deg)`,
              filter: `blur(${(2 - s.layer) * 0.4}px)`,
              transition: "opacity 0.6s var(--ease-fluid)",
            }}
          />
        );
      })}
    </div>
  );
};

// Chlorine — rising bubble column
const ChlorineField = ({ progress, visible }: { progress: number; visible: boolean }) => {
  const bubbles = Array.from({ length: 24 }).map((_, i) => ({
    x: rand(i + 701) * 100,
    size: 6 + rand(i + 801) * 18,
    delay: rand(i + 901) * 6,
    duration: 5 + rand(i + 1001) * 5,
  }));
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden transition-opacity duration-700"
      style={{ opacity: visible ? 1 : 0 }}
      aria-hidden
    >
      {/* waterline shimmer */}
      <div
        className="absolute inset-x-0 h-px"
        style={{
          top: `${50 - progress * 10}%`,
          background: "linear-gradient(90deg, transparent, hsl(var(--primary-glow) / 0.6), transparent)",
          opacity: 0.4 + progress * 0.4,
        }}
      />
      {bubbles.map((b, i) => (
        <span
          key={i}
          className="absolute rounded-full motion-safe:animate-[bubbleRise_var(--dur)_linear_infinite]"
          style={{
            left: `${b.x}%`,
            bottom: 0,
            width: b.size,
            height: b.size,
            background: "radial-gradient(circle at 35% 30%, hsl(var(--primary-glow) / 0.9), hsl(var(--primary-glow) / 0.15) 60%, transparent 70%)",
            border: "1px solid hsl(var(--primary-glow) / 0.4)",
            opacity: 0.4 + progress * 0.5,
            ["--dur" as string]: `${b.duration}s`,
            animationDelay: `${b.delay}s`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
};

// Lead — heavy crystals + dripping pipe
const LeadField = ({ progress, visible }: { progress: number; visible: boolean }) => {
  const crystals = Array.from({ length: 18 }).map((_, i) => ({
    x: rand(i + 1101) * 100,
    y: rand(i + 1201) * 100,
    size: 8 + rand(i + 1301) * 18,
    rot: rand(i + 1401) * 90,
  }));
  return (
    <div
      className="pointer-events-none absolute inset-0 transition-opacity duration-700"
      style={{ opacity: visible ? 1 : 0 }}
      aria-hidden
    >
      {crystals.map((c, i) => (
        <span
          key={i}
          className="absolute"
          style={{
            left: `${c.x}%`,
            top: `${c.y}%`,
            width: c.size,
            height: c.size * 1.4,
            clipPath: "polygon(50% 0%, 100% 35%, 80% 100%, 20% 100%, 0% 35%)",
            background: "linear-gradient(160deg, hsl(var(--chrome) / 0.5), hsl(var(--chrome) / 0.1))",
            border: "1px solid hsl(var(--chrome) / 0.35)",
            opacity: 0.35 + progress * 0.45,
            transform: `translateY(${progress * 40}px) rotate(${c.rot}deg)`,
            filter: "saturate(0.4)",
          }}
        />
      ))}
      {/* Pipe cross-section + drip */}
      <div className="absolute right-[14%] top-0 h-1/2 w-2 bg-gradient-to-b from-transparent via-chrome/30 to-chrome/50" />
      <span
        className="absolute right-[14%] h-2 w-2 rounded-full bg-chrome/70 motion-safe:animate-[leadDrip_2.4s_ease-in_infinite]"
        style={{ top: "48%", marginRight: "-2px", boxShadow: "0 0 10px hsl(var(--chrome) / 0.4)" }}
        aria-hidden
      />
    </div>
  );
};

const ContaminantField = ({ active, progress }: { active: number; progress: number }) => (
  <>
    <PfasField progress={progress} visible={active === 0} />
    <MicroplasticsField progress={progress} visible={active === 1} />
    <ChlorineField progress={progress} visible={active === 2} />
    <LeadField progress={progress} visible={active === 3} />
  </>
);

const DiveGlyph = ({ active }: { active: number }) => {
  const common = "block h-3 w-3";
  if (active === 0)
    return <span className={common} style={{ clipPath: "polygon(25% 6%, 75% 6%, 100% 50%, 75% 94%, 25% 94%, 0% 50%)", background: "hsl(var(--primary))" }} />;
  if (active === 1)
    return <span className={common} style={{ clipPath: "polygon(20% 0%, 100% 30%, 80% 100%, 0% 70%)", background: "hsl(var(--accent))" }} />;
  if (active === 2) return <span className={`${common} rounded-full`} style={{ background: "hsl(var(--primary-glow))" }} />;
  return <span className={common} style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)", background: "hsl(var(--chrome))" }} />;
};

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
      className="relative z-0 bg-background"
      style={{ height: "320vh" }}
      aria-label="The invisible threat"
    >
      {/* Sticky stage — h-screen matches parent's vh-based height */}
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
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

        {/* Contaminant-specific animated layer */}
        <ContaminantField active={active} progress={progress} />

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
        <div className="absolute right-6 top-1/2 z-10 flex h-32 -translate-y-1/2 flex-col items-center gap-2 sm:right-10">
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
