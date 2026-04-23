/**
 * Smoke tests: each top-level route renders without throwing
 * and produces meaningful content. Replaces the old single-page
 * act-by-act regression now that the site is multi-page.
 */
import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

// Mock supabase client so Insights / form pages don't try to network.
vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    from: () => ({
      select: () => ({
        order: () => Promise.resolve({ data: [], error: null }),
        eq: () => ({ maybeSingle: () => Promise.resolve({ data: null, error: null }) }),
      }),
    }),
    functions: { invoke: () => Promise.resolve({ data: null, error: null }) },
  },
}));

// Mock the WebGL hero canvas and preloader (jsdom can't run WebGL).
vi.mock("@/components/hero/HeroCanvas", () => ({ default: () => null }));
vi.mock("@/components/chrome/Preloader", () => ({ default: () => null }));
vi.mock("@/components/chrome/CustomCursor", () => ({ default: () => null }));

const Home = lazy(() => import("@/pages/Home"));
const Technology = lazy(() => import("@/pages/Technology"));
const Process = lazy(() => import("@/pages/Process"));
const About = lazy(() => import("@/pages/About"));
const Contact = lazy(() => import("@/pages/Contact"));
const Insights = lazy(() => import("@/pages/Insights"));
const SectorMedical = lazy(() => import("@/pages/sectors/Medical"));

const routes: { path: string; el: React.LazyExoticComponent<React.ComponentType>; expect: RegExp }[] = [
  { path: "/", el: Home, expect: /Purity/i },
  { path: "/technology", el: Technology, expect: /Eight stages/i },
  { path: "/process", el: Process, expect: /Four weeks/i },
  { path: "/about", el: About, expect: /British workshop/i },
  { path: "/contact", el: Contact, expect: /senior engineer/i },
  { path: "/insights", el: Insights, expect: /your water/i },
  { path: "/sectors/medical", el: SectorMedical, expect: /Clinical-grade/i },
];

describe("multipage routes — smoke", () => {
  routes.forEach(({ path, el: El, expect: rx }) => {
    it(`${path} renders meaningful content`, async () => {
      const { findByText } = render(
        <MemoryRouter initialEntries={[path]}>
          <Suspense fallback={<div>loading</div>}>
            <Routes>
              <Route path={path} element={<El />} />
            </Routes>
          </Suspense>
        </MemoryRouter>,
      );
      const node = await findByText(rx);
      expect(node).toBeInTheDocument();
    });
  });
});
