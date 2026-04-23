import { Outlet, useLocation } from "react-router-dom";
import Nav from "@/components/chrome/Nav";
import Footer from "@/components/chrome/Footer";
import Breadcrumb from "./Breadcrumb";
import ScrollToTop from "./ScrollToTop";

const PageShell = () => {
  const { pathname, key } = useLocation();
  const isHome = pathname === "/";
  return (
    <>
      <ScrollToTop />
      <Nav />
      <main className="relative min-h-screen">
        {!isHome && <Breadcrumb />}
        <div key={key} className="animate-[fadeRise_0.45s_var(--ease-fluid)_both]">
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default PageShell;
