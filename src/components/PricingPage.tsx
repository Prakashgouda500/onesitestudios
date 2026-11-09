import React from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { siteData } from "../data/siteData";

interface PricingPageProps {
  onNavigate?: (page: "home" | "solutions" | "pricing" | "blog" | "careers" | "refer" | "contact" | "quote" | string) => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({ onNavigate }) => {
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
    <section className="relative min-h-screen w-full bg-white px-6 py-28 md:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-blue-600">
            Pricing
          </p>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Simple pricing for growing businesses.
          </h1>
          <p className="mt-5 text-base text-slate-600 sm:text-lg">
            Choose a plan that matches your business stage and scale. Every engagement includes clarity, strategy, and delivery focused on outcomes.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {plans.map((plan, idx) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className={`relative flex flex-col justify-between rounded-3xl border p-8 shadow-[0_24px_70px_rgba(15,23,42,0.06)] ${
                plan.popular
                  ? "border-blue-600 bg-blue-600 text-white shadow-blue-200"
                  : "border-slate-200 bg-white text-slate-900"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue-500 px-4 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-white">
                  Most Popular
                </span>
              )}

              <div>
                <h2 className={`text-sm font-bold uppercase tracking-[0.2em] ${plan.popular ? "text-blue-100" : "text-slate-500"}`}>
                  {plan.name}
                </h2>

                <div className="mt-6 flex items-end gap-2">
                  <span className="text-4xl font-extrabold">{plan.price}</span>
                  {plan.price !== "Let's Talk" && (
                    <span className={`text-xs font-medium uppercase tracking-wide ${plan.popular ? "text-blue-100" : "text-slate-500"}`}>
                      Starting
                    </span>
                  )}
                </div>

                <p className={`mt-4 text-sm leading-relaxed ${plan.popular ? "text-blue-100" : "text-slate-600"}`}>
                  {plan.subtitle}
                </p>

                <ul className="mt-8 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm">
                      <span
                        className={`mt-0.5 flex h-5 w-5 items-center justify-center rounded-full ${
                          plan.popular ? "bg-white/10 text-white" : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      <span className={plan.popular ? "text-blue-50" : "text-slate-700"}>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                onClick={() => handleSelectPlan(plan.name)}
                className={`mt-10 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-xs font-bold uppercase tracking-[0.2em] transition ${
                  plan.popular
                    ? "bg-white text-blue-700 hover:bg-slate-100"
                    : "bg-slate-900 text-white hover:bg-slate-700"
                }`}
              >
                {plan.cta}
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
