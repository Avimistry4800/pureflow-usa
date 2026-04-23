import SectorTemplate, { type SectorContent } from "@/components/sector/SectorTemplate";

const content: SectorContent = {
  slug: "hospitality",
  eyebrow: "Sector · Hospitality",
  title: "Water that earns",
  italic: "its place on the menu.",
  intro:
    "For restaurants, hotels, and bars, water is no longer a free pour — it's a line item, a sustainability statement, and increasingly, a tasting note. Our hospitality systems deliver still and sparkling on tap with the consistency a chef can build a menu around.",
  problem:
    "Premium bottled-water programs cost the average fine-dining venue $40,000 a year and produce a tonne of glass waste. Guest sentiment toward single-use water has shifted decisively: 71% of US diners now prefer filtered tap when offered.",
  recommended: {
    name: "WPL Hospitality · Still & Sparkling System",
    spec: [
      "High-flow RO + carbon polish (no DI — preserves taste)",
      "On-demand carbonation up to 9 g/L CO₂",
      "Glass-fill rate 4 L/min",
      "Branded glass-bottle dispense option for table service",
      "Refrigerated dispense at 4 °C",
    ],
  },
  useCases: [
    {
      title: "Front-of-house service",
      body: "Branded glass bottles refilled in seconds at the pass. Replace your bottled-water line entirely, with a controlled per-cover cost.",
    },
    {
      title: "Bar program",
      body: "Cocktail-grade water with no chlorine taint, no chloramine off-notes. Critical for low-ABV builds, ice programs, and clarified drinks.",
    },
    {
      title: "Hotel suites",
      body: "In-room dispense or refillable carafes service. A premium guest amenity that eliminates plastic without eliminating choice.",
    },
  ],
  stats: [
    { v: "$40k", l: "Avg. annual bottled-water cost saved" },
    { v: "71%", l: "Diners preferring filtered tap" },
    { v: "1 t", l: "Glass waste avoided / venue / yr" },
  ],
  faq: [
    {
      q: "Will it match the taste of a known mineral water?",
      a: "Within reason, yes. We can profile the remineralization stage to a target TDS and mineral ratio — a flat European still, a higher-mineral mountain profile, etc. The match is calibrated against a sample of your reference water.",
    },
    {
      q: "Health-department compliance?",
      a: "Yes — the system meets local plumbing and food-safety codes in all 50 states. We provide the documentation your inspector will ask for.",
    },
    {
      q: "What's the per-cover cost?",
      a: "Typically under $0.06 per cover including service and consumables — versus $1.50–$4 for premium bottled water.",
    },
    {
      q: "Can we keep a bottled-water option?",
      a: "Of course. Most of our hospitality clients run a small premium bottled list alongside the house filtered offering. The decision is the guest's, but the default has changed.",
    },
  ],
};

const Page = () => <SectorTemplate c={content} />;
export default Page;
