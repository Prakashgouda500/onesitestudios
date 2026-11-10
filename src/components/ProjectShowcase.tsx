import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Activity, Cpu, Layers, Zap } from "lucide-react";

export const ProjectShowcase: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Bind animations to scroll offsets inside the component viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Smoothly rotate the browser mockup as the user scrolls
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [15, 5, -5]);
  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-20, -5, 10]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.0, 0.95]);

  // Translate floating badges in outer directions on scroll
  const badge1X = useTransform(scrollYProgress, [0, 0.5, 1], [-40, -10, 20]);
  const badge2X = useTransform(scrollYProgress, [0, 0.5, 1], [40, 10, -20]);
  const badge3Y = useTransform(scrollYProgress, [0, 0.5, 1], [-30, 0, 30]);
  const badge4Y = useTransform(scrollYProgress, [0, 0.5, 1], [30, 0, -30]);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-bg-dark py-24 md:py-32 overflow-hidden border-t border-white/5"
    >
      <div className="absolute top-[10%] left-[-5%] -z-10 h-[30rem] w-[30rem] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none"></div>

      <div className="mx-auto max-w-7xl px-6 md:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <h2 className="text-[10px] font-bold tracking-widest text-blue-500 uppercase">
            Platform Demo
          </h2>
          <h3 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            SaaS Platform Core <span className="hero-text-gradient">Architecture</span>
          </h3>
          <p className="mt-4 text-sm text-zinc-400">
            A live preview of the interactive analytics dashboard we deliver. Built to support heavy data pipelines and real-time client management panels.
          </p>
        </div>

        {/* Immense 3D Mockup Container */}
        <div className="relative flex justify-center items-center py-12">
          
          {/* Floating Label 1: FAST */}
          <motion.div
            style={{ x: badge1X, y: badge3Y }}
            className="absolute top-[15%] left-[2%] md:left-[10%] z-20 flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-xs font-bold tracking-wider text-blue-400 backdrop-blur-md shadow-[0_0_15px_rgba(59,130,246,0.15)]"
          >
            <Zap className="h-3.5 w-3.5" />
            <span>FAST</span>
          </motion.div>

          {/* Floating Label 2: RESPONSIVE */}
          <motion.div
            style={{ x: badge2X, y: badge3Y }}
            className="absolute top-[20%] right-[2%] md:right-[10%] z-20 flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-xs font-bold tracking-wider text-emerald-400 backdrop-blur-md shadow-[0_0_15px_rgba(16,185,129,0.15)]"
          >
            <Layers className="h-3.5 w-3.5" />
            <span>RESPONSIVE</span>
          </motion.div>

          {/* Floating Label 3: SCALABLE */}
          <motion.div
            style={{ x: badge1X, y: badge4Y }}
            className="absolute bottom-[20%] left-[1%] md:left-[8%] z-20 flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-xs font-bold tracking-wider text-purple-400 backdrop-blur-md shadow-[0_0_15px_rgba(139,92,246,0.15)]"
          >
            <Activity className="h-3.5 w-3.5" />
            <span>SCALABLE</span>
          </motion.div>

          {/* Floating Label 4: AI-POWERED */}
          <motion.div
            style={{ x: badge2X, y: badge4Y }}
            className="absolute bottom-[15%] right-[1%] md:right-[8%] z-20 flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-xs font-bold tracking-wider text-cyan-400 backdrop-blur-md shadow-[0_0_15px_rgba(6,182,212,0.15)]"
          >
            <Cpu className="h-3.5 w-3.5" />
            <span>AI-POWERED</span>
          </motion.div>

          {/* Core Mockup Frame */}
          <motion.div
            style={{ rotateX, rotateY, scale }}
            className="w-full max-w-4xl rounded-xl border border-white/10 glass-panel shadow-[0_30px_60px_rgba(0,0,0,0.8)] overflow-hidden"
          >
            {/* Browser Top bar */}
            <div className="flex items-center justify-between bg-zinc-950/60 px-5 py-3 border-b border-white/5">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500/70"></span>
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500/70"></span>
                <span className="h-2.5 w-2.5 rounded-full bg-green-500/70"></span>
              </div>
              <div className="w-1/3 rounded bg-white/5 py-1 text-[10px] text-center text-zinc-500 font-mono">
                demo.onesitestudios.com/analytics
              </div>
              <div className="w-6"></div>
            </div>

            {/* Dashboard Mockup Content */}
            <div className="bg-[#0a0a0c]/90 p-5 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-5 text-left text-zinc-300">
              {/* Left Panel: 4 cols */}
              <div className="md:col-span-4 flex flex-col gap-4">
                <div className="rounded-lg border border-white/5 bg-white/[0.01] p-4">
                  <span className="text-[9px] font-bold text-zinc-500 tracking-wider uppercase">User Sessions</span>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-xl font-bold text-white">45,820</span>
                    <span className="text-[10px] text-emerald-400 font-medium">+12.4%</span>
                  </div>
                </div>
                
                <div className="rounded-lg border border-white/5 bg-white/[0.01] p-4 flex-1">
                  <span className="text-[9px] font-bold text-zinc-500 tracking-wider uppercase">Server Load</span>
                  <div className="mt-4 flex items-center justify-center">
                    {/* Ring progress simulation */}
                    <div className="relative flex h-24 w-24 items-center justify-center rounded-full border-4 border-zinc-800 border-t-blue-500 border-r-blue-500 animate-spin [animation-duration:10s]">
                      <div className="absolute flex flex-col items-center justify-center bg-[#0a0a0c] h-18 w-18 rounded-full border border-white/5">
                        <span className="text-xs font-mono font-bold text-white">42%</span>
                        <span className="text-[8px] text-zinc-500">CPU</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Panel: 8 cols */}
              <div className="md:col-span-8 flex flex-col gap-4">
                {/* Graph box */}
                <div className="rounded-lg border border-white/5 bg-white/[0.01] p-5">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[9px] font-bold text-zinc-500 tracking-wider uppercase">Data Node Latency (24h)</span>
                    <span className="text-[9px] bg-blue-500/10 px-2 py-0.5 rounded text-blue-400 font-mono">Live</span>
                  </div>
                  {/* Grid lines & line path */}
                  <div className="relative h-28 w-full border-b border-l border-white/5 flex items-end">
                    <svg className="absolute inset-0 h-full w-full overflow-visible" preserveAspectRatio="none">
                      <path
                        d="M 0,80 Q 50,20 100,60 T 200,30 T 300,70 T 400,20 T 500,45 T 600,10 L 600,110 L 0,110 Z"
                        fill="url(#grad)"
                        stroke="#0070f3"
                        strokeWidth="1.5"
                      />
                      <defs>
                        <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#0070f3" stopOpacity="0.2" />
                          <stop offset="100%" stopColor="#0070f3" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="flex w-full justify-between px-1 text-[8px] text-zinc-600 font-mono mt-1 pt-1 border-t border-white/5">
                      <span>00:00</span>
                      <span>06:00</span>
                      <span>12:00</span>
                      <span>18:00</span>
                    </div>
                  </div>
                </div>

                {/* Grid stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg border border-white/5 bg-white/[0.01] p-4">
                    <span className="text-[9px] font-bold text-zinc-500 tracking-wider uppercase">Conversions</span>
                    <p className="text-lg font-bold text-white mt-1">3.42%</p>
                  </div>
                  <div className="rounded-lg border border-white/5 bg-white/[0.01] p-4">
                    <span className="text-[9px] font-bold text-zinc-500 tracking-wider uppercase">Active Requests</span>
                    <p className="text-lg font-bold text-blue-400 mt-1">1,824 / sec</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
