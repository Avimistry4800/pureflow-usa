/**
 * Visual regression smoke tests for every act on the landing page.
 *
 * These don't compare pixels — they assert each act renders meaningful,
 * non-empty content into the DOM. This catches the "blank section" class
 * of regressions (e.g., a transition or canvas eating an entire act, a
 * bad ref crash, or a missing default export) before deployment.
 *
 * If you intentionally remove/rename a marker, update its assertion here.
 */
import { describe, it, expect } from "vitest";
import { render, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Index from "@/pages/Index";

const renderPage = () =>
  render(
    <MemoryRouter>
      <Index />
    </MemoryRouter>,
  );

const MIN_TEXT_CHARS = 40; // an act with less than this is effectively blank

describe("landing page — act-level regression", () => {
  it("Hero act renders the wordmark headline", () => {
    const { container } = renderPage();
    expect(container.textContent).toMatch(/Purity/i);
    expect(container.textContent).toMatch(/by design/i);
    expect(container.querySelector("h1")).toBeInTheDocument();
  });

  it("Threat act renders with the invisible-threat label and substantive content", () => {
    renderPage();
    const section = document.querySelector('section[aria-label="The invisible threat"]');
    expect(section).not.toBeNull();
    const text = (section?.textContent ?? "").trim();
    expect(text.length).toBeGreaterThan(MIN_TEXT_CHARS);
    expect(within(section as HTMLElement).getByRole("heading", { level: 2 })).toBeInTheDocument();
  });

  it("Solution act renders with the system label and substantive content", () => {
    renderPage();
    const section = document.querySelector('section[aria-label="The system"]');
    expect(section).not.toBeNull();
    const text = (section?.textContent ?? "").trim();
    expect(text.length).toBeGreaterThan(MIN_TEXT_CHARS);
    expect(within(section as HTMLElement).getByRole("heading", { level: 2 })).toBeInTheDocument();
  });

  it("Proof act renders at #proof with substantive content", () => {
    renderPage();
    const section = document.querySelector("#proof");
    expect(section).not.toBeNull();
    const text = (section?.textContent ?? "").trim();
    expect(text.length).toBeGreaterThan(MIN_TEXT_CHARS);
    expect(within(section as HTMLElement).getByRole("heading", { level: 2 })).toBeInTheDocument();
  });

  it("Consultation form act renders at #consult with form fields", () => {
    renderPage();
    const section = document.querySelector("#consult");
    expect(section).not.toBeNull();
    const scope = within(section as HTMLElement);
    expect(scope.getByRole("heading", { level: 2 })).toBeInTheDocument();
    // a real form means real inputs
    expect((section as HTMLElement).querySelectorAll("input, textarea, select").length).toBeGreaterThan(0);
    expect(scope.getByRole("button")).toBeInTheDocument();
  });

  it("renders all five acts in document order", () => {
    renderPage();
    const acts = [
      document.querySelector("h1"), // hero
      document.querySelector('section[aria-label="The invisible threat"]'),
      document.querySelector('section[aria-label="The system"]'),
      document.querySelector("#proof"),
      document.querySelector("#consult"),
    ];
    acts.forEach((node, i) => {
      expect(node, `act #${i + 1} is missing from the page`).not.toBeNull();
    });
    // verify document order
    for (let i = 1; i < acts.length; i++) {
      const prev = acts[i - 1] as Node;
      const curr = acts[i] as Node;
      // bitmask 4 == DOCUMENT_POSITION_FOLLOWING
      expect(prev.compareDocumentPosition(curr) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    }
  });

  it("LiquidTransition wipes do not swallow surrounding act content", () => {
    // Each transition is pointer-events:none chrome; sections must remain in the
    // accessibility tree directly after the transitions render.
    renderPage();
    const sections = document.querySelectorAll("section, #proof, #consult");
    expect(sections.length).toBeGreaterThanOrEqual(5);
  });
});
