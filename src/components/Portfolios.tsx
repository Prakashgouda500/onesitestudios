import React from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { siteData } from "../data/siteData";

export const Portfolios: React.FC = () => {
  const portfolios = siteData.portfolios;

  return (
    <section id="portfolios" className="relative w-full bg-bg-darker py-24 md:py-32 border-t border-white/5">
      <div className="absolute inset-0 bg-radial-gradient(circle_at_center,rgba(59,130,246,0.02),transparent_70%) pointer-events-none"></div>

      <div className="mx-auto max-w-7xl px-6 md:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24">
          <div className="text-left md:max-w-xl">
            <h2 className="text-[10px] font-bold tracking-widest text-blue-500 uppercase">
              Meet Our Team
            </h2>
            <h3 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Talented developers behind the craft.
            </h3>
          </div>
          <p className="mt-4 md:mt-0 text-sm text-zinc-400 max-w-xs text-left">
            Our team of expert developers brings diverse skills and innovative thinking to every project. Explore their individual portfolios and expertise.
          </p>
        </div>

        {/* Portfolios Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {portfolios.map((portfolio, idx) => (
            <motion.div
              key={portfolio.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/5 bg-zinc-950/40 p-6 transition-all duration-500 hover:border-blue-500/30 hover:bg-zinc-950/80 hover:shadow-[0_0_20px_rgba(59,130,246,0.1)]"
            >
              {/* Header Section */}
              <div>
                {/* Avatar Placeholder */}
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-500/30">
                  <span className="text-2xl font-bold text-blue-400">
                    {portfolio.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                </div>

                {/* Name & Role */}
                <h4 className="text-xl font-bold text-white transition-colors group-hover:text-blue-300">
                  {portfolio.name}
                </h4>
                
                <p className="mt-1 text-xs font-semibold text-blue-400 uppercase tracking-widest">
                  {portfolio.role}
                </p>
                
                <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                  {portfolio.description}
                </p>

                {/* Skills */}
                <div className="mt-6 space-y-3">
                  <p className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">
                    Core Skills
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {portfolio.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 text-[9px] font-semibold text-blue-300 uppercase tracking-wider hover:bg-blue-500/20 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom CTA */}
              <div className="mt-8 border-t border-white/5 pt-4">
                <a
                  href={portfolio.portfolioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-zinc-400 transition-all group-hover:text-blue-300 hover:gap-3"
                >
                  <span>View Portfolio</span>
                  <ExternalLink className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
