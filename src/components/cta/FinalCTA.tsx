import { Link } from "react-router-dom";
import { useMagnetic } from "@/lib/useMagnetic";

const FinalCTA = () => {
  const ctaRef = useMagnetic<HTMLAnchorElement>(0.3);

  return (
    <section
      id="final-cta"
      className="relative overflow-hidden bg-background py-32 sm:py-48"
      aria-label="Start your water test"
    >
      <div className="absolute inset-0 grid-noise opacity-40" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_120%,hsl(var(--primary)/0.28),transparent_60%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

      {/* Pulsing horizontal liquid line */}
      <div className="pointer-events-none absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 overflow-hidden">
        <div
          className="h-full w-full opacity-60"
          style={{
            background:
              "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.55) 50%, transparent)",
            animation: "float 6s ease-in-out infinite",
          }}
        />
      </div>

      {/* Top meta strip — bookend Hero */}
      <div className="absolute inset-x-0 top-10 z-10 flex justify-between px-6 font-mono text-[10px] uppercase tracking-[0.32em] text-muted-foreground sm:px-10">
        <span>N 40°42′ · W 74°00′</span>
        <span className="hidden sm:inline">EST · 1992 / LDN → NYC</span>
        <span>WPL · V1.0</span>
      </div>

      <div className="container relative z-10 mx-auto flex flex-col items-center px-6 text-center">
        <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-primary">
          Act 06 — The Invitation
        </span>

        <h2
          className="mt-6 font-display font-light leading-[0.95] text-chrome"
          style={{ fontSize: "clamp(2.75rem, 8vw, 6.5rem)" }}
        >
          Water you'll <span className="italic text-liquid">forget</span><br />
          to think about.
        </h2>

        <p className="mt-8 max-w-xl text-balance text-base text-muted-foreground sm:text-lg">
          Start with a free water test. We'll handle the rest — the
          specification, the install, the next three decades.
        </p>

        <div className="mt-12 flex flex-col items-center gap-6 sm:flex-row">
          <Link
            ref={ctaRef}
            to="/contact"
            data-magnetic
            className="group relative inline-flex items-center gap-3 rounded-full bg-chrome px-8 py-4 font-mono text-[11px] font-medium uppercase tracking-[0.28em] text-background shadow-glow transition-shadow hover:shadow-[0_0_80px_hsl(var(--primary)/0.6)]"
          >
            <span>Request your water test</span>
            <span className="relative inline-block h-1.5 w-6 overflow-hidden">
              <span className="absolute inset-y-0 left-0 w-full bg-background transition-transform duration-500 group-hover:translate-x-2" />
            </span>
          </Link>

          <Link
            to="/technology"
            className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground underline-offset-4 transition-colors hover:text-chrome hover:underline"
          >
            Explore the technology →
          </Link>
        </div>

        <div className="mt-20 flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.32em] text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-dot" />
          <span>Independent lab · 7-day turnaround · No obligation</span>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
