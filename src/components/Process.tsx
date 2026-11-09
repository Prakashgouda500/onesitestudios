import React from "react";
import { motion } from "framer-motion";
import { Code2, FlaskConical, Palette, Rocket, Route, Search } from "lucide-react";
import { siteData } from "../data/siteData";

const processIcons = [Search, Route, Palette, Code2, FlaskConical, Rocket];

export const Process: React.FC = () => {
  const steps = siteData.process;

  return (
    <section id="process" className="relative w-full bg-white py-24 md:py-32 border-t border-slate-200 overflow-hidden">
      <div className="absolute inset-0 bg-radial-gradient(circle_at_center,rgba(59,130,246,0.02),transparent_70%) pointer-events-none"></div>

      <div className="mx-auto max-w-7xl px-6 md:px-8">
        {/* Section Header */}
        <div className="text-left md:max-w-2xl mb-20">
          <h2 className="text-[10px] font-bold tracking-widest text-blue-600 uppercase">
            Our Workflow
          </h2>
          <h3 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            How We Build
          </h3>
          <p className="mt-4 text-sm text-slate-600">
            A systematic engineering process designed to keep projects on track, transparent, and built to perform.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative mt-12">
          {/* Dotted roadmap path */}
          <div className="absolute bottom-0 left-4 top-0 border-l-2 border-dashed border-blue-200 md:left-1/2 md:-translate-x-1/2"></div>

          {/* Timeline Nodes */}
          <div className="space-y-12 md:space-y-20">
            {steps.map((step, idx) => {
              const isEven = idx % 2 === 0;
              const ProcessIcon = processIcons[idx];

              return (
                <div
                  key={step.number}
                  className={`relative flex flex-col md:flex-row md:items-center ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  <div
                    className={`absolute top-1/2 hidden w-12 -translate-y-1/2 border-t-2 border-dashed border-blue-200 md:block ${
                      isEven ? "right-1/2" : "left-1/2"
                    }`}
                  ></div>

                  {/* Glowing Node Dot */}
                  <div className="absolute left-4 top-1.5 z-10 h-3.5 w-3.5 -translate-x-[6px] rounded-full border-2 border-white bg-zinc-700 md:left-1/2 md:-translate-x-1/2 md:top-auto">
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      className="h-full w-full rounded-full bg-blue-500 shadow-[0_0_8px_#0070f3]"
                    ></motion.div>
                  </div>

                  {/* Left Side Content (Empty space on desktop to maintain alternating structure) */}
                  <div className="hidden w-full md:block md:w-1/2"></div>

                  {/* Right Side Content (Card details) */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, type: "spring", stiffness: 80 }}
                    className="w-full pl-10 md:w-1/2 md:pl-0 md:px-12 text-left"
                  >
                    <div className="group rounded-xl border border-slate-200 bg-slate-50 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:border-slate-950 hover:bg-black hover:shadow-xl hover:shadow-slate-950/20">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-bold text-blue-600 bg-blue-500/10 px-2 py-0.5 rounded">
                          {step.number}
                        </span>
                        <span
                          title={step.title}
                          aria-label={step.title}
                          className="text-blue-600 transition-transform duration-300 group-hover:scale-110"
                        >
                          <ProcessIcon className="h-6 w-6" aria-hidden="true" />
                        </span>
                      </div>
                      
                      <p className="mt-3 text-sm leading-relaxed text-slate-600 transition-colors duration-300 group-hover:text-white">
                        {step.description}
                      </p>
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
