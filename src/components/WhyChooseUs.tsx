import React from "react";
import { motion } from "framer-motion";
import { Cpu, HeartHandshake, Target, Zap } from "lucide-react";

export const WhyChooseUs: React.FC = () => {
  const cards = [
    {
      number: "01",
      title: "Business First",
      description: "We align all engineering choices with your actual business goals, scaling roadmap, and customer targets.",
      icon: Target,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      borderColor: "group-hover:border-blue-500/30",
    },
    {
      number: "02",
      title: "Modern Technology",
      description: "We use current, scalable, and secure technologies to write high-quality software that lasts.",
      icon: Cpu,
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
      borderColor: "group-hover:border-purple-500/30",
    },
    {
      number: "03",
      title: "Performance",
      description: "Fast, lightweight, accessible, and responsive layouts optimized for top search-engine indexing.",
      icon: Zap,
      color: "text-cyan-400",
      bgColor: "bg-cyan-500/10",
      borderColor: "group-hover:border-cyan-500/30",
    },
    {
      number: "04",
      title: "Long-Term Support",
      description: "We work as your long-term product partners, providing continuous updates and infrastructure monitoring.",
      icon: HeartHandshake,
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
      borderColor: "group-hover:border-emerald-500/30",
    },
  ];

  return (
    <section className="relative w-full bg-white py-24 md:py-32 border-t border-slate-200 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
          <h2 className="text-[10px] font-bold tracking-widest text-blue-600 uppercase">
            Value Proposition
          </h2>
          <h3 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Why Businesses Work With Us
          </h3>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`group relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50 p-8 text-left transition-all duration-300 hover:scale-[1.02] hover:bg-white ${card.borderColor}`}
              >
                <div>
                  {/* Top Bar: Number & Icon */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-slate-500">
                      {card.number}
                    </span>
                    <div className={`rounded-xl p-3 text-zinc-400 transition-colors duration-300 group-hover:text-blue-600 ${card.bgColor} ${card.color}`}>
                      <Icon className="h-5 w-5 animate-pulse" />
                    </div>
                  </div>

                  {/* Title */}
                  <h4 className="mt-8 text-lg font-bold tracking-tight text-slate-900 transition-colors duration-300 group-hover:text-blue-600">
                    {card.title}
                  </h4>

                  {/* Description */}
                  <p className="mt-3 text-xs leading-relaxed text-slate-600">
                    {card.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
