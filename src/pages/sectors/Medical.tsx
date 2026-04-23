import SectorTemplate, { type SectorContent } from "@/components/sector/SectorTemplate";

const content: SectorContent = {
  slug: "medical",
  eyebrow: "Sector · Medical & Dentistry",
  title: "Clinical-grade water,",
  italic: "on demand.",
  intro:
    "Autoclaves, dental chairs, dialysis lines, and decontamination rooms cannot tolerate the contaminants that ordinary RO systems pass through. Our medical specification adds full deionization, UV-C sterilization, and continuous monitoring — eliminating water deliveries, demineralizer cartridges, and the variability that comes with both.",
  problem:
    "Distilled water deliveries are expensive, inconsistent, and a logistics burden. Dental unit waterlines (DUWLs) are a known biofilm reservoir; the CDC requires < 500 CFU/mL of heterotrophic bacteria and most practices struggle to maintain it without an engineered solution.",
  recommended: {
    name: "WPL Medical · RO + DI + UV-C",
    spec: [
      "RO + mixed-bed DI to < 1 μS/cm conductivity",
      "Inline UV-C for continuous DUWL protection",
      "0.2 μm sterile-grade final filter",
      "Real-time conductivity and flow telemetry",
      "Validated for autoclaves, washer-disinfectors, dental units",
    ],
  },
  useCases: [
    {
      title: "Autoclave & sterilization",
      body: "Eliminates demineralizer cartridges and the risk of incomplete deionization. Conductivity is logged for every cycle.",
    },
    {
      title: "Dental practice (DUWLs)",
      body: "Continuous UV-C suppresses biofilm. CDC and ADA-compliant DUWL water without chemical shocking or weekly cartridge swaps.",
    },
    {
      title: "Decontamination rooms & labs",
      body: "Single tapped supply for washer-disinfectors, ultrasonic baths, and lab use. No more weekly water deliveries.",
    },
  ],
  stats: [
    { v: "< 1 μS/cm", l: "Output conductivity" },
    { v: "99.999%", l: "Microbial reduction" },
    { v: "0", l: "Distilled water deliveries" },
  ],
  faq: [
    {
      q: "Is the system validated for medical use?",
      a: "The configuration is specified to meet AAMI TIR34 (water for reprocessing) and ISO 15883 (washer-disinfectors). We provide installation qualification (IQ) and operational qualification (OQ) documentation as standard.",
    },
    {
      q: "How is biofilm controlled?",
      a: "Continuous UV-C on the dispense loop, a 0.2 μm final filter at every point of use, and quarterly heterotrophic plate counts as part of the service contract.",
    },
    {
      q: "What happens if conductivity drifts?",
      a: "The dashboard alerts immediately and the system can be configured to dump to drain rather than dispense out-of-spec water. DI cartridges are pre-emptively replaced before they break through.",
    },
    {
      q: "Can it serve multiple operatories or theatres?",
      a: "Yes — a single central unit serves up to 12 chairs or 4 theatres in a typical configuration. Larger facilities are sized from a survey of peak-demand flow.",
    },
  ],
};

const Page = () => <SectorTemplate c={content} />;
export default Page;
