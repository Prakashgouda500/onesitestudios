import React, { useState, useEffect } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { siteData } from "../data/siteData";

type NavbarProps = {
  currentPage: "home" | "solutions" | "pricing" | "blog" | "careers" | "refer" | "contact" | "quote";
  onNavigate: (page: "home" | "solutions" | "pricing" | "blog" | "careers" | "refer" | "contact" | "quote") => void;
};

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { name: "Home", href: "home" },
    { name: "Solutions", href: "solutions" },
    { name: "Pricing", href: "pricing" },
    { name: "Blog", href: "blog" },
    { name: "Careers", href: "careers" },
    { name: "Refer & Earn", href: "refer" },
    { name: "Contact", href: "contact" },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    if (href === "home") {
      onNavigate("home");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    onNavigate(href as "home" | "solutions" | "pricing" | "blog" | "careers" | "refer" | "contact" | "quote");
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 w-full transition-all duration-300 ${
          currentPage !== "home" || isScrolled
            ? "bg-white/10 backdrop-blur-2xl border-b border-white/20 shadow-sm py-3"
            : "bg-transparent py-4"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 md:px-8">
          {/* Logo */}
          <a
            href="/"
            onClick={(e) => { e.preventDefault(); handleNavClick("home"); }}
            className="flex items-center focus:outline-none flex-shrink-0"
          >
            <img
              src="/onesitestudios-logo.png"
              alt={siteData.company.name}
              className="h-8 w-auto object-contain sm:h-10"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const isSelected = currentPage === item.href;
              return (
                <a
                  key={item.name}
                  href={item.href === "home" ? "/" : `/${item.href}`}
                  onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                  className={`relative px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 focus:outline-none ${
                    isSelected
                      ? "nav-pill-active"
                      : "text-zinc-300 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {item.name}
                </a>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <a
              href="/quote"
              onClick={(e) => { e.preventDefault(); onNavigate("quote"); }}
              className="group flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white transition-all duration-300 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/25 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Get A Quote
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          {/* Mobile: Quote + Hamburger */}
          <div className="flex items-center gap-2 md:hidden">
            <a
              href="/quote"
              onClick={(e) => { e.preventDefault(); onNavigate("quote"); }}
              className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white hover:bg-blue-500 focus:outline-none"
            >
              Quote
              <ArrowUpRight className="h-3 w-3" />
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-zinc-300 hover:bg-white/10 hover:text-white focus:outline-none"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Fullscreen Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm md:hidden"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.25 }}
              className="fixed right-0 top-0 bottom-0 z-40 w-72 bg-[#09122a]/95 backdrop-blur-2xl border-l border-white/10 shadow-2xl md:hidden flex flex-col"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
                <img src="/onesitestudios-logo.png" alt="Logo" className="h-8 w-auto" />
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-zinc-300 hover:bg-white/10 hover:text-white"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Nav Links */}
              <nav className="flex-1 overflow-y-auto px-4 py-6">
                <div className="flex flex-col gap-1">
                  {navItems.map((item, idx) => {
                    const isSelected = currentPage === item.href;
                    return (
                      <motion.a
                        key={item.name}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.04 }}
                        href={item.href === "home" ? "/" : `/${item.href}`}
                        onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                        className={`flex items-center rounded-xl px-4 py-3.5 text-sm font-semibold tracking-wide transition-all ${
                          isSelected
                            ? "bg-blue-600/20 text-blue-300 border border-blue-500/30"
                            : "text-zinc-300 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        {item.name}
                      </motion.a>
                    );
                  })}
                </div>
              </nav>

              {/* CTA at bottom */}
              <div className="px-4 pb-8 pt-4 border-t border-white/10">
                <a
                  href="/quote"
                  onClick={(e) => { e.preventDefault(); setIsOpen(false); onNavigate("quote"); }}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 text-sm font-semibold text-white hover:bg-blue-500 focus:outline-none transition-colors"
                >
                  Get A Free Quote
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
