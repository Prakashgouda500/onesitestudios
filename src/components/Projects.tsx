import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { siteData } from "../data/siteData";
import { WaveDivider } from "./ui/WaveDivider";

export const Projects: React.FC = () => {
  const projects = siteData.projects;

  return (
    <section id="work" className="relative w-full bg-bg-darker pb-24 md:pb-32">
      <WaveDivider fromColor="#ffffff" toColor="#010101" flip={true} className="mb-14 md:mb-20" />
      <div className="absolute inset-0 bg-radial-gradient(circle_at_center,rgba(121,40,202,0.02),transparent_70%) pointer-events-none"></div>

      <div className="mx-auto max-w-7xl px-6 md:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24">
          <div className="text-left md:max-w-xl">
            <h2 className="text-[10px] font-bold tracking-widest text-blue-500 uppercase">
              Selected Work
            </h2>
            <h3 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              High-performance <span className="hero-text-gradient">digital products</span>.
            </h3>
          </div>
          <p className="mt-4 md:mt-0 text-sm text-zinc-400 max-w-xs text-left">
            A small collection of custom websites, AI tools, and enterprise interfaces engineered for maximum speed and conversions.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/5 bg-zinc-950/40 p-4 transition-all duration-500 hover:border-white/10 hover:bg-zinc-950/80"
            >
              {/* Image Container */}
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-zinc-900">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-hover:brightness-95"
                />
                {/* Visual Glass Tint Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
              </div>

              {/* Title & Info */}
              <div className="mt-6 flex-1 text-left px-2">
                <span className="text-[10px] font-bold tracking-widest text-blue-400 uppercase">
                  {project.subtitle}
                </span>
                
                <h4 className="mt-2 text-xl font-bold text-white transition-colors group-hover:text-blue-300">
                  {project.title}
                </h4>
                
                <p className="mt-3 text-xs leading-relaxed text-zinc-400">
                  {project.description}
                </p>

                {/* Tech Tags */}
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-white/5 border border-white/5 px-2.5 py-0.5 text-[9px] font-semibold text-zinc-300 uppercase tracking-wider"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom CTA Button */}
              <div className="mt-8 border-t border-white/5 pt-4 px-2 text-left">
                <a
                  href={project.link}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-zinc-400 transition-colors group-hover:text-white"
                >
                  View Project
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
