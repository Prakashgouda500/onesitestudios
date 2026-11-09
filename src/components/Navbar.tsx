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
  const [activeSection, setActiveSection] = useState("home");

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
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      setActiveSection(currentPage);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
            ? "bg-[#030303]/75 backdrop-blur-md border-b border-white/5 py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-8">
          {/* Logo */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("home");
            }}
            className="flex items-center focus:outline-none"
          >
            <img
              src="/onesitestudios-logo.png"
              alt={siteData.company.name}
              className="h-10 w-auto object-contain"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.name}
                  href={item.href === "home" ? "/" : `/${item.href}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className={`relative text-sm font-medium tracking-wide transition-colors duration-200 hover:text-white focus:outline-none ${
                    currentPage === item.href ? "text-white" : isActive ? "text-white" : "text-zinc-400"
                  }`}
                >
                  {item.name}
                  {(currentPage === item.href || isActive) && (
                    <motion.span
                      layoutId="activeNav"
                      className="absolute -bottom-1.5 left-0 h-0.5 w-full bg-blue-500"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <a
              href="/quote"
              onClick={(e) => {
                e.preventDefault();
                onNavigate("quote");
              }}
              className="group flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/25 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Get A Quote
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-center rounded-md p-2 text-zinc-400 hover:text-white focus:outline-none md:hidden"
            aria-label="Toggle mobile menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[72px] z-30 border-b border-white/5 bg-[#030303] px-6 py-8 shadow-xl md:hidden"
          >
            <nav className="flex flex-col gap-5">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.substring(1);
                return (
                  <a
                    key={item.name}
                    href={item.href === "home" ? "/" : `/${item.href}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                    className={`text-lg font-medium tracking-wide transition-colors ${
                      isActive ? "text-blue-500" : "text-zinc-400"
                    }`}
                  >
                    {item.name}
                  </a>
                );
              })}
              <a
                href="/quote"
                onClick={(e) => {
                  e.preventDefault();
                  setIsOpen(false);
                  onNavigate("quote");
                }}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-3 text-sm font-semibold text-white hover:bg-blue-500 focus:outline-none"
              >
                Get A Quote
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
