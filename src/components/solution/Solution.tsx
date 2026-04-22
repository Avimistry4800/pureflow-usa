import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useMemo, useEffect, useState, lazy, Suspense } from "react";
import * as THREE from "three";

const stages = [
  { id: "01", code: "RO-MEM", name: "Reverse Osmosis Membrane", desc: "Sub-nanometer pores reject 99.9% of dissolved solids, PFAS and heavy metals.", color: "#5BE9FF" },
  { id: "02", code: "DI-RES", name: "Deionization Resin", desc: "Cation/anion exchange polishes water to clinical conductivity for medical use.", color: "#6F4CFF" },
  { id: "03", code: "UF-CER", name: "Ultra-Filtration Ceramic", desc: "Hollow-fibre matrix captures bacteria, cysts and microplastics > 0.01μm.", color: "#5BE9FF" },
  { id: "04", code: "UV-STR", name: "UV-C Sterilization Chamber", desc: "265nm dose denatures viral DNA. Guardian-grade microbial control.", color: "#E8F6FF" },
];

function Purifier({ explode }: { explode: number }) {
  const group = useRef<THREE.Group>(null);

  // Procedural cylindrical filter stack
  const segments = useMemo(() => {
    return stages.map((s, i) => ({
      ...s,
      y: i - (stages.length - 1) / 2,
    }));
  }, []);

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = state.clock.elapsedTime * 0.25;
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.06;
  });

  return (
    <group ref={group}>
      {/* Outer chrome shell — fades as we explode */}
      <mesh>
        <cylinderGeometry args={[0.95, 0.95, 4.2, 64, 1, true]} />
        <meshPhysicalMaterial
          color="#0B1220"
          metalness={1}
          roughness={0.15}
          transmission={0.4}
          thickness={1.2}
          transparent
          opacity={Math.max(0.05, 0.55 - explode * 0.55)}
          side={THREE.DoubleSide}
          emissive="#5BE9FF"
          emissiveIntensity={0.05}
        />
      </mesh>

      {/* Caps */}
      {[2.1, -2.1].map((y, i) => (
        <mesh key={i} position={[0, y, 0]}>
          <cylinderGeometry args={[0.95, 0.95, 0.12, 64]} />
          <meshStandardMaterial color="#13203A" metalness={1} roughness={0.3} />
        </mesh>
      ))}

      {/* Filter segments */}
      {segments.map((s, i) => (
        <group key={s.id} position={[0, s.y * (0.85 + explode * 0.9), 0]}>
          <mesh>
            <cylinderGeometry args={[0.78, 0.78, 0.7, 48]} />
            <meshPhysicalMaterial
              color={s.color}
              emissive={s.color}
              emissiveIntensity={0.4 + explode * 0.6}
              metalness={0.4}
              roughness={0.25}
              transmission={0.6}
              thickness={0.5}
              transparent
              opacity={0.85}
            />
          </mesh>
          {/* Ribbed indicator */}
          {Array.from({ length: 12 }).map((_, k) => (
            <mesh key={k} position={[0, 0, 0]} rotation={[0, (k / 12) * Math.PI * 2, 0]}>
              <boxGeometry args={[0.02, 0.7, 0.82]} />
              <meshStandardMaterial color="#05070D" metalness={0.6} roughness={0.4} />
            </mesh>
          ))}
          {/* Glow ring on explode */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.85, 0.92 + explode * 0.4, 64]} />
            <meshBasicMaterial color={s.color} transparent opacity={explode * 0.6} side={THREE.DoubleSide} />
          </mesh>
        </group>
      ))}

      {/* Connecting beam through center when exploded */}
      <mesh>
        <cylinderGeometry args={[0.02, 0.02, 4.2 + explode * 4, 8]} />
        <meshBasicMaterial color="#5BE9FF" transparent opacity={0.4 + explode * 0.4} />
      </mesh>
    </group>
  );
}

function Scene({ explode }: { explode: number }) {
  const { camera } = useThree();
  useEffect(() => {
    camera.position.set(3.6, 1.4, 4.6);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[3, 5, 5]} intensity={1.4} color="#5BE9FF" />
      <pointLight position={[-4, -3, -2]} intensity={0.8} color="#6F4CFF" />
      <Purifier explode={explode} />
    </>
  );
}

const PurifierCanvas = ({ explode }: { explode: number }) => (
  <Canvas dpr={[1, 1.5]} gl={{ antialias: true, powerPreference: "high-performance" }}>
    <Scene explode={explode} />
  </Canvas>
);

const LazyCanvas = lazy(() => Promise.resolve({ default: PurifierCanvas }));

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
      className="relative bg-background"
      style={{ height: "360vh" }}
      aria-label="The system"
    >
      <div className="sticky top-0 flex h-[100svh] overflow-hidden">
        <div className="absolute inset-0 grid-noise opacity-40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,hsl(var(--primary)/0.12),transparent_60%)]" />

        <div className="relative z-10 grid h-full w-full grid-cols-1 md:grid-cols-2">
          {/* 3D stage */}
          <div className="relative h-[55vh] md:h-full">
            <Suspense fallback={<div className="h-full w-full bg-gradient-deep" />}>
              <LazyCanvas explode={explode} />
            </Suspense>

            {/* Stage label overlay */}
            <div className="pointer-events-none absolute left-6 top-28 sm:left-10">
              <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-primary">
                Act 03 — Reveal
              </span>
              <h2 className="mt-3 max-w-md font-display text-4xl font-light leading-[1.05] text-chrome sm:text-5xl">
                Engineered to be <span className="italic text-liquid">invisible.</span>
              </h2>
            </div>

            {/* Floating coords */}
            <div className="pointer-events-none absolute bottom-6 left-6 font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground sm:left-10">
              MODEL · WPL-LIQ-001
            </div>
            <div className="pointer-events-none absolute bottom-6 right-6 font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
              EXPLODE · {(explode * 100).toFixed(0)}%
            </div>
          </div>

          {/* Stage info panel */}
          <div className="relative flex items-center justify-start px-6 py-12 sm:px-12 md:px-16">
            <div className="w-full max-w-md">
              {/* Stage list */}
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

              {/* Active detail */}
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
                Scroll to disassemble →
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Solution;
