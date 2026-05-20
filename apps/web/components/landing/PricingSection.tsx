"use client";

import { motion } from "framer-motion";
import { Check, Flame } from "lucide-react";
import { Button } from "~/components/ui/button";

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "For creators starting their journey.",
    features: ["100 Responses / month", "3 Cinematic Themes", "Standard Support", "Filloutly Branding"],
    isPopular: false,
  },
  {
    name: "Pro",
    price: "$29",
    description: "For professionals who need more.",
    features: ["10,000 Responses / month", "All Cinematic Themes", "Advanced Analytics", "Custom Branding", "Ambient Audio Support"],
    isPopular: true,
  },
  {
    name: "Business",
    price: "$99",
    description: "For teams scaling operations.",
    features: ["Unlimited Responses", "Custom Theme Engine", "API Access", "Dedicated Account Manager", "Priority Support"],
    isPopular: false,
  }
];

export function PricingSection() {
  return (
    <section className="py-32 relative bg-transparent overflow-hidden" id="pricing">
      <div className="container mx-auto px-6 lg:px-8 max-w-7xl relative z-10">
        
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Invest in your <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">audience&apos;s attention</span>
          </motion.h2>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
            Transparent pricing for elite creators. No hidden fees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, idx) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              className={`relative rounded-3xl p-8 border ${plan.isPopular ? 'border-red-500 bg-black/60 shadow-[0_0_40px_rgba(220,38,38,0.2)] scale-105 z-10' : 'border-white/10 bg-white/5 backdrop-blur-xl'} flex flex-col transition-all duration-300 group`}
            >
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-[0_0_15px_rgba(220,38,38,0.5)]">
                  <Flame className="w-3 h-3" /> MOST POPULAR
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-4xl font-extrabold text-white">{plan.price}</span>
                  <span className="text-neutral-500">/mo</span>
                </div>
                <p className="text-sm text-neutral-400">{plan.description}</p>
              </div>

              <div className="flex-1 space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Check className={`w-5 h-5 ${plan.isPopular ? 'text-red-500' : 'text-neutral-400'} shrink-0`} />
                    <span className="text-sm text-neutral-300">{feature}</span>
                  </div>
                ))}
              </div>

              <Button 
                className={`w-full h-12 rounded-xl text-base font-semibold transition-all ${
                  plan.isPopular 
                  ? 'bg-red-600 hover:bg-red-500 text-white shadow-[0_0_20px_rgba(220,38,38,0.4)]' 
                  : 'bg-white/10 hover:bg-white/20 text-white border border-white/5'
                }`}
              >
                {plan.price === "$0" ? "Start for free" : "Upgrade to " + plan.name}
              </Button>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
