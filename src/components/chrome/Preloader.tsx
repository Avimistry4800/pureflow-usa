import { useEffect, useState } from "react";

const Preloader = ({ onDone }: { onDone?: () => void }) => {
  const [pct, setPct] = useState(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let v = 0;
    const id = setInterval(() => {
      v += Math.random() * 9 + 2;
      if (v >= 100) {
        v = 100;
        clearInterval(id);
        setPct(100);
        setTimeout(() => {
          setHidden(true);
          onDone?.();
        }, 600);
      } else {
        setPct(Math.floor(v));
      }
    }, 90);
    return () => clearInterval(id);
  }, [onDone]);

  return (
    <div
      className={`fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background transition-[opacity,clip-path] duration-700 ${
        hidden ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      style={{
        clipPath: hidden ? "inset(0 0 100% 0)" : "inset(0 0 0 0)",
      }}
      aria-hidden={hidden}
    >
      <div className="absolute inset-0 bg-gradient-caustic opacity-60" />
      <div className="relative flex w-[min(420px,80vw)] flex-col items-center gap-6">
        <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.32em] text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-dot" />
          Calibrating molecular clarity
        </div>

        <div className="font-display text-[clamp(3rem,10vw,5rem)] font-light leading-none tabular-nums text-chrome">
          {String(pct).padStart(3, "0")}
          <span className="text-primary">%</span>
        </div>

        <div className="h-px w-full overflow-hidden bg-border">
          <div
            className="h-full bg-gradient-liquid transition-[width] duration-200 ease-out"
            style={{ width: `${pct}%` }}
          />
        </div>

        <div className="flex w-full items-center justify-between font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
          <span>SYS · WPL/V1</span>
          <span>RO · DI · UV</span>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
