import SectorTemplate, { type SectorContent } from "@/components/sector/SectorTemplate";

const content: SectorContent = {
  slug: "office",
  eyebrow: "Sector · Office",
  title: "Hydration without",
  italic: "the plastic procurement.",
  intro:
    "Bottle deliveries, plastic cups, and water-cooler service contracts are an operational tax on your business. Our office systems replace all of it with a single point-of-use installation that's monitored, branded, and quietly excellent.",
  problem:
    "An office of 100 staff consumes roughly 14,000 plastic bottles a year. The cost is rarely tallied honestly: storage, deliveries, returns, recycling, and the brand cost of being seen serving plastic at every meeting.",
  recommended: {
    name: "WPL Workplace · Touchless Dispenser",
    spec: [
      "High-flow RO + UV-C central unit",
      "Sensor-activated still & sparkling dispense",
      "Cup-fill and bottle-fill modes",
      "Per-unit dashboard — track consumption and CO₂ saved",
      "Optional branded surround panel",
    ],
  },
  useCases: [
    {
      title: "Reception & meeting rooms",
      body: "Premium dispense in client-facing spaces. Ceramic glassware optional — the system makes still or sparkling on demand, cold.",
    },
    {
      title: "Kitchenette refit",
      body: "Replace bottled-water deliveries entirely with a single under-counter unit and a sleek dispense tap.",
    },
    {
      title: "Multi-floor deployments",
      body: "Centralized RO with distributed dispense points on each floor, monitored from one dashboard.",
    },
  ],
  stats: [
    { v: "14,000", l: "Bottles avoided per 100 staff / yr" },
    { v: "65%", l: "Avg. cost reduction vs delivery" },
    { v: "1.2 t", l: "CO₂e saved per office / yr" },
  ],
  faq: [
    {
      q: "How does this affect our sustainability reporting?",
      a: "Each system reports liters dispensed and bottles displaced; we provide a quarterly report you can lift directly into your ESG or B-Corp filings. The CO₂ figure is calculated from a third-party LCA of single-use PET.",
    },
    {
      q: "Is it touchless?",
      a: "Yes — the standard dispenser is sensor-activated. A foot-operated mode is available for environments where sensors are impractical.",
    },
    {
      q: "Who handles service?",
      a: "We do, end-to-end. Filter replacement is scheduled from monitoring data, not a generic calendar. There is no separate service vendor.",
    },
    {
      q: "Can it be branded?",
      a: "The dispenser surround can be specified in your brand finishes; the dispense tap is offered in matte black, brushed steel, brass, and bronze.",
    },
  ],
};

const Page = () => <SectorTemplate c={content} />;
export default Page;
