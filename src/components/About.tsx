import React from "react";
import { motion } from "framer-motion";
import { siteData } from "../data/siteData";
import { CheckCircle, Shield, Zap } from "lucide-react";

export const About: React.FC = () => {
  const { headline, content, principles } = siteData.about;

  return (
    <section id="about" className="relative w-full bg-white py-24 md:py-32 overflow-hidden border-t border-slate-200">
      {/* Glow overlays */}
      <div className="absolute top-[30%] left-[20%] -z-10 h-[25rem] w-[25rem] rounded-full bg-blue-500/5 blur-[100px] pointer-events-none"></div>

      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 items-center">
          
          {/* Left Column: Heading, About Copy, Principles */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="flex flex-col text-left"
          >
            <h2 className="text-[10px] font-bold tracking-widest text-blue-600 uppercase">
              About Us
            </h2>
            <h3 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              {headline}
            </h3>
            <p className="mt-6 text-base leading-relaxed text-slate-600">
              {content}
            </p>

            {/* Principles list */}
            <div className="mt-12 flex flex-col gap-6">
              {principles.map((p) => (
                <div key={p.number} className="flex gap-4 border-l border-slate-200 pl-6">
                  <div>
                    <span className="font-mono text-xs font-bold text-blue-600">
                      {p.number}
                    </span>
                    <h4 className="text-base font-bold text-slate-900 mt-1">
                      {p.title}
                    </h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {p.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Animated Digital Dashboard Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8 shadow-[0_20px_60px_rgba(15,23,42,0.04)]"
          >
            {/* Corner glows */}
            <div className="absolute top-0 right-0 h-16 w-16 bg-blue-500/10 blur-xl rounded-tr-2xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 h-16 w-16 bg-purple-500/10 blur-xl rounded-bl-2xl pointer-events-none"></div>

            {/* Mock Dashboard Layout */}
            <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-xs font-mono tracking-wider text-zinc-400 uppercase">
                  system_status // operational
                </span>
              </div>
              <div className="flex gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-white/20"></span>
                <span className="h-1.5 w-1.5 rounded-full bg-white/20"></span>
                <span className="h-1.5 w-1.5 rounded-full bg-white/20"></span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Uptime Box */}
              <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4 text-left">
                <span className="text-[10px] font-bold text-zinc-500 tracking-wider uppercase">
                  Uptime Rate
                </span>
                <p className="text-2xl font-extrabold text-white mt-1">99.98%</p>
                <div className="mt-3 flex gap-0.5">
                  {Array.from({ length: 15 }).map((_, i) => (
                    <div
                      key={i}
                      className={`h-4 w-1 rounded-sm ${
                        i === 13 ? "bg-amber-400" : "bg-emerald-500"
                      }`}
                    ></div>
                  ))}
                </div>
              </div>

              {/* API Speed Box */}
              <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4 text-left">
                <span className="text-[10px] font-bold text-zinc-500 tracking-wider uppercase">
                  Avg Latency
                </span>
                <p className="text-2xl font-extrabold text-blue-400 mt-1">14.2ms</p>
                <div className="mt-4 h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full w-[85%] bg-blue-500 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Code Block / Node Details */}
            <div className="mt-4 rounded-xl border border-white/5 bg-black/60 p-4 text-left font-mono text-[10px] leading-normal text-blue-400/90 overflow-x-auto">
              <div><span className="text-zinc-500">1</span> <span className="text-purple-400">const</span> config = &#123;</div>
              <div><span className="text-zinc-500">2</span>   engine: <span className="text-amber-300">"OneSiteStudios-LLM-v4"</span>,</div>
              <div><span className="text-zinc-500">3</span>   pipelines: [<span className="text-amber-300">"RAG"</span>, <span className="text-amber-300">"VectorSearch"</span>],</div>
              <div><span className="text-zinc-500">4</span>   latency: <span className="text-emerald-400">"ultra-low"</span>,</div>
              <div><span className="text-zinc-500">5</span>   security: <span className="text-emerald-400">"AES-256"</span></div>
              <div><span className="text-zinc-500">6</span> &#125;;</div>
            </div>

            {/* Micro Tags */}
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="flex items-center gap-1 rounded bg-blue-500/10 px-2 py-1 text-[10px] font-medium text-blue-400 border border-blue-500/10">
                <Zap className="h-2.5 w-2.5" /> High Performance
              </span>
              <span className="flex items-center gap-1 rounded bg-emerald-500/10 px-2 py-1 text-[10px] font-medium text-emerald-400 border border-emerald-500/10">
                <Shield className="h-2.5 w-2.5" /> ISO-Secure
              </span>
              <span className="flex items-center gap-1 rounded bg-purple-500/10 px-2 py-1 text-[10px] font-medium text-purple-400 border border-purple-500/10">
                <CheckCircle className="h-2.5 w-2.5" /> CI/CD Ready
              </span>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};
