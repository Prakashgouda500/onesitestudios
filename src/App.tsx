import React, { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { CapabilitiesBar } from "./components/CapabilitiesBar";
import { Services } from "./components/Services";
import { ServicesVisual3D } from "./components/ServicesVisual3D";
import { About } from "./components/About";
import { Projects } from "./components/Projects";
import { ProjectShowcase } from "./components/ProjectShowcase";
import { Process } from "./components/Process";
import { Technologies } from "./components/Technologies";
import { WhyChooseUs } from "./components/WhyChooseUs";
import { PricingPage } from "./components/PricingPage";
import { Testimonials } from "./components/Testimonials";
import { Contact } from "./components/Contact";
import { DedicatedPage } from "./components/DedicatedPage";
import { Footer } from "./components/Footer";
import { FloatingWhatsApp } from "./components/ui/FloatingWhatsApp";

type Page = "home" | "solutions" | "pricing" | "blog" | "careers" | "refer" | "contact" | "quote";

const getPageFromPath = (path: string): Page => {
  const page = path.replace(/^\//, "").split("?")[0].split("#")[0] as Page;
  return ["solutions", "pricing", "blog", "careers", "refer", "contact", "quote"].includes(page) ? page : "home";
};

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<Page>(
    getPageFromPath(window.location.pathname)
  );

  // Hook scroll progress for the top loading bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleRouteChange = () => {
      setCurrentPage(getPageFromPath(window.location.pathname));
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    window.addEventListener("popstate", handleRouteChange);
    return () => window.removeEventListener("popstate", handleRouteChange);
  }, []);

  useEffect(() => {
    // Simulate initial loading time for R3F scripts
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const navigateTo = (path: Page | string) => {
    const cleanPath = path.replace(/^\//, "");
    const pageName = cleanPath.split("?")[0].split("#")[0] as Page;
    const nextPath = pageName === "home" ? "/" : `/${cleanPath}`;
    window.history.pushState({}, "", nextPath);
    setCurrentPage(pageName);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Premium Initial Loader Overlay */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#030303] text-white">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <img
              src="/onesitestudios-logo.png"
              alt="OneSiteStudios"
              className="h-24 w-auto object-contain sm:h-32"
            />
            <div className="mt-5 h-px w-40 overflow-hidden bg-blue-950/80 sm:w-48">
              <motion.div
                className="h-full w-12 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.9)]"
                animate={{ x: ["-3rem", "12rem"] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </div>
      )}

      {!isLoading && (
        <div className="relative min-h-screen w-full bg-black text-zinc-100 selection:bg-blue-500/30 selection:text-white">
          <motion.div
            className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-gradient-to-r from-blue-500 to-indigo-500 origin-[0%] shadow-[0_0_8px_rgba(59,130,246,0.5)]"
            style={{ scaleX }}
          />

          <Navbar currentPage={currentPage} onNavigate={navigateTo} />

          {currentPage === "pricing" ? (
            <main>
              <PricingPage onNavigate={navigateTo} />
            </main>
          ) : currentPage === "quote" || currentPage === "contact" ? (
            <main>
              <Contact key={currentPage + (typeof window !== "undefined" ? window.location.search : "")} />
            </main>
          ) : currentPage === "solutions" || currentPage === "blog" || currentPage === "careers" || currentPage === "refer" ? (
            <DedicatedPage page={currentPage} onNavigate={navigateTo} />
          ) : (
            <main>
              <Hero onNavigate={navigateTo} />
              <CapabilitiesBar />
              <Services />
              <ServicesVisual3D />
              <About />
              <Projects />
              <ProjectShowcase />
              <Process />
              <Technologies />
              <WhyChooseUs />
              <Testimonials />
            </main>
          )}

          <Footer onNavigate={navigateTo} />

          <FloatingWhatsApp />
        </div>
      )}
    </>
  );
};

export default App;
