import { useEffect, useRef, useState } from "react";

/**
 * LiquidTransition
 * A scroll-driven SVG wipe between acts. A zero-height sentinel is placed in
 * the document flow; the actual blob is rendered into a fixed-position layer
 * so it CANNOT influence the layout (or scroll math) of neighboring sticky
 * sections. As the sentinel passes through the viewport center, the blob
 * sweeps and the act caption fades in.
 */
const LiquidTransition = ({
  flip = false,
}: {
  flip?: boolean;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [t, setT] = useState(0); // 0 → 1 as sentinel traverses viewport

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 1 when sentinel is at the top of viewport, 0 when at the bottom.
      const raw = 1 - rect.top / vh;
      setT(Math.max(0, Math.min(1, raw)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Bell curve: peak when the sentinel crosses the viewport middle.
  const intensity = Math.sin(Math.PI * t);
  // Hide the fixed layer entirely outside the active window so it never
  // overlays unrelated sections elsewhere in the page.
  const visible = t > 0.02 && t < 0.98;
  const translateY = (0.5 - t) * 48;
  const pathOpacity = 0.32 + intensity * 0.5;
  const glowOpacity = 0.16 + intensity * 0.34;

  return (
    <>
      {/* Zero-height sentinel — lives in the document flow but takes no space */}
      <div ref={ref} aria-hidden className="relative h-0 w-full" />

      {/* Fixed-position visual layer — does not affect layout */}
      {visible && (
        <div
          aria-hidden
          className="pointer-events-none fixed inset-x-0 top-1/2 z-30 h-[20vh] w-full -translate-y-1/2 overflow-visible"
        >
          <svg
            viewBox="0 0 1440 400"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full"
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
              opacity={glowOpacity}
            />

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
              opacity={pathOpacity}
            />

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

        </div>
      )}
    </>
  );
};

export default LiquidTransition;
