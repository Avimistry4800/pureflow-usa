import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import PageShell from "@/components/layout/PageShell";
import NotFound from "./pages/NotFound.tsx";

const Home = lazy(() => import("./pages/Home"));
const Technology = lazy(() => import("./pages/Technology"));
const Process = lazy(() => import("./pages/Process"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Insights = lazy(() => import("./pages/Insights"));
const InsightDetail = lazy(() => import("./pages/InsightDetail"));
const SectorHome = lazy(() => import("./pages/sectors/Home"));
const SectorOffice = lazy(() => import("./pages/sectors/Office"));
const SectorHospitality = lazy(() => import("./pages/sectors/Hospitality"));
const SectorMedical = lazy(() => import("./pages/sectors/Medical"));
const Privacy = lazy(() => import("./pages/legal/Privacy"));
const Terms = lazy(() => import("./pages/legal/Terms"));

const PageFallback = () => (
  <div className="container mx-auto px-6 py-32">
    <div className="surface-glass h-96 animate-pulse rounded-lg" />
  </div>
);

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route element={<PageShell />}>
            <Route path="/" element={<Home />} />
            <Route path="/technology" element={<Technology />} />
            <Route path="/process" element={<Process />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/insights/:slug" element={<InsightDetail />} />
            <Route path="/sectors/home" element={<SectorHome />} />
            <Route path="/sectors/office" element={<SectorOffice />} />
            <Route path="/sectors/hospitality" element={<SectorHospitality />} />
            <Route path="/sectors/medical" element={<SectorMedical />} />
            <Route path="/legal/privacy" element={<Privacy />} />
            <Route path="/legal/terms" element={<Terms />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  </TooltipProvider>
);

export default App;
