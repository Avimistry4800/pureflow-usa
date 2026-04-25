import { useMemo, useRef, useState } from "react";

type Props = {
  /** Stable seed — usually the contaminant code */
  seed: string;
  /** Peak value in the contaminant unit (used to scale Y) */
  peak: number;
  /** Unit label, e.g. "ppt", "p/L", "mg/L", "µg/L" */
  unit: string;
  /** Mnemonic code (PFA-014, etc.) */
  code: string;
  /** Scroll-driven dive progress 0..1 — current "now" amplitude */
  progress: number;
};

// Deterministic PRNG so each contaminant produces a stable 24h series
const seeded = (s: string) => {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return () => {
    h ^= h << 13;
    h ^= h >>> 17;
    h ^= h << 5;
    return ((h >>> 0) % 100000) / 100000;
  };
};

const POINTS = 24; // hourly samples for last 24h

const Trend24h = ({ seed, peak, unit, code, progress }: Props) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hover, setHover] = useState<number | null>(null);

  // Stable per-contaminant 24h series, modulated by current dive progress
  const series = useMemo(() => {
    const rng = seeded(seed);
    const base = Array.from({ length: POINTS }).map((_, i) => {
      // gentle daily curve + noise (0..1)
      const phase = (i / POINTS) * Math.PI * 2;
      const daily = 0.5 + 0.32 * Math.sin(phase - Math.PI / 2);
      const noise = (rng() - 0.5) * 0.28;
      return Math.max(0.04, Math.min(0.98, daily + noise));
    });
    // Bias the most recent samples toward the live "now" reading from scroll
    const live = 0.04 + progress * 0.96;
    return base.map((v, i) => {
      const w = i / (POINTS - 1); // 0..1, last sample = 1
      const pull = Math.pow(w, 2.4) * 0.55;
      return v * (1 - pull) + live * pull;
    });
  }, [seed, progress]);

  const W = 100;
  const H = 36;
  const stepX = W / (POINTS - 1);
  const toX = (i: number) => i * stepX;
  const toY = (v: number) => H - v * (H - 4) - 2;

  const linePath = series
    .map((v, i) => `${i === 0 ? "M" : "L"}${toX(i).toFixed(2)} ${toY(v).toFixed(2)}`)
    .join(" ");
  const areaPath = `${linePath} L${W} ${H} L0 ${H} Z`;

  const activeIdx = hover ?? POINTS - 1;
  const activeVal = series[activeIdx];
  const decimals = peak < 10 ? 2 : peak < 100 ? 1 : 0;
  const activeReal = activeVal * peak;
  const display = activeReal.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  // Time label: index 23 = "now", 0 = "−24h"
  const hoursAgo = POINTS - 1 - activeIdx;
  const timeLabel = hoursAgo === 0 ? "now" : `−${hoursAgo}h`;

  // Min/max stats
  const min = Math.min(...series);
  const max = Math.max(...series);

  const handleMove = (e: React.PointerEvent<SVGSVGElement>) => {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    const i = Math.max(0, Math.min(POINTS - 1, Math.round(ratio * (POINTS - 1))));
    setHover(i);
  };

  return (
    <div className="w-full">
      <div className="flex items-end justify-between gap-3">
        <div className="flex items-baseline gap-2">
          <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-muted-foreground">
            {code} · 24h trend
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-muted-foreground/70">
            {timeLabel}
          </span>
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className="font-display text-base font-light tabular-nums text-chrome">
            {display}
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-primary">
            {unit}
          </span>
        </div>
      </div>

      <div className="relative mt-2">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="none"
          className="block h-14 w-full cursor-crosshair touch-none"
          onPointerMove={handleMove}
          onPointerDown={handleMove}
          onPointerLeave={() => setHover(null)}
          role="img"
          aria-label={`${code} concentration over the last 24 hours, currently ${display} ${unit}`}
        >
          <defs>
            <linearGradient id={`trend-fill-${code}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.45" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* baseline grid */}
          {[0.25, 0.5, 0.75].map((g) => (
            <line
              key={g}
              x1={0}
              x2={W}
              y1={H - g * (H - 4) - 2}
              y2={H - g * (H - 4) - 2}
              stroke="hsl(var(--border))"
              strokeWidth="0.25"
              strokeDasharray="0.6 1.2"
              opacity={0.6}
            />
          ))}

          {/* area */}
          <path d={areaPath} fill={`url(#trend-fill-${code})`} />

          {/* line */}
          <path
            d={linePath}
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="0.7"
            strokeLinejoin="round"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />

          {/* hover crosshair */}
          <line
            x1={toX(activeIdx)}
            x2={toX(activeIdx)}
            y1={0}
            y2={H}
            stroke="hsl(var(--chrome))"
            strokeOpacity={hover === null ? 0.25 : 0.55}
            strokeWidth="0.3"
            vectorEffect="non-scaling-stroke"
          />

          {/* active dot */}
          <circle
            cx={toX(activeIdx)}
            cy={toY(activeVal)}
            r={1.4}
            fill="hsl(var(--chrome))"
            stroke="hsl(var(--primary))"
            strokeWidth="0.5"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>

      <div className="mt-1.5 flex justify-between font-mono text-[9px] uppercase tracking-[0.24em] text-muted-foreground/70">
        <span>−24h</span>
        <span>
          min {(min * peak).toFixed(decimals)} · max {(max * peak).toFixed(decimals)}
        </span>
        <span className="text-primary">now</span>
      </div>
    </div>
  );
};

export default Trend24h;
