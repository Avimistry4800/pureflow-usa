import { useState } from "react";
import Preloader from "@/components/chrome/Preloader";
import CustomCursor from "@/components/chrome/CustomCursor";
import Nav from "@/components/chrome/Nav";
import Hero from "@/components/hero/Hero";
import Threat from "@/components/threat/Threat";
import Solution from "@/components/solution/Solution";
import Proof from "@/components/proof/Proof";
import ConsultationForm from "@/components/form/ConsultationForm";
import Footer from "@/components/chrome/Footer";
import LiquidTransition from "@/components/chrome/LiquidTransition";

const Index = () => {
  const [, setReady] = useState(false);

  return (
    <main className="relative">
      <Preloader onDone={() => setReady(true)} />
      <CustomCursor />
      <Nav />
      <Hero />
      <LiquidTransition label="Act 02 — The Threat" />
      <Threat />
      <LiquidTransition label="Act 03 — The Reveal" flip />
      <Solution />
      <LiquidTransition label="Act 04 — Proof" />
      <Proof />
      <LiquidTransition label="Act 05 — Begin" flip />
      <ConsultationForm />
      <Footer />
    </main>
  );
};

export default Index;
