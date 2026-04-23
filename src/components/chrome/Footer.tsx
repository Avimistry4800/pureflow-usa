import { Link } from "react-router-dom";
import NewsletterInline from "@/components/forms/NewsletterInline";

const Footer = () => (
  <footer className="relative border-t border-border bg-surface py-16">
    <div className="container mx-auto grid grid-cols-1 gap-10 px-6 md:grid-cols-12">
      <div className="md:col-span-4">
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
        <div className="mt-8">
          <span className="block font-mono text-[10px] uppercase tracking-[0.32em] text-primary">
            Pure dispatches
          </span>
          <p className="mt-2 max-w-xs text-xs text-muted-foreground">
            Quarterly updates on regulation, research, and product releases. No spam.
          </p>
          <div className="mt-4">
            <NewsletterInline source="footer" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 md:col-span-8 md:grid-cols-4">
        <FooterCol
          title="Sectors"
          items={[
            { label: "Residence", to: "/sectors/home" },
            { label: "Office", to: "/sectors/office" },
            { label: "Hospitality", to: "/sectors/hospitality" },
            { label: "Medical", to: "/sectors/medical" },
          ]}
        />
        <FooterCol
          title="Resources"
          items={[
            { label: "Technology", to: "/technology" },
            { label: "Process", to: "/process" },
            { label: "Insights", to: "/insights" },
          ]}
        />
        <FooterCol
          title="Company"
          items={[
            { label: "About", to: "/about" },
            { label: "Contact", to: "/contact" },
          ]}
        />
        <FooterCol
          title="Legal"
          items={[
            { label: "Privacy", to: "/legal/privacy" },
            { label: "Terms", to: "/legal/terms" },
          ]}
        />
      </div>
    </div>

    <div className="container mx-auto mt-12 flex flex-col items-start justify-between gap-3 border-t border-border px-6 pt-6 font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground sm:flex-row sm:items-center">
      <span>© {new Date().getFullYear()} Water Purification Limited</span>
      <span>LDN 51.5°N · NYC 40.7°N</span>
    </div>
  </footer>
);

const FooterCol = ({
  title,
  items,
}: {
  title: string;
  items: { label: string; to: string }[];
}) => (
  <div>
    <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-primary">{title}</span>
    <ul className="mt-4 space-y-2.5 text-sm">
      {items.map((i) => (
        <li key={i.to}>
          <Link to={i.to} className="text-muted-foreground transition-colors hover:text-chrome">
            {i.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default Footer;
