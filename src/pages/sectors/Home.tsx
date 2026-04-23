import SectorTemplate, { type SectorContent } from "@/components/sector/SectorTemplate";

const content: SectorContent = {
  slug: "home",
  eyebrow: "Sector · Residence",
  title: "Water for the homes",
  italic: "you'd never compromise.",
  intro:
    "From whole-home filtration to under-counter polishing taps, our residential systems are specified for kitchens that care about both purity and taste — and discreet enough that your contractor will never apologize for them.",
  problem:
    "American tap water carries the legacy of every decade since 1880 — lead solder, PFAS, chloramine, microplastics. Pitcher filters address one or two of these. A serious system addresses all of them, invisibly, for thirty years.",
  recommended: {
    name: "WPL Residence · 5-Stage RO + UV-C",
    spec: [
      "Sediment + carbon pre-filtration",
      "High-rejection RO membrane (75 GPD)",
      "UV-C sterilization on dispense line",
      "Calcium-magnesium remineralization for taste",
      "Optional boiling, chilled, and sparkling tap (3-in-1)",
    ],
  },
  useCases: [
    {
      title: "Whole-home pre-treatment",
      body: "Mains-line carbon and sediment removes chlorine and DBPs from every tap, shower, and appliance — not just the kitchen.",
    },
    {
      title: "Under-counter purification",
      body: "Dedicated polishing tap for drinking and cooking. RO + UV-C with a low-profile faucet that disappears into the worktop.",
    },
    {
      title: "Boiling, chilled, sparkling",
      body: "One designer tap, instant boiling, chilled, and sparkling water on demand. No bottles, no filters in your fridge.",
    },
  ],
  stats: [
    { v: "99.9%", l: "PFAS rejection" },
    { v: "0", l: "Plastic bottles per year" },
    { v: "30 yr", l: "System design life" },
  ],
  faq: [
    {
      q: "Will it work with my well water?",
      a: "Yes — well water is actually one of the configurations our systems handle best. The free water test identifies your specific contaminant profile (iron, sulfur, hardness, nitrate) so the system is sized correctly from the start.",
    },
    {
      q: "How much space does it need?",
      a: "The under-counter unit fits in the same cabinet as a typical reverse-osmosis system — roughly the footprint of a small filing box. Whole-home systems typically live in the basement or utility room.",
    },
    {
      q: "Does it waste a lot of water?",
      a: "Modern RO membranes recover 50–75% of feed water. Our systems include a permeate pump option that brings recovery above 65% in most installations — far above the 25% of legacy supermarket systems.",
    },
    {
      q: "What does the annual service include?",
      a: "Pre-emptive filter replacement based on your monitoring data, a full TDS and PFAS re-test, system pressure check, and a written report. Membranes are guaranteed for 3 years; the rest of the system for 5.",
    },
  ],
};

const Page = () => <SectorTemplate c={content} />;
export default Page;
