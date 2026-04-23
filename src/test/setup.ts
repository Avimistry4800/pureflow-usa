import "@testing-library/jest-dom";
import { vi } from "vitest";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});

// IntersectionObserver — used by scroll-driven acts
class IO {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}
// @ts-expect-error test shim
window.IntersectionObserver = IO;
// @ts-expect-error test shim
global.IntersectionObserver = IO;

// ResizeObserver shim
class RO {
  observe() {}
  unobserve() {}
  disconnect() {}
}
(window as unknown as { ResizeObserver: typeof RO }).ResizeObserver = RO;
(globalThis as unknown as { ResizeObserver: typeof RO }).ResizeObserver = RO;

// scrollTo no-op
window.scrollTo = vi.fn() as unknown as typeof window.scrollTo;

// Mock the WebGL hero canvas — Three.js + jsdom is heavy and unrelated to layout regressions
vi.mock("@/components/hero/HeroCanvas", () => ({
  default: () => null,
}));

// Mock the Supabase client used by the consultation form
vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    functions: {
      invoke: vi.fn().mockResolvedValue({ data: { ok: true }, error: null }),
    },
  },
}));
