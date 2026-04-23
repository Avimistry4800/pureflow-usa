import { useEffect, useRef, useState } from "react";

/**
 * LiquidTransition
 * A scroll-driven SVG wipe between acts. As the boundary between two sections
 * crosses the viewport center, an organic liquid blob sweeps across the screen,
 * briefly masking the scene to create a cinematic "fluid cut".
 *
 * Pure visual chrome — sits between sections, no layout impact.
 */
const LiquidTransition = ({
  label,
  flip = false,
}: {
  label?: string;
  flip?: boolean;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [t, setT] = useState(0); // 0 → 1 as element traverses viewport

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when element is below viewport, 1 when above
      const raw = 1 - (rect.top + rect.height / 2) / vh;
      setT(Math.max(0, Math.min(1, raw)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Bell curve: peak at t=0.5 → fully covering, edges → invisible
  const intensity = Math.sin(Math.PI * Math.max(0, Math.min(1, t)));
  // Always slide upward as user scrolls down so the wipe is visible regardless of flip.
  const translateY = (1 - t) * 100; // %

  return (
    <div
      ref={ref}
      aria-hidden
      className="relative h-[20vh] w-full overflow-hidden bg-background"
    >
      {/* Liquid blob */}
      <svg
        viewBox="0 0 1440 400"
        preserveAspectRatio="none"
        className="absolute inset-x-0 top-0 h-full w-full"
        style={{
          transform: `translateY(${translateY}%) scaleY(${flip ? -1 : 1})`,
          transition: "transform 0.05s linear",
        }}
      >
        <defs>
          <linearGradient id="liquid-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.95" />
            <stop offset="50%" stopColor="hsl(var(--primary-glow, var(--primary)))" stopOpacity="0.85" />
            <stop offset="100%" stopColor="hsl(var(--background))" stopOpacity="1" />
          </linearGradient>
          <filter id="liquid-blur">
            <feGaussianBlur stdDeviation="2" />
          </filter>
        </defs>

        {/* Background fill so the wipe fully covers */}
        <rect x="0" y="0" width="1440" height="400" fill="hsl(var(--background))" />

        {/* Organic blob edge */}
        <path
          d={`M0,${flip ? 400 : 0}
              C 240,${flip ? 320 - intensity * 60 : 80 + intensity * 60}
                480,${flip ? 360 + intensity * 40 : 40 - intensity * 40}
                720,${flip ? 320 - intensity * 80 : 80 + intensity * 80}
              C 960,${flip ? 360 + intensity * 50 : 40 - intensity * 50}
                1200,${flip ? 320 - intensity * 70 : 80 + intensity * 70}
                1440,${flip ? 340 : 60}
              L 1440,${flip ? 0 : 400} L 0,${flip ? 0 : 400} Z`}
          fill="url(#liquid-grad)"
          filter="url(#liquid-blur)"
          opacity={0.9}
        />

        {/* Highlight ribbon */}
        <path
          d={`M0,${flip ? 380 : 20}
              C 360,${flip ? 340 - intensity * 30 : 60 + intensity * 30}
                720,${flip ? 380 + intensity * 20 : 20 - intensity * 20}
                1080,${flip ? 340 - intensity * 30 : 60 + intensity * 30}
              C 1260,${flip ? 360 : 40} 1440,${flip ? 360 : 40} 1440,${flip ? 360 : 40}`}
          stroke="hsl(var(--primary))"
          strokeOpacity={0.6 * intensity}
          strokeWidth="1"
          fill="none"
        />
      </svg>

      {/* Caption */}
      {label && (
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          style={{ opacity: intensity }}
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-chrome mix-blend-difference">
            ✦ {label} ✦
          </span>
        </div>
      )}
    </div>
  );
};

export default LiquidTransition;
