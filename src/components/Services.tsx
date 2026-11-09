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
        <div className="text-left md:max-w-2xl mb-16 md:mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[10px] font-bold tracking-widest text-blue-500 uppercase"
          >
            What We Build
          </motion.h2>
          
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl"
          >
            From first idea to production-ready product.
          </motion.h3>
        </div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2"
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
