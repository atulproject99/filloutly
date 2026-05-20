"use client";

import { motion } from "framer-motion";
import { X, Check } from "lucide-react";

export function WhyFilloutly() {
  return (
    <section className="py-32 relative bg-transparent overflow-hidden" id="features">
      <div className="container mx-auto px-6 lg:px-8 max-w-7xl relative z-10">
        
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            More than forms — <br/>
            <span className="text-red-500 crimson-text-glow">Cinematic creator experiences.</span>
          </motion.h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-center justify-center">
          
          {/* Old Boring Forms */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 w-full max-w-md rounded-2xl p-8 bg-white border border-neutral-200 shadow-sm relative grayscale opacity-75"
          >
            <div className="absolute top-4 right-4 bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
              <X className="w-3 h-3" /> BORING
            </div>
            
            <div className="space-y-6 opacity-60">
              <div>
                <div className="h-4 w-1/3 bg-neutral-200 rounded mb-2" />
                <div className="h-10 w-full bg-neutral-100 rounded border border-neutral-200" />
              </div>
              <div>
                <div className="h-4 w-1/4 bg-neutral-200 rounded mb-2" />
                <div className="h-10 w-full bg-neutral-100 rounded border border-neutral-200" />
              </div>
              <div className="h-10 w-full bg-blue-500 rounded text-center flex items-center justify-center text-white text-sm font-medium">
                Submit
              </div>
            </div>

            <div className="mt-8 space-y-3">
              <div className="flex items-center gap-2 text-neutral-500 text-sm">
                <X className="w-4 h-4 text-red-500" /> High drop-off rates
              </div>
              <div className="flex items-center gap-2 text-neutral-500 text-sm">
                <X className="w-4 h-4 text-red-500" /> Generic SaaS look
              </div>
              <div className="flex items-center gap-2 text-neutral-500 text-sm">
                <X className="w-4 h-4 text-red-500" /> Forgettable brand interaction
              </div>
            </div>
          </motion.div>

          {/* VS Badge */}
          <div className="w-16 h-16 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-500 font-bold text-xl z-10 shrink-0">
            VS
          </div>

          {/* Cinematic Forms */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 w-full max-w-md rounded-2xl p-8 bg-black/60 backdrop-blur-xl border border-red-500/30 crimson-glow relative"
          >
            <div className="absolute top-4 right-4 bg-red-500/20 text-red-400 border border-red-500/50 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-[0_0_10px_rgba(220,38,38,0.3)]">
              <Check className="w-3 h-3" /> IMMERSIVE
            </div>
            
            <div className="space-y-6">
              <div>
                <div className="h-4 w-1/3 bg-white/20 rounded mb-2" />
                <div className="h-12 w-full bg-white/5 rounded-lg border border-white/10 focus-within:border-red-500/50 transition-colors" />
              </div>
              <div>
                <div className="h-4 w-1/4 bg-white/20 rounded mb-2" />
                <div className="h-12 w-full bg-white/5 rounded-lg border border-white/10" />
              </div>
              <div className="h-12 w-full bg-red-600 hover:bg-red-500 rounded-lg text-center flex items-center justify-center text-white text-sm font-bold shadow-[0_0_15px_rgba(220,38,38,0.5)] transition-all cursor-pointer">
                Enter the Vault
              </div>
            </div>

            <div className="mt-8 space-y-3">
              <div className="flex items-center gap-2 text-neutral-300 text-sm">
                <Check className="w-4 h-4 text-green-400 shadow-[0_0_10px_rgba(74,222,128,0.5)] rounded-full" /> 95% Completion Rate
              </div>
              <div className="flex items-center gap-2 text-neutral-300 text-sm">
                <Check className="w-4 h-4 text-green-400 shadow-[0_0_10px_rgba(74,222,128,0.5)] rounded-full" /> Custom Ambient Audio
              </div>
              <div className="flex items-center gap-2 text-neutral-300 text-sm">
                <Check className="w-4 h-4 text-green-400 shadow-[0_0_10px_rgba(74,222,128,0.5)] rounded-full" /> Hollywood-level Aesthetics
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
