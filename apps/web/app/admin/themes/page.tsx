"use client";

import { motion } from "framer-motion";
import { Palette, CheckCircle, XCircle, Power, Edit3 } from "lucide-react";
import { Button } from "~/components/ui/button";

const themes = [
  { id: "apple-glass", name: "Apple Glass", active: true, usage: 41920, style: "bg-white/10 border-white/20" },
  { id: "money-heist", name: "Money Heist", active: true, usage: 8214, style: "bg-black border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.2)]" },
  { id: "hacker-mode", name: "Hacker Mode", active: true, usage: 5921, style: "bg-black border-green-500/50 shadow-[0_0_15px_rgba(34,197,94,0.1)]" },
  { id: "anime-neon", name: "Anime Neon", active: true, usage: 12402, style: "bg-[#0a0014] border-fuchsia-500/50 shadow-[0_0_20px_rgba(217,70,239,0.2)]" },
  { id: "startup-minimal", name: "Startup Minimal", active: true, usage: 51294, style: "bg-white border-gray-200" },
  { id: "retro-wave", name: "Retro Wave", active: false, usage: 0, style: "bg-gradient-to-b from-indigo-900 to-purple-900 border-pink-500/50" },
];

export default function AdminThemesPage() {
  return (
    <div className="space-y-6 pb-10">
      <div className="flex items-center justify-between mb-8">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-black tracking-tighter uppercase text-white"
        >
          Global Themes Configuration
        </motion.h1>
        <Button className="bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:shadow-[0_0_30px_rgba(220,38,38,0.5)] transition-all">
          <Palette className="w-4 h-4 mr-2" />
          Create Theme
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {themes.map((theme, i) => (
          <motion.div
            key={theme.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className={`relative rounded-2xl p-6 border flex flex-col group ${
              theme.active 
                ? "bg-black/40 border-red-500/20 hover:border-red-500/50" 
                : "bg-black/20 border-white/5 opacity-60 hover:opacity-100"
            } backdrop-blur-xl transition-all`}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full border flex items-center justify-center ${theme.style}`}>
                  <Palette className={`w-4 h-4 ${theme.id === "startup-minimal" ? "text-black" : "text-white"}`} />
                </div>
                <div>
                  <h3 className="font-bold text-white leading-tight">{theme.name}</h3>
                  <p className="text-xs text-white/40 font-mono mt-0.5">{theme.id}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-white">{theme.usage.toLocaleString()}</div>
                <div className="text-[10px] uppercase tracking-wider text-white/40">Active Forms</div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
              <span className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider ${theme.active ? "text-green-400" : "text-red-400"}`}>
                {theme.active ? <CheckCircle className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                {theme.active ? "Enabled" : "Disabled"}
              </span>
              <div className="flex gap-2">
                <Button size="icon" variant="ghost" className="w-8 h-8 hover:bg-white/10 text-white/60 hover:text-white">
                  <Edit3 className="w-4 h-4" />
                </Button>
                <Button size="icon" variant="ghost" className="w-8 h-8 hover:bg-red-500/20 text-white/60 hover:text-red-400">
                  <Power className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
