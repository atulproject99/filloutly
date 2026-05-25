"use client";

import { motion } from "framer-motion";
import { Palette, CheckCircle } from "lucide-react";
import { Button } from "~/components/ui/button";

const themes = [
  {
    id: "apple-glass",
    name: "Apple Glass",
    description: "Premium glassmorphism with subtle frosted textures.",
    style: "bg-white/10 backdrop-blur-xl border border-white/20",
    textColor: "text-white",
  },
  {
    id: "money-heist",
    name: "Money Heist",
    description: "Bold red gradients, dark backgrounds, and high stakes.",
    style: "bg-black border border-red-500/50 shadow-[0_0_30px_rgba(239,68,68,0.3)]",
    textColor: "text-red-500",
  },
  {
    id: "hacker-mode",
    name: "Hacker Mode",
    description: "Terminal aesthetics with neon green monospace typography.",
    style: "bg-black border border-green-500/50 shadow-[0_0_15px_rgba(34,197,94,0.2)] font-mono",
    textColor: "text-green-500",
  },
  {
    id: "anime-neon",
    name: "Anime Neon",
    description: "Vibrant synthwave pinks and purples with intense glows.",
    style: "bg-[#0a0014] border border-fuchsia-500/50 shadow-[0_0_40px_rgba(217,70,239,0.3)]",
    textColor: "text-fuchsia-400",
  },
  {
    id: "startup-minimal",
    name: "Startup Minimal",
    description: "Ultra-clean, high-contrast monochrome for SaaS products.",
    style: "bg-white border border-gray-200 text-black",
    textColor: "text-black",
  }
];

export default function ThemesPage() {
  return (
    <div className="space-y-8 pb-10">
      <div className="flex items-center justify-between mb-8">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold tracking-tight"
        >
          Theme Marketplace
        </motion.h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {themes.map((theme, index) => (
          <motion.div
            key={theme.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="group relative"
          >
            {/* The preview card acting as the "Form" */}
            <div className={`h-64 rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 group-hover:scale-[1.02] ${theme.style}`}>
              <div>
                <div className={`w-3/4 h-8 rounded-lg mb-4 opacity-80 ${theme.id === 'startup-minimal' ? 'bg-gray-200' : 'bg-white/10'}`} />
                <div className={`w-full h-4 rounded-md mb-2 opacity-60 ${theme.id === 'startup-minimal' ? 'bg-gray-100' : 'bg-white/5'}`} />
                <div className={`w-5/6 h-4 rounded-md opacity-60 ${theme.id === 'startup-minimal' ? 'bg-gray-100' : 'bg-white/5'}`} />
              </div>
              
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-current/10">
                <span className={`text-lg font-bold ${theme.textColor}`}>
                  {theme.name}
                </span>
                <CheckCircle className={`w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity ${theme.textColor}`} />
              </div>
            </div>

            {/* Description below */}
            <div className="mt-4 px-2">
              <p className="text-sm text-white/50">{theme.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
