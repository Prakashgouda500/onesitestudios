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
      className="brand-gradient-section relative flex min-h-screen w-full items-center justify-center overflow-hidden pt-16 sm:pt-20"
    >
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Spotlight glows */}
      <div className="absolute -top-[10%] left-[10%] -z-10 h-[20rem] w-[20rem] sm:h-[35rem] sm:w-[35rem] rounded-full bg-blue-500/10 blur-[100px] pointer-events-none" />
      <div className="absolute top-[20%] right-[10%] -z-10 h-[18rem] w-[18rem] sm:h-[30rem] sm:w-[30rem] rounded-full bg-purple-500/5 blur-[100px] pointer-events-none" />

      <div className="mx-auto flex max-w-7xl w-full items-center justify-center px-5 py-10 md:px-8 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="z-10 flex w-full max-w-4xl flex-col items-start text-left"
        >
          {/* Eyebrow badge */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-md sm:px-4">
            <span className="text-[9px] sm:text-[10px] font-bold tracking-widest text-zinc-300 uppercase">
              {siteData.company.eyebrow}
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-[1.75rem] font-extrabold leading-[1.15] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
            WE BUILD{" "}
            <span className="hero-text-gradient">DIGITAL PRODUCTS</span>{" "}
            THAT MOVE BUSINESSES FORWARD.
          </h1>

          {/* Description */}
          <p className="mt-5 w-full max-w-xl text-sm leading-relaxed text-zinc-400 sm:mt-6 sm:text-base">
            {siteData.company.description}
          </p>

          {/* CTA */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row w-full sm:w-auto sm:mt-10">
            <button
              type="button"
              onClick={() => {
                if (onNavigate) onNavigate("quote");
                else window.location.href = "/quote";
              }}
              className="btn-gradient-shift group flex w-full items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-black sm:w-auto"
            >
              Start a Project
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
