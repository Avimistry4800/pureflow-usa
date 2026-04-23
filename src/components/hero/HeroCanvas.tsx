import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { forwardRef, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { waterFragment, waterVertex } from "@/shaders/water";

const Plane = forwardRef<THREE.Mesh, { mouse: React.MutableRefObject<{ x: number; y: number; t: number }> }>(function Plane(
  { mouse },
  ref,
) {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const { size, viewport } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
      uIntensity: { value: 0 },
      uColorDeep: { value: new THREE.Color("#05070D") },
      uColorCyan: { value: new THREE.Color("#5BE9FF") },
      uColorGlow: { value: new THREE.Color("#6F4CFF") },
    }),
    [],
  );

  useEffect(() => {
    if (!matRef.current) return;
    matRef.current.uniforms.uResolution.value.set(size.width, size.height);
  }, [size]);

  useFrame((_, dt) => {
    if (!matRef.current) return;
    const u = matRef.current.uniforms;
    u.uTime.value += dt;
    // Smooth cursor
    u.uMouse.value.x += (mouse.current.x - u.uMouse.value.x) * 0.08;
    u.uMouse.value.y += (mouse.current.y - u.uMouse.value.y) * 0.08;
    u.uIntensity.value += (mouse.current.t - u.uIntensity.value) * 0.06;
    mouse.current.t *= 0.96;
  });

  return (
    <mesh ref={ref}>
      <planeGeometry args={[viewport.width, viewport.height, 1, 1]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={waterVertex}
        fragmentShader={waterFragment}
        uniforms={uniforms}
      />
    </mesh>
  );
});

const HeroCanvas = forwardRef<HTMLDivElement, Record<string, never>>(function HeroCanvas(_, ref) {
  const mouse = useRef({ x: 0.5, y: 0.5, t: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX / window.innerWidth;
      mouse.current.y = 1 - e.clientY / window.innerHeight;
      mouse.current.t = Math.min(1, mouse.current.t + 0.08);
    };
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      mouse.current.x = t.clientX / window.innerWidth;
      mouse.current.y = 1 - t.clientY / window.innerHeight;
      mouse.current.t = 1;
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onTouch, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onTouch);
    };
  }, []);

  return (
    <div ref={ref} className="h-full w-full">
      <Canvas
        orthographic
        camera={{ position: [0, 0, 1], zoom: 1 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, powerPreference: "high-performance" }}
      >
        <Plane mouse={mouse} />
      </Canvas>
    </div>
  );
});

export default HeroCanvas;
