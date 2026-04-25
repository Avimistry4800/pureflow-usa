import { Link } from "react-router-dom";

const partners = ["QUOOKER", "BLUE WATER", "MAYO CLINIC", "FOUR SEASONS", "RH", "GOLDMAN"];

const sectorLinks = [
  { label: "residences in Aspen", to: "/sectors/home" },
  { label: "dental clinics in Boston", to: "/sectors/medical" },
  { label: "hotels in Miami", to: "/sectors/hospitality" },
  { label: "offices in Manhattan", to: "/sectors/office" },
];

const Proof = () => (
  <section id="proof" className="relative bg-background py-32 sm:py-40">
    <div className="absolute inset-0 grid-noise opacity-40" />
    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

    <div className="container relative mx-auto px-6">
      {/* Heritage strip */}
      <div className="mb-20 grid grid-cols-1 gap-10 md:grid-cols-12">
        <div className="md:col-span-5">
          <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-primary">
            Act 05 — Heritage
          </span>
          <h2 className="mt-4 font-display text-4xl font-light leading-[1.05] text-chrome sm:text-6xl">
            From a London<br />
            workshop to <span className="italic text-liquid">your tap.</span>
          </h2>
        </div>
        <div className="md:col-span-6 md:col-start-7">
          <p className="text-base text-muted-foreground sm:text-lg">
            Three decades of British engineering, family-owned and obsessively
            calibrated. Now serving the United States with the same discipline
            that earned us the trust of London's most demanding kitchens, clinics
            and hotels.
          </p>

          {/* UK → USA arc */}
          <div className="mt-10 flex items-center gap-6">
            <div className="flex flex-col items-center gap-2">
              <span className="h-3 w-3 rounded-full border border-primary bg-primary/30" />
              <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-chrome">London</span>
              <span className="font-mono text-[9px] tracking-widest text-muted-foreground">51.5°N</span>
            </div>
            <div className="relative h-px flex-1 bg-border">
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary" />
              <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-chrome shadow-glow" />
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="h-3 w-3 rounded-full border border-accent bg-accent/30" />
              <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-chrome">New York</span>
              <span className="font-mono text-[9px] tracking-widest text-muted-foreground">40.7°N</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stat band */}
      <div className="mb-20 grid grid-cols-2 gap-px overflow-hidden rounded border border-border bg-border md:grid-cols-4">
        {[
          { v: "33", l: "Years of engineering" },
          { v: "99.9%", l: "Contaminant rejection" },
          { v: "0.0001μm", l: "RO membrane pore size" },
          { v: "7.7B", l: "Bottles eliminated / yr" },
        ].map((s, i) => (
          <div key={i} className="bg-background p-6 sm:p-8">
            <div className="font-display text-3xl font-light text-chrome sm:text-4xl">{s.v}</div>
            <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">{s.l}</div>
          </div>
        ))}
      </div>

      {/* Sectors */}
      <div className="mb-20 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {sectors.map((s) => (
          <div key={s.id} className="surface-glass group relative overflow-hidden rounded-lg p-6 transition-all hover:border-primary/60">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-primary">{s.id}</span>
              <span className="h-1 w-1 rounded-full bg-primary opacity-50 group-hover:opacity-100" />
            </div>
            <h3 className="mt-6 font-display text-xl font-light text-chrome">{s.name}</h3>
            <p className="mt-3 text-sm text-muted-foreground">{s.desc}</p>
            <div className="mt-6 h-px w-full bg-gradient-to-r from-primary/0 via-primary/40 to-primary/0 opacity-0 transition-opacity group-hover:opacity-100" />
          </div>
        ))}
      </div>

      {/* Testimonial */}
      <figure className="mx-auto max-w-3xl text-center">
        <blockquote className="font-display text-2xl font-light leading-snug text-chrome sm:text-4xl">
          "It's not a filter. It's <span className="italic text-liquid">infrastructure</span>—the
          kind you stop noticing because it never fails."
        </blockquote>
        <figcaption className="mt-6 font-mono text-[10px] uppercase tracking-[0.32em] text-muted-foreground">
          Dr. M. Halsten · Director, Mayfair Dental Group
        </figcaption>
      </figure>

      {/* Partner ticker */}
      <div className="mt-20 overflow-hidden border-y border-border py-6">
        <div className="flex animate-[float_8s_ease-in-out_infinite] flex-wrap items-center justify-center gap-x-12 gap-y-4">
          {partners.map((p) => (
            <span key={p} className="font-mono text-xs uppercase tracking-[0.32em] text-muted-foreground/70">
              {p}
            </span>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Proof;
