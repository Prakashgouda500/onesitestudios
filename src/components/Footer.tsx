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
    if (page === "home") {
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 50);
    }
  };

  return (
    <>
      <footer className="relative w-full border-t border-white/5 bg-[#010101] py-16 text-left">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          
          {/* Col 1: Brand Info */}
          <div className="sm:col-span-2 flex flex-col justify-start">
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
                alt={name}
                className="h-12 w-auto object-contain"
              />
            </a>
            <p className="mt-4 text-xs leading-relaxed text-zinc-500 max-w-xs">
              Building digital products for the modern world. Design, engineering, and artificial intelligence combined.
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="font-mono text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
              Navigation
            </h4>
            <ul className="mt-4 space-y-2.5">
              {[
                { name: "Home", href: "home" },
                { name: "Solutions", href: "solutions" },
                { name: "Pricing", href: "pricing" },
                { name: "Blog", href: "blog" },
                { name: "Careers", href: "careers" },
                { name: "Refer & Earn", href: "refer" },
                { name: "Contact", href: "contact" },
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href === "home" ? "/" : `/${link.href}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href as "home" | "solutions" | "pricing" | "blog" | "careers" | "refer" | "contact");
                    }}
                    className="text-xs text-zinc-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services */}
          <div>
            <h4 className="font-mono text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
              Services
            </h4>
            <ul className="mt-4 space-y-2.5">
              {[
                "Web Development",
                "ERP & Management Systems",
                "Mobile Apps",
                "Custom Software",
              ].map((svc) => (
                <li key={svc}>
                  <span className="text-xs text-zinc-400 hover:text-white transition-colors cursor-default">
                    {svc}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact & Social */}
          <div>
            <h4 className="font-mono text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
              Connect
            </h4>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a href={`mailto:${email}`} className="text-xs text-zinc-400 hover:text-white transition-colors">
                  {email}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${phoneUrl}?text=${encodeURIComponent(whatsappDefaultMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-zinc-400 hover:text-white transition-colors"
                >
                  WhatsApp: {phone}
                </a>
              </li>
              <li className="flex gap-3 pt-2">
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#1b2231] text-zinc-300 transition-colors hover:bg-[#273248] hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                    <path d="M6.5 8.5H3.2V21h3.3V8.5ZM4.85 3A1.95 1.95 0 1 0 4.85 6.9 1.95 1.95 0 0 0 4.85 3ZM21 13.85c0-3.75-2-5.5-4.65-5.5-2.14 0-3.1 1.18-3.64 2.01V8.5H9.4V21h3.31v-6.19c0-1.63.3-3.2 2.33-3.2 2 0 2.03 1.86 2.03 3.3V21H21v-7.15Z" />
                  </svg>
                </a>
                <a
                  href={twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#1b2231] text-zinc-300 transition-colors hover:bg-[#273248] hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                    <path d="M23.3 4.7c-.8.4-1.7.6-2.6.7a4.5 4.5 0 0 0 2-2.5c-.9.5-1.9.9-2.9 1.1A4.5 4.5 0 0 0 12 7.1c0 .4 0 .7.1 1A12.8 12.8 0 0 1 2.8 3.7a4.5 4.5 0 0 0 1.4 6 4.5 4.5 0 0 1-2-.6v.1a4.5 4.5 0 0 0 3.6 4.4c-.4.1-.8.2-1.2.2l-.9-.1a4.5 4.5 0 0 0 4.2 3.1A9 9 0 0 1 2.4 19c-.5 0-1.1 0-1.6-.1A12.7 12.7 0 0 0 7.7 21c8.2 0 12.7-6.8 12.7-12.7v-.6c.9-.7 1.7-1.5 2.3-2.4Z" />
                  </svg>
                </a>
                <a
                  href={instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#1b2231] text-zinc-300 transition-colors hover:bg-[#273248] hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="1.8">
                    <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="4.5" />
                    <circle cx="12" cy="12" r="4.1" />
                    <circle cx="17.5" cy="6.6" r="1" className="fill-current stroke-none" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright segment */}
        <div className="mt-16 border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[10px] text-zinc-600 font-mono">
            &copy; 2026 {name}. All rights reserved.
          </p>
          <div className="flex gap-6 text-[10px] text-zinc-600 font-mono">
            <a href="#" className="hover:text-zinc-400">Privacy Policy</a>
            <a href="#" className="hover:text-zinc-400">Terms of Service</a>
          </div>
        </div>

      </div>
      </footer>

      <div
        className={`fixed inset-x-0 bottom-0 z-40 transition-transform duration-300 ${
          showScrollBar && !isDismissed ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center gap-4 bg-[#1b2231] px-5 py-3 text-left shadow-[0_-8px_30px_rgba(0,0,0,0.25)] sm:px-8">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="absolute bottom-6 left-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg shadow-blue-900/30 transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300 sm:left-8"
            aria-label="Back to top"
          >
            <ArrowUp className="h-6 w-6" />
          </button>

          <div className="ml-16 hidden items-center gap-3 text-sm font-semibold text-slate-200 sm:flex">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
            <span>Ready to start your project?</span>
            <a
              href={`tel:${phone.replace(/\s+/g, "")}`}
              className="flex items-center gap-2 text-slate-400 transition-colors hover:text-white"
            >
              <Phone className="h-4 w-4" />
              {phone}
            </a>
          </div>

          <button
            type="button"
            onClick={() => onNavigate("quote")}
            className="ml-auto flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Get Free Quote
            <ArrowUpRight className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={() => {
              setIsDismissed(true);
              setShowScrollBar(false);
            }}
            className="hidden p-2 text-slate-500 transition-colors hover:text-white sm:block"
            aria-label="Dismiss contact bar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </>
  );
};
