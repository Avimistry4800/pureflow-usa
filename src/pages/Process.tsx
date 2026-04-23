import { Link } from "react-router-dom";
import { useDocumentMeta } from "@/lib/useDocumentMeta";

const steps = [
  {
    n: "01",
    title: "Free water test",
    body: "We send a certified test kit, or visit on-site for properties over 5,000 sq ft. Panel covers TDS, pH, hardness, chlorine, lead, copper, nitrate, and a PFAS screen.",
    eta: "Week 1",
  },
  {
    n: "02",
    title: "Site survey",
    body: "Plumber-led survey of supply pressure, available space, dispense points, drain access, and any existing softener or filtration. Photographed and documented.",
    eta: "Week 2",
  },
  {
    n: "03",
    title: "Custom system design",
    body: "Senior engineer specifies the configuration: flow rate, membrane count, DI inclusion, remineralization profile, dispense hardware, and monitoring scope.",
    eta: "Week 2–3",
  },
  {
    n: "04",
    title: "White-glove installation",
    body: "One-day install by a two-person crew. Floor protection, post-install commissioning, post-RO lab test, and a walk-through of the dashboard and service schedule.",
    eta: "Week 4",
  },
  {
    n: "05",
    title: "Annual service · 5-year warranty",
    body: "Pre-emptive filter replacement based on monitoring data, annual lab re-test, and a 5-year manufacturer warranty on the core system. Membranes guaranteed for 3 years.",
    eta: "Year 1+",
  },
];

const Process = () => {
  useDocumentMeta(
    "Process — from water test to white-glove install",
    "A five-step process: certified water test, site survey, custom system design, white-glove installation, and an annual service contract with a 5-year warranty.",
  );

  return (
    <article className="bg-background">
      <header className="container mx-auto px-6 py-20 sm:px-10 sm:py-28">
        <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-primary">
          The process
        </span>
        <h1 className="mt-4 max-w-3xl font-display text-5xl font-light leading-[1.02] text-chrome sm:text-7xl">
          Four weeks from<br />
          <span className="italic text-liquid">enquiry to first pour.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
          We do not sell from a catalog. Every system is specified after we
          measure your water, your space, and your priorities. Here is what
          happens between the first email and the first glass.
        </p>
      </header>

      <section className="container mx-auto px-6 pb-32 sm:px-10">
        <ol className="relative space-y-6 border-l border-border pl-6 sm:pl-10">
          {steps.map((s) => (
            <li key={s.n} className="relative">
              <span className="absolute -left-[33px] top-2 h-3 w-3 rounded-full border border-primary bg-background sm:-left-[45px]" />
              <div className="surface-glass rounded-lg p-6 sm:p-8">
                <div className="flex items-baseline justify-between font-mono text-[10px] uppercase tracking-[0.28em]">
                  <span className="text-primary">{s.n}</span>
                  <span className="text-muted-foreground">{s.eta}</span>
                </div>
                <h3 className="mt-3 font-display text-2xl font-light text-chrome sm:text-3xl">
                  {s.title}
                </h3>
                <p className="mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
                  {s.body}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-16 text-center">
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 rounded-full bg-chrome px-8 py-4 font-mono text-[11px] uppercase tracking-[0.28em] text-background shadow-glow"
          >
            Start with a water test
            <span className="h-1 w-1 rounded-full bg-background" />
          </Link>
        </div>
      </section>
    </article>
  );
};

export default Process;
