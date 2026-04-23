import { useDocumentMeta } from "@/lib/useDocumentMeta";

const stages = [
  {
    code: "01",
    name: "Sediment pre-filter",
    micron: "5 μm",
    removes: "Sand, silt, rust, particulate > 5 microns",
    efficacy: "99%",
    detail:
      "Pleated polypropylene cartridge protects every downstream stage from premature fouling. Replaced annually as part of the service contract.",
  },
  {
    code: "02",
    name: "Activated carbon block",
    micron: "0.5 μm",
    removes: "Chlorine, chloramine, disinfection by-products, VOCs, taste, odor",
    efficacy: "99%+",
    detail:
      "Coconut-shell carbon, compressed into a high-surface-area block. Critical for protecting the RO membrane from oxidation and for removing the taste utilities are required to add.",
  },
  {
    code: "03",
    name: "Reverse osmosis membrane",
    micron: "0.0001 μm",
    removes: "PFAS, lead, arsenic, fluoride, nitrate, dissolved solids",
    efficacy: "99.9%",
    detail:
      "Thin-film composite membrane. The defining stage. Permits water under pressure, rejects everything else. Independently tested against NSF/ANSI 58.",
  },
  {
    code: "04",
    name: "Deionization resin",
    micron: "Ionic",
    removes: "Residual ions, conductivity polishing",
    efficacy: "99.99%",
    detail:
      "Mixed-bed cation/anion exchange resin polishes RO output to clinical conductivity (< 1 μS/cm). Specified for medical, dental, and laboratory installations.",
  },
  {
    code: "05",
    name: "Ultra-filtration ceramic",
    micron: "0.01 μm",
    removes: "Bacteria, cysts, residual microplastics",
    efficacy: "99.99%",
    detail:
      "Hollow-fibre ceramic matrix. A second mechanical barrier between the storage tank and the tap, ensuring nothing reintroduced post-RO reaches the dispense point.",
  },
  {
    code: "06",
    name: "UV-C sterilization",
    micron: "DNA",
    removes: "Viruses, residual bacteria, biofilm",
    efficacy: "99.999%",
    detail:
      "265 nm dose denatures pathogen DNA without adding chemistry. Always-on, continuously monitored lamp life with predictive replacement alerts.",
  },
  {
    code: "07",
    name: "Remineralization",
    micron: "—",
    removes: "Restores Ca²⁺, Mg²⁺ for taste and structure",
    efficacy: "—",
    detail:
      "Pure water tastes flat. A controlled remineralization stage restores calcium and magnesium to a profile selected for the installation — neutral for residence, alkaline for hospitality, none at all for medical.",
  },
  {
    code: "08",
    name: "Smart monitoring",
    micron: "—",
    removes: "Uncertainty",
    efficacy: "Real-time",
    detail:
      "Inline TDS, flow, and pressure sensors stream to a private dashboard. Filter life is predicted, not guessed. Annual service is scheduled the moment performance trends downward.",
  },
];

const Technology = () => {
  useDocumentMeta(
    "Technology — RO, DI, UF, UV explained",
    "An eight-stage purification system: sediment, carbon, reverse osmosis, deionization, ultra-filtration, UV-C, remineralization, and continuous smart monitoring.",
  );

  return (
    <article className="bg-background">
      <header className="container mx-auto px-6 py-20 sm:px-10 sm:py-28">
        <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-primary">
          Technology
        </span>
        <h1 className="mt-4 max-w-4xl font-display text-5xl font-light leading-[1.02] text-chrome sm:text-7xl">
          Eight stages between<br />
          <span className="italic text-liquid">the utility and your glass.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
          Reverse osmosis is the headline. The other seven stages are the reason
          it works for thirty years instead of three. Each one is specified, monitored,
          and replaced on an evidence-based schedule.
        </p>
      </header>

      <section className="container mx-auto px-6 pb-32 sm:px-10">
        <ol className="space-y-4">
          {stages.map((s) => (
            <li
              key={s.code}
              className="surface-glass grid grid-cols-1 gap-6 rounded-lg p-6 sm:grid-cols-12 sm:p-8"
            >
              <div className="sm:col-span-3">
                <div className="font-mono text-xs text-primary">{s.code}</div>
                <h3 className="mt-2 font-display text-2xl font-light text-chrome">{s.name}</h3>
                <div className="mt-3 flex flex-wrap gap-2 font-mono text-[10px] uppercase tracking-[0.22em]">
                  <span className="rounded-full border border-border px-2 py-1 text-muted-foreground">
                    {s.micron}
                  </span>
                  <span className="rounded-full border border-primary/40 bg-primary/10 px-2 py-1 text-chrome">
                    {s.efficacy}
                  </span>
                </div>
              </div>
              <div className="sm:col-span-9">
                <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                  Removes
                </div>
                <div className="mt-1 text-chrome">{s.removes}</div>
                <p className="mt-4 max-w-2xl text-sm text-muted-foreground sm:text-base">
                  {s.detail}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </article>
  );
};

export default Technology;
