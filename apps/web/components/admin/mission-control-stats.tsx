"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "~/lib/utils";

interface StatProps {
  title: string;
  value: string;
  trend?: string;
  trendUp?: boolean;
  icon: LucideIcon;
  delay?: number;
  alert?: boolean;
}

export function MissionControlStat({ title, value, trend, trendUp, icon: Icon, delay = 0, alert = false }: StatProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      className={cn(
        "relative overflow-hidden p-6 rounded-2xl border bg-black/60 backdrop-blur-xl group",
        alert ? "border-red-500/50 shadow-[0_0_30px_rgba(220,38,38,0.2)]" : "border-white/5 hover:border-red-500/30 transition-colors"
      )}
    >
      {/* Background cyber grid */}
      <div 
        className="absolute inset-0 opacity-[0.05] z-0"
        style={{ backgroundImage: 'linear-gradient(to right, #dc2626 1px, transparent 1px), linear-gradient(to bottom, #dc2626 1px, transparent 1px)', backgroundSize: '20px 20px' }} 
      />
      
      {/* Glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-tr from-red-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />

      <div className="relative z-10 flex justify-between items-start">
        <div>
          <p className="text-xs font-mono tracking-widest text-white/40 uppercase mb-2">{title}</p>
          <h3 className={cn(
            "text-3xl font-black tracking-tight",
            alert ? "text-red-500 crimson-text-glow" : "text-white"
          )}>
            {value}
          </h3>
          
          {trend && (
            <div className="mt-4 flex items-center space-x-2 font-mono text-xs">
              <span className={cn(
                "px-2 py-0.5 rounded",
                trendUp ? "text-green-400 bg-green-500/10 border border-green-500/20" : "text-red-400 bg-red-500/10 border border-red-500/20"
              )}>
                {trendUp ? "+" : "-"}{trend}
              </span>
              <span className="text-white/30">vs 24h</span>
            </div>
          )}
        </div>

        <div className={cn(
          "p-3 rounded-xl border",
          alert ? "bg-red-950/50 border-red-500/30 text-red-500" : "bg-white/5 border-white/10 text-white/50 group-hover:text-red-400 group-hover:border-red-500/30 transition-colors"
        )}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </motion.div>
  );
}
