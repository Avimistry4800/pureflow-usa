import { useDocumentMeta } from "@/lib/useDocumentMeta";
import { Link } from "react-router-dom";

const About = () => {
  useDocumentMeta(
    "About — three decades of British water engineering",
    "Founded in London in 1992, Water Purification Limited builds bespoke reverse-osmosis systems for residences, offices, hospitality, and medical environments. Now expanding across the United States.",
  );

  return (
    <article className="bg-background">
      <header className="container mx-auto px-6 py-20 sm:px-10 sm:py-28">
        <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-primary">
          About
        </span>
        <h1 className="mt-4 max-w-3xl font-display text-5xl font-light leading-[1.02] text-chrome sm:text-7xl">
          A British workshop,<br />
          <span className="italic text-liquid">an American mission.</span>
        </h1>
      </header>

      <section className="container mx-auto grid grid-cols-1 gap-12 px-6 pb-24 md:grid-cols-12 sm:px-10">
        <div className="md:col-span-5">
          <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-primary">
            Heritage
          </span>
        </div>
        <div className="md:col-span-7 space-y-6 text-base text-muted-foreground sm:text-lg">
          <p>
            Founded in London in 1992, Water Purification Limited began as a
            two-person workshop building bespoke reverse-osmosis systems for
            high-end Knightsbridge kitchens. Three decades later, every system
            is still designed by an engineer rather than a salesperson.
          </p>
          <p>
            We chose the United States as our second market for the same reason
            we chose London first: the water is more complicated than it looks,
            the infrastructure is older than its reputation, and the people who
            care most are the hardest to satisfy.
          </p>
        </div>
      </section>

      <section className="bg-surface/50 py-24">
        <div className="container mx-auto grid grid-cols-1 gap-10 px-6 md:grid-cols-3 sm:px-10">
          {[
            { v: "1992", l: "Founded · London" },
            { v: "2024", l: "US operations · NYC" },
            { v: "5 yr", l: "Full system warranty" },
          ].map((s) => (
            <div key={s.l} className="surface-glass rounded-lg px-6 py-8">
              <div className="font-display text-5xl font-light text-chrome">{s.v}</div>
              <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto grid grid-cols-1 gap-12 px-6 py-24 md:grid-cols-12 sm:px-10">
        <div className="md:col-span-5">
          <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-primary">
            Standards
          </span>
          <h2 className="mt-4 font-display text-3xl font-light text-chrome sm:text-4xl">
            Tested, then re-tested.
          </h2>
        </div>
        <ul className="md:col-span-7 space-y-4 text-base text-muted-foreground sm:text-lg">
          <li className="flex gap-4">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            Membranes specified against NSF/ANSI 58 (RO performance) and 53 (health-related contaminants).
          </li>
          <li className="flex gap-4">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            Components compliant with NSF/ANSI 401 (emerging contaminants).
          </li>
          <li className="flex gap-4">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            Independent post-install lab test included with every system.
          </li>
          <li className="flex gap-4">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            Manufacturing in the United Kingdom under ISO 9001 quality management.
          </li>
        </ul>
      </section>

      <section className="container mx-auto px-6 pb-32 text-center sm:px-10">
        <h2 className="mx-auto max-w-3xl font-display text-3xl font-light text-chrome sm:text-5xl">
          The shortest path to your <span className="italic text-liquid">cleanest water</span> begins with a conversation.
        </h2>
        <Link
          to="/contact"
          className="mt-10 inline-flex items-center gap-3 rounded-full bg-chrome px-8 py-4 font-mono text-[11px] uppercase tracking-[0.28em] text-background shadow-glow"
        >
          Speak with an engineer
          <span className="h-1 w-1 rounded-full bg-background" />
        </Link>
      </section>
    </article>
  );
};

export default About;
