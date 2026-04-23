import { useState } from "react";
import Preloader from "@/components/chrome/Preloader";
import CustomCursor from "@/components/chrome/CustomCursor";
import Hero from "@/components/hero/Hero";
import Threat from "@/components/threat/Threat";
import Solution from "@/components/solution/Solution";
import Proof from "@/components/proof/Proof";
import { useDocumentMeta } from "@/lib/useDocumentMeta";

const sectorTeasers = [
  { to: "/sectors/home", title: "Residence", body: "Whole-home and under-counter systems for the most demanding kitchens." },
  { to: "/sectors/office", title: "Office", body: "Workforce hydration without the plastic, the bottles, or the deliveries." },
  { to: "/sectors/hospitality", title: "Hospitality", body: "Still and sparkling, on tap. Calibrated for chefs and sommeliers." },
  { to: "/sectors/medical", title: "Medical", body: "Clinical-grade water for autoclaves, dental chairs, and decon rooms." },
];

const insightsTeasers = [
  { slug: "pfas-forever-chemicals-us-tap-water", tag: "Health", title: "PFAS in US tap water: what the new EPA limits actually mean" },
  { slug: "lead-in-american-schools", tag: "Health", title: "Lead in American schools: an infrastructure crisis hiding in plain sight" },
  { slug: "microplastics-bottled-water-study", tag: "Industry", title: "A liter of bottled water contains 240,000 plastic fragments" },
];

