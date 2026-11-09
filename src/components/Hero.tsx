import React from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { siteData } from "../data/siteData";

interface HeroProps {
  onNavigate?: (page: "home" | "solutions" | "pricing" | "blog" | "careers" | "refer" | "contact" | "quote" | string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {

  return (
    <section
      id="home"
      className="brand-gradient-section relative flex min-h-screen w-full items-center justify-center overflow-hidden pt-20"
    >
      {/* Background Styling: Subtle grid lines & radial glows */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>
      
      {/* Spotlight blur glows */}
      <div className="absolute -top-[10%] left-[10%] -z-10 h-[35rem] w-[35rem] rounded-full bg-blue-500/10 blur-[120px] pointer-events-none"></div>
      <div className="absolute top-[20%] right-[10%] -z-10 h-[30rem] w-[30rem] rounded-full bg-purple-500/5 blur-[120px] pointer-events-none"></div>

      <div className="mx-auto flex max-w-7xl w-full items-center justify-center px-6 py-12 md:px-8 lg:py-24">
        {/* Left Column: Headline and CTAs */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="z-10 flex max-w-4xl flex-col items-start text-left"
        >
          <img
            src="/onesitestudios-logo.png"
            alt="OneSiteStudios"
            className="mb-4 h-28 w-56 object-contain sm:h-36 sm:w-72"
          />

          {/* Eyebrow badge */}
          <div className="mb-6 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md">
            <span className="text-[10px] font-bold tracking-widest text-zinc-300 uppercase">
              {siteData.company.eyebrow}
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl">
            WE BUILD <br />
            <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
              DIGITAL PRODUCTS
            </span>
            <br />
            THAT MOVE BUSINESSES FORWARD.
          </h1>

          {/* Supporting Description */}
          <p className="mt-6 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg">
            {siteData.company.description}
          </p>

          {/* Buttons/CTAs */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row w-full sm:w-auto">
            <button
              type="button"
              onClick={() => {
                if (onNavigate) {
                  onNavigate("quote");
                } else {
                  window.location.href = "/quote";
                }
              }}
              className="group flex items-center justify-center gap-2 rounded-full bg-blue-600 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:bg-blue-500 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-black"
            >
              Start a Project
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Availability status */}
          <div className="mt-8 flex items-center gap-2.5">
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </div>
            <span className="text-xs font-semibold text-emerald-400/90 tracking-wider uppercase">
              Available for new projects
            </span>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
