"use client";

import { motion } from "framer-motion";

const themes = [
  { id: "heist", name: "La Casa", style: "border-red-500/50 shadow-[0_0_20px_rgba(220,38,38,0.2)] bg-black", icon: "🏦" },
  { id: "hacker", name: "Terminal", style: "border-green-500/50 shadow-[0_0_20px_rgba(34,197,94,0.2)] bg-[#0a0a0a]", icon: "💻" },
  { id: "glass", name: "Cupertino", style: "border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.1)] bg-white/5 backdrop-blur-xl", icon: "✨" },
  { id: "anime", name: "Neo Tokyo", style: "border-purple-500/50 shadow-[0_0_20px_rgba(168,85,247,0.2)] bg-[#1a0b2e]", icon: "🌸" },
  { id: "cyber", name: "Night City", style: "border-yellow-500/50 shadow-[0_0_20px_rgba(234,179,8,0.2)] bg-[#1a1a00]", icon: "🌃" },
  { id: "startup", name: "Minimal", style: "border-neutral-800 shadow-[0_0_20px_rgba(0,0,0,0.5)] bg-neutral-900", icon: "🚀" },
];

export function ThemeShowcase() {
  return (
    <section className="py-32 relative bg-transparent overflow-hidden" id="themes">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(220,38,38,0.05)_0%,transparent_70%)] pointer-events-none" />
      
      <div className="container mx-auto px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Aesthetic Themes for <br/>
            <span className="text-neutral-500">Every Creator</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-neutral-400 max-w-2xl mx-auto"
          >
            Don&apos;t settle for boring white backgrounds. Immerse your audience in high-fidelity cinematic experiences.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {themes.map((theme, idx) => (
            <motion.div
              key={theme.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className={`relative rounded-2xl p-6 border ${theme.style} transition-all duration-300 group cursor-pointer overflow-hidden min-h-[300px] flex flex-col justify-between`}
            >
              {/* Premium Hover Glow */}
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-2xl mb-4 border border-white/10">
                  {theme.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{theme.name}</h3>
                <p className="text-neutral-400 text-sm">Interactive cinematic layout.</p>
              </div>

              {/* Form UI Mockup inside card */}
              <div className="relative z-10 mt-8 space-y-3">
                <div className="h-2 w-1/3 bg-white/20 rounded-full" />
                <div className="h-10 w-full bg-white/5 border border-white/10 rounded-lg" />
                <div className="h-10 w-full bg-white/5 border border-white/10 rounded-lg" />
                <div className="h-10 w-1/2 bg-white/20 rounded-lg mt-4" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
