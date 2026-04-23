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
      <LiquidTransition />
      <Threat />
      <LiquidTransition flip />
      <Solution />
      <LiquidTransition />
      <Proof />
      <LiquidTransition flip />
      <ConsultationForm />
      <Footer />
    </main>
  );
};

export default Index;
