import React from "react";
import { motion } from "framer-motion";
import { siteData } from "../data/siteData";
import { ServiceCard } from "./ServiceCard";
import * as Icons from "lucide-react";

export const Services: React.FC = () => {
  // Map our service IDs to specific Lucide React icon names
  const iconMap: Record<string, keyof typeof Icons> = {
    "web-dev": "Code",
    "erp-management": "Building2",
    "mobile-apps": "Smartphone",
    "custom-software": "Layers",
    "ui-ux": "Palette",
    "e-commerce": "ShoppingBag",
    "saas-dev": "Cloud",
    "automation": "Zap",
    "iot": "Cpu",
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  } as const;

  return (
    <section id="services" className="brand-gradient-section relative w-full py-24 md:py-32">
      {/* Background gradients */}
      <div className="absolute top-[20%] left-[-10%] -z-10 h-[30rem] w-[30rem] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[20%] right-[-10%] -z-10 h-[30rem] w-[30rem] rounded-full bg-purple-500/5 blur-[120px] pointer-events-none"></div>

      <div className="mx-auto max-w-7xl px-6 md:px-8">
        {/* Section Header */}
        <div className="text-left mb-16 md:mb-24">
          {/* Eyebrow pill */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 backdrop-blur-sm mb-6"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-blue-400 shadow-[0_0_6px_2px_rgba(96,165,250,0.6)] animate-pulse" />
            <span className="text-[10px] font-bold tracking-[0.25em] text-blue-300 uppercase">
              What We Build
            </span>
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl leading-[1.1]"
          >
            From first idea to{" "}
            <br className="hidden sm:block" />
            production-<span className="ready-word-gradient">ready</span> product.
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-5 max-w-xl text-sm leading-relaxed text-zinc-400 sm:text-base"
          >
            End-to-end digital solutions crafted with precision — from pixel-perfect interfaces to scalable backends that power modern businesses.
          </motion.p>
        </div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {siteData.services.map((service) => (
            <motion.div key={service.id} variants={itemVariants} className="h-full">
              <ServiceCard
                id={service.id}
                number={service.number}
                title={service.title}
                description={service.description}
                iconName={iconMap[service.id] || "Code"}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