const Home = () => {
  const [, setReady] = useState(false);
  useDocumentMeta(
    "Water Purification — engineered in the UK, calibrated for America",
    "Reverse osmosis, deionization, and UV-C purification systems for residences, offices, hospitality, and medical environments across the United States.",
  );

  return (
    <>
      <Preloader onDone={() => setReady(true)} />
      <CustomCursor />
      <Hero />

      {/* Threat teaser */}
      <section className="relative bg-background py-32 sm:py-40">
        <div className="absolute inset-0 grid-noise opacity-30" />
        <div className="container relative mx-auto grid grid-cols-1 gap-12 px-6 md:grid-cols-12 sm:px-10">
          <div className="md:col-span-5">
            <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-primary">
              The invisible threat
            </span>
            <h2 className="mt-4 font-display text-4xl font-light leading-[1.05] text-chrome sm:text-6xl">
              You can't see it.
              <br />
              <span className="italic text-liquid">It's still there.</span>
            </h2>
          </div>
          <div className="md:col-span-7">
            <p className="text-base text-muted-foreground sm:text-lg">
              PFAS in 99% of US water sources. Lead in half of school districts.
              240,000 plastic fragments in a single liter of bottled water. The
              utility report you got last year does not describe the water that
              came out of your tap this morning.
            </p>
            <div className="mt-10 grid grid-cols-3 gap-4">
              {[
                { v: "99%", l: "Sources with PFAS" },
                { v: "50%+", l: "Utility violations 2024" },
                { v: "0", l: "Safe lead level" },
              ].map((s) => (
                <div key={s.l} className="surface-glass rounded-lg px-5 py-6">
                  <div className="font-display text-3xl font-light text-chrome sm:text-4xl">{s.v}</div>
                  <div className="mt-2 font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground">
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
            <Link
              to="/insights"
              className="mt-10 inline-block font-mono text-[10px] uppercase tracking-[0.28em] text-primary underline-offset-4 hover:underline"
            >
              Read the research →
            </Link>
          </div>
        </div>
      </section>

      {/* Solution teaser */}
      <section className="bg-surface/50 py-32 sm:py-40">
        <div className="container mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
            <div className="md:col-span-5">
              <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-primary">
                The system
              </span>
              <h2 className="mt-4 font-display text-4xl font-light leading-[1.05] text-chrome sm:text-6xl">
                Five stages.<br />
                <span className="italic text-liquid">One source of truth.</span>
              </h2>
              <p className="mt-6 max-w-md text-base text-muted-foreground sm:text-lg">
                Sediment, carbon, reverse osmosis, deionization, UV-C — engineered as
                one system, monitored continuously, serviced annually.
              </p>
              <Link
                to="/technology"
                className="mt-8 inline-flex items-center gap-3 rounded-full bg-chrome px-7 py-3.5 font-mono text-[11px] uppercase tracking-[0.28em] text-background transition-shadow hover:shadow-glow"
              >
                Inspect the technology
                <span className="h-1 w-1 rounded-full bg-background" />
              </Link>
            </div>
            <ol className="md:col-span-7 space-y-3">
              {[
                ["01", "Sediment & carbon pre-filter", "Removes chlorine, DBPs, sediment > 5μm"],
                ["02", "Reverse osmosis membrane", "Rejects 99%+ of dissolved solids and PFAS"],
                ["03", "Deionization polishing", "Clinical conductivity for medical use"],
                ["04", "UV-C sterilization", "265nm denatures viral DNA"],
                ["05", "Remineralization", "Restores calcium and magnesium for taste"],
              ].map(([n, t, d]) => (
                <li key={n} className="surface-glass flex items-start gap-5 rounded-lg p-5">
                  <span className="font-mono text-xs text-primary">{n}</span>
                  <div>
                    <div className="font-display text-lg text-chrome">{t}</div>
                    <div className="mt-1 text-sm text-muted-foreground">{d}</div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Sectors */}
      <section className="bg-background py-32 sm:py-40">
        <div className="container mx-auto px-6 sm:px-10">
          <div className="flex items-end justify-between">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-primary">
                Where we work
              </span>
              <h2 className="mt-4 font-display text-4xl font-light leading-[1.05] text-chrome sm:text-5xl">
                Four sectors.<br />
                <span className="italic text-liquid">One discipline.</span>
              </h2>
            </div>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {sectorTeasers.map((s) => (
              <Link
                key={s.to}
                to={s.to}
                className="surface-glass group flex flex-col rounded-lg p-6 transition-all hover:-translate-y-1 hover:shadow-glow"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-primary">
                  {s.title}
                </span>
                <p className="mt-4 text-sm text-muted-foreground sm:text-base">{s.body}</p>
                <span className="mt-auto pt-8 font-mono text-[10px] uppercase tracking-[0.24em] text-chrome">
                  Explore →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Heritage */}
      <section className="bg-surface/50 py-32 sm:py-40">
        <div className="container mx-auto grid grid-cols-1 gap-12 px-6 md:grid-cols-12 sm:px-10">
          <div className="md:col-span-5">
            <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-primary">
              Heritage
            </span>
            <h2 className="mt-4 font-display text-4xl font-light leading-[1.05] text-chrome sm:text-5xl">
              From a London<br />
              workshop to <span className="italic text-liquid">your tap.</span>
            </h2>
          </div>
          <div className="md:col-span-7">
            <p className="text-base text-muted-foreground sm:text-lg">
              Three decades of British engineering, family-owned and obsessively
              calibrated. Now serving the United States with the same discipline
              that earned us the trust of London's most demanding kitchens, clinics,
              and hotels.
            </p>
            <Link
              to="/about"
              className="mt-8 inline-block font-mono text-[10px] uppercase tracking-[0.28em] text-primary underline-offset-4 hover:underline"
            >
              About the company →
            </Link>
          </div>
        </div>
      </section>

      {/* Insights teaser */}
      <section className="bg-background py-32 sm:py-40">
        <div className="container mx-auto px-6 sm:px-10">
          <div className="flex items-end justify-between">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-primary">
                Insights
              </span>
              <h2 className="mt-4 font-display text-4xl font-light leading-[1.05] text-chrome sm:text-5xl">
                The water you<br />
                <span className="italic text-liquid">should know about.</span>
              </h2>
            </div>
            <Link
              to="/insights"
              className="hidden font-mono text-[10px] uppercase tracking-[0.28em] text-primary underline-offset-4 hover:underline sm:inline-block"
            >
              All articles →
            </Link>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
            {insightsTeasers.map((a) => (
              <Link
                key={a.slug}
                to={`/insights/${a.slug}`}
                className="surface-glass flex flex-col rounded-lg p-6 transition-all hover:-translate-y-1 hover:shadow-glow"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-primary">
                  {a.tag}
                </span>
                <h3 className="mt-4 font-display text-xl font-light text-chrome">
                  {a.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative bg-background py-24 sm:py-32">
        <div className="absolute inset-0 bg-gradient-caustic" />
        <div className="container relative mx-auto px-6 text-center sm:px-10">
          <h2 className="mx-auto max-w-3xl font-display text-4xl font-light leading-[1.05] text-chrome sm:text-6xl">
            The water in your home <span className="italic text-liquid">deserves an engineer.</span>
          </h2>
          <Link
            to="/contact"
            className="mt-10 inline-flex items-center gap-3 rounded-full bg-chrome px-8 py-4 font-mono text-[11px] uppercase tracking-[0.28em] text-background shadow-glow"
          >
            Book a consultation
            <span className="h-1 w-1 rounded-full bg-background" />
          </Link>
        </div>
      </section>
    </>
  );
};

export default Home;
