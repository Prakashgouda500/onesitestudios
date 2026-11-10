import React from "react";
import { motion } from "framer-motion";
import { Code2, FlaskConical, Palette, Rocket, Route, Search } from "lucide-react";
import { siteData } from "../data/siteData";
import { WaveDivider } from "./ui/WaveDivider";

const processIcons = [Search, Route, Palette, Code2, FlaskConical, Rocket];

export const Process: React.FC = () => {
  const steps = siteData.process;

  return (
    <section id="process" className="relative w-full bg-white pb-20 md:pb-32 overflow-hidden">
      <WaveDivider fromColor="#000000" toColor="#ffffff" className="mb-10 md:mb-20" />

      <div className="mx-auto max-w-7xl px-5 sm:px-6 md:px-8">
        {/* Header */}
        <div className="text-left mb-14 md:mb-20">
          <h2 className="text-[10px] font-bold tracking-widest text-blue-600 uppercase">Our Workflow</h2>
          <h3 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
            How We <span className="process-text-gradient">Build</span>
          </h3>
          <p className="mt-3 text-sm text-slate-500 max-w-lg">
            A systematic engineering process designed to keep projects on track, transparent, and built to perform.
          </p>
        </div>

        {/* Mobile: simple vertical cards (no alternating layout) */}
        <div className="flex flex-col gap-5 md:hidden">
          {steps.map((step, idx) => {
            const ProcessIcon = processIcons[idx];
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="flex gap-4 rounded-xl border border-slate-100 bg-slate-50 p-5 shadow-sm"
              >
                {/* Step number column */}
                <div className="flex flex-col items-center gap-2 flex-shrink-0">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white shadow-md shadow-blue-500/30">
                    <ProcessIcon className="h-4 w-4" />
                  </div>
                  {idx < steps.length - 1 && (
                    <div className="w-px flex-1 bg-blue-100 min-h-[2rem]" />
                  )}
                </div>
                {/* Content */}
                <div className="flex-1 pb-2">
                  <span className="font-mono text-xs font-bold text-blue-500 bg-blue-50 px-2 py-0.5 rounded">
                    {step.number}
                  </span>
                  <h4 className="mt-2 text-sm font-bold text-slate-900">{step.title}</h4>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-500">{step.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Desktop: alternating timeline */}
        <div className="relative hidden md:block mt-12">
          <div className="absolute bottom-0 left-1/2 top-0 -translate-x-1/2 border-l-2 border-dashed border-blue-200" />
          <div className="space-y-20">
            {steps.map((step, idx) => {
              const isEven = idx % 2 === 0;
              const ProcessIcon = processIcons[idx];
              return (
                <div
                  key={step.number}
                  className={`relative flex items-center ${isEven ? "flex-row-reverse" : ""}`}
                >
                  <div className={`absolute top-1/2 w-12 -translate-y-1/2 border-t-2 border-dashed border-blue-200 ${isEven ? "right-1/2" : "left-1/2"}`} />
                  <div className="absolute left-1/2 z-10 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-white bg-blue-600 shadow-[0_0_10px_#3b82f6]" />
                  <div className="hidden w-full md:block md:w-1/2" />
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, type: "spring", stiffness: 80 }}
                    className="w-full md:w-1/2 md:px-12"
                  >
                    <div className="rounded-xl border border-white/10 bg-black p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-white/20 hover:shadow-xl hover:shadow-black/40">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded">
                          {step.number}
                        </span>
                        <ProcessIcon className="h-5 w-5 text-blue-400" />
                      </div>
                      <h4 className="mt-3 text-sm font-bold text-white">{step.title}</h4>
                      <p className="mt-2 text-sm leading-relaxed text-zinc-400">{step.description}</p>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
