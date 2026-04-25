import { useEffect, useRef, useState } from "react";
import { useMagnetic } from "@/lib/useMagnetic";
import HeroCanvas from "./HeroCanvas";

const Hero = () => {
  const ctaRef = useMagnetic<HTMLAnchorElement>(0.3);
  const [show, setShow] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative h-[100svh] w-full overflow-hidden bg-background">
      {/* WebGL backdrop */}
      <div className="absolute inset-0">
        <HeroCanvas />
      </div>

      {/* Overlays */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_120%,hsl(var(--primary)/0.25),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 grid-noise" />

      {/* Top meta strip */}
      <div className="absolute inset-x-0 top-24 z-10 flex justify-between px-6 font-mono text-[10px] uppercase tracking-[0.32em] text-muted-foreground sm:px-10">
        <span>N 40°42′ · W 74°00′</span>
        <span className="hidden sm:inline">EST · 1992 / LDN → NYC</span>
        <span>WPL · V1.0</span>
      </div>

      {/* Center content */}
      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col items-center justify-center px-6 text-center">
        <div
          className={`mb-8 inline-flex items-center gap-3 rounded-full border border-primary/30 bg-background/30 px-4 py-1.5 backdrop-blur transition-all duration-700 ${
            show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-dot" />
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-chrome/80">
            The future of clean water
          </span>
        </div>

        <h1
          ref={titleRef}
          className="font-display font-light leading-[0.92] text-chrome"
          style={{ fontSize: "clamp(3.25rem, 11vw, 9.5rem)" }}
        >
          <span
            className={`block transition-all duration-1000 ${
              show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            Purity
          </span>
          <span
            className={`block italic text-liquid transition-all delay-200 duration-1000 ${
              show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ fontFamily: '"Space Grotesk", serif' }}
          >
            by design.
          </span>
        </h1>

        <p
          className={`mt-8 max-w-xl text-balance text-base text-muted-foreground transition-all delay-500 duration-1000 sm:text-lg ${
            show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          Built in Sheffield since 1992. Now plumbed into 11,000 American
          homes — quietly, under the counter, for the next thirty years.
        </p>

        <div
          className={`mt-12 flex flex-col items-center gap-6 transition-all delay-700 duration-1000 sm:flex-row ${
            show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <a
            ref={ctaRef}
            href="#threat"
            data-magnetic
            className="group relative inline-flex items-center gap-3 rounded-full bg-chrome px-8 py-4 font-mono text-[11px] font-medium uppercase tracking-[0.28em] text-background shadow-glow transition-shadow hover:shadow-[0_0_80px_hsl(var(--primary)/0.6)]"
          >
            <span>Discover the source</span>
            <span className="relative inline-block h-1.5 w-6 overflow-hidden">
              <span className="absolute inset-y-0 left-0 w-full bg-background transition-transform duration-500 group-hover:translate-x-2" />
            </span>
          </a>

          <a
            href="#solution"
            className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground underline-offset-4 transition-colors hover:text-chrome hover:underline"
          >
            Inspect the system →
          </a>
        </div>
      </div>

      {/* Bottom indicator */}
      <div className="absolute inset-x-0 bottom-8 z-10 flex flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.32em] text-muted-foreground">
        <span>Scroll</span>
        <span className="block h-8 w-px bg-gradient-to-b from-primary to-transparent" />
      </div>
    </section>
  );
};

export default Hero;
