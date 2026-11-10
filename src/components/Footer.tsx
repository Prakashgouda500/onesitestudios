import React, { useEffect, useRef, useState } from "react";
import { ArrowUp, ArrowUpRight, Phone, X } from "lucide-react";
import { siteData } from "../data/siteData";

type FooterProps = {
  onNavigate: (page: "home" | "solutions" | "pricing" | "blog" | "careers" | "refer" | "contact" | "quote") => void;
};

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { name } = siteData.company;
  const { email, phone, phoneUrl, whatsappDefaultMessage } = siteData.contact;
  const { linkedin, twitter, instagram } = siteData.socials;
  const [showScrollBar, setShowScrollBar] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const previousScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingUp = currentScrollY < previousScrollY.current;
      if (isScrollingUp && currentScrollY > 80) {
        setShowScrollBar(true);
        setIsDismissed(false);
      } else if (currentScrollY > previousScrollY.current || currentScrollY <= 80) {
        setShowScrollBar(false);
      }
      previousScrollY.current = currentScrollY;
    };
    previousScrollY.current = window.scrollY;
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (page: "home" | "solutions" | "pricing" | "blog" | "careers" | "refer" | "contact" | "quote") => {
    onNavigate(page);
    if (page === "home") setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 50);
  };

  const navLinks = [
    { name: "Home", href: "home" },
    { name: "Solutions", href: "solutions" },
    { name: "Pricing", href: "pricing" },
    { name: "Blog", href: "blog" },
    { name: "Careers", href: "careers" },
    { name: "Refer & Earn", href: "refer" },
    { name: "Contact", href: "contact" },
  ] as const;

  const services = [
    "Web Development",
    "ERP & Management Systems",
    "Mobile Apps",
    "Custom Software",
    "IoT & Embedded Systems",
  ];

  return (
    <>
      <footer className="relative w-full bg-[#010101] pb-20 text-left">
        <div className="w-full border-t border-white/10 mb-12" aria-hidden="true" />
        <div className="mx-auto max-w-7xl px-5 sm:px-6 md:px-8">

          {/* Grid */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">

            {/* Brand */}
            <div className="col-span-2 flex flex-col gap-4 sm:col-span-2 lg:col-span-2">
              <a
                href="/"
                onClick={(e) => { e.preventDefault(); handleNavClick("home"); }}
                className="inline-flex focus:outline-none"
              >
                <img src="/onesitestudios-logo.png" alt={name} className="h-10 w-auto object-contain" />
              </a>
              <p className="text-xs leading-relaxed text-zinc-500 max-w-xs">
                Building digital products for the modern world. Design, engineering, and AI combined.
              </p>
              {/* Social icons */}
              <div className="flex gap-2.5 mt-1">
                {[
                  { href: linkedin, label: "LinkedIn", icon: (
                    <path d="M6.5 8.5H3.2V21h3.3V8.5ZM4.85 3A1.95 1.95 0 1 0 4.85 6.9 1.95 1.95 0 0 0 4.85 3ZM21 13.85c0-3.75-2-5.5-4.65-5.5-2.14 0-3.1 1.18-3.64 2.01V8.5H9.4V21h3.31v-6.19c0-1.63.3-3.2 2.33-3.2 2 0 2.03 1.86 2.03 3.3V21H21v-7.15Z" />
                  )},
                  { href: twitter, label: "Twitter", icon: (
                    <path d="M23.3 4.7c-.8.4-1.7.6-2.6.7a4.5 4.5 0 0 0 2-2.5c-.9.5-1.9.9-2.9 1.1A4.5 4.5 0 0 0 12 7.1c0 .4 0 .7.1 1A12.8 12.8 0 0 1 2.8 3.7a4.5 4.5 0 0 0 1.4 6 4.5 4.5 0 0 1-2-.6v.1a4.5 4.5 0 0 0 3.6 4.4c-.4.1-.8.2-1.2.2l-.9-.1a4.5 4.5 0 0 0 4.2 3.1A9 9 0 0 1 2.4 19c-.5 0-1.1 0-1.6-.1A12.7 12.7 0 0 0 7.7 21c8.2 0 12.7-6.8 12.7-12.7v-.6c.9-.7 1.7-1.5 2.3-2.4Z" />
                  )},
                ].map(({ href, label, icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-zinc-400 transition-colors hover:bg-white/10 hover:text-white focus:outline-none"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">{icon}</svg>
                  </a>
                ))}
                <a
                  href={instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-zinc-400 transition-colors hover:bg-white/10 hover:text-white focus:outline-none"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current" strokeWidth="1.8">
                    <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="4.5" />
                    <circle cx="12" cy="12" r="4.1" />
                    <circle cx="17.5" cy="6.6" r="1" className="fill-current stroke-none" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Nav */}
            <div>
              <h4 className="font-mono text-[9px] font-bold text-zinc-500 uppercase tracking-widest sm:text-[10px]">Navigation</h4>
              <ul className="mt-4 space-y-2.5">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href === "home" ? "/" : `/${link.href}`}
                      onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                      className="text-xs text-zinc-500 hover:text-white transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-mono text-[9px] font-bold text-zinc-500 uppercase tracking-widest sm:text-[10px]">Services</h4>
              <ul className="mt-4 space-y-2.5">
                {services.map((svc) => (
                  <li key={svc}>
                    <span className="text-xs text-zinc-500">{svc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="col-span-2 sm:col-span-1">
              <h4 className="font-mono text-[9px] font-bold text-zinc-500 uppercase tracking-widest sm:text-[10px]">Connect</h4>
              <ul className="mt-4 space-y-3">
                <li>
                  <a href={`mailto:${email}`} className="text-xs text-zinc-500 hover:text-white transition-colors break-all">
                    {email}
                  </a>
                </li>
                <li>
                  <a
                    href={`https://wa.me/${phoneUrl}?text=${encodeURIComponent(whatsappDefaultMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-zinc-500 hover:text-white transition-colors"
                  >
                    WhatsApp: {phone}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-14 border-t border-white/5 pt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[10px] text-zinc-600 font-mono">&copy; 2026 {name}. All rights reserved.</p>
            <div className="flex gap-5 text-[10px] text-zinc-600 font-mono">
              <a href="#" className="hover:text-zinc-400">Privacy Policy</a>
              <a href="#" className="hover:text-zinc-400">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Sticky bottom bar */}
      <div
        className={`fixed inset-x-0 bottom-0 z-40 transition-transform duration-300 ${
          showScrollBar && !isDismissed ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center gap-3 bg-[#1b2231] px-4 py-3 shadow-[0_-8px_30px_rgba(0,0,0,0.3)] sm:px-8">
          {/* Scroll to top */}
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg shadow-blue-900/30 transition-transform hover:scale-105 focus:outline-none"
            aria-label="Back to top"
          >
            <ArrowUp className="h-5 w-5" />
          </button>

          {/* Text (hidden on tiny screens) */}
          <div className="hidden items-center gap-2 text-sm font-semibold text-slate-200 sm:flex">
            <span className="h-2 w-2 rounded-full bg-emerald-500 flex-shrink-0" />
            <span>Ready to start your project?</span>
            <a
              href={`tel:${phone.replace(/\s+/g, "")}`}
              className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
            >
              <Phone className="h-3.5 w-3.5" />
              {phone}
            </a>
          </div>

          <button
            type="button"
            onClick={() => onNavigate("quote")}
            className="ml-auto flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-blue-500 focus:outline-none sm:text-sm sm:px-5 sm:py-3"
          >
            Get Free Quote
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>

          <button
            type="button"
            onClick={() => { setIsDismissed(true); setShowScrollBar(false); }}
            className="p-1.5 text-slate-500 hover:text-white transition-colors focus:outline-none"
            aria-label="Dismiss"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </>
  );
};
