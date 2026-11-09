import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { siteData } from "../data/siteData";

interface PricingProps {
  onNavigate?: (page: "home" | "solutions" | "pricing" | "blog" | "careers" | "refer" | "contact" | "quote" | string) => void;
}

export const Pricing: React.FC<PricingProps> = ({ onNavigate }) => {
  const plans = siteData.pricing;

  const handleSelectPlan = (planName: string) => {
    const target = `quote?plan=${encodeURIComponent(planName)}`;
    if (onNavigate) {
      onNavigate(target);
    } else {
      window.location.href = `/${target}`;
    }
  };

  return (
    <section id="pricing" className="relative w-full bg-white py-24 md:py-32 border-t border-slate-200 overflow-hidden">
      {/* Background glow overlay */}
      <div className="absolute top-[30%] right-[10%] -z-10 h-[30rem] w-[30rem] rounded-full bg-blue-500/10 blur-[120px] pointer-events-none"></div>

      <div className="mx-auto max-w-7xl px-6 md:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
          <h2 className="text-[10px] font-bold tracking-widest text-blue-600 uppercase">
            Pricing Models
          </h2>
          <h3 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Transparent Pricing Structured For You
          </h3>
          <p className="mt-4 text-sm text-slate-600">
            Select a project plan that fits your current business scale. All quotes are transparent with zero hidden fees.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 items-stretch">
          {plans.map((plan, idx) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`relative flex flex-col justify-between rounded-2xl border p-8 bg-white backdrop-blur-sm transition-all duration-300 ${
                plan.popular
                  ? "border-blue-500/40 shadow-[0_0_30px_rgba(59,130,246,0.12)] scale-[1.03] z-10"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-4 py-1 text-[9px] font-bold tracking-wider text-white uppercase shadow-md">
                  Most Popular
                </span>
              )}

              <div>
                {/* Plan Name */}
                <h4 className="text-sm font-bold tracking-widest text-slate-500 uppercase">
                  {plan.name}
                </h4>

                {/* Plan Price */}
                <div className="mt-6 flex items-baseline gap-1 text-left">
                  <span className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
                    {plan.price}
                  </span>
                  {plan.price !== "Let's Talk" && (
                    <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wide">
                      starting from
                    </span>
                  )}
                </div>

                <p className="mt-4 text-xs leading-relaxed text-slate-600 text-left">
                  {plan.subtitle}
                </p>

                {/* Features Checklist */}
                <ul className="mt-8 space-y-3.5 border-t border-slate-200 pt-6 text-left">
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-700">
                      <div className="rounded-full bg-blue-500/10 p-0.5 mt-0.5 shrink-0 text-blue-600">
                        <Check className="h-3 w-3" />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={() => handleSelectPlan(plan.name)}
                className={`mt-10 w-full rounded-full py-3.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  plan.popular
                    ? "bg-blue-600 text-white hover:bg-blue-500 hover:scale-105 shadow-md shadow-blue-500/10"
                    : "bg-slate-100 border border-slate-200 text-slate-900 hover:bg-slate-200"
                }`}
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
