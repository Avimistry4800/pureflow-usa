import { useEffect, useRef, useState } from "react";

const steps = [
  {
    id: "01",
    code: "TEST",
    name: "Free water test",
    desc: "We mail you a sealed sampling kit. Send it back. Independent lab returns a full PFAS, lead, hardness and microbial profile within seven days.",
    meta: "7 days · No cost",
  },
  {
    id: "02",
    code: "SPEC",
    name: "Specification",
    desc: "An engineer sizes the system to your home or building — flow rate, contaminant load, footprint, fixture finish. You approve a single PDF spec sheet.",
    meta: "30-min consult",
  },
  {
    id: "03",
    code: "FIT",
    name: "Installation",
    desc: "A certified plumber fits the system in a single day. Under-counter or whole-home. Zero kitchen disruption, no holes in tile, no drama.",
    meta: "One-day fit",
  },
  {
    id: "04",
    code: "STEW",
    name: "Stewardship",
    desc: "Connected monitoring flags filter wear before it matters. Annual service is scheduled, parts are stocked, the system is built to outlast its tap.",
    meta: "30-yr build",
  },
];

const Process = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState<Set<number>>(new Set());

  useEffect(() => {
    const els = ref.current?.querySelectorAll<HTMLElement>("[data-step]") ?? [];
    const obs = new IntersectionObserver(
      (entries) => {
        setVisible((prev) => {
          const next = new Set(prev);
          entries.forEach((e) => {
            if (e.isIntersecting) {
              const i = Number((e.target as HTMLElement).dataset.step);
              next.add(i);
            }
          });
          return next;
        });
      },
      { threshold: 0.35 },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="process" className="relative bg-background py-32 sm:py-40" aria-label="The path">
      <div className="absolute inset-0 grid-noise opacity-30" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="container relative mx-auto px-6">
        <div className="mb-20 grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-primary">
              Act 04 — The Path
            </span>
            <h2 className="mt-4 font-display text-4xl font-light leading-[1.05] text-chrome sm:text-6xl">
              From inquiry to<br />
              <span className="italic text-liquid">first sip,</span> in four moves.
            </h2>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <p className="text-base text-muted-foreground sm:text-lg">
              No salespeople in your home. No pressure pitch. A water test, a
              spec sheet, a one-day install, and a system that quietly works
              for the next three decades.
            </p>
          </div>
        </div>

        <div ref={ref} className="relative">
          {/* Connecting rail (desktop) */}
          <div className="pointer-events-none absolute left-0 right-0 top-[44px] hidden h-px bg-gradient-to-r from-transparent via-border to-transparent md:block" />

          <ol className="grid grid-cols-1 gap-6 md:grid-cols-4">
            {steps.map((s, i) => {
              const isVisible = visible.has(i);
              return (
                <li
                  key={s.id}
                  data-step={i}
                  className={`surface-glass group relative rounded-lg p-6 transition-all duration-700 hover:border-primary/60 ${
                    isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                  }`}
                  style={{ transitionDelay: `${i * 90}ms` }}
                >
                  {/* Numeral disc */}
                  <div className="relative mb-6 flex items-center">
                    <span className="relative z-10 flex h-[88px] w-[88px] items-center justify-center rounded-full border border-border bg-background font-display text-3xl font-light text-chrome group-hover:border-primary/60">
                      {s.id}
                      <span className="absolute inset-0 rounded-full bg-primary/10 opacity-0 blur-xl transition-opacity group-hover:opacity-100" />
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-b border-border/60 pb-3">
                    <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-primary">
                      {s.code}
                    </span>
                    <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-muted-foreground">
                      {s.meta}
                    </span>
                  </div>

                  <h3 className="mt-4 font-display text-xl font-light text-chrome">{s.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default Process;
