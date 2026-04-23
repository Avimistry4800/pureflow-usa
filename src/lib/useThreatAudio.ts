import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Subtle Web Audio cues for the Act 02 concentration meter.
 * - Soft "tick" pings as the meter crosses fill thresholds.
 * - A gentle low drone whose volume tracks scroll progress.
 * - Pitch shifts per active contaminant.
 * - Mute state persisted in localStorage.
 *
 * No external deps. Lazy-creates AudioContext on first user gesture.
 */

const STORAGE_KEY = "threat-audio-muted";
// 20 evenly spaced thresholds (every 5%) — gives a satisfying "tick tick" feel
const TICK_STEP = 0.05;
// Per-contaminant base frequency for the tick (Hz)
const TICK_FREQ = [880, 660, 540, 380];
// Per-contaminant drone frequency
const DRONE_FREQ = [110, 138, 92, 73];

export const useThreatAudio = () => {
  const [muted, setMuted] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem(STORAGE_KEY) === "1";
  });

  const ctxRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);
  const droneOscRef = useRef<OscillatorNode | null>(null);
  const droneGainRef = useRef<GainNode | null>(null);
  const lastTickIndexRef = useRef<number>(-1);
  const lastActiveRef = useRef<number>(0);

  const ensureContext = useCallback(() => {
    if (typeof window === "undefined") return null;
    if (ctxRef.current) return ctxRef.current;
    try {
      const Ctx = window.AudioContext || (window as any).webkitAudioContext;
      if (!Ctx) return null;
      const ctx: AudioContext = new Ctx();
      const master = ctx.createGain();
      master.gain.value = muted ? 0 : 0.6;
      master.connect(ctx.destination);
      ctxRef.current = ctx;
      masterRef.current = master;
      return ctx;
    } catch {
      return null;
    }
  }, [muted]);

  // Persist + apply mute
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, muted ? "1" : "0");
    const master = masterRef.current;
    const ctx = ctxRef.current;
    if (master && ctx) {
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.linearRampToValueAtTime(muted ? 0 : 0.6, ctx.currentTime + 0.15);
    }
  }, [muted]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      try {
        droneOscRef.current?.stop();
      } catch {}
      droneOscRef.current?.disconnect();
      droneGainRef.current?.disconnect();
      masterRef.current?.disconnect();
      ctxRef.current?.close().catch(() => {});
      ctxRef.current = null;
    };
  }, []);

  const playTick = useCallback((active: number) => {
    const ctx = ctxRef.current;
    const master = masterRef.current;
    if (!ctx || !master || muted) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    const base = TICK_FREQ[active] ?? 660;
    osc.frequency.setValueAtTime(base * 1.5, now);
    osc.frequency.exponentialRampToValueAtTime(base, now + 0.18);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.18, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.32);
    osc.connect(gain).connect(master);
    osc.start(now);
    osc.stop(now + 0.36);
  }, [muted]);

  const startDrone = useCallback((active: number) => {
    const ctx = ensureContext();
    if (!ctx || !masterRef.current) return;
    if (droneOscRef.current) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = DRONE_FREQ[active] ?? 110;
    gain.gain.value = 0;
    osc.connect(gain).connect(masterRef.current);
    osc.start();
    droneOscRef.current = osc;
    droneGainRef.current = gain;
  }, [ensureContext]);

  /**
   * Drive audio from scroll. Call inside the scroll/progress effect.
   * - progress ∈ [0..1]
   * - active: index of current contaminant
   * - inView: whether Act 02 is on screen (silences drone otherwise)
   */
  const update = useCallback((progress: number, active: number, inView: boolean) => {
    const ctx = ensureContext();
    if (!ctx) return;
    if (ctx.state === "suspended") {
      // Will resume on user gesture; bail until then.
      return;
    }

    startDrone(active);

    const drone = droneGainRef.current;
    const droneOsc = droneOscRef.current;
    if (drone && droneOsc) {
      const target = inView && !muted ? 0.045 + progress * 0.08 : 0;
      drone.gain.setTargetAtTime(target, ctx.currentTime, 0.25);
      // Smoothly retune when contaminant changes
      if (active !== lastActiveRef.current) {
        droneOsc.frequency.setTargetAtTime(
          DRONE_FREQ[active] ?? 110,
          ctx.currentTime,
          0.4,
        );
        lastActiveRef.current = active;
      }
    }

    if (!inView) {
      lastTickIndexRef.current = -1;
      return;
    }

    const idx = Math.floor(progress / TICK_STEP);
    if (idx !== lastTickIndexRef.current) {
      // Avoid firing a burst on first mount
      if (lastTickIndexRef.current !== -1 && idx > lastTickIndexRef.current) {
        playTick(active);
      }
      lastTickIndexRef.current = idx;
    }
  }, [ensureContext, muted, playTick, startDrone]);

  // Resume context on first user gesture (autoplay policy)
  useEffect(() => {
    const resume = () => {
      const ctx = ensureContext();
      ctx?.resume().catch(() => {});
    };
    window.addEventListener("pointerdown", resume, { once: true });
    window.addEventListener("keydown", resume, { once: true });
    window.addEventListener("scroll", resume, { once: true, passive: true });
    return () => {
      window.removeEventListener("pointerdown", resume);
      window.removeEventListener("keydown", resume);
      window.removeEventListener("scroll", resume);
    };
  }, [ensureContext]);

  const toggleMuted = useCallback(() => setMuted((m) => !m), []);

  return { muted, toggleMuted, update };
};
