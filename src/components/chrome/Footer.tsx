const Footer = () => (
  <footer className="relative border-t border-border bg-surface py-16">
    <div className="container mx-auto grid grid-cols-1 gap-10 px-6 md:grid-cols-12">
      <div className="md:col-span-5">
        <div className="flex items-center gap-2.5">
          <span className="relative inline-flex h-7 w-7 items-center justify-center rounded-full border border-primary/40">
            <span className="absolute inset-1 rounded-full bg-gradient-liquid opacity-80 blur-[2px]" />
            <span className="relative h-1.5 w-1.5 rounded-full bg-chrome" />
          </span>
          <span className="font-display text-sm font-semibold tracking-tight text-chrome">
            Water Purification Limited
          </span>
        </div>
        <p className="mt-4 max-w-sm text-sm text-muted-foreground">
          Engineered in the United Kingdom. Calibrated for the American home.
        </p>
        <div className="mt-6 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-dot" />
          Systems online · 99.98% uptime
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 md:col-span-7 md:grid-cols-3">
        <FooterCol
          title="Product"
          items={["Reverse Osmosis", "Deionization", "UV Sterilization", "Smart Monitoring"]}
        />
        <FooterCol
          title="Sectors"
          items={["Residence", "Medical", "Hospitality", "Office"]}
        />
        <FooterCol
          title="Company"
          items={["Heritage", "Engineering", "Press", "Contact"]}
        />
      </div>
    </div>

    <div className="container mx-auto mt-12 flex flex-col items-start justify-between gap-3 border-t border-border px-6 pt-6 font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground sm:flex-row sm:items-center">
      <span>© {new Date().getFullYear()} Water Purification Limited</span>
      <div className="flex items-center gap-6">
        <span>LDN 51.5°N · NYC 40.7°N</span>
        <a href="#" className="hover:text-chrome">Privacy</a>
        <a href="#" className="hover:text-chrome">Terms</a>
      </div>
    </div>
  </footer>
);

const FooterCol = ({ title, items }: { title: string; items: string[] }) => (
  <div>
    <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-primary">{title}</span>
    <ul className="mt-4 space-y-2.5 text-sm">
      {items.map((i) => (
        <li key={i}>
          <a href="#" className="text-muted-foreground transition-colors hover:text-chrome">{i}</a>
        </li>
      ))}
    </ul>
  </div>
);

export default Footer;
