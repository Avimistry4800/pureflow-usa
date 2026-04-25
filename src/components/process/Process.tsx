import { useEffect, useRef, useState } from "react";

const steps = [
  {
    id: "01",
    code: "TEST",
    name: "Free water test",
    desc: "We mail a sealed sampling kit. You send it back. Independent lab returns a full PFAS, lead, hardness and microbial profile within seven days.",
    meta: "7 days · No cost",
  },
  {
    id: "02",
    code: "SPEC",
    name: "Specification",
    desc: "An engineer sizes the system to your home — flow rate, contaminant load, footprint, fixture finish. You approve a single PDF spec sheet.",
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
    desc: "Connected monitoring flags filter wear before it matters. Annual service is scheduled, parts are stocked, the system outlasts its tap.",
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
      <div className="container relative mx-auto px-6">
        {/* Header */}
        <div className="mb-24 grid grid-cols-1 gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-muted-foreground">
              Inquiry <span className="mx-2 text-primary">→</span> First sip
            </span>
            <h2 className="mt-5 font-display text-4xl font-light leading-[1.02] text-chrome sm:text-6xl">
              From inquiry to<br />
              <span className="italic text-liquid">first sip,</span> in four moves.
            </h2>
          </div>
          <div className="md:col-span-5">
            <p className="text-base text-muted-foreground sm:text-lg">
              Mail a sample. Read a spec. One day with a plumber. Thirty
              years of not thinking about it.
            </p>
          </div>
        </div>

        {/* Blueprint rail */}
        <div ref={ref} className="relative">
          {/* Connecting line */}
          <div className="pointer-events-none absolute left-0 right-0 top-[58px] hidden h-px bg-border md:block">
            <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0" />
          </div>

          <ol className="grid grid-cols-1 gap-16 md:grid-cols-4 md:gap-8">
            {steps.map((s, i) => {
              const isVisible = visible.has(i);
              return (
                <li
                  key={s.id}
                  data-step={i}
                  className={`group relative transition-all duration-700 ${
                    isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                  }`}
                  style={{ transitionDelay: `${i * 90}ms` }}
                >
                  {/* Station dot on the rail */}
                  <span className="absolute left-0 top-[54px] hidden h-2 w-2 rounded-full bg-primary shadow-[0_0_12px_hsl(var(--primary))] md:block" />

                  {/* Massive numeral */}
                  <div className="font-display text-[6rem] font-extralight leading-none text-chrome/90 sm:text-[7rem]">
                    {s.id}
                  </div>

                  {/* Code + meta */}
                  <div className="mt-6 flex items-center gap-3">
                    <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-primary">
                      {s.code}
                    </span>
                    <span className="h-px flex-1 bg-border/60" />
                    <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-muted-foreground">
                      {s.meta}
                    </span>
                  </div>

                  <h3 className="mt-4 font-display text-xl font-light text-chrome">{s.name}</h3>
                  <p className="mt-3 max-w-[26ch] text-sm leading-relaxed text-muted-foreground">
                    {s.desc}
                  </p>
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
