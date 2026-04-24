import { useState } from "react";
import Preloader from "@/components/chrome/Preloader";
import CustomCursor from "@/components/chrome/CustomCursor";
import Hero from "@/components/hero/Hero";
import Threat from "@/components/threat/Threat";
import Solution from "@/components/solution/Solution";
import Comparison from "@/components/comparison/Comparison";
import Process from "@/components/process/Process";
import Proof from "@/components/proof/Proof";
import FinalCTA from "@/components/cta/FinalCTA";
import { useDocumentMeta } from "@/lib/useDocumentMeta";

const Home = () => {
  const [, setReady] = useState(false);
  useDocumentMeta(
    "Water Purification — engineered in the UK, calibrated for America",
    "Reverse osmosis, deionization, and UV-C purification systems for residences, offices, hospitality, and medical environments across the United States.",
  );

  return (
    <>
      <Preloader onDone={() => setReady(true)} />
      <CustomCursor />
      <Hero />
      <Threat />
      <Solution />
      <Comparison />
      <Process />
      <Proof />
      <FinalCTA />
    </>
  );
};

export default Home;
