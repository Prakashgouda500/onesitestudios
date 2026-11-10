import React from "react";
import { motion } from "framer-motion";
import { siteData } from "../data/siteData";
import { CheckCircle, Shield, Zap } from "lucide-react";
import { WaveDivider } from "./ui/WaveDivider";

export const About: React.FC = () => {
  const { content, principles } = siteData.about;

  return (
    <section id="about" className="relative w-full bg-white pb-20 md:pb-32 overflow-hidden">
      <WaveDivider fromColor="#010101" toColor="#ffffff" className="mb-10 md:mb-20" />
      <div className="absolute top-[30%] left-[20%] -z-10 h-[25rem] w-[25rem] rounded-full bg-blue-500/5 blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-5 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center">

          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="flex flex-col text-left"
          >
            <h2 className="text-[10px] font-bold tracking-widest text-blue-600 uppercase">About Us</h2>
            <h3 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
              WE TURN IDEAS INTO{" "}
              <span className="process-text-gradient">DIGITAL PRODUCTS</span>.
            </h3>
            <p className="mt-5 text-sm leading-relaxed text-slate-600 sm:text-base">{content}</p>

            <div className="mt-10 flex flex-col gap-5">
              {principles.map((p) => (
                <div key={p.number} className="flex gap-4 border-l-2 border-blue-100 pl-5">
                  <div>
                    <span className="font-mono text-xs font-bold text-blue-600">{p.number}</span>
                    <h4 className="text-sm font-bold text-slate-900 mt-1 sm:text-base">{p.title}</h4>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">{p.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Dashboard visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-8 shadow-[0_20px_60px_rgba(15,23,42,0.04)] overflow-hidden"
          >
            <div className="absolute top-0 right-0 h-16 w-16 bg-blue-500/15 blur-xl rounded-tr-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 h-16 w-16 bg-purple-500/10 blur-xl rounded-bl-2xl pointer-events-none" />

            {/* Header bar */}
            <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-5">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-mono tracking-wider text-zinc-400 uppercase">system_status // operational</span>
              </div>
              <div className="flex gap-1.5">
                {[1,2,3].map(i => <span key={i} className="h-1.5 w-1.5 rounded-full bg-white/20" />)}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {/* Uptime */}
              <div className="rounded-xl border border-white/5 bg-white/[0.03] p-4">
                <span className="text-[9px] font-bold text-zinc-500 tracking-wider uppercase">Uptime Rate</span>
                <p className="text-xl font-extrabold text-white mt-1 sm:text-2xl">99.98%</p>
                <div className="mt-3 flex gap-0.5">
                  {Array.from({ length: 15 }).map((_, i) => (
                    <div key={i} className={`h-3.5 w-1 rounded-sm sm:h-4 ${i === 13 ? "bg-amber-400" : "bg-emerald-500"}`} />
                  ))}
                </div>
              </div>

              {/* Latency */}
              <div className="rounded-xl border border-white/5 bg-white/[0.03] p-4">
                <span className="text-[9px] font-bold text-zinc-500 tracking-wider uppercase">Avg Latency</span>
                <p className="text-xl font-extrabold text-blue-400 mt-1 sm:text-2xl">14.2ms</p>
                <div className="mt-3 h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full w-[85%] bg-blue-500 rounded-full animate-pulse" />
                </div>
              </div>
            </div>

            {/* Code block */}
            <div className="mt-4 rounded-xl border border-white/5 bg-black/60 p-4 font-mono text-[9px] sm:text-[10px] leading-relaxed text-blue-400/90 overflow-x-auto">
              <div><span className="text-zinc-500">1</span> <span className="text-purple-400">const</span> config = &#123;</div>
              <div><span className="text-zinc-500">2</span>   engine: <span className="text-amber-300">"OneSiteStudios-LLM-v4"</span>,</div>
              <div><span className="text-zinc-500">3</span>   pipelines: [<span className="text-amber-300">"RAG"</span>, <span className="text-amber-300">"VectorSearch"</span>],</div>
              <div><span className="text-zinc-500">4</span>   latency: <span className="text-emerald-400">"ultra-low"</span>,</div>
              <div><span className="text-zinc-500">5</span>   security: <span className="text-emerald-400">"AES-256"</span></div>
              <div><span className="text-zinc-500">6</span> &#125;;</div>
            </div>

            {/* Tags */}
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="flex items-center gap-1 rounded bg-blue-500/10 px-2 py-1 text-[9px] sm:text-[10px] font-medium text-blue-400 border border-blue-500/10">
                <Zap className="h-2.5 w-2.5" /> High Performance
              </span>
              <span className="flex items-center gap-1 rounded bg-emerald-500/10 px-2 py-1 text-[9px] sm:text-[10px] font-medium text-emerald-400 border border-emerald-500/10">
                <Shield className="h-2.5 w-2.5" /> ISO-Secure
              </span>
              <span className="flex items-center gap-1 rounded bg-purple-500/10 px-2 py-1 text-[9px] sm:text-[10px] font-medium text-purple-400 border border-purple-500/10">
                <CheckCircle className="h-2.5 w-2.5" /> CI/CD Ready
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
